
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');
const User = require('../models/user');

passport.use(new LocalStrategy(async (username, password, done)=>{
    try{
        const user = await User.findOne({username});

        if(!user){
            return done(null, false, {message: "Invalid Credentials!"});
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(isPasswordMatch){
            user.strategy = 'local';
            return done(null, user);
        }

        done(null, false, {message: "Invalid Credentials!"})
    }
    catch(e){
        done(e);
    }
}))

passport.serializeUser((user, done)=>{
    if(user.strategy === 'local'){
        done(null, {id: user.id, strategy: user.strategy});
    } 
})


passport.deserializeUser(async(user, done)=>{
    try{
        const foundUser = await User.findById(user.id);

        if(!foundUser){
            return done(null, false);
        }
        done(null, foundUser);
    }
    catch(e){
        done(e);
    }
})

module.exports = passport;