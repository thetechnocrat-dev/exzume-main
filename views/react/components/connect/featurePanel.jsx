var React = require('react');

var FeaturePanel = React.createClass({
  propTypes: {
    name: React.PropTypes.String.isRequired,
    dataStreams: React.PropTypes.Array.isRequired,
  },

  makeDataStreams: function () {
    return this.props.dataStreams.map(function (dataStream, idx) {
      return (
        <p key={idx}>{dataStream}</p>
      );
    });
  },

  render: function () {
    return (
      <div className="column">
        <div className="ui cards">
          <div className="card">
            <div className="header">this.props.name</div>
            {this.makeDataStreams()}
          </div>
        </div>
      </div>
    );
  },

});

module.exports = FeaturePanel;
