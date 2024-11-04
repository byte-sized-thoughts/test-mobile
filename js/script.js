// Smooth scroll functionality for navigation tabs
document.querySelectorAll('.nav-tab').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const offsetTop = target.offsetTop;

        window.scrollTo({
            top: offsetTop - 60, // Adjust for navigation height if necessary
            behavior: 'smooth'
        });
    });
});


// Navigation Tab Slider functionality
const navTabs = document.querySelectorAll('.nav-tab');
const navTabSlider = document.querySelector('.nav-tab-slider');
let activeTab = null;

function setSliderCss() {
    if (activeTab) {
        const navContainerRect = document.querySelector('.nav-container').getBoundingClientRect();
        const activeTabRect = activeTab.getBoundingClientRect();
        const left = activeTabRect.left - navContainerRect.left;
        const width = activeTabRect.width;

        navTabSlider.style.width = `${width}px`;
        navTabSlider.style.left = `${left}px`;
    }
}

function findCurrentTab() {
    let newActiveTab = null;
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const id = `#${section.getAttribute('id')}`;
            newActiveTab = document.querySelector(`.nav-tab[href="${id}"]`);
        }
    });

    if (newActiveTab !== activeTab && newActiveTab !== null) {
        activeTab = newActiveTab;
        setSliderCss();
    }
}

// Update slider on scroll and resize
window.addEventListener('scroll', () => {
    findCurrentTab();
});

window.addEventListener('resize', () => {
    setSliderCss();
});

// Initialize the slider position on page load
window.addEventListener('load', () => {
    findCurrentTab();
});

// Parallax effect and Navigation style adjustment
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;

    // Parallax effect
    document.querySelector('.graphic-boxes').style.setProperty('--parallax-offset-boxes', `${scrolled * -0.0}px`);
    document.querySelector('.circle-left').style.setProperty('--parallax-offset-circle-left', `${scrolled * -0.5}px`);
    document.querySelector('.circle-right').style.setProperty('--parallax-offset-circle-right', `${scrolled * -0.7}px`);

    // Adjust navigation styles based on Steffi's photo position
    const nav = document.querySelector('.main-nav');
    const steffiPhoto = document.querySelector('.profile-photo');
    const navHeight = nav.offsetHeight;

    // Get the bottom position of the photo relative to the viewport
    const steffiPhotoRect = steffiPhoto.getBoundingClientRect();
    const photoBottom = steffiPhotoRect.bottom;

    if (photoBottom <= navHeight) {
        nav.classList.add('scrolled-past-photo');
    } else {
        nav.classList.remove('scrolled-past-photo');
    }
});
