// Set the  environment configuration object -- for production
try {
  var dev = require('./dev.js');
} catch (e) {
  var dev = {};
}

module.exports = {
  db: process.env.MONGODB_URI || dev['db'],
	secretSecret: process.env.SESSION_SECRET || dev['sessionSecret'],
  fitbit: {
    clientID: '227TQM',
    clientSecret: 'd44c4411eec72933ccd86d7efe8ea12d',
    callbackURL: 'http://localhost:3000/auth/fitbit/callback/',
  },
  lastfm: {
    clientID: 'd92bbfbcd24fdfd9b30f342cfe704e2d',
    clientSecret: 'a3c44d2356aba4e6f5257c9240e47ed8',
    callbackURL: 'http://localhost:3000/auth/lastfm/callback'
  },

};

// LastFM CREDENTIALS:
// Application name	exzume
// API key	d92bbfbcd24fdfd9b30f342cfe704e2d
// Shared secret	a3c44d2356aba4e6f5257c9240e47ed8
// Registered to	frealism
