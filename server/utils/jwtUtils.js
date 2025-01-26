const jwt = require('jsonwebtoken');

const createToken = (payload) => {
    return jwt.sign(payload, 'secret_key', { expiresIn: '1h' });
};

module.exports = { createToken };
