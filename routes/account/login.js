
const express = require('express');
const router = express.Router();

const login = require('../../controllers/login');
// const {verifyPassword} = require('../../middlewares/authMiddlewares');

const passport = require('passport');

router.route('/')
    .get(login.renderPage)
    .post(passport.authenticate('local', ({
        failureFlash: true,
        failureRedirect: '/login'
    })), (req, res)=>{
        res.json({msg: "Successfully Logged In"});
    })
 

module.exports = router;