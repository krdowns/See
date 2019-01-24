const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
  post: {
    title: String,
    content: String,
    ref: 'User',
    date: Date,
    trigger: false
  }
})

module.exports = mongoose.model('Entry', entrySchema);