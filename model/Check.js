const mongoose = require('mongoose');

//create the  schema of the user

const checkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,

    },
    protocol: {
        type: String,
        required: true,
    },
    port: {
        type: String,

    },
    path: {
        type: String,

    },
    webhook: {
        type: String
    },
    timeout: {
        type: Number,
        default: (5 * 1000)
    },
    interval: {
        type: Number,
        default: 10 * 1000
    },
    threshold: {
        type: Number,
        default: 1,
    },
    authentication: {
        username: String,
        password: String,
    },
    httpHeaders: {
        type: {
            key: String,
            value: String
        },
    },
    assert: {
        statusCode: {
            type: Number,
            default: 200,
        },
    },
    tags: {
        type: [String],
    },
    ignoreSSL: {
        type: Boolean,
        required: true,
    },
    paused: {
        type: Boolean,
        default: false,
    },
    nextCheck: {
        type: Date,
        default: Date.now(),
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }

}, { timestamps: true }
);
module.exports = mongoose.model('Check', checkSchema);