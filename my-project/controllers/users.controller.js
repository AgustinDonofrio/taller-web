const mongoose = require('mongoose');

const User = require('../models/User.js');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const {email, username, password, firstName, lastName, dateOfBirth} = req.body;
        const newUser = new User({email, username, password, firstName, lastName, dateOfBirth});
        await newUser.save();
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};


