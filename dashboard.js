(function () {
  const data = {
    naive: {
      kicker: 'Naive Strategie',
      title: 'Stabil nur, weil sie kaum reagiert.',
      copy: 'Statische Setpoints erzeugen ähnlich viele Brownouts, verschwenden viel Energie und sind kein intelligenter Controller. Sie dient als unterer Vergleichsanker.',
      brownouts: '59.87',
      unserved: '1248.3',
      surplus: '400.4',
      cost: '8.93',
      security: 18,
      efficiency: 40,
      frequency: 9,
    },
    rule: {
      kicker: 'RuleBased Heuristik',
      title: 'Nicht spektakulär, aber netzbetrieblich überlegen.',
      copy: 'RuleBased hat mehr Brownout-Ticks als Claude, aber deutlich weniger unversorgte Energie, nur 20.9 MWh Surplus, die beste Frequenzstabilität und die niedrigsten Kosten.',
      brownouts: '63.73',
      unserved: '233.3',
      surplus: '20.9',
      cost: '1.82',
      security: 88,
      efficiency: 96,
      frequency: 91,
    },
    claude: {
      kicker: 'Claude LLM-Subagent',
      title: 'Weniger Brownout-Ticks, aber tiefere Defizite.',
      copy: 'Claude gewinnt die isolierte Brownout-Häufigkeit signifikant. Gleichzeitig steigen Unserved Energy, Surplus, CO2, Frequenzabweichung und Tageskosten stark. Der Hauptfehler ist die frühe H2-Speicher-Entleerung.',
      brownouts: '55.47',
      unserved: '1028.9',
      surplus: '667.8',
      cost: '7.40',
      security: 34,
      efficiency: 18,
      frequency: 12,
    },
  };

  const ids = {
    kicker: 'strategy-kicker',
    title: 'strategy-title',
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

    setText(ids.kicker, item.kicker);
    setText(ids.title, item.title);
    setText(ids.copy, item.copy);
    setText(ids.brownouts, item.brownouts);
    setText(ids.unserved, item.unserved);
    setText(ids.surplus, item.surplus);
    setText(ids.cost, item.cost);
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
