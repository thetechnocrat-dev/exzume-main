var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
  local: {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
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
      isConnected: { type: Boolean, default: true },
      features: [{
          name: String,
          prompt: String,
          format: { type: String, enum: ['agreementScale'] },
          data: [],
        },
      ],
    },
    fitbit: {
      profileId: { type: String, unique: true },
      accessToken: String,
      refreshToken: String,
      lastSyncTime: { type: Date, default: Date.now },
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
      lastSyncTime: { type: Date, default: Date.now },
      isConnected: { type: Boolean, default: false },
      lastSongTime: Number,
      features: [{
          name: String,
          data: [],
        },
      ],
    },
    rescuetime: {
      accessToken: String,
      refreshToken: String,
      lastSyncTime: { type: Date, default: Date.now },
      isConnected: { type: Boolean, default: false },
      features: [{
          name: String,
          data: [],
        },
      ],
    },
    strava: {
      accessToken: String,
      lastSyncTime: { type: Date, default: Date.now },
      isConnected: { type: Boolean, default: false },
      features: [{
          name: String,
          data: [],
        },
      ],
    },
    darksky: {
      isConnected: { type: Boolean, default: false },
      lastSyncTime: { type: Date, default: Date.now },
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
