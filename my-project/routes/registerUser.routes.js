const express = require('express');
const router = express.Router();
//var usersController = require('../controllers/users.controller.js');

// Renderizar el formulario de registro
router.get('/', (req, res) => {
  res.render('registerUser');
});


//router.post('/', usersController.createUser);

// Manejar el envío del formulario de registro
/*
router.post('/', async (req, res) => {
  const { username, password, email, firstName, lastName, dateOfBirth, idRole } = req.body;
  
  try {
    // Verificar si el usuario ya existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    // Crear un nuevo usuario
    user = new User({
      username,
      password: await bcrypt.hash(password, 10), // Encriptar la contraseña
      email,
      firstName,
      lastName,
      dateOfBirth,
      idRole
    });

    await user.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});
*/
module.exports = router;
