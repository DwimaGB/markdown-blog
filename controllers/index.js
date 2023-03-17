
const Article = require('../models/article');

module.exports.renderPage = async(req, res)=>{
    let articles;
    const filterSearch = req.query['search-query'];
    try{
        if(filterSearch){
            articles = await Article.find({}).regex('title', new RegExp(filterSearch, 'i')).sort({createdAt: -1}).populate('user').exec();
        }
        else{
            articles = await Article.find({}).limit(30).sort({createdAt: -1}).populate('user').exec();
        }
        // console.log(articles);

        res.render('index', {user: req.user, articles, search: filterSearch});
    }
    catch(e){
        console.log(e);
        res.status(500).json({msg: e.message});
    }
    // res.render('index', {user: req.user});
}

