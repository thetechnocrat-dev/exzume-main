var User = require('../models/user');
var findObjectInArray = require('../util/enumerable').findObjectInArray;
var App = require('../models/app');
var async = require('async');

var apps = [
  {
    name: 'Fitbit',
    categories: ['fitness', 'wearable'],
    express: false,
    requirements: [
      'account required',
      'wearable device highly recommended',
    ],
    basicPrice: 0,
    syncIcon: 'images/fitbit-logo-round.png',
    connectIcon: 'fitbit-logo.png',
    openUrl: 'https://www.fitbit.com/',
  },
  {
    name: 'LastFM',
    categories: ['music'],
    express: false,
    requirements: [
      'account required',
    ],
    basicPrice: 0,
    syncIcon: 'images/lastfm-logo-round.png',
    connectIcon: 'lastfm-logo.png',
    openUrl: 'http://www.last.fm/home',
  },
  {
    name: 'RescueTime',
    categories: ['productivity'],
    express: false,
    requirements: [
      'account required',
      'download required',
    ],
    basicPrice: 0,
    syncIcon: 'images/rescuetime-logo-round.png',
    connectIcon: 'rescuetime-logo.png',
    openUrl: 'https://www.rescuetime.com',
  },

  // {
  //   name: 'Strava',
  //   categories: ['fitness'],
  //   ratings: [5],
  //   express: false,
  //   requirements: [
  //     'account required',
  //     'download required',
  //   ],
  //   basicPrice: 0,
  //   syncIcon: 'images/strava-logo-round.png',
  //   connectIcon: 'strava-logo.png',
  //   openUrl: 'https://www.strava.com',
  // },

  {
    name: 'DarkSky',
    categories: ['weather'],
    express: true,
    requirements: [
      'nothing required',
    ],
    basicPrice: 0,
    syncIcon: 'images/darksky-logo-round.png',
    connectIcon: 'darksky-logo.png',
    openUrl: 'https://darksky.net/app/',
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

        // PST is 7 hours behind UTC - Watts was obviously based in SF
        newUser.timezoneOffset = -420 * 60000;

        newUser.save(function (err) {
          if (err) {
            callback(err, 'user insert error');
          } else {
            callback(null, newUser);
          }
        });
      },

      function (callback) {
        var newUser = new User();
        newUser.local.username = 'Murakami42';
        newUser.local.isAdmin = true;
        newUser.local.password = newUser.generateHash('sXL5egXHHmTbgLjT');
        newUser.local.email = 'josh.mcmenemy@gmail.com';
        newUser.local.passwordResetToken = '121231198741911';

        // PST is 7 hours behind UTC - Watts was obviously based in SF
        newUser.timezoneOffset = -420 * 60000;

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
      done(err, { Apps: results[2], User1: results[3], User2: results[4] });
    }
  );
};

