// Navigation JavaScript
class NavigationController {
    constructor(presentation) {
        this.presentation = presentation;
        this.init();
    }
    
    init() {
        this.setupSlideNavigation();
        this.setupProgressTracking();
        this.setupGestureNavigation();
        this.setupKeyboardShortcuts();
    }
    
    setupSlideNavigation() {
        // Create slide navigation menu
        this.createSlideMenu();
        
        // Handle direct slide navigation
        this.setupDirectNavigation();
        
        // Setup slide overview mode
        this.setupOverviewMode();
    }
    
    createSlideMenu() {
        const menuHTML = `
            <div id="slide-menu" class="slide-menu">
                <div class="slide-menu-header">
                    <h3>Navigate to Slide</h3>
                    <button id="close-slide-menu" class="close-btn">&times;</button>
                </div>
                <div class="slide-menu-content">
                    ${this.generateSlideMenuItems()}
                </div>
            </div>
            <div id="slide-menu-overlay" class="slide-menu-overlay"></div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', menuHTML);
        
        // Bind menu events
        document.getElementById('close-slide-menu').addEventListener('click', () => this.hideSlideMenu());
        document.getElementById('slide-menu-overlay').addEventListener('click', () => this.hideSlideMenu());
        
        // Bind slide menu items
        document.querySelectorAll('.slide-menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const slideNumber = parseInt(e.target.dataset.slide);
                this.presentation.goToSlide(slideNumber);
                this.hideSlideMenu();
            });
        });
    }
    
    generateSlideMenuItems() {
        const slides = [
            { number: 1, title: "Title Slide", subtitle: "The Code to Wealth" },
            { number: 2, title: "Opening Hook", subtitle: "Why This Won't Be Boring" },
            { number: 3, title: "The MF Stack", subtitle: "Understanding the Basics" },
            { number: 4, title: "Three Pillars Framework", subtitle: "Goal-Time-Risk Trinity" },
            { number: 5, title: "Goal-Time-Risk Matrix", subtitle: "Matching Funds to Life Stories" },
            { number: 6, title: "Fund Categories", subtitle: "Choosing Your Tech Stack" },
            { number: 7, title: "Cricket Analogy", subtitle: "Investment Strategies" },
            { number: 8, title: "Bollywood Analogy", subtitle: "Fund Manager Performance" },
            { number: 9, title: "Hollywood Analogy", subtitle: "Investment Approaches" },
            { number: 10, title: "Performance Evaluation", subtitle: "Equity Funds KPIs" },
            { number: 11, title: "Performance Evaluation", subtitle: "Debt Funds Monitoring" },
            { number: 12, title: "Risk Evaluation", subtitle: "Portfolio Risk Debugging" },
            { number: 13, title: "Real Performance Data", subtitle: "Show Me the Numbers" },
            { number: 14, title: "Fund Selection", subtitle: "Code Review Process" },
            { number: 15, title: "SIP Strategy", subtitle: "DevOps of Investing" },
            { number: 16, title: "Common Mistakes", subtitle: "Production Bugs" },
            { number: 17, title: "Investment Architecture", subtitle: "Microservices Approach" },
            { number: 18, title: "Age-Based Strategy", subtitle: "Lifecycle Management" },
            { number: 19, title: "Emergency Fund", subtitle: "Disaster Recovery Plan" },
            { number: 20, title: "Tax Optimization", subtitle: "Legal Performance Hacks" },
            { number: 21, title: "Monitoring & Rebalancing", subtitle: "DevOps Pipeline" },
            { number: 22, title: "Power of Compounding", subtitle: "Exponential Growth" },
            { number: 23, title: "Action Items", subtitle: "Deployment Plan" },
            { number: 24, title: "Advanced Strategies", subtitle: "Level Up Techniques" },
            { number: 25, title: "Q&A Session", subtitle: "Debug Session" },
            { number: 26, title: "Resources & Tools", subtitle: "Learning Stack" },
            { number: 27, title: "Closing Thoughts", subtitle: "Final Commit" },
            { number: 28, title: "Thank You", subtitle: "Stay Connected" }
        ];
        
        return slides.map(slide => `
            <div class="slide-menu-item" data-slide="${slide.number}">
                <span class="slide-number">${slide.number}</span>
                <div class="slide-info">
                    <h4>${slide.title}</h4>
                    <p>${slide.subtitle}</p>
                </div>
                <span class="slide-status ${slide.number <= this.presentation.getCurrentSlide() ? 'completed' : 'pending'}">
                    ${slide.number <= this.presentation.getCurrentSlide() ? '✓' : '○'}
                </span>
            </div>
        `).join('');
    }
    
    showSlideMenu() {
        document.getElementById('slide-menu').classList.add('visible');
        document.getElementById('slide-menu-overlay').classList.add('visible');
        document.body.classList.add('menu-open');
        
        // Update slide statuses
        this.updateSlideStatuses();
        
        // Focus management
        document.getElementById('slide-menu').focus();
    }
    
    hideSlideMenu() {
        document.getElementById('slide-menu').classList.remove('visible');
        document.getElementById('slide-menu-overlay').classList.remove('visible');
        document.body.classList.remove('menu-open');
    }
    
    updateSlideStatuses() {
        document.querySelectorAll('.slide-status').forEach((status, index) => {
            const slideNumber = index + 1;
            if (slideNumber <= this.presentation.getCurrentSlide()) {
                status.classList.add('completed');
                status.classList.remove('pending');
                status.textContent = '✓';
            } else {
                status.classList.add('pending');
                status.classList.remove('completed');
                status.textContent = '○';
            }
        });
    }
    
    setupDirectNavigation() {
        // Add slide menu trigger to navigation
        const navTools = document.querySelector('.nav-tools');
        const menuButton = document.createElement('button');
        menuButton.id = 'menu-btn';
        menuButton.className = 'tool-btn';
        menuButton.title = 'Slide Menu (M)';
        menuButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        `;
        menuButton.addEventListener('click', () => this.showSlideMenu());
        navTools.insertBefore(menuButton, navTools.firstChild);
        
        // Add overview button
        const overviewButton = document.createElement('button');
        overviewButton.id = 'overview-btn';
        overviewButton.className = 'tool-btn';
        overviewButton.title = 'Overview Mode (O)';
        overviewButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
        `;
        overviewButton.addEventListener('click', () => this.toggleOverviewMode());
        navTools.insertBefore(overviewButton, navTools.firstChild);
    }
    
    setupOverviewMode() {
        this.overviewMode = false;
        this.overviewContainer = null;
    }
    
    toggleOverviewMode() {
        if (this.overviewMode) {
            this.exitOverviewMode();
        } else {
            this.enterOverviewMode();
        }
    }
    
    enterOverviewMode() {
        this.overviewMode = true;
        document.body.classList.add('overview-mode');
        
        // Create overview container
        this.overviewContainer = document.createElement('div');
        this.overviewContainer.className = 'overview-container';
        this.overviewContainer.innerHTML = this.generateOverviewHTML();
        
        document.body.appendChild(this.overviewContainer);
        
        // Bind overview slide clicks
        this.overviewContainer.querySelectorAll('.overview-slide').forEach(slide => {
            slide.addEventListener('click', (e) => {
                const slideNumber = parseInt(e.currentTarget.dataset.slide);
                this.presentation.goToSlide(slideNumber);
                this.exitOverviewMode();
            });
        });
        
        // Update overview button state
        document.getElementById('overview-btn').classList.add('active');
        
        // Scroll to current slide in overview
        setTimeout(() => {
            const currentOverviewSlide = this.overviewContainer.querySelector(`[data-slide="${this.presentation.getCurrentSlide()}"]`);
            if (currentOverviewSlide) {
                currentOverviewSlide.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }
    
    exitOverviewMode() {
        this.overviewMode = false;
        document.body.classList.remove('overview-mode');
        
        if (this.overviewContainer) {
            this.overviewContainer.remove();
            this.overviewContainer = null;
        }
        
        document.getElementById('overview-btn').classList.remove('active');
    }
    
    generateOverviewHTML() {
        const slides = Array.from({ length: this.presentation.getTotalSlides() }, (_, i) => i + 1);
        
        return `
            <div class="overview-header">
                <h2>Slide Overview</h2>
                <button class="overview-close" onclick="window.navigation.exitOverviewMode()">&times;</button>
            </div>
            <div class="overview-grid">
                ${slides.map(slideNumber => `
                    <div class="overview-slide ${slideNumber === this.presentation.getCurrentSlide() ? 'current' : ''}" 
                         data-slide="${slideNumber}">
                        <div class="overview-slide-number">${slideNumber}</div>
                        <div class="overview-slide-preview">
                            <div class="preview-content">
                                ${this.getSlidePreview(slideNumber)}
                            </div>
                        </div>
                        <div class="overview-slide-title">${this.getSlideTitle(slideNumber)}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    getSlidePreview(slideNumber) {
        const previews = {
            1: '<div class="preview-title">&lt; The Code to Wealth /&gt;</div>',
            2: '<div class="preview-icon">💻</div><div class="preview-text">Why This Won\'t Be Boring</div>',
            3: '<div class="preview-icon">🏗️</div><div class="preview-text">Microservices Architecture</div>',
            4: '<div class="preview-triangle">△</div><div class="preview-text">Goal-Time-Risk</div>',
            5: '<div class="preview-grid">⏰🎯🎲</div><div class="preview-text">Triage Matrix</div>',
            7: '<div class="preview-icon">📊</div><div class="preview-text">Fund Categories</div>',
            7: '<div class="preview-icon">🏏</div><div class="preview-text">Cricket Strategy</div>',
            8: '<div class="preview-icon">🎬</div><div class="preview-text">Bollywood Directors</div>',
            9: '<div class="preview-icon">🎭</div><div class="preview-text">Hollywood Strategies</div>',
            10: '<div class="preview-icon">📈</div><div class="preview-text">Equity KPIs</div>'
        };
        
        return previews[slideNumber] || `<div class="preview-icon">📄</div><div class="preview-text">Slide ${slideNumber}</div>`;
    }
    
    getSlideTitle(slideNumber) {
        const titles = {
            1: "Title Slide", 2: "Opening Hook", 3: "The MF Stack", 4: "Three Pillars", 5: "Goal-Time-Risk Matrix",
            7: "Fund Categories", 8: "Cricket Analogy", 9: "Bollywood Analogy", 10: "Hollywood Analogy", 11: "Equity Performance",
            11: "Debt Performance", 12: "Risk Evaluation", 13: "Real Data", 14: "Fund Selection", 15: "SIP Strategy",
            16: "Common Mistakes", 17: "Investment Architecture", 18: "Age-Based Strategy", 19: "Emergency Fund", 20: "Tax Optimization",
            21: "Monitoring", 22: "Compounding", 23: "Action Items", 24: "Advanced Strategies", 25: "Q&A", 26: "Resources", 27: "Closing", 28: "Thank You"
        };
        
        return titles[slideNumber] || `Slide ${slideNumber}`;
    }
    
    setupProgressTracking() {
        // Progress indicator
        this.createProgressIndicator();
        
        // Breadcrumb navigation
        this.createBreadcrumbs();
        
        // Time tracking
        this.setupTimeTracking();
    }
    
    createProgressIndicator() {
        const progressHTML = `
            <div id="detailed-progress" class="detailed-progress">
                <div class="progress-info">
                    <span class="progress-text">Progress</span>
                    <span class="progress-percentage">0%</span>
                </div>
                <div class="progress-bar-detailed">
                    <div class="progress-segments">
                        ${Array.from({ length: this.presentation.getTotalSlides() }, (_, i) => 
                            `<div class="progress-segment" data-slide="${i + 1}"></div>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
        
        document.querySelector('.presentation-nav').insertAdjacentHTML('afterend', progressHTML);
        
        // Bind segment clicks
        document.querySelectorAll('.progress-segment').forEach(segment => {
            segment.addEventListener('click', (e) => {
                const slideNumber = parseInt(e.target.dataset.slide);
                this.presentation.goToSlide(slideNumber);
            });
        });
    }
    
    updateProgressIndicator() {
        const currentSlide = this.presentation.getCurrentSlide();
        const totalSlides = this.presentation.getTotalSlides();
        const percentage = Math.round((currentSlide / totalSlides) * 100);
        
        document.querySelector('.progress-percentage').textContent = `${percentage}%`;
        
        // Update segments
        document.querySelectorAll('.progress-segment').forEach((segment, index) => {
            const slideNumber = index + 1;
            segment.classList.toggle('completed', slideNumber < currentSlide);
            segment.classList.toggle('current', slideNumber === currentSlide);
        });
    }
    
    createBreadcrumbs() {
        const breadcrumbHTML = `
            <div id="breadcrumbs" class="breadcrumbs">
                <div class="breadcrumb-item">
                    <span class="breadcrumb-text">Introduction</span>
                </div>
                <div class="breadcrumb-separator">›</div>
                <div class="breadcrumb-item current">
                    <span class="breadcrumb-text">Current Section</span>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', breadcrumbHTML);
    }
    
    updateBreadcrumbs() {
        const sections = this.getSections();
        const currentSlide = this.presentation.getCurrentSlide();
        const currentSection = this.getCurrentSection(currentSlide, sections);
        
        const breadcrumbs = document.getElementById('breadcrumbs');
        breadcrumbs.innerHTML = this.generateBreadcrumbHTML(currentSection, sections);
    }
    
    getSections() {
        return [
            { name: "Introduction", slides: [1, 2] },
            { name: "Fundamentals", slides: [3, 4, 5, 6] },
            { name: "Analogies", slides: [7, 8, 9] },
            { name: "Analysis", slides: [10, 11, 12, 13, 14] },
            { name: "Strategy", slides: [15, 16, 17, 18, 19, 20, 21] },
            { name: "Advanced", slides: [22, 23, 24] },
            { name: "Conclusion", slides: [25, 26, 27, 28] }
        ];
    }
    
    getCurrentSection(slideNumber, sections) {
        return sections.find(section => section.slides.includes(slideNumber)) || sections[0];
    }
    
    generateBreadcrumbHTML(currentSection, sections) {
        const currentIndex = sections.indexOf(currentSection);
        return sections.slice(0, currentIndex + 1).map((section, index) => {
            const isLast = index === currentIndex;
            return `
                <div class="breadcrumb-item ${isLast ? 'current' : ''}">
                    <span class="breadcrumb-text">${section.name}</span>
                </div>
                ${!isLast ? '<div class="breadcrumb-separator">›</div>' : ''}
            `;
        }).join('');
    }
    
    setupTimeTracking() {
        this.startTime = Date.now();
        this.slideStartTimes = {};
        this.slideStartTimes[1] = this.startTime;
        
        setInterval(() => {
            this.updateTimeDisplay();
        }, 1000);
    }
    
    updateTimeDisplay() {
        const elapsed = Date.now() - this.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        
        const timeDisplay = document.getElementById('time-display') || this.createTimeDisplay();
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    createTimeDisplay() {
        const timeHTML = `<div id="time-display" class="time-display">0:00</div>`;
        document.querySelector('.presentation-nav').insertAdjacentHTML('beforeend', timeHTML);
        return document.getElementById('time-display');
    }
    
    setupGestureNavigation() {
        // Mouse wheel navigation
        document.addEventListener('wheel', (e) => {
            if (e.ctrlKey || e.metaKey) return; // Allow zoom
            
            e.preventDefault();
            
            if (e.deltaY > 0) {
                this.presentation.nextSlide();
            } else {
                this.presentation.previousSlide();
            }
        }, { passive: false });
        
        // Pointer navigation
        this.setupPointerNavigation();
    }
    
    setupPointerNavigation() {
        const presentationContainer = document.querySelector('.presentation-container');
        
        presentationContainer.addEventListener('click', (e) => {
            // Ignore clicks on interactive elements
            if (e.target.closest('button, a, input, select, textarea')) return;
            
            const rect = presentationContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const width = rect.width;
            
            // Click on left third = previous, right third = next, middle = do nothing
            if (x < width / 3) {
                this.presentation.previousSlide();
            } else if (x > (2 * width) / 3) {
                this.presentation.nextSlide();
            }
        });
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Additional navigation shortcuts
            switch(e.key.toLowerCase()) {
                case 'm':
                    e.preventDefault();
                    this.showSlideMenu();
                    break;
                case 'o':
                    e.preventDefault();
                    this.toggleOverviewMode();
                    break;
                case 'g':
                    e.preventDefault();
                    this.promptGoToSlide();
                    break;
                case 'h':
                    e.preventDefault();
                    this.showHelp();
                    break;
            }
        });
    }
    
    promptGoToSlide() {
        const slideNumber = prompt(`Go to slide (1-${this.presentation.getTotalSlides()}):`);
        if (slideNumber && !isNaN(slideNumber)) {
            const num = parseInt(slideNumber);
            if (num >= 1 && num <= this.presentation.getTotalSlides()) {
                this.presentation.goToSlide(num);
            }
        }
    }
    
    showHelp() {
        const helpHTML = `
            <div class="help-overlay">
                <div class="help-modal">
                    <div class="help-header">
                        <h3>Keyboard Shortcuts</h3>
                        <button class="help-close">&times;</button>
                    </div>
                    <div class="help-content">
                        <div class="help-section">
                            <h4>Navigation</h4>
                            <div class="help-item">
                                <kbd>→</kbd> <kbd>Space</kbd> <span>Next slide</span>
                            </div>
                            <div class="help-item">
                                <kbd>←</kbd> <span>Previous slide</span>
                            </div>
                            <div class="help-item">
                                <kbd>Home</kbd> <span>First slide</span>
                            </div>
                            <div class="help-item">
                                <kbd>End</kbd> <span>Last slide</span>
                            </div>
                        </div>
                        <div class="help-section">
                            <h4>Presentation</h4>
                            <div class="help-item">
                                <kbd>F</kbd> <span>Toggle fullscreen</span>
                            </div>                            <div class="help-item">
                                <kbd>S</kbd> <span>Toggle key takeaways</span>
                            </div>
                            <div class="help-item">
                                <kbd>T</kbd> <span>Toggle theme</span>
                            </div>
                            <div class="help-item">
                                <kbd>M</kbd> <span>Slide menu</span>
                            </div>
                            <div class="help-item">
                                <kbd>O</kbd> <span>Overview mode</span>
                            </div>
                            <div class="help-item">
                                <kbd>G</kbd> <span>Go to slide</span>
                            </div>
                            <div class="help-item">
                                <kbd>H</kbd> <span>Show this help</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', helpHTML);
        
        const helpOverlay = document.querySelector('.help-overlay');
        const helpClose = document.querySelector('.help-close');
        
        helpClose.addEventListener('click', () => helpOverlay.remove());
        helpOverlay.addEventListener('click', (e) => {
            if (e.target === helpOverlay) helpOverlay.remove();
        });
        
        document.addEventListener('keydown', function closeHelp(e) {
            if (e.key === 'Escape' || e.key.toLowerCase() === 'h') {
                helpOverlay.remove();
                document.removeEventListener('keydown', closeHelp);
            }
        });
    }
    
    // Public methods
    onSlideChange(slideNumber) {
        this.updateProgressIndicator();
        this.updateBreadcrumbs();
        this.updateSlideStatuses();
        
        // Track slide time
        this.slideStartTimes[slideNumber] = Date.now();
    }
}

// Initialize navigation when presentation is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for presentation to be initialized
    setTimeout(() => {
        if (window.presentation) {
            window.navigation = new NavigationController(window.presentation);
            
            // Hook into slide changes
            const originalGoToSlide = window.presentation.goToSlide;
            window.presentation.goToSlide = function(slideNumber) {
                originalGoToSlide.call(this, slideNumber);
                window.navigation.onSlideChange(slideNumber);
            };
        }
    }, 100);
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationController;
}
