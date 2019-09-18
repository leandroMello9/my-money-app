
const billingCycle = require('./billingCycle')
const errorHandler = require('../commom/erroHandler')

//Metodos que serão utilizados
billingCycle.methods(['get','post','put','delete'])

//Retornando o novo objeto do restful, e aplicando as validações  
billingCycle.updateOptions({
     new: true,
     runValidators: true
 })
 //Aplicando midleware erroHandler
billingCycle.after('post', errorHandler).after('put', errorHandler)

 billingCycle.route('count',(req,res) => {
     billingCycle.count((error,value) => {
         if (error) {
             res.status(500).json({erros: [error]})
         } else {
             res.json({ value })
         }
     })
 })

billingCycle.route('summary', (req,res,next) => {
     billingCycle.aggregate([{
          //O valor que sera projetado será um atributo credit que contem a soma de todos os valores dos creditis da minha collection
         $project: {credit: {$sum : "$creditis.valor"}, debt : {$sum : "$debts.valor"}}
     },
     {
         
         //Reagrupando os valores ex pelo ano ou mês e agrupando em um novo documento
          $group : {_id : null , credit : {$sum : "$credit"}, debt: {$sum : "$debt"}},
     },
     {
         //Oque sera projetado no final do novo documento da agregassão 0 = false 1 = true
         $project: {_id: 0 , credit : 1 , debt : 1},

     }], (error,result) => {
         if (error) {
             res.status(500).json({erros : [error]})
         } else {
             res.json(result [0] || {credit: 0 , debt : 0})
         }
     })
})
module.exports = billingCycle
