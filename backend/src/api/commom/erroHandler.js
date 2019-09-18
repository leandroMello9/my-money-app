const _ = require('lodash')
//Midleware
module.exports = (req, res, next) => {
    //Bundle é onde se encontra a lista de erros
    const bundle = res.locals.bundle 

    if (bundle.errors) {
        const errors = parseErros(bundle.errors)
        res.status(500).json({errors}) 
    } else {
        next()
    }
}

const parseErros = (nodeRestfulErrors) => {
    const errors = []
    _.forIn(nodeRestfulErrors , error => errors.push(error.message))
    return errors

}