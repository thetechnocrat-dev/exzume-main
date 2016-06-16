module.exports = {
  signUp: function (params, successCallback, errorCallback) {
    $.ajax({
      type: 'POST',
      url: '/api/signup',
      data: params,
      dataType: 'json',
      success:
        function (respData) {
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

  signIn: function (params, successCallback, errorCallback) {
    $.ajax({
      type: 'POST',
      url: '/api/signin',
      data: params,
      dataType: 'json',
      success:
        function (respData) {
          successCallback();
          console.log('ajax sign in success', respData);
        },

      error:
        function (respError) {
          errorCallback(respError.responseText);
          console.log('ajax sign in error', respData);
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

  addFormUrl: function (params, successCallback, errorCallback) {
    $.ajax({
      type: 'PUT',
      url: '/admin/api/addform',
      data: params,
      success:
        function (respData) {
          successCallback(respData);
          console.log('ajax add user form URL success', respData);
        },

      error:
        function (respError) {
          errorCallback(respError.responseText);
          console.log('ajax add user form URL error', respError);
        },
    });
  },

  addInsight: function (params, successCallback, errorCallback) {
    $.ajax({
      type: 'PUT',
      url: '/admin/api/addinsight',
      data: params,
      success:
        function (respData) {
          successCallback(respData);
          console.log('ajax add user insight success', respData);
        },

      error:
        function (respError) {
          errorCallback(respError.responseText);
          console.log('ajax add user insight error', respError);
        },
    });
  },

  starInsight: function (params, successCallback, errorCallback) {
    $.ajax({
      type: 'PUT',
      url: '/api/starinsight',
      data: params,
      success:
        function (resp) {
          successCallback(resp);
          console.log('ajax star insight success', resp);
        },

      error:
        function (resp) {
          errorCallback();
          console.log('ajax star insight error', resp);
        },
    });
  },

  addVisUrl: function (params, successCallback, errorCallback) {
    $.ajax({
      type: 'PUT',
      url: '/admin/api/addvis',
      data: params,
      success:
        function (respData) {
          successCallback(respData);
          console.log('ajax add vis URL success', respData);
        },

      error:
        function (respError) {
          errorCallback(respError.responseText);
          console.log('ajax add vis URL error', respError);
        },
    });
  },
};
