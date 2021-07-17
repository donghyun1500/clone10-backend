const jwt = require('jsonwebtoken');

module.exports = nickname => {
    return jwt.sign({ nickname: nickname}, 'my-secret-key')
}