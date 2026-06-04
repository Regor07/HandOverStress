/* ==============================
   iOS / Safari Navbar Fix
============================== */
window.addEventListener('pageshow', function () {
  const navbar = document.querySelector('.navbar-collapse');

  if (navbar && navbar.classList.contains('show')) {
    bootstrap.Collapse.getOrCreateInstance(navbar).hide();
  }
});


document.addEventListener('DOMContentLoaded', function () {
  /* ==============================
     Navbar Scroll Effect
  ============================== */
  const nav = document.querySelector('.navbar');

  window.addEventListener('scroll', function () {
    if (!nav) return;

    nav.classList.toggle('scrolled', window.scrollY > 80);
  });

  /* ==============================
     Dynamic Links
  ============================== */
  fetch('links.json')
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll('[data-link]').forEach(a => {
        const id = a.dataset.link;
        const linkObj = data.links.find(l => l.id === id);

        if (!linkObj) return;

        a.href = linkObj.url;
        a.target = linkObj.target || "_self";
        a.rel = "noopener";
      });
    })
    .catch(err => console.warn("links.json failed:", err));

  /* ==============================
     Navbar Collapse (safe init)
  ============================== */
  const navbarCollapse = document.querySelector('.navbar-collapse');

  if (navbarCollapse) {
    setTimeout(() => {
      bootstrap.Collapse.getOrCreateInstance(navbarCollapse, {
        toggle: false
      });
    }, 50);
  }

  /* ==============================
     Close menu on nav click
  ============================== */
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function () {
      if (!navbarCollapse) return;

      const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);

      if (navbarCollapse.classList.contains('show')) {
        bsCollapse.hide();
      }
    });
  });

  /* ==============================
     Close menu on outside click
  ============================== */
  document.addEventListener('click', function (e) {
    if (!navbarCollapse) return;

    const isInside = navbarCollapse.contains(e.target);
    const isToggler = e.target.closest('.navbar-toggler');

    if (!isInside && !isToggler && navbarCollapse.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
    }
  });

  /* ==============================
     Optional Contact Field Rules
  ============================== */
  const phone = document.getElementById('phone');
  const email = document.getElementById('email');
  const contactMethods = document.querySelectorAll('input[name="contact_method"]');

  function updateRequirements() {
    const selected = document.querySelector('input[name="contact_method"]:checked');

    if (phone) phone.required = false;
    if (email) email.required = false;

    if (!selected) return;

    if (selected.value === 'Voice' || selected.value === 'Text') {
      if (phone) phone.required = true;
    }

    if (selected.value === 'Email') {
      if (email) email.required = true;
    }
  }

  contactMethods.forEach(radio => {
    radio.addEventListener('change', updateRequirements);
  });

  updateRequirements();

});