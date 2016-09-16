var React = require('react');
var PropTypes = React.PropTypes;

var MoodCard = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  render: function () {
    return (
      <div className="ui card">
        <div className="content">
          <div className="header" style={{ marginBottom: '2%' }}>
            Mood
          </div>
          <div className="meta" style={{ marginBottom: '2%' }}>
            <span className="date">
              How satisfied were you with how you did today?
            </span>
          </div>
          <div>
            <a className="ui large red label">1</a>
            <a className="ui large orange label">2</a>
            <a className="ui large yellow label">3</a>
            <a className="ui large olive label">4</a>
            <a className="ui large green label">5</a>
            <a className="ui large teal label">6</a>
            <a className="ui large purple label">7</a>
          </div>
        </div>
        <form className="ui form" style={{ margin: '2% 3% 2% 3%' }}>
          <div className="field">
            <label>Notes about my day:</label>
            <textarea rows="3"></textarea>
          </div>
          <button className="ui green button" type="submit" style={{ float: 'right' }}>Submit</button>
        </form>
      </div>
    );
  },

});

module.exports = MoodCard;
