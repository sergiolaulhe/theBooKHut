const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    
    index: (req, res) => {
        res.render( 'index', {products:products} );
    },

    search: (req, res) => {
        const formSearch = req.query.keywords.toLowerCase();
        console.log(formSearch)

		const productSearch = products.filter((item) => {
            const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
			return item.name.toLowerCase().includes(formSearch);
		});
        console.log(productSearch)
        res.render('results', {productSearch, formSearch});
    }
};

module.exports = controller;