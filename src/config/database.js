const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = process.env.MONGODB_URI ? process.env.MONGODB_URI : process.env.MONGODB_LOCAL;

const connect = mongoose.connect(url, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    }
);

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório.";
mongoose.Error.messages.Number.min = "O valor '{VALUE}' informado é menor que o limite mínimo '{MIN}'.";
mongoose.Error.messages.Number.max = "O valor '{VALUE}' informado é maior que o limite máximo '{MAX}'.";
mongoose.Error.messages.String.enum = "O valor '{VALUE}' não é válido para o atributo '{PATH}'.";
// try {
    

//     console.log("DB - connection success with Atlas MongoDB");

// } catch (error) {
    
//     console.log(`DB - Aconteceu um erro: ${error}`);

// }


module.exports = connect;