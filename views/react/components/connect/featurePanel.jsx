var React = require('react');
var FeatureStore = require('../../stores/featureStore');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

// components
var FeatureItem = require('./featureItem');

var FeaturePanel = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
  },

  getInitialState: function () {
    return { features: FeatureStore.features(), userFeatures: this.userFeatures() };
  },

  _onChange: function () {
    this.setState({ features: FeatureStore.features(), userFeatures: this.userFeatures() });
  },

  componentDidMount: function () {
    this.featureToken = FeatureStore.addListener(this._onChange);
    FastFlux.webCycle('get', '/features', {
      shouldStoreReceive: true,
      storeActionType: 'FEATURES_RECEIVED',
    });
  },

  componentWillUnmount: function () {
    this.featureToken.remove();
  },

  userFeatures: function () {
    var dataStreams = this.props.user.datastreams;
    var userFeatures = [];
    for (var key in dataStreams) {
      var features = dataStreams[key].features;
      for (var j = 0; j < features.length; j++) {
        userFeatures.push(features[j].name);
      }
    }

    return userFeatures;
  },

  userActiveStreams: function () {
    var userActiveStreams = {};
    dataStreams = this.props.user.datastreams;

    for (dataStream in dataStreams) {
      for (var i = 0; i < dataStreams[dataStream].features.length; i++) {
        var userFeature = dataStreams[dataStream].features[i];
        if (userActiveStreams[userFeature.name]) {
          userActiveStreams[userFeature.name].push(dataStream);
        } else {
          userActiveStreams[userFeature.name] = [dataStream];
        }
      }
    }

    return userActiveStreams;
  },

  makeFeatures: function () {
    var _this = this;
    return this.state.features.map(function (feature, idx) {

      // if user already has feature pass in additional prop for render changes
      if (_this.state.userFeatures.includes(feature.name)) {
        return (
          <FeatureItem
            key={idx}
            feature={feature}
            dataStreams={feature.dataStreams}
            userActiveStream={feature.name}
          />
        );
      } else {
        return (
          <FeatureItem
            key={idx}
            name={feature.name}
            dataStreams={feature.dataStreams}
          />
        );
      }
    });
  },

  makeUsersFeatures: function () {
    var userFeatures = this.state.userFeatures;
    return userFeatures.map(function (feature, idx) {
      return <div key={idx} feature={feature}>{feature}</div>;
    });
  },

  render: function () {
    this.userActiveStreams();
    return (
      <div>
        <h3 className="ui header">Your Features</h3>
        {this.makeUsersFeatures()}
        <h3 className="ui header">Track a Feature</h3>
        <div className="ui doubling four column grid container">
          {this.makeFeatures()}
        </div>
      </div>
    );
  },

});

module.exports = FeaturePanel;
