const fs = require('fs');

function logDBMiddleware (req, res, next) {
    fs.appendFileSync('./log/logDB.txt', 'Se creo un registro al ingresar en la pagina ' + req.url);

    next();
};

module.exports = logDBMiddleware;