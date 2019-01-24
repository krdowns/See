const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/see',
  { useNewUrlParser: true })

module.export = {
  User: require('./user'),
  Entry: require('./entry')
}