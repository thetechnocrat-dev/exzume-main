// docs
// require at top of component you want to use
// ex/ var FastFlux = require('../util/fast-flux-react/fastFlux')
// then do FastFlux.webCycle(method, url, options)
//    method: the HTTP method you want to use all lowercase ('put', 'post', or 'get')
//    url: the back end route you want to hit
//    options: a hash of different options which are defined below
//        success: function    (front end successCallback)
//        error: function      (front end errorCallback)
//        shouldReceive




var Dispatcher = require('../../dispatcher/dispatcher');

var ActionUtil = {
  receiveData: function (data, type) {
    Dispatcher.dispatch({
      actionType: type,
      data: data,
    });
  },
};

var ApiUtil = {
  get: function (url, options) {
    $.ajax({
      type: 'GET',
      url: url,
      success:
      function (resp) {
        console.log('get ' + url + ' sucess');

        if (options.success) options.success(resp);
        if (options.shouldReceive) ActionUtil.receiveData(resp, options.type);
      },

      error:
      function (resp) {
        console.log('get ' + url + ' error', resp);
        if (options.error) options.error(resp);
      },
    });
  },

  post: function (url, body, options) {
    $.ajax({
      type: 'POST',
      url: url,
      data: body,
      dataType: 'json',
      success:
      function (resp) {
        console.log('post ' + url + ' success');
        if (options.success) options.success(resp);
        if (options.shouldReceive) ActionUtil.receiveData(resp, options.type);
      },

      error:
      function (resp) {
        console.log('post ' + url + ' error', resp);
        if (options.error) options.error(resp);
      },
    });
  },

  put: function (url, body, options) {
    $.ajax({
      type: 'PUT',
      url: url,
      data: body,
      dataType: 'json',
      success:
      function (resp) {
        console.log('put ' + url + ' success');
        if (options.success) options.success(resp);
        if (options.shouldReceive) ActionUtil.receiveData(resp, options.type);
      },
    });
  },
};

module.exports = {
  webCycle: function (method, url, options) {
    if (method === 'post' || method === 'put') {
      ApiUtil[method](url, options.body, options);
    } else {
      ApiUtil[method](url, options);
    }
  },
};
