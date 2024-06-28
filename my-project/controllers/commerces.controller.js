const Commerce = require('../models/Commerce.js');
const Product = require('../models/Product.js');
const User = require('../models/User.js');
const Order = require('../models/order');

// Crear un nuevo comercio
exports.createCommerce = async (req, res) => {
    try {
        const {name, password, email, address} = req.body;
        const newCommerce = new Commerce({name, password, email, address});
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


// Método para obtener comercios
exports.getCommerces = async (req, res) => {
    try {
        const stores = await Commerce.find();
        res.render('stores', { stores, user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


// Método para obtener las compras de los usuarios
exports.getCompras = async (req, res) => {
    try {
        const commerceId = req.session.uCommerce.id;
        const orders = await Order.find({ commerce: commerceId })
            .populate('user', 'firstName lastName')  
            .populate('product', 'name price'); 

        res.render('compras', { orders, user: req.session.uCommerce });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};



