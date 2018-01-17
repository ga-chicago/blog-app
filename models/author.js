const mongoose = require('mongoose');

// bring in article model bc we're gonna work with it
const Article = require('./article.js')

const authorSchema = new mongoose.Schema({
  name: String,
  articles: [Article.schema]
})


const Author =  mongoose.model('Author', authorSchema);

module.exports = Author;