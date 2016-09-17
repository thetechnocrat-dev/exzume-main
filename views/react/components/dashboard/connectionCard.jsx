var React = require('react');
var History = require('react-router').History;

// Components
// var connectItem = require('./connectItem');

var ConnectionCard = React.createClass({
  mixins: [History],

  propTypes: {
    userStreams: React.PropTypes.array.isRequired,
  },

  clickConnect: function () {
    this.history.push('/dashboard/connect');
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
            <div className ="centered column" style={{ textAlign: 'center' }}>
              <img className="ui image" src={'images/fitbit-logo-round.png'} />  
            </div>
            <div className ="centered column" style={{ textAlign: 'center' }}>
              <img className="ui image" src={'images/lastfm-logo-round.png'} />  
            </div>
            <div className ="centered column" style={{ textAlign: 'center' }}>
              <img className="ui image" src={'images/rescuetime-logo-round.png'} />  
            </div>
            <div className="column" style={{ textAlign: 'center' }}>
              <div className="ui yellow icon button">
                <i className="plus icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = ConnectionCard;

