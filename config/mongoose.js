var config = require('./config');
var mongoose = require('mongoose');

module.exports = function () {
  // use native promises to get rid of mpromise deprecation warning
  mongoose.Promise = global.Promise;
  var db = mongoose.connect(config.db);

  mongoose.connection.once('connected', function (err) {
    if (err) throw err;
    console.log('connected to ' + process.env.NODE_ENV + ' database...');
  });

  return db;
};
