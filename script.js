window.addEventListener('scroll', function () {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('links.json')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      document.querySelectorAll('[data-link]').forEach(a => {
        const id = a.dataset.link;
        const linkObj = data.links.find(l => l.id === id);
        if (!linkObj) return;

        a.href = linkObj.url;
        a.target = linkObj.target;
        a.rel = "noopener";
      });
    });

  const navbarCollapse = document.querySelector('.navbar-collapse');
  const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
    toggle: false
  });

  // Close menu when a nav link is clicked
  document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navbarCollapse.classList.contains('show')) {
        bsCollapse.hide();
      }
    });
  });

  // Close menu when clicking outside of it
  document.addEventListener('click', function (event) {
    const isClickInside = navbarCollapse.contains(event.target) ||
      event.target.classList.contains('navbar-toggler');

    if (!isClickInside && navbarCollapse.classList.contains('show')) {
      bsCollapse.hide();
    }
  });
})