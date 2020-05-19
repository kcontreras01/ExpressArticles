const router = require('express').Router();
const Article = require('../models/articles_model');

router.get('/:search', Article.findArticles, (req, res) => {
    const articleData = res.locals.allArticles;
    res.send(articleData);
});

router.get('/save/:id', Article.findAllForUser, (req, res) => {
    const b = res.locals.articles;
    res.send(b);
});

router.post('/save', Article.saveSearch, (req, res) => {
    res.send(res.locals.savedArticle)
    console.log('Saving article to user profile', res.locals.savedArticle);
    res.redirect('/articles/account');
});

router.get('/edit/:id', Article.findById, (req, res) => {
    console.log("editing");
    const eachArticle = res.locals.eachArticle;
    res.send(eachArticle);
})

router.put('/:id', Article.edit, (req, res) => {
    res.send(res.locals.newArticleData)
})

router.delete('/:id', Article.delete, (req, res) => {
    res.send(res.locals.deletedArticle);
});

router.post('/new', Article.addNew, (req, res, next) => {
    res.send(res.locals.newArticle);
});


module.exports = router;