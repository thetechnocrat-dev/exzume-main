var axios = require('axios');

var rescueTimeAPI = {
  connect: function () {
    return function (req, res, next) {
      console.log('rescue time redirect');
      req.redirect('https://www.rescuetime.com/oauth/authorize/?response_type=code&redirect_uri=https%3A%2F%2Fwww.exzume.com%2Fauth%2Fdatastreams%2Frescuetime%2Fcallback&scope=time_data%20category_data%20productivity_data&client_id=2900e583f575ac611f1ffd83827ee0995f5b462f159fe42288f12e847e6b430a');
    };
  },

  sync: function (user, endSync) {
    endSync(null, user, null);
  },

};

module.exports = rescueTimeAPI;

