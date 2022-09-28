const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require('../database/models/');


const productsController = {

// ***** Get all products ***** //

    list: function(req, res) { 
        db.Books.findAll({
            include: [{ association: 'author'}],
            order: [
                ['title', 'ASC'],
            ],
        })
            .then(function(books) {
                console.log(books);
                res.render('productsList', { books })
            })
    },
    

    // index: (req, res) => {
    //     res.render('productsList', {products});
    // },

// ***** Detail - Detail from one product ***** //
    
    detail: function (req, res) {
        console.log('Funciona!'); 
        db.Books.findByPk(req.params.id)
            .then(function(book){
                console.log(book)
                res.render('productDetail', { book })
            })
    },

    // detail: function (req, res) {
    //     console.log('hola');
    //     const idProduct = req.params.id;
	// 	const product = products.find( elemento => elemento.id == idProduct);
	// 	res.render('productDetail', {product: product});
    // },

// ***** Create - Form to create ***** //

    add: (req, res) => {
        //agregar las claves foraneas:
        // let promGenres = Genres.findAll();
        // let promActors = Actors.findAll();
        
        // Promise
        // .all([promGenres, promActors])
        // .then(([allGenres, allActors]) => {
        //     return res.render(path.resolve(__dirname, '..', 'views',  'moviesAdd'), {allGenres,allActors})})
        // .catch(error => res.send(error))

        res.render('product-create-form');
    },

// ***** Create - Method to store ***** //

    create: (req, res) => {
        let errors = validationResult(req);
        
        if(errors.isEmpty()){
            db.Books.create({
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                stock: req.body.stock,
                image: req.file.filename,
                author_id: req.body.author,
                category_id: req.body.category,
                publisher_id: req.body.publisher,
                status_id: req.body.status
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
        console.log('FUnciona');
        db.Books.findByPk(req,params.id) 
            .then(function(book) {
                console.log(book);
                res.render('productEditForm', { book })
            }


        // const idProduct = req.params.id;
		// const productEdit = products.find( item => item.id == idProduct)
		// res.render('product-edit-form', { productEdit })
    )},
    
// ***** Update - Method to update ***** //

    update: (req, res) => {
    db.Books.update({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        stock: req.body.stock,
        image: req.file.filename,
        author_id: req.body.author,
        category_id: req.body.category,
        publisher_id: req.body.publisher,
        status_id: req.body.status
    
    }, {
        where: {
            id: req.paramas.id
        }
    }).then(function(){
        res.redirect('/products/detail' + req.params.id)
    })

    
    // update: (req, res) => {
    //     const productEdit = req.body;
    //     console.log({productEdit});

    //     res.redirect('/')

    },

// ***** Delete - Delete one product from DB ***** //

    delete: (req, res) => {
        console.log('Eliminar');
        db.Books.destroy({
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