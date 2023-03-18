
const express = require('express');
const router = express.Router();

const {isAuthorized} = require('../middlewares/auth-middlewares');

const article = require('../controllers/articles');

router.get('/', isAuthorized, article.userArticles);  

router.route('/new')
    .get(isAuthorized, article.renderNewPage)
    .post(isAuthorized, article.newArticle);

router.get('/:slug', article.showArticle); // view other articles without logged in

module.exports = router;