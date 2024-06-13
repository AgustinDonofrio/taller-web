var express = require('express');
var router = express.Router();

var productsController = require('../controllers/products.controller.js');

router.get('/', productsController.getProducts);

router.get('/:productId', productsController.getProduct);

router.post('/:commerceId/products/new', productsController.createProduct);

router.put('/:productId', productsController.updateProduct);

router.delete('/:productId',  productsController.deleteProduct);

module.exports = router;