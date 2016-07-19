var React = require('react');

var AddDataStreamItem = React.createClass({
  propTypes: {
    dataStream: React.PropTypes.string.isRequired,
  },

  render: function () {
    return (
      <a href={'/auth/datastreams/' + this.props.dataStream}>{this.props.dataStream}</a>
    );
  },

});

module.exports = AddDataStreamItem;
