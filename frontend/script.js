// Initialize Lucide icons
lucide.createIcons();

// API Configuration
const API_BASE_URL = 'http://localhost:8000';

// DOM Elements
const codeInput = document.getElementById('codeInput');
const languageSelect = document.getElementById('language');
const reviewBtn = document.getElementById('reviewBtn');
const clearBtn = document.getElementById('clearBtn');
const githubBtn = document.getElementById('githubBtn');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const errorMessage = document.getElementById('errorMessage');
const resultsContent = document.getElementById('resultsContent');
const emptyState = document.getElementById('emptyState');
const comparisonSection = document.getElementById('comparisonSection');
const originalCode = document.getElementById('originalCode');
const optimizedCode = document.getElementById('optimizedCode');
const copyOptimizedBtn = document.getElementById('copyOptimizedBtn');
const downloadOptimizedBtn = document.getElementById('downloadOptimizedBtn');

// Results sections
const issuesSection = document.getElementById('issuesSection');
const issuesContent = document.getElementById('issuesContent');
const explanationSection = document.getElementById('explanationSection');
const explanationContent = document.getElementById('explanationContent');
const bestPracticesSection = document.getElementById('bestPracticesSection');
const bestPracticesContent = document.getElementById('bestPracticesContent');

// State
let currentAnalysis = null;

// Event Listeners
reviewBtn.addEventListener('click', analyzeCode);
clearBtn.addEventListener('click', clearInput);
copyOptimizedBtn.addEventListener('click', copyOptimizedCode);
downloadOptimizedBtn.addEventListener('download', downloadOptimizedCode);
githubBtn.addEventListener('click', showGitHubMode);

// Language change event
languageSelect.addEventListener('change', () => {
    if (codeInput.value) {
        updateSyntaxHighlighting();
    }
});

// Code input event
codeInput.addEventListener('input', debounce(updateSyntaxHighlighting, 500));

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkBackendHealth();
    setupTextareaTabSupport();
});

async function checkBackendHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();
        
        if (data.status !== 'healthy') {
            showError('Backend health check failed. Please ensure the backend is running and API key is configured.');
        }
    } catch (error) {
        showError('Cannot connect to backend. Please start the backend server with: uvicorn main:app --reload');
    }
}

async function analyzeCode() {
    const code = codeInput.value.trim();
    const language = languageSelect.value;
    
    // Validation
    if (!code) {
        showError('Please enter some code to analyze.');
        return;
    }
    
    if (!language) {
        showError('Please select a programming language.');
        return;
    }
    
    // Show loading state
    showLoading();
    
    try {
        const response = await fetch(`${API_BASE_URL}/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: code,
                language: language
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            currentAnalysis = data;
            displayResults(data, code, language);
        } else {
            showError(data.error || 'Analysis failed. Please try again.');
        }
    } catch (error) {
        showError('Network error. Please check your connection and try again.');
    }
}

function displayResults(data, originalCodeText, language) {
    // Hide all states
    hideAllStates();
    
    // Show results content
    resultsContent.classList.remove('hidden');
    
    // Display issues
    if (data.issues_found) {
        issuesSection.classList.remove('hidden');
        issuesContent.innerHTML = formatIssuesTable(data.issues_found);
    }
    
    // Display explanation
    if (data.explanation) {
        explanationSection.classList.remove('hidden');
        explanationContent.innerHTML = marked.parse(data.explanation);
    }
    
    // Display best practices
    if (data.best_practices) {
        bestPracticesSection.classList.remove('hidden');
        bestPracticesContent.innerHTML = marked.parse(data.best_practices);
    }
    
    // Display code comparison
    if (data.optimized_code) {
        displayCodeComparison(originalCodeText, data.optimized_code, language);
        comparisonSection.classList.remove('hidden');
    }
    
    // Re-initialize Lucide icons
    lucide.createIcons();
    
    // Re-highlight code blocks
    hljs.highlightAll();
}

function formatIssuesTable(issuesText) {
    const lines = issuesText.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) {
        return '<p class="text-green-400">No issues found! 🎉</p>';
    }
    
    let tableHTML = '<table class="w-full text-sm"><thead><tr class="border-b border-gray-600"><th class="text-left py-2">Line</th><th class="text-left py-2">Issue</th><th class="text-left py-2">Severity</th><th class="text-left py-2">Fix</th></tr></thead><tbody>';
    
    lines.forEach(line => {
        const parts = line.split('|').map(part => part.trim());
        if (parts.length >= 4) {
            const [lineNumber, issue, severity, fix] = parts;
            const severityClass = getSeverityClass(severity);
            tableHTML += `<tr class="border-b border-gray-700">
                <td class="py-2">${lineNumber}</td>
                <td class="py-2">${issue}</td>
                <td class="py-2"><span class="${severityClass} font-medium">${severity}</span></td>
                <td class="py-2">${fix}</td>
            </tr>`;
        }
    });
    
    tableHTML += '</tbody></table>';
    return tableHTML;
}

function getSeverityClass(severity) {
    const severityLower = severity.toLowerCase();
    switch (severityLower) {
        case 'critical': return 'severity-critical';
        case 'high': return 'severity-high';
        case 'medium': return 'severity-medium';
        case 'low': return 'severity-low';
        default: return '';
    }
}

function displayCodeComparison(original, optimized, language) {
    // Set original code
    originalCode.textContent = original;
    originalCode.className = `language-${language}`;
    
    // Set optimized code
    optimizedCode.textContent = optimized;
    optimizedCode.className = `language-${language}`;
    
    // Highlight both code blocks
    hljs.highlightElement(originalCode);
    hljs.highlightElement(optimizedCode);
}

function copyOptimizedCode() {
    const code = optimizedCode.textContent;
    navigator.clipboard.writeText(code).then(() => {
        showToast('Optimized code copied to clipboard!');
    }).catch(() => {
        showToast('Failed to copy code');
    });
}

function downloadOptimizedCode() {
    const code = optimizedCode.textContent;
    const language = languageSelect.value;
    const extension = getFileExtension(language);
    const filename = `optimized_code.${extension}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast(`Downloaded ${filename}`);
}

function getFileExtension(language) {
    const extensions = {
        'python': 'py',
        'javascript': 'js',
        'java': 'java',
        'cpp': 'cpp'
    };
    return extensions[language] || 'txt';
}

function clearInput() {
    codeInput.value = '';
    languageSelect.value = '';
    hideAllStates();
    emptyState.classList.remove('hidden');
    comparisonSection.classList.add('hidden');
    currentAnalysis = null;
}

function showLoading() {
    hideAllStates();
    loadingState.classList.remove('hidden');
}

function showError(message) {
    hideAllStates();
    errorMessage.textContent = message;
    errorState.classList.remove('hidden');
}

function hideAllStates() {
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    resultsContent.classList.add('hidden');
    emptyState.classList.add('hidden');
    issuesSection.classList.add('hidden');
    explanationSection.classList.add('hidden');
    bestPracticesSection.classList.add('hidden');
}

function updateSyntaxHighlighting() {
    const code = codeInput.value;
    const language = languageSelect.value;
    
    if (!code || !language) return;
    
    // This is a simple preview - full highlighting happens on results display
    // For real-time highlighting in textarea, we'd need a more complex solution
}

function showGitHubMode() {
    showToast('GitHub repository analysis feature coming soon!');
}

function setupTextareaTabSupport() {
    codeInput.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;
            
            // Insert tab character
            this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
            
            // Move cursor
            this.selectionStart = this.selectionEnd = start + 4;
        }
    });
}

function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to analyze
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        analyzeCode();
    }
    
    // Escape to clear
    if (e.key === 'Escape') {
        clearInput();
    }
});

// Auto-resize textarea
function autoResizeTextarea() {
    codeInput.style.height = 'auto';
    codeInput.style.height = codeInput.scrollHeight + 'px';
}

codeInput.addEventListener('input', autoResizeTextarea);
autoResizeTextarea();
