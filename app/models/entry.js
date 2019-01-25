const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
  post: {
    title: String,
    content: String,
    date: Date,
    trigger: false
  }
})

module.exports = mongoose.model('Entry', entrySchema);