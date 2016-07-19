var React = require('react');
var PropTypes = React.PropTypes;

var DataStreamButton = React.createClass({
  propTypes: {
    streamName: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
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
        <a href={'/auth/datastreams/' + this.props.streamName + '/grab'}>
          <button className="ui yellow labeled mini icon button" style={style}>
            <i className="exchange icon"></i>
            {this.props.streamName}
          </button>
        </a>
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
