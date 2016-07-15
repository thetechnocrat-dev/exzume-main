module.exports = {
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
