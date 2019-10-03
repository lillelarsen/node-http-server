const fs = require('fs');
const path = require('path');
const mimetypes = require('./mimetypes');

//Hvad skal der respondes
module.exports.respond = function(req, res, msg, status = 200){
    res.writeHead(status, {'Content-type': 'application/json'});
    res.end(JSON.stringify(msg));
}
//Ser hvad content-type filen har (fra mimetypes.js)
module.exports.fileRespond = function(req, res, filename){
    let extname = path.extname(filename);
    let mime = mimetypes[extname];
    // fs.readFile(filename, (err, filecontent) => {
    //     if(err){
    //         module.exports.respond(req, res, 'Fil ikke fundet', 404);
    //         return;
    //     }
    //     res.writeHead(200, {'Content-type' : mime.type})
    //     res.end(filecontent);
    // })
    let stream = fs.createReadStream(filename);
    stream.on('error', e => {
        module.exports.respond(req, res, e, 404);
        return;
    })
    res.writeHead(200, {'Content-type' : mime.type})
    stream.pipe(res);
}
module.exports.redirect = function(res, url){
    res.writeHead(301, {location : url});
    res.end();
}