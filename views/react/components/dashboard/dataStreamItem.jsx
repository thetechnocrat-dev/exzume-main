var React = require('react');
// var History = require('react-router').History;

var DataStreamItem = React.createClass({
  // mixins: [History],

  render: function () {

    return (
      <div className="column">
        <a className="ui small image" href={this.props.streamDataURL}>
          <img src={this.props.streamImage}/>
        </a>
      </div>
    );
  },

});

module.exports = DataStreamItem;
