const express = require('express');

const { validateUsername, verifyUserOwnsAccount } = require('../users/userMiddleware');
const { validateFamilyTreeId } = require('../familyTrees/familyTreeMiddleware')
const { validateFamilyMember, validateFamilyMemberId } = require('./familyMemberMiddleware');

const familyMemberModel = require('./familyMemberModel');

const router = express.Router({ mergeParams: true });

router.use(validateUsername);
router.use(verifyUserOwnsAccount);
router.use(validateFamilyTreeId);

router.get('/', async (req, res) => {
    const familyMembers = await familyMemberModel.findByTreeId(req.familyTree.id);
    res.status(200).json(familyMembers);
});

router.get('/:familyMemberId', validateFamilyMemberId, (req, res) => {
    res.status(200).json(req.familyMember);
});

router.post('/', validateFamilyMember, async (req, res) => {
    const familyMember = await familyMemberModel.insert({ ...req.body, family_tree_id: req.familyTree.id });
    res.status(200).json(familyMember);
});

router.put('/:familyMemberId', validateFamilyMemberId, async (req, res) => {
    const familyMember = await familyMemberModel.update(req.body, req.familyMember.id);
    res.status(200).json(familyMember);
});

router.delete('/:familyMemberId', validateFamilyMemberId, async (req, res) => {
    await familyMemberModel.remove(req.familyMember.id);
    res.status(200).json(req.familyMember);
});

module.exports = router;