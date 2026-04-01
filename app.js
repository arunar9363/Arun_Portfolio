(function () {
    // --- 1. Navigation Controls ---
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");

            // Re-trigger scroll animations when switching sections
            setTimeout(() => {
                triggerCardsAnimation();
                triggerTimelineAnimation();
            }, 100);
        });
    });

    // --- 2. Theme Toggle ---
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });

    // --- 3. Skill Bar Animation ---
    function animateSkillBars() {
        const skillBars = document.querySelectorAll(".progress span");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const computedStyle = window.getComputedStyle(entry.target);
                    const targetWidth = computedStyle.width;
                    entry.target.style.setProperty('--target-width', targetWidth);
                    entry.target.style.animation = "skillAnimation 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards";
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        skillBars.forEach(bar => observer.observe(bar));
    }
    animateSkillBars();

    // --- 4. Timeline Animation ---
    function initializeTimelineAnimations() {
        const timelineItems = document.querySelectorAll(".timeline-item");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("animated");
                        entry.target.style.animation = "slideInFromLeft 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards";
                    }, i * 120);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        timelineItems.forEach(item => observer.observe(item));
    }
    initializeTimelineAnimations();

    function triggerTimelineAnimation() {
        const timelineItems = document.querySelectorAll(".timeline-item");
        timelineItems.forEach((item, i) => {
            item.style.animation = "none";
            item.style.opacity = "0";
            void item.offsetWidth; // reflow
            setTimeout(() => {
                item.style.animation = "slideInFromLeft 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards";
            }, i * 120);
        });
    }

    // --- 5. Project & Cert Cards Animation ---
    function triggerCardsAnimation() {
        const cards = document.querySelectorAll('.project-item, .cert-item');
        cards.forEach((card, i) => {
            card.classList.remove("visible");
            void card.offsetWidth;
            setTimeout(() => {
                card.classList.add("visible");
            }, i * 100);
        });
    }

    // Run on first load for the home section
    setTimeout(triggerCardsAnimation, 200);

    // Also observe cards via IntersectionObserver for scroll-triggered effect
    function observeCards() {
        const cards = document.querySelectorAll('.project-item, .cert-item, .service-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        cards.forEach(card => observer.observe(card));
    }
    observeCards();

    // --- 6. Form Handling ---
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        form.addEventListener("submit", function() {
            const submitButton = this.querySelector('input[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.value;
                submitButton.value = "Sending...";
                submitButton.disabled = true;
                setTimeout(() => {
                    submitButton.value = "Message Sent!";
                    setTimeout(() => {
                        submitButton.value = originalText;
                        submitButton.disabled = false;
                        this.reset();
                    }, 2000);
                }, 3000);
            }
        });
    });

    // --- 7. Page Transition Effect ---
    function showLoadingAnimation() {
        const activeSection = document.querySelector(".container.active");
        if (activeSection) {
            activeSection.style.opacity = "0";
            activeSection.style.transition = "opacity 0.3s ease-in-out";
            setTimeout(() => { activeSection.style.opacity = "1"; }, 50);
        }
    }
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", showLoadingAnimation);
    });

    // --- 8. Inject Keyframe CSS ---
    const animationCSS = `
        @keyframes skillAnimation {
            from { width: 0; }
            to   { width: var(--target-width); }
        }
        @keyframes slideInFromLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to   { opacity: 1; transform: translateY(0); }
        }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = animationCSS;
    document.head.appendChild(styleSheet);

    // --- 9. Stagger skill tags on about section entry ---
    function animateSkillTags() {
        const tags = document.querySelectorAll('.skill-tag');
        tags.forEach((tag, i) => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(10px)';
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            tag.style.opacity = '1';
                            tag.style.transform = 'translateY(0)';
                        }, i * 60);
                        observer.unobserve(tag);
                    }
                });
            }, { threshold: 0.1 });
            observer.observe(tag);
        });
    }
    animateSkillTags();

    // --- 10. External Link Effect ---
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function() {
            if (!this.getAttribute('download')) {
                this.style.opacity = '0.7';
                this.style.transition = "opacity 0.3s";
                setTimeout(() => { this.style.opacity = '1'; }, 3000);
            }
        });
    });

    // --- 11. Typing animation for hero subtitle ---
    (function typeWriterEffect() {
        const roles = ["Full Stack Developer.", "MERN Stack Engineer.", "AI App Builder.", "LLM Integrator."];
        const el = document.querySelector('.header-content .right-header .name');
        if (!el) return;

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        // Find the role span or create one
        let roleSpan = el.querySelector('.role-text');
        if (!roleSpan) {
            roleSpan = document.createElement('span');
            roleSpan.className = 'role-text';
            roleSpan.style.color = 'var(--color-secondary)';
            roleSpan.style.display = 'block';
            roleSpan.style.fontSize = '2rem';
            roleSpan.style.fontWeight = '600';
            roleSpan.style.marginTop = '0.5rem';
            el.appendChild(roleSpan);
        }

        function type() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            roleSpan.textContent = currentRole.substring(0, charIndex);

            let speed = isDeleting ? 60 : 100;

            if (!isDeleting && charIndex === currentRole.length) {
                speed = 1800;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                speed = 400;
            }

            setTimeout(type, speed);
        }

        setTimeout(type, 1500);
    })();

})();