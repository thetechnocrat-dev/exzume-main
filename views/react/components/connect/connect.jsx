var React = require('react');

var features = [
  { name: 'productivity',
    dataStreams: ['exzume manual', 'rescue time'],
  },
  { name: 'caffeine consumption',
    dataStreams: ['exzume manual', 'vessyl'],
  },
  { name: 'satisfaction',
    dataStreams: ['exzume manual'],
  },
  { name: 'steps',
    dataStreams: ['fitbit', 'garmin', 'iPhone', 'moves'],
  },
  { name: 'productivity',
    dataStreams: ['exzume manual', 'rescue time'],
  },
  { name: 'caffeine consumption',
    dataStreams: ['exzume manual', 'vessyl'],
  },
  { name: 'satisfaction',
    dataStreams: ['exzume manual'],
  },
  { name: 'steps',
    dataStreams: ['fitbit', 'garmin', 'iPhone', 'moves'],
  },
];

var Connect = React.createClass({
  getInitialState: function () {
    return { features: features };
  },

  makeFeatures: function () {
    return this.features.map(function (feature, idx) {
      return (
        <featurePanel key={idx} name={feature.name} dataStreams={feature.dataStreams} />
      );
    });
  },

  render: function () {
    return (
      <div className="ui doubling four column grid container">
        <div class="column"></div>
        <div class="column"></div>
        <div class="column"></div>
        <div class="column"></div>
      </div>
    );
  },

});

module.exports = Connect;
