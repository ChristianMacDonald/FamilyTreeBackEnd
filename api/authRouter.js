const express = require('express');
const bcrypt = require('bcryptjs');
const userModel = require('./userModel');
const { findByUsername } = require('./userModel');

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

router.post('/login', validateCredentials, async (req, res) => {
    const user = await userModel.findByUsername(req.body.username);
    if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).json({ message: `Successfully logged in as ${user.username}` });
    } else {
        res.status(401).json({ errorMessage: 'Invalid credentials' });
    }
});

router.post('/register', validateCredentials, async (req, res) => {
    credentials = req.body;
    credentials.password = bcrypt.hashSync(credentials.password, 14);
    const user = await userModel.add(credentials);
    res.status(200).json(`Successfully created user ${user.username}`);
});

module.exports = router;