

const User = require('../../models/user');

module.exports.renderPage = (req, res)=>{
    const err = req.flash('error')[0];
    console.log(err);
    res.render('account/signup', {errorMessage: err});
}

module.exports.handleSignUp = async(req, res, next)=>{
    try{
        const user = new User({name: req.body.name, username: req.body.username, password: req.body.password});
        await user.save()

        res.redirect('/login');
    }
    catch(e){
        // console.log(e);
        // res.redirect('/signup');
        next(e);
    }
}