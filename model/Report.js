const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        url: {
            type: String
        },
        status: {
            type: String,
        },
        availability: {
            type: Number,
        },
        outages: {
            type: Number,
        },
        downtime: {
            type: Number,
        },
        uptime: {
            type: Number,
        },
        responseTime: {
            type: Number,
        },
        history: {
            type: {
                timeStamp: Date,
                logs: mongoose.Schema.Types.Mixed,
            },
        },
        tags: {
            type: [String],
        },
        checkId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Check'
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);