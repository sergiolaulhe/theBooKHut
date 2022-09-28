//***** Require's *****//

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

//***** Middlewares *****//

const uploadFile = require('../middlewares/multerMiddleware');

// ***** Field Validations ***** //

const validateProductCreateForm = [
    body('title').notEmpty().withMessage('Debes completar este campo'),
    body('author').notEmpty().withMessage('Debes completar este campo'),
    body('price').notEmpty().withMessage('Debes completar este campo'),
    body('stock').notEmpty().withMessage('Debes completar este campo')
];


//***** Controller Require *****//

const productsController = require('../controllers/productsController');

//***** Get all products *****//

router.get('/', productsController.list);

//***** Get product detail *****//

router.get('/detail/:id', productsController.detail);

//***** Create one product *****//

router.get('/add', productsController.add);
router.post('/create', uploadFile.single('image'), validateProductCreateForm, productsController.create);

//***** Edit one product *****//

router.get('/edit/:id', productsController.edit);
router.put('/update/:id', productsController.update);

//***** Delete one product *****//
router.delete('/delete/:id', productsController.delete);


module.exports = router;