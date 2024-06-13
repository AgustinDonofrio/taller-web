const express = require('express');
const router = express.Router();
var commerceController = require('../controllers/commerces.controller.js');

// Renderizar el formulario de registro
router.get('/', (req, res) => {
  res.render('registerCommerce');
});


module.exports = router;
