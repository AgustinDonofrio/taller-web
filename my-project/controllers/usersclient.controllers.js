const mongoose = require('mongoose');

const Product = require('../models/User.js');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const {username, password, email, firstName, lastName, dateOfBirth, idRole = 2} = req.body;
        const newUser = new User({username, password, email, firstName, lastName, dateOfBirth});
        const userSaved = await newUser.save();
        res.status(201).json(userSaved);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

