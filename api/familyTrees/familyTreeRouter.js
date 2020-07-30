const express = require('express');
const { validateUsername, verifyUserOwnsAccount } = require('../users/userMiddleware');
const { validateFamilyTree, validateFamilyTreeId } = require('./familyTreeMiddleware');
const familyTreeModel = require('./familyTreeModel');
const familyMemberRouter = require('../familyMembers/familyMemberRouter');

const router = express.Router({ mergeParams: true });

router.use(validateUsername);
router.use(verifyUserOwnsAccount);

router.use('/:familyTreeId/family-members', familyMemberRouter);

router.get('/', async (req, res) => {
    const familyTrees = await familyTreeModel.find();
    res.status(200).json(familyTrees);
});

router.get('/:familyTreeId', validateFamilyTreeId, (req, res) => {
    res.status(200).json(req.familyTree);
});

router.post('/', validateFamilyTree, async (req, res) => {
    const familyTree = await familyTreeModel.insert({ owner_id: req.user.id, name: req.body.name });
    res.status(200).json(familyTree);
});

router.put('/:familyTreeId', validateFamilyTreeId, async (req, res) => {
    const familyTree = await familyTreeModel.update(req.body, req.familyTree.id);
    res.status(200).json(familyTree);
});

router.delete('/:familyTreeId', validateFamilyTreeId, async (req, res) => {
    await familyTreeModel.remove(req.familyTree.id);
    res.status(200).json(req.familyTree);
});

module.exports = router;