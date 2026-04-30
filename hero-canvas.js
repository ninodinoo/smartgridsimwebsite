// Hero-Canvas: animiertes Smart-Grid-Netz mit pulsierenden Knoten und
// fliessenden Verbindungslinien.

(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w, h;
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    w = canvas.width = canvas.offsetWidth * dpr;
    h = canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);
  }
  resize();
  window.addEventListener('resize', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    resize();
  });

  // Knotentypen mit Farben
  const types = [
    { color: '#7CFC00', label: 'PV' },
    { color: '#00E5FF', label: 'Wind' },
    { color: '#FFD60A', label: 'Bio' },
    { color: '#FF2D87', label: 'H2' },
    { color: '#a78bfa', label: 'Speicher' },
    { color: '#94a3b8', label: 'Last' },
  ];

  // Knoten zufaellig platzieren
  const nodes = [];
  const N = 18;
  for (let i = 0; i < N; i++) {
    const t = types[i % types.length];
    nodes.push({
      x: Math.random() * (canvas.offsetWidth - 100) + 50,
      y: Math.random() * (canvas.offsetHeight - 100) + 50,
      r: 4 + Math.random() * 4,
      color: t.color,
      phase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
    });
  }

  // Edges: jeder Knoten zu seinen 2 naechsten Nachbarn
  function nearest(node, k) {
    return nodes
      .filter(n => n !== node)
      .map(n => ({ n, d: Math.hypot(n.x - node.x, n.y - node.y) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, k)
      .map(o => o.n);
  }

  function buildEdges() {
    const edges = [];
    nodes.forEach(n => {
      nearest(n, 2).forEach(m => {
        // Doppelte vermeiden
        if (!edges.find(e => (e.a === n && e.b === m) || (e.a === m && e.b === n))) {
          edges.push({ a: n, b: m, flowPhase: Math.random() * Math.PI * 2 });
        }
      });
    });
    return edges;
  }

  let edges = buildEdges();

  let t0 = performance.now();
  function frame(now) {
    const dt = (now - t0) / 1000;
    t0 = now;

    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // Knoten driften
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 30 || n.x > canvas.offsetWidth - 30) n.vx *= -1;
      if (n.y < 30 || n.y > canvas.offsetHeight - 30) n.vy *= -1;
      n.phase += dt * 1.5;
    });

    // Edges neu aufbauen, falls Bewegung gross ist (fluently)
    if (Math.random() < 0.005) edges = buildEdges();

    // Edges zeichnen
    edges.forEach(e => {
      const dx = e.b.x - e.a.x;
      const dy = e.b.y - e.a.y;
      const dist = Math.hypot(dx, dy);

      // Linie
      const grad = ctx.createLinearGradient(e.a.x, e.a.y, e.b.x, e.b.y);
      grad.addColorStop(0, hexToRgba(e.a.color, 0.15));
      grad.addColorStop(1, hexToRgba(e.b.color, 0.15));
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(e.a.x, e.a.y);
      ctx.lineTo(e.b.x, e.b.y);
      ctx.stroke();

      // Fliess-Animation (Energiefluss)
      e.flowPhase += dt * 0.8;
      const t = (Math.sin(e.flowPhase) + 1) / 2;   // 0..1
      const fx = e.a.x + dx * t;
      const fy = e.a.y + dy * t;
      ctx.fillStyle = hexToRgba(e.a.color, 0.6);
      ctx.beginPath();
      ctx.arc(fx, fy, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Knoten zeichnen
    nodes.forEach(n => {
      const pulse = (Math.sin(n.phase) + 1) / 2;
      const glow = 12 + pulse * 8;

      // Glow
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glow);
      grad.addColorStop(0, hexToRgba(n.color, 0.4));
      grad.addColorStop(1, hexToRgba(n.color, 0));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(n.x, n.y, glow, 0, Math.PI * 2);
      ctx.fill();

      // Kern
      ctx.fillStyle = n.color;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + pulse, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  function hexToRgba(hex, a) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  }
})();
