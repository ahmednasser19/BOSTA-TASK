const Check = require('../model/Check')
const dotenv = require('dotenv');
const { checkValidation } = require('../utils/validation');
const mongoose = require('mongoose');
const Report = require('../model/Report')
dotenv.config();



const getReport = async (req, res) => {
    const { body } = req;
    try {
        const report = await Report.find({ id: body._id });
        if (!report) return res.status(404).send("report  not found");
        res.status(200).json(report);
    } catch (error) {
        console.log(error);
    }
}
const getAllReports = async (req, res) => {
    const checkId = req.checkId
    try {
        const allReports = await Report.find({ checkId_str: checkId });
        res.status(200).json(allReports);
    } catch (error) {
        console.log(error);
    }

}


const updateReport = async (req, res) => {
    req.body.checkId = req.checkId;
    try {
        const updatedCheck = await await Report.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        );
        if (!updatedCheck) return res.status(404).send("invalid report to update");
        return res.status(201).send("report updated! ");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getReport, getAllReports, updateReport };