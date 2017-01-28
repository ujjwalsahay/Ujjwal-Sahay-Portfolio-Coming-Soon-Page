/**

falling rainbow squares
By Ana Tudor

**/

(function() {
    var canvas = document.getElementById('square-canvas'),
            context = canvas.getContext('2d');

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight + 100;

            /**
             * Your drawings need to be inside this function otherwise they will be reset when 
             * you resize the browser window and the canvas goes will be cleared.
             */
            drawStuff(); 
    }
    resizeCanvas();

    function drawStuff() {
      var N_SQUARES = 164, 
      OPTS = ['fill', 'stroke'], 
      c = document.querySelector('canvas'), 
      cot = c.getContext('2d'), 
      w = c.width, h = c.height, co = 1*h, 
      squares = [];

      var rand = function(max, min, is_int) {
      var max = ((max - 1) || 0) + 1, 
      min = min || 0, 
      gen = min + (max - min)*Math.random();

      return is_int ? ~~gen : gen;
      };

      var Square = function() {
      var x, y, e, o, abc, v, wxy, kwe, teb, a, f;

      this.init = function() {
      e = rand(16, 8, 1); // square edge length
      o = -.5*e;
      x = rand(w - o, o, 1);
      y = rand(-co, -e, 1);
      abc = rand(.5*Math.PI);
      v = rand(5, .25); // speed going down
      wxy = rand(.02, .005)*Math.PI; // angular velocity
      kwe = [.5, .5]; teb = []; a = []; f = [];

      for(var i = 0; i < 2; i++) {
      teb.push(rand(2*Math.PI));
      a.push(rand(.4, .1));
      f.push(rand(.001, .0001)*Math.PI);
      }
      };

      this.update = function(t) {
      var k, d;

      y += v;
      abc += wxy;

      k = Math.max(0, Math.floor(y/co));
      d = y - co;

      for(var i = 0; i < 2; i++) 
      kwe[i] = Math.max(0, .4 + .1*i + a[i]*Math.sin(f[i]*t + teb[i]) - k*d*.01);

      if(y > h + e || !(kwe[0] + kwe[1])) this.init();

      cot.fillStyle = cot.strokeStyle = 'hsl(' + ~~(t + .2*y) + ',100%,65%)';

      this.draw();
      };

      this.draw = function() {
      cot.save();
      cot.translate(x, y);
      cot.rotate(abc);

      for(var i = 0; i < 2; i++) {
      cot.beginPath();
      cot.globalAlpha = kwe[i];
      cot[OPTS[i] + 'Rect'](o, o, e, e);
      }

      cot.restore();
      };

      this.init();
      };

      var ani = function(t) {
      cot.clearRect(0, 0, w, h);

      for(var i = 0; i < N_SQUARES; i++) 
      squares[i].update(t);

      requestAnimationFrame(ani.bind(this, ++t));
      };

      (function init() {
      for(var i = 0; i < N_SQUARES; i++) 
      squares.push(new Square);

      ani(0);
      })();
    }
})();