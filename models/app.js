var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppSchema = new Schema(
  {
    name: { type: String, uniq: true, required: true },
    categories: [String],
    ratings: [Number],
    express: Boolean,
    requirements: [String],
    basicPrice: Number,
    connectIcon: { type: String, required: true },
    openUrl: String,
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

AppSchema.virtual('avgRating').get(function () {
  var sum = this.ratings.reduce(function (acc, value) { return acc + value; });

  return sum / this.ratings.length;
});

module.exports = mongoose.model('App', AppSchema);

