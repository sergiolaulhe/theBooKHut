const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../User')

const db = require('../database/models/');
const sequelize = db.sequelize;
const { Op } = require('sequelize');

const userController = {

//***** User Registration *****//
    
    register: (req, res) => {
        res.render('user-register-form');
        
    },

    create: async (req, res) => {
        try {
            let userInDB = await db.Users.findOne({
                where: {
                    email: req.body.email
                }
            });

            const resultValidation = validationResult(req);
            
            if (resultValidation.errors.length > 0) {
                return res.render('user-register-form', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });   
            } else if (userInDB) {
                return res.render('user-register-form', {
                    errors: {
                        email: {
                            msg: 'Ya exite un usuario registrado con ese email'
                        }
                    },
                    oldData: req.body
                });
            } else {
                let userCreated = db.Users.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    user_name: req.body.userName,
                    birth_date: req.body.birth_date,
                    address: req.body.address,
                    phone: req.body.phone,
                    role_id: '1'
                })
                .then((user) => {
                    return res.redirect('login');
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        } catch (error) {
            console.log(error);
            res.render('error');
        }
    },

//***** User Login *****//

    login: (req, res) => {
        res.render('login');
        
    },

    loginProcess: async (req, res) => {
        let userToLogin = await db.Users.findOne({
            where: {
                email: req.body.email
            }
        });
        if (userToLogin) {
            let validPassword = bcrypt.compareSync(req.body.password, userToLogin.password);

            if (validPassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                if (req.body.remember) {
                    res.cookie('userEmail', req.body.email, { maxAge: 10000 * 60 * 2 })
                }
                return res.redirect('/');
            }
            return res.render('login', {
                errors: {
                    password: {
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

//***** User Profile *****//

    profile: async (req, res) => {
        try {
            const user = await db.Users.findOne({
                where: {
                    id: req.session.userLogged.id
                }
            })
            console.log(user);
            res.render('user-profile', { user: user });

        } catch (error) {
            console.log({ error });
            res.send('la cague')
            };

    },

//***** User Profile Update *****//

    edit: async (req, res) => {
        try {
            await db.Users.findByPk(req.params.id)
        
                .then(function(user){
                    res.render('user-update-form', { user })
    
                }).catch((error) => {
                console.log({ error });
                res.send('la cague')
            })

        } catch (error) {
            console.log({ error });
            res.send('la cague')
            };

    },

    update: async (req, res) => {
        try {
            let userInDBUpdate = await db.Users.findOne({
                where: {
                    id: req.params.id
                }
            });
            console.log(userInDBUpdate);

            const myResultValidation = validationResult(req);

            console.log(myResultValidation);
            
            if (myResultValidation.errors.length > 0) {
                return res.render('user-update-form', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });  
            }
             else {
                db.Users.update({
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    user_name: req.body.userName,
                    birth_date: req.body.birth_date,
                    address: req.body.address,
                    phone: req.body.phone,
                }, { 
                    where: { id: req.params.id }
                })
                .then((user) => {
                    res.redirect('/');
                })
                
            }
        } catch (error) {
            console.log(error);
            res.render('error');
            }
    },

//***** User Profile Delete *****//

    delete: (req, res) => {
        db.Users.destroy({
            where: { id: req.params.id }
        })
    }

    

};

module.exports = userController;