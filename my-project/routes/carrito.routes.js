const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito.controller.js');
const productController = require('../controllers/products.controller.js');

router.get('/', carritoController.getProductsByUsers);
router.post('/:productId', carritoController.addProduct);
router.delete('/:productId', carritoController.removeProduct);
router.post('/confirm', carritoController.confirmCart);
router.post('/cancel', carritoController.cancelCart);

module.exports = router;
