const router = require('express').Router();
const verify = require('../middleware/verifyToken')
const { getCheck, createCheck, getAllChecks, updateCheck, deleteCheck } = require('../controllers/check')



//Create a check
router.post('/createCheck', verify, createCheck);

//get a check 
router.get('/get/:id', verify, getCheck);

//get all checks
router.get('/getAll', verify, getAllChecks);

//update check
router.post('/updateCheck/:id', verify, updateCheck);

//delete check 
router.delete('/deleteCheck/:id', verify, deleteCheck);





module.exports = router;