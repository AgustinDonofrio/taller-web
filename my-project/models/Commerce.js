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
    address:
    {
        type: String,
        required: true,
        unique: true
    },
    postal_code:
    {
        type: Number,
        required: true,
        unique: true
    },
    city:
    {
        type: String,
        required: true,
        unique: true
    },
    country:
    {
        type: String,
        required: true,
        unique: true
    },
    idRole: 
    {
        type: String,
        required: true,
        default: "seller"
    },
})

/*
// Antes de guardar, hashear la contraseña
commerceSchema.pre('save', async function (next) {
    const commerce = this;
    if (commerce.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(commerce.password, salt);
      commerce.password = hash;
    }
    next();
  });
*/

// Creo el modelo del comercio basado en el esquema
const Commerce = mongoose.model('commerce', commerceSchema);

// Exporto el modelo
module.exports = Commerce;