const router = require('express').Router();
const verify = require('../middleware/verifyToken')
const { getReport, getAllReports, updateReport } = require('../controllers/report')



//Create a check
//get a check 
router.get('/getReport/:id', verify, getReport);

//get all checks
router.get('/getAllReports', verify, getAllReports);

//update check
router.post('/updateReport/:id', verify, updateReport);

module.exports = router;