// ***** Require's ***** //
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// ***** Controller Requirer ***** //

const usersController = require('../controllers/usersController');

// ***** Middlewares ***** //

const logDBMiddleware = require('../middlewares/logDBMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');



// ***** Field Validations ***** //

const validateRegisterForm = [
    body('name').notEmpty().withMessage('Debes completar este campo'),
    body('email').notEmpty().withMessage('Debes completar este campo').bail().isEmail().withMessage('Debes ingresar un email en formato valido'),
    body('mailConfirmation').notEmpty().withMessage('Debes completar este campo').isEmail().withMessage('Debes ingresar un email en formato valido'),
    body('password').notEmpty().withMessage('Debes completar este campo').bail().isLength({ min: 6 }).withMessage('La contraseña debe tener un minimo de 8 caracteres').bail().isLength({ max: 30 }).withMessage('La contraseña no debe tener mas de 30 caracteres'),
    body('userName').notEmpty().withMessage('Debes completar este campo'),
    body('birth_date').notEmpty().withMessage('Debes completar este campo'),

];

const validateLoginForm = [
    body('email').notEmpty().withMessage('Debes completar este campo').bail().isEmail().withMessage('Debes ingresar un email en formato valido'),
    body('password').notEmpty().withMessage('Debes completar este campo').bail().isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
];

const validateUpdateForm = [
    body('name').contains,
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').bail().contains({ Number}).withMessage('La contraseña debe tener al menos un número'),
];

//***** Users Register *****//

router.get('/register', guestMiddleware,usersController.register);
router.post('/register', logDBMiddleware, validateRegisterForm, usersController.create);

//***** Users Login *****//

router.get('/login', guestMiddleware,usersController.login);
router.post('/login', logDBMiddleware, validateLoginForm, usersController.loginProcess);

//***** User Logout *****//

router.get('/logout',usersController.logout);

//***** User Profile *****//

router.get('/profile', authMiddleware,usersController.profile);

//***** User Profile Update *****//

router.get('/update/:id', usersController.edit)
router.put('/update/:id', validateUpdateForm, usersController.update);

//***** User Profile Delete *****//

router.post('/profileDelete', usersController.delete);




module.exports = router;