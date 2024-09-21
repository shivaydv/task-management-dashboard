const { register, login } = require('../controllers/AuthController');

const router = require('express').Router();

router.post('/register',register);

router.post('/login',login);

module.exports = router;