document.addEventListener("DOMContentLoaded", function() {
  // Initialize Locomotive Scroll
  const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
  });

  // Elements
  const upper = document.querySelector('.upper');
  const lowerNav = document.querySelector('.lower .navbar');
  const fixedNav = document.querySelector('.navbar.fixed');
  const menu = document.querySelector('.navbar.menu');
  const bg = document.querySelector('.bg');
  const menuHeight = menu.offsetHeight;
  const upperHeight = upper.offsetHeight - menuHeight;

  // Scroll Event
  scroll.on('scroll', (instance) => {
    const scrollTop = instance.scroll.y;

    let scrollRatio = scrollTop / upperHeight;
    if (scrollRatio > 1) scrollRatio = 1;

    if (scrollTop > upperHeight - menuHeight) {
      upper.classList.add('crop');
      lowerNav.style.display = 'none';
      fixedNav.style.display = 'block';
    } else {
      upper.classList.remove('crop');
      lowerNav.style.display = 'block';
      fixedNav.style.display = 'none';
    }

    // Adjust background opacity
    bg.style.opacity = 1 - scrollRatio * 1.3;
  });

  // Refresh on window resize
  window.addEventListener('resize', () => {
    scroll.update();
  });
});
