const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets');

function verifyToken(req, res, next) {
    try {
        const payload = jwt.verify(req.headers.authorization, secrets.jwtSecret);
        req.tokenPayload = payload;
        next();
    } catch (e) {
        res.status(401).json({ errorMessage: 'Invalid token' });
    }
}

module.exports = { verifyToken };