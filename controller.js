const helpers = require('./helpers');
const url = require('url');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const routes = {};

if(fs.existsSync('./api')){
    fs.readdirSync('./api').forEach( (file) => {
        let basename = path.basename(file, '.js')
        routes[`/${basename}`] = require(`./api/${basename}`);
    })
}

// routes['/duck'] = require('./api/duck');
// routes['/cat'] = require('./api/cat');

//routes['api/duck'].GET.handler()

module.exports = function (req, res){
    logger(req, res);
    let endpoint = url.parse(req.url).pathname;
    if (endpoint === '/'){
        helpers.redirect(res, '/public/html/index.html')
    }


    let regEx = /^\/(public\/(html|css|js|img)\/(.+)\.(html|css|js|png|jpg|jpeg|gif|svg|bmp))$/;
    let fileReq = endpoint.match(regEx);
    if(fileReq) {
        //helpers.respond(req, res, fileReq[1])
        helpers.fileRespond(req, res, fileReq[1])
        return;
    }

    if(routes[endpoint]){
        let action = routes[endpoint];
        if (action[req.method]){
            let handler = action[req.method].handler
            handler(req, res);
            return;
        }
        helpers.respond(req, res, `Metode ${req.method} ikke tilladt her`, 405)
    }

    helpers.respond(req, res, {besked : ' fil ikke fundet'}, 404);
    
}