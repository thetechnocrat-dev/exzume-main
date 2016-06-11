module.exports = function () {

  if (typeof window.Universe === 'undefined') {
    window.Universe = {};
  }

  var COLOR = '#008080';

  var Star = Universe.Star = function (info) {
    this.constellationRef = info.constellationRef;
    this.pos = info.pos;
    this.connections = info.connections;
    this.radius = info.radius;
  };

  Star.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = COLOR;
    ctx.fill();
  };

};
