// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Menu Toggle Functionality
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

// Toggle menu on button click
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
    menuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
  }
});

// Close menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    menuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
  }
});
