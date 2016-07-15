var React = require('react');
var rd3 = require('rd3');
var DataActions = require('../actions/dataActions');
var LineChart = rd3.LineChart;
var DataStore = require('../stores/dataStore');
var FastFlux = require('../util/fast-flux-react/fastFlux');

var DataExpTool = React.createClass({
  getInitialState: function () {
    return { surveyQuestions: [] };
  },

  _onChange: function () {
    this.setState({ surveyQuestions: DataStore.getSurveyQuestions() });
  },

  componentDidMount: function () {
    this.dataToken = DataStore.addListener(this._onChange);

    DataActions.retrieveSurveyQuestions();
  },

  componentWillUnmount: function () {
    this.dataToken.remove();
  },

  clickPlot: function (question) {
    params = { questionId: question.id };
    DataActions.retrievedData(question);
  },

  makePlotButtons: function () {
    var _this = this;
    return this.state.surveyQuestions.map(function (question, idx) {
      return (
        <button
          key={idx}
          className="ui green button"
          onClick={_this.clickPlot.bind(null, question)}
        >
          plot {question.prompt}
        </button>
      );
    });
  },

  render: function () {

    return (
      <div>
        {this.makePlotButtons()}
        <LineChart
          legend={true}
          data={DataStore.getSeriesData()}
          width='100%'
          height={400}
          viewBoxObject={{
            x: 0,
            y: 0,
            width: 500,
            height: 400,
          }}
          yAxisLabel="Altitude"
          xAxisLabel="Date"
          domain={{x: [, 6], y: [-10, ]}}
          gridHorizontal={true}
        />
      </div>
    );},

});

module.exports = DataExpTool;
