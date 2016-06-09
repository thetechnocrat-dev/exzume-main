module.exports = {
  signUp: function (params, actionCallback, errorCallback) {
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
};
