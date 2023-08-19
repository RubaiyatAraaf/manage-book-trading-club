var express = require('express');
var router = express.Router();
// var UserController = require('../controllers/UserController.js');
var BookController = require('../controllers/BookController.js');
var helper = require('./helperFunctions');

/*
* Get USER profile
*/
router.get('/',BookController.list);
router.get('/api',BookController.show);

/*
* Manage my-books page, create new book and display requests
*/
router.get('/my-books',BookController.myBooksController);
router.post('/my-books',BookController.addNewBook);

router.get('/my-books/trades',BookController.userTrades);

router.get('/request/:id', helper.isLoggedIn, BookController.requestBook);
router.get('/give/:bookId/to/:requesterID', helper.isLoggedIn, BookController.acceptRequest);

module.exports = router;
