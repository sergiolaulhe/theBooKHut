// *************** Require's ****************//

const express = require('express');
const router = express.Router();

// *************** Controller Requirer ****************//

const apiUsersController =  require('../../controllers/api/apiUsersController');

//***** APIs Users list *****//

router.get('/users', apiUsersController.list);

//***** APIs User detail *****//

router.get('/user/:id', apiUsersController.detail);



module.exports = router;