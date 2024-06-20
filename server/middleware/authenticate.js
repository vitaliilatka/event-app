const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            req.user = decoded;
            next();
        });
    } else {
        res.status(403).json({ message: 'No token provided' });
    }
};

module.exports = authenticate;
