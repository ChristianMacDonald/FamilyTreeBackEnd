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

module.exports = {
    validateUsername,
    verifyUserOwnsAccount
}