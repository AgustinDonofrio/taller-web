const express = require('express');
const router = express.Router();

const commercesController = require('../controllers/commerces.controller.js');
const productController = require('../controllers/products.controller.js');

router.get('/', function(req, res, next) {
    res.render('commerces');
  });

//router.get('/:commerceId/products', commercesController.getCommerceProducts);


module.exports = router;
