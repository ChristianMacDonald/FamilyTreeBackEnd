const familyMemberModel = require("./familyMemberModel");

function validateFamilyMember(req, res, next) {
    if (req.body.first_name && req.body.last_name) {
        next();
    } else if (!req.body.first_name) {
        res.status(400).json({ errorMessage: 'Missing first_name field' });
    } else if (!req.body.last_name) {
        res.status(400).json({ errorMessage: 'Missing last_name field' });
    } else {
        res.status(400).json({ errorMessage: 'Missing first_name and last_name fields' });
    }
}

async function validateFamilyMemberId(req, res, next) {
    const familyMember = await familyMemberModel.findById(req.params.familyMemberId);
    if (familyMember) {
        req.familyMember = familyMember;
        next();
    } else {
        res.status(404).json({ errorMessage: `Family member with id ${req.params.familyMemberId} not found` });
    }
}

module.exports = {
    validateFamilyMember,
    validateFamilyMemberId
}