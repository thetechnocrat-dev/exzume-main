var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var moment = require('moment');

var ratingButtons = [
  {
    color: 'red',
    value: 1,
  },
  {
    color: 'orange',
    value: 2,
  },
  {
    color: 'yellow',
    value: 3,
  },
  {
    color: 'olive',
    value: 4,
  },
  {
    color: 'green',
    value: 5,
  },
  {
    color: 'teal',
    value: 6,
  },
  {
    color: 'purple',
    value: 7,
  },
];

var MoodCard = React.createClass({
  mixins: [LinkedStateMixin],

  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  getInitialState: function () {
    console.log(this.props.user);
    var moodFeatures = this.props.user.datastreams.mood.features;
    var lastUpdatedTime = null;
    var lastRating = null;
    var lastNote = '';
    var enlarge = null;
    var submitClicked = false;
    var momentLastUpdatedTime = null;

    if (moodFeatures.length != 0) {
      var ratingData = moodFeatures[0].data;
      var noteData = moodFeatures[1].data;

      lastUpdatedTime = ratingData[ratingData.length - 1].dateTime;
      lastRating = ratingData[ratingData.length - 1].value;
      lastNote = noteData[noteData.length - 1].value;
      submitClicked = true;

      // console.log(typeof lastUpdatedTime);
      // console.log(lastUpdatedTime);
      // console.log(lastRating);
      // console.log(lastNote);
      // console.log(typeof Date.now());
      // console.log(moment(parseInt(lastUpdatedTime)).utc().format('YYYY-MM-DD'));
      // console.log(moment(Date.now()).utc().format('YYYY-MM-DD'));

      for (i in ratingButtons) {
        if (ratingButtons[i].value == lastRating) {
          enlarge = ratingButtons[i].color;
        }
      }

      if (moment(parseInt(lastUpdatedTime)).utc().format('YYYY-MM-DD')
          != moment(Date.now()).utc().format('YYYY-MM-DD')) {
        lastUpdatedTime = null;
        lastRating = null;
        lastNote = null;
        enlarge = null;
        submitClicked = false;
      }
    };

    console.log(lastUpdatedTime);
    console.log(lastRating);
    console.log(lastNote);
    console.log(enlarge);

    return {
      error: null,
      rating: lastRating,
      enlarge: enlarge,
      note: lastNote,
      loading: false,
      lastUpdatedTime: lastUpdatedTime,
      submitClicked: submitClicked,
    };
  },

  handleEditClick: function () {
    this.setState({
      submitClicked: !this.state.submitClicked,
    });
  },

  handleSubmitClick: function (event) {
    event.preventDefault();

    if (this.state.rating || this.state.note != '') {
      var moodBody = {
        dateTime: Date.now(),
        moodRating: this.state.rating,
        moodNote: this.state.note,
      };

      this.setState({
        loading: true,
        lastUpdatedTime: Date.now(),
        submitClicked: !this.state.submitClicked,
      });
      FastFlux.webCycle('post', '/auth/mood', {
        body: moodBody,
        success: this.successCallback,
        // error: this.errorCallback,
        shouldStoreReceive: true,
        storeActionType: 'SESSION_RECEIVED',
      });
    } else {
      this.setState.error = 'nothing to submit';
      console.log('error');
    }

  },

  successCallback: function () {
    console.log('success');
    this.setState({ loading: false });
  },

  // errorCallback: function (error) {
  //   this.setState({ loading: false, error: error.responseText });
  // },
  onRatingChange: function (button) {
    this.setState({ rating: button.value, enlarge: button.color });
  },

  makeRatingButtons: function () {
    var _this = this;

    return ratingButtons.map(function (ratingButton, idx) {
      if (_this.state.enlarge == ratingButton.color) {
        return (
          <a
            className={'ui big ' + ratingButton.color +  ' label'}
            onClick={_this.onRatingChange.bind(_this, ratingButton)}
          >
            {ratingButton.value}
          </a>
        );
      } else {
        return (
          <a
            className={'ui large ' + ratingButton.color +  ' label'}
            onClick={_this.onRatingChange.bind(_this, ratingButton)}
          >
            {ratingButton.value}
          </a>
        );
      }

    });

  },

  makeForm: function () {
    if (!this.state.submitClicked) {
      return (
        <div className="field">
          <label>Notes about my day:</label>
          <textarea rows="3" valueLink={this.linkState('note')}></textarea>
        </div>
      );
    } else {
      return (
        <div className="disabled field">
          <label>Notes about my day:</label>
          <textarea rows="3" valueLink={this.linkState('note')}></textarea>
        </div>
      );
    }
  },

  addLastUpdatedTime: function () {
    var timeStyle = {
      float: 'left',
      margin: '-2% 0% 2% 0%',
    };

    if (this.state.lastUpdatedTime) {
      return (
        <div className="meta" style={timeStyle}>
          last updated: {moment(parseInt(this.state.lastUpdatedTime)).utc().fromNow()}
        </div>
      );
    }
  },

  // make submit or edit button
  makeButton: function () {
    if (this.state.loading) {
      return (
        <button
          className="ui right floated green disabled loading button"
          type="submit"
        >
          Submit
        </button>
      );
    } else {
      if (this.state.submitClicked) {
        return (
          <button
            className="ui right floated icon button"
            onClick={this.handleEditClick}
          >
            <i className="edit icon" />
          </button>
        );
      } else {
        return (
          <button
            className="ui right floated green button"
            type="submit"
            onClick={this.handleSubmitClick}
          >
            Submit
          </button>
        );
      }
    }
  },

  render: function () {
    return (
      <div className="ui card">
        <div className="content">
          <div className="header" style={{ marginBottom: '2%' }}>
            Mood
          </div>
          <div className="meta" style={{ marginBottom: '2%' }}>
            <span>
              How satisfied were you with how you did today?
            </span>
          </div>
          <div>
            {this.makeRatingButtons()}
          </div>
        </div>
        <form className="ui form" style={{ margin: '2% 3% 2% 3%' }}>
          {this.makeForm()}
          {this.addLastUpdatedTime()}
          {this.makeButton()}
        </form>
      </div>
    );
  },

});

module.exports = MoodCard;
