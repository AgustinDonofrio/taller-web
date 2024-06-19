const express = require('express');
const router = express.Router();
const commercesController = require('../controllers/commerces.controller.js');
const productController = require('../controllers/products.controller.js');

router.get('/', commercesController.getProductsByCommerce);

router.post('/', productController.createProduct);

router.put('/:productId', productController.updateProduct);

router.delete('/:productId', productController.deleteProduct);

module.exports = router;
