const express = require('express');
const router = express.Router();

const Article = require('../models/article.js');



const Author = require('../models/author.js')

router.get('/test', (req, res) => {
  
  const matt = new Author({ name: 'Matt'});
  
  const article1 = new Article({
    title: 'Awesome article title', 
    author: matt.name
  })

  matt.articles.push(article1);

  matt.save(); // save matt and the article included in matt
  article1.save(); 

  // you can get the id, access by id, etc
  console.log(matt.articles.id(article1.id))
  
  // go into array using mongoose helper method and change the title of 
  // one of the articles in the array
  matt.articles.id(article1.id).title = "New title"
  matt.save();
  article1.title = "New title"
  article1.save();

  matt.articles.id(article1.id).remove();
  matt.save()

  // you can make subdocuments on the fly but remember to save them separately
  const subdoc_article = matt.articles.create({
    title: " Created via Matt article property",
    author: matt.name
  })
  matt.articles.push(subdoc_article);
  matt.save(); // this won't create the article in articles collection...
  Article.create(subdoc_article); // ...so this is necessary



  res.send("check mongo")

})




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