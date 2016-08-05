var lastfmAPI = {
  connect: function (passport) {
    return passport.authenticate('lastfm');
  },

  sync: function () { console.log('lastfm sync function'); },
};

module.exports = lastfmAPI;
