// Set the environment configuration object -- for development
module.exports = {
  db: 'mongodb://localhost/exzume-main',
  sessionSecret: 'knowThyself',
  fitbit: {
    clientID: '227TQM',
    clientSecret: 'd44c4411eec72933ccd86d7efe8ea12d',
    callbackURL: '/auth/datastreams/fitbit/callback/',
  },
  lastfm: {
    clientID: 'efe65c99aaf387249c3cf8ca16e6b884',
    clientSecret: '78bff7ac8ce66ea1c5f1f43017dd9b21',
    callbackURL: 'http://localhost:3000/auth/datastreams/lastfm/callback',
  },
  rescueTime: {
    clientID: '2900e583f575ac611f1ffd83827ee0995f5b462f159fe42288f12e847e6b430a',
    clientSecret: '6a6eb52e35380c8af6e658f54496a8d6f4c769e0b0e58cebb0556942f9d6ec60',
    callbackURL: 'https://exzume-staging.herokuapp.com/auth/datastreams/rescuetime/callback',
  },
};
