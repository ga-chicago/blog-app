const mongoose = require('mongoose');

// schema is just structure of data
const articleSchema = new mongoose.Schema({
  title: String,
  body: String
})

// create the model using the schema
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;


