document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            navbar.style.padding = '0.4rem 0';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'var(--shadow-sm)';
            navbar.style.padding = '0.7rem 0';
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            // Simple toggle for demo - in production normally toggle specific class
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#FFFFFF';
                navLinks.style.padding = '2rem';
                navLinks.style.textAlign = 'center';
            }
        });
    }

    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-panel');
    const heroSlider = document.querySelector('.hero');
    let heroIndex = 0;
    let heroIntervalId = null;

    const setHeroSlide = (index) => {
        if (!heroSlides.length) {
            return;
        }

        heroIndex = (index + heroSlides.length) % heroSlides.length;

        heroSlides.forEach((slide, slideIndex) => {
            slide.classList.toggle('hero-panel--active', slideIndex === heroIndex);
        });
    };

    const startHeroAutoplay = () => {
        if (heroSlides.length < 2) {
            return;
        }

        clearInterval(heroIntervalId);
        heroIntervalId = setInterval(() => {
            setHeroSlide(heroIndex + 1);
        }, 5000);
    };

    if (heroSlides.length) {
        if (heroSlider) {
            heroSlider.addEventListener('mouseenter', () => {
                clearInterval(heroIntervalId);
            });

            heroSlider.addEventListener('mouseleave', () => {
                startHeroAutoplay();
            });
        }

        setHeroSlide(0);
        startHeroAutoplay();
    }

    // Animated Counters
    const counters = document.querySelectorAll('[data-target]');
    const speed = 200; // The lower the slower

    const animateCounter = (counter) => {
        if (counter.dataset.animated === 'true') {
            return;
        }

        const target = Number(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        let current = 0;

        const updateCount = () => {
            const inc = target / speed;

            if (current < target) {
                current = Math.min(target, Math.ceil(current + inc));
                counter.innerText = `${current}${suffix}`;
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = `${target}${suffix}`;
                counter.dataset.animated = 'true';
            }
        };

        updateCount();
    };

    // Intersection Observer for Counters
    if (counters.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });

        counters.forEach((counter) => {
            observer.observe(counter);
        });
    }
});
