const Product = require('../models/Product.js');

// Obetener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products', { products, user: req.session.user });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.getProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.render('products-details', { product, user: req.session.user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, price, caduceDate, stock, description, photo } = req.body;
        const commerceId = req.session.uCommerce.id;
        const newProduct = new Product({
            name, price, caduceDate, stock, description, commerce: commerceId, photo
        });
        await newProduct.save();
        res.redirect('/commerces');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un producto por su id
exports.updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        await Product.findByIdAndUpdate(productId, req.body, {new: true});
        res.redirect('/commerces');
    } catch (error) {
        res.status(500).json({message: error.message});        
    }    
};

exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        await Product.findByIdAndDelete(productId);
        res.redirect('/commerces');
    } catch (error) {
        res.status(500).json({message: error.message});        
    }    
};