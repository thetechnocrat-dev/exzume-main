var rescueTimeAPI = {
  connect: function (passport) {
    console.log('rescuetime api');
    return passport.authenticate('oauth2');
  },

};

module.exports = rescueTimeAPI;

