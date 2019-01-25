const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/see',
  { useNewUrlParser: true })

module.export = {
  user: require('./user'),
  Entry: require('./entry')
}