const bcrypt = require('bcryptjs');

const hashPassword = password => {
    return bcrypt.hashSync(password);
}

const comparePassword = (password, hashedPass) => {
    return bcrypt.compareSync(password, hashedPass);
}

module.exports = {
    hashPassword,
    comparePassword
}