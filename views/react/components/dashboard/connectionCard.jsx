var React = require('react');
var History = require('react-router').History;
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var ConnectionCard = React.createClass({
  mixins: [History],

  propTypes: {
    connectedStreams: React.PropTypes.array.isRequired,
  },

  clickIcon: function (streamName) {
    FastFlux.webCycle('get', '/auth/datastreams/' + streamName + '/grab', {
      shouldStoreReceive: true,
      storeActionType: 'SESSION_RECEIVED',
    });
  },

  clickConnect: function () {
    this.history.push('/dashboard/connect');
  },

  makeConnectionItems: function () {
    var _this = this;
    return this.props.connectedStreams.map(function (stream, idx) {
      var streamName = stream.name.toLowerCase();
      return (
        <div className ='centered column' style={{ textAlign: 'center' }}>
          <img
            className='ui image'
            src={stream.syncIcon}
            onClick= {_this.clickIcon.bind(_this, streamName)}
            style={{ cursor: 'pointer' }}
            key={idx}
          />
        </div>
      );
    });
  },

  render: function () {
    var textStyle = { marginBottom: '2%' };
    return (
      <div className="ui fluid card">
        <div className="content">
          <div className="header" style={{ marginBottom: '1%' }}>
            Connections
          </div>
          <div className="meta" style={{ marginBottom: '3%' }}>
            Click on an icon to sync.
          </div>
          <div className="ui three column grid">
            {this.makeConnectionItems()}
          </div>
        </div>
        <div className="extra content">
          <div className="right floated author">
            <div className="ui yellow icon button" onClick={this.clickConnect}>
              <i className="plus icon" />
            </div>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = ConnectionCard;
