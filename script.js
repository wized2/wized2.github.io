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
  const panelRight = document.querySelector('.panel-right');
  const panelOverlay = document.createElement('div');
  panelOverlay.className = 'panel-overlay';
  document.body.appendChild(panelOverlay);

  function openPanel(panel) {
    panel.classList.add('active');
    panelOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closePanels() {
    panelLeft?.classList.remove('active');
    panelRight?.classList.remove('active');
    panelOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelector('.nav-toggle-left')?.addEventListener('click', () => openPanel(panelLeft));
  document.querySelector('.nav-toggle-right')?.addEventListener('click', () => openPanel(panelRight));
  document.querySelectorAll('.panel-close').forEach(btn => btn.addEventListener('click', closePanels));
  panelOverlay.addEventListener('click', closePanels);
  document.querySelectorAll('.panel-link').forEach(link => {
    link.addEventListener('click', closePanels);
  });

  // Nav toggle for mobile
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        const isMenu = icon.getAttribute('data-lucide') === 'menu';
        icon.setAttribute('data-lucide', isMenu ? 'x' : 'menu');
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          if (typeof lucide !== 'undefined') lucide.createIcons();
        }
      });
    });
  }
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
});
