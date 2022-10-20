// *************** Require's ****************//
const express = require('express');
const router = express.Router();
const { body } = require('express-validator')

// *************** Controller Requirer ****************//

const controller = require('../controllers/mainController');

//***** GET Home page *****//

router.get('/', controller.index);

//***** Search *****//

router.get('/search', controller.search);

router.get('/bestsellers', controller.bestSeller);
router.get('/newreleases', controller.new);



module.exports = router;

