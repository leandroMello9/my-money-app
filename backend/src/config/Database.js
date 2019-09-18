const mongoose = require('mongoose')

mongoose.Promise = global.Promise

module.exports = mongoose.connect('mongodb://localhost/mymoney',{useNewUrlParser : true})

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatorio"
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o valor de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o valor de '{MAX} que é o limite maximo'."
mongoose.Error.messages.String.enum = "O '{VALUE}' não é valido para um atributo '{PATH}'"
