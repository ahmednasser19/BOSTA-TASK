const router = require('express').Router();
const User = require('../model/User');
const { register, login } = require('../controllers/user')

//Register
router.post('/register', register)

//Login
router.post('/login', login);


module.exports = router;