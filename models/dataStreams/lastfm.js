var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LastFMSchema = new Schema({
  owner: String,
  username: String,
  key: String,
  // profileId: String,
  accessToken: String,
  refreshToken: String,
  features: [{
      name: String,
      dates: [Date],
      data: [],
    },
  ],
}, { autoIndex: false });

module.exports = mongoose.model('LastFM', LastFMSchema);
