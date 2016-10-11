var React = require('react');

var ClosableMessage = React.createClass({
  propTypes: {
    message: React.PropTypes.string.isRequired,
  },

  getInitialState: function () {
    return { isOpen: true };
  },

  clickClose: function () {
    this.setState({ isOpen: false });
  },

  render: function () {
    if (this.state.isOpen) {
      return (
        <div className="ui info message">
          <i className="close icon" onClick={this.clickClose} />
          {this.props.message}
        </div>
      );
    } else {
      return <div/>;
    }
  },

});

module.exports = ClosableMessage;

