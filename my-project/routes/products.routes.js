const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products.controller.js');

router.get('/', productsController.getProducts);

router.post('/:commerceId/products/new', productsController.createProduct);

router.put('/:productId', productsController.updateProduct);

router.delete('/:productId',  productsController.deleteProduct);

module.exports = router;