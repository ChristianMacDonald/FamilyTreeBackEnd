const express = require('express');
const userModel = require('./userModel');
const router = express.Router();

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

router.get('/', async (req, res) => {
    const users = await userModel.find();
    res.status(200).json(users);
});

router.get('/:username', validateUsername, (req, res) => {
    res.status(200).json(req.user);
});

router.post('/', validateUser, async (req, res) => {
    const user = await userModel.add(req.user);
    res.status(200).json(user);
});

router.put('/:username', validateUsername, async (req, res) => {
    const user = await userModel.update(req.body, req.user.id);
    res.status(200).json(user);
});

router.delete('/:username', validateUsername, async (req, res) => {
    await userModel.remove(req.user.id);
    res.status(200).json(req.user);
});

module.exports = router;