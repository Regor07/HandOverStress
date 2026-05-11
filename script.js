document.addEventListener('DOMContentLoaded', function () {

  // ===== Navbar Scroll Effect =====
  const nav = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // ===== Dynamic Links =====
  fetch('links.json')
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll('[data-link]').forEach(a => {
        const id = a.dataset.link;
        const linkObj = data.links.find(l => l.id === id);
        if (!linkObj) return;

        a.href = linkObj.url;
        a.target = linkObj.target;
        a.rel = "noopener";
      });
    });

  // ===== Navbar Collapse Fix (iPad Safe Version) =====
  const navbarCollapse = document.querySelector('.navbar-collapse');
  if (!navbarCollapse) return;

  const collapseInstance = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);

  // Close when clicking nav link (touch-safe)
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        collapseInstance.hide();
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    const isInside = navbarCollapse.contains(e.target);
    const isToggler = e.target.closest('.navbar-toggler');

    if (!isInside && !isToggler && navbarCollapse.classList.contains('show')) {
      collapseInstance.hide();
    }
  });

});