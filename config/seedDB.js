var User = require('../models/user');
var findObjectInArray = require('../util/enumerable').findObjectInArray;
var moment = require('moment');
var App = require('../models/app');
var async = require('async');

var apps = [
  {
    name: 'Fitbit',
    categories: ['fitness', 'wearable'],
    ratings: [5],
    express: false,
    requirements: [
      'account required',
      'wearable device highly recommended',
    ],
    basicPrice: 0,
    connectIcon: 'fitbit-logo.png',
    openUrl: 'https://www.fitbit.com/',
  },
  {
    name: 'LastFM',
    categories: ['music'],
    ratings: [5, 4],
    express: false,
    requirements: [
      'account required',
    ],
    basicPrice: 0,
    connectIcon: 'lastfm-logo.png',
    openUrl: 'http://www.last.fm/home',
  },
  {
    name: 'RescueTime',
    categories: ['productivity'],
    ratings: [5],
    express: false,
    requirements: [
      'account required',
      'download required',
    ],
    basicPrice: 0,
    connectIcon: 'rescuetime-logo.png',
    openUrl: 'https://www.rescuetime.com',
  },
  {
    name: 'Strava',
    categories: ['fitness'],
    ratings: [5],
    express: false,
    requirements: [
      'account required',
      'download required',
    ],
    basicPrice: 0,
    connectIcon: 'strava-logo.png',
    openUrl: 'https://www.strava.com',
  },
];

module.exports = function (done) {
  async.series(
    [
      function (callback) {
        User.remove({}, function (err) {
          if (err) {
            callback(err, 'user remove error');
          } else {
            callback(null);
          }
        });
      },

      function (callback) {
        App.remove({}, function (err) {
          if (err) {
            callback(err, 'app remove error');
          } else {
            callback(null);
          }
        });
      },

      function (callback) {
        App.insertMany(apps, function (err, docs) {
          if (err) {
            callback(err, 'app insert error');
          } else {
            callback(null, docs);
          }
        });
      },

      function (callback) {
        var newUser = new User();
        newUser.local.username = 'Watts42';
        newUser.local.password = newUser.generateHash('password');
        newUser.local.email = 'exzume.app@gmail.com';
        newUser.local.passwordResetToken = '123';
        newUser.save(function (err) {
          if (err) {
            callback(err, 'user insert error');
          } else {
            callback(null, newUser);
          }
        });
      },
    ],
    function (err, results) {
      done(err, { Apps: results[2], Users: results[3] });
    }
  );
};
