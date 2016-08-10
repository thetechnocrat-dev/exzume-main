describe('/controller/dataStreamAPIs/util.js', function () {
  var util = require('../../../controllers/dataStreamAPIs/util.js');
  describe('when finding API start data', function () {
    it('should return max if user features array is empty', function () {
      var timeSeries = [];
      var blankFlag = '0';
      expect(util.findStartDate(timeSeries, blankFlag)).toEqual('max');
    });

    it('should return last date if no blank flags are found', function () {
      var timeSeries = [
        { dateTime: '2016-07-31', value: '900' },
        { dateTime: '2016-08-01', value: '800' },
      ];
      var blankFlag = '0';
      var expectedResult = timeSeries[timeSeries.length - 1].dateTime;
      expect(util.findStartDate(timeSeries, blankFlag)).toEqual(expectedResult);
    });

    it('should return last non blank date if blank flags are found', function () {
      var timeSeries = [
        { dateTime: '2016-07-31', value: '900' },
        { dateTime: '2016-08-01', value: '800' },
        { dateTime: '2016-08-02', value: '0' },
        { dateTime: '2016-08-03', value: '0' },
      ];
      var blankFlag = '0';
      expect(util.findStartDate(timeSeries, blankFlag)).toEqual('2016-08-01');
    });

    it('should return earliest date if time series is all blank flags', function () {
      var timeSeries = [
        { dateTime: '2016-07-31', value: '0' },
        { dateTime: '2016-08-01', value: '0' },
        { dateTime: '2016-08-02', value: '0' },
      ];
      var blankFlag = '0';
      expect(util.findStartDate(timeSeries, blankFlag)).toEqual(timeSeries[0].dateTime);
    });

  });

});
