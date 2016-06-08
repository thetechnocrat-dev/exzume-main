var React = require('react');

var MultipleChoice = React.createClass({
  makeChoices: function () {
    var checkBoxes = [];
    for (var checkBox of this.props.checkBoxes) {
      checkBoxes.push(
        <div className="field">
          <div className="ui radio checkbox">
            <input type="radio" name={checkBox} key={checkBox} />
            <label>{checkBox}</label>
          </div>
        </div>
      );
    }

    return checkBoxes;
  },

  render: function () {
    return (
      <div className="required grouped fields">
        <label>{this.props.label}</label>
        {this.makeChoices()}
      </div>
    );
  },

});

module.exports = MultipleChoice;
