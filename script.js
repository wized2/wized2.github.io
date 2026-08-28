document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Theme toggle
  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
  function updateThemeIcon(theme) {
    const icon = themeToggle?.querySelector('i');
    if (icon) {
      icon.setAttribute('data-lucide', theme === 'light' ? 'moon' : 'sun');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  }

  // Panel controls
  const panelLeft = document.querySelector('.panel-left');
  const panelOverlay = panelLeft?.querySelector('.panel-overlay');

  function openPanel() {
    panelLeft.classList.add('active');
    panelOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closePanel() {
    panelLeft.classList.remove('active');
    panelOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelector('.nav-toggle')?.addEventListener('click', openPanel);
  document.querySelector('.panel-close')?.addEventListener('click', closePanel);
  panelOverlay?.addEventListener('click', closePanel);
  document.querySelectorAll('.panel-link').forEach(link => {
    link.addEventListener('click', closePanel);
  });

  // Nav toggle for mobile - removed as panel is now the main navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
});
