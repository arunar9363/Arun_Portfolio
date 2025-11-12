(function () {
    // Navigation controls
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        });
    });

    // Theme toggle
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });

    // Add click handlers for certificate downloads
    document.addEventListener("DOMContentLoaded", function() {
        const certButtons = document.querySelectorAll(".cert-btn");
        certButtons.forEach(button => {
            button.addEventListener("click", function(e) {
                e.stopPropagation();
                // The actual download will be handled by the href attribute
            });
        });
    });

    // Add smooth scrolling animation for skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll(".progress span");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = "skillAnimation 2s ease-in-out";
                }
            });
        });

        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    // Initialize skill bar animations
    animateSkillBars();

    // Add typing animation for main title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = "";
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Add form submission handling
    const contactForm = document.querySelector("form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            const submitButton = this.querySelector('input[type="submit"]');
            if (submitButton) {
                submitButton.value = "Sending...";
                submitButton.disabled = true;
                
                // Re-enable after 3 seconds (form will be submitted)
                setTimeout(() => {
                    submitButton.value = "Send Message";
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    }

    // Add certificate hover effects
    const certCards = document.querySelectorAll(".cert-card");
    certCards.forEach(card => {
        const overlay = card.querySelector(".cert-overlay");
        
        card.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-5px) scale(1.02)";
        });
        
        card.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0) scale(1)";
        });
    });

    // Add loading animation for page transitions
    function showLoadingAnimation() {
        const activeSection = document.querySelector(".container.active");
        if (activeSection) {
            activeSection.style.opacity = "0.5";
            setTimeout(() => {
                activeSection.style.opacity = "1";
            }, 300);
        }
    }

    // Enhance navigation with loading animation
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", showLoadingAnimation);
    });

    // Add scroll animations for timeline items
    function initializeTimelineAnimations() {
        const timelineItems = document.querySelectorAll(".timeline-item");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = "slideInFromLeft 0.8s ease-out";
                }
            });
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Initialize timeline animations
    initializeTimelineAnimations();

    // Add CSS animations for skill bars
    const skillAnimationCSS = `
        @keyframes skillAnimation {
            from { width: 0%; }
            to { width: var(--target-width); }
        }
        
        @keyframes slideInFromLeft {
            from { 
                opacity: 0;
                transform: translateX(-50px);
            }
            to { 
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    // Inject animations CSS
    const styleSheet = document.createElement("style");
    styleSheet.innerText = skillAnimationCSS;
    document.head.appendChild(styleSheet);

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        const controls = document.querySelectorAll('.control');
        const activeControl = document.querySelector('.control.active-btn');
        const currentIndex = Array.from(controls).indexOf(activeControl);
        
        if (e.key === 'ArrowDown' && currentIndex < controls.length - 1) {
            e.preventDefault();
            controls[currentIndex + 1].click();
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            controls[currentIndex - 1].click();
        }
    });

    // Add performance optimization for animations
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Optimized scroll handling
    const handleScroll = debounce(() => {
        // Add any scroll-based animations here
        const cards = document.querySelectorAll('.project-item, .cert-item');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                card.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    }, 16); // 60fps

    // Add scroll listener for animations
    document.addEventListener('scroll', handleScroll);

    // Initialize all animations on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Set initial animations
        const mainTitle = document.querySelector('.main-title h2');
        if (mainTitle) {
            mainTitle.style.animation = 'fadeInUp 1s ease-out';
        }
        
        // Initialize other components
        initializeTimelineAnimations();
        animateSkillBars();
    });

    // Add loading states for external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            this.innerHTML += ' <i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                this.style.opacity = '1';
                const spinner = this.querySelector('.fa-spinner');
                if (spinner) {
                    spinner.remove();
                }
            }, 2000);
        });
    });

})();
