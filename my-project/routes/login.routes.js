const express = require('express');
const router = express.Router();
const Commerce = require('../models/Commerce');
const User = require('../models/User');

router.get('/', function(req, res, next) {
    res.render('login');
  });
  


  router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
      let commerce = await Commerce.findOne({ email });
      let user = await User.findOne({ email }); // Agregar búsqueda para usuario
  
      if (!commerce && !user) {
        return res.render('login', { error: 'Correo electrónico no registrado' });
      }
  
      if (commerce) {
        if (commerce.password !== password) {
          return res.render('login', { error: 'Contraseña incorrecta' });
        }
        
        req.session.uCommerce = {
          id: commerce._id,
          name: commerce.name,
          email: commerce.email
        };

        console.log('User session:', req.session.uCommerce);
        return res.redirect('/commerces'); 
      }
  
      if (user) {
        if (user.password !== password) {
          return res.render('login', { error: 'Contraseña incorrecta' });
        }
        
        req.session.user = {
          id: user._id,
          name: user.firstName,
          email: user.email
        };

        console.log('User session:', req.session.user);
        return res.redirect('/home'); 
      }
  
    } catch (error) {
      console.error(error);
      res.render('login', { error: 'Error en el servidor' });
    }
  });
  

module.exports = router;
