    // JavaScript for animations
    document.addEventListener('DOMContentLoaded', function () {
        const contactForm = document.querySelector('.contact-form');
        const mapContainer = document.querySelector('.map-container iframe');

        // Show contact form and map with animation on scroll
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        observer.observe(contactForm);
        observer.observe(mapContainer);
    });