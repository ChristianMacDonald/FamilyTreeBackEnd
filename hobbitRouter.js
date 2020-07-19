const express = require('express');
const router = express.Router();

let hobbits = [
    {
        id: 1,
        name: 'Samwise Gamgee'
    },
    {
        id: 2,
        name: 'Frodo Baggins'
    }
];

router.get('/', (req, res) => {
    res.status(200).json(hobbits);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let found = false;
    
    for (let i = 0; i < hobbits.length; i++) {
        if (hobbits[i].id === id) {
            res.status(200).json(hobbits[i]);
            found = true;
        }
    }

    if (!found) {
        res.status(404).json({ errorMessage: 'Hobbit not found' });
    }
})

router.post('/', (req, res) => {
    const hobbit = req.body;
    hobbits.push(hobbit)
    res.status(201).json({ message: 'New record created successfully' });
});

router.put('/:id', (req, res) => {
    const hobbit = req.body;
    const id = parseInt(req.params.id);
    let index = -1;

    for (let i = 0; i < hobbits.length; i++) {
        if (hobbits[i].id === id) {
            index = i;
            break;
        }
    }

    if (index != -1) {
        hobbits[index] = hobbit;
        res.status(200).json(hobbits[index]);
    } else {
        res.status(404).json({ errorMessage: 'Hobbit not found' });
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    for (let i = 0; i < hobbits.length; i++) {
        if (hobbits[i].id === id) {
            const deleted_hobbit = hobbits[i];
            hobbits.splice(i, 1);
            res.status(200).json(deleted_hobbit);
        }
    }
});

module.exports = router;