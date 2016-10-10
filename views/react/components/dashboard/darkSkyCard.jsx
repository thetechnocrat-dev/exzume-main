var React = require('react');
var moment = require('moment');

var DarkSkyCard = React.createClass({
  propTypes: {
    darksky: React.PropTypes.object.isRequired,
  },

  makeWeatherData: function () {
    var darksky = this.props.darksky;
    var today = moment().format('YYYY-MM-DD');
    var featureLength = darksky.features[0].data.length;
    var dailySummaryToday;
    var minTempToday;
    var maxTempToday;

    for (var i = 0; i < featureLength; i++) {
      if (moment(darksky.features[0].data[i].dateTime * 1000).format('YYYY-MM-DD') == today) {
        dailySummaryToday = darksky.features[0].data[i].value;
        minTempToday = (darksky.features[3].data[i].value).toFixed(1);
        maxTempToday = (darksky.features[4].data[i].value).toFixed(1);
        break;
      } else if (i == featureLength - 1) {
        dailySummaryToday = 'Re-sync to get latest weather';
        minTempToday = '-';
        maxTempToday = '-';
      }
    }

    return (
      <div className="description" style={{ textAlign: 'center' }}>
        <div className="ui mini horizontal statistics">
          <div className="ui statistic" style={{ margin: 'auto', paddingBottom: '1%' }}>
            <div className="value">
              {minTempToday} / {maxTempToday}
            </div>
            <div className="label">
              °F
            </div>
          </div>
        </div>
          {dailySummaryToday}
        <br />
      </div>
    );
  },

  render: function () {
    var darksky = this.props.darksky;
    var lastSyncTime = moment(darksky.lastSyncTime).fromNow();

    return (
      <div className="ui fluid card">
        <div className="content">
          <div className="header" style={{ marginBottom: '2%' }}>
            Weather
          </div>
          {this.makeWeatherData()}
        </div>
        <div className="extra content">
          <div className="left floated time">
            last synced: {lastSyncTime}
          </div>
          <div className="right floated author">
            <i className="exchange icon"></i>
            DarkSky
          </div>
        </div>
      </div>
    );
  },

});

module.exports = DarkSkyCard;
