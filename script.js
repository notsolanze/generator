

const portfolioSections = [
    "Title Page",
    "Profile",
    "Education and Training",
    "Skills",
    "Experience",
    "Projects",
    "Achievements",
    "Contact"
];

let isDarkMode = false;
let currentTheme = 'modern';

// DOM Elements
const sectionSelector = document.getElementById('sectionSelector');
const generateBtn = document.getElementById('generateBtn');
const previewFrame = document.getElementById('previewFrame');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const themeToggle = document.getElementById('themeToggle');
const accentColor = document.getElementById('accentColor');
const fontFamily = document.getElementById('fontFamily');
const layoutStyle = document.getElementById('layoutStyle');
const updatePreviewBtn = document.getElementById('updatePreviewBtn');

// Initialize sections
function initializeSections() {
    sectionSelector.innerHTML = '';
    portfolioSections.forEach((section, index) => {
        const checkbox = document.createElement('div');
        checkbox.innerHTML = `
            <label class="flex items-center space-x-2 cursor-move p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                <input type="checkbox" id="section${index}" value="${section}" class="form-checkbox h-4 w-4 text-violet-600" checked>
                <span class="text-gray-700 dark:text-gray-300">${section}</span>
                <i class="fas fa-grip-vertical ml-auto text-gray-400"></i>
            </label>
        `;
        sectionSelector.appendChild(checkbox);
    });
}

// Make sections sortable
function initializeSortable() {
    new Sortable(sectionSelector, {
        animation: 150,
        handle: '.fa-grip-vertical',
        ghostClass: 'bg-gray-100'
    });
}


// Add this at the beginning of the file, after the portfolioSections array
const sectionVariants = {
    "Title Page": ["Classic", "Modern", "Minimalist"],
    "Profile": ["Timeline", "Split", "Card"],
    "Education and Training": ["List", "Timeline", "Grid"],
    "Skills": ["Tags", "Bars", "Circular"],
    "Experience": ["Timeline", "Cards", "List"],
    "Projects": ["Grid", "Carousel", "Masonry"],
    "Achievements": ["Icons", "Timeline", "Cards"],
    "Contact": ["Form", "Split", "Minimal"]
};

// Modify the initializeSections function
function initializeSections() {
    sectionSelector.innerHTML = '';
    portfolioSections.forEach((section, index) => {
        const sectionContainer = document.createElement('div');
        sectionContainer.className = 'mb-4';
        
        const checkbox = document.createElement('div');
        checkbox.innerHTML = `
            <label class="flex items-center space-x-2 cursor-move p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                <input type="checkbox" id="section${index}" value="${section}" class="form-checkbox h-4 w-4 text-violet-600" checked>
                <span class="text-gray-700 dark:text-gray-300">${section}</span>
                <i class="fas fa-grip-vertical ml-auto text-gray-400"></i>
            </label>
        `;
        sectionContainer.appendChild(checkbox);

        if (sectionVariants[section]) {
            const variantSelect = document.createElement('select');
            variantSelect.id = `variant${index}`;
            variantSelect.className = 'mt-2 w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300';
            sectionVariants[section].forEach(variant => {
                const option = document.createElement('option');
                option.value = variant.toLowerCase();
                option.textContent = variant;
                variantSelect.appendChild(option);
            });
            sectionContainer.appendChild(variantSelect);
        }

        sectionSelector.appendChild(sectionContainer);
    });
}
// Event Listeners
function initializeEventListeners() {
    themeToggle.addEventListener('change', toggleTheme);
    generateBtn.addEventListener('click', generatePortfolio);
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    accentColor.addEventListener('input', generatePortfolio);
    fontFamily.addEventListener('change', generatePortfolio);
    layoutStyle.addEventListener('change', generatePortfolio);
    updatePreviewBtn.addEventListener('click', updatePreviewFromCode);
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    generatePortfolio();
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        if (previewFrame.requestFullscreen) {
            previewFrame.requestFullscreen();
        } else if (previewFrame.mozRequestFullScreen) { // Firefox
            previewFrame.mozRequestFullScreen();
        } else if (previewFrame.webkitRequestFullscreen) { // Chrome, Safari and Opera
            previewFrame.webkitRequestFullscreen();
        } else if (previewFrame.msRequestFullscreen) { // IE/Edge
            previewFrame.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}

function generatePortfolio() {
    const selectedSections = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);

    const portfolioHTML = generateHTML(selectedSections);
    const portfolioCSS = generateCSS();
    const portfolioJS = generateJS();

    updatePreviewContent(portfolioHTML, portfolioCSS, portfolioJS);

    if (window.htmlEditor) window.htmlEditor.setValue(portfolioHTML);
    if (window.cssEditor) window.cssEditor.setValue(portfolioCSS);
    if (window.jsEditor) window.jsEditor.setValue(portfolioJS);
}

function updatePreviewContent(html, css, js) {
    const content = `
        <html class="${isDarkMode ? 'dark' : ''}">
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}</script>
            </body>
        </html>
    `;
    const blob = new Blob([content], { type: 'text/html' });
    previewFrame.src = URL.createObjectURL(blob);
}

function updatePreviewFromCode() {
    if (!window.htmlEditor || !window.cssEditor || !window.jsEditor) {
        console.error('Code editors not initialized');
        return;
    }

    const updatedHTML = window.htmlEditor.getValue();
    const updatedCSS = window.cssEditor.getValue();
    const updatedJS = window.jsEditor.getValue();

    updatePreviewContent(updatedHTML, updatedCSS, updatedJS);
}

function generateHTML(sections) {
    const selectedFont = fontFamily.value;
    const accent = accentColor.value;
    const isLight = !isDarkMode;

    let html = `
        <!DOCTYPE html>
        <html lang="en" class="${isDarkMode ? 'dark' : ''}">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Generated by Lanze</title>
            <link href="https://fonts.googleapis.com/css2?family=${selectedFont.replace(' ', '+')}&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="${isLight ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'} min-h-screen">
            <header class="fixed top-0 w-full ${isLight ? 'bg-white/80' : 'bg-gray-900/80'} backdrop-blur-sm border-b ${isLight ? 'border-gray-200' : 'border-gray-800'} z-50">
                <nav class="container mx-auto px-6 py-4">
                    <div class="flex justify-between items-center">
                        <a href="#" class="text-xl font-semibold ${isLight ? 'text-gray-900' : 'text-white'} hover:text-[${accent}] transition-colors">Your Name</a>
                        <div class="hidden md:flex space-x-6">
                            ${sections.map(section => 
                                `<a href="#${section.toLowerCase().replace(/\s+/g, '-')}" 
                                    class="text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'} hover:text-[${accent}] transition-colors">
                                    ${section}
                                </a>`
                            ).join('')}
                        </div>
                        <button id="mobileMenuBtn" class="${isLight ? 'text-gray-900' : 'text-white'}">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                </nav>
                <div id="mobileMenu" class="hidden md:hidden">
                    ${sections.map(section => 
                        `<a href="#${section.toLowerCase().replace(/\s+/g, '-')}" 
                            class="block py-2 px-4 text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'} hover:text-[${accent}] transition-colors">
                            ${section}
                        </a>`
                    ).join('')}
                </div>
            </header>

            <main class="container mx-auto px-6 pt-24 pb-12">
    `;

    sections.forEach(section => {
        html += `
            <section id="${section.toLowerCase().replace(/\s+/g, '-')}" class="py-20">
                ${generateSectionContent(section, isLight)}
            </section>
        `;
    });

    html += `
            </main>
            <footer class="${isLight ? 'bg-gray-100 text-gray-600' : 'bg-gray-800 text-gray-400'} py-8">
                <div class="container mx-auto px-6 text-center">
                    <p>&copy; ${new Date().getFullYear()} Your Name. All rights reserved.</p>
                </div>
            </footer>
        </body>
        </html>
    `;

    return html;
}

function generateSectionContent(section, isLight) {
    const accent = accentColor.value;
    const textColor = isLight ? 'text-gray-900' : 'text-white';
    const textColorMuted = isLight ? 'text-gray-600' : 'text-gray-400';
    const bgColor = isLight ? 'bg-gray-50' : 'bg-gray-800';

    const baseClasses = 'max-w-6xl mx-auto';
    const wideClasses = 'max-w-7xl mx-auto';

    const sectionIndex = portfolioSections.indexOf(section);
    const variantSelect = document.getElementById(`variant${sectionIndex}`);
    const variant = variantSelect ? variantSelect.value : 'default';

    switch (section) {
        case "Title Page":
            return generateTitlePage(variant, textColor, textColorMuted, accent);
        case "Profile":
            return generateProfile(variant, textColor, textColorMuted, bgColor, accent);
        case "Education and Training":
            return generateEducation(variant, textColor, textColorMuted, bgColor, accent);
        case "Skills":
            return generateSkills(variant, textColor, textColorMuted, bgColor, accent);
        case "Experience":
            return generateExperience(variant, textColor, textColorMuted, bgColor, accent);
        case "Projects":
            return generateProjects(variant, textColor, textColorMuted, bgColor, accent);
        case "Achievements":
            return generateAchievements(variant, textColor, textColorMuted, bgColor, accent);
        case "Contact":
            return generateContact(variant, textColor, textColorMuted, bgColor, accent);
        default:
            return '';
    }
}

function generateTitlePage(variant, textColor, textColorMuted, accent) {
    const common = `
        <style>
            @keyframes float {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
                100% { transform: translateY(0px); }
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .fadeIn {
                opacity: 0;
                animation: fadeIn 0.8s ease-out forwards;
            }
            .floating {
                animation: float 6s ease-in-out infinite;
            }
        </style>
    `;

    switch (variant) {
        case "modern":
            return `
                ${common}
                <div class="flex flex-col lg:flex-row items-center justify-between gap-16 min-h-[calc(60vh-6rem)] px-6 py-12">
                    <div class="lg:w-1/2 space-y-8">
                        <div class="inline-flex items-center px-4 py-2 rounded-full bg-opacity-10" style="background-color: ${accent}20;">
                            <span style="color: ${accent};" class="text-sm font-medium">Available for exciting projects</span>
                        </div>
                        <h1 class="text-5xl lg:text-7xl font-bold ${textColor} tracking-tight fadeIn" style="animation-delay: 0.2s;">
                            Hello, I'm <span class="relative">
                                <span class="bg-clip-text text-transparent bg-gradient-to-r from-[${accent}] to-purple-600">Your Name</span>
                                <span class="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[${accent}] to-purple-600 opacity-30"></span>
                            </span>
                        </h1>
                        <p class="text-xl ${textColorMuted} max-w-2xl fadeIn" style="animation-delay: 0.4s;">
                            A passionate frontend developer crafting immersive digital experiences. Specializing in responsive design, performance optimization, and cutting-edge web technologies.
                        </p>
                        <div class="flex flex-wrap gap-4 fadeIn" style="animation-delay: 0.6s;">
                            <a href="#projects" class="group px-6 py-3 bg-gradient-to-r from-[${accent}] to-purple-600 ${textColor} rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg shadow-[${accent}]/25">
                                Explore My Work
                                <span class="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                            </a>
                            <a href="#contact" class="px-6 py-3 border-2 border-[${accent}] ${textColor} rounded-lg hover:bg-[${accent}] hover:text-white transition-colors duration-300">
                                Let's Collaborate
                            </a>
                        </div>
                        <div class="flex items-center gap-6 pt-4 fadeIn" style="animation-delay: 0.8s;">
                            <a href="#" style="color: ${accent};" class="hover:opacity-75 transition-opacity">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                            <a href="#" style="color: ${accent};" class="hover:opacity-75 transition-opacity">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div class="lg:w-1/2 fadeIn" style="animation-delay: 1s;">
                        <div class="relative">
                            <div class="absolute -inset-4 bg-gradient-to-r from-[${accent}] to-purple-600 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
                            <div class="relative rounded-2xl overflow-hidden shadow-2xl floating">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1200px-Placeholder_view_vector.svg.png?height=600&width=600" 
                                     alt="Profile" 
                                     class="w-full object-cover transform hover:scale-105 transition-transform duration-500">
                            </div>
                        </div>
                    </div>
                </div>
                <script>
                    document.addEventListener('DOMContentLoaded', () => {
                        const observerOptions = {
                            root: null,
                            rootMargin: '0px',
                            threshold: 0.1
                        };

                        const observer = new IntersectionObserver((entries) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    entry.target.classList.add('fadeIn');
                                    observer.unobserve(entry.target);
                                }
                            });
                        }, observerOptions);

                        document.querySelectorAll('.fadeIn').forEach(el => observer.observe(el));
                    });
                </script>
            `;
        case "minimalist":
            return `
                ${common}
                <div class="min-h-[calc(70vh-6rem)] flex flex-col justify-between py-12">
                    <nav class="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 py-4">
                        <div class="container mx-auto px-6 flex items-center justify-between">
                            <a href="#" style="color: ${accent};" class="text-lg font-medium">Your Name</a>
                            <div class="flex items-center gap-8">
                                <a href="#about" class="${textColorMuted} hover:text-[${accent}] transition-colors">About</a>
                                <a href="#work" class="${textColorMuted} hover:text-[${accent}] transition-colors">Work</a>
                                <a href="#contact" class="${textColorMuted} hover:text-[${accent}] transition-colors">Contact</a>
                            </div>
                        </div>
                    </nav>
                    
                    <div class="container mx-auto px-6 mt-24 space-y-20">
                        <div class="max-w-4xl mx-auto space-y-8 text-center fadeIn">
                            <h1 class="text-6xl sm:text-7xl md:text-8xl font-bold ${textColor} tracking-tight">
                                Your Name
                            </h1>
                            <p class="text-xl ${textColorMuted} max-w-2xl mx-auto">
                                Frontend developer specializing in crafting pixel-perfect, performant web experiences
                            </p>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div class="space-y-4 p-6 rounded-lg fadeIn" style="background-color: ${accent}08; animation-delay: 0.2s;">
                                <div style="color: ${accent};" class="text-lg font-medium">Design</div>
                                <p class="${textColorMuted}">Crafting intuitive and visually stunning user interfaces</p>
                            </div>
                            <div class="space-y-4 p-6 rounded-lg fadeIn" style="background-color: ${accent}08; animation-delay: 0.4s;">
                                <div style="color: ${accent};" class="text-lg font-medium">Develop</div>
                                <p class="${textColorMuted}">Building fast, responsive, and accessible web applications</p>
                            </div>
                            <div class="space-y-4 p-6 rounded-lg fadeIn" style="background-color: ${accent}08; animation-delay: 0.6s;">
                                <div style="color: ${accent};" class="text-lg font-medium">Optimize</div>
                                <p class="${textColorMuted}">Enhancing performance for seamless user experiences</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="container mx-auto px-6 mt-auto fadeIn" style="animation-delay: 0.8s;">
                        <div class="flex justify-center gap-8 pt-20">
                            <a href="#projects" class="relative text-lg group" style="color: ${accent};">
                                Projects
                                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                            </a>
                            <a href="#contact" class="relative text-lg group" style="color: ${accent};">
                                Contact
                                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                            </a>
                        </div>
                    </div>
                </div>
                <script>
                    document.addEventListener('DOMContentLoaded', () => {
                        const observerOptions = {
                            root: null,
                            rootMargin: '0px',
                            threshold: 0.1
                        };

                        const observer = new IntersectionObserver((entries) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    entry.target.classList.add('fadeIn');
                                    observer.unobserve(entry.target);
                                }
                            });
                        }, observerOptions);

                        document.querySelectorAll('.fadeIn').forEach(el => observer.observe(el));
                    });
                </script>
            `;
        default: // Classic
            return `
                ${common}
                <div class="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 min-h-[calc(70vh-6rem)] px-6 py-12">
                    <div class="lg:w-2/3 space-y-8">
                        <h1 class="text-5xl lg:text-7xl font-bold ${textColor} tracking-tight fadeIn" style="animation-delay: 0.2s;">
                            Hello, I'm <span style="color: ${accent};">Your Name</span>
                        </h1>
                        <p class="text-xl ${textColorMuted} max-w-2xl fadeIn" style="animation-delay: 0.4s;">
                            A passionate frontend developer with a keen eye for design and a love for crafting performant, accessible web applications.
                        </p>
                        <div class="flex flex-wrap gap-4 fadeIn" style="animation-delay: 0.6s;">
                            <a href="#projects" style="background-color: ${accent};" class="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-colors">
                                View Projects
                            </a>
                            <a href="#contact" class="px-6 py-3 border-2 border-[${accent}] ${textColorMuted} rounded-lg hover:bg-[${accent}] hover:text-white transition-colors">
                                Contact Me
                            </a>
                        </div>
                        <div class="flex items-center gap-6 pt-4 fadeIn" style="animation-delay: 0.8s;">
                            <a href="#" style="color: ${accent};" class="hover:opacity-75 transition-opacity">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                            <a href="#" style="color: ${accent};" class="hover:opacity-75 transition-opacity">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div class="lg:w-1/3">
                        <div class="relative rounded-2xl overflow-hidden shadow-2xl floating">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1200px-Placeholder_view_vector.svg.png?height=400&width=400" 
                                 alt="Profile" 
                                 class="w-full object-cover">
                        </div>
                    </div>
                </div>
                <script>
                    document.addEventListener('DOMContentLoaded', () => {
                        const observerOptions = {
                            root: null,
                            rootMargin: '0px',
                            threshold: 0.1
                        };

                        const observer = new IntersectionObserver((entries) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    entry.target.classList.add('fadeIn');
                                    observer.unobserve(entry.target);
                                }
                            });
                        }, observerOptions);

                        document.querySelectorAll('.fadeIn').forEach(el => observer.observe(el));
                    });
                </script>
            `;
    }
}
function generateProfile(variant, textColor, textColorMuted, bgColor, accent) {
    switch (variant) {
        case "split":
            return `
                <div class="container mx-auto px-4 py-12">
                    <div class="flex flex-col lg:flex-row gap-12">
                        <div class="lg:w-1/2">
                            <div class="relative">
                                <div class="absolute inset-0 bg-gradient-to-r from-[${accent}] to-purple-600 rounded-lg blur opacity-25"></div>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1200px-Placeholder_view_vector.svg.png?height=600&width=600" alt="Profile Picture" class="relative rounded-lg shadow-2xl w-full">
                            </div>
                        </div>
                        <div class="lg:w-1/2 space-y-6">
                            <h2 class="text-3xl font-bold mb-4 ${textColor}">About Me</h2>
                            <p class="text-base mb-4 ${textColorMuted}">
                                As a seasoned full-stack developer with over 5 years of experience, I specialize in crafting scalable and innovative web applications. My passion lies in creating intuitive user interfaces coupled with robust backend systems, always aiming to solve real-world problems efficiently and elegantly.
                            </p>
                            <p class="text-base mb-4 ${textColorMuted}">
                                Leveraging my expertise in cutting-edge web technologies and my keen eye for design, I consistently deliver high-quality solutions that not only meet but exceed client expectations. My approach combines technical proficiency with creative problem-solving to create seamless digital experiences.
                            </p>
                            <ul class="space-y-3 ${textColorMuted}">
                                <li class="flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-[${accent}]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>Mastery in JavaScript, TypeScript, React, and Node.js</span>
                                </li>
                                <li class="flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-[${accent}]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>Extensive experience with cloud technologies (AWS, Google Cloud)</span>
                                </li>
                                <li class="flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-[${accent}]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>Strong problem-solving and analytical capabilities</span>
                                </li>
                                <li class="flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-[${accent}]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>Excellent communication skills and collaborative team player</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        case "card":
            return `
                <div class="container mx-auto px-4 py-12">
                    <div class="${bgColor} rounded-lg shadow-lg p-8">
                        <div class="flex flex-col lg:flex-row items-center gap-8">
                            <div class="lg:w-1/3">
                                <div class="relative">
                                    <div class="absolute inset-0 bg-gradient-to-r from-[${accent}] to-purple-600 rounded-full blur opacity-25"></div>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1200px-Placeholder_view_vector.svg.png?height=300&width=300" alt="Profile Picture" class="relative rounded-full w-48 h-48 object-cover mx-auto shadow-xl">
                                </div>
                            </div>
                            <div class="lg:w-2/3">
                                <h2 class="text-3xl font-bold mb-4 ${textColor}">About Me</h2>
                                <p class="text-base mb-4 ${textColorMuted}">
                                    As a seasoned full-stack developer with over 5 years of experience, I specialize in building scalable and innovative web applications. My passion lies in creating intuitive user interfaces paired with robust backend systems, always aiming to solve real-world problems efficiently and elegantly.
                                </p>
                                <p class="text-base ${textColorMuted}">
                                    Leveraging my expertise in cutting-edge web technologies and my keen eye for design, I consistently deliver high-quality solutions that not only meet but exceed client expectations. My approach combines technical proficiency with creative problem-solving to create seamless digital experiences.
                                </p>
                            </div>
                        </div>
                        <div class="mt-8">
                            <h3 class="text-xl font-semibold mb-4 ${textColor}">Key Competencies</h3>
                            <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 ${textColorMuted}">
                                <li class="flex items-center p-3 rounded-lg" style="background-color: ${accent}15;">
                                    <svg class="w-5 h-5 mr-2 text-[${accent}]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>Advanced JavaScript & TypeScript</span>
                                </li>
                                <li class="flex items-center p-3 rounded-lg" style="background-color: ${accent}15;">
                                    <svg class="w-5 h-5 mr-2 text-[${accent}]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>React & Node.js Ecosystem</span>
                                </li>
                                <li class="flex items-center p-3 rounded-lg" style="background-color: ${accent}15;">
                                    <svg class="w-5 h-5 mr-2 text-[${accent}]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>Cloud Technologies & DevOps</span>
                                </li>
                                <li class="flex items-center p-3 rounded-lg" style="background-color: ${accent}15;">
                                    <svg class="w-5 h-5 mr-2 text-[${accent}]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>UI/UX Design & Implementation</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        default: // Timeline (now the default)
            return `
                <div class="container mx-auto px-4 py-12">
                    <h2 class="text-3xl font-bold mb-8 ${textColor}">My Professional Journey</h2>
                    <div class="relative border-l-2 border-[${accent}] pl-8 ml-4 space-y-12">
                        <div class="relative">
                            <h3 class="text-xl font-semibold mb-2 ${textColor}">Embarking on the Coding Journey</h3>
                            <p class="text-base ${textColorMuted}">Discovered an innate passion for programming, diving headfirst into the world of web development. This marked the beginning of a thrilling adventure in technology.</p>
                        </div>
                        <div class="relative">
                            <h3 class="text-xl font-semibold mb-2 ${textColor}">First Steps as a Junior Developer</h3>
                            <p class="text-base ${textColorMuted}">Joined an innovative startup, gaining invaluable hands-on experience in full-stack development. This role provided a solid foundation and ignited my passion for creating comprehensive web solutions.</p>
                        </div>
                        <div class="relative">
                            <h3 class="text-xl font-semibold mb-2 ${textColor}">Ascending to Senior Developer</h3>
                            <p class="text-base ${textColorMuted}">Promoted to a senior role, taking on the challenge of leading complex projects and mentoring junior developers. This period was marked by significant growth in both technical skills and leadership abilities.</p>
                        </div>
                        <div class="relative">
                            <h3 class="text-xl font-semibold mb-2 ${textColor}">Present Day: Continuous Evolution</h3>
                            <p class="text-base ${textColorMuted}">Committed to perpetual learning and growth, I now tackle the most challenging projects while exploring cutting-edge technologies. My goal is to push the boundaries of what's possible in web development.</p>
                        </div>
                    </div>
                </div>
            `;
    }
}
    
function generateEducation(variant, textColor, textColorMuted, bgColor, accent) {
    switch (variant) {
        case "timeline":
            return `
                <div class="container mx-auto px-4">
                    <h2 class="text-3xl font-bold mb-8 ${textColor}">Education & Training</h2>
                    <div class="relative border-l-2 border-[${accent}] pl-8 ml-4">
                        <div class="mb-8 relative">
                            <div class="absolute w-4 h-4 bg-[${accent}] rounded-full -left-10 top-1"></div>
                            <h3 class="text-xl font-semibold mb-2 ${textColor}">Bachelor of Science in Computer Science</h3>
                            <p class="text-sm mb-2" style="color: ${accent};">University of Technology, 2015-2019</p>
                            <p class="${textColorMuted}">Graduated with honors. Focused on software engineering, data structures, and algorithms.</p>
                        </div>
                        <div class="mb-8 relative">
                            <div class="absolute w-4 h-4 bg-[${accent}] rounded-full -left-10 top-1"></div>
                            <h3 class="text-xl font-semibold mb-2 ${textColor}">Full-Stack Web Development Bootcamp</h3>
                            <p class="text-sm mb-2" style="color: ${accent};">Tech Academy, 2020</p>
                            <p class="${textColorMuted}">Intensive 12-week program covering modern web development technologies and best practices.</p>
                        </div>
                        <div class="relative">
                            <div class="absolute w-4 h-4 bg-[${accent}] rounded-full -left-10 top-1"></div>
                            <h3 class="text-xl font-semibold mb-2 ${textColor}">Ongoing Professional Development</h3>
                            <p class="text-sm mb-2" style="color: ${accent};">Various Platforms, 2020-Present</p>
                            <p class="${textColorMuted}">Continuously expanding knowledge through online courses, workshops, and industry conferences.</p>
                        </div>
                    </div>
                </div>
            `;
        case "grid":
            return `
                <div class="container mx-auto px-4">
                    <h2 class="text-3xl font-bold mb-8 ${textColor}">Education & Training</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div class="${bgColor} rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-2 ${textColor}">Bachelor of Science in Computer Science</h3>
                            <p class="text-sm mb-2" style="color: ${accent};">University of Technology, 2015-2019</p>
                            <p class="${textColorMuted}">Graduated with honors. Focused on software engineering, data structures, and algorithms.</p>
                        </div>
                        <div class="${bgColor} rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-2 ${textColor}">Full-Stack Web Development Bootcamp</h3>
                            <p class="text-sm mb-2" style="color: ${accent};">Tech Academy, 2020</p>
                            <p class="${textColorMuted}">Intensive 12-week program covering modern web development technologies and best practices.</p>
                        </div>
                        <div class="${bgColor} rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-2 ${textColor}">Certifications</h3>
                            <ul class="mt-2 space-y-2 ${textColorMuted}">
                                <li>• AWS Certified Developer Associate</li>
                                <li>• MongoDB Certified Developer</li>
                                <li>• Google Cloud Professional Cloud Developer</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        default: // List
            return `
                <div class="container mx-auto px-4">
                    <h2 class="text-3xl font-bold mb-8 ${textColor}">Education & Training</h2>
                    <div class="space-y-8">
                        <div>
                            <h3 class="text-xl font-semibold ${textColor}">Bachelor of Science in Computer Science</h3>
                            <p style="color: ${accent};" class="mb-2">University of Technology, 2015-2019</p>
                            <p class="${textColorMuted}">
                                Graduated with honors. Focused on software engineering, data structures, and algorithms.
                            </p>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold ${textColor}">Full-Stack Web Development Bootcamp</h3>
                            <p style="color: ${accent};" class="mb-2">Tech Academy, 2020</p>
                            <p class="${textColorMuted}">
                                Intensive 12-week program covering modern web development technologies and best practices.
                            </p>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold ${textColor}">Certifications</h3>
                            <ul class="mt-2 space-y-2 ${textColorMuted}">
                                <li>• AWS Certified Developer Associate</li>
                                <li>• MongoDB Certified Developer</li>
                                <li>• Google Cloud Professional Cloud Developer</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
    }
}
    
function generateSkills(variant, textColor, textColorMuted, bgColor, accent) {
    switch (variant) {
        case "bars":
            return `
                <div class="w-full px-4 mx-auto">
                    <h2 class="text-3xl font-bold mb-8 ${textColor}">Skills</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 class="text-xl font-semibold mb-4 ${textColor}">Technical Skills</h3>
                            <div class="space-y-4">
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="${textColor}">JavaScript / TypeScript</span>
                                        <span class="${textColorMuted}">90%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                                        <div class="bg-[${accent}] h-2.5 rounded-full" style="width: 90%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="${textColor}">React / Next.js</span>
                                        <span class="${textColorMuted}">85%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                                        <div class="bg-[${accent}] h-2.5 rounded-full" style="width: 85%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="${textColor}">Node.js / Express</span>
                                        <span class="${textColorMuted}">80%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                                        <div class="bg-[${accent}] h-2.5 rounded-full" style="width: 80%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="${textColor}">SQL / NoSQL Databases</span>
                                        <span class="${textColorMuted}">75%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                                        <div class="bg-[${accent}] h-2.5 rounded-full" style="width: 75%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold mb-4 ${textColor}">Soft Skills</h3>
                            <div class="space-y-4">
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="${textColor}">Problem Solving</span>
                                        <span class="${textColorMuted}">95%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                                        <div class="bg-[${accent}] h-2.5 rounded-full" style="width: 95%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="${textColor}">Team Collaboration</span>
                                        <span class="${textColorMuted}">90%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                                        <div class="bg-[${accent}] h-2.5 rounded-full" style="width: 90%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="${textColor}">Communication</span>
                                        <span class="${textColorMuted}">85%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                                        <div class="bg-[${accent}] h-2.5 rounded-full" style="width: 85%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="${textColor}">Adaptability</span>
                                        <span class="${textColorMuted}">80%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                                        <div class="bg-[${accent}] h-2.5 rounded-full" style="width: 80%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        case "circular":
            return `
                <div class="w-full px-4 mx-auto">
                    <h2 class="text-3xl font-bold mb-8${textColor}">Skills</h2>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div class="flex flex-col items-center">
                            <div class="relative w-24 h-24">
                                <svg class="w-full h-full" viewBox="0 0 36 36">
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" stroke-width="2" />
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="90, 100" />
                                </svg>
                                <div class="absolute inset-0 flex items-center justify-center text-lg font-semibold ${textColor}">90%</div>
                            </div>
                            <span class="mt-2 ${textColor}">JavaScript</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <div class="relative w-24 h-24">
                                <svg class="w-full h-full" viewBox="0 0 36 36">
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" stroke-width="2" />
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="85, 100" />
                                </svg>
                                <div class="absolute inset-0 flex items-center justify-center text-lg font-semibold ${textColor}">85%</div>
                            </div>
                            <span class="mt-2 ${textColor}">React</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <div class="relative w-24 h-24">
                                <svg class="w-full h-full" viewBox="0 0 36 36">
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" stroke-width="2" />
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="80, 100" />
                                </svg>
                                <div class="absolute inset-0 flex items-center justify-center text-lg font-semibold ${textColor}">80%</div>
                            </div>
                            <span class="mt-2 ${textColor}">Node.js</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <div class="relative w-24 h-24">
                                <svg class="w-full h-full" viewBox="0 0 36 36">
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" stroke-width="2" />
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="75, 100" />
                                </svg>
                                <div class="absolute inset-0 flex items-center justify-center text-lg font-semibold ${textColor}">75%</div>
                            </div>
                            <span class="mt-2 ${textColor}">Databases</span>
                        </div>
                    </div>
                </div>
            `;
        default: // Tags
            return `
                <div class="w-full px-4 mx-auto">
                    <h2 class="text-3xl font-bold mb-8 ${textColor}">Skills</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 class="text-xl font-semibold mb-4 ${textColor}">Technical Skills</h3>
                            <div class="flex flex-wrap gap-2">
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">JavaScript</span>
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">TypeScript</span>
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">React</span>
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">Next.js</span>
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">Node.js</span>
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">Express</span>
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">SQL</span>
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">NoSQL</span>
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">RESTful APIs</span>
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">GraphQL</span>
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">AWS</span>
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">Docker</span>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold mb-4 ${textColor}">Soft Skills</h3>
                            <div class="flex flex-wrap gap-2">
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">Problem Solving</span>
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">Team Collaboration</span>
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">Project Management</span>
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">Agile Methodologies</span>
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">Technical Writing</span>
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">Public Speaking</span>
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">Mentoring</span>
                                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${accent}; color: white;">Continuous Learning</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    }
}
    
function generateExperience(variant, textColor, textColorMuted, bgColor, accent) {
    switch (variant) {
        case "cards":
            return `
                <div class="w-full px-4 mx-auto">
                    <h2 class="text-3xl font-bold mb-8  ${textColor}">Experience</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="${bgColor} rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold ${textColor}">Senior Full-Stack Developer</h3>
                            <p style="color: ${accent};" class="mb-2">TechCorp Inc., 2021 - Present</p>
                            <ul class="list-disc list-inside ${textColorMuted} space-y-2">
                                <li>Lead development of enterprise-level web applications using React and Node.js</li>
                                <li>Implemented microservices architecture, improving system scalability by 40%</li>
                                <li>Mentored junior developers and conducted code reviews</li>
                                <li>Introduced automated testing, increasing code coverage to 90%</li>
                            </ul>
                        </div>
                        <div class="${bgColor} rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold ${textColor}">Full-Stack Developer</h3>
                            <p style="color: ${accent};" class="mb-2">WebSolutions Co., 2019 - 2021</p>
                            <ul class="list-disc list-inside ${textColorMuted} space-y-2">
                                <li>Developed and maintained multiple client websites using MERN stack</li>
                                <li>Optimized database queries, reducing load times by 30%</li>
                                <li>Implemented responsive designs, ensuring cross-browser compatibility</li>
                                <li>Collaborated with UX/UI designers to implement pixel-perfect interfaces</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;

        case "list":
            return `
                <div class="w-full px-4 mx-auto">
                    <h2 class="text-3xl font-bold mb-8 ${textColor}">Experience</h2>
                    <div class="space-y-12">
                        <div>
                            <h3 class="text-xl font-semibold ${textColor}">Senior Full-Stack Developer</h3>
                            <p style="color: ${accent};" class="mb-2">TechCorp Inc., 2021 - Present</p>
                            <ul class="list-disc list-inside ${textColorMuted} space-y-2">
                                <li>Lead development of enterprise-level web applications using React and Node.js</li>
                                <li>Implemented microservices architecture, improving system scalability by 40%</li>
                                <li>Mentored junior developers and conducted code reviews</li>
                                <li>Introduced automated testing, increasing code coverage to 90%</li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold ${textColor}">Full-Stack Developer</h3>
                            <p style="color: ${accent};" class="mb-2">WebSolutions Co., 2019 - 2021</p>
                            <ul class="list-disc list-inside ${textColorMuted} space-y-2">
                                <li>Developed and maintained multiple client websites using MERN stack</li>
                                <li>Optimized database queries, reducing load times by 30%</li>
                                <li>Implemented responsive designs, ensuring cross-browser compatibility</li>
                                <li>Collaborated with UX/UI designers to implement pixel-perfect interfaces</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        default: // Timeline
            return `
                <div class="w-full px-4 mx-auto">
                    <h2 class="text-3xl font-bold mb-8 ${textColor}">Experience</h2>
                    <div class="space-y-12">
                        <div class="border-l-2 border-[${accent}] pl-6 relative">
                            <div class="absolute w-4 h-4 bg-[${accent}] rounded-full -left-[9px] top-0"></div>
                            <h3 class="text-xl font-semibold ${textColor}">Senior Full-Stack Developer</h3>
                            <p style="color: ${accent};" class="mb-2">TechCorp Inc., 2021 - Present</p>
                            <ul class="list-disc list-inside ${textColorMuted} space-y-2">
                                <li>Lead development of enterprise-level web applications using React and Node.js</li>
                                <li>Implemented microservices architecture, improving system scalability by 40%</li>
                                <li>Mentored junior developers and conducted code reviews</li>
                                <li>Introduced automated testing, increasing code coverage to 90%</li>
                            </ul>
                        </div>
                        <div class="border-l-2 border-[${accent}] pl-6 relative">
                            <div class="absolute w-4 h-4 bg-[${accent}] rounded-full -left-[9px] top-0"></div>
                            <h3 class="text-xl font-semibold ${textColor}">Full-Stack Developer</h3>
                            <p style="color: ${accent};" class="mb-2">WebSolutions Co., 2019 - 2021</p>
                            <ul class="list-disc list-inside ${textColorMuted} space-y-2">
                                <li>Developed and maintained multiple client websites using MERN stack</li>
                                <li>Optimized database queries, reducing load times by 30%</li>
                                <li>Implemented responsive designs, ensuring cross-browser compatibility</li>
                                <li>Collaborated with UX/UI designers to implement pixel-perfect interfaces</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
    }
}
    
function generateProjects(variant, textColor, textColorMuted, bgColor, accent) {
    return `
    <div class="w-full px-4 mx-auto">
        <h2 class="text-3xl font-bold mb-8 ${textColor}">Projects</h2>
        ${(() => {
            const projects = [
                {
                    title: "E-commerce Platform",
                    description: "A full-featured online store built with React, Node.js, and MongoDB.",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1200px-Placeholder_view_vector.svg.png?height=200&width=400",
                    link: "#",
                    tags: ["React", "Node.js", "MongoDB"]
                },
                {
                    title: "Task Management App",
                    description: "A real-time collaborative task manager using React and Firebase.",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1200px-Placeholder_view_vector.svg.png?height=200&width=400",
                    link: "#",
                    tags: ["React", "Firebase"]
                },
                {
                    title: "Weather Forecast App",
                    description: "A responsive weather app using React Native and OpenWeatherMap API.",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1200px-Placeholder_view_vector.svg.png?height=200&width=400",
                    link: "#",
                    tags: ["React Native", "API"]
                }
            ];

            function renderProject(project) {
                return `
                    <div class="${bgColor} rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-2 ${textColor}">${project.title}</h3>
                            <p class="${textColorMuted} mb-4">${project.description}</p>
                            <div class="flex justify-between items-center">
                                <a href="${project.link}" class="hover:underline transition-colors duration-300" style="color: ${accent};">View Project</a>
                                <div class="flex flex-wrap gap-2">
                                    ${project.tags.map(tag => `
                                        <span class="px-2 py-1 bg-opacity-20 rounded text-xs transition-colors duration-300" style="background-color: ${accent}; color: ${textColor};">${tag}</span>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            switch (variant) {
                case "carousel":
                    return `
                        <div class="relative">
                            <div class="overflow-hidden">
                                <div class="flex transition-transform duration-300 ease-in-out" id="projectCarousel">
                                    ${projects.map(project => `
                                        <div class="w-1/2 flex-shrink-0 px-2">
                                            ${renderProject(project)}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            <button class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md transition-opacity duration-300 hover:opacity-75" onclick="moveCarousel(-1)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md transition-opacity duration-300 hover:opacity-75" onclick="moveCarousel(1)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                        <script>
                            let currentSlide = 0;
                            const carousel = document.getElementById('projectCarousel');
                            const slides = carousel.children;
                            const totalSlides = slides.length;

                            function moveCarousel(direction) {
                                currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
                                updateCarousel();
                            }

                            function updateCarousel() {
                                const offset = -currentSlide * 50;
                                carousel.style.transform = \`translateX(\${offset}%)\`;
                            }

                            function initCarousel() {
                                for (let i = 0; i < slides.length; i++) {
                                    slides[i].style.flex = '0 0 50%';
                                }
                                updateCarousel();
                            }

                            window.addEventListener('load', initCarousel);
                        </script>
                    `;
                case "masonry":
                    return `
                        <div class="columns-1 md:columns-2 lg:columns-3 gap-8">
                            ${projects.map(project => `
                                <div class="mb-8 break-inside-avoid">
                                    ${renderProject(project)}
                                </div>
                            `).join('')}
                        </div>
                    `;
                default: // Grid
                    return `
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            ${projects.map(renderProject).join('')}
                        </div>
                    `;
            }
        })()}
    </div>
    `;
}
    
function generateAchievements(variant, textColor, textColorMuted, bgColor, accent) {
    switch (variant) {
        case "timeline":
            return `
                <div class="w-full px-4 mx-auto">
                    <h2 class="text-3xl font-bold mb-8 ${textColor}">Achievements</h2>
                    <div class="relative border-l-2 border-[${accent}] pl-8 ml-4">
                        <div class="mb-8 relative">
                            <div class="absolute w-4 h-4 bg-[${accent}] rounded-full -left-10 top-1"></div>
                            <h3 class="text-xl font-semibold mb-2 ${textColor}">Best Web Application Award</h3>
                            <p class="${textColorMuted}">Won first place in the annual TechInnovate Hackathon for developing an AI-powered accessibility tool.</p>
                        </div>
                        <div class="mb-8 relative">
                            <div class="absolute w-4 h-4 bg-[${accent}] rounded-full -left-10 top-1"></div>
                            <h3 class="text-xl font-semibold mb-2 ${textColor}">Open Source Contributor</h3>
                            <p class="${textColorMuted}">Active contributor to several popular open-source projects, with over 500 GitHub stars on personal projects.</p>
                        </div>
                        <div class="mb-8 relative">
                            <div class="absolute w-4 h-4 bg-[${accent}] rounded-full -left-10 top-1"></div>
                            <h3 class="text-xl font-semibold mb-2 ${textColor}">Published Author</h3>
                            <p class="${textColorMuted}">Authored "Modern Web Development Techniques," a technical book published by TechPress in 2022.</p>
                        </div>
                        <div class="relative">
                            <div class="absolute w-4 h-4 bg-[${accent}] rounded-full -left-10 top-1"></div>
                            <h3 class="text-xl font-semibold mb-2 ${textColor}">Community Leader</h3>
                            <p class="${textColorMuted}">Founded and lead a local tech meetup group with over 1,000 members, organizing monthly events and workshops.</p>
                        </div>
                    </div>
                </div>
            `;
        case "cards":
            return `
                <div class="w-full px-4 mx-auto">
                    <h2 class="text-3xl font-bold mb-8 ${textColor}">Achievements</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="${bgColor} rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-2 ${textColor}">Best Web Application Award</h3>
                            <p class="${textColorMuted}">Won first place in the annual TechInnovate Hackathon for developing an AI-powered accessibility tool.</p>
                        </div>
                        <div class="${bgColor} rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-2 ${textColor}">Open Source Contributor</h3>
                            <p class="${textColorMuted}">Active contributor to several popular open-source projects, with over 500 GitHub stars on personal projects.</p>
                        </div>
                        <div class="${bgColor} rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-2 ${textColor}">Published Author</h3>
                            <p class="${textColorMuted}">Authored "Modern Web Development Techniques," a technical book published by TechPress in 2022.</p>
                        </div>
                        <div class="${bgColor} rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-2 ${textColor}">Community Leader</h3>
                            <p class="${textColorMuted}">Founded and lead a local tech meetup group with over 1,000 members, organizing monthly events and workshops.</p>
                        </div>
                    </div>
                </div>
            `;
        default: // Icons
            return `
                <div class="w-full px-4 mx-auto">
                    <h2 class="text-3xl font-bold mb-8 ${textColor}">Achievements</h2>
                    <ul class="space-y-4">
                        <li class="flex items-start">
                            <i class="fas fa-trophy mr-4 mt-1" style="color: ${accent};"></i>
                            <div>
                                <h3 class="text-xl font-semibold mb-2 ${textColor}">Best Web Application Award</h3>
                                <p class="${textColorMuted}">Won first place in the annual TechInnovate Hackathon for developing an AI-powered accessibility tool.</p>
                            </div>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-certificate mr-4 mt-1" style="color: ${accent};"></i>
                            <div>
                                <h3 class="text-xl font-semibold mb-2 ${textColor}">Open Source Contributor</h3>
                                <p class="${textColorMuted}">Active contributor to several popular open-source projects, with over 500 GitHub stars on personal projects.</p>
                            </div>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-book mr-4 mt-1" style="color: ${accent};"></i>
                            <div>
                                <h3 class="text-xl font-semibold mb-2 ${textColor}">Published Author</h3>
                                <p class="${textColorMuted}">Authored "Modern Web Development Techniques," a technical book published by TechPress in 2022.</p>
                            </div>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-users mr-4 mt-1" style="color: ${accent};"></i>
                            <div>
                                <h3 class="text-xl font-semibold mb-2 ${textColor}">Community Leader</h3>
                                <p class="${textColorMuted}">Founded and lead a local tech meetup group with over 1,000 members, organizing monthly events and workshops.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            `;
    }
}
    
    function generateContact(variant, textColor, textColorMuted, bgColor, accent) {
        const inputClasses = `
            w-full px-3 py-2 
            ${isDarkMode ? 'bg-gray-800' : 'bg-white'} 
            border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} 
            rounded-md ${textColor} 
            focus:outline-none focus:ring-2 focus:ring-[${accent}] 
            transition-colors
        `.replace(/\s+/g, ' ').trim();
    
        switch (variant) {
            case "split":
                return `
                    <div class="max-w-6xl mx-auto">
                        <h2 class="text-3xl font-bold mb-8 text-center ${textColor}">Contact</h2>
                        <div class="flex flex-col md:flex-row gap-12">
                            <div class="md:w-1/2">
                                <p class="${textColorMuted} mb-6">
                                    I'm always open to new opportunities and interesting projects. Feel free to reach out!
                                </p>
                                <div class="space-y-4">
                                    <a href="mailto:your@email.com" class="flex items-center ${textColorMuted} hover:text-[${accent}] transition-colors">
                                        <i class="fas fa-envelope mr-3"></i>
                                        your@email.com
                                    </a>
                                    <a href="#" class="flex items-center ${textColorMuted} hover:text-[${accent}] transition-colors">
                                        <i class="fab fa-linkedin mr-3"></i>
                                        LinkedIn Profile
                                    </a>
                                    <a href="#" class="flex items-center ${textColorMuted} hover:text-[${accent}] transition-colors">
                                        <i class="fab fa-github mr-3"></i>
                                        GitHub Profile
                                    </a>
                                    <a href="#" class="flex items-center ${textColorMuted} hover:text-[${accent}] transition-colors">
                                        <i class="fab fa-twitter mr-3"></i>
                                        Twitter Profile
                                    </a>
                                </div>
                            </div>
                            <div class="md:w-1/2">
                                <form class="space-y-4">
                                    <div>
                                        <label for="name" class="block text-sm font-medium ${textColor} mb-1">Name</label>
                                        <input 
                                            type="text" 
                                            id="name" 
                                            name="name" 
                                            required 
                                            class="${inputClasses}"
                                            placeholder="Your name"
                                        >
                                    </div>
                                    <div>
                                        <label for="email" class="block text-sm font-medium ${textColor} mb-1">Email</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            name="email" 
                                            required 
                                            class="${inputClasses}"
                                            placeholder="your@email.com"
                                        >
                                    </div>
                                    <div>
                                        <label for="message" class="block text-sm font-medium ${textColor} mb-1">Message</label>
                                        <textarea 
                                            id="message" 
                                            name="message" 
                                            rows="4" 
                                            required 
                                            class="${inputClasses}"
                                            placeholder="Your message here..."
                                        ></textarea>
                                    </div>
                                    <button 
                                        type="submit" 
                                        style="background-color: ${accent};"
                                        class="w-full px-4 py-2 text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[${accent}] focus:ring-offset-2 transition-colors"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                `;
            case "minimal":
                return `
                    <div class="max-w-4xl mx-auto text-center">
                        <h2 class="text-3xl font-bold mb-8 ${textColor}">Get in Touch</h2>
                        <p class="${textColorMuted} mb-8">
                            I'm always open to new opportunities and interesting projects. Feel free to reach out!
                        </p>
                        <div class="flex justify-center space-x-6">
                            <a href="mailto:your@email.com" class="${textColorMuted} hover:text-[${accent}] transition-colors">
                                <i class="fas fa-envelope text-2xl"></i>
                            </a>
                            <a href="#" class="${textColorMuted} hover:text-[${accent}] transition-colors">
                                <i class="fab fa-linkedin text-2xl"></i>
                            </a>
                            <a href="#" class="${textColorMuted} hover:text-[${accent}] transition-colors">
                                <i class="fab fa-github text-2xl"></i>
                            </a>
                            <a href="#" class="${textColorMuted} hover:text-[${accent}] transition-colors">
                                <i class="fab fa-twitter text-2xl"></i>
                            </a>
                        </div>
                    </div>
                `;
            default: // Form
                return `
                    <div class="max-w-4xl mx-auto">
                        <h2 class="text-3xl font-bold mb-8 text-center ${textColor}">Contact</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <p class="${textColorMuted} mb-6">
                                    I'm always open to new opportunities and interesting projects. Feel free to reach out!
                                </p>
                                <div class="space-y-4">
                                    <a href="mailto:your@email.com" class="flex items-center ${textColorMuted} hover:text-[${accent}] transition-colors">
                                        <i class="fas fa-envelope mr-3"></i>
                                        your@email.com
                                    </a>
                                    <a href="#" class="flex items-center ${textColorMuted} hover:text-[${accent}] transition-colors">
                                        <i class="fab fa-linkedin mr-3"></i>
                                        LinkedIn Profile
                                    </a>
                                    <a href="#" class="flex items-center ${textColorMuted} hover:text-[${accent}] transition-colors">
                                        <i class="fab fa-github mr-3"></i>
                                        GitHub Profile
                                    </a>
                                    <a href="#" class="flex items-center ${textColorMuted} hover:text-[${accent}] transition-colors">
                                        <i class="fab fa-twitter mr-3"></i>
                                        Twitter Profile
                                    </a>
                                </div>
                            </div>
                            <form class="space-y-4">
                                <div>
                                    <label for="name" class="block text-sm font-medium ${textColor} mb-1">Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        required 
                                        class="${inputClasses}"
                                        placeholder="Your name"
                                    >
                                </div>
                                <div>
                                    <label for="email" class="block text-sm font-medium ${textColor} mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        required 
                                        class="${inputClasses}"
                                        placeholder="your@email.com"
                                    >
                                </div>
                                <div>
                                    <label for="message" class="block text-sm font-medium ${textColor} mb-1">Message</label>
                                    <textarea 
                                        id="message" 
                                        name="message" 
                                        rows="4" 
                                        required 
                                        class="${inputClasses}"
                                        placeholder="Your message here..."
                                    ></textarea>
                                </div>
                                <button 
                                    type="submit" 
                                    style="background-color: ${accent};"
                                    class="w-full px-4 py-2 text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[${accent}] focus:ring-offset-2 transition-colors"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                `;
        }
    }


// Implement similar functions for other sections (generateProfile, generateEducation, etc.)
// Each function should handle different variants and return the appropriate HTML

function generateCSS() {
    const selectedFont = fontFamily.value;
    const accent = accentColor.value;

    return `
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');

        body {
            font-family: ${selectedFont}, system-ui, sans-serif;
            line-height: 1.5;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        /* Smooth scrolling */
        html {
            scroll-behavior: smooth;
        }

        /* Transitions */
        .transition-all {
            transition: all 0.3s ease;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
            .container {
                padding-left: 1rem;
                padding-right: 1rem;
            }
        }

        /* Custom accent color */
        .accent-color {
            color: ${accent};
        }

        .accent-bg {
            background-color: ${accent};
        }

        /* Dark mode styles */
        .dark body {
            background-color: #111827;
            color: #f3f4f6;
        }

        .dark .bg-white {
            background-color: #1f2937;
        }

        .dark .text-gray-900 {
            color: #f3f4f6;
        }

        .dark .border-gray-200 {
            border-color: #374151;
        }
    `;
}

function generateJS() {
    return `
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const mobileMenu = document.getElementById('mobileMenu');

            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            // Add animation to sections when they come into view
            const sections = document.querySelectorAll('section');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                    }
                });
            }, { threshold: 0.1 });

            sections.forEach(section => {
                observer.observe(section);
            });

            // Form submission (you can customize this part)
            const form = document.querySelector('form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    alert('Form submitted! (This is a demo)');
                });
            }
        });
    `;
}

// Initialize Monaco Editor
function initializeMonacoEditor() {
    require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs' } });

    require(['vs/editor/editor.main'], function () {
        window.htmlEditor = monaco.editor.create(document.getElementById('htmlEditor'), {
            value: '',
            language: 'html',
            theme: 'vs-dark',
            minimap: { enabled: false },
            automaticLayout: true
        });

        window.cssEditor = monaco.editor.create(document.getElementById('cssEditor'), {
            value: '',
            language: 'css',
            theme: 'vs-dark',
            minimap: { enabled: false },
            automaticLayout: true
        });

        window.jsEditor = monaco.editor.create(document.getElementById('jsEditor'), {
            value: '',
            language: 'javascript',
            theme: 'vs-dark',
            minimap: { enabled: false },
            automaticLayout: true
        });
        
        generatePortfolio();
        initializeMaximizeButtons();
    });
}

function initializeMaximizeButtons() {
    document.querySelectorAll('.maximize-btn').forEach(btn => {
        btn.addEventListener('click', () => maximizeEditor(btn.dataset.editor));
    });

    document.getElementById('minimizeBtn').addEventListener('click', minimizeEditor);
}

function maximizeEditor(editorType) {
    const overlay = document.getElementById('maximizedEditorOverlay');
    const title = document.getElementById('maximizedEditorTitle');
    const maximizedEditorElement = document.getElementById('maximizedEditor');

    overlay.classList.remove('hidden');
    title.textContent = editorType.toUpperCase() + ' Editor';

    const originalEditor = window[editorType + 'Editor'];
    const maximizedEditor = monaco.editor.create(maximizedEditorElement, {
        value: originalEditor.getValue(),
        language: editorType === 'js' ? 'javascript' : editorType,
        theme: 'vs-dark',
        minimap: { enabled: false },
        automaticLayout: true
    });

    window.maximizedEditor = maximizedEditor;
    window.currentMaximizedType = editorType;
}

function minimizeEditor() {
    const overlay = document.getElementById('maximizedEditorOverlay');
    overlay.classList.add('hidden');

    if (window.maximizedEditor) {
        const originalEditor = window[window.currentMaximizedType + 'Editor'];
        originalEditor.setValue(window.maximizedEditor.getValue());
        window.maximizedEditor.dispose();
    }
}

function updatePreview() {
    const htmlCode = window.htmlEditor.getValue();
    const cssCode = window.cssEditor.getValue();
    const jsCode = window.jsEditor.getValue();

    // Implement your preview update logic here
    console.log('Updating preview with:', { htmlCode, cssCode, jsCode });
    // You can update an iframe or a preview section with the generated code
}

// Initialize everything when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeSections();
    initializeSortable();
    initializeEventListeners();
    initializeMonacoEditor();
});

