
const Article = require('../models/article');

module.exports.renderNewPage = (req, res)=>{
    res.render('articles/new', {user: req.user, article: {}});
}

module.exports.newArticle = async(req, res, next)=>{
    try{
        const article = await Article.create({title: req.body.title, description: req.body.description, markdown: req.body.markdown, user: req.user.id});

        res.redirect(`/articles/show/${article.id}`);
    }
    catch(e){
        next(e);
    }
}


module.exports.userArticles = async(req, res, next)=>{
    try{
        const articles = await Article.find({user: req.user.id}).populate('user');

        res.render('articles/index', {user: req.user, articles});
    }
    catch(e){
        next(e);
    }
}

module.exports.showArticle = async(req, res, next)=>{
    try{
        const article = await Article.findById(req.params.id);

        res.render('articles/show', {user: req.user, article});
    }
    catch(e){
        next(e);
    }
}