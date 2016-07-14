module.exports = {
  get: function (url, success, error, action) {
    $.ajax({
      type: 'GET',
      url: url,
      success:
        function (resp) {
          console.log('get ' + url + ' sucess');
          success(resp);
          if (action) {
            action(resp);
          }
        },

      error:
        function (resp) {
          console.log('get ' + url + ' error', resp);
          error(resp);
        },
    });
  },

  post: function (url, body, success, error, action) {
    $.ajax({
      type: 'POST',
      url: url,
      data: body,
      dataType: 'json',
      success:
        function (resp) {
          console.log('post ' + url + ' success');
          success(resp);
          if (action) {
            action(resp);
          }
        },

      error:
        function (resp) {
          console.log('post ' + url + ' error', resp);
          error(resp);
        },
    });
  },

  put: function (body, url, success, error, action) {
    $.ajax({
      type: 'PUT',
      url: url,
      data: body,
      dataType: 'json',
      success:
        function (resp) {
          console.log('put ' + url + ' success');
          success();
          if (action) {
            action(resp);
          }
        },
    });
  },
};
