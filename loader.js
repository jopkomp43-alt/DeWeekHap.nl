// Auto-loader for DeWeekHap enhancements
(function() {
  console.log('🚀 DeWeekHap loader gestart');

  // Load CSS fix
  const cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.href = 'styles-fix.css';
  document.head.appendChild(cssLink);
  console.log('✅ CSS fix geladen');

  // Load language switch script
  const jsScript = document.createElement('script');
  jsScript.src = 'language-switch.js';
  jsScript.onload = function() { console.log('✅ Taalswitch geladen'); };
  document.head.appendChild(jsScript);

  // Load notes feature
  const notesScript = document.createElement('script');
  notesScript.src = 'notes.js';
  notesScript.onload = function() { console.log('✅ Notities feature geladen'); };
  document.head.appendChild(notesScript);

  // Ensure body is visible immediately
  document.body.style.opacity = '1';
  document.body.style.visibility = 'visible';

  // Injecteer hero header zodra DOM klaar is
  function injectHero() {
    if (document.getElementById('dw-hero-injected')) return;
    const nav = document.querySelector('nav');
    if (!nav) return;

    const hero = document.createElement('div');
    hero.id = 'dw-hero-injected';
    hero.className = 'dw-hero';
    hero.innerHTML = `
      <img src="logo.jpg" alt="DeWeekHap logo" class="dw-hero-logo" onerror="this.style.display='none'" />
      <div class="dw-hero-title">🍽️ De Weekhap</div>
      <div class="dw-hero-sub">Jouw gratis weekmenu generator &mdash; in 30 seconden klaar</div>
      <div class="dw-hero-badges">
        <span class="dw-hero-badge">✅ 100% Gratis</span>
        <span class="dw-hero-badge">🛒 Automatische boodschappenlijst</span>
        <span class="dw-hero-badge">👨‍👩‍👦 2 t/m 6 personen</span>
        <span class="dw-hero-badge">🔄 Elke week nieuwe recepten</span>
      </div>
    `;

    nav.insertAdjacentElement('afterend', hero);
    console.log('✅ Hero header geïnjecteerd');
  }

  // Observer: wacht tot nav bestaat (render() bouwt DOM dynamisch op)
  const heroObserver = new MutationObserver(function() {
    if (document.querySelector('nav') && !document.getElementById('dw-hero-injected')) {
      injectHero();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      heroObserver.observe(document.body, { childList: true, subtree: true });
      injectHero();
    });
  } else {
    heroObserver.observe(document.body, { childList: true, subtree: true });
    injectHero();
  }

  console.log('🎉 DeWeekHap loader klaar!');
})();
