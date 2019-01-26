const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/see', {useNewUrlParser: true});


module.exports = {
  User: require('./user'),
  Entry: require('./entry')
}