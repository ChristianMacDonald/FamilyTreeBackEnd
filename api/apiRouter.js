const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');

router.use('/users', userRouter);
router.use('/auth', authRouter);

router.get('/', (req, res) => {
    res.send('Hello, world!');
});

module.exports = router;