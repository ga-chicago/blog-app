const express = require('express');
const app     = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override')



// database stuff
require('./db/db')

// middleware
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}))

// controllers
const authorsController = require('./controllers/author.js')
app.use('/authors', authorsController)
const articleController = require('./controllers/article.js')
app.use('/articles', articleController)

// home
app.get('/', (req, res) => {
  res.render('index.ejs')
})


app.get('*', (req, res) => {
  res.send('404');
})

app.listen(3000, () => {
  console.log('server is listening on port 3000')
})
