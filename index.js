const express = require('express');
const server = express();
const apiRouter = require('./apiRouter');

server.use(express.json());

server.use('/api', apiRouter);

server.listen(8000, () => console.log('API running on port 8000'));