var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var FeatureSchema = new Schema({
  name: String,
  users: [String], // array of usernames
  dataStreams: [String], // references name of datastream collection
  categories: [String],
  options: {},
}, { autoIndex: false });

module.exports = mongoose.model('Feature', FeatureSchema);
