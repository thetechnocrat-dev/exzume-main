fitbitAPI = require('./fitbitAPI');
lastfmAPI = require('./lastfmAPI');
rescueTimeAPI = require('./rescueTimeAPI');

dataStreamAPIs = {
  fitbit: fitbitAPI,
  lastfm: lastfmAPI,
  rescuetime: rescueTimeAPI,
};

module.exports = dataStreamAPIs;

