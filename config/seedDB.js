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
      options: {
        prompt: 'How many cups of coffee did you drink?',
        format: 'textQuestion',
      },
    },
    {
      name: 'General Productivity',
      users: [],
      dataStreams: ['survey'],
      categories: ['productivity'],
      options: {
        prompt: 'I was productive today',
        format: 'agreementScale',
      },
    },
    {
      name: 'Life Satisfaction',
      users: [],
      dataStreams: ['survey'],
      options: {
        prompt: 'Overall, I am satisfied with how I did today.',
        format: 'agreementScale',
      },
    },
    ], function (err, docs) {
    if (err) {
      res.json(err);
    } else {
      res.json(docs);
    }
  });
};
