var User = require('../models/user');
var Feature = require('../models/feature');

module.exports = function (req, res) {
  console.log('seeding...');
  Feature.insertMany([
    {
      name: 'Steps',
      users: [],
      dataStreams: ['fitbit'],
      categories: ['fitness'],
    },
    {
      name: 'Caffeine',
      users: [],
      dataStreams: ['survey'],
      categories: ['health', 'productivity'],
    },
    {
      name: 'General Productivity',
      users: [],
      dataStreams: ['survey'],
      categories: ['productivity'],
    },
    {
      name: 'Life Satisfaction',
      users: [],
      dataStreams: ['survey'],
    },
    ], function (err, docs) {
    if (err) {
      res.json(err);
    } else {
      res.json(docs);
    }
  });
};
