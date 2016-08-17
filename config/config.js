// Set the  environment configuration object -- for production
try {
  var dev = require('./dev.js');
} catch (e) {
  var dev = {};
}

module.exports = {
  db: process.env.MONGODB_URI || dev.db,
  secretSecret: process.env.SESSION_SECRET || dev.sessionSecret,
  fitbit: {
    clientID: process.env.FITBIT_ID || dev.fitbit.clientID,
    clientSecret: process.env.FITBIT_SECRET || dev.fitbit.clientSecret,
    callbackURL: process.env.FITBIT_URL || dev.fitbit.callbackURL,
  },
  lastfm: {
    clientID: process.env.LASTFM_ID || dev.lastfm.clientID,               // API Key
    clientSecret: process.env.LASTFM_SECRET || dev.lastfm.clientSecret,
    callbackURL: process.env.LASTFM_URL || dev.lastfm.callbackURL,
  },
  rescueTime: {
    clientID: process.env.RESCUE_TIME_ID || dev.rescueTime.clientID,
    clientSecret: process.env.RESCUETIME_ID || dev.rescueTime.clientID,
    callbackURL: process.env.RESCUE_TIME_URL || dev.rescueTime.callbackURL,
  },

};
