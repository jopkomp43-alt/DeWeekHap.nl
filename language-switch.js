// Language Switch Functionality for TheMealDB recipes

// Add language toggle to navbar
function addLanguageSwitch() {
  const navbar = document.querySelector('nav');
  if (!navbar) return;
  
  const langSwitch = document.createElement('div');
  langSwitch.className = 'flex items-center gap-2 ml-4';
  langSwitch.innerHTML = `
    <span class="text-sm text-slate-600">🌍</span>
    <button id="lang-nl" class="px-3 py-1 rounded-lg font-semibold transition-all bg-orange-500 text-white">
      NL
    </button>
    <button id="lang-en" class="px-3 py-1 rounded-lg font-semibold transition-all bg-slate-200 text-slate-600 hover:bg-slate-300">
      EN
    </button>
  `;
  
  // Insert before last child (mobile menu button)
  const navContent = navbar.querySelector('.container > div');
  if (navContent) {
    navContent.insertBefore(langSwitch, navContent.lastElementChild);
  }
  
  // Add click handlers
  document.getElementById('lang-nl').addEventListener('click', () => switchLanguage('nl'));
  document.getElementById('lang-en').addEventListener('click', () => switchLanguage('en'));
}

// Switch language
function switchLanguage(lang) {
  window.recipeLanguage = lang;
  
  // Update button styles
  const nlBtn = document.getElementById('lang-nl');
  const enBtn = document.getElementById('lang-en');
  
  if (lang === 'nl') {
    nlBtn.className = 'px-3 py-1 rounded-lg font-semibold transition-all bg-orange-500 text-white';
    enBtn.className = 'px-3 py-1 rounded-lg font-semibold transition-all bg-slate-200 text-slate-600 hover:bg-slate-300';
  } else {
    enBtn.className = 'px-3 py-1 rounded-lg font-semibold transition-all bg-orange-500 text-white';
    nlBtn.className = 'px-3 py-1 rounded-lg font-semibold transition-all bg-slate-200 text-slate-600 hover:bg-slate-300';
  }
  
  // Refresh current view if recipe detail is open
  const detailView = document.querySelector('[data-recipe-id]');
  if (detailView) {
    const recipeId = detailView.getAttribute('data-recipe-id');
    const recipe = [...RECIPES, ...mealDBCache].find(r => r.id === recipeId);
    if (recipe && recipe.source === 'mealdb') {
      // Refresh the recipe view with new language
      showRecipeDetail(recipe);
    }
  }
}

// Get translated recipe content
function getRecipeContent(recipe, field) {
  if (!recipe.source || recipe.source !== 'mealdb') {
    return recipe[field];
  }
  
  const lang = window.recipeLanguage || 'nl';
  
  if (lang === 'en') {
    // Return original English
    return recipe[field + 'EN'] || recipe[field];
  } else {
    // Return translated Dutch
    if (field === 'title') {
      return recipe.title;
    }
    if (field === 'ingr' || field === 'steps') {
      const original = recipe[field + 'EN'] || recipe[field];
      return translateText(original);
    }
    return recipe[field];
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addLanguageSwitch);
} else {
  setTimeout(addLanguageSwitch, 1000);
}

// Export for use in main app
window.getRecipeContent = getRecipeContent;
window.switchLanguage = switchLanguage;