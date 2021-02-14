const express = require('express');


module.exports = function (server) {

    //Definir URL base para todas as rotas (/api)
    const router = express.Router();
    server.use('/api', router);

    //Definir rotas de autenticação
    const User = require('../api/user/userService');
    User.register(router, '/users');

    //Definir rotas de ciclo de pagamento
    const BillingCycle = require('../api/billingCycle/billingCycleService');
    BillingCycle.register(router, '/billingCycles');

    
}