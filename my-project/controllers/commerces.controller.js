const mongoose = require('mongoose');
const Commerce = require('../models/Commerce.js');
const Product = require('../models/Product.js');

// Crear un nuevo comercio
exports.createCommerce = async (req, res) => {
    try {
        const {name, password, email, adress} = req.body;
        const newCommerce = new Commerce({name, password, email, adress});
        const commerceSaved = await newCommerce.save();
        res.redirect('/login');
        //res.status(201).json(commerceSaved);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};



// Método para obtener todos los productos de un comercio
exports.getCommerceProducts = async (req, res) => {
    try {
        const { commerceId } = req.params;
        const commerce = await Commerce.findById(commerceId);

        if (!commerce) {
            return res.status(404).json({ message: 'Commerce not found' });
        }

        // Obtengo los ids de los productos del comercio
        const productIds = commerce.products.map(product => product.product_id);

        // Obtengo los productos usando los ids
        const products = await Product.find({ _id: { $in: productIds } });

        res.render('commerces', { products }); // Renderiza la vista 'commerces' con los productos
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


/*

exports.addProductToCommerce = async (req, res) => {
    try {
        const { commerceId } = req.params;
        const { name, price, caduceDate, stock, description, photo } = req.body;

        // Crear un nuevo producto
        const newProduct = new Product({
            name,
            price,
            caduceDate,
            stock,
            description,
            photo
        });

        // Guardar el producto en la base de datos
        const savedProduct = await newProduct.save();

        // Verifica si el comercio existe
        const commerce = await Commerce.findById(commerceId);
        if (!commerce) {
            return res.status(404).json({ message: 'Commerce not found' });
        }

        // Agrega el ID del producto al array de productos del comercio
        commerce.products.push(savedProduct._id);
        await commerce.save();

        res.status(201).json({ message: 'Product added to commerce successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};*/
