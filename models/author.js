const mongoose = require('mongoose');

const Article = require('./article.js')

const authorSchema = new mongoose.Schema({
  name: { type: String },
  articles: [Article.articleSchema]
})


module.exports = mongoose.model('Author', authorSchema);
