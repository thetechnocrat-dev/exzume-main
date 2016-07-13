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
    clientID: process.env.LASTFM_ID || dev.lastfm.clientID,
    clientSecret: process.env.LASTFM_SECRET || dev.lastfm.clientSecret,
    callbackURL: process.env.LASTFM_URL || dev.lastfm.callbackURL,
  },

};

// LastFM CREDENTIALS:
// Application name	exzume
// API key	d92bbfbcd24fdfd9b30f342cfe704e2d
// Shared secret	a3c44d2356aba4e6f5257c9240e47ed8
// Registered to	frealism
