// Minimal SlideLoader for testing
console.log('📄 Loading minimal slide system...');

// Simple fallback presentation
function initializeMinimalPresentation() {
    console.log('🔧 Initializing minimal presentation system');
    
    const slideContainer = document.getElementById('slide-container');
    if (!slideContainer) {
        console.error('❌ Slide container not found');
        return;
    }

    // Create a simple working slide
    slideContainer.innerHTML = `
        <div class="slide active" style="display: flex; flex-direction: column; height: 100%; padding: 2rem;">
            <div style="text-align: center; margin-bottom: 2rem;">
                <h1 style="font-size: 3rem; color: #2c5282; margin-bottom: 1rem;">🚀 Mutual Fund Workshop</h1>
                <h2 style="font-size: 1.8rem; color: #4a5568; margin-bottom: 2rem;">Tech Professional's Guide to MF Investing</h2>
            </div>
            
            <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
                <div style="max-width: 800px; text-align: center;">
                    <div style="background: #f7fafc; padding: 2rem; border-radius: 1rem; margin-bottom: 2rem; border-left: 4px solid #3182ce;">
                        <h3 style="color: #2d3748; margin-bottom: 1rem;">✅ Presentation System Status</h3>
                        <p style="color: #4a5568; margin-bottom: 1rem;">The minimal presentation system is now running!</p>
                        
                        <div style="text-align: left; margin: 1rem 0;">
                            <h4 style="color: #2c5282;">📋 Workshop Content Preview:</h4>
                            <ul style="color: #4a5568; line-height: 1.6;">
                                <li><strong>🎯 Goals:</strong> Learn systematic investment planning</li>
                                <li><strong>📊 Topics:</strong> MF basics, SIP strategies, portfolio construction</li>
                                <li><strong>💡 Approach:</strong> Tech analogies and practical examples</li>
                                <li><strong>🚀 Outcome:</strong> Ready-to-implement investment plan</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div style="background: #e6fffa; padding: 1.5rem; border-radius: 0.75rem; border-left: 4px solid #38b2ac;">
                        <h4 style="color: #2c7a7b; margin-bottom: 0.5rem;">🔧 To Access Full Modular Presentation:</h4>
                        <ol style="color: #4a5568; text-align: left; line-height: 1.5;">
                            <li>Run <code style="background: #e2e8f0; padding: 0.25rem 0.5rem; border-radius: 0.25rem;">start-presentation.bat</code></li>
                            <li>Or use VS Code Live Server extension</li>
                            <li>Or run: <code style="background: #e2e8f0; padding: 0.25rem 0.5rem; border-radius: 0.25rem;">python -m http.server 8000</code></li>
                        </ol>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 2rem;">
                <div style="color: #718096; font-size: 0.9rem;">
                    💻 Built for Tech Professionals | 📈 From Code to Wealth | 🎯 Practical Implementation
                </div>
            </div>
        </div>
    `;

    // Update slide counter
    const slideCounter = document.getElementById('slide-counter');
    if (slideCounter) {
        slideCounter.textContent = 'Minimal Mode';
    }

    // Basic button functionality
    setupBasicControls();
    console.log('✅ Minimal presentation ready');
}

function setupBasicControls() {
    // Speaker notes toggle
    const notesToggle = document.getElementById('speaker-notes-toggle');
    if (notesToggle) {
        notesToggle.addEventListener('click', function() {
            alert('💡 Speaker Notes:\n\n• Welcome to the MF Workshop!\n• Focus on practical, actionable advice\n• Use tech analogies throughout\n• Encourage questions and participation');
        });
    }

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            alert('🌙 Theme toggle activated!\n\nFor full theme support, use the complete modular system.');
        });
    }

    // Fullscreen toggle
    const fullscreenToggle = document.getElementById('fullscreen-toggle');
    if (fullscreenToggle) {
        fullscreenToggle.addEventListener('click', function() {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen();
            }
        });
    }

    // Overview toggle
    const overviewToggle = document.getElementById('slide-overview');
    if (overviewToggle) {
        overviewToggle.addEventListener('click', function() {
            alert('📋 Slide Overview:\n\n1. Title Slide\n2. Opening Hook\n3. MF Stack Basics\n4. Three Pillars Framework\n5. Fund Categories\n...\n28. Thank You\n\nUse the full modular system for interactive overview!');
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMinimalPresentation);
} else {
    initializeMinimalPresentation();
}
