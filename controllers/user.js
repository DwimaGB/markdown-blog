
const Article = require('../models/article');
const User = require('../models/user');

module.exports.userArticles = async(req, res, next)=>{
    let articles;
    try{
        articles =  await Article.find().sort({createdAt: -1}).populate('user').exec();

        // console.log(req.params.user);
        // console.log(articles);

        articles = articles.filter(article=>article.user.username === req.params.user);

        // console.log(articles);
        res.render('user', {user: req.user, articles});
    }
    catch(e){
        console.log(e);
        next(e);
    }
}