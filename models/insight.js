var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InsightSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  message: String,
  date: { type: Date, default: Date.now },
  liked: { type: Boolean, default: false },
});

module.exports = mongoose.model('Insight', InsightSchema);
