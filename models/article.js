const mongoose = require('mongoose');

// schema is just structure of data
const articleSchema = new mongoose.Schema({
  title:  { type: String, required: true, unique: true },
  author: { type: String, required: true },
  body:   String,
  comments: [{ body: String, date: Date }], // can have arrays of objects with specific properties
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: { // can have properties that are objects
    votes: Number,
    favs:  Number
  }
});

// create the model using the schema
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;


