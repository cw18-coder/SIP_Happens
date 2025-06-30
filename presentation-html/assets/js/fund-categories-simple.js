// Minimal Fund Categories Controller - Direct initialization for slides 5, 6, 7 & 8
console.log('fund-categories-simple.js loaded');

// Function to initialize fund categories (slide 7)
function initFundCategories() {
    console.log('initFundCategories called');
    
    // Simple click handler for the entire document
    document.addEventListener('click', function(e) {
        console.log('Global click detected:', e.target.tagName, e.target.className);
        
        // Handle Slide 7 - Fund Categories
        if (e.target.classList.contains('explore-btn')) {
            console.log('Explore button clicked!');
            
            const categoryCard = e.target.closest('.category-card');
            if (categoryCard) {
                const category = categoryCard.getAttribute('data-category');
                console.log('Category:', category);
                
                // Hide main categories
                const mainCategories = document.getElementById('mainCategories');
                if (mainCategories) {
                    mainCategories.style.display = 'none';
                    console.log('Main categories hidden');
                }
                
                // Show detailed view
                const detailedView = document.getElementById('detailedView');
                if (detailedView) {
                    detailedView.style.display = 'block';
                    console.log('Detailed view shown');
                }
                
                // Hide all detail content first
                const allDetails = document.querySelectorAll('.detail-content');
                allDetails.forEach(detail => detail.style.display = 'none');
                
                // Show specific category detail
                const categoryDetail = document.getElementById(category + 'Detail');
                if (categoryDetail) {
                    categoryDetail.style.display = 'block';
                    console.log('Category detail shown:', category);
                }
                
                e.preventDefault();
            }
        }
        
        // Handle Slide 7 back button
        if (e.target.id === 'backToMain') {
            console.log('Back button clicked!');
            
            // Hide detailed view
            const detailedView = document.getElementById('detailedView');
            if (detailedView) {
                detailedView.style.display = 'none';
                console.log('Detailed view hidden');
            }
            
            // Show main categories
            const mainCategories = document.getElementById('mainCategories');
            if (mainCategories) {
                mainCategories.style.display = 'grid';
                console.log('Main categories shown');
            }
            
            e.preventDefault();
        }
        
        // Handle Slide 5 - Triage Matrix
        if (e.target.classList.contains('explore-btn-triage')) {
            console.log('Triage explore button clicked!');
            
            const timeCard = e.target.closest('.time-horizon-card');
            if (timeCard) {
                const timeframe = timeCard.getAttribute('data-timeframe');
                console.log('Timeframe:', timeframe);
                
                // Hide main triage categories
                const triageMain = document.getElementById('triageMainCategories');
                if (triageMain) {
                    triageMain.style.display = 'none';
                    console.log('Triage main categories hidden');
                }
                
                // Show detailed view
                const triageDetailed = document.getElementById('triageDetailedView');
                if (triageDetailed) {
                    triageDetailed.style.display = 'block';
                    console.log('Triage detailed view shown');
                }
                
                // Hide all detail content first
                const allTriageDetails = document.querySelectorAll('#triageDetailedView .detail-content');
                allTriageDetails.forEach(detail => detail.style.display = 'none');
                
                // Show specific timeframe detail
                const timeframeDetail = document.getElementById(timeframe + 'Detail');
                if (timeframeDetail) {
                    timeframeDetail.style.display = 'block';
                    console.log('Timeframe detail shown:', timeframe);
                }
                
                e.preventDefault();
            }
        }
        
        // Handle Slide 5 back button
        if (e.target.id === 'backToTriageMain') {
            console.log('Triage back button clicked!');
            
            // Hide detailed view
            const triageDetailed = document.getElementById('triageDetailedView');
            if (triageDetailed) {
                triageDetailed.style.display = 'none';
                console.log('Triage detailed view hidden');
            }
            
            // Show main categories
            const triageMain = document.getElementById('triageMainCategories');
            if (triageMain) {
                triageMain.style.display = 'grid';
                console.log('Triage main categories shown');
            }
            
            e.preventDefault();
        }
        
        // Handle Slide 8 - Performance Evaluation Framework
        if (e.target.classList.contains('explore-btn')) {
            console.log('Performance explore button clicked!');
            
            const categoryCard = e.target.closest('.category-card');
            if (categoryCard) {
                const category = categoryCard.getAttribute('data-category');
                console.log('Performance category:', category);
                
                // Hide main categories
                const performanceMain = document.getElementById('performanceMainCategories');
                if (performanceMain) {
                    performanceMain.style.display = 'none';
                    console.log('Performance main categories hidden');
                }
                
                // Show detailed view
                const performanceDetailed = document.getElementById('performanceDetailedView');
                if (performanceDetailed) {
                    performanceDetailed.style.display = 'block';
                    console.log('Performance detailed view shown');
                }
                
                // Hide all detail content first
                const allPerformanceDetails = document.querySelectorAll('#performanceDetailedView .detail-content');
                allPerformanceDetails.forEach(detail => detail.style.display = 'none');
                
                // Show specific category detail
                const categoryDetail = document.getElementById(category + 'Detail');
                if (categoryDetail) {
                    categoryDetail.style.display = 'block';
                    console.log('Performance category detail shown:', category);
                }
                
                e.preventDefault();
            }
        }
        
        // Handle Slide 8 back button
        if (e.target.id === 'backToPerformanceMain') {
            console.log('Performance back button clicked!');
            
            // Hide detailed view
            const performanceDetailed = document.getElementById('performanceDetailedView');
            if (performanceDetailed) {
                performanceDetailed.style.display = 'none';
                console.log('Performance detailed view hidden');
            }
            
            // Show main categories
            const performanceMain = document.getElementById('performanceMainCategories');
            if (performanceMain) {
                performanceMain.style.display = 'grid';
                console.log('Performance main categories shown');
            }
            
            e.preventDefault();
        }
    });
    
    console.log('Fund categories and triage click handlers attached');
}

// Try multiple initialization approaches
console.log('Attempting initialization...');

// Approach 1: Immediate initialization
initFundCategories();

// Approach 2: DOM ready fallback
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM ready fallback triggered');
        initFundCategories();
    });
} else {
    console.log('DOM already ready, initializing immediately');
    initFundCategories();
}

// Approach 3: Window load fallback
window.addEventListener('load', function() {
    console.log('Window load fallback triggered');
    initFundCategories();
});

console.log('All initialization attempts registered');
