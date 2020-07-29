const express = require('express');
const { validateUsername, verifyUserOwnsAccount } = require('../users/userMiddleware');
const { validateFamilyTree, validateFamilyTreeName } = require('./familyTreeMiddlware');
const familyTreeModel = require('./familyTreeModel');

const router = express.Router({ mergeParams: true });

router.use(validateUsername);
router.use(verifyUserOwnsAccount);

router.get('/', async (req, res) => {
    const familyTrees = await familyTreeModel.findByOwner(req.user.id);
    res.status(200).json(familyTrees);
});

router.get('/:name', validateFamilyTreeName, async (req, res) => {
    const familyTree = await familyTreeModel.findByOwnerAndName(req.user.id, req.params.name);
    res.status(200).json(familyTree);
});

router.post('/', validateFamilyTree, async (req, res) => {
    const familyTree = await familyTreeModel.insert(req.body);
    res.status(200).json(familyTree);
});

router.put('/:name', validateFamilyTreeName, async (req, res) => {
    const familyTree = await familyTreeModel.update(req.body, req.familyTree.id);
    res.status(200).json(familyTree);
});

router.delete('/:name', validateFamilyTreeName, async (req, res) => {
    await familyTreeModel.delete(req.familyTree.id);
    res.status(200).json(req.familyTree);
});

module.exports = router;