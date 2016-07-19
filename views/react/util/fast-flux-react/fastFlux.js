var Dispatcher = require('../../dispatcher/dispatcher');

var ActionUtil = {
  receiveData: function (data, storeActionType) {
    Dispatcher.dispatch({
      actionType: storeActionType,
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
          options.success(resp, 'get', url);
          if (options.shouldStoreReceive) ActionUtil.receiveData(resp, options.storeActionType);
        },

      error:
        function (resp) {
          options.error(resp, 'get', url);
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
          options.success(resp, 'post', url);
          if (options.shouldStoreReceive) ActionUtil.receiveData(resp, options.storeActionType);
        },

      error:
        function (resp) {
          options.error(resp, 'post', url);
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
          options.success(resp, 'put', url);
          if (options.shouldStoreReceive) ActionUtil.receiveData(resp, options.storeActionType);
        },

      error:
        function (resp) {
          options.error(resp, 'put', url);
        },
    });
  },
};

var successDefault = function (resp, method, url) {
  console.log(method + ' ' + url + ' success');
};

var errorDefault = function (resp, method, url) {
  console.log(method + ' ' + url + ' error', resp);
};

module.exports = {
  webCycle: function (method, url, options) {
    options.shouldStoreReceive = options.shouldStoreReceive || false;
    options.success = options.success || successDefault;
    options.error = options.error || errorDefault;
    if (method === 'post' || method === 'put') {
      ApiUtil[method](url, options.body, options);
    } else {
      ApiUtil[method](url, options);
    }
  },

  cycle: function (storeActionType, data) {
    ActionUtil.receiveData(data, storeActionType);
  },
};
