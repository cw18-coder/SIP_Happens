// Main Presentation JavaScript
console.log('presentation.js loaded successfully'); // Debug log

// Test if basic JavaScript works
console.log('Testing basic JS execution'); // Debug log

class PresentationController {
    constructor() {
        console.log('PresentationController constructor called'); // Debug log
        this.currentSlide = 1;
        this.totalSlides = 28;
        this.slides = document.querySelectorAll('.slide');
        this.isFullscreen = false;
        this.currentTheme = 'dark';
        this.speakerNotesVisible = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateSlideCounter();
        this.updateProgressBar();
        this.initializeAnimations();
        this.setupAccessibility();
        this.preloadContent();
    }
    
    bindEvents() {
        // Navigation buttons
        document.getElementById('prev-btn').addEventListener('click', () => this.previousSlide());
        document.getElementById('next-btn').addEventListener('click', () => this.nextSlide());
        
        // Tool buttons
        document.getElementById('notes-btn').addEventListener('click', () => this.toggleSpeakerNotes());
        document.getElementById('fullscreen-btn').addEventListener('click', () => this.toggleFullscreen());
        document.getElementById('theme-btn').addEventListener('click', () => this.toggleTheme());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Touch/swipe support
        this.setupTouchNavigation();
        
        // Window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Prevent context menu on presentation
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.presentation-container')) {
                e.preventDefault();
            }
        });
    }
    
    handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSlide();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.totalSlides);
                break;
            case 'f':
            case 'F':
                e.preventDefault();
                this.toggleFullscreen();
                break;
            case 's':
            case 'S':
                e.preventDefault();
                this.toggleSpeakerNotes();
                break;
            case 't':
            case 'T':
                e.preventDefault();
                this.toggleTheme();
                break;
            case 'Escape':
                if (this.isFullscreen) {
                    this.toggleFullscreen();
                }
                if (this.speakerNotesVisible) {
                    this.toggleSpeakerNotes();
                }
                break;
        }
        
        // Number keys for direct slide navigation
        if (e.key >= '1' && e.key <= '9') {
            const slideNumber = parseInt(e.key);
            if (slideNumber <= this.totalSlides) {
                this.goToSlide(slideNumber);
            }
        }
    }
    
    setupTouchNavigation() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        const presentationContainer = document.querySelector('.presentation-container');
        
        presentationContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        presentationContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const minSwipeDistance = 50;
            
            // Horizontal swipe detection
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
            }
        });
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }
    
    goToSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > this.totalSlides) return;
        
        // Hide current slide
        const currentSlideElement = document.querySelector('.slide.active');
        if (currentSlideElement) {
            currentSlideElement.classList.remove('active');
        }
        
        // Show new slide
        const newSlideElement = document.getElementById(`slide-${slideNumber}`);
        if (newSlideElement) {
            newSlideElement.classList.add('active');
            this.animateSlideEntrance(newSlideElement, slideNumber);
        }
        
        this.currentSlide = slideNumber;
        this.updateSlideCounter();
        this.updateProgressBar();
        this.updateNavigationButtons();
        this.updateSpeakerNotes();
          // Analytics tracking
        this.trackSlideView(slideNumber);
        
        // Reset fund categories if navigating away from slide 6
        if (window.fundCategories && slideNumber !== 6) {
            window.fundCategories.reset();
        }
        
        // Auto-hide speaker notes on mobile
        if (window.innerWidth <= 768 && this.speakerNotesVisible) {
            this.toggleSpeakerNotes();
        }
    }
    
    animateSlideEntrance(slideElement, slideNumber) {
        // Remove any existing animation classes
        slideElement.classList.remove('slide-in-right', 'slide-in-left', 'slide-in-up', 'scale-in');
        
        // Add appropriate animation based on slide content
        if (slideNumber === 1) {
            slideElement.classList.add('scale-in');
        } else if (slideNumber % 3 === 0) {
            slideElement.classList.add('slide-in-up');
        } else {
            slideElement.classList.add('slide-in-right');
        }
        
        // Trigger staggered animations for child elements
        setTimeout(() => {
            const staggerElements = slideElement.querySelectorAll('.stagger-children');
            staggerElements.forEach(el => el.classList.add('animate-in'));
            
            const animateElements = slideElement.querySelectorAll('.animate-on-enter');
            animateElements.forEach(el => el.classList.add('animate-in'));
            
            // Special animations for specific slides
            this.handleSpecialSlideAnimations(slideNumber, slideElement);
        }, 200);
    }
    
    handleSpecialSlideAnimations(slideNumber, slideElement) {
        switch(slideNumber) {
            case 1: // Title slide
                const codeContent = slideElement.querySelector('.code-content');
                if (codeContent) {
                    setTimeout(() => {
                        codeContent.classList.add('animate-code');
                    }, 500);
                }
                break;
            case 28: // Final slide
                const terminalContent = slideElement.querySelector('.terminal-content');
                if (terminalContent) {
                    setTimeout(() => {
                        terminalContent.classList.add('animate-terminal');
                    }, 800);
                }
                break;
        }
    }
    
    updateSlideCounter() {
        const counter = document.getElementById('slide-counter');
        counter.textContent = `${this.currentSlide} / ${this.totalSlides}`;
        counter.classList.add('updating');
        setTimeout(() => counter.classList.remove('updating'), 300);
    }
    
    updateProgressBar() {
        const progressFill = document.getElementById('progress-fill');
        const progress = (this.currentSlide / this.totalSlides) * 100;
        progressFill.style.width = `${progress}%`;
    }
    
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        prevBtn.disabled = this.currentSlide === 1;
        nextBtn.disabled = this.currentSlide === this.totalSlides;
    }
    
    toggleSpeakerNotes() {
        const notesPanel = document.getElementById('speaker-notes');
        this.speakerNotesVisible = !this.speakerNotesVisible;
        
        if (this.speakerNotesVisible) {
            notesPanel.classList.add('visible');
            this.updateSpeakerNotes();
        } else {
            notesPanel.classList.remove('visible');
        }
        
        // Update button state
        const notesBtn = document.getElementById('notes-btn');
        notesBtn.classList.toggle('active', this.speakerNotesVisible);
    }
    
    updateSpeakerNotes() {
        if (!this.speakerNotesVisible) return;
        
        const notesContent = document.getElementById('notes-content');
        const notes = this.getSpeakerNotes(this.currentSlide);
        notesContent.innerHTML = notes;
    }
    
    getSpeakerNotes(slideNumber) {
        const speakerNotes = {
            1: `
                <h4>Title Slide - Opening Impact</h4>
                <ul>
                    <li><strong>Energy:</strong> Start with enthusiasm and confidence</li>
                    <li><strong>Tech Connection:</strong> Emphasize the coding metaphor throughout</li>
                    <li><strong>Audience Poll:</strong> "How many check GitHub more than bank balance?"</li>
                    <li><strong>Setting Expectations:</strong> This won't be boring finance</li>
                    <li><strong>Duration:</strong> 2-3 minutes maximum</li>
                </ul>
                <p><strong>Key Message:</strong> We're going to debug your financial portfolio like we debug code.</p>
            `,
            2: `
                <h4>Opening Hook - Engaging the Audience</h4>
                <ul>
                    <li><strong>Interactive Start:</strong> Ask for show of hands on investment experience</li>
                    <li><strong>Common Ground:</strong> Use shared tech experiences</li>
                    <li><strong>Pain Points:</strong> Address common finance lecture boringness</li>
                    <li><strong>Promise:</strong> Practical, actionable advice in tech language</li>
                    <li><strong>Warning Box:</strong> Use humor to lighten the mood</li>
                </ul>
                <p><strong>Transition:</strong> "Let's start with the basics - understanding the mutual fund architecture."</p>
            `,
            3: `
                <h4>The MF Stack - Core Concepts</h4>
                <ul>
                    <li><strong>Microservices Analogy:</strong> Spend time on this - it's the foundation</li>
                    <li><strong>Each Component:</strong> Explain clearly with real examples</li>
                    <li><strong>Fund Manager:</strong> Like trusting your tech lead</li>
                    <li><strong>Portfolio:</strong> Like a well-architected system</li>
                    <li><strong>NAV:</strong> Automatic versioning vs manual</li>
                    <li><strong>Costs:</strong> Like Azure bills - optimize but don't compromise</li>
                </ul>
                <p><strong>Key Point:</strong> Unlike servers, mutual funds scale UP, not crash at 3 AM!</p>
            `,
            4: `
                <h4>Three Pillars Framework - Investment Trinity</h4>
                <ul>
                    <li><strong>Triangle Analogy:</strong> Reference project management triangle</li>
                    <li><strong>Key Difference:</strong> In investing, you CAN have all three with time</li>
                    <li><strong>Goals:</strong> Like feature requirements - be specific</li>
                    <li><strong>Time:</strong> Like sprint planning - realistic timelines</li>
                    <li><strong>Risk:</strong> Like production tolerance - know your limits</li>
                    <li><strong>Architecture Metaphor:</strong> This triangle determines everything</li>
                </ul>
                <p><strong>Transition:</strong> "Now let's see how this applies to different time horizons."</p>
            `,
            5: `
                <h4>Goal-Time-Risk Matrix - Practical Application</h4>
                <ul>
                    <li><strong>Sprint Goals (Short-term):</strong> Conservative, like stable libraries</li>
                    <li><strong>Release Cycles (Medium-term):</strong> Balanced, like React vs new frameworks</li>
                    <li><strong>Platform Building (Long-term):</strong> Aggressive, like betting on AI early</li>
                    <li><strong>Examples:</strong> Use relatable goals for tech professionals</li>
                    <li><strong>Risk Logic:</strong> Explain why each time horizon requires different risk</li>
                </ul>
                <p><strong>Emphasis:</strong> Time horizon is the most important factor in determining strategy.</p>
            `
        };
        
        return speakerNotes[slideNumber] || `
            <h4>Slide ${slideNumber}</h4>
            <p>Speaker notes for this slide would go here. Key points to cover:</p>
            <ul>
                <li>Main concepts to emphasize</li>
                <li>Stories or examples to share</li>
                <li>Interaction opportunities</li>
                <li>Transition to next slide</li>
            </ul>
        `;
    }
    
    toggleFullscreen() {
        if (!this.isFullscreen) {
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }
    
    toggleTheme() {
        const themes = ['dark', 'light', 'high-contrast'];
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        this.currentTheme = themes[nextIndex];
        
        document.body.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('presentation-theme', this.currentTheme);
        
        // Add transition class for smooth theme change
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);
    }
    
    handleResize() {
        // Adjust layout for different screen sizes
        this.adjustLayoutForScreenSize();
        
        // Update font sizes for better readability
        this.adjustFontSizes();
        
        // Recalculate animations if needed
        this.recalculateAnimations();
    }
    
    adjustLayoutForScreenSize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Adjust slide padding based on screen size
        const slides = document.querySelectorAll('.slide');
        slides.forEach(slide => {
            if (width < 768) {
                slide.style.padding = 'var(--space-md)';
            } else if (width < 1024) {
                slide.style.padding = 'var(--space-lg)';
            } else {
                slide.style.padding = 'var(--space-xl)';
            }
        });
        
        // Adjust navigation for mobile
        const nav = document.querySelector('.presentation-nav');
        if (width < 768) {
            nav.classList.add('mobile-nav');
        } else {
            nav.classList.remove('mobile-nav');
        }
    }
    
    adjustFontSizes() {
        const root = document.documentElement;
        const width = window.innerWidth;
        
        if (width < 576) {
            root.style.fontSize = '14px';
        } else if (width < 768) {
            root.style.fontSize = '15px';
        } else {
            root.style.fontSize = '16px';
        }
    }
    
    recalculateAnimations() {
        // Reset and recalculate animation positions for responsive design
        const animatedElements = document.querySelectorAll('.animate-on-enter');
        animatedElements.forEach(el => {
            el.classList.remove('animate-in');
            setTimeout(() => {
                el.classList.add('animate-in');
            }, 100);
        });
    }
    
    initializeAnimations() {
        // Set up intersection observer for scroll-triggered animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        });
        
        document.querySelectorAll('.animate-on-enter').forEach(el => {
            observer.observe(el);
        });
    }
    
    setupAccessibility() {
        // ARIA labels for navigation
        document.getElementById('prev-btn').setAttribute('aria-label', 'Previous slide');
        document.getElementById('next-btn').setAttribute('aria-label', 'Next slide');
        document.getElementById('notes-btn').setAttribute('aria-label', 'Toggle speaker notes');
        document.getElementById('fullscreen-btn').setAttribute('aria-label', 'Toggle fullscreen');
        document.getElementById('theme-btn').setAttribute('aria-label', 'Toggle theme');
        
        // Keyboard navigation announcements
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);
        this.announcer = announcer;
        
        // Focus management
        this.setupFocusManagement();
    }
    
    setupFocusManagement() {
        // Ensure proper focus handling for keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                // Custom tab handling if needed
            }
        });
    }
    
    preloadContent() {
        // Preload next few slides for smooth transitions
        for (let i = this.currentSlide; i <= Math.min(this.currentSlide + 3, this.totalSlides); i++) {
            const slide = document.getElementById(`slide-${i}`);
            if (slide) {
                // Preload any images or content
                const images = slide.querySelectorAll('img[data-src]');
                images.forEach(img => {
                    img.src = img.dataset.src;
                });
            }
        }
    }
    
    trackSlideView(slideNumber) {
        // Analytics tracking (implement with your preferred analytics service)
        console.log(`Slide ${slideNumber} viewed`);
        
        // Example: Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'slide_view', {
                'slide_number': slideNumber,
                'presentation_id': 'mutual-fund-workshop'
            });
        }
    }
    
    // Public methods for external control
    getCurrentSlide() {
        return this.currentSlide;
    }
    
    getTotalSlides() {
        return this.totalSlides;
    }
    
    isLastSlide() {
        return this.currentSlide === this.totalSlides;
    }
    
    isFirstSlide() {
        return this.currentSlide === 1;
    }
}

// Fund Categories Interactive Functionality
console.log('About to define FundCategoriesController'); // Debug log

class FundCategoriesController {
    constructor() {
        console.log('FundCategoriesController initialized'); // Debug log
        this.currentView = 'overview'; // 'overview' or 'details'
        this.currentCategory = null;
        this.init();
    }
    
    init() {
        console.log('FundCategoriesController init called'); // Debug log
        this.bindEvents();
    }      bindEvents() {
        console.log('bindEvents called'); // Debug log
        
        // Test: Log all clicks to see if event delegation works
        document.addEventListener('click', (e) => {
            console.log('Document click detected:', e.target); // Debug log
        });
        
        // Main category card clicks and explore button clicks
        document.addEventListener('click', (e) => {
            const exploreBtn = e.target.closest('.explore-btn');
            const categoryCard = e.target.closest('.category-card');
            
            console.log('Click check - exploreBtn:', exploreBtn, 'categoryCard:', categoryCard); // Debug log
            
            if ((exploreBtn || categoryCard) && this.currentView === 'overview') {
                const targetCard = (exploreBtn || categoryCard).closest('.category-card');
                const category = targetCard.getAttribute('data-category');
                console.log('Clicked on category:', category); // Debug log
                this.showCategoryDetails(category);
                e.preventDefault(); // Prevent any default button behavior
            }
        });
        
        // Back button click
        document.addEventListener('click', (e) => {
            if (e.target.id === 'backToMain') {
                this.showOverview();
                e.preventDefault();
            }
        });
        
        // Escape key to go back
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentView === 'details') {
                this.showOverview();
                e.stopPropagation(); // Prevent other escape handlers
            }        });
    }
    
    showCategoryDetails(category) {
        console.log('showCategoryDetails called with:', category); // Debug log
        if (this.currentView === 'details') return;
        
        this.currentView = 'details';
        this.currentCategory = category;
        
        // Hide main categories
        const mainCategories = document.getElementById('mainCategories');
        console.log('mainCategories element:', mainCategories); // Debug log
        if (mainCategories) {
            mainCategories.style.display = 'none';
        }        
        // Show detailed view container
        const detailedView = document.getElementById('detailedView');
        console.log('detailedView element:', detailedView); // Debug log
        if (detailedView) {
            detailedView.style.display = 'block';
        }
        
        // Hide all category details first
        const allDetails = document.querySelectorAll('.detail-content');
        console.log('Found detail elements:', allDetails.length); // Debug log
        allDetails.forEach(detail => {
            detail.style.display = 'none';
        });
        
        // Show specific category details
        const categoryDetail = document.getElementById(`${category}Detail`);
        console.log(`Looking for element: ${category}Detail, found:`, categoryDetail); // Debug log
        if (categoryDetail) {
            categoryDetail.style.display = 'block';
        }
        
        // Smooth scroll to top of slide
        const slide = document.querySelector('[data-slide="6"]');
        if (slide) {
            slide.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    showOverview() {
        if (this.currentView === 'overview') return;
        
        this.currentView = 'overview';
        this.currentCategory = null;
        
        // Hide detailed view
        const detailedView = document.getElementById('detailedView');
        if (detailedView) {
            detailedView.style.display = 'none';
        }
          // Show main categories
        const mainCategories = document.getElementById('mainCategories');
        if (mainCategories) {
            mainCategories.style.display = 'grid';
        }
        
        // Smooth scroll to top of slide
        const slide = document.querySelector('[data-slide="6"]');
        if (slide) {
            slide.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Reset to overview when slide changes
    reset() {
        this.showOverview();
    }
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired'); // Debug log
    
    // Load saved theme
    const savedTheme = localStorage.getItem('presentation-theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    
    // Initialize presentation controller
    window.presentation = new PresentationController();
    console.log('PresentationController created'); // Debug log
    
    // Initialize fund categories controller
    window.fundCategories = new FundCategoriesController();
    console.log('FundCategoriesController created'); // Debug log
    
    // Handle fullscreen changes
    document.addEventListener('fullscreenchange', () => {
        window.presentation.isFullscreen = !!document.fullscreenElement;
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        fullscreenBtn.classList.toggle('active', window.presentation.isFullscreen);
    });
    
    // Handle visibility changes (for analytics)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('Presentation hidden');
        } else {
            console.log('Presentation visible');
        }
    });
    
    // Add loading complete class
    document.body.classList.add('loaded');
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PresentationController;
}

console.log('End of presentation.js file reached'); // Debug log
