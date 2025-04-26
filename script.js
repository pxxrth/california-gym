// Navigation Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Fade-in Animation on Scroll
const fadeElements = document.querySelectorAll('.about-content, .program-card, .trainer-card, .membership-card, .testimonial');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for fade elements
fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Testimonial Carousel
const testimonials = [
    {
        quote: "This gym transformed my fitness journey. The trainers are exceptional and the facilities are world-class.",
        author: "David R."
    },
    {
        quote: "The best gym I've ever been to! The atmosphere is motivating and the equipment is top-notch.",
        author: "Sarah M."
    },
    {
        quote: "I've achieved my fitness goals faster than I ever imagined. The personal training is worth every penny.",
        author: "Michael T."
    }
];

const testimonialContainer = document.querySelector('.testimonial-carousel');
let currentTestimonial = 0;

const updateTestimonial = () => {
    const testimonial = testimonials[currentTestimonial];
    testimonialContainer.innerHTML = `
        <div class="testimonial">
            <i class="fas fa-quote-left"></i>
            <p>"${testimonial.quote}"</p>
            <h4>- ${testimonial.author}</h4>
        </div>
    `;
    
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
};

// Update testimonial every 5 seconds
setInterval(updateTestimonial, 5000);
updateTestimonial(); // Initial testimonial

// Form Submission
const contactForm = document.querySelector('.contact-form form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
    contactForm.appendChild(successMessage);
    
    // Clear form
    contactForm.reset();
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
});

// Instagram Feed Integration (Example using Instagram Basic Display API)
// Note: You'll need to replace with actual Instagram API credentials
const loadInstagramFeed = async () => {
    try {
        // This is a placeholder. You'll need to implement actual Instagram API integration
        const response = await fetch('YOUR_INSTAGRAM_API_ENDPOINT');
        const data = await response.json();
        
        const galleryGrid = document.querySelector('.gallery-grid');
        galleryGrid.innerHTML = data.images.map(image => `
            <img src="${image.url}" alt="Instagram post" loading="lazy">
        `).join('');
    } catch (error) {
        console.error('Error loading Instagram feed:', error);
        // Fallback to static images if API fails
        const galleryGrid = document.querySelector('.gallery-grid');
        galleryGrid.innerHTML = `
            <img src="assets/gallery1.jpg" alt="Gym interior" loading="lazy">
            <img src="assets/gallery2.jpg" alt="Training session" loading="lazy">
            <img src="assets/gallery3.jpg" alt="Equipment" loading="lazy">
            <img src="assets/gallery4.jpg" alt="Group class" loading="lazy">
        `;
    }
};

// Load Instagram feed when the page loads
window.addEventListener('load', loadInstagramFeed);

// Mobile Menu Toggle
const createMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    document.querySelector('.navbar .container').insertBefore(menuButton, navLinks);
    
    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuButton.querySelector('i').classList.toggle('fa-bars');
        menuButton.querySelector('i').classList.toggle('fa-times');
    });
};

// Initialize mobile menu if screen width is small
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Update mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-button')) {
            createMobileMenu();
        }
    } else {
        const menuButton = document.querySelector('.mobile-menu-button');
        if (menuButton) {
            menuButton.remove();
            document.querySelector('.nav-links').classList.remove('active');
        }
    }
});
