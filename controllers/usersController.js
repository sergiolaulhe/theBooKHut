const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../User')

const db = require('../database/models/');

const userController = {

//***** User Login *****//

    login: (req, res) => {
        res.render('login');
        
    },

    loginProcess: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);
        
        if (userToLogin) {
            let validPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (validPassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                if (req.body.remember) {
                    res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 2 })
                }
                return res.redirect('/users/profile');
            }
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'La contraseña no pertencece a un usuario registrado'
                    }
                }
            });
        }

        return res.render('login', {
            errors: {
                email: {
                    msg: 'Este mail no pertenece a un usuario registrado'
                }
            }
        });
    },

//***** User Logout *****//

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },

//***** User Registration *****//
    
    register: (req, res) => {
        res.render('register-create-form');
        
    },

    // create: (req, res) => {
    //     db.Users.create({
    //         name: req.body.name,
    //         email: req.body.email,
    //         password: req.body.password,
    //         user_name: req.body.userName,
    //         birth_date: req.body.birthDate,
    //         address: req.body.address,
    //         phone: req.body.phone
    //     })
    // },

    create: (req, res) => {
        
        let resultValidation = validationResult(req);
        
        if (resultValidation.errors.length > 0) {
            return res.render('register-create-form', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });   
        }

        let userInDB = User.findByField('email', req.body.email);

        if (userInDB) {
            return res.render('register-create-form', {
                errors: {
                    email: {
                        msg: 'Ya exite un usuario registrado con ese email'
                    }
                },
                oldData: req.body
            });
        }

        let registeringUser = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
        }

        let userCreated = User.create(registeringUser);

        return res.redirect('login');

    },

    //***** User Profile *****//

    profile: (req, res) => {
        return res.render('userProfile', {
            user: req.session.userLogged
        });

    },

//***** User Profile Update *****//

    update: (req, res) => {
        db.Users.update({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
    //      user_name: req.body.userName,
    //      birth_date: req.body.birthDate,
    //      address: req.body.address,
    //      phone: req.body.phone

        },
        {
            where: {id : req.params.id}
        })
    },

//***** User Profile Delete *****//

    delete: (req, res) => {
        db.Users.destroy({
            where: { id: req.params.id }
        })
    }

    

};

module.exports = userController;