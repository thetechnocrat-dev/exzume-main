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
    return {
      features: FeatureStore.features(),
    };
  },

  _onChange: function () {
    this.setState({
      features: FeatureStore.features(),
    });
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

  userActiveStreams: function () {
    var dataStreams = this.props.user.datastreams;
    var userActiveStreams = [];
    for (key in dataStreams) {
      if (dataStreams[key].isConnected) {
        userActiveStreams.push(key);
      }
    }

    return userActiveStreams;
  },

  userActiveFeatures: function () {
    var userActiveFeatures = {};
    dataStreams = this.props.user.datastreams;

    for (dataStream in dataStreams) {
      for (var i = 0; i < dataStreams[dataStream].features.length; i++) {
        var userFeature = dataStreams[dataStream].features[i];
        if (userActiveFeatures[userFeature.name]) {
          userActiveFeatures[userFeature.name].push(dataStream);
        } else {
          userActiveFeatures[userFeature.name] = [dataStream];
        }
      }
    }

    return userActiveFeatures;
  },

  categorizeStreams: function (feature, userActiveStreams, userActiveFeatures) {
    var activeStreams = [];
    var connectedStreams = [];
    var availableStreams = [];
    for (var i = 0; i < feature.dataStreams.length; i++) {
      if (userActiveFeatures[feature.name] && userActiveFeatures[feature.name].includes(feature.dataStreams[i])) {
        activeStreams.push(feature.dataStreams[i]);
      } else if (userActiveStreams.includes(feature.dataStreams[i])) {
        connectedStreams.push(feature.dataStreams[i]);
      } else
        availableStreams.push(feature.dataStreams[i]);
    }

    return {
      activeStreams: activeStreams,
      connectedStreams: connectedStreams,
      availableStreams: availableStreams,
    };

  },

  makeFeatures: function () {
    var userActiveFeatures = this.userActiveFeatures();
    var userActiveStreams = this.userActiveStreams();
    var _this = this;
    return this.state.features.map(function (feature, idx) {
      var categorizedStreams = _this.categorizeStreams(
        feature, userActiveStreams, userActiveFeatures
      );
      return (
        <FeatureItem
          key={idx}
          feature={feature}
          activeStreams={categorizedStreams.activeStreams}
          connectedStreams={categorizedStreams.connectedStreams}
          availableStreams={categorizedStreams.availableStreams}
        />
      );
    });
  },

  render: function () {
    return (
      <div className="ui doubling four column grid container">
        {this.makeFeatures()}
      </div>
    );
  },

});

module.exports = FeaturePanel;
