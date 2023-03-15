
const User = require('../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async(req, res, next)=>{
    try{
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        req.body.password = hashedPassword;
        next();
    }
    catch(e){
        console.log(e);
        res.status(500).json({error: e.message});
    }
}   

const verifyPassword = async(req, res, next)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user){
            return res.json({msg: "Invalid Credentials!"});
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if(isPasswordMatch){
            return next();
        }
        res.json({msg: "Invalid Credentials!"});
    }
    catch(e){
        console.log(e);
        res.status(500).json({error: e.message});
    }
}

module.exports = {hashPassword, verifyPassword};