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
  zumes: [
    { featureName: String },
  ],
  insights: [
    {
      message: String,
      date: { type: Date, default: Date.now },
      liked: { type: Boolean, default: false },
    },
  ],
  datastreams: {
    survey: {
      isConnected: { type: Boolean, default: true },
      features: [{
          name: String,
          prompt: String,
          format: String, // see notes below for accepted formats
          data: [],
        },
      ],
    },
    fitbit: {
      profileId: { type: String, unique: true },
      accessToken: String,
      refreshToken: String,
      isConnected: { type: Boolean, default: false },
      features: [{
          name: String,
          data: [],
        },
      ],
    },
    lastfm: {
      username: String,
      key: String,
      isConnected: { type: Boolean, default: false },
      features: [{
          name: String,
          data: [],
        },
      ],
    },
    rescueTime: {
      accessToken: String,
      refreshToken: String,
      isConnected: { type: Boolean, default: false },
      features: [{
          name: String,
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
