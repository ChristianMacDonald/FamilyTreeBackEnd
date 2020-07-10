const express = require('express');

const server = express();
const hostname = 'localhost';
const port = 5000;

server.get('/', (req, res) => {
    res.send('Hello from Express!');
});

server.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port}`)
});