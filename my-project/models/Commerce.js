const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defino el esquema del comercio
const commerceSchema = new Schema({
    name: 
    {
        type: String,
        required: true,
        //unique: true,
        trim: true, // Elimina los espacios en blanco al principio y al final de la cadena de string
        minlength: 3
    },
    password:
    { // Contraseña requerida, con un mínimo de 6 caracteres.
        type: String,
        required: true,
        minlength: 6
    },
    email: 
    { // Correo electrónico único, requerido, y debe coincidir con un patrón de correo válido.
        type: String,
        required: true,
        unique: true,
        match: /.+@.+..+/
    },
    adress:
    {
        type: String,
        required: true,
        unique: true
    },
    products:
    [
        {
          "product_id": String, // Referencia al producto
        }
    ],
    idRole: 
    {
        type: String,
        required: true,
        default: "seller"
    },

})


// Creo el modelo del comercio basado en el esquema
const Commerce = mongoose.model('commerce', commerceSchema);

// Exporto el modelo
module.exports = Commerce;