var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;
var SessionStore = require('../../stores/sessionStore');

// components
var TextForm = require('./textForm');
var ButtonAction = require('./buttonAction');
var UrlTester = require('./urlTester');

var Admin = React.createClass({
  mixins: [LinkedStateMixin, History],

  clickHome: function () {
    this.history.push('/');
  },

  componentWillMount: function () {
    // makes sure only a signed in admin can access
    if (SessionStore.isSignedIn()) {
      if (!SessionStore.currentUser().local.isAdmin) {
        this.history.push('/');
      }
    } else {
      this.history.push('/');
    }
  },

  render: function () {
    var containerStyle = { margin: '10%' };

    return (
      <div className="ui container" style={containerStyle}>
        <TextForm
          header="Add feature to database"
          labels={ ['name'] }
          submitUrl="/admin/features/create"
          method="post"
        />

        <div className="ui horizontal divider">or</div>

        <TextForm
          header="Add category to feature"
          labels={ ['category'] }
          submitUrl="/admin/features/"
          method="put"
          paramLabel="feature id"
        />

        <div className="ui horizontal divider">or</div>

        <TextForm
          header="Add data stream to feature"
          labels={ ['dataStream'] }
          submitUrl="/admin/features/"
          method="put"
          paramLabel="feature id"
        />

        <div className="ui horizontal divider">or</div>

        <ButtonAction
          label="Seed DB"
          method="get"
          submitUrl="/admin/db/seed"
        />

        <div className="ui horizontal divider">or</div>

        <ButtonAction
          label="Email Test"
          method="get"
          submitUrl="/admin/testemail"
        />

        <div className="ui horizontal divider">or</div>

        <div className="ui green button" onClick={this.clickHome}>Go Home</div>
      </div>
    );
  },

});

module.exports = Admin;

