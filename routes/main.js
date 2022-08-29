// *************** Require's ****************//
const express = require('express');
const router = express.Router();
const { body } = require('express-validator')

// *************** Controller Requirer ****************//

const controller = require('../controllers/mainController');

//***** GET Home page *****//

router.get('/', controller.index);
router.get('/search', controller.search);


module.exports = router;

