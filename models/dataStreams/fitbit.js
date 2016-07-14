var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../user');

var FitbitSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  profileId: { type: String, unique: true },
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
