const bcrypt = require('bcryptjs');

const createHashedPassword = async (password) => new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) reject(err);
        resolve(bcrypt.hash(password, salt));
    });
});


module.exports = createHashedPassword;