document.lastScrollPosition = 0;
document.lastCentered = 0;
document.onWayTo = null;
let isScrolling = false;

document.addEventListener('scroll', () => {
  isScrolling = true;
  clearTimeout(window.scrollTimeout);
  window.scrollTimeout = setTimeout(() => {
    isScrolling = false;
  }, 100); // Adjust the timeout value as needed

  const direction = window.pageYOffset - document.lastScrollPosition > 0 ? 'down' : 'up';
  const sections = [...document.querySelectorAll('section')];
  if (!isScrolling && document.onWayTo === null) {
    const destIndex = direction === 'up' ? document.lastCentered - 1 : document.lastCentered + 1;
    if (destIndex >= 0 && destIndex < sections.length) {
      document.onWayTo = destIndex;
      window.scroll(0, sections[destIndex].offsetTop);
    }
  }
  sections.forEach((section, index) => {
    const threshold = 0.4; // Adjust the threshold value (0.4 represents 40% visibility)
    const sectionTop = section.offsetTop - window.innerHeight * threshold;
    const sectionBottom = section.offsetTop + section.offsetHeight - window.innerHeight * threshold;

    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
      document.lastCentered = index;
      section.classList.add('active');
      if (document.onWayTo === index) {
        document.onWayTo = null;
      }
    } else {
      section.classList.remove('active');
    }
  });
  document.lastScrollPosition = window.pageYOffset;
});