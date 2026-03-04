/* =====================================================
   DENTCOB — Script Principal
   Swiss-Clean Premium Dental Clinic
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ──────────────────────────────────────────────
    // 1. NAVBAR — Sticky on scroll
    // ──────────────────────────────────────────────
    const navbar = document.querySelector('.navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // check on load

    // ──────────────────────────────────────────────
    // 2. MOBILE MENU
    // ──────────────────────────────────────────────
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ──────────────────────────────────────────────
    // 3. SMOOTH SCROLL
    // ──────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ──────────────────────────────────────────────
    // 4. SCROLL REVEAL — Intersection Observer
    // ──────────────────────────────────────────────
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ──────────────────────────────────────────────
    // 5. FLIP CARDS — Toggle buttons (mobile) + hover (desktop)
    // ──────────────────────────────────────────────
    const flipCards = document.querySelectorAll('.service-card-flip');

    flipCards.forEach(card => {
        const front = card.querySelector('.service-card-front');
        const back = card.querySelector('.service-card-back');

        // Create "+" button on front
        const openBtn = document.createElement('button');
        openBtn.className = 'flip-toggle-btn flip-open-btn';
        openBtn.setAttribute('aria-label', 'Ver más información');
        openBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
        front.appendChild(openBtn);

        // Create "✕" button on back
        const closeBtn = document.createElement('button');
        closeBtn.className = 'flip-toggle-btn flip-close-btn';
        closeBtn.setAttribute('aria-label', 'Cerrar información');
        closeBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
        back.appendChild(closeBtn);

        // Open: flip this card, close any other open card
        openBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            flipCards.forEach(c => {
                if (c !== card) c.classList.remove('flipped');
            });
            card.classList.add('flipped');
        });

        // Close: unflip this card
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.remove('flipped');
        });
    });

    // Prevent full-card tap from flipping on touch (buttons handle it)
    flipCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Only allow flip via buttons, not card body tap
            e.stopPropagation();
        });
    });

    // ──────────────────────────────────────────────
    // 6. TESTIMONIALS CAROUSEL
    // ──────────────────────────────────────────────
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');

    if (track && prevBtn && nextBtn) {
        let currentPage = 0;

        function getVisibleCards() {
            const width = window.innerWidth;
            if (width <= 600) return 1;
            if (width <= 900) return 2;
            return 3;
        }

        function getTotalPages() {
            const totalCards = track.children.length;
            const visible = getVisibleCards();
            return Math.ceil(totalCards / visible);
        }

        function updateCarousel() {
            const visibleCards = getVisibleCards();
            const totalPages = getTotalPages();

            // Wrap around
            if (currentPage >= totalPages) currentPage = 0;
            if (currentPage < 0) currentPage = totalPages - 1;

            const card = track.children[0];
            const gap = 28;
            const cardWidth = card.offsetWidth + gap;
            const offset = currentPage * visibleCards * cardWidth;

            track.style.transform = `translateX(-${offset}px)`;
        }

        prevBtn.addEventListener('click', () => {
            currentPage--;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentPage++;
            updateCarousel();
        });

        window.addEventListener('resize', () => updateCarousel());
        updateCarousel();
    }

    // ──────────────────────────────────────────────
    // 7. ANIMATED COUNTERS
    // ──────────────────────────────────────────────
    const counters = document.querySelectorAll('[data-counter]');

    function animateCounter(element, target, suffix = '') {
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current += increment;

            if (step >= steps) {
                element.textContent = Math.round(target).toLocaleString() + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.round(current).toLocaleString() + suffix;
            }
        }, duration / steps);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.counter, 10);
                const suffix = entry.target.dataset.suffix || '';
                animateCounter(entry.target, target, suffix);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ──────────────────────────────────────────────
    // 7. PARTICLE SYSTEM
    // ──────────────────────────────────────────────
    const particlesContainer = document.querySelector('.particles-container');

    if (particlesContainer) {
        const particleCount = window.innerWidth > 768 ? 35 : 12;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = (Math.random() * 20) + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // ──────────────────────────────────────────────
    // 8. ACTIVE NAV LINK TRACKING
    // ──────────────────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ──────────────────────────────────────────────
    // 9. WEBHOOK URL
    // ──────────────────────────────────────────────
    const WEBHOOK_URL = 'https://ploch.app.n8n.cloud/webhook/aa22a952-ab6b-4387-a970-39b8d5fe930a';

    // ──────────────────────────────────────────────
    // 10. BOOKING FORM — Submit to webhook
    // ──────────────────────────────────────────────
    const bookingForm = document.getElementById('booking-form');
    const bookingStatus = document.getElementById('booking-status');
    const bookingDateInput = document.getElementById('booking-date');

    // Set minimum date to today
    if (bookingDateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        bookingDateInput.min = `${yyyy}-${mm}-${dd}`;

        // Disable weekends (Fri, Sat, Sun) — clinic open L-J
        bookingDateInput.addEventListener('input', function () {
            const selected = new Date(this.value + 'T00:00:00');
            const day = selected.getDay(); // 0=Sun, 1=Mon...
            if (day === 0 || day === 5 || day === 6) {
                this.value = '';
                showStatus('Por favor selecciona un día de lunes a jueves.', 'error');
            }
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('booking-submit');
            const originalText = submitBtn.innerHTML;

            // Validate
            if (!bookingForm.checkValidity()) {
                bookingForm.reportValidity();
                return;
            }

            // Disable button and show loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                    <path d="M12 2v4m0 12v4m-7.07-3.93l2.83-2.83m8.48-8.48l2.83-2.83M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83"/>
                </svg>
                Enviando...
            `;

            // Collect form data
            const formData = {
                tipo: 'reserva_cita',
                nombre: document.getElementById('booking-name').value.trim(),
                telefono: document.getElementById('booking-phone').value.trim(),
                email: document.getElementById('booking-email').value.trim(),
                servicio: document.getElementById('booking-service').value,
                fecha: document.getElementById('booking-date').value,
                hora: document.getElementById('booking-time').value,
                mensaje: document.getElementById('booking-message').value.trim(),
                fecha_envio: new Date().toISOString(),
                pagina: window.location.href
            };

            try {
                const response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    showStatus('✅ ¡Cita solicitada con éxito! Te confirmaremos en menos de 24 horas.', 'success');
                    bookingForm.reset();
                } else {
                    showStatus('❌ Error al enviar. Por favor, inténtalo de nuevo o llámanos directamente.', 'error');
                }
            } catch (error) {
                showStatus('❌ Error de conexión. Por favor, inténtalo de nuevo o llámanos al 633 118 705.', 'error');
            }

            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
    }

    function showStatus(message, type) {
        if (!bookingStatus) return;
        bookingStatus.textContent = message;
        bookingStatus.className = 'booking-status ' + type;
        bookingStatus.style.display = 'block';

        // Auto-hide after 8s
        setTimeout(() => {
            bookingStatus.style.display = 'none';
        }, 8000);
    }

    // ──────────────────────────────────────────────
    // 11. CLICK TRACKING — Call & WhatsApp buttons
    // ──────────────────────────────────────────────
    const trackButtons = document.querySelectorAll('[data-track]');

    trackButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const trackData = {
                tipo: 'clic_boton',
                accion: btn.dataset.track,
                texto_boton: btn.textContent.trim(),
                fecha: new Date().toISOString(),
                pagina: window.location.href
            };

            // Send tracking in background (fire & forget)
            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(trackData)
            }).catch(() => { }); // silent fail — don't block navigation
        });
    });

    // ──────────────────────────────────────────────
    // 12. PRELOADER (optional smooth page reveal)
    // ──────────────────────────────────────────────
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

});
