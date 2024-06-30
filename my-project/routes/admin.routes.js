const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin.controller.js');
const commerce = require('../controllers/commerces.controller.js');

router.get('/', admin.getCommerces);
router.put('/update-state/:commerceId', commerce.updateState);
router.put('/:commercetId', admin.updateCommerce);
router.delete('/:commerceId', admin.deleteCommerce);


module.exports = router;
