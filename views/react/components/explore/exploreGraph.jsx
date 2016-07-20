var React = require('react');
var PropTypes = React.PropTypes;
var GraphStore = require('../../stores/graphStore');

var ExploreGraph = React.createClass({
  getInitialState: function () {
    return { currentFeatures: GraphStore.getCurrentFeatures() };
  },

  _onChange: function () {
    this.setState({ currentFeatures: GraphStore.getCurrentFeatures() });
  },

  componentDidMount: function () {
    this.graphToken = GraphStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.graphToken.remove();
  },

  render: function () {
    return (
      <div>
        tits
        {JSON.stringify(this.state.currentFeatures)}
      </div>
    );
  },

});

module.exports = ExploreGraph;
