const router = require('express').Router();
const verify = require('../middleware/verifyToken')
const { getReport, getAllReports, updateReport } = require('../controllers/report')




//get a report 
router.get('/getReport/:id', verify, getReport);

//get all reports
router.get('/getAllReports', verify, getAllReports);

//update report 
router.post('/updateReport/:id', verify, updateReport);


module.exports = router;