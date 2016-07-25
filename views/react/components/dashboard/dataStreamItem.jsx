var React = require('react');

var DataStreamItem = React.createClass({
  
  render: function () {
    return (
      <a className="ui small image" href={this.props.streamDataURL}>
        <img src={this.props.streamImage}/>
      </a>
    );
  },

});

module.exports = DataStreamItem;
