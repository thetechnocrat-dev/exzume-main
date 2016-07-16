var React = require('react');
var History = require('react-router').History;

var DataStreamItem = React.createClass({
  mixins: [History],

  clickIconButton: function () {
    this.history.push('/formdetail');
  },

  render: function () {
    var iconClassName = 'large ' + this.props.icon + ' icon';
    return (
      <div className="column">
        <button className="ui labeled basic icon button" onClick={this.clickIconButton}>
          <i className={iconClassName}></i>
          {this.props.label}
        </button>
      </div>
    );
  },

});

module.exports = DataStreamItem;
