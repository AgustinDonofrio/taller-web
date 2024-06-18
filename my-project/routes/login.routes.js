const express = require('express');
const router = express.Router();
const Commerce = require('../models/Commerce');

router.get('/', function(req, res, next) {
    res.render('login');
  });
  


// Ruta para iniciar sesión
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    let commerce = await Commerce.findOne({ email });
    if (!commerce) {
      return res.render('login', { error: 'Correo electrónico no registrado' });
    }
    if (commerce.password !== password) {
      return res.render('login', { error: 'Contraseña incorrecta' });
    }

    req.session.uCommerce = {
      id: commerce._id,
      name: commerce.name,
      email: commerce.email
    };

    res.redirect('/home'); 
  } catch (error) {
    console.error(error);
    res.render('login', { error: 'Error en el servidor' });
  }
});


module.exports = router;
