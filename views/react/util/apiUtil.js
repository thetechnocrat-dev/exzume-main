module.exports = {
  signUp: function (params, successCallback, errorCallback) {
    $.ajax({
      type: 'POST',
      url: '/signup',
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
      url: '/signin',
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
      url: '/auth/signout',
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
      url: '/auth/session',
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

  starInsight: function (params, successCallback, errorCallback) {
    $.ajax({
      type: 'PUT',
      url: '/auth/starinsight',
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

  addFormUrl: function (params, successCallback, errorCallback) {
    $.ajax({
      type: 'PUT',
      url: '/admin/addform',
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
      url: '/admin/addinsight',
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

  addVisUrl: function (params, successCallback, errorCallback) {
    $.ajax({
      type: 'PUT',
      url: '/admin/addvis',
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

  addFitbit: function (params, successCallback, errorCallback) {
    $.ajax({
      type: 'POST',
      url: '/auth/datastream/fitbit',
      data: params,
      success:
        function (respData) {
          successCallback(respData);
          console.log('ajax add fitbit success', respData);
        },

      error:
        function (respError) {
          errorCallback(respError.responseText);
          console.log('ajax add fitbit error', respError);
        },
    });
  },
};
