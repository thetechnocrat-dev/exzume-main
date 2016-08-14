var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var DataStreamItem = React.createClass({
  propTypes: {
    streamName: React.PropTypes.string.isRequired,
    streamImage: React.PropTypes.string.isRequired,
  },

  clickStreamItem: function () {
    var url = 'auth/datastreams/' + this.props.streamName + '/grab';
    FastFlux.webCycle('get', url, {
      success: this.success,
      error: this.error,
      shouldStoreReceive: true,
      storeActionType: 'SESSION_RECEIVED',
    });
  },

  success: function () {
    console.log(this.props.streamName + ' synced');
  },

  error: function () {
    console.log(this.props.streamName + ' sync failed');
  },

  render: function () {
    var imgStyle = { cursor: 'pointer' };
    return (
      <div className="ui small image" >
        <img src={this.props.streamImage} onClick={this.clickStreamItem} style={imgStyle} />
      </div>
    );
  },

});

module.exports = DataStreamItem;
