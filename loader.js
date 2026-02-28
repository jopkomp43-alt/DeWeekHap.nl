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
  jsScript.onload = function() {
    console.log('✅ Taalswitch geladen');
  };
  document.head.appendChild(jsScript);
  
  // Ensure body is visible immediately
  document.body.style.opacity = '1';
  document.body.style.visibility = 'visible';
  
  console.log('🎉 DeWeekHap loader klaar!');
})();