fitbitAPI = require('./fitbitAPI');
lastfmAPI = require('./lastfmAPI');

dataStreamAPIs = {
  fitbit: fitbitAPI,
  lastfm: lastfmAPI,
};

module.exports = dataStreamAPIs;
