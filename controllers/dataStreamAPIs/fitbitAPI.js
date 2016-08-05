var fitbitAPI = {
  connect: function (passport) {
    var options = {
      scope: [
        'activity', 'heartrate', 'location', 'nutrition', 'profile', 'settings', 'sleep',
        'social', 'weight',
      ],
    };

    return passport.authenticate('fitbit', options);
  },

  sync: function () { console.log('fitbit sync function'); },
};

module.exports = fitbitAPI;
