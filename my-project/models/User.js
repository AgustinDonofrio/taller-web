const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defino el esquema del usuario
const userSchema = new Schema({
      email: { // Correo electrónico único, requerido, y debe coincidir con un patrón de correo válido.
        type: String,
        required: true,
        unique: true,
        match: /.+@.+..+/
      },
      username: { // El nombre del usuario es único, requerido y con un mínimo de 3 caracteres.
        type: String,
        required: true,
        unique: true,
        trim: true, // Elimina los espacios en blanco al principio y al final de la cadena de string
        minlength: 3
      },
      password: { // Contraseña requerida, con un mínimo de 6 caracteres.
        type: String,
        required: true,
        minlength: 6
      },
      firstName: { // Nombre del usuario, requerida
        type: String,
        required: true,
        trim: true
      },
      lastName: { // Apellido del usuario, requerida
        type: String,
        required: true,
        trim: true
      },
      dateOfBirth: { // Fecha de nacimiento, opcional
        type: Date,
        required: false
      },
      isAdmin: { // Por defecto siempre es false
        type: Boolean,
        default: false
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
      idRole: {
        type: String,
        required: true,
        default: "buyer"
        //enum: ['buyer', 'seller'], // Define los roles posibles
      },
    });

// Middleware para actualizar el campo updatedAt cada vez que se guarda el documento
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });

// Creo el modelo del producto basado en el esquema
const User = mongoose.model('user', userSchema);

// Exporto el modelo
module.exports = User;