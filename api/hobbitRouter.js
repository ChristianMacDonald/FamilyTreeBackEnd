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

const validateHobbitId = (req, res, next) => {
    id = parseInt(req.params.id)
    model.findById(id)
    .then(hobbit => {
        if (hobbit) {
            req.hobbit = hobbit;
            req.id = parseInt(req.params.id)
            next();
        } else {
            res.status(404).json({ errorMessage: `Hobbit with id ${id} not found` });
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: `Failed to find hobbit with id ${id}`});
    });
}

router.get('/', (req, res) => {
    model.find()
    .then(hobbits => {
        res.status(200).json(hobbits);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: 'Failed to find hobbits' });
    });
});

router.get('/:id', validateHobbitId, (req, res) => {
    res.status(200).json(req.hobbit);
});

router.post('/', validateHobbit, (req, res) => {
    const hobbit = req.body;
    model.add(hobbit)
    .then(hobbit => {
        res.status(200).json(hobbit);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: 'Failed to create hobbit' });
    });
});

router.put('/:id', validateHobbitId, (req, res) => {
    model.update(req.body, req.id)
    .then(hobbit => {
        res.status(200).json(hobbit);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: `Failed to update hobbit with id ${id}` });
    });
});

router.delete('/:id', validateHobbitId, (req, res) => {
    model.remove(req.id)
    .then(records => {
        res.status(200).json(req.hobbit);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: `Failed to delete hobbit with id ${req.id}` });
    });
});

module.exports = router;