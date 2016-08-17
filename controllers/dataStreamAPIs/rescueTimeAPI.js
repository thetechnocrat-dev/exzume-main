var rescueTimeAPI = {
  connect: function (passport) {
    return passport.authenticate('rescuetime');
  },

};

module.exports = rescueTimeAPI;

