const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../utils/validation');
const jwtToken = require('jsonwebtoken');
const createHashedPassword = require('../utils/password')


const register = async (req, res) => {
    /// validate the data before making the user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // //checking if the user already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exits");

    // //Hash the passwords
    const hashedPassword = await createHashedPassword(req.body.password);

    //creating a new user 
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
}

const login = async (req, res) => {
    /// validate the data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // //checking if the user already in the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("invalid email or password");
    //Password is correct 
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password");
    // user.isActive = true;
    //Create and assign a token 
    const token = jwtToken.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    //to get the token 
    // res.header('auth-token', token).send(token);
}


module.exports = {
    register, login
}
