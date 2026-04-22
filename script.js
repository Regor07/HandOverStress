fetch('links.json')
  .then(res => res.json())
  .then(links => {
    document.querySelectorAll('a[data-link]').forEach(a => {
      const key = a.getAttribute('data-link');
      if (links[key]) {
        a.href = links[key];
      }
    });
  });

window.addEventListener('scroll', function () {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});