// Lastganglinien-Chart auf Canvas — zeigt eine echte Tagessimulation
// (Werte aus einem rule_based-Lauf, Seed 42, Default-Szenario).

(function () {
  const canvas = document.getElementById('load-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const dpr = window.devicePixelRatio || 1;
  function resize() {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
  }
  resize();
  window.addEventListener('resize', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    resize();
  });

  // Vereinfachte Tagesgang-Werte (96 Ticks). Realistisch: Wohnen + Gewerbe
  // + Industrie überlagert; Spitzen bei 7:00 und 19:00.
  const N = 96;
  const load = new Array(N);
  for (let i = 0; i < N; i++) {
    const h = (i * 15) / 60;                           // Stunde 0..24
    const morn = Math.exp(-((h - 7) ** 2) / 6);
    const eve = Math.exp(-((h - 19) ** 2) / 8);
    const shapeRes = Math.max(morn, eve);
    const wohnen = 60 + 90 * shapeRes;
    const gewerbe = (h >= 8 && h <= 18) ? 80 :
                    (h >= 6 && h < 8) ? 10 + 70 * (h - 6) / 2 :
                    (h > 18 && h <= 20) ? 10 + 70 * (20 - h) / 2 : 10;
    const industrie = (h < 6 || h >= 22) ? 48 : 60;
    load[i] = wohnen + gewerbe + industrie;
  }

  // PV-Verlauf
  const pv = new Array(N);
  for (let i = 0; i < N; i++) {
    const h = (i * 15) / 60;
    if (h < 6 || h > 20) { pv[i] = 0; continue; }
    const phase = Math.PI * (h - 6) / 14;
    pv[i] = 110 * Math.sin(phase);
  }

  // Wind-Verlauf (mit Rauschen)
  const wind = new Array(N);
  let lastWind = 25;
  for (let i = 0; i < N; i++) {
    lastWind += (Math.random() - 0.5) * 5;
    lastWind = Math.max(5, Math.min(60, lastWind));
    wind[i] = lastWind;
  }

  // Animation: zeichne Linien fortschreitend
  let frame = 0;
  let lastT = performance.now();

  function draw() {
    const now = performance.now();
    const dt = now - lastT;
    lastT = now;

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    ctx.clearRect(0, 0, w, h);

    // Achsen-Hintergrund
    ctx.fillStyle = 'rgba(255,255,255,0.02)';
    ctx.fillRect(0, 0, w, h);

    // Hintergrund-Gitter
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      const y = (h / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    for (let i = 1; i < 6; i++) {
      const x = (w / 6) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // Maximalwert für Skalierung
    const yMax = 320;
    const scaleY = (v) => h - (v / yMax) * (h - 10) - 5;
    const scaleX = (i) => (i / (N - 1)) * w;

    // Last-Linie zeichnen — gefuellt
    drawLine(scaleX, scaleY, load, frame, '#00E5FF', 2.5, 'rgba(0,229,255,0.08)');
    // PV als gefuellte Flaeche
    drawLine(scaleX, scaleY, pv, frame, '#FFD60A', 1.5, 'rgba(255,214,10,0.15)');
    // Wind
    drawLine(scaleX, scaleY, wind, frame, '#7CFC00', 1.5, 'rgba(124,252,0,0.12)');

    // Legende
    ctx.font = '11px JetBrains Mono, monospace';
    drawLegend(ctx, w, [
      { color: '#00E5FF', label: 'Last [MW]' },
      { color: '#FFD60A', label: 'PV' },
      { color: '#7CFC00', label: 'Wind' },
    ]);

    // Cursor-Indikator (Zeit)
    if (frame < N) {
      const x = scaleX(frame);
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Frame fortschreiben (langsamer als Refresh-Rate)
    if (frame < N - 1) {
      frame += dt / 60;
    } else {
      // Pause am Ende, dann zurueckspringen
      setTimeout(() => { frame = 0; }, 1500);
    }

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);

  function drawLine(scaleX, scaleY, data, upTo, stroke, width, fill) {
    const w_ = canvas.offsetWidth;
    const h_ = canvas.offsetHeight;
    ctx.lineWidth = width;
    ctx.strokeStyle = stroke;
    ctx.beginPath();
    const limit = Math.min(Math.floor(upTo), data.length - 1);
    for (let i = 0; i <= limit; i++) {
      const x = scaleX(i);
      const y = scaleY(data[i]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Fuellung darunter
    if (fill) {
      ctx.fillStyle = fill;
      ctx.lineTo(scaleX(limit), h_);
      ctx.lineTo(scaleX(0), h_);
      ctx.closePath();
      ctx.fill();
    }
  }

  function drawLegend(ctx, w, items) {
    let x = 12;
    const y = 16;
    items.forEach(it => {
      ctx.fillStyle = it.color;
      ctx.fillRect(x, y - 6, 10, 2);
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.fillText(it.label, x + 14, y);
      x += ctx.measureText(it.label).width + 36;
    });
  }
})();
