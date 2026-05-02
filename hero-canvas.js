(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const nodes = [
    { x: .11, y: .30, t: 'pv', label: 'PV', phase: 0 },
    { x: .19, y: .66, t: 'load', label: 'Load', phase: 1.4 },
    { x: .31, y: .42, t: 'battery', label: 'Bat', phase: 2.1 },
    { x: .47, y: .24, t: 'wind', label: 'Wind', phase: .7 },
    { x: .53, y: .58, t: 'grid', label: 'Bus', phase: 2.8 },
    { x: .68, y: .38, t: 'h2', label: 'H2', phase: 1.1 },
    { x: .81, y: .66, t: 'pump', label: 'PHS', phase: 3.2 },
    { x: .90, y: .30, t: 'ev', label: 'EV', phase: 2.4 },
  ];

  const edges = [
    [0, 2], [2, 4], [3, 4], [4, 5], [5, 6], [4, 1], [4, 7], [6, 1], [0, 4],
  ];

  const colors = {
    pv: '#d8a531',
    wind: '#2f6f9f',
    battery: '#3f8f5f',
    grid: '#171916',
    h2: '#b9443f',
    pump: '#587b58',
    ev: '#6a6252',
    load: '#20251f',
  };

  let width = 0;
  let height = 0;
  let dpr = 1;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function point(node) {
    return {
      x: node.x * width,
      y: node.y * height,
    };
  }

  function drawGrid() {
    ctx.strokeStyle = 'rgba(23,25,22,.10)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += 42) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += 42) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  function draw(now) {
    const t = now / 1000;
    ctx.clearRect(0, 0, width, height);
    drawGrid();

    edges.forEach(([a, b], index) => {
      const pa = point(nodes[a]);
      const pb = point(nodes[b]);
      const dx = pb.x - pa.x;
      const dy = pb.y - pa.y;
      const pulse = (Math.sin(t * 1.25 + index) + 1) / 2;

      ctx.strokeStyle = 'rgba(23,25,22,.26)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.stroke();

      ctx.fillStyle = index === 3 ? colors.h2 : colors.battery;
      ctx.beginPath();
      ctx.arc(pa.x + dx * pulse, pa.y + dy * pulse, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    nodes.forEach((node) => {
      const p = point(node);
      const pulse = (Math.sin(t * 1.8 + node.phase) + 1) / 2;
      const radius = 12 + pulse * 3;

      ctx.fillStyle = 'rgba(251,250,246,.78)';
      ctx.strokeStyle = colors[node.t];
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = colors[node.t];
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();

      if (width > 760) {
        ctx.font = '700 11px IBM Plex Mono, monospace';
        ctx.fillStyle = 'rgba(23,25,22,.72)';
        ctx.fillText(node.label, p.x + 16, p.y + 4);
      }
    });

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);
})();
