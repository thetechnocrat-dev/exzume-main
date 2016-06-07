var React = require('react');
var History = require('react-router').History;

// Components
var Navbar = require('./navbar');

var About = React.createClass({
  mixins: [History],

  clickBack: function () {
    this.history.push('/');
  },

  render: function () {
    var centerContainerStyle = { marginTop: '5%' };

    return (
      <div className="ui one column center aligned grid container" style={centerContainerStyle}>
        <div className="ui message">
          <div className="header">
            One Sentence Summary
          </div>
          <p>
            Exzume is a place for users to collect data about their lives and find insight from it.
          </p>
        </div>

        <div className="ui message">
          <div className="header">
            What We are Building
          </div>
          <p>
            Exzume is a web app that combines a user’s data from apps they already use with daily surveys in order to provide personal recommendations and useful visualizations. It is much more useful than the multitude of data-tracking apps (Toggl, AppleHealth, SleepCycle) and wearable fitness trackers (Fitbit, Jawbone, Garmin) because the daily survey results allow for correlation with important subjective metrics such as productivity, happiness, and satisfaction.
          </p>
        </div>

        <div className="ui message">
          <div className="header">
            Why Now
          </div>
          <p>
            Recent advances in machine learning (especially unsupervised learning) are making it possible to find meaningful features of large multidimensional datasets (which is what combining daily surveys with the multiple passive data collection apps requires) at scale. The results of such advances in data collection and machine learning are increasingly present in our lives, from our Google search results, to our Facebook feeds, to our Netflix recommendations. However, there is a large space for using this technology to help individuals use their own data to proactively improve their decisions. In addition to the large number of data-tracking apps and wearable devices, the growing QuantifiedSelf movement shows that people are taking an interest in their own data.
          </p>
        </div>

        <div className="ui message">
          <div className="header">
            Why People Would Want This
          </div>
          <p>
            Worldwide sales of wearable electronic devices are expected to generate $28.7 billion in revenue this year, and Americans consistently spend an average of over $10 billion on self-improvement books per year. Exzume aims to provide the benefits of both in one package.
          </p>
        </div>
        <div className="ui button" onClick={this.clickBack}>Back</div>
      </div>
    );
  },

});

module.exports = About;
