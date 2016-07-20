var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;

// components
var TextForm = require('./textForm');
var ButtonAction = require('./ButtonAction');

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
          submitUrl="/admin/addform"
          method="put"
        />

        <div className="ui horizontal divider">or</div>

        <TextForm
          header="Add Insight to User (needs updated to match new back end)"
          labels={ ['username', 'insightMessage'] }
          submitUrl="/admin/addinsight"
          method="put"
        />

        <div className="ui horizontal divider">or</div>

        <TextForm
          header="Add Visualization to User"
          labels={ ['username', 'visLink'] }
          submitUrl="/admin/addvis"
          method="put"
        />

        <div className="ui horizontal divider">or</div>

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

        <div className="ui green button" onClick={this.clickHome}>Go Home</div>
      </div>
    );
  },

});

module.exports = Admin;
