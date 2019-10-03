const helpers = require('../helpers');

module.exports = {
    GET : {
        handler : function(req, res){
            helpers.respond(req, res, 'GET : Miaw')
        }
    },
    POST : {
        handler : function(req, res){
            helpers.respond(req, res, 'POST : Miaw')
        }
    }
}