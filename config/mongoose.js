var config = require('./config');
var mongoose = require('mongoose');

module.exports = function () {
  mongoose.Promise = global.Promise; // gets rid of mpromise deprecation warning
  var db = mongoose.connect(config.db);

  mongoose.connection.once('connected', function (err) {
    if (err) throw err;
    console.log('connected to ' + process.env.NODE_ENV + ' database...');
  });

  return db;
};
