const mongoose = require('mongoose');

const Product = require('../models/Product.js');

// Obetener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Obtener un producto por su id
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});        
    }    
};

// Crear un nuevo producto (pasar en body - {name, price, caduceDate, stock, description, commerce})
exports.createProduct = async (req, res) => {
    try {
        const {name, price, caduceDate, stock, description, commerce} = req.body;
        const newProduct = new Product({name, price, caduceDate, stock, description, commerce});
        const productSaved = await newProduct.save();
        res.status(201).json(productSaved);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

// Actualizar un producto por su id
exports.updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {new: true});
        res.status(200).json(updatedProduct);
        //res.status(204).json(Product updated succesfully);
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
        //res.status(204).json('Product deleted succesfully');
    } catch (error) {
        res.status(500).json({message: error.message});        
    }    
};