fitbitAPI = require('./fitbitAPI');
lastfmAPI = require('./lastfmAPI');
rescueTimeAPI = require('./rescueTimeAPI');
stravaAPI = require('./stravaAPI');

dataStreamAPIs = {
  fitbit: fitbitAPI,
  lastfm: lastfmAPI,
  rescuetime: rescueTimeAPI,
  strava: stravaAPI,
};

module.exports = dataStreamAPIs;
