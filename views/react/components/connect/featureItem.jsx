var React = require('react');
var Style = require('../../util/style');

// components
var DataStreamButton = require('./DataStreamButton');

var FeatureItem = React.createClass({
  propTypes: {
    feature: React.PropTypes.object.isRequired,
    activeStreams: React.PropTypes.array,
    connectedStreams: React.PropTypes.array,
    availableStreams: React.PropTypes.array,
  },

  getInitialState: function () {
    // console.log(this.props);
    // changes color based on if it is already user active
    return this.setColors();
  },

  setColors: function () {
    if (this.props.activeStreams.length > 0) {
      return { backgroundColor: Style.lightGreen, hoverColor: Style.lightGreenHover };
    } else {
      return { backgroundColor: Style.lightBackground, hoverColor: Style.lightBackgroundHover };
    }
  },

  makeActiveButtons: function () {
    var _this = this;
    return this.props.activeStreams.map(function (dataStream, idx) {
      return (
        <DataStreamButton
          key={idx}
          streamName={dataStream}
          featureName={_this.props.feature.name}
          type="active"
        />
      );
    });
  },

  makeConnectedButtons: function () {
    var _this = this;
    return this.props.connectedStreams.map(function (dataStream, idx) {
      return (
        <DataStreamButton
          key={idx}
          streamName={dataStream}
          featureName={_this.props.feature.name}
          type="connected"
        />
      );
    });
  },

  makeAvailibleButtons: function () {
    var _this = this;
    return this.props.availableStreams.map(function (dataStream, idx) {
      return (
        <DataStreamButton
          key={idx}
          streamName={dataStream}
          featureName={_this.props.feature.name}
          type="available"
        />
      );
    });
  },

  handleMouseEnter: function () {
    this.setState({ backgroundColor: this.setColors().hoverColor });
  },

  handleMouseLeave: function () {
    this.setState({ backgroundColor: this.setColors().backgroundColor });
  },

  render: function () {
    var cardStyle = { backgroundColor: this.state.backgroundColor };
    return (
      <div className="column">
        <div className="ui cards">
          <div className="card"
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            style={cardStyle}
          >
            <div className="content">
              <div className="header">{this.props.feature.name}</div>
              <div className="description">
                {this.makeActiveButtons()}
                {this.makeConnectedButtons()}
                {this.makeAvailibleButtons()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = FeatureItem;
