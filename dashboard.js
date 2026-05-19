(function () {
  const data = {
    naive: {
      kicker: 'Naive Strategie',
      title: 'Statisch, teuer und als Vergleichsanker nützlich.',
      sample: 'n = 15',
      copy: 'Naive nutzt feste Sollwerte und reagiert kaum auf Wetter, Last oder Speicherfüllstände. Dadurch entstehen tiefe Defizite, viel Überschuss und die höchsten Tageskosten.',
      brownouts: '59,87',
      unserved: '1248,3',
      surplus: '400,4',
      cost: '8,93',
      security: 18,
      efficiency: 40,
      frequency: 9,
    },
    rule: {
      kicker: 'RuleBased Heuristik',
      title: 'Nicht spektakulär, aber netzbetrieblich am stärksten.',
      sample: 'n = 15',
      copy: 'RuleBased hat mehr Brownout-Ticks als Claude und Codex, aber die Defizite sind viel kleiner. Bei unversorgter Energie, Frequenzabweichung und Kosten ist diese Strategie im Datensatz am besten.',
      brownouts: '63,73',
      unserved: '233,3',
      surplus: '20,9',
      cost: '1,82',
      security: 92,
      efficiency: 88,
      frequency: 96,
    },
    claude: {
      kicker: 'Claude CLI-Subagents',
      title: 'Wenige Brownout-Ticks, aber zu tiefe Defizite.',
      sample: 'n = 15',
      copy: 'Claude bedient die Simulation über die CLI. Die Subagents reduzieren die reine Brownout-Anzahl, verbrauchen aber Speicher ungünstig. Dadurch steigen unversorgte Energie, Überschuss, Frequenzabweichung und Kosten.',
      brownouts: '55,47',
      unserved: '1028,9',
      surplus: '667,8',
      cost: '7,40',
      security: 32,
      efficiency: 18,
      frequency: 10,
    },
    codex: {
      kicker: 'Codex Operator',
      title: 'Die beste KI-nahe Bedienweise, aber nicht Gesamtsieger.',
      sample: 'n = 45',
      copy: 'Codex bedient die Software ebenfalls über die CLI und wurde in drei Durchgängen mit allen 15 Seeds getestet. Die Ergebnisse sind stabil, der Überschuss ist sehr niedrig, aber RuleBased deckt Defizite noch besser.',
      brownouts: '56,89',
      unserved: '301,4',
      surplus: '10,2',
      cost: '2,30',
      security: 82,
      efficiency: 98,
      frequency: 74,
    },
  };

  const ids = {
    kicker: 'strategy-kicker',
    title: 'strategy-title',
    sample: 'strategy-sample',
    copy: 'strategy-copy',
    brownouts: 'm-brownouts',
    unserved: 'm-unserved',
    surplus: 'm-surplus',
    cost: 'm-cost',
    security: 'txt-security',
    efficiency: 'txt-efficiency',
    frequency: 'txt-frequency',
  };

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function setWidth(id, value) {
    const element = document.getElementById(id);
    if (element) element.style.width = `${value}%`;
  }

  function apply(key) {
    const item = data[key];
    if (!item) return;

    Object.entries(ids).forEach(([field, id]) => {
      if (field in item) setText(id, item[field]);
    });

    setText(ids.security, `${item.security}%`);
    setText(ids.efficiency, `${item.efficiency}%`);
    setText(ids.frequency, `${item.frequency}%`);
    setWidth('bar-security', item.security);
    setWidth('bar-efficiency', item.efficiency);
    setWidth('bar-frequency', item.frequency);

    document.querySelectorAll('.strategy-tab').forEach((button) => {
      const active = button.dataset.strategy === key;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
  }

  document.querySelectorAll('.strategy-tab').forEach((button) => {
    button.addEventListener('click', () => apply(button.dataset.strategy));
  });

  apply('naive');
})();
