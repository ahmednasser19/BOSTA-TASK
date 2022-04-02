const router = require('express').Router();
const User = require('../model/User');

const { register, login, verify } = require('../controllers/user')

//Register
router.post('/register', register)
//verify

router.get('/verify', verify)

//Login
router.post('/login', login);


module.exports = router;