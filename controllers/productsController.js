const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require('../database/models/');
const Category = require('../database/models/Category');


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
                res.render('productsList', { books })
            })
    },

// ***** Detail - Detail from one product ***** //
    
    detail: function (req, res) { 
        db.Book.findByPk(req.params.id, {
            include: [{ association: 'author'}, { association: 'publisher'}],
        })
        
            .then(function(book){
                res.render('productDetail', { book })
            });
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
            res.render('product-create-form1', { allAuthors:allAuthors, allCategorys:allCategorys, allPublishers:allPublishers, allClassifications:allClassifications})
        });

// opcion 3
        // db.Book.findAll({
        //     include: [{ association: 'author'}, { association: 'publisher'}],
        // })
        //     .then(function(books) {
        //         console.log(books);
        //         res.render('books-create-form', { books })
        //     })

        
    },

// ***** Create - Method to store ***** //

    create: (req, res) => {
        let errors = validationResult(req);
        
        if(errors.isEmpty()){
            db.Book.create({
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                stock: req.body.stock,
                image: req.file.filename,
                // author_id: req.body.author,
                // category_id: req.body.category,
                // publisher_id: req.body.publisher,
                // status_id: req.body.status
            }).then(function(data){
                return res.redirect('/products');

            })
        }else{
            res.render('product-create-form', { errors:errors.mapped(), old: req.body })
        }
        
    },
    
    // store: (req, res) => {
    //     if (req.file) {
    //         const newProduct = req.body;
    //         newProduct.image = req.file.filename;
    //         newProduct.id = products.length + 1;
    //         products.push(newProduct);
    //         fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
    //         res.redirect('/');
    //     }else{
    //         res.render('product-create-form');
    //     }
        
    // },

// ***** Update - Form to edit ***** //

    edit: (req, res) => {
        
        let Book = db.Book.findByPk(req.params.id);
        const allAuthors = db.Author.findAll();
        const allCategorys = db.Category.findAll();
        const allPublishers = db.Publisher.findAll();
        const allClassifications = db.Classification.findAll();
        
        Promise.all([Book, allAuthors, allCategorys, allPublishers, allClassifications])
        .then(([Book, allAuthors, allCategorys, allPublishers, allClassifications]) => {
            res.render('product-edit-form', { Book:Book, allAuthors:allAuthors, allCategorys:allCategorys, allPublishers:allPublishers, allClassifications:allClassifications})
        });

},
    
// ***** Update - Method to update ***** //

    update: (req, res) => {
        db.Book.update({
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
                id: req.paramas.id
            }
        }).
        then(function(book){
            res.redirect('/products')
    })

    
    // update: (req, res) => {
    //     const productEdit = req.body;
    //     console.log({productEdit});

    //     res.redirect('/')

    },

// ***** Delete - Delete one product from DB ***** //

    delete: (req, res) => {
        console.log('Eliminar');
        db.Book.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(){
            res.redirect('/products')
        })

        // const idProduct = req.params.id;
        // console.log({idProduct})
        // const productsFilter = products.filter( elemento => elemento.id != idProduct )
        // const data = JSON.stringify(productsFilter, null, ' ')
        // fs.writeFileSync(productsFilePath, data);
        // res.redirect('/');
    }
}

module.exports = productsController;