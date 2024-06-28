const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller.js');

// Renderizar el formulario de registro
router.get('/', (req, res) => {
  res.render('registerUser');
});


router.post('/', usersController.createUser);

module.exports = router;
