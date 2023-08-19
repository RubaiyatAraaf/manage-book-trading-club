var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController.js');

/*
 * GET
 */
router.get('/', UserController.list);

/**
 * Get user by email
 * @return JSON: user = {name, img}
 */
router.post('/get-user-by-mail', UserController.checkLocalMailController);

/*
 * GET
 */
router.get('/:id', UserController.show);

/*
 * POST
 */
router.post('/', UserController.create);

module.exports = router;
