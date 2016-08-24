var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;

// components
var TextForm = require('./textForm');
var ButtonAction = require('./buttonAction');

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

        <ButtonAction
          label="Email Test"
          method="get"
          submitUrl="/admin/testemail"
        />

        <div className="ui horizontal divider">or</div>

        <a href={'https://www.rescuetime.com/oauth/authorize/?response_type=code&redirect_uri=https%3A%2F%2Fwww.exzume.com%2Fauth%2Fdatastreams%2Frescuetime%2Fcallback&scope=time_data%20category_data%20productivity_data&client_id=2900e583f575ac611f1ffd83827ee0995f5b462f159fe42288f12e847e6b430a'} >
          <button className="ui labeled mini icon button">
            <i className="plus icon"></i>
            rescut time test
          </button>
        </a>

        <div className="ui horizontal divider">or</div>

        <a href={'https://www.rescuetime.com/api/oauth/overview_data?access_token=74fcc1d3c631b51f9bb1fe8e312e72ea79ee145ee6481525ef92bb6880f6894d'} >
          <button className="ui labeled mini icon button">
            <i className="plus icon"></i>
            rescut json test 
          </button>
        </a>

        <div className="ui horizontal divider">or</div>

        <div className="ui green button" onClick={this.clickHome}>Go Home</div>
      </div>
    );
  },

});

module.exports = Admin;
