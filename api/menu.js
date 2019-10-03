const helpers = require('../helpers');

module.exports = {
    GET : {
        handler : function(req, res){
            let menu = {
                'home' : {Title : 'Hjem', url: '/'},
                'news' : 'Nyheder',
                'sport' : 'Sport'
            }
            helpers.respond(req, res, menu)
        }
    }
}