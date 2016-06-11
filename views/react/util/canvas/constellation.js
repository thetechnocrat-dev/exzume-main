module.exports = function () {

  if (typeof window.Universe === 'undefined') {
    window.Universe = {};
  }

  var Constellation = Universe.Constellation = function (stars, quote) {
    this.quote = quote;
    this.stars = stars;
  };

  Constellation.prototype.draw = function (ctx) {
    for (var i = 0; i < this.stars.length; i++) {
      this.stars[i].draw(ctx);
    }
  };

  Constellation.prototype.connect = function (ctx) {
    for (var i = 0; i < this.stars.length; i++) {
      var star = this.stars[i];
      for (var j = 0; j < star.connections.length; j++) {
        var otherStar = this.stars[star.connections[j]];
        ctx.beginPath();
        ctx.moveTo(star.pos[0], star.pos[1]);
        ctx.lineTo(otherStar.pos[0], otherStar.pos[1]);
        ctx.strokeStyle = '#008080';
        ctx.stroke();
      }
    }
  };
};
