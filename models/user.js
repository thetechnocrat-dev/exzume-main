var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
  local: {
    username: String,
    password: String,
    email: String,
  },
  formURL:  { type: String, default: 'none' },
  insights: [{
      message: String,
      date: { type: Date, default: Date.now },
      liked: Boolean,
    },
  ],
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
