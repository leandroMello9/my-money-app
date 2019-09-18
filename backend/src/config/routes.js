const express = require('express')

module.exports = function(server) {
    //Definir a URL base das Rotas
    
    const router = express.Router()
    
    server.use('/api',router)

    //Rotas de Ciclo de Pagamento
    const BillingCycle = require('../api/billingCycle/biilingCyleService')
    BillingCycle.register(router,'/billingCycles')

}