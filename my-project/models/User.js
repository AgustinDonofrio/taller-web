const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defino el esquema del usuario
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+@.+..+/
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: function() {
      return !this.isOAuth; // Si es OAuth, la contraseña no es requerida
    },
    validate: {
      validator: function(value) {
        // Solo validar la longitud si la contraseña no está vacía
        return this.isOAuth || value.length >= 6;
      },
      message: 'La contraseña debe tener al menos 6 caracteres.'
    }
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: false
  },
  isAdmin: {
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
  },
  isOAuth: {
    type: Boolean,
    default: false // Campo para indicar si es un usuario OAuth
  }
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