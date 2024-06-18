const Commerce = require('../models/Commerce.js');
const Product = require('../models/Product.js');


// Crear un nuevo comercio
exports.createCommerce = async (req, res) => {
    try {
        const {name, password, email, adress} = req.body;
        const newCommerce = new Commerce({name, password, email, adress});
        await newCommerce.save();
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};


// Método para obtener productos por id_commerce
exports.getProductsByCommerce = async (req, res) => {
    try {
        const commerceId = req.session.uCommerce.id;
        const products = await Product.find({ commerce: commerceId });
        res.render('commerces', { products, user: req.session.uCommerce });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


