module.exports = {
  signup: function (params, actionCallback, successCallback, errorCallback) {
    $.ajax({
      type: 'POST',
      url: '/api/signup',
      data: params,
      dataType: 'json',
      success:
        function (respData) {
          actionCallback(respData);
          successCallback();
          console.log('ajax sign up success', respData);
        },

      error:
        function (respError) {
          errorCallback(respError.responseText);
          console.log('ajax sign up error', respError);
        },
    });
  },

  signIn: function (params, actionCallback, successCallback, errorCallback) {
    $.ajax({
      type: 'POST',
      url: '/api/signin',
      data: params,
      dataType: 'json',
      success:
        function (respData) {
          actionCallback(respData);
          successCallback();
          console.log('ajax sign in success', respData);
        },

      error:
        function (respError) {
          errorCallback(respError.responseText);
          console.log('ajax sign up error', respError);
        },
    });
  },

  signOut: function (actionCallback, successCallback) {
    $.ajax({
      type: 'GET',
      url: '/api/signout',
      success:
        function () {
          actionCallback();
          successCallback();
          console.log('ajax sign out success');
        },

      error:
        function () {
          console.log('ajax sign out error');
        },
    });
  },

  fetchSession: function (successCallback) {
    $.ajax({
      type: 'GET',
      url: '/api/session',
      success:
        function (respData) {
          successCallback(respData);
          console.log('ajax session success', respData);
        },

      error:
        function (respError) {
          console.log('ajax session error', respError);
        },
    });
  },

  userUpdate: function (params, successCallback, errorCallback) {
    $.ajax({
      type: 'PUT',
      url: '/api/' + params.username,
      data: params,
      success:
        function (respData) {
          successCallback(respData);
          console.log('ajax user update success', respData);
        },

      error:
        function (respError) {
          console.log('ajax user update error', respError);
        },
    });
  },
};
