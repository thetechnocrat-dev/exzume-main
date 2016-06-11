module.exports = function () {

  if (typeof window.Universe === 'undefined') {
    window.Universe = {};
  }

  var View = Universe.View = function (canvas, width, height) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.largeFontSize = (this.width / 20).toString() + 'px';
    this.smallFontSize = (parseInt(this.largeFontSize) / 3).toString() + 'px';
    this.starRadius = 0.003 * width;
    this.quote = 'Hover your cursor over white dots to find constellations and wisdom';
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    this.ctx = ctx;
    this.constellations = this.addConstellations();
    this.addConstellationListener();
  };

  View.prototype.addConstellationListener = function (e) {
    this.callBack = function (e) {
      var mousePos = this.getMousePos(this.canvas, e);

      // loops through every star, could add a break once a star is found
      for (var i = 0; i < _this.constellations.length; i++) {
        var constellation = _this.constellations[i];
        for (var j = 0; j < constellation.stars.length; j++) {
          var star = constellation.stars[j];
          if (_this.isMouseOnStar(mousePos, star.pos)) {
            _this.animate(i);

            // break out of loops
            j = constellation.stars.length;
            i = _this.constellations.length;
          }
        }
      }

    };

    var _this = this;
    this.canvas.addEventListener('mousemove', this.callBack.bind(_this));
  };

  View.prototype.start = function () {
    // written as bind incase I want to use animate recusively later
    requestAnimationFrame(this.animate.bind(this));
  };

  View.prototype.end = function () {
    this.constellations = []; // removes ghost constellations kinda hacky
    this.canvas.removeEventListener('mousemove', this.callBack);
  };

  View.prototype.animate = function (selectedConstellation) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // draw constellations
    for (var i = 0; i < this.constellations.length; i++) {
      this.constellations[i].draw(this.ctx);

      if (i == selectedConstellation) {
        this.constellations[i].connect(this.ctx);
        this.quote = this.constellations[i].quote;
      }
    }

    // draw name
    this.ctx.font = this.largeFontSize + ' Arial';
    this.ctx.fillStyle = '#008080';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Josh McMenemy', this.width / 2, this.height / 2);

    // draw text under name
    var maxWidth = this.ctx.measureText('Josh McMenemy').width * 0.8;
    this.ctx.font = this.smallFontSize + ' Arial';
    this.wrapText(this.quote, maxWidth);

  };

  View.prototype.getMousePos = function (canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return [e.clientX - rect.left, e.clientY - rect.top];
  };

  View.prototype.isMouseOnStar = function (mousePos, starPos) {
    var distance =  Math.sqrt(
      Math.pow(mousePos[0] - starPos[0], 2) + Math.pow(mousePos[1] - starPos[1], 2)
    );

    return distance <= 2 * this.starRadius;
  };

  View.prototype.wrapText = function (text, maxWidth) {
    var words = text.split(' ');
    var line = '';
    var lineHeight = parseInt(this.smallFontSize) * 1.2;
    var xPos = this.width / 2;
    var yPos = this.height / 2 + lineHeight;

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = this.ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        this.ctx.fillText(line, xPos, yPos);
        line = words[n] + ' ';
        yPos += lineHeight;
      } else {
        line = testLine;
      }
    }

    this.ctx.fillText(line, xPos, yPos);
  };

  View.prototype.addConstellations = function () {
    var unit = this.starRadius * 2; // unit equal to 3 star diameters
    var constellations = [];

    var bookQuote = '"Employ your time in improving yourself by other\'s writings so that you shall come easily by what others have labored hard for." - Socrates';
    var anchorX = this.width * 10 / 100;
    var anchorY = this.height * 15 / 100;
    var bookStars = [new Universe.Star({
      constellationRef: 0,
      pos: [anchorX, anchorY],
      connections: [1, 2],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 0,
      pos: [anchorX + 6 * unit, anchorY + 12 * unit],
      connections: [],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 0,
      pos: [anchorX + 12 * unit, anchorY - 3 * unit],
      connections: [3],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 0,
      pos: [anchorX + 18 * unit, anchorY + 9 * unit],
      connections: [1, 3],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 0,
      pos: [anchorX + 21 * unit, anchorY - 9 * unit],
      connections: [2],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 0,
      pos: [anchorX + 27 * unit, anchorY + 3 * unit],
      connections: [3, 4],
      radius: this.starRadius,
    }),
    ];
    var bookConstellation = new Universe.Constellation(bookStars, bookQuote);
    constellations.push(bookConstellation);

    var scale = 1.5; // used to resive with one number
    var anchorX = this.width * 30 / 100;
    var anchorY = this.height * 35 / 100;
    var dragonQuote = '"Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten." - Neil Gaiman';
    var dragonStars = [new Universe.Star({
      constellationRef: 1,
      pos: [anchorX, anchorY],
      connections: [1, 2, 3],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 1,
      pos: [anchorX + 2 * unit * scale, anchorY - 4 * unit * scale],
      connections: [4],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 1,
      pos: [anchorX + 12 * unit * scale, anchorY + 3 * unit * scale],
      connections: [],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 1,
      pos: [anchorX + 10 * unit * scale, anchorY - 1 * unit * scale],
      connections: [],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 1,
      pos: [anchorX + 12 * unit * scale, anchorY - 5 * unit * scale],
      connections: [5],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 1,
      pos: [anchorX + 19 * unit * scale, anchorY - 5.5 * unit * scale],
      connections: [6],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 1,
      pos: [anchorX + 27 * unit * scale, anchorY - 5.8 * unit * scale],
      connections: [7],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 1,
      pos: [anchorX + 19 * unit * scale, anchorY - 3 * unit * scale],
      connections: [8],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 1,
      pos: [anchorX + 26 * unit * scale, anchorY - 1.5 * unit * scale],
      connections: [9],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 1,
      pos: [anchorX + 29 * unit * scale, anchorY + 1.5 * unit * scale],
      connections: [10],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 1,
      pos: [anchorX + 21 * unit * scale, anchorY + 1 * unit * scale],
      connections: [],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 1,
      pos: [anchorX + 13 * unit * scale, anchorY - 3.5 * unit * scale],
      connections: [12],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 1,
      pos: [anchorX + 13 * unit * scale, anchorY - 2 * unit * scale],
      connections: [13],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 1,
      pos: [anchorX + 15 * unit * scale, anchorY - 3 * unit * scale],
      connections: [11],
      radius: this.starRadius,
    }),
    ];
    var dragonConstellation = new Universe.Constellation(dragonStars, dragonQuote);
    constellations.push(dragonConstellation);

    var scale = 1; // used to resive with one number
    var anchorX = this.width * 50 / 100;
    var anchorY = this.height * 15 / 100;
    var choiceQuote = '"You will become as small as your controlling desire, or as great as your dominant aspiration" - James Allen';
    var choiceStars = [new Universe.Star({
      constellationRef: 2,
      pos: [anchorX, anchorY],
      connections: [1],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 2,
      pos: [anchorX + 15 * unit * scale, anchorY - 3 * unit * scale],
      connections: [2],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 2,
      pos: [anchorX + 25 * unit * scale, anchorY - 10 * unit * scale],
      connections: [3, 4],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 2,
      pos: [anchorX + 23 * unit * scale, anchorY - 11 * unit * scale],
      connections: [],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 2,
      pos: [anchorX + 24 * unit * scale, anchorY - 7 * unit * scale],
      connections: [],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 2,
      pos: [anchorX + 2 * unit * scale, anchorY + 2 * unit * scale],
      connections: [6],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 2,
      pos: [anchorX + 16 * unit * scale, anchorY + 3.5 * unit * scale],
      connections: [7],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 2,
      pos: [anchorX + 26 * unit * scale, anchorY + 10.5 * unit * scale],
      connections: [8, 9],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 2,
      pos: [anchorX + 23 * unit * scale, anchorY + 10 * unit * scale],
      connections: [],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 2,
      pos: [anchorX + 25 * unit * scale, anchorY + 8 * unit * scale],
      connections: [],
      radius: this.starRadius,
    }),
    ];
    var choiceConstellation = new Universe.Constellation(choiceStars, choiceQuote);
    constellations.push(choiceConstellation);

    var anchorX = this.width * 85 / 100;
    var anchorY = this.height * 10 / 100;
    var impossibleQuote = '"The person who says it cannot be done should not interrupt the person doing it." - Chinese Proverb';
    var impossibleStars = [new Universe.Star({
      constellationRef: 3,
      pos: [anchorX, anchorY],
      connections: [1, 2],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 3,
      pos: [anchorX - 6 * unit, anchorY + 8 * unit],
      connections: [],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 3,
      pos: [anchorX + 6 * unit, anchorY + 8 * unit],
      connections: [],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 3,
      pos: [anchorX + 1 * unit, anchorY + 6 * unit],
      connections: [1, 2],
      radius: this.starRadius,
    }),
    ];
    var impossibleConstellation = new Universe.Constellation(impossibleStars, impossibleQuote);
    constellations.push(impossibleConstellation);

    var anchorX = this.width * 80 / 100;
    var anchorY = this.height * 35 / 100;
    var kickQuote = '"I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times." - Bruce Lee';
    var kickStars = [new Universe.Star({
      constellationRef: 4,
      pos: [anchorX, anchorY],
      connections: [1, 6],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 4,
      pos: [anchorX - 4 * unit, anchorY + 5 * unit],
      connections: [2, 3],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 4,
      pos: [anchorX - 4.5 * unit, anchorY + 9 * unit],
      connections: [],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 4,
      pos: [anchorX + 1 * unit, anchorY + 12 * unit],
      connections: [4, 5, 6],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 4,
      pos: [anchorX + 1 * unit, anchorY + 21 * unit],
      connections: [],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 4,
      pos: [anchorX + 8 * unit, anchorY + 6 * unit],
      connections: [],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 4,
      pos: [anchorX + 3 * unit, anchorY + 6 * unit],
      connections: [7],
      radius: this.starRadius,
    }), new Universe.Star({
      constellationRef: 4,
      pos: [anchorX + 6 * unit, anchorY + 3 * unit],
      connections: [],
      radius: this.starRadius,
    }),
    ];
    var kickConstellation = new Universe.Constellation(kickStars, kickQuote);
    constellations.push(kickConstellation);

    return constellations;
  };
};
