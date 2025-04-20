// Wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen
    initLoading();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize project filtering
    initProjectFiltering();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize particles background
    initParticles();
    
    // Initialize form submission
    initContactForm();
});

// Loading screen
function initLoading() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Remove from DOM after animation completes
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    const nav = document.querySelector('nav');
    
    // Handle navbar scroll state
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        navLinksContainer.classList.toggle('open');
    });
    
    // Active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Close mobile menu when link is clicked
            menuBtn.classList.remove('open');
            navLinksContainer.classList.remove('open');
            
            // Update active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 200;
        
        document.querySelectorAll('section').forEach(section => {
            if (
                section.offsetTop <= scrollPosition &&
                section.offsetTop + section.offsetHeight > scrollPosition
            ) {
                const currentId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Show/hide back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
}

// Typing effect for the header
function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    const roles = [
        'Game Developer',
        'Web Developer',
        'Graphic Designer',
        'App Developer'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 150;
    let erasingDelay = 75;
    let newTextDelay = 2000;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Erasing text
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = erasingDelay;
        } else {
            // Typing text
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 150;
        }
        
        // Handle role change
        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end of typing
            isDeleting = true;
            typingDelay = newTextDelay;
        } else if (isDeleting && charIndex === 0) {
            // Move to next role
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
        
        setTimeout(type, typingDelay);
    }
    
    // Start typing effect
    setTimeout(type, newTextDelay);
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use device preference
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && darkThemeMq.matches)) {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Project filtering
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                card.style.display = 'none';
                
                if (
                    filterValue === 'all' ||
                    card.getAttribute('data-category') === filterValue
                ) {
                    card.style.display = 'block';
                }
            });
            
            // Animate filtered projects
            setTimeout(() => {
                projectCards.forEach(card => {
                    if (card.style.display === 'block') {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }
                });
            }, 100);
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .about-content, .contact-content');
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        },
        {
            threshold: 0.1
        }
    );
    
    // Observe elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Particles background
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#4D61FC'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.3,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4D61FC',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form (simple validation)
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Normally you would send this data to a server
            // For demo purposes, we'll just log it and show a success message
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message (replace with your own success handling)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
} 