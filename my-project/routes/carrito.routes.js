const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito.controller.js');

router.get('/', carritoController.getProductsByUsers);
router.post('/:productId', carritoController.addProduct);
router.delete('/:productId', carritoController.removeProduct);
router.post('/confirmar-carrito', carritoController.confirmCart);
router.post('/cancelar-carrito', carritoController.cancelCart);

module.exports = router;
