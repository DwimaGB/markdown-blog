

const logout = (req, res)=>{
    req.logOut((err)=>{
        if(err){
            res.redirect('/');
        }
    })
    res.redirect('/');
}


module.exports = logout;