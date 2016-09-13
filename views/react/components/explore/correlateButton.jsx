var React = require('react');
var GraphStore = require('../../stores/graphStore');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var PropTypes = React.PropTypes;

var CorrelateButton = React.createClass({

  handleClick: function () {
    var selectedDataSeries = GraphStore.getSeriesData();
    console.log(selectedDataSeries);
    f1 = selectedDataSeries[0].values;
    f2 = selectedDataSeries[1].values;

    processedData = [];
    var minLength = f1.length <= f2.length ? f1.length : f2.length;
    var i = 0;
    var j = 0;
    while (i < minLength && j < minLength) {
      if ((new Date(f1[i].x)).getTime() == (new Date(f2[j].x)).getTime()) {
        processedData.push({ f1: f1[i].y, f2: f2[j].y });
        i++; j++;
      } else if ((new Date(f1[i].x)).getTime() < (new Date(f2[j].x)).getTime()) {
        processedData.push({ f1: f1[i].y, f2: null });
        i++;
      } else {
        processedData.push({ f1: null, f2: f2[j].y });
        j++;
      }
    }

    while (i < f1.length) {
      processedData.push({ f1: f1[i].y, f2: null });
      i++;
    }

    while (j < f2.length) {
      processedData.push({ f1: null, f2: f2[j].y });
      j++;
    }

    console.log(processedData);

    FastFlux.webCycle('post', '/auth/correlate', {
      shouldStoreReceive: false,
      body: { data: JSON.stringify(processedData) },
    });

  },

  makeButton: function () {
    var buttonStyle = {};

    if (GraphStore.hasTwoSelectedFeatures()) {
      return (
        <button
          className="ui green button"
          style={buttonStyle}
          onClick={this.handleClick}>Correlate
        </button>
      );
    } else {
      return (
        <button
          className="ui disabled button"
          style={buttonStyle}>Correlate
        </button>
      );
    }
  },

  render: function () {
    return (
      <div>
        {this.makeButton()}
      </div>
    );
  },

});

module.exports = CorrelateButton;
