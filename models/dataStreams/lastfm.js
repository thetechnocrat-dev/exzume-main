var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../user');

var LastFMSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  username: String,
  key: String,
  features: [{
      name: String,
      dates: [Date],
      data: [],
    },
  ],
}, { autoIndex: false });

module.exports = mongoose.model('LastFM', LastFMSchema);
