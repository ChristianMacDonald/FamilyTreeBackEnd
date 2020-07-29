const userModel = require('./userModel');

async function validateUsername(req, res, next) {
    const username = req.params.username
    const user = await userModel.findByUsername(username);

    if (user) {
        req.user = user;
        next();
    } else {
        res.status(404).json({ errorMessage: `User with id ${id} not found` });
    }
}

async function verifyUserOwnsAccount(req, res, next) {
    if (req.tokenPayload.username === req.user.username) {
        next();
    } else {
        res.status(401).json({ errorMessage: 'Not authorized to access accounts of other users' });
    }
}

async function validateFamilyTree(req, res, next) {
    if (req.body.name) {
        next();
    } else  {
        res.status(400).json({ errorMessage: 'Missing name field' });
    }
}

async function validateFamilyTreeName(req, res, next) {
    if (req.query.name) {
        const familyTree = await familyTreeModel.findByOwnerAndName(req.user.id, req.query.name);
        if (familyTree) {
            req.familyTree = familyTree;
            next();
        } else {
            res.status(404).json({ errorMessage: `Family tree with owner ${req.user.id} and name ${req.query.name} not found` });
        }
    } else {
        res.status(400).json({ errorMessage: 'Missing key-value pair with key name in query string' });
    }
}

module.exports = {
    validateUsername,
    verifyUserOwnsAccount,
    validateFamilyTree,
    validateFamilyTreeName
}