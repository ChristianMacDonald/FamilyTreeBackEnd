const express = require('express');
const router = express.Router();
const hobbitRouter = require('./hobbitRouter');

router.use('/hobbits', hobbitRouter);

router.get('/', (req, res) => {
    res.send('Hello, world!');
});

module.exports = router;