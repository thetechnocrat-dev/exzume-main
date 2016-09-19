var React = require('react');
var GraphStore = require('../../stores/graphStore');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var CorrelateButton = React.createClass({
  propTypes: {
    correlation: React.PropTypes.node,
    pValue: React.PropTypes.node,
  },

  corrSuccess: function (res) {
    console.log(res);
    FastFlux.cycle('CORRELATION_RECEIVED', res[0].toFixed(2));
    FastFlux.cycle('PVALUE_RECEIVED', res[1].toFixed(4));
  },

  corrError: function (resp) {
    console.log(resp);
  },

  handleClick: function () {
    var selectedDataSeries = GraphStore.getRawSeriesData();
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
    };

    var key;
    var arr1 = [];
    var arr2 = [];
    for (var k = 0; k < processedData.length; k++) {
      arr1.push(processedData[k].f1);
      arr2.push(processedData[k].f2);
    }

    console.log(processedData);

    FastFlux.webCycle('post', '/auth/correlateTwo', {
      success: this.corrSuccess,
      error: this.corrError,
      shouldStoreReceive: false,
      body: { data: JSON.stringify({ f1: arr1, f2: arr2 }) },
    });

  },

  makeCorrMessage: function () {
    var messageStyle = { display: 'inline-block', marginLeft: '10px', marginTop: '-10px' };
    console.log('in corrmsg');
    if (this.props.correlation) {
      return (
        <div
          className="ui message"
          style={messageStyle}
          data-tooltip="Varies between -1 and +1 with 0 implying no correlation."
        >
          <b>Correlation:</b> {this.props.correlation}
        </div>
      );
    }
  },

  makePValueMessage: function () {
    var messageStyle = { display: 'inline-block', marginLeft: '10px', marginTop: '-10px' };
    console.log('in pvalue');
    if (this.props.pValue) {
      var percentConfidence = 100 - this.props.pValue * 100;
      console.log(percentConfidence);
      return (
        <div
          className="ui message"
          style={messageStyle}
          data-tooltip="More data points often increases reliability."
        >
          <b>% Confidence:</b> {percentConfidence}%
        </div>
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
        {this.makePValueMessage()}
      </div>
    );
  },

});

module.exports = CorrelateButton;
