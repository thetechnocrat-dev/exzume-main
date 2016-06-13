var config = require('./config');
var mongoose = require('mongoose');

module.exports = function () {
  var db = mongoose.connect(config.db);

  // load models

  mongoose.connection.once('connected', function (err) {
    if (err) throw err;
    console.log('connected to ' + process.env.NODE_ENV + ' database...');
  });

  return db;
};