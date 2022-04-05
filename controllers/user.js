const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../utils/validation');
const jwtToken = require('jsonwebtoken');
const createHashedPassword = require('../utils/password');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

const register = async (req, res, next) => {
    // /// validate the data before making the user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // // //checking if the user already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("User already exits");

    try {
        const { name, email, password } = req.body;
        const user = new User({
            name,
            email,
            emailToken: jwtToken.sign({ email: req.body.email }, process.env.TOKEN_SECRET),
            password,
            isVerified: false
        });
        const hashedPassword = await createHashedPassword(user.password);
        user.password = hashedPassword;

        const newUser = await user.save();

        // send verification mail to user
        let mailOptions = {
            from: process.env.SENDER_EMAIl,
            to: user.email,
            subject: ' <BOSTA> Verify you email',
            html: `<h2>${user.name} Please verify your email </h2>
                         <a href="http://${req.headers.host}/api/user/verify?token=${user.emailToken}"> verify your email</a>`
        };
        //sending email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('User was registered successfully! Please check your email');
            }
        })
        res.send({ user: user._id });
        console.log("You have been Registered");
    } catch (error) {
        console.log(error);
    }
    next();
}

const verify = async (req, res, next) => {
    try {
        const token = req.query.token;
        const user = await User.findOne({ emailToken: token });
        if (user) {
            user.emailToken = null
            user.isVerified = true
            await user.save();
            console.log("Your email has been verified");
        } else {
            console.log("email is not verified");
        }
    } catch (error) {
        next(error);
    }


}

const login = async (req, res, next) => {
    try {
        /// validate the data
        const { email, password } = req.body;
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // //checking if the user already in the database
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send("User does't exist");

        //check the verification 
        if (!user.isVerified) return res.status(401).send({ message: "Pending Account. Please Verify Your Email!" });

        //Password is correct 
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send("Invalid password");
        // user.isActive = true;
        //Create and assign a token 
        const token = jwtToken.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.status(200).json({ token })
        //to get the token 
        //res.header('auth-token', token).send(token);
        console.log("you are logged in ");
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register, login, verify
};
