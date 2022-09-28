const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const Op = db.Sequelize.Op;

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    
    index: (req, res) => {
        res.render( 'index', {products:products} );
    },

    //Agregar busqueda con DB!!//

    search: (req, res) => {
        const formSearch = req.query.keywords.toLowerCase();
        console.log(formSearch)

		const productSearch = products.filter((item) => {
            const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
			return item.name.toLowerCase().includes(formSearch);
		});
        console.log(productSearch)
        res.render('results', {productSearch, formSearch});
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
        });
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
        });
    }
    
};

module.exports = controller;