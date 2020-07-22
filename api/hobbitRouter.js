const express = require('express');
const model = require('./hobbitModel');
const router = express.Router();

const validateHobbit = (req, res, next) => {
    const { name } = req.body;
    
    if (name) {
        next();
    } else {
        res.status(400).json({ errorMessage: 'Missing name field' });
    }
}

const validateHobbitId = async (req, res, next) => {
    const id = parseInt(req.params.id)
    const hobbit = await model.findById(id);
    if (hobbit) {
        req.id = id;
        req.hobbit = hobbit;
        next();
    } else {
        res.status(404).json({ errorMessage: `Failed to find hobbit with id ${id}` });
    }
}

router.get('/', async (req, res) => {
    const hobbits = await model.find();
    res.status(200).json(hobbits);
});

router.get('/:id', validateHobbitId, (req, res) => {
    res.status(200).json(req.hobbit);
});

router.post('/', validateHobbit, async (req, res) => {
    const hobbit = await model.add(req.body);
    res.status(200).json(hobbit);
});

router.put('/:id', validateHobbitId, async (req, res) => {
    const hobbit = await model.update(req.body, req.id);
    res.status(200).json(hobbit);
});

router.delete('/:id', validateHobbitId, async (req, res) => {
    await model.remove(req.id);
    res.status(200).json(req.hobbit);
});

module.exports = router;