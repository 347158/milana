const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');
const navLinks = document.querySelectorAll('.nav__link');
const contactForm = document.getElementById('contactForm');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Form handling (only if contact form exists)
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        console.log('Form submitted:', { name, email, message });

        alert('Bedankt voor je bericht! Ik neem zo snel mogelijk contact met je op.');
        contactForm.reset();
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Project filters (only on projects.html)
const projectFilters = document.querySelector('.project-filters');
if (projectFilters) {
    const filterButtons = projectFilters.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-list-item');
    const filterEmpty = document.querySelector('.filter-empty');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            let visibleCount = 0;

            projectItems.forEach(item => {
                const tech = item.dataset.tech;
                if (filter === 'all' || tech.includes(filter)) {
                    item.style.display = 'flex';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });

            if (filterEmpty) {
                filterEmpty.classList.toggle('visible', visibleCount === 0);
            }
        });
    });
}
