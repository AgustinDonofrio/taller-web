var express = require('express');
var router = express.Router();

var commercesController = require('../controllers/commerces.controller.js');

router.post('/', commercesController.createCommerce);

module.exports = router;