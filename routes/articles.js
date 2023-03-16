
const express = require('express');
const router = express.Router();

const article = require('../controllers/articles');

router.route('/new')
    .get(article.renderNewPage)
    .post(article.newArticle);

router.get('/show/:id', article.showArticle);

module.exports = router;