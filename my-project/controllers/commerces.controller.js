const mongoose = require('mongoose');

const Commerce = require('../models/Commerce.js');

// Crear un nuevo comercio
exports.createCommerce = async (req, res) => {
    try {
        const {name, password, email, adress, products} = req.body;
        const newCommerce = new Commerce({name, password, email, adress, products});
        const commerceSaved = await newCommerce.save();
        res.status(201).json(commerceSaved);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

