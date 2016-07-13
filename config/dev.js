// Set the environment configuration object -- for development
module.exports = {
  db: 'mongodb://localhost/exzume-main',
  sessionSecret: 'knowThyself',
  fitbit: {
    clientID: '227TQM',
    clientSecret: 'd44c4411eec72933ccd86d7efe8ea12d',
    callbackURL: '/auth/fitbit/callback/',
  },
  lastfm: {
    clientID: 'd92bbfbcd24fdfd9b30f342cfe704e2d',
    clientSecret: 'a3c44d2356aba4e6f5257c9240e47ed8',
    callbackURL: 'http://localhost:3000/auth/lastfm/callback',
  },
};
