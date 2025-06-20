/**
 * Slide Loader - Manages dynamic loading of slide templates
 */
class SlideLoader {
    constructor() {
        this.slidesConfig = null;
        this.loadedSlides = new Map();
        this.currentSlide = 1;
        this.totalSlides = 0;
        this.init();
    }    async init() {
        try {
            await this.loadSlidesConfig();
            this.totalSlides = this.slidesConfig.slides.length;
            
            // Check URL for slide parameter, default to slide 1
            const urlParams = new URLSearchParams(window.location.search);
            const slideParam = urlParams.get('slide');
            const initialSlide = slideParam ? parseInt(slideParam, 10) : 1;
            
            // Validate slide number
            const slideToLoad = (initialSlide >= 1 && initialSlide <= this.totalSlides) ? initialSlide : 1;
            
            await this.loadSlide(slideToLoad);
            this.setupEventListeners();
            this.setupUrlNavigation();
            console.log(`✅ Slide loader initialized successfully - loaded slide ${slideToLoad}`);
        } catch (error) {
            console.error('❌ Failed to initialize slide loader:', error);
            this.showFallbackPresentation();
        }
    }

    async loadSlidesConfig() {
        try {
            const response = await fetch('./config/slides.json');
            if (!response.ok) {
                throw new Error('Failed to load slides configuration');
            }
            this.slidesConfig = await response.json();
            console.log('✅ Slides configuration loaded');
        } catch (error) {
            console.error('❌ Error loading slides config:', error);
            // Create a basic configuration as fallback
            this.slidesConfig = {
                presentation: {
                    title: "Mutual Fund Investing Workshop",
                    subtitle: "Decoding the Matrix: A Tech Professional's Guide to MF Investing",
                    totalSlides: 5
                },
                slides: [
                    { id: 1, title: "Title Slide", subtitle: "The Code to Wealth", type: "title" },
                    { id: 2, title: "Opening Hook", subtitle: "Why This Won't Be Boring", type: "content" },
                    { id: 3, title: "The MF Stack", subtitle: "Understanding the Basics", type: "content" },
                    { id: 4, title: "Three Pillars Framework", subtitle: "Goal-Time-Risk", type: "framework" },
                    { id: 5, title: "Thank You", subtitle: "Start Your Investment Journey", type: "thank-you" }
                ]
            };
            console.log('⚠️ Using fallback configuration');
            throw error;
        }
    }

    showFallbackPresentation() {
        const slideContainer = document.getElementById('slide-container');
        if (slideContainer) {
            slideContainer.innerHTML = `
                <div class="slide fallback-slide active">
                    <div class="slide-content">
                        <div class="slide-header">
                            <h1 class="slide-title">Mutual Fund Investing Workshop</h1>
                            <h2 class="slide-subtitle">Tech Professional's Guide to MF Investing</h2>
                        </div>
                        <div class="content-body">
                            <div class="fallback-content">
                                <div class="fallback-icon">🚀</div>
                                <h3>Presentation Loading Issue</h3>
                                <p>There seems to be an issue loading the full modular presentation. This could be due to:</p>
                                <ul>
                                    <li>Missing slide configuration files</li>
                                    <li>Browser security restrictions with file:// URLs</li>
                                    <li>Network connectivity issues</li>
                                </ul>
                                <div class="fallback-solutions">
                                    <h4>🔧 Solutions:</h4>
                                    <ol>
                                        <li><strong>Use a local web server:</strong> Run <code>start-presentation.bat</code></li>
                                        <li><strong>VS Code Live Server:</strong> Right-click index.html → "Open with Live Server"</li>
                                        <li><strong>Manual server:</strong> <code>python -m http.server 8000</code></li>
                                    </ol>
                                </div>
                                <div class="demo-content">
                                    <h4>📋 Workshop Content Preview:</h4>
                                    <div class="content-preview">
                                        <div class="preview-item">
                                            <strong>🎯 Goals:</strong> Learn systematic investment planning for tech professionals
                                        </div>
                                        <div class="preview-item">
                                            <strong>📊 Topics:</strong> MF basics, SIP strategies, portfolio construction, tax optimization
                                        </div>
                                        <div class="preview-item">
                                            <strong>💡 Approach:</strong> Tech analogies, practical examples, actionable takeaways
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Set up basic navigation for fallback
        const slideCounter = document.getElementById('slide-counter');
        if (slideCounter) {
            slideCounter.textContent = 'Fallback Mode';
        }
    }async loadSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > this.totalSlides) {
            console.warn(`Invalid slide number: ${slideNumber}`);
            return;
        }

        // Check if slide is already loaded
        if (this.loadedSlides.has(slideNumber)) {
            this.displaySlide(slideNumber);
            return;
        }

        try {
            const slideConfig = this.slidesConfig.slides[slideNumber - 1];
            const slideFileName = `slide-${slideNumber.toString().padStart(2, '0')}.html`;
            const slideUrl = `./slides/${slideFileName}`;

            const response = await fetch(slideUrl);
            if (!response.ok) {
                // If slide file doesn't exist, create a placeholder slide
                console.warn(`Slide file ${slideFileName} not found, creating placeholder`);
                this.createPlaceholderSlide(slideNumber, slideConfig);
                return;
            }

            const slideHtml = await response.text();
            this.loadedSlides.set(slideNumber, {
                html: slideHtml,
                config: slideConfig
            });

            this.displaySlide(slideNumber);
        } catch (error) {
            console.error(`Error loading slide ${slideNumber}:`, error);
            // Create placeholder instead of showing error
            this.createPlaceholderSlide(slideNumber, this.slidesConfig.slides[slideNumber - 1]);
        }
    }

    createPlaceholderSlide(slideNumber, slideConfig) {
        const placeholderHtml = `
            <div class="slide placeholder-slide" data-slide="${slideNumber}">
                <div class="slide-content">
                    <div class="slide-header">
                        <h1 class="slide-title">${slideConfig.title}</h1>
                        <h2 class="slide-subtitle">${slideConfig.subtitle || ''}</h2>
                    </div>
                    <div class="content-body">
                        <div class="placeholder-content">
                            <div class="placeholder-icon">🚧</div>
                            <h3>Slide Coming Soon</h3>
                            <p>This slide is part of the complete presentation and will be available soon.</p>
                            <div class="slide-info">
                                <div><strong>Slide:</strong> ${slideNumber} of ${this.totalSlides}</div>
                                <div><strong>Type:</strong> ${slideConfig.type}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="slide-notes">
                    <h3>Speaker Notes:</h3>
                    <p>Content for "${slideConfig.title}" will be added in this slide.</p>
                </div>
            </div>
        `;

        this.loadedSlides.set(slideNumber, {
            html: placeholderHtml,
            config: slideConfig
        });

        this.displaySlide(slideNumber);
    }    displaySlide(slideNumber) {
        const slideData = this.loadedSlides.get(slideNumber);
        if (!slideData) {
            console.error(`Slide ${slideNumber} not loaded`);
            return;
        }

        const slideContainer = document.getElementById('slide-container');
        if (!slideContainer) {
            console.error('Slide container not found');
            return;
        }

        // Hide current slide with animation
        const currentSlideElement = slideContainer.querySelector('.slide.active');
        if (currentSlideElement) {
            currentSlideElement.classList.remove('active');
            currentSlideElement.classList.add('slide-out');
        }

        // Update slide container
        slideContainer.innerHTML = slideData.html;
        
        // Add active class to new slide
        const newSlideElement = slideContainer.querySelector('.slide');
        if (newSlideElement) {
            newSlideElement.classList.add('active');
            newSlideElement.classList.add('slide-in');
        }

        // Update slide counter
        this.updateSlideCounter(slideNumber);
        
        // Update current slide
        this.currentSlide = slideNumber;
        
        // Update URL without refreshing the page
        this.updateUrl(slideNumber);
        
        // Update navigation state
        this.updateNavigation();
        
        // Handle speaker notes
        this.handleSpeakerNotes();
        
        // Trigger slide change event
        this.triggerSlideChangeEvent(slideNumber, slideData.config);
    }

    updateSlideCounter(slideNumber) {
        const slideCounter = document.getElementById('slide-counter');
        if (slideCounter) {
            slideCounter.textContent = `${slideNumber} / ${this.totalSlides}`;
        }

        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            const progress = (slideNumber / this.totalSlides) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');

        if (prevBtn) {
            prevBtn.disabled = this.currentSlide <= 1;
        }

        if (nextBtn) {
            nextBtn.disabled = this.currentSlide >= this.totalSlides;
        }
    }

    handleSpeakerNotes() {
        const notesElement = document.querySelector('.slide-notes');
        const speakerNotesPanel = document.getElementById('speaker-notes-content');
        
        if (notesElement && speakerNotesPanel) {
            speakerNotesPanel.innerHTML = notesElement.innerHTML;
        }
    }    async nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            await this.goToSlide(this.currentSlide + 1);
        }
    }

    async previousSlide() {
        if (this.currentSlide > 1) {
            await this.goToSlide(this.currentSlide - 1);
        }
    }

    async goToSlide(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
            await this.loadSlide(slideNumber);
        }
    }

    // Preload adjacent slides for smooth navigation
    async preloadAdjacentSlides() {
        const slidesToPreload = [];
        
        if (this.currentSlide > 1) {
            slidesToPreload.push(this.currentSlide - 1);
        }
        
        if (this.currentSlide < this.totalSlides) {
            slidesToPreload.push(this.currentSlide + 1);
        }

        for (const slideNumber of slidesToPreload) {
            if (!this.loadedSlides.has(slideNumber)) {
                try {
                    await this.loadSlide(slideNumber);
                } catch (error) {
                    console.warn(`Failed to preload slide ${slideNumber}:`, error);
                }
            }
        }
    }

    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
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
            }
        });

        // Navigation buttons
        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousSlide());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Slide overview
        const overviewBtn = document.getElementById('slide-overview');
        if (overviewBtn) {
            overviewBtn.addEventListener('click', () => this.showSlideOverview());
        }
    }

    showSlideOverview() {
        const modal = document.createElement('div');
        modal.className = 'slide-overview-modal';
        modal.innerHTML = `
            <div class="overview-content">
                <div class="overview-header">
                    <h2>Slide Overview</h2>
                    <button class="close-overview">&times;</button>
                </div>
                <div class="overview-grid">
                    ${this.generateOverviewGrid()}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal handlers
        modal.querySelector('.close-overview').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        // Slide navigation from overview
        modal.querySelectorAll('.overview-slide').forEach(slide => {
            slide.addEventListener('click', (e) => {
                const slideNumber = parseInt(e.currentTarget.dataset.slide);
                this.goToSlide(slideNumber);
                document.body.removeChild(modal);
            });
        });
    }

    generateOverviewGrid() {
        return this.slidesConfig.slides.map((slide, index) => {
            const slideNumber = index + 1;
            const isActive = slideNumber === this.currentSlide;
            return `
                <div class="overview-slide ${isActive ? 'active' : ''}" data-slide="${slideNumber}">
                    <div class="overview-slide-number">${slideNumber}</div>
                    <div class="overview-slide-title">${slide.title}</div>
                    <div class="overview-slide-type">${slide.type}</div>
                </div>
            `;
        }).join('');
    }

    triggerSlideChangeEvent(slideNumber, slideConfig) {
        const event = new CustomEvent('slideChange', {
            detail: {
                slideNumber,
                slideConfig,
                totalSlides: this.totalSlides
            }
        });
        document.dispatchEvent(event);
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-content">
                <h2>⚠️ Error</h2>
                <p>${message}</p>
                <button onclick="location.reload()">Retry</button>
            </div>
        `;
        document.body.appendChild(errorDiv);
    }

    showSlideError(slideNumber) {
        const slideContainer = document.getElementById('slide-container');
        if (slideContainer) {
            slideContainer.innerHTML = `
                <div class="slide error-slide">
                    <div class="slide-content">
                        <h1>Error Loading Slide ${slideNumber}</h1>
                        <p>The slide could not be loaded. Please check your connection and try again.</p>
                        <button onclick="slideLoader.loadSlide(${slideNumber})">Retry</button>
                    </div>
                </div>            `;
        }
    }

    // URL Navigation Methods
    updateUrl(slideNumber) {
        const url = new URL(window.location);
        url.searchParams.set('slide', slideNumber);
        window.history.replaceState({ slide: slideNumber }, '', url);
    }

    setupUrlNavigation() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.slide) {
                this.goToSlide(event.state.slide);
            } else {
                // If no state, check URL parameters
                const urlParams = new URLSearchParams(window.location.search);
                const slideParam = urlParams.get('slide');
                const slideNumber = slideParam ? parseInt(slideParam, 10) : 1;
                this.goToSlide(slideNumber);
            }
        });

        // Set initial state
        window.history.replaceState({ slide: this.currentSlide }, '', window.location);
    }}

// Initialize slide loader when DOM is ready
let slideLoader;
document.addEventListener('DOMContentLoaded', () => {
    slideLoader = new SlideLoader();
});

// Export for global access
window.slideLoader = slideLoader;
