import jwt from 'jsonwebtoken';

module.exports = nickname => {
    return jwt.sign({ nickname: nickname}, 'my-secret-key')
}