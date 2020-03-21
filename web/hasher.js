module.exports = (params, hash) => {
    secret = 'qrona_app'

    const hasher = require('js-sha256')
    str = secret + JSON.stringify(params) + secret
    
    return hasher(str) == hash
}