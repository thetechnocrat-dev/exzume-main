describe('/controller/dataStreamAPIs/fitbitHelper.js', function () {
  var fitbitHelper = require('../../../../controllers/dataStreamAPIs/fitbitHelper.js');

  // expects in this block could be written more exact expect statements
  describe('when processing fitbit API response data', function () {
    it('should remove leading zeros if first sync', function () {
      var isFirstSync = true;
      var newData = [
        { value: '0', dateTime: '2013-08-14' },
        { value: '0', dateTime: '2013-08-15' },
        { value: '0', dateTime: '2013-08-16' },
        { value: '900', dateTime: '2013-08-17' },
        { value: '700', dateTime: '2013-08-18' },
      ];

      var result = fitbitHelper.processData(newData, isFirstSync);
      expect(result.length).toEqual(2);
      expect(result[0].dateTime).toEqual('2013-08-17');
    });

    it('should leave leading zeros if NOT first sync', function () {
      var isFirstSync = false;
      var newData = [
        { value: '0', dateTime: '2013-08-14' },
        { value: '0', dateTime: '2013-08-15' },
        { value: '0', dateTime: '2013-08-16' },
        { value: '900', dateTime: '2013-08-17' },
        { value: '700', dateTime: '2013-08-18' },
      ];

      var result = fitbitHelper.processData(newData, isFirstSync);
      expect(result.length).toEqual(5);
      expect(result[0].dateTime).toEqual('2013-08-14');
    });

    it('should not remove non-leading zeros', function () {
      var isFirstSync = true;
      var newData = [
        { value: '0', dateTime: '2013-08-14' },
        { value: '0', dateTime: '2013-08-15' },
        { value: '900', dateTime: '2013-08-17' },
        { value: '0', dateTime: '2013-08-16' },
        { value: '700', dateTime: '2013-08-18' },
      ];

      var result = fitbitHelper.processData(newData, isFirstSync);
      expect(result.length).toEqual(3);
      expect(result[1].dateTime).toEqual('2013-08-16');
    });

  });

});

