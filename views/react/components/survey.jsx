var React = require('react');

// components
var Navbar = require('./navbar');
var TextQuestion = require('./form/textQuestion');
var MultipleChoice = require('./form/multipleChoice');

var Survey = React.createClass({

  render: function () {
    return (
      <div className="ui container">
        <Navbar />
        <form className="ui form">

          <h2 className="ui header">Food</h2>
          <TextQuestion
            label="What did you eat for breakfast?"
            name="breakfast"
            placeholder="breakfast"
          />

          <TextQuestion
            label="What did you eat for lunch?"
            name="lunch"
            placeholder="lunch"
          />

          <TextQuestion
            label="What did you eat for dinner?"
            name="dinner"
            placeholder="dinner"
          />

          <TextQuestion
            label="What did you eat for snacks?"
            name="snacks"
            placeholder="snacks"
          />

          <h2 className="ui header">Exercise</h2>
          <TextQuestion
            label="How many minutes did you exercise?"
            name="exercise-minutes"
            placeholder="minutes"
          />

          <MultipleChoice
            label="How hard was your exercise"
            checkBoxes={ ['easy', 'medium', 'hard'] }
          />

        <h2 className="ui header">Etc</h2>

        </form>
      </div>
    );
  },

});

module.exports = Survey;
