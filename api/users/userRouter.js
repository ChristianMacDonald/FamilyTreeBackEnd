const express = require('express');
const bcrypt = require('bcryptjs');
const userModel = require('./userModel');
const router = express.Router();
const authMiddleware = require('../auth/authMiddleware');

router.use(authMiddleware.verifyToken);

const validateUser = (req, res, next) => {
    const user = req.body;

    if (user.username && user.password) {
        req.user = user;
        next();
    } else if (!user.username) {
        res.status(400).json({ errorMessage: 'Missing username field' });
    } else if (!user.password) {
        res.status(400).json({ errorMessage: 'Missing password field' });
    }
}

const validateUsername = async (req, res, next) => {
    const username = req.params.username
    const user = await userModel.findByUsername(username);

    if (user) {
        req.user = user;
        next();
    } else {
        res.status(404).json({ errorMessage: `User with id ${id} not found` });
    }
}

const verifyUserOwnsAccount = (req, res, next) => {
    if (req.tokenPayload.username === req.user.username) {
        next();
    } else {
        res.status(401).json({ errorMessage: 'Not authorized to access accounts of other users' });
    }
}

router.get('/:username', validateUsername, verifyUserOwnsAccount, (req, res) => {
    res.status(200).json(req.user);
});

router.put('/:username/password', validateUsername, verifyUserOwnsAccount, async (req, res) => {
    const user = await userModel.findByUsername(req.params.username);
    
    if (req.body.oldPassword && req.body.newPassword) {
        if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
            const password = bcrypt.hashSync(req.body.newPassword, 14);
            await userModel.update({ password }, req.user.id);
            res.status(200).json({ message: 'Successfully changed password' });
        } else {
            res.status(400).json({ errorMessage: 'Invalid credentials' });
        }
    } else if (!req.body.oldPassword) {
        res.status(400).json({ errorMessage: 'Missing oldPassword field' });
    } else if (!req.body.newPassword) {
        res.status(400).json({ errorMessage: 'Missing newPassword field' });
    } else {
        res.status(400).json({ errorMessage: 'Missing oldPassword and newPassword fields' });
    }
});

router.put('/:username', validateUsername, verifyUserOwnsAccount, async (req, res) => {
    const user = await userModel.update(req.body, req.user.id);
    res.status(200).json(user);
});

router.delete('/:username', validateUsername, verifyUserOwnsAccount, async (req, res) => {
    await userModel.remove(req.user.id);
    res.status(200).json(req.user);
});

module.exports = router;