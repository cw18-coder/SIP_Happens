// Minimal Fund Categories Controller - Using Slide 6 Pattern for All Slides
console.log('fund-categories-simple.js loaded');

// Compounding Slide Interaction (Slide 6) - THE GOLDEN STANDARD
function initializeCompoundingSlide() {
    const mainView = document.getElementById('compoundingMainView');
    const detailedView = document.getElementById('compoundingDetailedView');
    const backButton = document.getElementById('backToCompoundingMain');
    const cards = document.querySelectorAll('.compounding-card');
    
    if (!mainView || !detailedView || !backButton) return;
    
    // Handle card clicks
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const topic = card.getAttribute('data-topic');
            showCompoundingDetail(topic);
        });
    });
    
    // Handle back button
    backButton.addEventListener('click', () => {
        showCompoundingMain();
    });
    
    function showCompoundingDetail(topic) {
        // Hide main view
        mainView.style.display = 'none';
        detailedView.style.display = 'block';
        
        // Hide all detail contents
        const allDetails = document.querySelectorAll('.detail-content');
        allDetails.forEach(detail => {
            detail.style.display = 'none';
        });
        
        // Show specific detail
        const targetDetail = document.getElementById(topic + 'Detail');
        if (targetDetail) {
            targetDetail.style.display = 'block';
        }
    }
    
    function showCompoundingMain() {
        mainView.style.display = 'block';
        detailedView.style.display = 'none';
        
        // Hide all detail contents
        const allDetails = document.querySelectorAll('.detail-content');
        allDetails.forEach(detail => {
            detail.style.display = 'none';
        });
    }
}

// === SLIDE-SPECIFIC INITIALIZATION FUNCTIONS (Following Slide 6 Pattern) ===

// Slide 5 Initialization (Triage Matrix)
function initializeSlide5() {
    const mainView = document.getElementById('triageMainCategories');
    const detailedView = document.getElementById('triageDetailedView');
    const backButton = document.getElementById('backToTriageMain');
    const cards = document.querySelectorAll('.time-horizon-card .explore-btn-triage');
    
    if (!mainView || !detailedView || !backButton) return;
    
    console.log('Initializing Slide 5 with', cards.length, 'buttons');
    
    // Handle explore button clicks
    cards.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const timeCard = button.closest('.time-horizon-card');
            if (timeCard) {
                const timeframe = timeCard.getAttribute('data-timeframe');
                showTriageDetail(timeframe);
            }
        });
    });
    
    // Handle back button
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        showTriageMain();
    });
    
    function showTriageDetail(timeframe) {
        mainView.style.display = 'none';
        detailedView.style.display = 'block';
        
        // Hide all detail contents
        const allDetails = document.querySelectorAll('#triageDetailedView .detail-content');
        allDetails.forEach(detail => detail.style.display = 'none');
        
        // Show specific detail
        const targetDetail = document.getElementById(timeframe + 'Detail');
        if (targetDetail) targetDetail.style.display = 'block';
        
        console.log('Slide 5: Showing detail for', timeframe);
    }
    
    function showTriageMain() {
        mainView.style.display = 'grid';
        detailedView.style.display = 'none';
        console.log('Slide 5: Back to main view');
    }
}

// Slide 7 Initialization (Fund Categories)
function initializeSlide7() {
    const mainView = document.getElementById('mainCategories');
    const detailedView = document.getElementById('detailedView');
    const backButton = document.getElementById('backToMain');
    const cards = document.querySelectorAll('.category-card .explore-btn');
    
    if (!mainView || !detailedView || !backButton) return;
    
    console.log('Initializing Slide 7 with', cards.length, 'buttons');
    
    // Handle explore button clicks
    cards.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const categoryCard = button.closest('.category-card');
            if (categoryCard) {
                const category = categoryCard.getAttribute('data-category');
                showCategoryDetail(category);
            }
        });
    });
    
    // Handle back button
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        showCategoryMain();
    });
    
    function showCategoryDetail(category) {
        mainView.style.display = 'none';
        detailedView.style.display = 'block';
        
        // Hide all detail contents
        const allDetails = document.querySelectorAll('#detailedView .detail-content');
        allDetails.forEach(detail => detail.style.display = 'none');
        
        // Show specific detail
        const targetDetail = document.getElementById(category + 'Detail');
        if (targetDetail) targetDetail.style.display = 'block';
        
        console.log('Slide 7: Showing detail for', category);
    }
    
    function showCategoryMain() {
        mainView.style.display = 'grid';
        detailedView.style.display = 'none';
        console.log('Slide 7: Back to main view');
    }
}

// Slide 8 Initialization (Performance Evaluation Framework)
function initializeSlide8() {
    const mainView = document.getElementById('performanceMainCategories');
    const detailedView = document.getElementById('performanceDetailedView');
    const backButton = document.getElementById('backToPerformanceMain');
    const cards = document.querySelectorAll('#performanceMainCategories .category-card .explore-btn');
    
    if (!mainView || !detailedView || !backButton) return;
    
    console.log('Initializing Slide 8 with', cards.length, 'buttons');
    
    // Handle explore button clicks
    cards.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const categoryCard = button.closest('.category-card');
            if (categoryCard) {
                const category = categoryCard.getAttribute('data-category');
                showPerformanceDetail(category);
            }
        });
    });
    
    // Handle back button
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        showPerformanceMain();
    });
    
    function showPerformanceDetail(category) {
        mainView.style.display = 'none';
        detailedView.style.display = 'block';
        
        // Hide all detail contents
        const allDetails = document.querySelectorAll('#performanceDetailedView .detail-content');
        allDetails.forEach(detail => detail.style.display = 'none');
        
        // Show specific detail
        const targetDetail = document.getElementById(category + 'Detail');
        if (targetDetail) targetDetail.style.display = 'block';
        
        console.log('Slide 8: Showing detail for', category);
    }
    
    function showPerformanceMain() {
        mainView.style.display = 'grid';
        detailedView.style.display = 'none';
        console.log('Slide 8: Back to main view');
    }
}

// Slide 9 Initialization (Risk Evaluation Framework)
function initializeSlide9() {
    const mainView = document.getElementById('riskMainCategories');
    const detailedView = document.getElementById('riskDetailedView');
    const backButton = document.getElementById('backToRiskMain');
    const cards = document.querySelectorAll('#riskMainCategories .category-card .explore-btn');
    
    if (!mainView || !detailedView || !backButton) return;
    
    console.log('Initializing Slide 9 with', cards.length, 'buttons');
    
    // Handle explore button clicks
    cards.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const categoryCard = button.closest('.category-card');
            if (categoryCard) {
                const category = categoryCard.getAttribute('data-category');
                showRiskDetail(category);
            }
        });
    });
    
    // Handle back button
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        showRiskMain();
    });
    
    function showRiskDetail(category) {
        mainView.style.display = 'none';
        detailedView.style.display = 'block';
        
        // Hide all detail contents
        const allDetails = document.querySelectorAll('#riskDetailedView .detail-content');
        allDetails.forEach(detail => detail.style.display = 'none');
        
        // Show specific detail
        const targetDetail = document.getElementById(category + 'Detail');
        if (targetDetail) targetDetail.style.display = 'block';
        
        console.log('Slide 9: Showing detail for', category);
    }
    
    function showRiskMain() {
        mainView.style.display = 'grid';
        detailedView.style.display = 'none';
        console.log('Slide 9: Back to main view');
    }
}

// Slide 10 Initialization (Real Performance Data Examples)
function initializeSlide10() {
    const mainView = document.getElementById('performanceMainCategories');
    const detailedView = document.getElementById('performanceDetailedView');
    const backButton = document.getElementById('backToPerformanceMain');
    const cards = document.querySelectorAll('#performanceMainCategories .category-card .explore-btn');
    
    if (!mainView || !detailedView || !backButton) return;
    
    console.log('Initializing Slide 10 with', cards.length, 'buttons');
    
    // Handle explore button clicks
    cards.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const categoryCard = button.closest('.category-card');
            if (categoryCard) {
                const category = categoryCard.getAttribute('data-category');
                showSlide10Detail(category);
            }
        });
    });
    
    // Handle back button
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        showSlide10Main();
    });
    
    function showSlide10Detail(category) {
        mainView.style.display = 'none';
        detailedView.style.display = 'block';
        
        // Hide all detail contents
        const allDetails = document.querySelectorAll('#performanceDetailedView .detail-content');
        allDetails.forEach(detail => detail.style.display = 'none');
        
        // Show specific detail
        const targetDetail = document.getElementById(category + 'Detail');
        if (targetDetail) targetDetail.style.display = 'block';
        
        console.log('Slide 10: Showing detail for', category);
    }
    
    function showSlide10Main() {
        mainView.style.display = 'grid';
        detailedView.style.display = 'none';
        console.log('Slide 10: Back to main view');
    }
}

// Slide 11 Initialization (Fund Selection Checklist)
function initializeSlide11() {
    const mainView = document.getElementById('fundSelectionMainCategories');
    const detailedView = document.getElementById('fundSelectionDetailedView');
    const backButton = document.getElementById('backToFundSelectionMain');
    const cards = document.querySelectorAll('#fundSelectionMainCategories .category-card .explore-btn');

    if (!mainView || !detailedView || !backButton) {
        console.log('Slide 11 elements not found, skipping initialization');
        return;
    }

    console.log('Initializing Slide 11 with', cards.length, 'buttons');

    // Add click event listeners to explore buttons
    cards.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.category-card');
            const category = card.getAttribute('data-category');
            if (category) {
                showSlide11Detail(category);
            }
        });
    });

    // Add click event listener to back button
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            showSlide11Main();
        });
    }

    function showSlide11Detail(category) {
        mainView.style.display = 'none';
        detailedView.style.display = 'block';
        
        // Hide all detail contents
        const allDetails = document.querySelectorAll('#fundSelectionDetailedView .detail-content');
        allDetails.forEach(detail => detail.style.display = 'none');
        
        // Show the selected detail
        const targetDetail = document.getElementById(category + 'Detail');
        if (targetDetail) targetDetail.style.display = 'block';
        
        console.log('Slide 11: Showing detail for', category);
    }
    
    function showSlide11Main() {
        mainView.style.display = 'grid';
        detailedView.style.display = 'none';
        console.log('Slide 11: Back to main view');
    }
}

// Slide 12 Initialization (SIP Strategy)
function initializeSlide12() {
    const mainView = document.getElementById('sipMainCategories');
    const detailedView = document.getElementById('sipDetailedView');
    const backButton = document.getElementById('backToSIPMain');
    const cards = document.querySelectorAll('#sipMainCategories .category-card .explore-btn');

    if (!mainView || !detailedView || !backButton) {
        console.log('Slide 12 elements not found, skipping initialization');
        return;
    }

    console.log('Initializing Slide 12 with', cards.length, 'buttons');

    // Add click event listeners to explore buttons
    cards.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.category-card');
            const category = card.getAttribute('data-category');
            if (category) {
                showSlide12Detail(category);
            }
        });
    });

    // Add click event listener to back button
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            showSlide12Main();
        });
    }

    function showSlide12Detail(category) {
        mainView.style.display = 'none';
        detailedView.style.display = 'block';
        
        // Hide all detail contents
        const allDetails = document.querySelectorAll('#sipDetailedView .detail-content');
        allDetails.forEach(detail => detail.style.display = 'none');
        
        // Show the selected detail
        const targetDetail = document.getElementById(category + 'Detail');
        if (targetDetail) targetDetail.style.display = 'block';
        
        console.log('Slide 12: Showing detail for', category);
    }
    
    function showSlide12Main() {
        mainView.style.display = 'grid';
        detailedView.style.display = 'none';
        console.log('Slide 12: Back to main view');
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing all slides using slide 6 pattern');
    // Initialize slide 6 (the golden standard)
    initializeCompoundingSlide();
    // Initialize all other slides using the same pattern
    initializeSlide5();
    initializeSlide7();
    initializeSlide8();
    initializeSlide9();
    initializeSlide10();
    initializeSlide11();
    initializeSlide12();
});

// Also initialize when navigating to specific slides
document.addEventListener('slideChange', function(e) {
    if (e.detail && e.detail.slideNumber) {
        const slideNum = e.detail.slideNumber;
        console.log('Slide changed to:', slideNum);
        
        // Re-initialize the specific slide that was loaded
        if (slideNum === 5) initializeSlide5();
        if (slideNum === 6) initializeCompoundingSlide();
        if (slideNum === 7) initializeSlide7();
        if (slideNum === 8) initializeSlide8();
        if (slideNum === 9) initializeSlide9();
        if (slideNum === 10) initializeSlide10();
        if (slideNum === 11) initializeSlide11();
        if (slideNum === 12) initializeSlide12();
    }
});

console.log('All initialization attempts registered');
