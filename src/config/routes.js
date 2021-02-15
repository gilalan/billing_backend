const express = require('express');
const auth = require('./auth');

module.exports = function (server) {

    //Rotas privadas (autenticadas)
    const protectedApi = express.Router();
    server.use('/api', protectedApi);
    
    protectedApi.use(auth);
    
    //Definir rotas de ciclo de pagamento
    const BillingCycle = require('../api/billingCycle/billingCycleService');
    BillingCycle.register(protectedApi, '/billingCycles');
    
    //Definir rotas de autenticação
    const openApi = express.Router();
    server.use('/oapi', openApi);

    const AuthService = require('../api/user/authService');
    openApi.post('/login', AuthService.login);
    openApi.post('/validateToken', AuthService.validateToken);
    openApi.post('/signup', AuthService.signup);
    //const User = require('../api/user/userService');
    //User.register(router, '/users');

}