  var React = require('react');
  var PropTypes = React.PropTypes;

  var footer = React.createClass({
    render: function() {
      return (
        <div className="ui inverted vertical footer segment">
          <div className="ui container">
            <div className="ui stackable inverted divided equal height stackable grid">
              <div className="three wide column">
                <h4 className="ui inverted header">Company</h4>
                <div className="ui inverted link list">
                  <a href="#" className="item">Privacy Policy</a>
                  <a href="mailto:exzume.app@gmail.com" className="item">Contact Us</a>
                </div>
              </div>
              <div className="three wide column">
                <h4 className="ui inverted header">Services</h4>
                <div className="ui inverted link list">
                  <a href="https://www.myvessyl.com/" className="item">Vessyl Pre-Order</a>
                  <a href="#" className="item">Exzume FAQ</a>
                </div>
              </div>
              <div className="seven wide column">
                <h4 className="ui inverted header">© exzume 2016</h4>
                <p>We could save your life.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

  });

  module.exports = footer;
