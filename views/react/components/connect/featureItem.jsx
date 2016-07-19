var React = require('react');
var Style = require('../../util/style');

// components
var DataStreamButton = require('./DataStreamButton');

var FeatureItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    dataStreams: React.PropTypes.array.isRequired,
    userActiveStream: React.PropTypes.string,
  },

  getInitialState: function () {
    // changes color based on if it is already user active
    return this.setColors();
  },

  setColors: function () {
    if (this.props.userActiveStream) {
      return { backgroundColor: Style.lightGreen, hoverColor: Style.lightGreenHover };
    } else {
      return { backgroundColor: Style.lightBackground, hoverColor: Style.lightBackgroundHover };
    }
  },

  makeDataStreamButtons: function () {
    var dataStreams = this.props.dataStreams;
    var _this = this;
    return dataStreams.map(function (dataStream, idx) {
      if (_this.props.userActiveStream === dataStream) {
        return (
          <DataStreamButton
            key={idx}
            dataStream={dataStream}
            isActive={true}
          />
        );
      } else {
        return (
          <DataStreamButton
            key={idx}
            dataStream={dataStream}
            isActive={false}
          />
        );
      }
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
              <div className="header">{this.props.name}</div>
              <div className="description">
                {this.makeDataStreamButtons()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = FeatureItem;
