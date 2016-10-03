var React = require('react');
var Style = require('../../util/style');

// Components
var HorzBarViz = require('./horzBarViz.js');

var FitbitCard = React.createClass({
  propTypes: {
    currentSteps: React.PropTypes.number.isRequired,
    avgSteps: React.PropTypes.number.isRequired,
    currentActiveMinutes: React.PropTypes.number.isRequired,
    avgActiveMinutes: React.PropTypes.number.isRequired,
    currentFloors: React.PropTypes.number.isRequired,
    avgFloors: React.PropTypes.number.isRequired,
  },

  render: function () {
    return (
      <div className="ui fluid card">
        <div className="content">
          <div className="header" style={{ marginBottom: '2%' }}>
            Fitness
          </div>
          <HorzBarViz
            label={'steps'}
            avg={this.props.avgSteps}
            current={this.props.currentSteps}
            fillColor={Style.green}
            backgroundColor={Style.lightGreen}
          />
          <HorzBarViz
            label={'active minutes'}
            avg={this.props.avgActiveMinutes}
            current={this.props.currentActiveMinutes}
            fillColor={Style.green}
            backgroundColor={Style.lightGreen}
          />
          <HorzBarViz
            label={'floors'}
            avg={this.props.avgFloors}
            current={this.props.currentFloors}
            fillColor={Style.green}
            backgroundColor={Style.lightGreen}
          />
          <HorzBarViz
            label={'exercises this week'}
            avg={this.props.avgExercisesPerWeek}
            current={this.props.exercisesThisWeek}
            fillColor={Style.green}
            backgroundColor={Style.lightGreen}
          />
            
        </div>
      </div>
    );
  },

});

module.exports = FitbitCard;

