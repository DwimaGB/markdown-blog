
const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/callback', passport.authenticate('google', {failureRedirect: '/auth/login', successRedirect: '/'}));

module.exports = router;