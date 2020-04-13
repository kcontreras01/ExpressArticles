const router = require('express').Router();
const auth = require('../services/auth');
const API_KEY = process.env.API_KEY;
const API_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=';

const Article = require('../models/articles_model');
const User = require('../models/users_model');

router.get('/:search', Article.findArticles, (req, res) => {
    console.log('HERE', API_KEY)
    // console.log('Rendering one article', res.locals.allArticles);
    const articleData = res.locals.allArticles;
    res.send(articleData);
});

router.get('/save/:id', Article.findAllForUser, (req, res) => {
    //console.log(res.locals.articles);
    const b = res.locals.articles;
    res.send(b);
});

router.post('/save', Article.saveSearch, (req, res) => {
     //       console.log('in /save controller'),
    res.send(res.locals.savedArticle)
    // console.log('Saving article to user profile', res.locals.savedArticle);
    // res.redirect('/articles/account');
});

router.get('/edit/:id', Article.findById, (req, res) => {
    // console.log("editing");
    const eachArticle = res.locals.eachArticle;
    res.send(eachArticle);
})

router.put('/:id', Article.edit, (req, res) => {
    // console.log("posting edit");
    res.send(res.locals.newArticleData)
})

router.delete('/:id', Article.delete, (req, res) => {
    //console.log('deleting article');
    res.send(res.locals.deletedArticle);
});

router.post('/new', Article.addNew, (req, res, next) => {
    res.send(res.locals.newArticle);
});


module.exports = router;