const express = require('express');
const cors = require('cors');
const server = express();
const apiRouter = require('./apiRouter');

server.use(express.json());
server.use(cors());

server.use('/api', apiRouter);

module.exports = server;