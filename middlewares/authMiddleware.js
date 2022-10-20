function authMiddleware (req, res, next) {
    if (!req.session.userLogged) {
        return res.redirect('users/login');
    }
    next();
};

module.exports = authMiddleware;

// Recordá que para validar un campo utilizamos el método “check” que nos trae express-validator. Si queremos chequear que un campo no venga vacío, podemos usar .notEmpty(). Por último, cuando validamos campos de email, podemos usar uno de los métodos específicos para chequear que el dato que nos llegue sea un email, este se llama isEmail().