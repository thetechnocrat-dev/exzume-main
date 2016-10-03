var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
  local: {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    isAdmin: { type: Boolean, default: false },
    confirmEmail: {
      isConfirmed: { type: Boolean, default: false },
      token: String,
    },
    passwordResetToken: { type: String, required: true },
  },
  formURL: { type: String, default: 'none' },
  zumes: [
    { featureNames: [] },
  ],
  insights: [
    {
      message: String,
      date: { type: Date, default: Date.now },
      liked: { type: Boolean, default: false },
    },
  ],
  datastreams: {
    mood: {
      name: { type: String, default: 'Mood' },
      isConnected: { type: Boolean, default: false },
      isHidden: { type: Boolean, default: false },
      features: [
        {
          name: { type: String },
          data: [],
        },
      ],
    },
    survey: {
      name: { type: String, default: 'Personal Survey' },
      isConnected: { type: Boolean, default: false },
      features: [{
          name: String,
          prompt: String,
          format: { type: String, enum: ['agreementScale'] },
          data: [],
        },
      ],
    },
    fitbit: {
      name: { type: String, default: 'Fitbit' },
      profileId: { type: String, unique: true },
      accessToken: String,
      refreshToken: String,
      lastSyncTime: { type: Date, default: Date.now },
      syncIcon: { type: String, default: 'images/fitbit-logo-round.png' },
      isConnected: { type: Boolean, default: false },
      features: [{
          name: String,
          data: [],
        },
      ],
    },
    lastfm: {
      name: { type: String, default: 'LastFM' },
      username: String,
      key: String,
      lastSyncTime: { type: Date, default: Date.now },
      syncIcon: { type: String, default: 'images/lastfm-logo-round.png' },
      isConnected: { type: Boolean, default: false },
      lastSongTime: Number,
      features: [{
          name: String,
          data: [],
        },
      ],
    },
    rescuetime: {
      name: { type: String, default: 'RescueTime' },
      accessToken: String,
      refreshToken: String,
      lastSyncTime: { type: Date, default: Date.now },
      syncIcon: { type: String, default: 'images/rescuetime-logo-round.png' },
      isConnected: { type: Boolean, default: false },
      features: [{
          name: String,
          data: [],
        },
      ],
    },
    strava: {
      name: { type: String, default: 'Strava' },
      accessToken: String,
      lastSyncTime: { type: Date, default: Date.now },
      syncIcon: { type: String, default: 'images/strava-logo-round.png' },
      isConnected: { type: Boolean, default: false },
      features: [{
          name: String,
          data: [],
        },
      ],
    },
    darksky: {
      name: { type: String, default: 'DarkSky' },
      isConnected: { type: Boolean, default: false },
      lastSyncTime: { type: Date, default: Date.now },
      syncIcon: { type: String, default: 'images/darksky-logo-round.png' },
      lastSyncLoc: { lat: Number, long: Number },
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
