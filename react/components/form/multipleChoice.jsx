var React = require('react');

var MultipleChoice = React.createClass({
  makeChoices: function () {
    for (var checkBox of this.props.checkBoxes) {
      console.log(checkBox);
    }
  },

  render: function () {
    return (
      <div>
        checkboxes
        {this.makeChoices()}
      </div>
    );
  },

});

module.exports = MultipleChoice;
