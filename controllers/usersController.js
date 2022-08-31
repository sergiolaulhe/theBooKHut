const { validationResult } = require('express-validator');


const userController = {

    //***** User Login *****//

    login: (req, res) => {
        console.log(req.body)
        res.render('login');
        
    },
    processedLogin: (req, res) => {
        res.redirect('/')

    },

    //***** User Register *****//
    
    register: (req, res) => {
        res.render('register-create-form');
    },

    create: (req, res) => {
        const resultValidation = validationResult(req);
        
        if (resultValidation.errors.length > 0) {
            return res.render('register-create-form', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        return res.send('Exito!')

        // // if (errores.isEmpty()) {
        // //     const newUser = req.body;
        // //     res.render('/');
        // }
        // // } else {
        // //     res.render('register-create-form', { errors: errors.array(), old: req.body });
        // // };
        // // // const userRegister = {
        // // //     email: req.body.email,
        // // //     confirm: req.body.confirm,
        // // //     password: req.body.password,
        // // // }

        // // res.redirect('/')

    },

    //***** User Profile *****//

};

module.exports = userController;