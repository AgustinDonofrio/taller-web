const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defino el esquema del producto
const productSchema = new Schema({
    name: { type: String, required: true},    
    type: [{ 
        type: String, 
        required: true, 
        enum: [
            'frutas', 'verduras',
            'lácteos', 'huevos', 
            'carnes', 'pollo', 'pescados y mariscos',
            'panaderia y pasteleria', 
            'bebidas', 'congelados', 'enlatados', 'pastas', 'arroces', 
            'cereales', 'snacks y dulces', 'condimentos y salsas',
            'aceites y vinagres', 'aderezos',
            'harinas', 'azúcar', 'levadura', 'mezclas para hornear', 'mermeladas y miel', 'tés y cafés',
          ]
    }],
    freeGluten: { type: Boolean, required: true }, //con-sin T.A.A.C.
    price: { type: Number, required: true },
    caduceDate: { type: Date, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: false },
    commerce: { type: String, required: true },
    photo:{ type: String, required: true }
});

// Creo el modelo del producto basado en el esquema
const Product = mongoose.model('product', productSchema);

// Exporto el modelo
module.exports = Product;