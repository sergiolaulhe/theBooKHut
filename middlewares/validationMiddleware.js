const { check } = require('express-validator');

module.exports = [

   check('name')

       .notEmpty()

       .withMessage('Ingresar un nombre')

       .bail()

       .isLength({max: 2})

       .withMessage('El nombre debe tener mas de dos caracteres'),


]