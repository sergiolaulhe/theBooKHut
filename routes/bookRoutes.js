var express = require('express');
var router = express.Router();
var booksController = require('../controllers/booksController');


router.get('/crear', booksController.crear);

router.post('/crear', booksController.guardado);

router.get('/listado', booksController.listado);

module.exports = router;