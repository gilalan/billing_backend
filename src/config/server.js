const PORT = process.env.PORT || 3003;

//const bodyParser = require('body-parser');
const express = require('express'); //singleton, posso declarar em outro lugar que vai ser a mesma instância
const queryParser = require('express-query-int');
const cors = require('cors');
//const allowCors = require('./cors');
//server.use(allowCors);

const server = express();

server.use(queryParser());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    server.use(cors());
    next();
});

server.listen(PORT, () => console.log(`Server running on ${PORT}...`));

server.use('/test', (req, res) => {res.send('hello')});

module.exports = server;
