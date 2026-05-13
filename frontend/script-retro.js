// 90s Style JavaScript for CodeRefine AI

// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const languageSelect = document.getElementById('language');
const codeInput = document.getElementById('codeInput');
const reviewBtn = document.getElementById('reviewBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsContainer = document.getElementById('resultsContainer');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const resultsContent = document.getElementById('resultsContent');
const emptyState = document.getElementById('emptyState');
const comparisonSection = document.getElementById('comparisonSection');
const copyOptimizedBtn = document.getElementById('copyOptimizedBtn');
const downloadOptimizedBtn = document.getElementById('downloadOptimizedBtn');

// Add 90s style button press effects
function add90sButtonEffects() {
    const buttons = document.querySelectorAll('.btn-outset');
    
    buttons.forEach(button => {
        // Mouse down effect
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translate(1px, 1px)';
            this.style.borderColor = '#808080 #ffffff #ffffff #808080';
            this.style.boxShadow = 'inset 1px 1px 0 #404040, inset -1px -1px 0 #dfdfdf';
        });
        
        // Mouse up effect
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translate(0, 0)';
            this.style.borderColor = '#ffffff #808080 #808080 #ffffff';
            this.style.boxShadow = 'inset -1px -1px 0 #404040, inset 1px 1px 0 #dfdfdf';
        });
        
        // Mouse leave effect
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
            this.style.borderColor = '#ffffff #808080 #808080 #ffffff';
            this.style.boxShadow = 'inset -1px -1px 0 #404040, inset 1px 1px 0 #dfdfdf';
        });
        
        // Focus effect
        button.addEventListener('focus', function() {
            this.style.outline = '2px dotted #000000';
            this.style.outlineOffset = '2px';
        });
        
        button.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Add 90s style input focus effects
function add90sInputEffects() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.outline = '2px dotted #000000';
            this.style.outlineOffset = '2px';
        });
        
        input.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Add rainbow text animation to main title
function addRainbowEffect() {
    const title = document.querySelector('h1.text-rainbow');
    if (title) {
        // Already handled by CSS animation
    }
}

// Add marquee functionality for browsers that don't support it
function addMarqueeSupport() {
    const marquees = document.querySelectorAll('marquee');
    
    marquees.forEach(marquee => {
        if (!marquee.hasAttribute('behavior')) {
            // Fallback for browsers that don't support marquee
            const text = marquee.textContent;
            const container = marquee.parentElement;
            
            // Create scrolling div
            const scroller = document.createElement('div');
            scroller.style.whiteSpace = 'nowrap';
            scroller.style.display = 'inline-block';
            scroller.style.animation = 'scroll-left 10s linear infinite';
            scroller.textContent = text;
            
            // Add CSS animation if not present
            if (!document.querySelector('#marquee-keyframes')) {
                const style = document.createElement('style');
                style.id = 'marquee-keyframes';
                style.textContent = `
                    @keyframes scroll-left {
                        0% { transform: translateX(100%); }
                        100% { transform: translateX(-100%); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            marquee.parentNode.replaceChild(scroller, marquee);
        }
    });
}

// Add visitor counter animation
function animateCounter() {
    const counter = document.querySelector('.hit-counter div:nth-child(2)');
    if (counter) {
        // Add blinking cursor effect
        const originalText = counter.textContent;
        setInterval(() => {
            counter.textContent = originalText + (Math.random() > 0.5 ? '_' : '');
        }, 500);
    }
}

// Add "NEW!" badge pulse effect
function addPulseEffects() {
    const pulseElements = document.querySelectorAll('.pulse-glow');
    
    pulseElements.forEach(element => {
        // Already handled by CSS animation
    });
}

// Enhanced loading animation with 90s style
function show90sLoading() {
    loadingState.style.display = 'block';
    errorState.style.display = 'none';
    resultsContent.style.display = 'none';
    emptyState.style.display = 'none';
    
    // Add some 90s flavor text
    const loadingText = loadingState.querySelector('p');
    if (loadingText) {
        const messages = [
            'Analyzing your code with 90s AI power...',
            'Dialing up the internet...',
            'Connecting to GeoCities...',
            'Loading AI modules...',
            'Compiling optimization algorithms...'
        ];
        
        let messageIndex = 0;
        setInterval(() => {
            loadingText.textContent = messages[messageIndex];
            messageIndex = (messageIndex + 1) % messages.length;
        }, 2000);
    }
}

// Enhanced error display with 90s style
function show90sError(message) {
    loadingState.style.display = 'none';
    errorState.style.display = 'block';
    resultsContent.style.display = 'none';
    emptyState.style.display = 'none';
    
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.textContent = message;
    }
    
    // Add some 90s error flair
    const errorDiv = errorState.querySelector('div');
    if (errorDiv) {
        errorDiv.style.animation = 'shake 0.5s';
        
        // Add shake animation if not present
        if (!document.querySelector('#shake-keyframes')) {
            const style = document.createElement('style');
            style.id = 'shake-keyframes';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Format results with 90s styling
function format90sResults(data) {
    // Format issues with retro styling
    const issuesContent = document.getElementById('issuesContent');
    if (issuesContent && data.issues_found) {
        issuesContent.innerHTML = `<pre style="margin: 0; white-space: pre-wrap;">${data.issues_found}</pre>`;
    }
    
    // Format explanation with retro styling
    const explanationContent = document.getElementById('explanationContent');
    if (explanationContent && data.explanation) {
        const html = marked.parse(data.explanation);
        explanationContent.innerHTML = html;
    }
    
    // Format best practices with retro styling
    const bestPracticesContent = document.getElementById('bestPracticesContent');
    if (bestPracticesContent && data.best_practices) {
        const html = marked.parse(data.best_practices);
        bestPracticesContent.innerHTML = html;
    }
}

// Show results with 90s flair
function show90sResults(data) {
    loadingState.style.display = 'none';
    errorState.style.display = 'none';
    emptyState.style.display = 'none';
    resultsContent.style.display = 'block';
    
    // Show sections that have content
    const issuesSection = document.getElementById('issuesSection');
    const explanationSection = document.getElementById('explanationSection');
    const bestPracticesSection = document.getElementById('bestPracticesSection');
    
    if (issuesSection && data.issues_found) {
        issuesSection.style.display = 'block';
    }
    
    if (explanationSection && data.explanation) {
        explanationSection.style.display = 'block';
    }
    
    if (bestPracticesSection && data.best_practices) {
        bestPracticesSection.style.display = 'block';
    }
    
    format90sResults(data);
    
    // Show comparison section if optimized code is available
    if (data.optimized_code) {
        showComparison(data);
    }
    
    // Add success celebration
    addSuccessCelebration();
}

// Show code comparison with 90s style
function showComparison(data) {
    comparisonSection.style.display = 'block';
    
    const originalCode = document.getElementById('originalCode');
    const optimizedCode = document.getElementById('optimizedCode');
    
    if (originalCode && data.original_code) {
        originalCode.textContent = data.original_code;
        hljs.highlightElement(originalCode);
    }
    
    if (optimizedCode && data.optimized_code) {
        optimizedCode.textContent = data.optimized_code;
        hljs.highlightElement(optimizedCode);
    }
}

// Add 90s success celebration
function addSuccessCelebration() {
    // Create celebration elements
    const celebration = document.createElement('div');
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #00FF00;
        color: #000000;
        padding: 20px;
        border: 4px solid #000000;
        font-weight: bold;
        font-size: 24px;
        z-index: 9999;
        animation: pulse-glow 1s ease-in-out 3;
    `;
    celebration.textContent = '✅ ANALYSIS COMPLETE!';
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        document.body.removeChild(celebration);
    }, 3000);
}

// Copy optimized code with 90s feedback
function copy90sCode() {
    const optimizedCode = document.getElementById('optimizedCode');
    if (optimizedCode) {
        navigator.clipboard.writeText(optimizedCode.textContent).then(() => {
            show90sMessage('📋 CODE COPIED TO CLIPBOARD!');
        });
    }
}

// Download optimized code with 90s feedback
function download90sCode() {
    const optimizedCode = document.getElementById('optimizedCode');
    const language = languageSelect.value || 'python';
    
    if (optimizedCode) {
        const blob = new Blob([optimizedCode.textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `optimized_code.${language === 'cpp' ? 'cpp' : language}`;
        a.click();
        URL.revokeObjectURL(url);
        
        show90sMessage('💾 CODE DOWNLOADED SUCCESSFULLY!');
    }
}

// Show 90s style message
function show90sMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #FFFF00;
        color: #000000;
        padding: 10px 15px;
        border: 2px solid #000000;
        font-weight: bold;
        z-index: 9999;
        animation: pulse-glow 1s ease-in-out 2;
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        document.body.removeChild(messageDiv);
    }, 2000);
}

// Main analyze function with 90s style
async function analyze90sCode() {
    const code = codeInput.value.trim();
    const language = languageSelect.value;
    
    if (!code) {
        show90sError('❌ PLEASE ENTER SOME CODE TO ANALYZE!');
        return;
    }
    
    if (!language) {
        show90sError('❌ PLEASE SELECT A PROGRAMMING LANGUAGE!');
        return;
    }
    
    show90sLoading();
    
    try {
        const response = await fetch('http://127.0.0.1:8000/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, language }),
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Add original code to data for comparison
            data.original_code = code;
            show90sResults(data);
        } else {
            show90sError(data.error || '❌ ANALYSIS FAILED! PLEASE TRY AGAIN!');
        }
    } catch (error) {
        show90sError('❌ CONNECTION ERROR! PLEASE CHECK YOUR INTERNET!');
    }
}

// Clear code with 90s style
function clear90sCode() {
    codeInput.value = '';
    languageSelect.value = '';
    resultsContent.style.display = 'none';
    comparisonSection.style.display = 'none';
    emptyState.style.display = 'block';
    errorState.style.display = 'none';
    loadingState.style.display = 'none';
    
    show90sMessage('🗑️ CODE CLEARED!');
}

// Event Listeners
reviewBtn.addEventListener('click', analyze90sCode);
clearBtn.addEventListener('click', clear90sCode);
copyOptimizedBtn?.addEventListener('click', copy90sCode);
downloadOptimizedBtn?.addEventListener('click', download90sCode);

// Keyboard shortcuts (90s style)
document.addEventListener('keydown', function(e) {
    // Ctrl+Enter to analyze
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        analyze90sCode();
    }
    
    // Escape to clear
    if (e.key === 'Escape') {
        e.preventDefault();
        clear90sCode();
    }
});

// Initialize 90s effects when page loads
document.addEventListener('DOMContentLoaded', function() {
    add90sButtonEffects();
    add90sInputEffects();
    addRainbowEffect();
    addMarqueeSupport();
    animateCounter();
    addPulseEffects();
    
    // Add some 90s easter eggs
    document.addEventListener('dblclick', function(e) {
        if (e.shiftKey) {
            document.body.style.animation = 'rainbow 2s linear infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 4000);
        }
    });
    
    // Add hit counter increment on page load
    const counter = document.querySelector('.hit-counter div:nth-child(2)');
    if (counter) {
        const currentCount = parseInt(counter.textContent);
        counter.textContent = String(currentCount + 1).padStart(7, '0');
    }
});

// Add some 90s console messages
console.log('%c🚀 WELCOME TO CODEREFINE AI - 90s EDITION! 🚀', 'color: #0000FF; font-weight: bold; font-size: 16px;');
console.log('%c★ POWERED BY GROQ AI AND LLAMA 3.3 70B ★', 'color: #FF0000; font-weight: bold; font-size: 14px;');
console.log('%c🔥 ANALYZE YOUR CODE NOW! 🔥', 'color: #00AA00; font-weight: bold; font-size: 14px;');
console.log('%c💡 TIP: Double-click + Shift for rainbow mode!', 'color: #800080; font-style: italic;');
