const Report = require('../model/Report')



const initializeReport = async (checkId, url) => new Promise((resolve, reject) => {
    Report
        .create({
            status: "Up",
            checkId,
            url: url,
            availability: 0,
            outages: 0,
            downtime: 0,
            uptime: 0,
            responseTime: 0,
            history: {
                timeStamp: new Date(),
                logs: 'init',
            },

        })
        .then((report) => resolve(report))
        .catch((error) => reject(error));
});

module.exports = { initializeReport }