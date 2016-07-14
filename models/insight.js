var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var InsightSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  message: String,
  date: { type: Date, default: Date.now },
  liked: { type: Boolean, default: false },
});

module.exports = mongoose.model('Insight', InsightSchema);
