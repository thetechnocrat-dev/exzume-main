var React = require('react');

// components
var AgreementScale = require('../form/agreementScale');
var TextQuestion = require('../form/textQuestion');

var SurveyPanel = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  makeSurveyQuestions: function () {
    var surveyFeatures = this.props.user.datastreams.survey.features;

    return surveyFeatures.map(function (surveyFeature, idx) {
      if (surveyFeature.format === 'textQuestion') {
        return (
          <div className="column" key={idx}>
            <TextQuestion prompt={surveyFeature.prompt} />
          </div>
        );
      } else if (surveyFeature.format === 'agreementScale') {
        return (
          <div className="column" key={idx}>
            <AgreementScale surveyFeature={surveyFeature} />
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
