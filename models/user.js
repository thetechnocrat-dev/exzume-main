var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
  local: {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: String,
  },
  formURL: { type: String, default: 'none' },
  vis: [{ url: String }],
  insights: [
    {
      message: String,
      date: { type: Date, default: Date.now },
      liked: { type: Boolean, default: false },
    },
  ],
  datastreams: {
    survey: {
      features: [{
          featureId: Schema.Types.ObjectId,
          prompt: String,
          format: String, // see notes below for accepted formats
          dates: [Date],
          data: [],
        },
      ],
    },
    fitbit: {
      profileId: { type: String, unique: true },
      accessToken: String,
      refreshToken: String,
      features: [{
          name: String,
          featureId: Schema.Types.ObjectId,
          dates: [Date],
          data: [],
        },
      ],
    },
    lastfm: {
      username: String,
      key: String,
      features: [{
          name: String,
          featureId: Schema.Types.ObjectId,
          dates: [Date],
          data: [],
        },
      ],
    },
  },
}, { autoIndex: false });

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

// forces Mongoose to include getters which allow for the conversion of raw data
// as it travels from mongodb to server
UserSchema.set('toJSON', { getters: true, virtuals: true });

module.exports = mongoose.model('User', UserSchema);
