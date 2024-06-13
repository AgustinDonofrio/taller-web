const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defino el esquema del producto
const productSchema = new Schema({
    name: String,
    price: Number,
    caduceDate: Date,
    stock: Number,
    description: String,
    commerce: String,
    photo:String
});

// Creo el modelo del producto basado en el esquema
const Product = mongoose.model('product', productSchema);

// Exporto el modelo
module.exports = Product;