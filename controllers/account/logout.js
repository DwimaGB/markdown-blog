

const logout = (req, res) => {
    // if (req.session) {
    //     req.session.destroy(err => {
    //         if (err) {
    //             console.log(err);
    //         }
    //     })
    // }
    req.logOut((err) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }
        else{
            res.redirect('/');
        }
    })

    
}


module.exports = logout;