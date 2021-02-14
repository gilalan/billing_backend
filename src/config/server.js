const PORT = process.env.PORT || 3003;

const bodyParser = require('body-parser');
const express = require('express'); //singleton, posso declarar em outro lugar que vai ser a mesma instância

const allowCors = require('./cors');

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(allowCors);

server.listen(PORT, () => console.log(`Server running on ${PORT}...`));

server.use('/test', (req, res) => {res.send('hello')});

module.exports = server;
