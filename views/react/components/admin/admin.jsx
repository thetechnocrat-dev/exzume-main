var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var SessionActions = require('../../actions/sessionActions');
var History = require('react-router').History;

// components
var TextForm = require('./textForm');

var Admin = React.createClass({
  mixins: [LinkedStateMixin, History],

  clickHome: function () {
    this.history.push('/');
  },

  render: function () {
    var containerStyle = { margin: '10%' };

    return (
      <div className="ui container" style={containerStyle}>
        <TextForm
          header="Add form url to User"
          labels={ ['username', 'formUrl'] }
          postUrl="/admin/addform"
          method="put"
        />

        <div className="ui horizontal divider">or</div>

        <TextForm
          header="Add Insight to User (needs updated to match new back end)"
          labels={ ['username', 'insightMessage'] }
          postUrl="/admin/addinsight"
          method="put"
        />

        <div className="ui horizontal divider">or</div>

        <TextForm
          header="Add Visualization to User"
          labels={ ['username', 'visLink'] }
          postUrl="/admin/addvis"
          method="put"
        />

        <div className="ui horizontal divider">or</div>

        <div className="ui green button" onClick={this.clickHome}>Go Home</div>
      </div>
    );
  },

});

module.exports = Admin;
