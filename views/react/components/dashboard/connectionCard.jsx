var React = require('react');

// Components

var ConnectionCard = React.createClass({
  propTypes: {
    userStreams: React.PropTypes.array.isRequired,
  },

  clickConnect: function () {
  },

  makeConnectionItems: function () {
    return this.props.userStreams.map(function (stream, idx) {
      return (
        <div className="column">
          <i className="huge firefox icon" key={idx} />
        </div>
      );
    });
  },

  render: function () {
    return (
      <div className="ui fluid card">
        <div className="content">
          <div className="header" style={{ marginBottom: '2%' }}>
            Connections
          </div>
          <div className="ui three column grid">
            {this.makeConnectionItems()}
          </div>
        </div>
      </div>
    );
  },

});

module.exports = ConnectionCard;

