enumerableUtil = {
  findObjectInArray: function (array, key, value) {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      if (obj[key] === value) {
        return { obj: obj, ind: i };
      }
    }

    return {};
  },

};

module.exports = enumerableUtil;

