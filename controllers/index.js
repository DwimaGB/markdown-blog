

module.exports.renderPage = (req, res)=>{
    res.render('index', {user: req.user});
}
