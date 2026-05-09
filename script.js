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
})