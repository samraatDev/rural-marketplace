// Bharat Rentals - Rural India Marketplace
// Interactive JavaScript

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// ===================================
// ANIMATED COUNTER FOR STATS
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// ===================================
// SERVICE CARD INTERACTIONS
// ===================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Service button click handlers
const serviceButtons = document.querySelectorAll('.service-btn');
serviceButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.closest('.service-card').getAttribute('data-category');
        showServiceModal(category);
    });
});

function showServiceModal(category) {
    // Create a simple alert for now - can be enhanced with a modal
    const categoryNames = {
        'energy': 'Electricity & Power',
        'vehicles': 'Autonomous Vehicles',
        'robotics': 'Robots & Automation',
        'ai': 'AI Infrastructure',
        'agriculture': 'Smart Agriculture',
        'future': 'Future Tech'
    };
    
    alert(`Exploring ${categoryNames[category]}!\n\nThis feature will show detailed rental options, pricing, and booking interface.\n\nComing soon!`);
}

// ===================================
// HUB-SPOKE ANIMATION
// ===================================
const spokeNodes = document.querySelectorAll('.spoke-node');

spokeNodes.forEach((node, index) => {
    node.addEventListener('mouseenter', function() {
        const village = this.querySelector('.node-label').textContent;
        showVillageInfo(village, this);
    });
});

function showVillageInfo(village, element) {
    // Add tooltip functionality
    const tooltip = document.createElement('div');
    tooltip.className = 'village-tooltip';
    tooltip.innerHTML = `
        <strong>${village}</strong><br>
        Status: Active<br>
        Services: 12 available
    `;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(10, 14, 39, 0.95);
        border: 1px solid rgba(255, 107, 53, 0.5);
        border-radius: 8px;
        padding: 12px;
        font-size: 0.875rem;
        z-index: 1000;
        pointer-events: none;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + window.scrollY + 'px';
    
    element.addEventListener('mouseleave', () => {
        tooltip.remove();
    }, { once: true });
}

// ===================================
// MAP MARKER INTERACTIONS
// ===================================
const mapMarkers = document.querySelectorAll('.map-marker');

mapMarkers.forEach(marker => {
    marker.addEventListener('click', function() {
        const state = this.getAttribute('data-state');
        showStateInfo(state);
    });
});

function showStateInfo(state) {
    const stateData = {
        'Uttar Pradesh': { villages: 150, hubs: 12, users: 3500 },
        'Bihar': { villages: 120, hubs: 10, users: 2800 },
        'Madhya Pradesh': { villages: 100, hubs: 8, users: 2200 },
        'Rajasthan': { villages: 130, hubs: 11, users: 3000 }
    };
    
    const data = stateData[state];
    if (data) {
        alert(`${state}\n\nVillages: ${data.villages}\nService Hubs: ${data.hubs}\nActive Users: ${data.users.toLocaleString()}`);
    }
}

// ===================================
// CTA BUTTON HANDLERS
// ===================================
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

ctaButtons.forEach(btn => {
    if (btn.textContent.includes('Get Started') || btn.textContent.includes('Start Renting')) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showRegistrationForm();
        });
    }
    
    if (btn.textContent.includes('Learn More') || btn.textContent.includes('Talk to an Expert')) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showContactForm();
        });
    }
    
    if (btn.textContent.includes('Explore Services')) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (btn.textContent.includes('Check Your Area')) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            checkCoverage();
        });
    }
});

function showRegistrationForm() {
    alert('Welcome to Bharat Rentals!\n\nRegistration form will open here.\n\nFeatures:\n- Mobile number verification\n- Village/area selection\n- Service preferences\n- Instant account creation\n\nComing soon!');
}

function showContactForm() {
    alert('Talk to Our Experts!\n\nContact form will open here.\n\nOur team is available 24/7 to help you:\n- Choose the right services\n- Understand pricing\n- Schedule deliveries\n- Answer any questions\n\nComing soon!');
}

function checkCoverage() {
    const pincode = prompt('Enter your PIN code to check service availability:');
    
    if (pincode) {
        // Simulate coverage check
        setTimeout(() => {
            const isAvailable = Math.random() > 0.3; // 70% chance of availability
            
            if (isAvailable) {
                alert(`Great news! 🎉\n\nBharat Rentals is available in your area (${pincode}).\n\nYou can access:\n- All rental services\n- Same-day delivery\n- 24/7 support\n\nSign up now to get started!`);
            } else {
                alert(`We're coming soon to ${pincode}! 🚀\n\nWe're rapidly expanding our network.\n\nEnter your details to:\n- Get notified when we launch\n- Receive exclusive early-bird offers\n- Help us prioritize your area`);
            }
        }, 1000);
    }
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(card);
});

// Observe step cards
document.querySelectorAll('.step-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(card);
});

// ===================================
// DYNAMIC GREETING BASED ON TIME
// ===================================
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Welcome';
    
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 17) greeting = 'Good Afternoon';
    else greeting = 'Good Evening';
    
    // Can be used to personalize the hero section
    console.log(`${greeting}! Welcome to Bharat Rentals`);
}

updateGreeting();

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Lazy load images when implemented
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log('%c🚀 Bharat Rentals - Empowering Rural India', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ for rural communities', 'color: #B8C1EC; font-size: 14px;');
console.log('%cHub & Spoke Model | Rental-First Economy', 'color: #F7931E; font-size: 12px;');

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Bharat Rentals Marketplace initialized successfully!');
    
    // Add any initialization code here
    // Example: Load user preferences, check authentication, etc.
});
