// Main Presentation JavaScript
console.log('presentation.js loaded successfully'); // Debug log

// Test if basic JavaScript works
console.log('Testing basic JS execution'); // Debug log

class PresentationController {
    constructor() {
        console.log('PresentationController constructor called'); // Debug log
        this.currentSlide = 1;
        this.totalSlides = 25;
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
        // COMMENTED OUT - DARK MODE DISABLED
        // document.getElementById('theme-btn').addEventListener('click', () => this.toggleTheme());
        
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
                // COMMENTED OUT - DARK MODE DISABLED
                // this.toggleTheme();
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
        
        // Reset fund categories if navigating away from slide 7 (Fund Categories Deep Dive)
        if (window.fundCategories && slideNumber !== 7) {
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
        const tldrContent = {
            1: `
                <h3>TL;DR</h3>
                <ul>
                    <li><strong>Code-to-wealth journey:</strong> Apply programming concepts to build financial wealth systematically</li>
                    <li><strong>Tech professional advantage:</strong> Logical thinking and systematic approaches give you an investing edge</li>
                    <li><strong>Workshop promise:</strong> Learn practical, actionable mutual fund strategies using familiar tech analogies</li>
                    <li><strong>Outcome goal:</strong> Transform from investment beginner to confident portfolio architect</li>
                    <li><strong>Mindset shift:</strong> Treat investments like building scalable, maintainable code - methodical and long-term focused</li>
                </ul>
            `,
            2: `
                <h3>TL;DR</h3>
                <ul>
                    <li><strong>Finance education gap:</strong> Most investment content is boring and irrelevant to tech professionals</li>
                    <li><strong>Tech analogy approach:</strong> Use familiar concepts (APIs, frameworks, DevOps) to understand investing</li>
                    <li><strong>Practical focus:</strong> Actionable strategies over theoretical concepts - like learning to code by building projects</li>
                    <li><strong>Audience targeting:</strong> Content specifically designed for logical, systems-thinking tech minds</li>
                    <li><strong>Learning promise:</strong> Make investing as intuitive as choosing the right technology stack</li>
                </ul>
            `,
            3: `
                <h3>TL;DR</h3>
                <ul>
                    <li><strong>Mutual funds = service libraries:</strong> Pre-built, professionally managed investment components</li>
                    <li><strong>Fund manager = tech lead:</strong> Expert who makes day-to-day decisions while you focus on other priorities</li>
                    <li><strong>Portfolio diversification:</strong> Like microservices - spread risk across multiple components</li>
                    <li><strong>NAV (Net Asset Value):</strong> Real-time pricing like API endpoints - always current and accessible</li>
                    <li><strong>Cost efficiency:</strong> Expense ratios are like cloud costs - optimize but don't sacrifice quality for savings</li>
                </ul>
            `,
            4: `
                <h3>TL;DR</h3>
                <ul>
                    <li><strong>Investment Trinity:</strong> Goals, Time Horizon, and Risk Appetite must align for optimal results</li>
                    <li><strong>Unlike PM trade-offs:</strong> With proper time planning, you can optimize all three investment factors simultaneously</li>
                    <li><strong>Framework comparison:</strong> Traditional PM requires compromises, but investment frameworks allow compounding optimization</li>
                    <li><strong>Alignment matters:</strong> Mismatched goals, time, and risk lead to poor investment outcomes</li>
                    <li><strong>Time advantage:</strong> Unlike fixed project deadlines, time works in your favor with investments</li>
                </ul>
            `,
            5: `
                <h3>TL;DR</h3>
                <ul>
                    <li><strong>Time-based fund matching:</strong> Short-term goals need conservative funds, long-term goals can handle aggressive ones</li>
                    <li><strong>Risk-return spectrum:</strong> 1-3 years (4-7% returns), 3-7 years (8-12% returns), 7+ years (12-15% returns)</li>
                    <li><strong>Project analogy:</strong> Match investment tools to objectives like choosing tech stacks for different project requirements</li>
                    <li><strong>Goal categorization:</strong> Sprint goals (emergency funds), Release cycles (major purchases), Platform building (retirement)</li>
                    <li><strong>Triage system:</strong> Use time horizon as primary filter, then optimize for risk tolerance within that timeframe</li>
                </ul>
            `,
            6: `
                <h3>TL;DR</h3>
                <ul>
                    <li><strong>Three main fund types:</strong> Equity (high growth, high risk), Debt (steady income, low risk), Hybrid (balanced mix)</li>
                    <li><strong>Equity sub-categories:</strong> Large cap (stable like Google), Mid cap (growth phase like Zomato), Small cap (startup potential)</li>
                    <li><strong>Debt fund spectrum:</strong> Liquid funds (Redis-like instant access) up to medium duration (PostgreSQL-like complexity)</li>
                    <li><strong>Hybrid allocation models:</strong> Conservative (80% debt), Balanced (50-50), Aggressive (70% equity)</li>
                    <li><strong>Tech stack analogy:</strong> Choose fund categories like selecting technologies - match complexity and risk to project requirements</li>
                </ul>
            `,
            15: `
                <h3>TL;DR</h3>
                <ul>
                    <li><strong>SIP = Investment DevOps:</strong> Automation removes emotional decisions and human errors from investing</li>
                    <li><strong>Rupee cost averaging:</strong> Buy more units when prices are low, fewer when high - automatic optimization</li>
                    <li><strong>Four key practices:</strong> Start early & small, increase annually, don't stop during downturns, use goal-based allocation</li>
                    <li><strong>SIP vs Lumpsum:</strong> SIP wins for most investors due to behavioral advantages and risk mitigation</li>
                    <li><strong>Compound amplification:</strong> Time multiplies small consistent investments into exponential wealth growth</li>
                </ul>
            `,
            28: `
                <h3>TL;DR</h3>
                <ul>
                    <li><strong>Action items:</strong> Download investment app, calculate emergency fund target, set first SIP amount, schedule start date</li>
                    <li><strong>21-day challenge:</strong> Complete KYC (Day 1), start first SIP (Day 7), set up emergency fund (Day 14), share progress (Day 21)</li>
                    <li><strong>Ongoing support:</strong> Workshop materials, discussion group, monthly market updates, quarterly portfolio reviews</li>
                    <li><strong>Key momentum:</strong> Implementation within 7 days prevents analysis paralysis and ensures action</li>
                    <li><strong>Community aspect:</strong> Accountability through shared progress and group support system</li>
                </ul>
            `
        };
        
        return tldrContent[slideNumber] || `
            <h3>TL;DR</h3>
            <p>Key takeaways for slide ${slideNumber} - content coming soon!</p>
            <ul>
                <li>💡 This slide contains valuable investment insights</li>
                <li>🚀 Focus on practical application of concepts</li>
                <li>📚 Reference the full workshop materials for details</li>
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
    
    /* COMMENTED OUT - DARK MODE DISABLED
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
    */ // END COMMENTED OUT - DARK MODE DISABLED
    
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
