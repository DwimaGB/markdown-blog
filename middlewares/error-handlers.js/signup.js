
const express = require('express');
const router = express.Router();

const UsernameAlreadyExistsError = require('../../utils/classes/usernameAlreadyExistsError');

// router.use((err, req, res, next)=>{
//     if(err instanceof UsernameAlreadyExistsError){
//         // req.flash('error', err);
//         console.log(err);
//         res.redirect('/signup');
//     }
//     else{
//         res.status(500).json({err: err.message});
//     }
// })

const usernameAlreadyExistsError = (err, req, res, next)=>{
    if(err instanceof UsernameAlreadyExistsError){
                req.flash('error', err.message);
                console.log(err);
                res.redirect('/signup');
            }
            else{
                res.status(500).json({err: err.message});
            }
}

// module.exports = router;
module.exports = usernameAlreadyExistsError;