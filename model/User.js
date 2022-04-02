const mongoose = require('mongoose');

//create the  schema of the user

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
    },
    emailToken: {
        type: String,
        unique: true
    },
    data: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('User', userSchema);