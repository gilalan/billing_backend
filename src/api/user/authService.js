const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//require('dotenv');
const User = require('./user');
const sendErrorsFromDB = require('../common/errorsDB');

const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%]).{6,20})/;

const login = (req, res, next) => {
    //console.log('Entrando no login...');
    const email = req.body.email || '';
    const password = req.body.password || '';

    //console.log('Email: ', email);
    //console.log('Pass: ', password); aA1234#

    User.findOne({ email }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(es, err);
        }
        else if (user && bcrypt.compareSync(password, user.password)){

            //console.log('Encontrou user? ', user);
            const token = jwt.sign(user.toJSON(), process.env.AUTH_SECRET, {
                expiresIn: "1 day"
            });
            //console.log('token? ', token);
            const { name, email } = user;
            //console.log("Enviando de volta: ", {name, email, token});
            res.json({ name, email, token });
         
        } else {
            //console.log("Usuário e/ou senha inválidos");
            return res.status(400).send({ errors: ['Usuário/Senha inválidos'] });
        }
    })
}

const validateToken = (req, res, next) => {
    const token = req.body.token || '';

    jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
        return res.status(200).send({ valid: !err });
    })
}

const signup = (req, res, next) => {
    //console.log('Entrando no signup...', req.body);
    const name = req.body.name || '';
    const email = req.body.email || '';
    const password = req.body.password || '';
    const confirmPassword = req.body.confirm_password || '';

    if (!email.match(emailRegex)) {
        return res.status(400).send({ errors: ['O e-mail informado está inválido'] });
    }

    if (!password.match(passwordRegex)) {
        return res.status(400).send({ errors: ['Senha precisa ter: uma letra maiúscula, uma letra minúscula, um dígito e um caracter especial'] });
    }

    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(password, salt);
    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({ errors: ['Senhas não conferem'] });
    }

    User.findOne({ email }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err);
        }
        else if (user) {
            return res.status(400).send({ errors: ['Usuário já cadastrado'] });
        }
        else {
            const newUser = new User({ name, email, password: passwordHash });
            newUser.save(err => {
                if (err) {
                    return sendErrorsFromDB(res, err);
                } else {
                    login(req, res, next);
                }
            });
        }
    });
}

module.exports = { login, validateToken, signup };