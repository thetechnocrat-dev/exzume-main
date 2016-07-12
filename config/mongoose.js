var config = require('./config');
var mongoose = require('mongoose');

module.exports = function () {
  var db = mongoose.connect(config.db);

  // // load models
  // var User = require('../models/user');
  // var Fitbit = require('../models/dataStreams/fitbit');
  // var Survey = require('../models/dataStreams/survey');

  mongoose.connection.once('connected', function (err) {
    if (err) throw err;
    console.log('connected to ' + process.env.NODE_ENV + ' database...');
  });

  return db;
};
