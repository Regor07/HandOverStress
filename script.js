
//////////////////////////////
// iOS / Safari Fix (IMPORTANT)
//////////////////////////////
window.addEventListener('pageshow', function () {
  const navbar = document.querySelector('.navbar-collapse');

  if (navbar && navbar.classList.contains('show')) {
    bootstrap.Collapse.getOrCreateInstance(navbar).hide();
  }
});


document.addEventListener('DOMContentLoaded', function () {

  //////////////////////////////
  // Navbar Scroll Effect
  //////////////////////////////
  const nav = document.querySelector('.navbar');

  window.addEventListener('scroll', function () {
    if (!nav) return;

    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });


  //////////////////////////////
  // Dynamic Links (links.json)
  //////////////////////////////
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
    })
    .catch(err => {
      console.warn("links.json failed to load:", err);
    });


  //////////////////////////////
  // Navbar Collapse (iOS safe)
  //////////////////////////////
  const navbarCollapse = document.querySelector('.navbar-collapse');

  if (!navbarCollapse) return;

  // Delay init slightly to avoid Safari layout issues
  setTimeout(() => {
    bootstrap.Collapse.getOrCreateInstance(navbarCollapse, {
      toggle: false
    });
  }, 50);


  //////////////////////////////
  // Close menu on nav link tap
  //////////////////////////////
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function () {
      const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);

      if (navbarCollapse.classList.contains('show')) {
        bsCollapse.hide();
      }
    });
  });


  //////////////////////////////
  // Close menu when clicking outside
  //////////////////////////////
  document.addEventListener('click', function (e) {
    const isInside = navbarCollapse.contains(e.target);
    const isToggler = e.target.closest('.navbar-toggler');

    if (!isInside && !isToggler && navbarCollapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
      bsCollapse.hide();
    }
  });

});