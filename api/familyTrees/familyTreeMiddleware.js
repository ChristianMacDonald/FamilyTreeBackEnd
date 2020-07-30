const familyTreeModel = require('./familyTreeModel');

async function validateFamilyTree(req, res, next) {
    if (req.body.name) {
        next();
    } else  {
        res.status(400).json({ errorMessage: 'Missing name field' });
    }
}

async function validateFamilyTreeId(req, res, next) {
    const familyTree = await familyTreeModel.findById(req.params.familyTreeId);
    
    if (familyTree) {
        req.familyTree = familyTree;
        next();
    } else {
        res.status(404).json({ errorMessage: `Family tree with id ${req.params.familyTreeId} not found` });
    }
}

module.exports = {
    validateFamilyTree,
    validateFamilyTreeId
}