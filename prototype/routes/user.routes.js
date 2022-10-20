const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');

const userController = require('../controllers/user.controller');

router.get('/new', userController.getNuevo);

router.post('/new', userController.postNuevo);

router.get('/login', userController.getLogin);

router.post('/login', userController.postLogin);

router.get('/logout', userController.logout);

module.exports = router;
