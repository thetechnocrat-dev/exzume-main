var React = require('react');
var GraphStore = require('../../stores/graphStore');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var PropTypes = React.PropTypes;

var CorrelateButton = React.createClass({
  getInitialState: function () {
    var corrVal = null;
    return { corrVal: corrVal };
  },

  corrSuccess: function (res) {
    console.log(res);
    this.setState({ corrVal: res.toFixed(2) });
  },

  corrError: function (resp) {
    console.log(resp);
  },

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
      success: this.corrSuccess,
      error: this.corrError,
      shouldStoreReceive: false,
      body: { data: JSON.stringify(processedData) },
    });

  },

  makeCorrMessage: function () {
    var corrVal = this.state.corrVal;
    var messageStyle = { display: 'inline-block', marginLeft: '10px' };
    if (corrVal) {
      return (
        <div className="ui message" style={messageStyle}>{corrVal}</div>
      );
    }
  },

  makeButton: function () {
    var buttonStyle = { marginLeft: '10px' };

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
      <div style={{ display: 'inline-block' }}>
        {this.makeButton()}
        {this.makeCorrMessage()}
      </div>
    );
  },

});

module.exports = CorrelateButton;
