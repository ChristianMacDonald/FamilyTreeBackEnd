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
    try {
        const familyTrees = await familyTreeModel.findByOwner(req.user.id);
        res.status(200).json(familyTrees);
    } catch {
        res.status(500).json({ errorMessage: 'Could not get family trees' });
    }
});

router.get('/:familyTreeId', validateFamilyTreeId, (req, res) => {
    res.status(200).json(req.familyTree);
});

router.post('/', validateFamilyTree, async (req, res) => {
    try {
        const familyTree = await familyTreeModel.insert({ owner_id: req.user.id, name: req.body.name });
        res.status(200).json(familyTree);
    } catch {
        res.status(500).json({ errorMessage: 'Could not create family tree'});
    }
});

router.put('/:familyTreeId', validateFamilyTreeId, async (req, res) => {
    try {    
        const familyTree = await familyTreeModel.update(req.body, req.familyTree.id);
        res.status(200).json(familyTree);
    } catch {
        res.status(500).json({ errorMessage: 'Could not update family tree'});
    }
});

router.delete('/:familyTreeId', validateFamilyTreeId, async (req, res) => {
    try {
        await familyTreeModel.remove(req.familyTree.id);
        res.status(200).json(req.familyTree);
    } catch {
        res.status(500).json({ errorMessage: 'Could not delete family tree' });
    }
});

module.exports = router;