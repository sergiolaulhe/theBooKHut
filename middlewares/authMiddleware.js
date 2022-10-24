function authMiddleware (req, res, next) {
    if (!req.session.userLogged) {
        return res.redirect('users/login');
    }
    next();
};

module.exports = authMiddleware;

const {check} = require("express-validator");
 
module.exports = [

   check("name").notEmpty().withMessage("Ingresar un nombre").isLength({min: 3}).withMessage("El nombre debe tener mas de dos caracteres"),

];