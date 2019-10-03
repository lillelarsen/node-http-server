const http = require('http');
const controller = require('./controller');


http.createServer(controller).listen('3000');
