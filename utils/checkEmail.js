// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');

// dotenv.config();



// let transporter = nodemailer.createTransport({
//     service: process.env.EMAIL_SERVICE,
//     auth: {
//         user: process.env.SENDER_EMAIL,
//         pass: process.env.SENDER_PASS
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });


// module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
//     console.log("Check");
//     transport.sendMail({
//       from: process.env.SENDER_EMAIL,
//       to: email,
//       subject: "Please confirm your account",
//       html: `<h1>Email Confirmation</h1>
//           <h2>Hello ${name}</h2>
//           <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
//           <a href=http://localhost:8081/confirm/${confirmationCode}> Click here</a>
//           </div>`,
//     }).catch(err => console.log(err));
//   };