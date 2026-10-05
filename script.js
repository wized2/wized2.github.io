(() => {
  const form = document.querySelector('.note-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      // If Formspree id is placeholder, open WhatsApp instead
      if (form.action.includes('xpwnqzyd')) {
        e.preventDefault();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const msg = form.message.value.trim();
        const text = encodeURIComponent(`Hi Mudasir (wized2),\nName: ${name}\nEmail: ${email}\n\n${msg}`);
        window.open(`https://wa.me/923073477752?text=${text}`, '_blank', 'noopener');
      }
    });
  }

  // Active nav highlight
  const links = [...document.querySelectorAll('.nav-links a')];
  const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const id = '#' + en.target.id;
      links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === id));
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach((s) => io.observe(s));
})();
