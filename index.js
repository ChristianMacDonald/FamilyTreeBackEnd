const express = require('express');
const server = express();

server.use(express.json());

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

server.get('/', (req, res) => {
    res.send('Hello, world!');
});

server.get('/hobbits', (req, res) => {
    res.status(200).json(hobbits);
});

server.get('/hobbits/:id', (req, res) => {
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

server.post('/hobbits', (req, res) => {
    const hobbit = req.body;
    hobbits.push(hobbit)
    res.status(201).json({ message: 'New record created successfully' });
});

server.put('/hobbits/:id', (req, res) => {
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

server.delete('/hobbits/:id', (req, res) => {
    const id = parseInt(req.params.id);

    for (let i = 0; i < hobbits.length; i++) {
        if (hobbits[i].id === id) {
            const deleted_hobbit = hobbits[i];
            hobbits.splice(i, 1);
            res.status(200).json(deleted_hobbit);
        }
    }
});

server.listen(8000, () => console.log('API running on port 8000'));