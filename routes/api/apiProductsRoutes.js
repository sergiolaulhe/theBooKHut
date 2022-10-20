// *************** Require's ****************//

const express = require('express');
const router = express.Router();

// *************** Controller Requirer ****************//

const apiProductsController =  require('../../controllers/api/apiProductsController');

//***** APIs Products list/detail *****//

router.get('/products', apiProductsController.list);
router.get('/product/:id', apiProductsController.detail);

//***** APIs Category list/detail *****//

router.get('/categories', apiProductsController.categoriesList);
router.get('/category/:id', apiProductsController.categoryDetail);

//***** APIs Products create *****//

router.post('/products/create', apiProductsController.create);

//***** APIs Products delete *****//

router.delete('/products/delete/:id', apiProductsController.destroy);



module.exports = router;