const express = require('express');
const router  = express.Router();
const Author  = require('../models/author.js')
const Article = require('../models/article.js')

// this route needs to
// use our model to find all the authors
// and then send them to our index.ejs page
router.get('/', (req, res) => {

  Author.find({}, (err, allAuthors) => {
    console.log(allAuthors, ' all authors')
     res.render('authors/index.ejs', {authors: allAuthors})
  })
})

router.get('/new', (req, res) => {
  res.render('authors/new.ejs')
})

router.post('/', (req, res) => {
  console.log(req.body)
  Author.create(req.body, (err, createdAuthor) => {
    console.log(createdAuthor, ' this is createDAuthor from db')
    res.redirect('/authors')
  })

})


router.get('/:id/edit', (req, res) => {
  Author.findById(req.params.id, (err, foundAuthor) => {
    res.render('authors/edit.ejs', {
      author: foundAuthor
    })
  })
})

router.put('/:id', (req, res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, (err, updateAuthor) => {
    res.redirect('/authors')
  })
})



router.get('/:id', (req, res) => {
  Author.findById(req.params.id, (err, foundAuthor) => {
    res.render('authors/show.ejs', {author: foundAuthor})
  })
})

router.delete('/:id', (req, res) => {
  Author.findByIdAndRemove(req.params.id, (err, deletedAuthor) => {
    // we need to find all of the author's articles id's
    // in order to delete all the articles from the articles collection
    const articleIds = [];
    for (let i =0; i < deletedAuthor.articles.length; i++){
      articleIds.push(deletedAuthor.articles[i]._id);
    }

    Article.remove({ _id: { $in: articleIds}}, ( err, data) => {
         res.redirect('/authors')
    })
  })
})






module.exports = router
