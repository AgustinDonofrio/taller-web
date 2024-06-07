var express = require('express');
var router = express.Router();

var usersController = require('../controllers/users.controller.js');

router.post('/', usersController.createUser);

//router.put('/:userId', usersController.updateUser);

//router.delete('/:userId',  usersController.deleteUser);


module.exports = router;