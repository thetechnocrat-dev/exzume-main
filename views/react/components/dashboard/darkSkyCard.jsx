var React = require('react');
var moment = require('moment');

var DarkSkyCard = React.createClass({
  propTypes: {
    darksky: React.PropTypes.object.isRequired,
  },

  makeWeatherData: function () {
    var darksky = this.props.darksky;
    var minTemp = (darksky.features[3].data[0].value).toFixed(1);
    var maxTemp = (darksky.features[4].data[0].value).toFixed(1);
    var dailySummary = darksky.features[0].data[0].value;

    return (
      <div className="description" style={{ textAlign: 'center' }}>
        <div className="ui mini horizontal statistics">
          <div className="ui statistic" style={{ margin: 'auto', paddingBottom: '1%' }}>
            <div className="value">
              {minTemp} / {maxTemp}
            </div>
            <div className="label">
              °F
            </div>
          </div>
        </div>
          {dailySummary}
        <br />
      </div>
    );
  },

  render: function () {
    return (
      <div className="ui fluid card">
        <div className="content">
          <div className="header" style={{ marginBottom: '2%' }}>
            Weather
          </div>
          {this.makeWeatherData()}
        </div>
        <div className="extra content">
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