fitbitAPI = require('./fitbitAPI');
lastfmAPI = require('./lastfmAPI');
rescueTimeAPI = require('./rescueTimeAPI');

dataStreamAPIs = {
  fitbit: fitbitAPI,
  lastfm: lastfmAPI,
  rescueTime: rescueTimeAPI,
};

module.exports = dataStreamAPIs;
