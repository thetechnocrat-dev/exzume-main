module.exports = {
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
          console.log('ajax session success');
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
      url: '/auth/insights/' + params.insightId,
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

  addFitbit: function (successCallback, errorCallback) {
    $.ajax({
      type: 'GET',
      url: '/auth/fitbit',
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

  selectSeries: function (params, successCallback, errorCallback) {
    $.ajax({
      type: 'GET',
      url: '/auth/selectseries',
      data: params,
      success:
        function (respData) {
          successCallback(respData);
          console.log('ajax select series success', respData);
        },

      error:
        function (respError) {
          errorCallback(respError.responseText);
          console.log('ajax select series error', respError);
        },
    });
  },

  addFitbitData: function (params, successCallback, errorCallback) {
    $.ajax({
      type: 'PUT',
      url: '/admin/addfitbitdata',
      data: params,
      success:
        function (respData) {
          successCallback(respData);
          console.log('ajax add fitbit data success', respData);
        },

      error:
        function (respError) {
          errorCallback(respError.responseText);
          console.log('ajax add fitbit data error', respError);
        },
    });
  },

  addSurveyQuestion: function (params, action, successCallback, errorCallback) {
    $.ajax({
      type: 'PUT',
      url: '/auth/addsurveyquestion',
      data: params,
      success:
        function (respData) {
          action(respData);
          successCallback(respData);
          console.log('ajax add survey question success', respData);
        },

      error:
        function (respError) {
          errorCallback(respError.responseText);
          console.log('ajax add survey question error', respError);
        },
    });
  },

  fetchSurveyQuestions: function (successCallback) {
    $.ajax({
      type: 'GET',
      url: '/auth/surveyquestions',
      success:
        function (respData) {
          successCallback(respData);
          console.log('ajax get survey questions success');
        },

      error:
        function (respError) {
          console.log('ajax get survey question error', respError);
        },
    });
  },

  fetchData: function (params, action) {
    $.ajax({
      type: 'PUT',
      url: '/auth/selectseries',
      data: params,
      success:
        function (respData) {
          console.log(respData);
          action(respData);
          console.log('ajax get series data success');
        },

      error:
        function (respError) {
          console.log('ajax get series data error', respError);
        },
    });
  },

  submitSurveyAnswer: function (params, success, error) {
    console.log(params);
    $.ajax({
      type: 'PUT',
      url: '/auth/submitsurveyanswer',
      data: params,
      success:
        function (respData) {
          success(respData);
          console.log('ajax submit survey answer success');
        },

      error:
        function (respError) {
          console.log('ajax get survey question error', respError);
        },
    });
  },

};
