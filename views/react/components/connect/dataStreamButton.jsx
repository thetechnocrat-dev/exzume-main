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
          {this.props.dataStream}
        </button>
      );
    } else if (this.props.type === 'connected') {
      return (
        <a href={'/auth/datastreams/' + this.props.dataStream}>
          <button className="ui yellow labeled mini icon button" style={style}>
            <i className="exchange icon"></i>
            {this.props.dataStream}
          </button>
        </a>
      );
    } else if (this.props.type === 'available') {
      return (
        <a href={'/auth/datastreams/' + this.props.dataStream} style={style}>
          <button className="ui labeled mini icon button">
            <i className="plus icon"></i>
            {this.props.dataStream}
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
