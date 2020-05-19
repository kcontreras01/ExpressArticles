const axios = require('axios');
const db = require('../db/config');
const API_KEY = process.env.API_KEY;
// const moment = require('moment');

const Article = {};

Article.findArticles = (req, res, next) => {
    let search = req.params.search;
    axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&api-key=${API_KEY}`)
        .then(allArticles => {
            res.locals.allArticles = allArticles.data.response.docs
            next();
        }).catch(err => {
            console.log(err);
        });
}

Article.findAllForUser = (req, res, next) => {
    const {id} = req.params
    db.query('SELECT * FROM articles where user_id = $1', [id])
        .then(articles => {
            res.locals.articles = articles;
            next();
        })
        .catch(err => {
            console.log(err);
        });
}

Article.saveSearch = (req, res, next) => {
    // console.log('in article saveSearch function')
    const { user_id, headline, content, web_url } = req.body;
    // const save_date = moment().format('dddd');
    // console.log(save_date)
    db.one('INSERT INTO articles (headline, content, url, user_id, save_date) VALUES ($1, $2, $3, $4, $5) RETURNING *', [headline, content, web_url, user_id, save_date])
        .then(savedArticle => {
            console.log('got to save article'),
            res.locals.savedArticle = savedArticle;
            next();
        }).catch(err => {
            console.log(err);
        });
}


Article.findById = (req, res, next) => {
    const { id } = req.params;
    db.oneOrNone(`SELECT * FROM articles WHERE id=$1`, [id])
        .then(response => {
            // console.log('findById response is: ', response)
            res.locals.eachArticle = response;
            next();
        }).catch(err => {
            console.log(`Error at articles.findById: ${err}`);
        })
};

Article.edit = (req, res, next) => {
    const { headline, content, web_url } = req.body;
    const { id } = req.params;
    db.one('UPDATE articles SET headline=$1, content=$2, url=$3 WHERE id=$4 RETURNING *', [headline, content, web_url, parseInt(id)])
        .then((newArticleData) => {
            // console.log('returned newArticleData: ', newArticleData);
            res.locals.newArticleData = newArticleData;
            next();
        }).catch(err => {
            console.log(`Error at articles.findById: ${err}`);
        })
    console.log(`user_id inside article.create`);

};

Article.delete = (req, res, next) => {
    const { id } = req.params;
    db.one(`DELETE FROM articles WHERE id=$1 RETURNING *`, [id])
        .then((deletedArticle) => {
            res.locals.deletedArticle = deletedArticle;
            next();
        })
        .catch(err => {
            console.log(`Error at article.delete: ${err}`);
        })
};

Article.addNew = (req, res, next) => {
    // console.log('in addNew function')
    const { user_id, headline, content, web_url } = req.body;
    db.one('INSERT INTO articles (headline, content, url, user_id) VALUES ($1, $2, $3, $4) RETURNING *', [headline, content, web_url, user_id])
        .then((newArticle) => {
            // console.log(newArticle)
            res.locals.newArticle = newArticle;
            next();
        })
        .catch(err => {
            console.log('Error adding data to database');
        });
}

module.exports = Article;