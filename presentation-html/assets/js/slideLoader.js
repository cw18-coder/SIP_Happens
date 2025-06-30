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
            // Load preferred theme first
            this.loadPreferredTheme();
            
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
        
        // Auto-close speaker notes when navigating to new slide
        this.autoCloseSpeakerNotes();
        
        // Trigger slide change event
        this.triggerSlideChangeEvent(slideNumber, slideData.config);
    }    updateSlideCounter(slideNumber) {
        // Update the bottom navigation counter
        const currentSlideNumber = document.getElementById('current-slide-number');
        const totalSlides = document.getElementById('total-slides');
        if (currentSlideNumber) currentSlideNumber.textContent = slideNumber;
        if (totalSlides) totalSlides.textContent = this.totalSlides;

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
    }    handleSpeakerNotes() {
        const speakerNotesPanel = document.getElementById('speaker-notes-content');
        
        if (speakerNotesPanel) {
            // Use the TL;DR content from our getSpeakerNotes function
            const tldrContent = this.getSpeakerNotes(this.currentSlide);
            speakerNotesPanel.innerHTML = tldrContent;
        }    }
    
    autoCloseSpeakerNotes() {
        const speakerNotesPanel = document.getElementById('speaker-notes-panel');
        if (speakerNotesPanel && speakerNotesPanel.classList.contains('active')) {
            speakerNotesPanel.classList.remove('active');
        }
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
            7: `
                <h3>TL;DR</h3>
                <ul>
                    <li><strong>Three main fund types:</strong> Equity (high growth, high risk), Debt (steady income, low risk), Hybrid (balanced mix)</li>
                    <li><strong>Equity sub-categories:</strong> Large cap (stable like Google), Mid cap (growth phase like Zomato), Small cap (startup potential)</li>
                    <li><strong>Debt fund spectrum:</strong> Liquid funds (Redis-like instant access) up to medium duration (PostgreSQL-like complexity)</li>
                    <li><strong>Hybrid allocation models:</strong> Conservative (80% debt), Balanced (50-50), Aggressive (70% equity)</li>
                    <li><strong>Tech stack analogy:</strong> Choose fund categories like selecting technologies - match complexity and risk to project requirements</li>
                </ul>
            `,
            8: `
                <h3>TL;DR</h3>
                <ul>
                    <li><strong>Performance metrics = investment KPIs:</strong> Like monitoring applications, use right indicators for informed decisions</li>
                    <li><strong>Equity fund analytics:</strong> Absolute returns vs benchmark, Sharpe ratio, consistency metrics (standard deviation, alpha/beta)</li>
                    <li><strong>Debt fund monitoring:</strong> YTM (expected returns), modified duration (rate sensitivity), credit quality analysis</li>
                    <li><strong>Universal factors:</strong> Portfolio turnover (trading frequency), expense ratios (cost optimization), AUM size (scalability)</li>
                    <li><strong>Holistic evaluation:</strong> Combine quantitative metrics with qualitative factors for complete fund assessment</li>
                </ul>
            `,
            12: `
                <h3>TL;DR</h3>
                <ul>
                    <li><strong>SIP = Investment DevOps:</strong> Automation removes emotional decisions and human errors from investing</li>
                    <li><strong>Rupee cost averaging:</strong> Buy more units when prices are low, fewer when high - automatic optimization</li>
                    <li><strong>Four key practices:</strong> Start early & small, increase annually, don't stop during downturns, use goal-based allocation</li>
                    <li><strong>SIP vs Lumpsum:</strong> SIP wins for most investors due to behavioral advantages and risk mitigation</li>
                    <li><strong>Compound amplification:</strong> Time multiplies small consistent investments into exponential wealth growth</li>
                </ul>
            `,
            20: `
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
    }toggleTheme() {
        const themes = ['light', 'dark'];
        const body = document.body;
        const presentationContainer = document.querySelector('.presentation-container');
        
        // Get current theme from data-theme attribute or default to light
        let currentTheme = body.getAttribute('data-theme') || 'light';
        
        // Find current theme index
        let currentIndex = themes.indexOf(currentTheme);
        
        // Move to next theme, or wrap to first if at end
        let nextIndex = (currentIndex + 1) % themes.length;
        let nextTheme = themes[nextIndex];
        
        // Apply theme transition class
        body.classList.add('theme-transition');
        if (presentationContainer) {
            presentationContainer.classList.add('theme-transition');
        }
        
        // Set new theme on both body and presentation container
        body.setAttribute('data-theme', nextTheme);
        if (presentationContainer) {
            presentationContainer.setAttribute('data-theme', nextTheme);
        }
        
        // Store theme preference
        localStorage.setItem('preferred-theme', nextTheme);
        
        // Remove transition class after animation
        setTimeout(() => {
            body.classList.remove('theme-transition');
            if (presentationContainer) {
                presentationContainer.classList.remove('theme-transition');
            }
        }, 500);
          console.log(`🎨 Theme changed to: ${nextTheme}`);
        
        // Update theme toggle icon
        this.updateThemeIcon(nextTheme);
        
        // Update tooltip to show current theme
        this.updateThemeTooltip(nextTheme);
    }updateThemeIcon(themeName) {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            // Update icon to represent the current theme
            // Light theme shows sun, dark theme shows moon
            const icon = themeName === 'light' ? '☀️' : '🌙';
            themeToggle.textContent = icon;
        }
    }

    updateThemeTooltip(themeName) {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            // Capitalize theme name and make it more readable
            const readableThemeName = this.getReadableThemeName(themeName);
            themeToggle.setAttribute('title', `Current theme: ${readableThemeName} (click to change)`);
        }
    }    getReadableThemeName(themeName) {
        const themeNames = {
            'light': 'Light',
            'dark': 'Dark'
        };
        return themeNames[themeName] || themeName;
    }    loadPreferredTheme() {
        const savedTheme = localStorage.getItem('preferred-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const presentationContainer = document.querySelector('.presentation-container');
          let theme = savedTheme;
        if (!theme) {
            // Default to dark if system prefers dark, otherwise light
            theme = systemPrefersDark ? 'dark' : 'light';
        }        
        // Set theme on both body and presentation container
        document.body.setAttribute('data-theme', theme);
        if (presentationContainer) {
            presentationContainer.setAttribute('data-theme', theme);
        }
        console.log(`🎨 Loaded theme: ${theme}`);
        
        // Update icon and tooltip to show current theme
        this.updateThemeIcon(theme);
        this.updateThemeTooltip(theme);
    }

    async nextSlide() {
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

        // Speaker notes toggle
        const speakerNotesToggle = document.getElementById('speaker-notes-toggle');
        const speakerNotesPanel = document.getElementById('speaker-notes-panel');
        const notesCloseBtn = document.getElementById('notes-close');

        if (speakerNotesToggle && speakerNotesPanel) {
            speakerNotesToggle.addEventListener('click', () => {
                speakerNotesPanel.classList.toggle('active');
            });
        }

        if (notesCloseBtn && speakerNotesPanel) {
            notesCloseBtn.addEventListener('click', () => {
                speakerNotesPanel.classList.remove('active');
            });
        }

        // Close speaker notes when clicking outside
        document.addEventListener('click', (e) => {
            if (speakerNotesPanel && 
                speakerNotesPanel.classList.contains('active') && 
                !speakerNotesPanel.contains(e.target) && 
                !speakerNotesToggle.contains(e.target)) {
                speakerNotesPanel.classList.remove('active');
            }
        });

        // Close speaker notes on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && speakerNotesPanel && speakerNotesPanel.classList.contains('active')) {
                speakerNotesPanel.classList.remove('active');
            }
        });        // Theme toggle functionality
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }        // Fullscreen toggle functionality
        const fullscreenToggle = document.getElementById('fullscreen-toggle');
        if (fullscreenToggle) {
            fullscreenToggle.addEventListener('click', () => this.toggleFullscreen());
        }

        // Listen for fullscreen changes to update icon
        document.addEventListener('fullscreenchange', () => this.updateFullscreenIcon());
        document.addEventListener('webkitfullscreenchange', () => this.updateFullscreenIcon());
        document.addEventListener('msfullscreenchange', () => this.updateFullscreenIcon());
        
        // Set initial fullscreen icon
        this.updateFullscreenIcon();    }    showSlideOverview() {
        const modal = document.createElement('div');
        modal.className = 'slide-overview-modal';
        modal.innerHTML = `
            <div class="overview-content">
                <div class="overview-header">
                    <h2>Slide Overview</h2>
                    <div class="overview-search">
                        <input type="text" id="slide-search" placeholder="Search slides..." class="search-input">
                        <button class="clear-search" id="clear-search" title="Clear search">×</button>
                    </div>
                    <button class="close-overview">&times;</button>
                </div>
                <div class="overview-stats">
                    <span id="overview-count">${this.slidesConfig.slides.length} slides total</span>
                    <span id="overview-filter-count" style="display: none;"></span>
                </div>
                <div class="overview-grid" id="overview-grid">
                    ${this.generateOverviewGrid()}
                </div>
            </div>
        `;        
        // Append to the correct container based on fullscreen state
        const isFullscreen = document.fullscreenElement;
        const container = isFullscreen ? document.fullscreenElement : document.body;
        container.appendChild(modal);

        // Search functionality
        const searchInput = modal.querySelector('#slide-search');
        const clearSearch = modal.querySelector('#clear-search');
        const overviewGrid = modal.querySelector('#overview-grid');
        const overviewCount = modal.querySelector('#overview-count');
        const filterCount = modal.querySelector('#overview-filter-count');

        const performSearch = (query) => {
            const slides = modal.querySelectorAll('.overview-slide');
            const searchTerm = query.toLowerCase().trim();
            let visibleCount = 0;

            slides.forEach(slide => {
                const title = slide.querySelector('.overview-slide-title').textContent.toLowerCase();
                const type = slide.querySelector('.overview-slide-type').textContent.toLowerCase();
                const slideNumber = slide.querySelector('.overview-slide-number').textContent;
                
                const matches = title.includes(searchTerm) || 
                               type.includes(searchTerm) || 
                               slideNumber.includes(searchTerm);
                
                if (matches || searchTerm === '') {
                    slide.style.display = 'block';
                    visibleCount++;
                } else {
                    slide.style.display = 'none';
                }
            });

            // Update counts
            if (searchTerm === '') {
                filterCount.style.display = 'none';
                overviewCount.textContent = `${this.slidesConfig.slides.length} slides total`;
            } else {
                filterCount.style.display = 'inline';
                filterCount.textContent = `${visibleCount} of ${this.slidesConfig.slides.length} slides found`;
                overviewCount.textContent = `Search: "${query}"`;
            }

            // Show clear button if there's text
            clearSearch.style.display = searchTerm ? 'block' : 'none';
        };

        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });

        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            performSearch('');
            searchInput.focus();
        });        // Focus search input for immediate typing
        setTimeout(() => searchInput.focus(), 100);

        // Helper function to remove modal from correct container
        const removeModal = () => {
            const currentContainer = modal.parentNode;
            if (currentContainer) {
                currentContainer.removeChild(modal);
            }
        };

        // Close modal handlers
        modal.querySelector('.close-overview').addEventListener('click', () => {
            removeModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                removeModal();
            }
        });

        // ESC key to close
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                removeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);        // Slide navigation from overview
        modal.querySelectorAll('.overview-slide').forEach(slide => {
            slide.addEventListener('click', (e) => {
                const slideNumber = parseInt(e.currentTarget.dataset.slide);
                this.goToSlide(slideNumber);
                removeModal();
                document.removeEventListener('keydown', escapeHandler);
            });
        });

        // Slide preview functionality
        // TEMPORARILY DISABLED: Preview system not rendering correctly
        // TODO: Fix slide preview rendering issues and re-enable
        // this.setupSlidePreview(modal);
    }    generateOverviewGrid() {
        return this.slidesConfig.slides.map((slide, index) => {
            const slideNumber = index + 1;
            const isActive = slideNumber === this.currentSlide;
            const previewId = `preview-${slideNumber}`;
            
            return `
                <div class="overview-slide ${isActive ? 'active' : ''}" 
                     data-slide="${slideNumber}"
                     data-preview-id="${previewId}">
                    <div class="overview-slide-header">
                        <div class="overview-slide-number">${slideNumber}</div>
                        <!-- TEMPORARILY DISABLED: Preview functionality -->
                        <!-- <button class="preview-btn" data-slide="${slideNumber}" title="Preview slide">
                            👁️
                        </button> -->
                    </div>
                    <div class="overview-slide-title">${slide.title}</div>
                    <div class="overview-slide-type">${slide.type}</div>
                    <div class="overview-slide-description">
                        ${slide.description || 'No description available'}
                    </div>
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
    }

    // TEMPORARILY DISABLED: Slide preview functionality
    // Issue: Preview content not rendering correctly - content scaling and layout issues
    // TODO: Fix preview rendering, CSS scaling, and re-enable this feature
    /*
    setupSlidePreview(modal) {
        // Create preview overlay
        const previewOverlay = document.createElement('div');
        previewOverlay.className = 'slide-preview-overlay';
        previewOverlay.style.display = 'none';
        previewOverlay.innerHTML = `
            <div class="slide-preview-container">
                <div class="slide-preview-header">
                    <h3 id="preview-title">Slide Preview</h3>
                    <button class="close-preview">&times;</button>
                </div>                <div class="slide-preview-content" id="preview-content">
                    <div class="preview-loading">Loading slide preview...</div>
                </div>
                <div class="slide-preview-footer">
                    <button class="preview-nav-btn" id="preview-prev">← Previous</button>
                    <span id="preview-info">Slide 1 of ${this.slidesConfig.slides.length}</span>
                    <button class="preview-nav-btn" id="preview-next">Next →</button>
                </div>
            </div>
        `;
        modal.appendChild(previewOverlay);

        let currentPreviewSlide = 1;        const showPreview = async (slideNumber) => {
            currentPreviewSlide = slideNumber;
            const slideConfig = this.slidesConfig.slides[slideNumber - 1];
            
            console.log('🔍 Showing preview for slide:', slideNumber, slideConfig);
            
            previewOverlay.style.display = 'flex';
            document.getElementById('preview-title').textContent = `${slideConfig.title} (Slide ${slideNumber})`;
            document.getElementById('preview-info').textContent = `Slide ${slideNumber} of ${this.slidesConfig.slides.length}`;
            
            // Load slide content
            try {
                let slideContent;
                if (slideConfig.file) {
                    console.log('📁 Loading slide content from file:', slideConfig.file);
                    slideContent = await this.loadSlideContent(slideConfig.file);
                    console.log('✅ Slide content loaded, length:', slideContent.length);
                } else {
                    console.log('🔧 Generating fallback content for slide');
                    slideContent = this.generateFallbackSlide(slideConfig);
                }
                  const previewContentDiv = document.getElementById('preview-content');
                previewContentDiv.innerHTML = slideContent;
                
                // Apply preview-specific styling
                previewContentDiv.classList.add('preview-slide-content');
                
                // Force visibility of slide elements in preview
                const slideElements = previewContentDiv.querySelectorAll('.slide');
                slideElements.forEach(slide => {
                    slide.style.display = 'block';
                    slide.style.visibility = 'visible';
                    slide.style.opacity = '1';
                });
                  console.log('✅ Preview content set successfully, slide elements:', slideElements.length);
                  } catch (error) {
                console.error('❌ Error loading preview content:', error);
                // Show fallback content instead of error
                const fallbackContent = this.generateFallbackSlide(slideConfig);
                document.getElementById('preview-content').innerHTML = fallbackContent;
                
                console.log('🔄 Showing fallback content for preview');
            }
            
            // Update navigation buttons
            document.getElementById('preview-prev').disabled = slideNumber === 1;
            document.getElementById('preview-next').disabled = slideNumber === this.slidesConfig.slides.length;
        };

        const hidePreview = () => {
            previewOverlay.style.display = 'none';
        };        // Preview button handlers
        modal.querySelectorAll('.preview-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent slide selection
                const slideNumber = parseInt(btn.dataset.slide);
                console.log('👁️ Preview button clicked for slide:', slideNumber);
                showPreview(slideNumber);
            });
        });

        // Preview overlay handlers
        previewOverlay.querySelector('.close-preview').addEventListener('click', hidePreview);
        
        previewOverlay.addEventListener('click', (e) => {
            if (e.target === previewOverlay) {
                hidePreview();
            }
        });

        // Preview navigation
        document.getElementById('preview-prev').addEventListener('click', () => {
            if (currentPreviewSlide > 1) {
                showPreview(currentPreviewSlide - 1);
            }
        });

        document.getElementById('preview-next').addEventListener('click', () => {
            if (currentPreviewSlide < this.slidesConfig.slides.length) {
                showPreview(currentPreviewSlide + 1);
            }
        });

        // Keyboard navigation in preview
        const previewKeyHandler = (e) => {
            if (previewOverlay.style.display === 'flex') {
                switch(e.key) {
                    case 'Escape':
                        hidePreview();
                        break;
                    case 'ArrowLeft':
                        if (currentPreviewSlide > 1) {
                            showPreview(currentPreviewSlide - 1);
                        }
                        break;
                    case 'ArrowRight':
                        if (currentPreviewSlide < this.slidesConfig.slides.length) {
                            showPreview(currentPreviewSlide + 1);
                        }
                        break;
                }
            }
        };
        
        document.addEventListener('keydown', previewKeyHandler);
        
        // Cleanup when modal closes
        const originalRemove = modal.remove;
        modal.remove = function() {
            document.removeEventListener('keydown', previewKeyHandler);
            originalRemove.call(this);
        };
    }
    */

    async loadSlideContent(slideFile) {
        const response = await fetch(`slides/${slideFile}`);
        if (!response.ok) {
            throw new Error(`Failed to load slide: ${response.status}`);
        }
        return await response.text();
    }

    generateFallbackSlide(slideConfig) {
        return `
            <div class="slide active">
                <div class="slide-content">
                    <h1 class="slide-title">${slideConfig.title}</h1>
                    ${slideConfig.subtitle ? `<p class="slide-subtitle">${slideConfig.subtitle}</p>` : ''}
                    <div class="slide-placeholder">
                        <div class="placeholder-icon">📄</div>
                        <p>This slide is configured but doesn't have content yet.</p>
                        <div class="slide-meta">
                            <p><strong>Type:</strong> ${slideConfig.type}</p>
                            <p><strong>Template:</strong> ${slideConfig.template || 'Not specified'}</p>
                            ${slideConfig.description ? `<p><strong>Description:</strong> ${slideConfig.description}</p>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    toggleFullscreen() {
        const presentationContainer = document.querySelector('.presentation-container');
        
        if (!document.fullscreenElement) {
            // Enter fullscreen
            if (presentationContainer.requestFullscreen) {
                presentationContainer.requestFullscreen();
            } else if (presentationContainer.webkitRequestFullscreen) {
                presentationContainer.webkitRequestFullscreen();
            } else if (presentationContainer.msRequestFullscreen) {
                presentationContainer.msRequestFullscreen();
            }
            console.log('🔲 Entering fullscreen mode');
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            console.log('🪟 Exiting fullscreen mode');
        }
    }    updateFullscreenIcon() {
        const fullscreenToggle = document.getElementById('fullscreen-toggle');
        if (fullscreenToggle) {
            // Update icon based on fullscreen state
            const isFullscreen = !!document.fullscreenElement;
            // Use more visible icons: arrows expanding for enter, arrows contracting for exit
            const icon = isFullscreen ? '🔽' : '🔲';
            fullscreenToggle.textContent = icon;
            fullscreenToggle.setAttribute('title', 
                isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'
            );
        }
    }
}

// Initialize slide loader when DOM is ready
let slideLoader;
document.addEventListener('DOMContentLoaded', () => {
    slideLoader = new SlideLoader();
});

// Export for global access
window.slideLoader = slideLoader;
