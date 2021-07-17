const crypto = require('crypto')

module.exports = password => {
    return crypto
        .createHmac('sha256', password)
        .update('clone10')
        .digest('hex')
}