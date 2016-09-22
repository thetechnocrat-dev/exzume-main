var util = require('./util');
var axios = require('axios');
var async = require('async');

var stravaAPI = {
  connect: function (passport) {
    return passport.authenticate('strava', { scope: ['public'] });
  },

};

module.exports = stravaAPI;
