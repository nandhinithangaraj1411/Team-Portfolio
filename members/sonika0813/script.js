
(function () {
  var dot = document.getElementById('dot');
  var gd = document.getElementById('gd');
  var gt = document.getElementById('gt');
  var gz = document.getElementById('gz');

  function gauge() {
    var max = document.documentElement.scrollHeight - innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    var d = Math.round(p * 4000 / 10) * 10;
    var t = 2 + 26 * Math.exp(-d / 250);

    gd.textContent = d + ' m';
    gt.textContent = t.toFixed(1) + ' °C';
    gz.textContent = d < 200 ? 'Sunlight zone'
      : d < 1000 ? 'Twilight zone'
      : d < 3000 ? 'Midnight zone'
      : 'Abyssal zone';

    dot.style.top = (p * 100) + '%';
  }

  addEventListener('scroll', gauge, { passive: true });
  addEventListener('resize', gauge);
  gauge();

  var btns = [].slice.call(document.querySelectorAll('.skills button'));
  var cards = [].slice.call(document.querySelectorAll('.card'));

  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      var on = b.getAttribute('aria-pressed') === 'true';

      btns.forEach(function (x) {
        x.setAttribute('aria-pressed', 'false');
      });

      var s = on ? null : b.dataset.s;

      if (s) {
        b.setAttribute('aria-pressed', 'true');
      }

      cards.forEach(function (c) {
        c.classList.toggle(
          'dim',
          !!s && c.dataset.s.split(' ').indexOf(s) < 0
        );
      });
    });
  });

  cards.forEach(function (c) {
    c.addEventListener('pointermove', function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty('--x', (e.clientX - r.left) + 'px');
      c.style.setProperty('--y', (e.clientY - r.top) + 'px');
    });
  });

  var cv = document.getElementById('bub');
  var x = cv.getContext('2d');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var B = [];
  var W, H;

  function size() {
    var d = Math.min(devicePixelRatio || 1, 2);

    W = innerWidth;
    H = innerHeight;

    cv.width = W * d;
    cv.height = H * d;

    x.setTransform(d, 0, 0, d, 0, 0);
  }

  size();
  addEventListener('resize', size);

  for (var i = 0; i < 38; i++) {
    B.push({
      x: Math.random(),
      y: Math.random(),
      r: 1.5 + Math.random() * 5,
      s: .15 + Math.random() * .5,
      w: Math.random() * 6
    });
  }

  var pops = [];
  var popped = 0;

  function frame(t) {
    x.clearRect(0, 0, W, H);

    B.forEach(function (b) {
      if (!reduce) {
        b.y -= b.s / H * 1.2;

        if (b.y < -.05) {
          b.y = 1.05;
          b.x = Math.random();
        }
      }

      var px = b.x * W + Math.sin(t / 1800 + b.w) * 10;
      var py = b.y * H;

      b.px = px;
      b.py = py;

      x.beginPath();
      x.arc(px, py, b.r, 0, 6.2832);
      x.strokeStyle = 'rgba(200,245,255,.35)';
      x.lineWidth = 1;
      x.stroke();

      x.fillStyle = 'rgba(200,245,255,.07)';
      x.fill();
    });

    pops = pops.filter(function (p) {
      var a = (t - p.t) / 450;

      if (a >= 1) {
        return false;
      }

      x.beginPath();
      x.arc(p.x, p.y, p.r + a * 26, 0, 6.2832);
      x.strokeStyle = 'rgba(255,211,107,' + (.8 * (1 - a)) + ')';
      x.lineWidth = 2;
      x.stroke();

      return true;
    });

    if (!reduce) {
      requestAnimationFrame(frame);
    }
  }

  document.addEventListener('click', function (e) {
    if (reduce || e.target.closest('a,button,input,canvas,summary')) {
      return;
    }

    B.forEach(function (b) {
      if (b.px === undefined) {
        return;
      }

      var dx = e.clientX - b.px;
      var dy = e.clientY - b.py;

      if (dx * dx + dy * dy < (b.r + 16) * (b.r + 16)) {
        pops.push({
          x: b.px,
          y: b.py,
          r: b.r,
          t: performance.now()
        });

        b.y = 1.05;
        b.x = Math.random();
        b.px = undefined;
        popped++;

        document.getElementById('bp').textContent =
          popped + (popped === 1 ? ' bubble' : ' bubbles') + ' popped';
      }
    });
  });

  document.querySelector('.track').addEventListener('click', function (e) {
    var r = this.getBoundingClientRect();
    var p = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));

    scrollTo({
      top: p * (document.documentElement.scrollHeight - innerHeight),
      behavior: 'smooth'
    });
  });

  [].forEach.call(document.querySelectorAll('.trio a'), function (a) {
    a.addEventListener('click', function () {
      var el = document.getElementById(a.getAttribute('href').slice(1));

      setTimeout(function () {
        el.classList.add('flash');

        setTimeout(function () {
          el.classList.remove('flash');
        }, 1300);
      }, 500);
    });
  });

  (function () {
    var cv = document.getElementById('rc');
    var c = cv.getContext('2d');
    var BW = 20, GW = 16, GH = 8;
    var bad = {}, noise = {}, busy = false;
    var stat = document.getElementById('rs');

    var img = document.createElement('canvas');
    img.width = 320;
    img.height = 160;

    var g = img.getContext('2d');
    var gr = g.createLinearGradient(0, 0, 0, 160);

    gr.addColorStop(0, '#0E3F6B');
    gr.addColorStop(.55, '#2B9DB5');
    gr.addColorStop(1, '#F2C27A');

    g.fillStyle = gr;
    g.fillRect(0, 0, 320, 160);

    g.fillStyle = '#FFE29A';
    g.beginPath();
    g.arc(230, 70, 28, 0, 6.2832);
    g.fill();

    g.strokeStyle = 'rgba(255,255,255,.5)';
    g.lineWidth = 3;

    for (var k = 0; k < 4; k++) {
      g.beginPath();
      g.moveTo(0, 110 + k * 13);
      g.bezierCurveTo(
        80, 95 + k * 13,
        160, 125 + k * 13,
        320, 105 + k * 13
      );
      g.stroke();
    }

    function nz(i) {
      var a = [];

      for (var n = 0; n < 25; n++) {
        a.push(
          'hsl(' + Math.floor(Math.random() * 360) +
          ',80%,' + (20 + Math.random() * 50) + '%)'
        );
      }

      noise[i] = a;
    }

    function count() {
      var n = 0;

      for (var i in bad) {
        if (bad[i]) {
          n++;
        }
      }

      return n;
    }

    function draw(hl) {
      c.drawImage(img, 0, 0);

      for (var i in bad) {
        if (!bad[i]) {
          continue;
        }

        var bx = (i % GW) * BW;
        var by = Math.floor(i / GW) * BW;
        var a = noise[i];

        for (var n = 0; n < 25; n++) {
          c.fillStyle = a[n];
          c.fillRect(
            bx + (n % 5) * 4,
            by + Math.floor(n / 5) * 4,
            4,
            4
          );
        }
      }

      if (hl) {
        c.strokeStyle = '#FFD36B';
        c.lineWidth = 2;

        hl.forEach(function (i) {
          c.strokeRect(
            (i % GW) * BW + 1,
            Math.floor(i / GW) * BW + 1,
            BW - 2,
            BW - 2
          );
        });
      }
    }

    function add(n) {
      for (var k = 0; k < n; k++) {
        var i = Math.floor(Math.random() * GW * GH);
        bad[i] = true;
        nz(i);
      }
    }

    function say() {
      stat.textContent = count() +
        ' corrupted blocks. Click the picture to add or remove damage.';
    }

    add(6);
    draw();
    say();

    cv.addEventListener('click', function (e) {
      if (busy) {
        return;
      }

      var r = cv.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width * 320;
      var py = (e.clientY - r.top) / r.height * 160;
      var i = Math.floor(py / BW) * GW + Math.floor(px / BW);

      if (bad[i]) {
        bad[i] = false;
      } else {
        bad[i] = true;
        nz(i);
      }

      draw();
      say();
    });

    document.getElementById('radd').addEventListener('click', function () {
      if (busy) {
        return;
      }

      add(5);
      draw();
      say();
    });

    document.getElementById('rfix').addEventListener('click', function () {
      if (busy) {
        return;
      }

      var q = [];

      for (var i in bad) {
        if (bad[i]) {
          q.push(+i);
        }
      }

      if (!q.length) {
        stat.textContent = 'Nothing to repair. Add some damage first.';
        return;
      }

      busy = true;
      draw(q);
      stat.textContent = 'Detected ' + q.length + ' corrupted blocks. Repairing…';

      setTimeout(function () {
        var iv = setInterval(function () {
          if (!q.length) {
            clearInterval(iv);
            busy = false;
            draw();
            stat.textContent = 'Repaired. Every block is restored.';
            return;
          }

          var i = q.shift();
          bad[i] = false;
          draw(q);
        }, 110);
      }, 700);
    });
  })();

  (function () {
    var L = [
      'total = 0',
      'for i in range(1, 4):',
      '    total = total + i',
      'print(total)'
    ];

    var S = [
      { l: 0, t: 0, i: '–', o: '–', d: 'total is set to 0.' },
      { l: 1, t: 0, i: 1, o: '–', d: 'The loop starts and i becomes 1.' },
      { l: 2, t: 1, i: 1, o: '–', d: 'total becomes 0 + 1 = 1.' },
      { l: 1, t: 1, i: 2, o: '–', d: 'i becomes 2.' },
      { l: 2, t: 3, i: 2, o: '–', d: 'total becomes 1 + 2 = 3.' },
      { l: 1, t: 3, i: 3, o: '–', d: 'i becomes 3.' },
      { l: 2, t: 6, i: 3, o: '–', d: 'total becomes 3 + 3 = 6.' },
      { l: 3, t: 6, i: 3, o: 6, d: 'The loop is over, so the program prints 6.' }
    ];

    var box = document.getElementById('vc');
    var n = -1, timer = null;
    var d = document.getElementById('vd');
    var sb = document.getElementById('vs');
    var ab = document.getElementById('va');

    L.forEach(function (s) {
      var e = document.createElement('div');
      e.className = 'ln';
      e.textContent = s;
      box.appendChild(e);
    });

    function setv(id, val) {
      var e = document.getElementById(id);
      var b = e.querySelector('b');

      if (b.textContent !== String(val)) {
        b.textContent = val;
        e.classList.remove('chg');
        void e.offsetWidth;
        e.classList.add('chg');
      }
    }

    function show() {
      var s = n < 0
        ? { l: -1, t: '–', i: '–', o: '–', d: 'Press Step to run the first line.' }
        : S[n];

      [].forEach.call(box.children, function (e, i) {
        e.classList.toggle('on', i === s.l);
      });

      setv('vt', s.t);
      setv('vi', s.i);
      setv('vo', s.o);

      d.textContent = s.d;
      sb.textContent = n === S.length - 1 ? 'Replay' : 'Step';
    }

    function stop() {
      clearInterval(timer);
      timer = null;
      ab.textContent = 'Auto-play';
    }

    function step() {
      if (n >= S.length - 1) {
        n = -1;
        show();
        return;
      }

      n++;
      show();

      if (n === S.length - 1) {
        stop();
      }
    }

    sb.addEventListener('click', function () {
      stop();
      step();
    });

    ab.addEventListener('click', function () {
      if (timer) {
        stop();
        return;
      }

      if (n >= S.length - 1) {
        n = -1;
      }

      ab.textContent = 'Pause';
      step();
      timer = setInterval(step, 1000);
    });

    document.getElementById('vr').addEventListener('click', function () {
      stop();
      n = -1;
      show();
    });

    show();
  })();

  (function () {
    var od = document.getElementById('od');
    var dv = document.getElementById('odv');
    var oo = document.getElementById('oo');
    var mk = document.getElementById('omk');
    var col = document.getElementById('oc');
    var rb = document.getElementById('orb');
    var open = false;

    function upd() {
      var d = +od.value;
      var t = 4 + 24 * Math.exp(-d / 200);

      dv.textContent = d + ' m';
      mk.style.top = (d / 1000 * 100) + '%';

      oo.textContent = (!open && d > 120)
        ? '? A satellite can’t see this deep.'
        : t.toFixed(1) + ' °C (illustrative values, not model output)';
    }

    od.addEventListener('input', upd);

    rb.addEventListener('click', function () {
      open = !open;
      col.classList.toggle('open', open);
      rb.textContent = open ? 'Hide it again' : 'Reconstruct below';
      upd();
    });

    upd();
  })();

  requestAnimationFrame(frame);
})();
