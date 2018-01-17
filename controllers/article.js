const express = require('express');
const router = express.Router();

const Article = require('../models/article.js');
const Author = require('../models/author.js')

router.get('/', (req, res) => {
  Article.find({}, (err, foundArticles) => {
    res.render('articles/index.ejs', {
      articles: foundArticles
    })
  })
})

router.get('/new', (req, res) => {
  Author.find({}, (err, allAuthors) => {
    res.render('articles/new.ejs', {
      authors: allAuthors
    });
  })
})

router.get('/:id/edit', (req, res) => {


  Article.findById(req.params.id, (err, foundArticle) => {
    if(err ) console.log(err);

    Author.find({}, (err, allAuthors) => {
      Author.findOne({'articles._id' : req.params.id}, (err, foundArticleAuthor) => {
         res.render('articles/edit.ejs', {
                                          article: foundArticle,
                                          authors: allAuthors,
                                          articleAuthor:  foundArticleAuthor
                                            });
      });
    });
  });
});

router.get('/:id', (req, res) => {
  Article.findById(req.params.id, (err, foundArticle) => {

      Author.findOne({'articles._id': req.params.id}, (err, foundAuthor) => {

        res.render('articles/show.ejs', {
                                          article: foundArticle,
                                          author: foundAuthor
                                              })

      })
  });
});

// note: 3 mongo operations
router.post('/', (req, res) => {

  // find/fget the author
  Author.findById(req.body.authorId, (err, foundAuthor) => {

    // save article in articles collection
    Article.create(req.body, (err, createdArticle) => {

      // put the article in the array
      foundAuthor.articles.push(createdArticle);
      foundAuthor.save((err, data) => {
        res.redirect('/articles')
      });

    })

  })





  // // res.send(req.body);
  // Article.create(req.body, (err, createdArticle) => {
  //   if(err) console.log(err);
  //   else res.redirect('/articles');
  // })
})

router.delete('/:id', (req, res) => {
  Article.findByIdAndRemove(req.params.id, (err, deletedArticle) => {
    Author.findOne({'articles._id': req.params.id}, (err, foundAuthor) => {
      foundAuthor.articles.id(req.params.id).remove();
      foundAuthor.save((err, data) => {
        res.redirect('/articles');
      });
    });
  });
});

router.put('/:id', (req, res) => {

  Article.findByIdAndUpdate(req.params.id, req.body,  {new: true},(err, updatedArticle) => {
    Author.findOne({'articles._id': req.params.id}, (err, foundAuthor) => {

      if(foundAuthor._id.toString !== req.body.authorId){

          foundAuthor.articles.id(req.params.id).remove();

            foundAuthor.save((err, data) => {
              Author.findById(req.body.authorId, (err, newAuthor) => {
                newAuthor.articles.push(updatedArticle);
                newAuthor.save((err, savedNewAuthor) => {
                  res.redirect('/articles/' + req.params.id);
                })
              })


          });
          // foundAuthor.articles.push(updatedArticle);

      } else {
         foundAuthor.articles.id(req.params.id).remove();
         foundAuthor.articles.push(updatedArticle);
         foundAuthor.save((err, savedNewAuthor) => {
                  res.redirect('/articles/' + req.params.id);
                })
      }
    });
  });
});



module.exports = router;
