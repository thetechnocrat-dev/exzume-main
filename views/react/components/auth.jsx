var React = require('react');

// Components
var Navbar = require('./partials/navbar');
var Footer = require('./partials/footer');

var Auth = React.createClass({

  render: function () {

    return (
      <div>
        <Navbar />
        <div className="ui container">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  },
});

module.exports = Auth;
