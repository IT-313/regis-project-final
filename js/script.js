document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Navigation Header Shadow on Scroll + Scroll-to-top button
    const header = document.querySelector('header');
    const scrollToTopButton = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', () => {
        if (header && window.scrollY > 50) {
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        } else if (header) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }

        if (scrollToTopButton) {
            scrollToTopButton.hidden = window.scrollY <= 300;
        }
    });

    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 2. Shopping Bag Counter & Cart Button Logic
    let cartCount = 0;
    const cartCountElement = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.btn-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;

            // Update the header counter
            if (cartCountElement) {
                cartCountElement.textContent = `(${cartCount})`;
            }

            // Button feedback animation
            const originalText = button.textContent;
            button.textContent = 'Added to Cart!';
            button.style.backgroundColor = '#486a3f'; // Accent green
            button.disabled = true;

            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = ''; // Reverts to CSS color
                button.disabled = false;
            }, 1200);
        });
    });

    // 3. Corporate Newsletter Form Logic
    const newsletterBtn = document.querySelector('.newsletter-input button');
    const newsletterInput = document.querySelector('.newsletter-input input');

    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = newsletterInput.value.trim();

            if (email !== '' && email.includes('@')) {
                alert(`Thank you for connecting with EcoNest! We have sent a confirmation email to ${email}.`);
                newsletterInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // 4. Smooth Anchor Scrolling + close the mobile menu after tapping a link
    const navLinks = document.querySelectorAll('.navbar-nav a');
    const mainNav = document.getElementById('mainNav');

    const closeMobileMenu = () => {
        if (mainNav && mainNav.classList.contains('show') && window.bootstrap) {
            bootstrap.Collapse.getOrCreateInstance(mainNav).hide();
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href') || '';
            const hashIndex = href.indexOf('#');

            // Only handle links that include a #section
            if (hashIndex !== -1) {
                const hash = href.slice(hashIndex);
                const targetSection = hash.length > 1 ? document.querySelector(hash) : null;

                // If the section exists on THIS page, scroll smoothly.
                // Otherwise (e.g. on services.html), let the browser go to index.html#section.
                if (targetSection) {
                    e.preventDefault();
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }

            closeMobileMenu();
        });
    });

});
