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
    {
      name: 'Tracks Played',
      users: [],
      dataStreams: ['lastfm'],
      categories: ['music'],
    },
		{
			name: 'Control',
			users: [],
			dataStreams: ['survey'],
			options: {
				prompt: 'I felt in control of my day.',
				format: 'agreementScale',
			},
		},
		{
			name: 'Productivity',
			users: [],
			dataStreams: ['survey'],
			options: {
				prompt: 'I was productive today.',
				format: 'agreementScale',
			},
		},
		{
			name: 'Stress',
			users: [],
			dataStreams: ['survey'],
			options: {
				prompt: 'I experienced a lot of stress today.',
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
