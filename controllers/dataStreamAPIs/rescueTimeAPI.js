var rescueTimeAPI = {
  connect: function (passport) {
    console.log('rescuetime api');
    return passport.authenticate('rescuetime');
  },

};

module.exports = rescueTimeAPI;

