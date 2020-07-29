const express = require('express');
const bcrypt = require('bcryptjs');
const userModel = require('./userModel');
const familyTreeModel = require('../familyTrees/familyTreeModel');
const { verifyToken } = require('../auth/authMiddleware');
const { validateUsername, verifyUserOwnsAccount } = require('./userMiddleware');
const { validateFamilyTree, validateFamilyTreeName } = require('../familyTrees/familyTreeMiddlware');
const router = express.Router();

router.use(verifyToken);

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

router.get('/:username/family-trees', validateUsername, verifyUserOwnsAccount, async (req, res) => {
    if (req.query.name) {
        const familyTree = await familyTreeModel.findByOwnerAndName(req.user.id, req.query.name);
        if (familyTree) {
            res.status(200).json(familyTree);
        } else {
            res.status(404).json({ errorMessage: `Family tree with name ${req.query.name} not found` });
        }
    } else {
        const familyTrees = await familyTreeModel.find();
        res.status(200).json(familyTrees);
    }
});

router.post('/:username/family-trees', validateUsername, verifyUserOwnsAccount, validateFamilyTree, async (req, res) => {
    const existingFamilyTree = await familyTreeModel.findByOwnerAndName(req.user.id, req.body.name);
    if (existingFamilyTree) {
        res.status(400).json({ errorMessage: 'User owns a family tree with same name' });
    } else {
        const familyTree = await familyTreeModel.insert({
            owner_id: req.user.id,
            name: req.body.name
        });
        res.status(200).json(familyTree);
    }
});

router.put('/:username/family-trees', validateUsername, verifyUserOwnsAccount, validateFamilyTreeName, async (req, res) => {
    const familyTree = await familyTreeModel.update(req.body, req.familyTree.id);
    res.status(200).json(familyTree);
});

router.delete('/:username/family-trees', validateUsername, verifyUserOwnsAccount, validateFamilyTreeName, async (req, res) => {
    await familyTreeModel.remove(req.familyTree.id);
    res.status(200).json(req.familyTree);
});

module.exports = router;