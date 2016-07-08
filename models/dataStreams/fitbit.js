var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FitbitSchema = new Schema({
  owner: String,
  profileId: String,
  accessToken: String,
  refreshToken: String,
  features: [{
      name: String,
      dates: [Date],
      data: [],
    },
  ],
}, { autoIndex: false });

module.exports = mongoose.model('Fitbit', FitbitSchema);
