const express = require('express');
const { check } = require('express-validator');

const usersController = require('../service/users-service');
const loginUser = require('../service/login-user');
const registerUser = require('../service/register-user');
const router = express.Router();

router.get('/', usersController.getUsers);

router.post(
  '/signup',
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  registerUser.signup
);

router.post('/login',  loginUser.login);

router.put('/:id', usersController.updateUser)

router.delete('/:id', usersController.deleteUser)

module.exports = router;