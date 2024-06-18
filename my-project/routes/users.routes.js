const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller.js');

router.post('/', usersController.createUser);

//router.put('/:userId', usersController.updateUser);

//router.delete('/:userId',  usersController.deleteUser);


module.exports = router;