var React = require('react');
var Modal = require('react-modal');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

// Components

var ABModal = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return ({
      seriesLabel1: '',
      startDate1: '',
      endDate1: '',
      seriesLabel2: '',
      startDate2: '',
      endDate2: '',
    });
  },

  propTypes: {
    features: React.PropTypes.array.isRequired,
  },

  getInitialState: function () {
    return { modalIsOpen: false };
  },

  openModal: function () {
    this.setState({ modalIsOpen: true });
  },

  closeModal: function () {
    this.setState({ modalIsOpen: false });
  },

  withinDateBounds: function (date, startDate, endDate) {
    return new Date(startDate) <= new Date(date) && new Date(endDate) >= new Date(date);
  },

  calcBucketAvgs: function (feature) {
    var bucket1 = [];
    var bucket2 = [];
    var bucket1Sum = 0;
    var bucket2Sum = 0;

    for (var i = 0; i < feature.data.length; i++) {
      if (this.withinDateBounds(
                                feature.data[i].dateTime,
                                this.state.startDate1,
                                this.state.endDate1)) {
        bucket1.push(parseFloat(feature.data[i].value));
        bucket1Sum += parseFloat(feature.data[i].value);
      } else if (this.withinDateBounds(
                                  feature.data[i].dateTime,
                                  this.state.startDate2,
                                  this.state.endDate2)) {
        bucket2.push(parseFloat(feature.data[i].valuae));
        bucket2Sum += parseFloat(feature.data[i].value);
      }
    }

    console.log(bucket1);
    console.log(bucket2);

    var bucket1Avg = bucket1Sum / bucket1.length;
    var bucket2Avg = bucket2Sum / bucket2.length;

    return [
      { x: feature.name, y: bucket1Avg },
      { x: feature.name, y: bucket2Avg },
    ];
  },

  makeGroupedBarData: function () {
    var groupedBarData = [];
    var series1 = {};
    var series2 = {};
    series1.name = this.state.seriesLabel1;
    series2.name = this.state.seriesLabel2;
    series1.values = [];
    series2.values = [];
    (groupedBarData.push(series1, series2));

    for (var i = 0; i < this.props.features.length; i++) {
      // returns [featureSeriesA Avg obj, featureSeriesB Avg obj]
      var bucketAvgs = this.calcBucketAvgs(this.props.features[i]);
      series1.values.push(bucketAvgs[0]);
      series2.values.push(bucketAvgs[1]);
    }

    return groupedBarData;
  },

  handleSubmit: function () {
    this.setState({ modalIsOpen: false });
    console.log(this.state);
    var groupedBarData = this.makeGroupedBarData();
    var groupedBarData1 = [
          {
             "name": "Less than or equal to 400 minutes asleep",
                    "values": [
                            { "x": '# of Awakenings', "y":  7},
                                  { "x": 'Sleep Efficiency', "y": 97},
                                        { "x": 'Heart Rate', "y": 55},
                                        { "x": 'Very Active Hours', "y": 7.13},
                                        { "x": 'Steps (thousands)', "y": 8.457},
                                            ]
                                                },
            {  
              "name": "More than 400 minutes asleep",
                      "values": [
                            { "x": '# of Awakenings', "y":  10},
                                  { "x": 'Sleep Efficiency', "y": 95},
                                        { "x": 'Heart Rate', "y": 53},
                                        { "x": 'Very Active Hours', "y": 7.75},
                                        { "x": 'Steps (thousands)', "y": 8.592},
                                              ]
                                                  },
      ];
    FastFlux.cycle('GROUPED_BAR_DATA_RECEIVED', groupedBarData);
  },

  makeOptions: function () {
    console.log(this.props.features);
    return this.props.features.map(function (feature, idx) {
      return (
        <option value={feature.name} key={idx}>{feature.name}</option>
      );
    });
  },

  render: function () {
    var buttonStyle = { marginLeft: '10px' };
    var customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '500px',
      },
    };

    return (
      <div style={{ display: 'inline-block' }}>
        <button
          className="ui green button"
          onClick={this.openModal}
          style={buttonStyle}
        >
          A/B Compare
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <div
            className="ui icon button"
            onClick={this.closeModal}
            style={{ marginLeft: '419px' }}
          >
            <i className="remove icon" />
          </div>
          <form className="ui form">
            <div className="ui field">
              <h4 className="ui dividing header">Series A</h4>
              <div className="field">
                <input
                  type="text"
                  name="seriesLabel1"
                  placeholder="series label"
                  valueLink={this.linkState('seriesLabel1')}
                />
              </div>
              <div className="field">
                <input
                  type="text"
                  name="startDate1"
                  placeholder="start date"
                  valueLink={this.linkState('startDate1')}
                />
              </div>
              <div className="field">
                <input
                  type="text"
                  name="endDate1"
                  placeholder="end date"
                  valueLink={this.linkState('endDate1')}
                />
              </div>
              <h4 className="ui dividing header">Series B</h4>
              <div className="field">
                <input
                  type="text"
                  name="seriesLabel2"
                  placeholder="series label"
                  valueLink={this.linkState('seriesLabel2')}
                />
              </div>
              <div className="field">
                <input
                  type="text"
                  name="startDate2"
                  placeholder="start date"
                  valueLink={this.linkState('startDate2')}
                />
              </div>
              <div className="field">
                <input
                  type="text"
                  name="endDate2"
                  placeholder="end date"
                  valueLink={this.linkState('endDate2')}
                />
              </div>
            </div>

            <button className="ui green button" onClick={this.handleSubmit}>A/B Compare</button>
          </form>
        </Modal>
      </div>
    );
  },

});

module.exports = ABModal;

