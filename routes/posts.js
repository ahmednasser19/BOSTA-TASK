const router = require('express').Router();
const verify = require('../middleware/verifyToken')
router.get('/', verify, (req, res) => {

    res.json({
        posts: {
            title: "MY first post",
            description: "Random data you can not access"
        }
    });
})



module.exports = router;