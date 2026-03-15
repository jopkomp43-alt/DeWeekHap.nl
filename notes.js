// DeWeekHap - Recept Notities Feature
(function() {
  function getNotes() {
    return JSON.parse(localStorage.getItem('recipeNotes') || '{}');
  }
  function saveNote(recipeId, text) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const userKey = currentUser ? currentUser.email : '_guest_';
    const all = getNotes();
    if (!all[userKey]) all[userKey] = {};
    all[userKey][recipeId] = text;
    localStorage.setItem('recipeNotes', JSON.stringify(all));
  }
  function getNote(recipeId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const userKey = currentUser ? currentUser.email : '_guest_';
    const all = getNotes();
    return (all[userKey] || {})[recipeId] || '';
  }

  // Injecteer notitie-blok in recept modals zodra ze openen
  function injectNoteBlock(modal, recipeId) {
    if (!recipeId || modal.querySelector('.dw-note-block')) return;
    const existingNote = getNote(recipeId);
    const block = document.createElement('div');
    block.className = 'dw-note-block';
    block.style.cssText = 'margin-top:1.5rem;padding:1rem;background:#fff7ed;border-radius:1rem;border:2px solid #fed7aa;';
    block.innerHTML = `
      <p style="font-weight:900;font-size:1rem;margin-bottom:0.5rem;color:#c2410c;">📝 Mijn notities bij dit recept</p>
      <textarea
        class="dw-note-textarea"
        placeholder="Bijv. minder zout, kinderen vonden dit geweldig, volgende keer met broccoli…"
        style="width:100%;min-height:80px;padding:0.75rem;border-radius:0.75rem;border:2px solid #fed7aa;font-size:0.875rem;resize:vertical;outline:none;font-family:inherit;box-sizing:border-box;"
      >${existingNote}</textarea>
      <button
        class="dw-note-save"
        style="margin-top:0.5rem;background:#ea580c;color:white;border:none;padding:0.5rem 1.25rem;border-radius:0.75rem;font-weight:700;font-size:0.875rem;cursor:pointer;"
      >💾 Notities bewaren</button>
      <span class="dw-note-status" style="margin-left:0.75rem;font-size:0.8rem;color:#16a34a;display:none;">✅ Opgeslagen!</span>
    `;
    // Opslaan knop
    block.querySelector('.dw-note-save').addEventListener('click', function() {
      const text = block.querySelector('.dw-note-textarea').value;
      saveNote(recipeId, text);
      const status = block.querySelector('.dw-note-status');
      status.style.display = 'inline';
      setTimeout(() => { status.style.display = 'none'; }, 2000);
      // Update notitie-icoontje in weekmenu
      updateNoteIcons();
    });
    // Voeg toe aan scrollable inhoud van de modal
    const scrollable = modal.querySelector('.modal-scrollable');
    if (scrollable) scrollable.appendChild(block);
    else modal.appendChild(block);
  }

  // Voeg 📝 icoontje toe aan receptkaarten die notities hebben
  function updateNoteIcons() {
    document.querySelectorAll('[data-recipe-id]').forEach(function(card) {
      const rid = card.getAttribute('data-recipe-id');
      if (!rid) return;
      const note = getNote(rid);
      let icon = card.querySelector('.dw-note-icon');
      if (note && note.trim()) {
        if (!icon) {
          icon = document.createElement('span');
          icon.className = 'dw-note-icon';
          icon.title = 'Je hebt notities bij dit recept';
          icon.style.cssText = 'font-size:0.85rem;margin-left:0.3rem;cursor:pointer;';
          icon.textContent = '📝';
          const titleEl = card.querySelector('h3, h4, .font-bold, .font-black');
          if (titleEl) titleEl.appendChild(icon);
        }
      } else {
        if (icon) icon.remove();
      }
    });
  }

  // Observer: wacht tot een modal verschijnt en injecteer dan het notitie-blok
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType !== 1) return;
        // Zoek modal met recept info
        const modal = node.classList && node.classList.contains('fixed') ? node : node.querySelector && node.querySelector('.fixed.inset-0');
        if (!modal) return;
        // Probeer recipeId te vinden via data-attribuut of titel in de modal
        let recipeId = modal.getAttribute('data-recipe-id');
        if (!recipeId) {
          // Fallback: zoek in de modal header naar een bekende recept-id via de wereldwijde recipes array
          const titleEl = modal.querySelector('h2');
          if (titleEl && typeof db !== 'undefined') {
            const titleText = titleEl.textContent.trim();
            const allRecipes = db.recipes ? db.recipes() : [];
            const found = allRecipes.find(r => titleText.includes(r.title));
            if (found) recipeId = found.id;
          }
        }
        if (recipeId) injectNoteBlock(modal, recipeId);
      });
    });
    updateNoteIcons();
  });

  // Start observer zodra DOM klaar is
  function startObserver() {
    observer.observe(document.body, { childList: true, subtree: true });
    updateNoteIcons();
    console.log('✅ DeWeekHap notities geladen');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserver);
  } else {
    startObserver();
  }
})();
