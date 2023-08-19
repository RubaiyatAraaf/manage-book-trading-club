var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController.js');
var helper = require('./helperFunctions');

/*
* Get USER profile
*/
router.get('/profile/edit', helper.isLoggedIn,UserController.editProfile);
router.post('/profile/edit', helper.isLoggedIn,UserController.applyProfileEdition);
router.get('/profile/:id', helper.isLoggedIn,UserController.showProfile);

module.exports = router;
