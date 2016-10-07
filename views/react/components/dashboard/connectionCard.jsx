var React = require('react');
var History = require('react-router').History;
var ConnectionItem = require('./connectionItem');

var ConnectionCard = React.createClass({
  mixins: [History],

  propTypes: {
    connectedStreams: React.PropTypes.array.isRequired,
  },

  clickConnect: function () {
    this.history.push('/dashboard/connect');
  },

  makeConnectionItems: function () {
    return this.props.connectedStreams.map(function (stream, idx) {
      var streamName = stream.name.toLowerCase();
      var syncIcon = stream.syncIcon;
      return (
        <ConnectionItem streamName={streamName} syncIcon={syncIcon} key={idx} />
      );
    });
  },

  makeMetaText: function () {
    if (this.props.connectedStreams.length == 0) {
      return (
        <div className="meta" style={{ marginBottom: '3%' }}>
          Click on plus icon to add a datastream.
        </div>
      );
    } else {
      return (
        <div className="meta" style={{ marginBottom: '3%' }}>
          Click on an icon to sync.
        </div>
      );
    }
  },

  render: function () {
    var textStyle = { marginBottom: '2%' };
    return (
      <div className="ui fluid card">
        <div className="content">
          <div className="header" style={{ marginBottom: '1%' }}>
            Connections
          </div>
          {this.makeMetaText()}
          <div className="ui three column grid" style={{ paddingTop: '3%' }}>
            {this.makeConnectionItems()}
          </div>
        </div>
        <div className="extra content" style={{ marginTop: '2%' }}>
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
