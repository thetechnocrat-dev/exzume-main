var rescueTimeAPI = {
  connect: function (passport) {
    return passport.authenticate('rescuetime');
  },

  sync: function (user, endSync) {
    endSync(null, user, null);
  },

};

module.exports = rescueTimeAPI;

