document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Sticky Header on Scroll
    // ==========================================
    const header = document.querySelector('header');
    const handleScrollHeader = () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.75rem 0';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
            header.style.background = 'rgba(8, 10, 14, 0.9)';
        } else {
            header.style.padding = '1.25rem 0';
            header.style.boxShadow = 'none';
            header.style.background = 'var(--glass-bg)';
        }
    };
    window.addEventListener('scroll', handleScrollHeader);
    handleScrollHeader(); // Initial run on load
    
    // ==========================================
    // 2. Navigation Scroll Spy & Active Links
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const scrollSpy = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // Handle case for the top of page (Hero section)
        if (window.scrollY < 200) {
            currentSectionId = 'home';
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Initial run on load
    
    // ==========================================
    // 3. Tab Switcher (CMF Development & DOE)
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetPaneId = btn.getAttribute('data-tab');
            
            // Remove active classes
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active classes to target
            btn.classList.add('active');
            const targetPane = document.getElementById(targetPaneId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
    
    // ==========================================
    // 4. Lightbox Modal for Images
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    // Select all image containers and images that can be expanded
    const triggers = document.querySelectorAll('.zoomable-img, .work-img-wrapper, .tab-media-wrapper, .story-img-container');
    
    triggers.forEach(trigger => {
        const img = trigger.tagName === 'IMG' ? trigger : trigger.querySelector('img');
        if (!img) return;

        // Ensure cursor points to expand option
        trigger.style.cursor = 'zoom-in';
        
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const src = img.getAttribute('src');
            const caption = img.getAttribute('alt') || 'Portfolio Asset Preview';
            
            lightboxImg.setAttribute('src', src);
            lightboxCaption.textContent = caption;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop scrolling background
        });
    });
    
    // Close lightbox functions
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
        setTimeout(() => {
            lightboxImg.setAttribute('src', ''); // Clear src after fade out
        }, 300);
    };
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxImg || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ==========================================
    // 5. Mobile Navigation Menu Toggle
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileToggle.classList.toggle('active');
            
            // Toggle menu slide/display
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
            } else {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = 'var(--bg-secondary)';
                navMenu.style.padding = '2rem';
                navMenu.style.borderBottom = '1px solid var(--border-color)';
                navMenu.style.gap = '1.5rem';
                navMenu.style.boxShadow = '0 10px 20px rgba(0,0,0,0.5)';
            }
        });
        
        // Hide mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                    mobileToggle.classList.remove('active');
                }
            });
        });
        
        // Close menu on document click
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && !navMenu.contains(e.target) && e.target !== mobileToggle) {
                navMenu.style.display = 'none';
                mobileToggle.classList.remove('active');
            }
        });
        
        // Handle window resize logic
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.style.display = 'flex';
                navMenu.style.position = 'static';
                navMenu.style.padding = '0';
                navMenu.style.borderBottom = 'none';
                navMenu.style.flexDirection = 'row';
                navMenu.style.gap = '2rem';
                navMenu.style.boxShadow = 'none';
                navMenu.style.background = 'none';
                mobileToggle.classList.remove('active');
            } else {
                navMenu.style.display = 'none';
            }
        });
    }
});
