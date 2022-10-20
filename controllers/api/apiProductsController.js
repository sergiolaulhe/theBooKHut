// *************** Require's ****************//

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const db = require('../../database/models');

const sequelize = db.sequelize;

// *************** Controller Requirer ****************//

const apiProductsController = {

// ***** Get all products from DB ***** //

    list: async function(req, res) { 
        await db.Book.findAll()
            .then(function(books) {
                res.json({
                    meta: {
                        status: 200,
                        total: books.length,
                        url: "api/v1/products"
                
                    },
                    data: books
                })

            }).catch((error) => {
                console.log({ error });
                res.status(500).json({
                    mensaje: 'Error de conexión'
                })
            })
            
    },

// ***** Detail - Detail from one product ***** //
    
    detail: function (req, res) { 
        db.Book.findByPk(req.params.id)
        .then(function(book) {
            res.json({
                meta: {
                    status: 200,
                    url: "api/v1/product/id"
            
                },
                data: book
            })

        }).catch((error) => {
            console.log({ error });
            res.status(500).json({
                mensaje: 'Error de conexión'
            })
        })

    },

// ***** Get all categories from DB ***** //
    
    categoriesList: function(req, res) { 
        db.Category.findAll()
            .then(function(categories) {
                res.json({
                    meta: {
                        status: 200,
                        total: categories.length,
                        url: "api/v1/categories"
                    
                    },
                    data: categories
                })
    
            }).catch((error) => {
                    console.log({ error });
                    res.status(500).json({
                        mensaje: 'Error de conexión'
                    })
            })
                
    },
    
    // ***** Detail - Detail from one category ***** //
        
    categoryDetail: function (req, res) { 
        db.Category.findByPk(req.params.id)
            .then(function(category) {
                res.json({
                    meta: {
                        status: 200,
                        url: "api/v1/category/id"
                    },
                    data: category
                })

            }).catch((error) => {
                console.log({ error });
                res.status(500).json({
                    mensaje: 'Error de conexión'
                })
            })
    
    },
    
// ***** CRUD ***** //
    
// ***** Create - Method to store ***** //
    
    create: async (req, res) => {

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
                image: req.body.image /* Que pasa en en el caso de las imagenes req.file.filename? */
                    
            }).then(function(book){
                return res.json({
                    meta: {
                        status: 200,
                        url: "api/v1/products/create"
                    },
                    data: book,
                    status: 200
                });
    
            }).catch((error) => {
                console.log({ error });
                res.status(500).json({
                    mensaje: 'Error de conexión'
                })
            })
                
    },

// ***** Delete - Delete one product from DB ***** //    

    destroy: (req, res) => {
        db.Book.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(book){
            res.json({
                meta: {
                    status: 200,
                    url: "api/v1/products/delete/id"
                },
                data: book
            })
        })
        .catch((error) => {
            console.log({ error });
            res.status(500).json({
                mensaje: 'Error de conexión'
            })
        })
    }    
    // // ***** Update - Form to edit ***** //
    
    //     edit: (req, res) => {
            
    //         const Book = db.Book.findByPk(req.params.id);
    //         const allAuthors = db.Author.findAll();
    //         const allCategorys = db.Category.findAll();
    //         const allPublishers = db.Publisher.findAll();
    //         const allClassifications = db.Classification.findAll();
            
    //         Promise.all([Book, allAuthors, allCategorys, allPublishers, allClassifications])
    //             .then(([Book, allAuthors, allCategorys, allPublishers, allClassifications]) => {
    //                 res.render('product-edit-form', { Book:Book, allAuthors:allAuthors, allCategorys:allCategorys, allPublishers:allPublishers, allClassifications:allClassifications})
    
    //         }).catch((error) => {
    //             console.log({ error });
    //             res.send('la cague')
    //         })
    
    // },
        
    // // ***** Update - Method to update ***** //
    
    // //     update: async (req, res) => {
            
    // //         await db.Book.update({
    // //             title: req.body.title,
    // //             author_id: req.body.author_id,
    // //             category_id: req.body.category_id,
    // //             price: req.body.price,
    // //             description: req.body.description,
    // //             publisher_id: req.body.publisher_id,
    // //             classification_id: req.body.classification_id,
    // //             release_date: req.body.release_date,
    // //             stock: req.body.stock,
    // //             image: req.file.filename
        
    // //         }, {
    // //             where: {
    // //                 id: req.params.id
    // //             }
    // //         })
    // //         /* if (req.file) { objeto.image}*/
    // //         .then((book) => {
    // //             res.redirect('/products')
    // //         })
    // //         .catch((error) => {
    // //             console.log({ error });
    // //             res.send('la cague')
    // //         })
    
    // //     },
    
    // // 
    
    // //     delete: (req, res) => {
    // //         db.Book.findByPk(req.params.id)
    // //         .then((Book) => {
    // //             res.render('product-delete-form', { Book: Book });
    
    // //         }).catch((error) => {
    // //             console.log({ error });
    // //             res.send('la cague')
    // //         })
    // //     },
    

    }

module.exports = apiProductsController;