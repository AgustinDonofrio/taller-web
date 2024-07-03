const Product = require('../models/Product.js');
const fs = require('fs');
const path = require('path');

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
        const { name, types, freeGluten, price, caduceDate, stock, description} = req.body;
        console.log('Datos recibidos:', req.body);
        const commerceId = req.session.uCommerce.id;
        const photo = '/images/' + req.file.filename; // Ruta de la foto
        const newProduct = new Product({
            name, 
            type: types, 
            freeGluten, 
            price, 
            caduceDate, 
            stock, 
            description, 
            commerce: commerceId, 
            photo
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
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        // Obtener la ruta completa de la imagen a eliminar
        const imagePath = path.join(__dirname, '../public', product.photo);
        // Verificar si el archivo existe antes de intentar eliminarlo
        if (fs.existsSync(imagePath)) {
            // Eliminar el archivo
            fs.unlinkSync(imagePath);
            console.log(`Archivo ${imagePath} eliminado exitosamente.`);
        }
        // Eliminar el producto de la base de datos
        await Product.findByIdAndDelete(productId);
        res.redirect('/commerces');
    } catch (error) {
        res.status(500).json({message: error.message});        
    }    
};