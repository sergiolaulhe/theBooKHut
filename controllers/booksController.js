const path = require('path');
let db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

let booksController = {
    
    crear: function (req, res) {
        console.log('Funciona');
        db.Book.findAll()
            .then(function(books){
                return res.render('prueba', { books:books });
            })
    },
    guardado: function (req, res) {
        db.Book.create({
        title: req.body.title,
        name: req.body.author,
        price: req.body.price,
        description: req.body.description,
        publisher_id: req.body.publisher,


        });
        res.redirect('/products');
    },
    listado: function (req, res) {
        console.log('listado');
        db.Book.findAll()
            .then(function(libros) {
                res.render('listadoLibros', { libros:libros })
            })
    }
    
}

module.exports = booksController;