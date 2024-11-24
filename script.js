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
            <meta name="viewport" content="width
=device-width, initial-scale=1.0">
            <title>Your Portfolio</title>
            <link href="https://fonts.googleapis.com/css2?family=${selectedFont.replace(' ', '+')}&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
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

    const inputClasses = `
        w-full px-3 py-2 
        ${isLight ? 'bg-white' : 'bg-gray-800'} 
        border ${isLight ? 'border-gray-300' : 'border-gray-600'} 
        rounded-md ${textColor} 
        focus:outline-none focus:ring-2 focus:ring-[${accent}] 
        transition-colors
    `.replace(/\s+/g, ' ').trim();

    switch (section) {
        case "Title Page":
            return `
                <div class="${wideClasses} flex flex-col-reverse lg:flex-row items-center justify-between gap-12 min-h-[calc(100vh-6rem)]">
                    <div class="lg:w-2/3">
                        <h1 class="text-5xl lg:text-7xl font-bold mb-6 ${textColor}">
                            Hello, I'm <span style="color: ${accent};">Your Name</span>
                        </h1>
                        <p class="text-xl ${textColorMuted} mb-8">
                            A passionate full-stack developer creating elegant solutions to complex problems.
                        </p>
                        <div class="flex gap-4">
                            <a href="#projects" style="background-color: ${accent};" class="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-colors">
                                View Projects
                            </a>
                            <a href="#contact" class="px-6 py-3 border ${isLight ? 'border-gray-300' : 'border-gray-700'} ${textColorMuted} rounded-lg hover:border-[${accent}] transition-colors">
                                Contact Me
                            </a>
                        </div>
                    </div>
                    <div class="lg:w-1/3">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1200px-Placeholder_view_vector.svg.png?height=400&width=400" alt="Profile" class="rounded-2xl shadow-lg">
                    </div>
                </div>
            `;

            case "Profile":
                return `
                    <div class="${baseClasses}">
                        <h2 class="text-3xl font-bold mb-8 ${textColor}">Profile</h2>
                        <div class="space-y-6 ${textColorMuted}">
                            <p>
                                I'm a full-stack developer with 5+ years of experience in building scalable web applications.
                                My passion lies in creating user-friendly interfaces and robust backend systems that solve real-world problems.
                            </p>
                            <p>
                                With expertise in modern web technologies and a keen eye for design, I strive to deliver high-quality
                                solutions that exceed client expectations.
                            </p>
                            <ul class="list-disc list-inside space-y-2 pl-4 ${textColorMuted}">
                                <li>Proficient in JavaScript, TypeScript, React, and Node.js</li>
                                <li>Experienced in cloud technologies (AWS, Google Cloud)</li>
                                <li>Strong problem-solving and analytical skills</li>
                                <li>Excellent communicator and team player</li>
                            </ul>
                        </div>
                    </div>
                `;
    
            case "Education and Training":
                return `
                    <div class="${baseClasses}">
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
    
            case "Skills":
                return `
                    <div class="${baseClasses}">
                        <h2 class="text-3xl font-bold mb-8 ${textColor}">Skills</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 class="text-xl font-semibold mb-4 ${textColor}">Technical Skills</h3>
                                <ul class="space-y-2 ${textColorMuted}">
                                    <li>• JavaScript / TypeScript</li>
                                    <li>• React / Next.js</li>
                                    <li>• Node.js / Express</li>
                                    <li>• Python / Django</li>
                                    <li>• SQL / NoSQL Databases</li>
                                    <li>• RESTful APIs / GraphQL</li>
                                    <li>• AWS / Google Cloud</li>
                                    <li>• Docker / Kubernetes</li>
                                </ul>
                            </div>
                            <div>
                                <h3 class="text-xl font-semibold mb-4 ${textColor}">Soft Skills</h3>
                                <ul class="space-y-2 ${textColorMuted}">
                                    <li>• Problem Solving</li>
                                    <li>• Team Collaboration</li>
                                    <li>• Project Management</li>
                                    <li>• Agile Methodologies</li>
                                    <li>• Technical Writing</li>
                                    <li>• Public Speaking</li>
                                    <li>• Mentoring</li>
                                    <li>• Continuous Learning</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
    
            case "Experience":
                return `
                    <div class="${baseClasses}">
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
    
                case "Projects":
                    return `
                        <div class="${wideClasses}">
                            <h2 class="text-3xl font-bold mb-8 ${textColor}">Projects</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="${bgColor} rounded-lg overflow-hidden shadow-lg">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1200px-Placeholder_view_vector.svg.png?height=200&width=400" alt="Project 1" class="w-full h-48 object-cover">
                                    <div class="p-6">
                                        <h3 class="text-xl font-semibold mb-2 ${textColor}">E-commerce Platform</h3>
                                        <p class="${textColorMuted} mb-4">A full-featured online store built with React, Node.js, and MongoDB.</p>
                                        <div class="flex justify-between items-center">
                                            <a href="#" class="hover:underline" style="color: ${accent};">View Project</a>
                                            <div class="flex space-x-2">
                                                <span class="px-2 py-1 bg-opacity-20 rounded text-xs" style="background-color: ${accent}; color: ${textColor};">React</span>
                                                <span class="px-2 py-1 bg-opacity-20 rounded text-xs" style="background-color: ${accent}; color: ${textColor};">Node.js</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="${bgColor} rounded-lg overflow-hidden shadow-lg">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1200px-Placeholder_view_vector.svg.png?height=200&width=400" alt="Project 2" class="w-full h-48 object-cover">
                                    <div class="p-6">
                                        <h3 class="text-xl font-semibold mb-2 ${textColor}">Task Management App</h3>
                                        <p class="${textColorMuted} mb-4">A real-time collaborative task manager using React and Firebase.</p>
                                        <div class="flex justify-between items-center">
                                            <a href="#" class="hover:underline" style="color: ${accent};">View Project</a>
                                            <div class="flex space-x-2">
                                                <span class="px-2 py-1 bg-opacity-20 rounded text-xs" style="background-color: ${accent}; color: ${textColor};">React</span>
                                                <span class="px-2 py-1 bg-opacity-20 rounded text-xs" style="background-color: ${accent}; color: ${textColor};">Firebase</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
    
                case "Achievements":
                    return `
                        <div class="${baseClasses}">
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
    case "Contact":
        const inputClasses = `
            w-full px-3 py-2 
            ${isLight ? 'bg-white' : 'bg-gray-800'} 
            border ${isLight ? 'border-gray-300' : 'border-gray-600'} 
            rounded-md ${textColor} 
            focus:outline-none focus:ring-2 focus:ring-[${accent}] 
            transition-colors
        `.replace(/\s+/g, ' ').trim();
    
        return `
            <div class="${baseClasses}">
                <h2 class="text-3xl font-bold mb-8 ${textColor}">Contact</h2>
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
    

        // Add other sections here...

        default:
            return ``;
    }
}

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

        // Add this to your CSS or in a <style> tag
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .animate-fade-in-up {
            animation: fadeInUp 0.5s ease-out forwards;
        }
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
    });
}

// Initialize everything when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeSections();
    initializeSortable();
    initializeEventListeners();
    initializeMonacoEditor();
});

