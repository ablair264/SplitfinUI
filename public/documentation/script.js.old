// Documentation Script

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeSmoothScrolling();
    initializeActiveStates();
    initializeCodeHighlighting();
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('doc-theme') || 'dark';
    document.documentElement.classList.add(`${savedTheme}-theme`);
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.classList.contains('light-theme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.classList.remove(`${currentTheme}-theme`);
    html.classList.add(`${newTheme}-theme`);
    
    localStorage.setItem('doc-theme', newTheme);
}

// Navigation Section Toggle
function toggleSection(sectionId) {
    const button = document.querySelector(`[onclick="toggleSection('${sectionId}')"]`);
    const dropdown = document.getElementById(`${sectionId}-dropdown`);
    
    if (!button || !dropdown) return;
    
    const isOpen = dropdown.classList.contains('open');
    
    if (isOpen) {
        dropdown.classList.remove('open');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('open');
        button.classList.add('active');
    }
}

// Initialize Navigation
function initializeNavigation() {
    // Set up click handlers for navigation links
    const navLinks = document.querySelectorAll('.doc-sidebar-dropdown-item');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            
            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Update URL hash
            window.location.hash = targetId;
            
            // Scroll to top of content on mobile
            if (window.innerWidth <= 768) {
                document.querySelector('.doc-main-content').scrollTop = 0;
            }
        });
    });
    
    // Handle initial hash
    const initialHash = window.location.hash.substring(1) || 'overview';
    showSection(initialHash);
    
    // Mark initial active link
    const initialLink = document.querySelector(`[href="#${initialHash}"]`);
    if (initialLink) {
        initialLink.classList.add('active');
        
        // Ensure parent section is open
        const parentDropdown = initialLink.closest('.doc-sidebar-dropdown');
        if (parentDropdown) {
            parentDropdown.classList.add('open');
            const parentButton = parentDropdown.previousElementSibling;
            if (parentButton) {
                parentButton.classList.add('active');
            }
        }
    }
}

// Show Section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.doc-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Ensure parent dropdown is open
        const activeLink = document.querySelector(`[href="#${sectionId}"]`);
        if (activeLink) {
            const parentDropdown = activeLink.closest('.doc-sidebar-dropdown');
            if (parentDropdown && !parentDropdown.classList.contains('open')) {
                const parentId = parentDropdown.id.replace('-dropdown', '');
                toggleSection(parentId);
            }
        }
    }
    
    // Update document title
    updateDocumentTitle(sectionId);
}

// Update Document Title
function updateDocumentTitle(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const heading = section.querySelector('h1');
        if (heading) {
            document.title = `${heading.textContent} - SplitfinUI Documentation`;
        }
    }
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    // Handle hash changes
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            showSection(hash);
            const link = document.querySelector(`[href="#${hash}"]`);
            if (link) {
                document.querySelectorAll('.doc-sidebar-dropdown-item').forEach(l => {
                    l.classList.remove('active');
                });
                link.classList.add('active');
            }
        }
    });
}

// Active States
function initializeActiveStates() {
    // Intersection Observer for section visibility
    const sections = document.querySelectorAll('.doc-section');
    const navLinks = document.querySelectorAll('.doc-sidebar-dropdown-item');
    
    const observerOptions = {
        root: document.querySelector('.doc-main-content'),
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const correspondingLink = document.querySelector(`[href="#${sectionId}"]`);
                
                if (correspondingLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Code Highlighting
function initializeCodeHighlighting() {
    // Ensure Prism is loaded
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
    
    // Add copy buttons to code blocks
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = 'Copy';
        copyButton.onclick = function() {
            const code = block.querySelector('code');
            const text = code.textContent || code.innerText;
            
            navigator.clipboard.writeText(text).then(() => {
                copyButton.innerHTML = 'Copied!';
                setTimeout(() => {
                    copyButton.innerHTML = 'Copy';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        };
        
        block.style.position = 'relative';
        block.appendChild(copyButton);
    });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const sidebar = document.querySelector('.doc-sidebar-nav');
    sidebar.classList.toggle('mobile-open');
}

// Search Functionality (placeholder for future enhancement)
function initializeSearch() {
    // This could be implemented to search through documentation
    console.log('Search functionality to be implemented');
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Navigate sections with keyboard
    if (e.ctrlKey || e.metaKey) {
        const currentSection = document.querySelector('.doc-section.active');
        const sections = Array.from(document.querySelectorAll('.doc-section'));
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            const prevSection = sections[currentIndex - 1];
            showSection(prevSection.id);
            updateActiveLink(prevSection.id);
        } else if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            e.preventDefault();
            const nextSection = sections[currentIndex + 1];
            showSection(nextSection.id);
            updateActiveLink(nextSection.id);
        }
    }
    
    // Toggle theme with keyboard shortcut (Ctrl/Cmd + Shift + T)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
    }
});

// Update Active Link
function updateActiveLink(sectionId) {
    const navLinks = document.querySelectorAll('.doc-sidebar-dropdown-item');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const targetLink = document.querySelector(`[href="#${sectionId}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
        window.location.hash = sectionId;
    }
}

// Handle Window Resize
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Adjust layout for mobile/desktop
        if (window.innerWidth > 768) {
            const sidebar = document.querySelector('.doc-sidebar-nav');
            sidebar.classList.remove('mobile-open');
        }
    }, 250);
});

// Add CSS for copy button
const style = document.createElement('style');
style.textContent = `
.copy-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    background: var(--doc-accent);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s;
}

.code-block:hover .copy-button {
    opacity: 1;
}

.copy-button:hover {
    background: var(--doc-accent-hover);
}

.copy-button:active {
    transform: scale(0.95);
}

/* Mobile menu toggle button */
.mobile-menu-toggle {
    display: none;
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 56px;
    height: 56px;
    background: var(--doc-accent);
    color: white;
    border: none;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    z-index: 1000;
}

@media (max-width: 768px) {
    .mobile-menu-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .doc-sidebar-nav.mobile-open {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        max-height: 100vh;
        z-index: 999;
    }
}
`;
document.head.appendChild(style);

// Print functionality
window.addEventListener('beforeprint', function() {
    // Expand all sections for printing
    const sections = document.querySelectorAll('.doc-section');
    sections.forEach(section => {
        section.style.display = 'block';
    });
});

window.addEventListener('afterprint', function() {
    // Restore section visibility
    const sections = document.querySelectorAll('.doc-section');
    sections.forEach(section => {
        if (!section.classList.contains('active')) {
            section.style.display = '';
        }
    });
});