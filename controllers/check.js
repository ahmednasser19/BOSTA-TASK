const Check = require('../model/Check')
const dotenv = require('dotenv');
const { checkValidation } = require('../utils/validation');
const mongoose = require('mongoose');
dotenv.config();


const createCheck = async (req, res) => {
    // Add user id to the req.body before saving it to data base
    req.body.userId = req.userId;
    const validateCheck = checkValidation(req.body);
    if (validateCheck.error)
        return res.status(400).send(validateCheck.error.details[0].message);
    try {
        //Create check in database
        const newCheck = await Check.create(req.body);
        // console.log(newCheck)
        res.status(200).json(newCheck);
        console.log("You have added an check!");

    } catch (error) {
        console.log(error);
    }

}

const getAllChecks = async (req, res) => {
    //console.log(req.userId)
    const userId = req.userId
    try {
        const checks = await Check.find({ userId_str: userId });
        res.status(200).json(checks);
    } catch (error) {
        console.log(error);
    }
}

const getCheck = async (req, res) => {
    const { body } = req;
    try {
        const check = await Check.find({ id: body._id });
        if (!check) return res.status(404).send("check not found");
        res.status(200).json(check);
    } catch (error) {
        console.log(error);
    }
}

const updateCheck = async (req, res) => {
    req.body.userId = req.userId;
    const validateCheck = checkValidation(req.body);
    if (validateCheck.error)
        return res.status(400).send(validateCheck.error.details[0].message);
    try {
        const updatedCheck = await await Check.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        );
        if (!updatedCheck) return res.status(404).send("invalid check to update");
        return res.status(201).send("check updated! ");
    } catch (error) {
        console.log(error);
    }

}

const deleteCheck = async (req, res) => {
    req.body.userId = req.userId;
    const validateCheck = checkValidation(req.body);
    if (validateCheck.error)
        return res.status(400).send(validateCheck.error.details[0].message);
    try {
        const deletedCheck = await Check.findByIdAndDelete({ _id: req.params.id, userId_str: req.userId });
        if (!deletedCheck) return res.status(404).send("Can't deleted");
        console.log("check deleted");
        return res.status(204).send("Check deleted");

    } catch (error) {
        console.log(error)
    }

}


module.exports = { getCheck, createCheck, getAllChecks, updateCheck, deleteCheck };
