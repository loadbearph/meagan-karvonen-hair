document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MOBILE MENU NAVIGATION
       ========================================================================== */
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
        });
    });


    /* ==========================================================================
       BEFORE/AFTER REVEAL SLIDER
       ========================================================================== */
    const revealContainer = document.querySelector('.reveal-inner');
    const afterWrapper = document.querySelector('.reveal-after-wrapper');
    const sliderHandle = document.querySelector('.reveal-slider-handle');
    const afterImage = afterWrapper ? afterWrapper.querySelector('.reveal-img') : null;

    if (revealContainer && afterWrapper && sliderHandle) {
        
        // Match the sub-image's width to the container size
        const setAfterImageSize = () => {
            const containerWidth = revealContainer.offsetWidth;
            if (afterImage) {
                afterImage.style.width = `${containerWidth}px`;
            }
        };

        // Initialize and listen to resize
        setAfterImageSize();
        window.addEventListener('resize', setAfterImageSize);

        // Core slider positioning calculation
        const moveSlider = (clientX) => {
            const rect = revealContainer.getBoundingClientRect();
            const positionX = clientX - rect.left;
            let percentage = (positionX / rect.width) * 100;

            // Constrain between 0% and 100%
            if (percentage < 0) percentage = 0;
            if (percentage > 100) percentage = 100;

            // Apply updates
            afterWrapper.style.width = `${percentage}%`;
            sliderHandle.style.left = `${percentage}%`;
        };

        // Desktop mouse movement hover/drag
        let isDragging = false;

        revealContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            moveSlider(e.clientX);
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        revealContainer.addEventListener('mousemove', (e) => {
            // Hover-to-slide or drag support
            if (isDragging || !isDragging) {
                moveSlider(e.clientX);
            }
        });

        // Mobile touch support
        revealContainer.addEventListener('touchstart', (e) => {
            isDragging = true;
            moveSlider(e.touches[0].clientX);
        });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        revealContainer.addEventListener('touchmove', (e) => {
            if (isDragging) {
                moveSlider(e.touches[0].clientX);
            }
        });
    }


    /* ==========================================================================
       BOOKING INQUIRY FORM & MODAL ACTIONS
       ========================================================================== */
    const inquiryForm = document.getElementById('inquiry-form');
    const successModal = document.getElementById('success-modal');
    const modalCloseBtn = document.querySelector('.modal-close');
    const modalOkBtn = document.querySelector('.modal-ok-btn');

    if (inquiryForm && successModal) {
        
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract Form Data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                history: document.getElementById('hair-history').value
            };

            // Log details for debugging/lead tracking
            console.log('Inquiry details captured:', formData);

            // Open the Success Modal
            successModal.classList.add('active');
            successModal.setAttribute('aria-hidden', 'false');

            // Reset form input values
            inquiryForm.reset();
        });

        // Close Modal Functions
        const closeModal = () => {
            successModal.classList.remove('active');
            successModal.setAttribute('aria-hidden', 'true');
        };

        modalCloseBtn.addEventListener('click', closeModal);
        modalOkBtn.addEventListener('click', closeModal);

        // Close on clicking the backdrop overlay
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                closeModal();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && successModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});
