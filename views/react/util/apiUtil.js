module.exports = {
  signUp: function (params, actionCallback, errorCallback) {
    $.ajax({
      type: 'POST',
      url: 'api/auth/signup',
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
};
