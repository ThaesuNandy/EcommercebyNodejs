const route = require('express').Router();
const userController = require('../controllers/userController');

route.get('users/profile', userController.userProfileController);



module.exports = route;