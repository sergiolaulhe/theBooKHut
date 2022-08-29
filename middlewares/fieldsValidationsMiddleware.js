const { body } = require('express-validator');

const fieldsValidationsMiddleware = [
    body('email').notEmpty(),
    body('mailConfirmation').notEmpty(),
    body('password').notEmpty(),
    body('userName').notEmpty(),

];

module.exports = fieldsValidationsMiddleware;