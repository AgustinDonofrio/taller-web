const Product = require('../models/Product.js');

// Obetener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products', { products, user: req.session.uCommerce });
    } catch (error) {
        res.status(500).json({message: error.message});
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
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {new: true});
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});        
    }    
};

// Borrar un producto por su id. (en Postman - http://localhost:3000/api/products/"id del producto")
exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});        
    }    
};