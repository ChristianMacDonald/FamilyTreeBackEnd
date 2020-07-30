const express = require('express');
const bcrypt = require('bcryptjs');

const { verifyToken } = require('../auth/authMiddleware');
const { validateUsername, verifyUserOwnsAccount } = require('./userMiddleware');

const userModel = require('./userModel');

const familyTreeRouter = require('../familyTrees/familyTreeRouter');

const router = express.Router();

router.use(verifyToken);
router.use('/:username/family-trees', familyTreeRouter);

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