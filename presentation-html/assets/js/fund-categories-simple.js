// Minimal Fund Categories Controller - Direct initialization
console.log('fund-categories-simple.js loaded');

// Function to initialize fund categories
function initFundCategories() {
    console.log('initFundCategories called');
    
    // Simple click handler for the entire document
    document.addEventListener('click', function(e) {
        console.log('Global click detected:', e.target.tagName, e.target.className);
        
        // Check if click is on explore button
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
        
        // Check if click is on back button
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
    });
    
    console.log('Fund categories click handlers attached');
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
