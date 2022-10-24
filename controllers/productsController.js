const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require('../database/models/');

const { Op } = require("sequelize");

const sequelize = db.sequelize;


const productsController = {

// ***** Get all products from DB ***** //

    list: function(req, res) { 
        db.Book.findAll({
            include: [{ association: 'author'}, { association: 'publisher'}],
            order: [
                ['title', 'ASC'],
            ],
        })
            .then(function(books) {
                res.render('products-list', { books })

            }).catch((error) => {
                console.log({ error });
                res.send('la cague')
            })
            
    },

// ***** Detail - Detail from one product ***** //
    
    detail: function (req, res) { 
        db.Book.findByPk(req.params.id, {
            include: [{ association: 'author'}, { association: 'publisher'}],
        })
            .then(function(book){
                res.render('product-detail', { book })

            }).catch((error) => {
            console.log({ error });
            res.send('la cague')
        })

    },

// ***** Search - product list ***** //

    search: async function (req, res) {

        const search = req.query.search;
        console.log(search);

        await db.Book.findAll({
            include: [{ association: 'author'}],
            order: [
                // ['title', 'ASC'],
            ],
            where: { 
                [Op.or]: 
                [
                    { title: { [Op.like]: ('%' + req.query.search + '%') } },
                    { '$author.first_name$': { [Op.like]: ('%' + req.query.search + '%') } },
                    { '$author.last_name$': { [Op.like]: ('%' + req.query.search + '%') } },
            
                ]
            },
            })
            .then (results => {
                console.log(results);
                if (results.length > 0) {
                    return res.render('product-search-results', { results });
                } else {
                    console.log(results);
                    let msg = 'No se encuentran coincidencias en nuestra base de datos';
                    return res.render('prueba');
                }
            })
            .catch((error) => {
                console.log({ error });
                res.send('la cague')
            })


    },

// ***** CRUD ***** //

// ***** add - Form to create ***** //

    add: (req, res) => {
        const allAuthors = db.Author.findAll();
        const allCategorys = db.Category.findAll();
        const allPublishers = db.Publisher.findAll();
        const allClassifications = db.Classification.findAll();

        Promise.all([allAuthors, allCategorys, allPublishers, allClassifications])
        .then(([allAuthors, allCategorys, allPublishers, allClassifications]) => {
            res.render('product-create-form', { allAuthors:allAuthors, allCategorys:allCategorys, allPublishers:allPublishers, allClassifications:allClassifications})

        }).catch((error) => {
            console.log({ error });
            res.send('la cague')
        })
        
    },

// ***** Create - Method to store ***** //

    create: async (req, res) => {
        // let errors = validationResult(req);
        
        // if(errors.isEmpty()){
            await db.Book.create({
                title: req.body.title,
                author_id: req.body.author_id,
                category_id: req.body.category_id,
                price: req.body.price,
                description: req.body.description,
                publisher_id: req.body.publisher_id,
                classification_id: req.body.classification_id,
                stock: req.body.stock,
                release_date: req.body.release_date,
                image: req.file.filename
                
            }).then(function(data){
                return res.redirect('/products');

            }).catch((error) => {
                console.log({ error });
                res.send('la cague')
            })
            
        // }else{
        //     res.render('product-create-form', { errors:errors.mapped(), old: req.body })
        // }
        
    },

// ***** Update - Form to edit ***** //

    edit: (req, res) => {
        
        const Book = db.Book.findByPk(req.params.id);
        const allAuthors = db.Author.findAll();
        const allCategorys = db.Category.findAll();
        const allPublishers = db.Publisher.findAll();
        const allClassifications = db.Classification.findAll();
        
        Promise.all([Book, allAuthors, allCategorys, allPublishers, allClassifications])
            .then(([Book, allAuthors, allCategorys, allPublishers, allClassifications]) => {
                res.render('product-edit-form', { Book:Book, allAuthors:allAuthors, allCategorys:allCategorys, allPublishers:allPublishers, allClassifications:allClassifications})

        }).catch((error) => {
            console.log({ error });
            res.send('la cague')
        })

},
    
// ***** Update - Method to update ***** //

    update: async (req, res) => {
        
        await db.Book.update({
            title: req.body.title,
            author_id: req.body.author_id,
            category_id: req.body.category_id,
            price: req.body.price,
            description: req.body.description,
            publisher_id: req.body.publisher_id,
            classification_id: req.body.classification_id,
            release_date: req.body.release_date,
            stock: req.body.stock,
            image: req.file.filename
    
        }, {
            where: {
                id: req.params.id
            }
        })
        /* if (req.file) { objeto.image}*/
        .then((book) => {
            res.redirect('/products')
        })
        .catch((error) => {
            console.log({ error });
            res.send('la cague')
        })

    },

// ***** Delete - Delete one product from DB ***** //

    delete: (req, res) => {
        db.Book.findByPk(req.params.id)
        .then((Book) => {
            res.render('product-delete-form', { Book: Book });

        }).catch((error) => {
            console.log({ error });
            res.send('la cague')
        })
    },

    destroy: (req, res) => {
        db.Book.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(book){
            res.redirect('/products')
        })
        .catch((error) => {
            console.log({ error });
            res.send('la cague')
        })
    }
}

module.exports = productsController;