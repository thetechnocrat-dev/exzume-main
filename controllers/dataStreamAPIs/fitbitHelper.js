var fitbitHelper = {
  // a user can have a bunch of leading zeros in data if they made a fitbit account before
  // getting a tracking device, this removes those zeros
  processData: function (newData, isFirstInit) {
    if (isFirstInit) {
      var i = 0;
      var shouldContinue = true;
      while (shouldContinue && i < newData.length) {
        if (newData[i].value !== '0') {
          shouldContinue = false;
        } else {
          i++;
        }
      }

      return newData.slice(i);
    } else {
      return newData;
    }
  },

};

module.exports = fitbitHelper;

