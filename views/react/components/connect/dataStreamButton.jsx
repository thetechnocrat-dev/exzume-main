var React = require('react');
var PropTypes = React.PropTypes;
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var DataStreamButton = React.createClass({
  propTypes: {
    streamName: React.PropTypes.string.isRequired,
    featureName: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
  },

  clickAddUserFeature: function () {
    if (this.props.streamName == 'survey') {
      var url = '/auth/userfeatures/' + this.props.streamName + '/' + this.props.featureName;
      FastFlux.webCycle('post', url, {
        success: this.addUserFeatureSuccess,
        error: this.addUserFeatureError,
        shouldStoreReceive: true,
        storeActionType: 'SESSION_RECEIVED',
      });
    } else if (this.props.streamName == 'fitbit') {
      var url = 'auth/datastreams/fitbit/grab';
      FastFlux.webCycle('get', url, {
        success: this.addUserFeatureSuccess,
        error: this.addUserFeatureError,
        shouldStoreReceive: true,
        storeActionType: 'SESSION_RECEIVED',
      });
    }
  },

  addUserFeatureSuccess: function (resp) {
    console.log(resp);
  },

  addUserFeatureError: function (respError) {
    console.log(respError.responseText);
  },

  makeButton: function () {
    var style = { marginTop: '2.5%' };
    if (this.props.type === 'active') {
      return (
        <button className="ui green disabled labeled mini icon button" style={style}>
          <i className="check icon"></i>
          {this.props.streamName}
        </button>
      );
    } else if (this.props.type === 'connected') {
      return (
        <button
          className="ui yellow labeled mini icon button"
          onClick={this.clickAddUserFeature}
          style={style}
        >
          <i className="refresh icon"></i>
          {this.props.streamName}
        </button>
      );
    } else if (this.props.type === 'available') {
      return (
        <a href={'/auth/datastreams/' + this.props.streamName} style={style}>
          <button className="ui labeled mini icon button">
            <i className="plus icon"></i>
            {this.props.streamName}
          </button>
        </a>
      );
    }
  },

  render: function () {
    return (
      this.makeButton()
    );
  },

});

module.exports = DataStreamButton;
