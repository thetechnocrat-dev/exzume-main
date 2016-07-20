var React = require('react');

// components
var AgreementScale = require('../form/agreementScale');
var TextQuestion = require('../form/textQuestion');

var SurveyPanel = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  makeSurveyQuestions: function () {
    var questions = this.props.user.datastreams.survey.features;

    return questions.map(function (question, idx) {
      if (question.format === 'textQuestion') {
        return (
          <div className="column" key={idx}>
            <TextQuestion prompt={question.prompt} />
          </div>
        );
      } else if (question.format === 'agreementScale') {
        return (
          <div className="column" key={idx}>
            <AgreementScale featureName={question.name} prompt={question.prompt} />
          </div>
        );
      }
    });
  },

  render: function () {
    return (
      <div className="ui doubling four column grid container">
        {this.makeSurveyQuestions()}
      </div>
    );
  },

});

module.exports = SurveyPanel;
