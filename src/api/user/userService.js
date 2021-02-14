const User = require('./user');

User.methods(['get', 'post', 'put', 'delete']);

/*
 * Pede para o nodeRestful trazer o objeto que foi atualizado (por padrão ele traz o objeto antigo)
 * Pede para o nodeRestful rodar os validadores tb no update (por padrão ele não roda)
 */

User.updateOptions({ new: true, runValidators: true });

module.exports = User;