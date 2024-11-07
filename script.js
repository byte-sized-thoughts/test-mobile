// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// Sticky Navigation
const navbar = document.getElementById('navbar');
const hero = document.getElementById('hero');
const heroOptions = {
  rootMargin: '-80px 0px 0px 0px',
};

const heroObserver = new IntersectionObserver(function (
  entries,
  heroObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  });
},
heroOptions);

heroObserver.observe(hero);
