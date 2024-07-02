const User = require('../models/User');
const Commerce = require('../models/Commerce');

// Función de inicio de sesión para el usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('Intentando iniciar sesión con:', email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Contraseña incorrecta');
      return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }
    // Autenticar al usuario y crear sesión
    req.session.user = user;
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Función de inicio de sesión para el comercio
exports.loginCommerce = async (req, res) => {
  const { email, password } = req.body;
  console.log('Intentando iniciar sesión con:', email, password);
  try {
    const commerce = await Commerce.findOne({ email });
    if (!commerce) {
      console.log('Comercio no encontrado');
      return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }
    const isMatch = await commerce.comparePassword(password);
    if (!isMatch) {
      console.log('Contraseña incorrecta');
      return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }
    // Autenticar al comercio y crear sesión
    req.session.commerce = commerce;
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
