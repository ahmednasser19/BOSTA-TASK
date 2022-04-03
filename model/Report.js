const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            required: true,
        },
        availability: {
            type: Number,
            required: true,
        },
        outages: {
            type: Number,
            required: true,
        },
        downtime: {
            type: Number,
            required: true,
        },
        uptime: {
            type: Number,
            required: true,
        },
        responseTime: {
            type: Number,
            required: true,
        },
        history: {
            type: {
                timeStamp: Date,
                logs: Schema.Types.Mixed,
            },
        },
        tags: {
            type: [String],
        },
        check: {
            type: mongoose.Schema.ObjectId,
            ref: "Check",
            required: true,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);