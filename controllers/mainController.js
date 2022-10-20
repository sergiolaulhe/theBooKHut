const fs = require('fs');
const path = require('path');
const db = require('../database/models');

const { Op } = require("sequelize");

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

// ***** Home - Get all products by classification ***** //
    
    index: (req, res) => {
        db.Book.findAll({
            include: [{ association: 'author'}, { association: 'classification'}],
            order: [
                ['title', 'ASC'],
            ],
        })
            .then(function(books) {
                res.render('index', { books })

            }).catch((error) => {
            console.log({ error });
            res.send('la cague')
        })

    },

// ***** Home - Get all products by classification ***** //

    //Agregar busqueda con DB!!//
    
    search: (req, res) => {

        
        res.render('prueba')

        // db.Book.findAll({
        //     where: { 
        //         [Op.or]: 
        //         [
        //             { title: req.query.keywords.toLowerCase() },
        //             { author: req.query.keywords.toLowerCase() }
        //         ]
        //     },
        // })
        // .then (books => {
        //     console.log(books);
        //     if (books.length > 0) {
        //         return res.render('productList', { books });

        //     } else {
                
        //         let msg = 'No se encuentran coincidencias en nuestra base de datos';
        //         return res.render('productList', { msg });
        //     }
        // })

    },

    bestSeller: (req, res) => {
        db.Books.findAll({
            where: {
                classification_id: { ['db.Sequelize.Op.gt'] : 1 }
            },
            order: [['release_date', 'DESC']],
            limit: 5
        })
        .then(books => {
            res.render('bestSellersList', { books });

        }).catch((error) => {
            console.log({ error });
            res.send('la cague')
        })
    },
    new: (req, res) => {
        db.Books.findAll({
            order: [
                ['release_date', 'DESC'],
            ],
            limit: 5
        })
        .then(books => {
            res.render('newReleasesList', { books });

        }).catch((error) => {
            console.log({ error });
            res.send('la cague')
        })
    }
    
};

module.exports = controller;