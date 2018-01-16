const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/blog', { useMongoClient: true })
//check our db


mongoose.connection.on('connected', () => {
  console.log('mongodb is connected')
})

mongoose.connection.on('disconnected', () => {
  console.log('mongodb is disconnected')
})

mongoose.connection.on('error', (error) => {
  console.log('THere was an error connecting', error)
})
