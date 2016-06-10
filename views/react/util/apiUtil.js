module.exports = {
  signUp: function (params, actionCallback, errorCallback) {
    console.log('api', params);
    $.ajax({
      type: 'POST',
      url: 'register',
      data: params,
      dataType: 'json',
      success:
        function (respData) {
          actionCallback(respData);
          console.log('ajax sign up success', respData);
        },

      error:
        function (respError) {
          errorCallback(respError.responseText);
          console.log('ajax sign up error', respError);
        },
    });
  },

  signOut: function (successCallback) {
    $.ajax({
      type: 'GET',
      url: '/signout',
      success:
        function () {
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
};
