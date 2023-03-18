
const express = require('express');
const router = express.Router();

const login = require('../../controllers/account/login');
// const {verifyPassword} = require('../../middlewares/authMiddlewares');

const passport = require('passport');

router.route('/')
    .get(login.renderPage)
    .post(passport.authenticate('local', ({
        failureFlash: true,
        failureRedirect: '/auth/login'
    })), login.redirectHome)
 

module.exports = router;