var User = require('../models/user');
var Feature = require('../models/feature');
var findObjectInArray = require('../util/enumerable').findObjectInArray;
var moment = require('moment');
var App = require('../models/app');

var features = [
  {
    name: 'Steps',
    users: [],
    dataStreams: ['fitbit'],
    categories: ['fitness'],
  },
  {
    name: 'General Productivity',
    users: ['Watts42'],
    dataStreams: ['survey'],
    categories: ['productivity'],
    options: {
      prompt: 'I was productive today',
      format: 'agreementScale',
    },
  },
  {
    name: 'Life Satisfaction',
    users: ['Watts42'],
    dataStreams: ['survey'],
    options: {
      prompt: 'Overall, I am satisfied with how I did today.',
      format: 'agreementScale',
    },
  },

  // {
  //   name: 'Tracks Played',
  //   users: ['Watts42'],
  //   dataStreams: ['lastfm'],
  //   categories: ['music'],
  // },

  {
    name: 'Control',
    users: ['Watts42'],
    dataStreams: ['survey'],
    options: {
      prompt: 'I felt in control of my day.',
      format: 'agreementScale',
    },
  },
  {
    name: 'Stress',
    users: ['Watts42'],
    dataStreams: ['survey'],
    options: {
      prompt: 'I experienced a lot of stress today.',
      format: 'agreementScale',
    },
  },
  {
    name: 'Internet Time',
    users: [],
    dataStreams: ['rescueTime'],
    categories: ['productivity'],
  },
];

var generateSurveyUserFeatures = function (featureNames) {
  var MAX_LENGTH = 10;
  var userSurveyFeatures = [];

  for (var i = 0; i < featureNames.length; i++) {
    var surveyFeature = findObjectInArray(features, 'name', featureNames[i]).obj;
    var userSurveyFeature = {};
    userSurveyFeature.name = surveyFeature.name;
    userSurveyFeature.prompt = surveyFeature.options.prompt;
    userSurveyFeature.format = surveyFeature.options.format;
    userSurveyFeature.data = [];
    var length = Math.floor((Math.random() * MAX_LENGTH) + 1);

    for (var j = length; j > 0; j--) {
      userSurveyFeature.data.push({
        dateTime: moment().subtract(j, 'd').format('YYYY-MM-DD'),
        value: Math.floor((Math.random() * 7) + 1),
      });
    }

    userSurveyFeatures.push(userSurveyFeature);
  }

  return userSurveyFeatures;
};

var apps = [
  {
    name: 'Fitbit',
    categories: ['fitness', 'wearable'],
    ratings: [5],
    express: false,
    requirements: [
      'wearable device highly recommended',
    ],
    basicPrice: 0,
    icon: 'fitbit-logo.png',
  },
];

var seedUser = function (apps, done) {
  var newUser = new User();
  newUser.local.username = 'Watts42';
  newUser.local.password = newUser.generateHash('password');
  var surveyUserFeatures = generateSurveyUserFeatures(
    ['General Productivity', 'Life Satisfaction', 'Control', 'Stress']
  );

  newUser.datastreams.survey.features = surveyUserFeatures;
  newUser.save(function (err) {
    if (err) {
      done(err, null);
    } else {
      done(null, { users: newUser, apps: apps });
    }
  });
};

module.exports = function (done) {
  console.log('seeding...');
  App.insertMany(apps, function (err, docs) {
    if (err) {
      done(err, null);
    } else {
      seedUser(docs, done);
    }
  });

};

