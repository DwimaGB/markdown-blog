
const express = require('express');
const router = express.Router();

const signUp = require('../../controllers/account/signup');
const { hashPassword } = require('../../middlewares/authMiddlewares');

router.route('/')
    .get(signUp.renderPage)
    .post(hashPassword, signUp.handleSignUp);



module.exports = router;