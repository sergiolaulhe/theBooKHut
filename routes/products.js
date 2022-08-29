//***** Require's *****//

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator');

//***** Multer configuration *****//
const storage = multer.diskStorage( {
    destination: function (req, file, cb) {
        cb(null, 'public/images/products')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const uploadFile = multer( {storage:storage} );

//***** Controller Require *****//

const productsController = require('../controllers/productsController');

//***** Get all products *****//

router.get('/', productsController.index);

//***** Get product detail *****//

router.get('/detail/:id', productsController.detail);

//***** Create one product *****//

router.get('/create', productsController.create);
router.post('/', uploadFile.single('image'), productsController.store);

//***** Edit one product *****//

router.get('/edit/:id', productsController.edit);
router.put('/edit/:id', productsController.update);

//***** Delete one product *****//
router.delete('/delete/:id', productsController.destroy);


module.exports = router;