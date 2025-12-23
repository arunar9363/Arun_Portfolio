(function () {
    // --- 1. Navigation Controls ---
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            // Remove active class from current button
            document.querySelector(".active-btn").classList.remove("active-btn");
            // Add active class to clicked button
            this.classList.add("active-btn");
            
            // Remove active class from current section
            document.querySelector(".active").classList.remove("active");
            // Add active class to the target section (matched by data-id)
            document.getElementById(button.dataset.id).classList.add("active");
        });
    });

    // --- 2. Theme Toggle ---
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });

    // --- 3. Certificate Download Button Handling ---
    // Prevents the card click event if the download button is clicked specifically
    document.addEventListener("DOMContentLoaded", function() {
        const certButtons = document.querySelectorAll(".cert-btn");
        certButtons.forEach(button => {
            button.addEventListener("click", function(e) {
                e.stopPropagation();
            });
        });
    });

    // --- 4. Skill Bar Animation (FIXED) ---
    // Reads the width defined in CSS (e.g., 95%) and animates from 0% to that width
    function animateSkillBars() {
        const skillBars = document.querySelectorAll(".progress span");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Get the width set in your CSS classes (.html, .css, etc.)
                    const computedStyle = window.getComputedStyle(entry.target);
                    const targetWidth = computedStyle.width;
                    
                    // Set a custom variable for the keyframe to use
                    entry.target.style.setProperty('--target-width', targetWidth);
                    
                    // Apply the animation
                    entry.target.style.animation = "skillAnimation 2s ease-in-out forwards";
                    
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        });

        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    animateSkillBars();

    // --- 5. Timeline Scroll Animation ---
    function initializeTimelineAnimations() {
        const timelineItems = document.querySelectorAll(".timeline-item");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = "slideInFromLeft 0.8s ease-out forwards";
                    observer.unobserve(entry.target);
                }
            });
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }
    initializeTimelineAnimations();

    // --- 6. Form Handling (Works for Contact & Services Forms) ---
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        form.addEventListener("submit", function(e) {
            // Note: We do NOT use e.preventDefault() here because we want Web3Forms 
            // to actually send the data. We just add visual feedback.
            
            const submitButton = this.querySelector('input[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.value;
                
                // Change button text to indicate loading
                submitButton.value = "Sending...";
                submitButton.disabled = true;
                
                // Reset button after 3 seconds (assuming the user is redirected or stays on page)
                setTimeout(() => {
                    submitButton.value = "Message Sent!";
                    setTimeout(() => {
                        submitButton.value = originalText;
                        submitButton.disabled = false;
                        this.reset(); // Clear the form fields
                    }, 2000);
                }, 3000);
            }
        });
    });

    // --- 7. Page Transition Loading Effect ---
    function showLoadingAnimation() {
        const activeSection = document.querySelector(".container.active");
        if (activeSection) {
            activeSection.style.opacity = "0";
            activeSection.style.transition = "opacity 0.4s ease-in-out";
            setTimeout(() => {
                activeSection.style.opacity = "1";
            }, 50);
        }
    }

    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", showLoadingAnimation);
    });

    // --- 8. Inject CSS Animations ---
    // This adds the necessary keyframes to the document
    const skillAnimationCSS = `
        @keyframes skillAnimation {
            from { width: 0; }
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

    const styleSheet = document.createElement("style");
    styleSheet.innerText = skillAnimationCSS;
    document.head.appendChild(styleSheet);

    // --- 9. Scroll Animation Optimization (Debounce) ---
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

    // Handle scroll animations for Projects and Certificates
    const handleScroll = debounce(() => {
        const cards = document.querySelectorAll('.project-item, .cert-item, .service-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 50 && rect.bottom > 0;
            
            // Only add animation class if it hasn't been animated yet
            if (isVisible && !card.style.animation) {
                card.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, 20);

    document.addEventListener('scroll', handleScroll);

    // --- 10. Initial Load Animations ---
    document.addEventListener('DOMContentLoaded', function() {
        const mainTitle = document.querySelector('.main-title h2');
        if (mainTitle) {
            mainTitle.style.animation = 'fadeInUp 1s ease-out';
        }
        
        // Trigger scroll handler once on load to show visible items
        handleScroll();
    });

    // --- 11. External Link Loading Effect ---
    // Adds a spinner to links when clicked
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function() {
            // Only apply if it's not a download link
            if (!this.getAttribute('download')) {
                this.style.opacity = '0.7';
                // Check if icon already exists to avoid double adding
                if(!this.querySelector('.fa-spinner')) {
                    const originalHTML = this.innerHTML;
                    // Just a subtle visual cue
                    this.style.transition = "opacity 0.3s";
                }
                
                // Reset after a few seconds (in case user comes back)
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 3000);
            }
        });
    });

})();