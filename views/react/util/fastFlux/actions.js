var ApiUtil = require('./apiUtil');

module.exports = {
  webCycle: function (method, url, options) {
    if (method === 'post' || method === 'put') {
      ApiUtil[method](url, options.body, options.success, options.error);
    } else {
      ApiUtil[method](url, options.success, options.error);
    }
  },
};
