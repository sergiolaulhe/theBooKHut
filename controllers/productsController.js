const fs = require('fs');
const path = require('path');
// const { CLIENT_RENEG_LIMIT } = require('tls');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
    
    //***** Get all products *****//
    index: (req, res) => {
        res.render('products', {products});
    },

    //***** Detail - Detail from one product *****//
    detail: function (req, res) {
        const idProduct = req.params.id;
		const product = products.find( elemento => elemento.id == idProduct);
		res.render('productDetail', {product: product});
    },

    // Create - Form to create
    create: (req, res) => {
        res.render('product-create-form');

    // Create - Method to store    
    },
    store: (req, res) => {
        if (req.file) {
            const newProduct = req.body;
            newProduct.image = req.file.filename;
            newProduct.id = products.length + 1;
            products.push(newProduct);
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
            res.redirect('/');
        }else{
            res.render('product-create-form');
        }
        
    },

    // Update - Form to edit
    edit: (req, res) => {
        const idProduct = req.params.id;
		const productEdit = products.find( item => item.id == idProduct)
		res.render('product-edit-form', { productEdit })

    },
    
    // Update - Method to update
    update: (req, res) => {
        const productEdit = req.body;
        console.log({productEdit});

        res.redirect('/')

    },

    // Delete - Delete one product from DB
    destroy: (req, res) => {
        const idProduct = req.params.id;
        console.log({idProduct})
        const productsFilter = products.filter( elemento => elemento.id != idProduct )
        const data = JSON.stringify(productsFilter, null, ' ')
        fs.writeFileSync(productsFilePath, data);
        res.redirect('/');
    }



}

module.exports = productsController;