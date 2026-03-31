/* ==========================================================================
   Archmint Interiors - JavaScript
   Interactivity & Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-menu-links a');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuOverlay.classList.toggle('active');
        // Simple animation for hamburger icon (optional enhancement)
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileMenuOverlay.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.transform = 'rotate(-45deg) translate(1px, -1px)';
            spans[0].style.backgroundColor = 'var(--clr-text-main)';
            spans[1].style.backgroundColor = 'var(--clr-text-main)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
            if (window.scrollY < 50) {
                spans[0].style.backgroundColor = '#fff';
                spans[1].style.backgroundColor = '#fff';
            }
        }
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
            if (window.scrollY < 50) {
                spans[0].style.backgroundColor = '#fff';
                spans[1].style.backgroundColor = '#fff';
            }
        });
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Unobserve after animation plays once
            }
        });
    }, observerOptions);

    // Initial check to animate elements already in view on load
    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Subtle Mouse Parallax on Hero ---
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (heroSection && heroContent) {
        heroSection.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            heroContent.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroContent.style.transform = `translate(0px, 0px)`;
            heroContent.style.transition = 'transform 0.5s ease out';
        });

        heroSection.addEventListener('mouseenter', () => {
            heroContent.style.transition = 'none'; // remove transition for smooth tracking
        });
    }

});
