// object with API resources base URLs
module.exports = {
  fitbit: {
    rootURL: 'https://api.fitbit.com/1/user/-/',
    features: [
      { featureName: 'Steps',
        extURL: 'activities/steps/date/',
        featureRef: 'activities-steps',
      },
    ],
  },
  lastfm: {
    rootURL: 'http://ws.audioscrobbler.com/2.0/',
  },
};
