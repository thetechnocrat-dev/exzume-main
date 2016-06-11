var React = require('react');
var CanvasView = require('../util/canvas/view');
var Constellation = require('../util/canvas/constellation');
var Star = require('../util/canvas/star');
var WebFont = require('webfontloader');

var CanvasBackground = React.createClass({

  getInitialState: function () {
    return {
      windowWidth: window.innerWidth, windowHeight: window.innerHeight,
      universe: null,
    };
  },

  handleResize: function (event) {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    this.newCanvas();
  },

  componentDidMount: function () {
    this.startCanvas();
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this.handleResize);
  },

  startCanvas: function () {
    var canvas = document.getElementById('constellation-canvas');
    Constellation();
    Star();
    CanvasView();
    var view = new Universe.View(canvas, this.state.windowWidth, this.state.windowHeight);
    view.start(); // initialize new canvas
    this.setState({
      universe: view,
    });
  },

  newCanvas: function () {
    var canvas = document.getElementById('constellation-canvas');
    this.state.universe.end(); // removes listner from previous universe
    var view = new Universe.View(canvas, this.state.windowWidth, this.state.windowHeight);
    view.start(); // initialize new canvas
    this.setState({
      universe: view,
    });
  },

  render: function () {
    console.log('canvas');
    return (
      <canvas id="constellation-canvas" />
    );
  },

});

module.exports = CanvasBackground;
