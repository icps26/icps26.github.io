// script.js

// Ensure GSAP and ScrollTrigger are loaded
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
  // Animate title with bounce effect
  gsap.fromTo(".icps-heading", {
    opacity: 0,
    y: 50
  }, {
    scrollTrigger: {
      trigger: ".icps-heading",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "bounce.out",
  });

  // Animate logo with rotation
  gsap.fromTo(".animate-logo", { // Ensure this class is actually on your logo in HTML
    opacity: 0,
    scale: 0.9,
    rotation: 360
  }, {
    scrollTrigger: {
      trigger: ".animate-logo",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 1.2,
    ease: "back.out(1.7)",
    stagger: 0.3,
  });

  // Animate About section with staggered effect
  gsap.fromTo(".about-title", {
    opacity: 0,
    y: 40
  }, {
    scrollTrigger: {
      trigger: ".about-title",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.fromTo(".about-text", {
    opacity: 0,
    y: 40
  }, {
    scrollTrigger: {
      trigger: ".about-text",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 1,
    y: 0,
    duration: 1.2,
    delay: 0.2,
    ease: "power3.out",
  });

  // Horizontal scroll of speakers with bounce effect
  const horizontalTrack = document.querySelector(".horizontal-scroll-track");
  const horizontalContainer = document.querySelector(".horizontal-scroll-container");

  if (horizontalTrack && horizontalContainer) { // Added null check for safety
    gsap.to(horizontalTrack, {
      x: () => -(horizontalTrack.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: horizontalContainer,
        start: "top top",
        end: () => "+=" + (horizontalTrack.scrollWidth - window.innerWidth),
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });
  }




  // Initialize Owl Carousel
  // Moved this directly inside the load event listener to ensure all JS is loaded
  $(".header-carousel").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
  });
});

// Fullscreen menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('fullscreen-menu');
  const closeBtn = document.querySelector('.close-btn');

  if (menuToggle && menu && closeBtn) {
    menuToggle.addEventListener('click', () => {
      menu.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
      menu.style.display = 'none';
    });

    // Optional: close menu on link click
    document.querySelectorAll('.fullscreen-menu .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.style.display = 'none';
      });
    });
  }
});

// Smooth scroll to footer (if needed, otherwise remove)
// This is already handled by Bootstrap's scrollspy or direct linking
// Keeping it here for demonstration, but consider if it's truly necessary
document.addEventListener('DOMContentLoaded', () => {
  const footerLink = document.querySelector("a.nav-link[href='#footer']");
  if (footerLink) {
    footerLink.addEventListener("click", function(e) {
      e.preventDefault();
      document.getElementById("footer").scrollIntoView({
        behavior: 'smooth'
      });
    });
  }
});


const menu = document.querySelector('.fullscreen-menu');
const toggleBtn = document.querySelector('.navbar-toggler');

toggleBtn.addEventListener('click', () => {
  menu.classList.toggle('active');
});



// Image hover effect for committee members
document.addEventListener('DOMContentLoaded', () => {
    const names = document.querySelectorAll('.hover-name');
    const image = document.getElementById('committee-image');
    const fallbackImage = 'img/loc.webp'; // A more generic fallback

    names.forEach(name => {
        name.addEventListener('mouseenter', () => {
            const newSrc = name.getAttribute('data-image') || fallbackImage;

            // Preload image to avoid flicker
            const imgPreload = new Image();
            imgPreload.src = newSrc;

            imgPreload.onload = () => {
                // Apply fade-out class, change src after a delay, then remove fade-out
                image.classList.add('fade-out');
                setTimeout(() => {
                    image.src = newSrc;
                    image.alt = name.textContent; // Update alt text
                    image.classList.remove('fade-out');
                }, 200); // This delay should match your CSS transition duration
            };

            imgPreload.onerror = () => {
                image.src = fallbackImage;
                image.alt = 'Image not available';
                image.classList.remove('fade-out'); // Ensure fade-out is removed even on error
            };
        });
        // Optional: Add mouseleave to revert to a default image or clear the image
        name.addEventListener('mouseleave', () => {
             image.classList.add('fade-out');
             setTimeout(() => {
                 image.src = 'img/loc.webp'; // Revert to initial placeholder
                 image.alt = 'Hover over a name to see image';
                 image.classList.remove('fade-out');
             }, 200);
         });
    });
    
});
// Smooth scroll for internal links






let sky, center

function dot(i) {
   const size = Math.round(Math.random() + 1)
   const root = document.createElement('span')
   root.style.top = center.y + 'px'
   root.style.left = center.x + 'px'
   root.classList.add('star', `size-${size}`, `axis-${i}`)
   return root
}

function clear() {
   sky.innerHTML = ''
}

function init() {
   sky = document.querySelector('#sky')
   center = {
      x: sky.clientWidth / 2,
      y: sky.clientHeight / 2,
   }
   clear()
   for (let i = 0; i < 360; i++) sky.appendChild(dot(i))
}

window.onload = init



