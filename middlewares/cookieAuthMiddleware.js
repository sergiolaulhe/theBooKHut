function cookieAuthMiddleware (req, res, next) {
    
    if (req.cookies.recuerdame != undefined && req.session.usuarioLogueado == undefined) {
        let usersJSON = fs.readFileSync('users.json', { enconding: 'utf-8' })
            let users;
            if (usersJSON == '') {
                users = [];
            } else {
                users = JSON.parse(usersJSON);
            }
            let usuarioALoguearse

            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.cookies.recuerdame) {
                    usuarioALoguearse = users[i];
                    break;
                }
            }
            req.session.usuarioLogueado = usuarioALoguearse;
    }
    next();
}

module.exports = cookieAuthMiddleware;