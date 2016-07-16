var React = require('react');
var Style = require('../../util/style');

var FeaturePanel = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    dataStreams: React.PropTypes.array.isRequired,
  },

  getInitialState: function () {
    return { backgroundColor: Style.lightBackground };
  },

  makeDataStreams: function () {
    var dataStreams = '';
    this.props.dataStreams.forEach(function (dataStream, idx) {
      return (
        dataStreams += dataStream
      );
    });
  },

  handleMouseEnter: function () {
    this.setState({ backgroundColor: Style.lightBackgroundHover });
  },

  handleMouseLeave: function () {
    this.setState({ backgroundColor: Style.lightBackground });
  },

  render: function () {
    var cardStyle = { backgroundColor: this.state.backgroundColor, cursor: 'pointer' };
    return (
      <div className="column">
        <div className="ui cards">
          <div className="card" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} style={cardStyle}>
            <div className="content">
              <div className="header">{this.props.name}</div>
              <div className="description">{this.props.dataStreams.toString()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = FeaturePanel;
