(function () {
  const canvas = document.getElementById('load-chart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const N = 96;
  const series = createSeries();
  let dpr = 1;
  let width = 0;
  let height = 0;
  let cursor = 0;
  let last = performance.now();

  function createSeries() {
    const load = [];
    const pv = [];
    const wind = [];
    let windState = 31;

    for (let i = 0; i < N; i += 1) {
      const hour = i / 4;
      const morning = Math.exp(-((hour - 7.2) ** 2) / 5.5);
      const evening = Math.exp(-((hour - 19) ** 2) / 7);
      const commerce = hour >= 8 && hour <= 18 ? 78 : hour >= 6 && hour < 8 ? 22 + 28 * (hour - 6) : 16;
      load.push(112 + 72 * Math.max(morning, evening) + commerce);

      const sun = hour < 6 || hour > 20 ? 0 : Math.sin(Math.PI * (hour - 6) / 14);
      pv.push(Math.max(0, 128 * sun));

      windState += Math.sin(i * .22) * 1.25 + Math.cos(i * .09) * .7;
      windState = Math.max(12, Math.min(67, windState));
      wind.push(windState);
    }

    return [
      { name: 'Last', color: '#f3f1ea', values: load, width: 2.5 },
      { name: 'PV', color: '#d8a531', values: pv, width: 2 },
      { name: 'Wind', color: '#80d39b', values: wind, width: 2 },
    ];
  }

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function x(index) {
    return 18 + (index / (N - 1)) * (width - 36);
  }

  function y(value) {
    const max = 310;
    return height - 24 - (value / max) * (height - 48);
  }

  function drawAxis() {
    ctx.fillStyle = '#151914';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(245,242,232,.10)';
    ctx.lineWidth = 1;

    for (let i = 1; i < 4; i += 1) {
      const yy = (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, yy);
      ctx.lineTo(width, yy);
      ctx.stroke();
    }

    for (let i = 1; i < 6; i += 1) {
      const xx = (width / 6) * i;
      ctx.beginPath();
      ctx.moveTo(xx, 0);
      ctx.lineTo(xx, height);
      ctx.stroke();
    }
  }

  function drawLine(item, limit) {
    ctx.strokeStyle = item.color;
    ctx.lineWidth = item.width;
    ctx.beginPath();
    for (let i = 0; i <= limit; i += 1) {
      const xx = x(i);
      const yy = y(item.values[i]);
      if (i === 0) ctx.moveTo(xx, yy);
      else ctx.lineTo(xx, yy);
    }
    ctx.stroke();
  }

  function drawLegend() {
    ctx.font = '700 11px IBM Plex Mono, monospace';
    let xx = 16;
    series.forEach((item) => {
      ctx.fillStyle = item.color;
      ctx.fillRect(xx, 16, 16, 3);
      ctx.fillStyle = 'rgba(245,242,232,.72)';
      ctx.fillText(item.name, xx + 22, 20);
      xx += 86;
    });
  }

  function draw(now) {
    const dt = now - last;
    last = now;
    cursor = cursor >= N - 1 ? 0 : cursor + dt / 72;
    const limit = Math.max(1, Math.min(N - 1, Math.floor(cursor)));

    drawAxis();
    series.forEach((item) => drawLine(item, limit));

    const xx = x(limit);
    ctx.strokeStyle = 'rgba(245,242,232,.34)';
    ctx.setLineDash([4, 5]);
    ctx.beginPath();
    ctx.moveTo(xx, 0);
    ctx.lineTo(xx, height);
    ctx.stroke();
    ctx.setLineDash([]);

    drawLegend();
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);
})();
