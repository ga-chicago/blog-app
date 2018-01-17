const express = require('express');
const router = express.Router();

const Article = require('../models/article.js');
const Promise = global.Promise;

router.get('/', (req, res) => {
  Article.find({}, (err, foundArticles) => {
    res.render('articles/index.ejs', {
      articles: foundArticles
    })
  })
})

router.get('/new', (req, res) => {
  res.render('articles/new.ejs');
})

router.get('/:id/edit', (req, res) => {

  const prom = Article.where('id').eq(req.params.id).exec()
  prom.then(art => console.log(res)).catch(err=>console.log(err))
  // Article.findById(req.params.id, (err, foundArticle) => {
  //   if(err ) console.log(err);
  //   res.render('articles/edit.ejs', { article: foundArticle });    
  // })
})

router.get('/:id', (req, res) => {
  Article.findById(req.params.id, (err, foundArticle) => {
    res.render('articles/show.ejs', {article: foundArticle})    
  })
})

router.post('/', (req, res) => {
  // res.send(req.body);
  Article.create(req.body, (err, createdArticle) => {
    if(err) console.log(err);
    else res.redirect('/articles');
  })
})

router.delete('/:id', (req, res) => {
  Article.findByIdAndRemove(req.params.id, (err) => {
    res.redirect('/articles');
  })
})

router.put('/:id', (req, res) => {
  Article.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
    res.redirect('/articles');
  })
})



module.exports = router;