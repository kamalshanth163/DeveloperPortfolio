// Get the height of the nav bar
const nav = document.querySelector('nav');
const navHeight = nav.offsetHeight;

// Smooth Scroll
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default anchor behavior
    const targetId = this.getAttribute('href'); // Get the target section id
    const targetSection = document.querySelector(targetId); // Get the target section element
    const extraSpace = 40; // Space to adjust positioning

    // Scroll to the section smoothly, adjusting for the nav bar height
    window.scrollTo({
      top: targetSection.offsetTop - navHeight - extraSpace,
      behavior: 'smooth'
    });
  });
});

// Highlight active link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

// Function to remove active class from all nav links
function removeActiveClasses() {
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
}

// Function to add active class to the corresponding nav link
function highlightActiveLink() {
  let scrollY = window.pageYOffset + navHeight + 40; // Account for the nav height and extra space

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + sectionHeight;

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      const currentId = section.getAttribute('id');
      const currentLink = document.querySelector(`nav a[href="#${currentId}"]`);
      removeActiveClasses();
      if (currentLink) {
        currentLink.classList.add('active');
      }
    }
  });

  // Ensure home link is active if scrolling to the top of the page
  if (scrollY < navHeight + 40) {
    const homeLink = document.querySelector('nav a[href="#wall"]'); // Adjust if necessary
    if (homeLink) {
      removeActiveClasses();
      homeLink.classList.add('active');
    }
  }
}

// Listen for scroll events to highlight the active nav link
window.addEventListener('scroll', highlightActiveLink);

// Set initial active link on page load
window.addEventListener('load', () => {
  const homeLink = document.querySelector('nav a[href="#wall"]'); // Adjust if necessary
  if (homeLink) {
    removeActiveClasses();
    homeLink.classList.add('active');
  }
});
