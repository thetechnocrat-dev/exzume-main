fitbitAPI = require('./fitbitAPI');
lastfmAPI = require('./lastfmAPI');
rescueTimeAPI = require('./rescueTimeAPI');
stravaAPI = require('./stravaAPI');
darkSkyAPI = require('./darkSkyAPI');

dataStreamAPIs = {
  fitbit: fitbitAPI,
  lastfm: lastfmAPI,
  rescuetime: rescueTimeAPI,
  strava: stravaAPI,
  darksky: darkSkyAPI,
};

module.exports = dataStreamAPIs;
