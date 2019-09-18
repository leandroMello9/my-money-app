const server = require('./config/Server')
require('./config/Database')
require('./config/routes')(server)