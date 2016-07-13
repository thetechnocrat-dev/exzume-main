var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var Survey = require('./dataStreams/survey');
var Fitbit = require('./dataStreams/fitbit');
var LastFM = require('./dataStreams/lastfm');

var UserSchema = new Schema({
  local: {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: String,
  },
  formURL: { type: String, default: 'none' },
  vis: [{ url: String }],
  insights: [{
      message: String,
      date: { type: Date, default: Date.now },
      liked: Boolean,
    },
  ],
  survey: { type: Schema.Types.ObjectId, ref: 'Survey' },
  fitbit: { type: Schema.Types.ObjectId, ref: 'Fitbit' },
  lastfm: { type: Schema.Types.ObjectId, ref: 'LastFM' },
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
