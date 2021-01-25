const express = require('express');
const bcrypt = require('bcryptjs');
const userModel = require('../users/userModel');
const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets');
const { jwtSecret } = require('../../config/secrets');

const router = express.Router();

async function validateCredentials (req, res, next) {
    if (req.body.username && req.body.password) {
        next();
    } else if (!req.body.username) {
        res.status(400).json({ errorMessage: 'Missing username field' });
    } else if (!req.body.password) {
        res.status(400).json({ errorMessage: 'Missing password field' });
    }
}

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secrets.jwtSecret, options);
}

router.post('/login', validateCredentials, async (req, res) => {
    const user = await userModel.findByUsername(req.body.username);
    if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
            message: `Successfully logged in as ${user.username}`,
            token: token
        });
    } else {
        res.status(401).json({ errorMessage: 'Invalid credentials' });
    }
});

router.post('/register', validateCredentials, async (req, res) => {
    credentials = req.body;
    credentials.password = bcrypt.hashSync(credentials.password, 14);
    const user = await userModel.add(credentials);
    res.status(200).json({ message: `Successfully created user ${user.username}` });
});

router.post('/token', (req, res) => {
    try {
        const payload = jwt.verify(req.body.token, secrets.jwtSecret);
        res.status(200).json(payload);
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
});

module.exports = router;