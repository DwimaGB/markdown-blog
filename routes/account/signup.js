
const express = require('express');
const router = express.Router();

const signUp = require('../../controllers/signUp');
const { hashPassword } = require('../../middlewares/authMiddlewares');
const usernameAlreadyExistsError = require('../../middlewares/error-handlers.js/signup');

router.route('/')
    .get(signUp.renderPage)
    .post(hashPassword, signUp.handleSignUp);


router.use(usernameAlreadyExistsError);

module.exports = router;