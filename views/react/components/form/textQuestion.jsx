var React = require('react');

// not working look into react custom link state mixins
var TextQuestion = React.createClass({

  render: function () {
    return (
      <div className="required field">
        <label>{this.props.label}</label>
        <input type="text" name={this.props.name} placeholder={this.props.placeholder}></input>
      </div>
    );
  },

});

module.exports = TextQuestion;
