(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var y = document.getElementById("y");
    if (y) y.textContent = String(new Date().getFullYear());

    var header = document.querySelector(".site-header");
    function onScroll() {
      if (!header) return;
      header.classList.toggle("scrolled", window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    function mountIcons() {
      if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons({
          attrs: {
            "stroke-width": 1.75,
          },
        });
      }
    }
    mountIcons();
    // Lucide may load after defer order races
    setTimeout(mountIcons, 50);
    setTimeout(mountIcons, 300);
  });
})();
