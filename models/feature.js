var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var FeatureSchema = new Schema({
  name: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  dataStreams: [String], // references name of datastream collection
  categories: [String],
}, { autoIndex: false });

module.exports = mongoose.model('Feature', FeatureSchema);
