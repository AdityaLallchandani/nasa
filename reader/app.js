// NASA Research Archive Application
// Single-page application with React-like routing and components

class NASAResearchApp {
    constructor() {
        this.papers = [];
        this.filteredPapers = [];
        this.currentRoute = '';
        this.searchQuery = '';
        
        this.init();
    }

    // Initialize the application
    async init() {
        try {
            this.showLoading(true);
            await this.loadData();
            this.setupEventListeners();
            this.setupRouter();
            this.setupChatWidget();
            this.handleRoute();
            this.showLoading(false);
        } catch (error) {
            this.showError(error.message);
        }
    }

    // Load paper data (simulating API call)
    async loadData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.papers = [
                    {
                        "articleId": "nasa001",
                        "title": "Mars Atmospheric Composition Analysis Using Spectroscopic Methods",
                        "authors": "Dr. Sarah Chen, Dr. Michael Rodriguez, Dr. Lisa Wang",
                        "publicationDate": "2024-03-15",
                        "keywords": "Mars, atmospheric analysis, spectroscopy, planetary science",
                        "abstract": "This comprehensive study presents a detailed analysis of Mars atmospheric composition using advanced spectroscopic techniques. Our research team utilized data from the Mars Atmosphere and Volatile Evolution (MAVEN) mission to examine trace gases and their seasonal variations. The findings reveal significant insights into Martian climate dynamics and potential biosignatures that could indicate past or present microbial activity.",
                        "content": "Introduction: Mars has long fascinated scientists due to its potential to harbor life and its similarities to Earth. Understanding the atmospheric composition is crucial for future missions and astrobiology research. Methodology: We employed high-resolution spectroscopic analysis using MAVEN data collected over three Martian years. Our team developed novel algorithms for processing atmospheric spectra and identifying trace compounds. Results: The analysis revealed unexpected seasonal variations in methane concentrations, particularly in the northern hemisphere during summer months. We also detected trace amounts of previously unknown organic compounds. Discussion: These findings suggest active geological or biological processes on Mars. The seasonal methane variations correlate with surface temperature changes, indicating possible subsurface reservoirs. Conclusion: This research provides new insights into Martian atmospheric dynamics and supports the need for targeted follow-up missions to investigate potential biosignatures.",
                        "pdfUrl": "https://example.com/papers/nasa001.pdf"
                    },
                    {
                        "articleId": "nasa002", 
                        "title": "Advanced Propulsion Systems for Deep Space Exploration",
                        "authors": "Dr. James Patterson, Dr. Emily Foster, Dr. David Liu",
                        "publicationDate": "2024-02-28",
                        "keywords": "propulsion, deep space, ion drives, nuclear thermal, space exploration",
                        "abstract": "This research explores next-generation propulsion technologies essential for human missions to Mars and beyond. We examine ion propulsion systems, nuclear thermal rockets, and breakthrough concepts like fusion ramjets. Our analysis includes performance metrics, fuel efficiency, and mission duration implications for various deep space destinations.",
                        "content": "Executive Summary: Current chemical propulsion systems limit our ability to explore the outer solar system efficiently. This study evaluates advanced propulsion technologies that could revolutionize space exploration. Ion Propulsion Systems: Ion drives offer exceptional fuel efficiency with specific impulses exceeding 3000 seconds. Our analysis shows they could reduce Mars mission times by 40% compared to chemical rockets. Nuclear Thermal Propulsion: Nuclear thermal rockets provide high thrust with twice the efficiency of chemical systems. Safety protocols and reactor designs suitable for space applications are discussed. Fusion Concepts: Though still theoretical, fusion ramjets could achieve unprecedented velocities for interstellar missions. We present preliminary designs and energy requirements. Mission Planning: Detailed mission profiles for Mars, Jupiter, and Saturn destinations show significant advantages for advanced propulsion systems. Cost-benefit analysis indicates long-term economic viability. Recommendations: Continued investment in ion and nuclear thermal technologies should be prioritized for near-term missions, while fusion research remains important for long-term exploration goals.",
                        "pdfUrl": "https://example.com/papers/nasa002.pdf"
                    },
                    {
                        "articleId": "nasa003",
                        "title": "Exoplanet Detection Methods: From Transit Photometry to Direct Imaging", 
                        "authors": "Dr. Maria Gonzalez, Dr. Robert Kim, Dr. Jennifer Taylor",
                        "publicationDate": "2024-01-20",
                        "keywords": "exoplanets, transit photometry, direct imaging, Kepler, TESS, habitability",
                        "abstract": "A comprehensive review of exoplanet detection methodologies, from the pioneering transit photometry techniques used by Kepler to cutting-edge direct imaging systems. This study analyzes the strengths and limitations of each approach and presents statistical findings from over 5,000 confirmed exoplanets discovered to date.",
                        "content": "Historical Context: The first confirmed exoplanet around a main-sequence star was discovered in 1995, launching a new era of astronomy. Since then, multiple detection methods have been developed and refined. Transit Photometry: The transit method detects periodic dimming as planets pass in front of their host stars. Kepler and TESS missions have discovered thousands of exoplanets using this technique. We analyze detection efficiency and bias factors affecting planet discovery rates. Radial Velocity: The wobble method measures stellar motion caused by gravitational pull from orbiting planets. This technique excels at detecting massive planets close to their stars and provides mass estimates. Direct Imaging: Advanced coronagraphs and adaptive optics systems now allow direct observation of exoplanets. Though challenging, this method provides spectroscopic data about planetary atmospheres. Statistical Analysis: Our database analysis reveals that super-Earths are the most common planetary type, challenging models of planetary formation. Gas giants are predominantly found in close orbits, suggesting migration processes. Future Prospects: Next-generation telescopes like the James Webb Space Telescope will revolutionize exoplanet characterization. We discuss upcoming missions and their potential for discovering Earth-like worlds in habitable zones.",
                        "pdfUrl": "https://example.com/papers/nasa003.pdf"
                    },
                    {
                        "articleId": "nasa004",
                        "title": "International Space Station: 25 Years of Scientific Achievements",
                        "authors": "Dr. Alexander Petrov, Dr. Susan Martinez, Dr. Hiroshi Tanaka", 
                        "publicationDate": "2024-04-10",
                        "keywords": "ISS, microgravity, space medicine, materials science, Earth observation",
                        "abstract": "This comprehensive review commemorates 25 years of the International Space Station program, highlighting breakthrough discoveries in microgravity research, space medicine, materials science, and Earth observation. We present quantitative analysis of research productivity and discuss future applications of ISS-derived knowledge.",
                        "content": "Introduction: The International Space Station represents humanity's greatest collaborative achievement in space exploration. Over 25 years, it has hosted over 3,000 scientific experiments and welcomed astronauts from 19 countries. Microgravity Research: The unique microgravity environment has enabled unprecedented studies in protein crystallization, fluid physics, and combustion science. Protein crystals grown in space show superior quality for drug development applications. Space Medicine: Long-duration flights have provided crucial data on human adaptation to space. Studies on bone density loss, muscle atrophy, and cardiovascular changes inform medical countermeasures for Mars missions. Materials Science: Experiments in metals processing and crystal growth have led to new manufacturing techniques applicable on Earth. Advanced alloys developed in microgravity show enhanced properties for aerospace applications. Earth Observation: The ISS serves as an ideal platform for monitoring climate change, natural disasters, and environmental shifts. High-resolution imaging has contributed to disaster response and scientific understanding of Earth systems. International Cooperation: The ISS program demonstrates successful international collaboration in science and technology. Lessons learned inform future cooperative missions to the Moon and Mars. Future Outlook: As the ISS approaches end-of-life, commercial space stations will continue this research legacy. The knowledge gained will be essential for sustainable space exploration beyond Earth orbit.",
                        "pdfUrl": "https://example.com/papers/nasa004.pdf"
                    },
                    {
                        "articleId": "nasa005",
                        "title": "Lunar Base Construction: Engineering Challenges and Solutions",
                        "authors": "Dr. Katherine Williams, Dr. Marco Russo, Dr. Priya Sharma",
                        "publicationDate": "2024-05-05", 
                        "keywords": "lunar base, construction, regolith, ISRU, radiation shielding, life support",
                        "abstract": "As NASA's Artemis program advances toward establishing a permanent lunar presence, this study addresses critical engineering challenges for lunar base construction. We examine in-situ resource utilization, radiation protection, life support systems, and sustainable construction methodologies using lunar regolith and other local materials.",
                        "content": "Mission Overview: The Artemis program aims to establish a sustainable human presence on the Moon by 2030. This requires solving complex engineering challenges unique to the lunar environment. Site Selection: Ideal locations near the lunar south pole offer near-continuous solar power and water ice access. We analyze terrain, solar illumination, and resource availability for optimal base placement. Construction Materials: Lunar regolith can be processed into concrete-like materials using microwave sintering. Our experiments show regolith-based blocks can withstand launch vibrations and thermal cycling. In-Situ Resource Utilization: Water extraction from ice deposits enables life support and fuel production. Oxygen can be extracted from regolith using hydrogen reduction or electrolysis processes. Radiation Shielding: Unlike Earth, the Moon lacks atmospheric protection from cosmic radiation and solar particles. We propose underground construction with regolith shielding to protect inhabitants. Power Systems: Solar arrays with battery storage provide reliable power during 14-day lunar nights. Nuclear systems offer backup power and heat for critical systems. Life Support: Closed-loop life support systems must recycle air, water, and waste with minimal resupply from Earth. Hydroponics and controlled environment agriculture supplement food supplies. Transportation: Regular cargo deliveries require efficient Earth-Moon transportation systems. Reusable landers and lunar surface mobility are essential infrastructure components.",
                        "pdfUrl": "https://example.com/papers/nasa005.pdf"
                    },
                    {
                        "articleId": "nasa006",
                        "title": "James Webb Space Telescope: First Year Scientific Discoveries",
                        "authors": "Dr. Amanda Foster, Dr. Carlos Mendez, Dr. Rachel Park",
                        "publicationDate": "2024-06-12",
                        "keywords": "JWST, infrared astronomy, early universe, exoplanets, star formation",
                        "abstract": "The James Webb Space Telescope has revolutionized our understanding of the cosmos in its first operational year. This comprehensive report summarizes groundbreaking discoveries in early universe observations, exoplanet atmospheric analysis, star formation studies, and galaxy evolution research that have challenged existing astronomical models.",
                        "content": "Introduction: Launched in December 2021, JWST began science operations in July 2022, immediately delivering unprecedented infrared observations of the universe. Early Universe: JWST has observed galaxies existing just 400 million years after the Big Bang, earlier than previously thought possible. These ancient galaxies appear more massive and structured than theoretical models predicted. Exoplanet Atmospheres: High-resolution spectroscopy has detected water vapor, clouds, and complex atmospheric chemistry in exoplanets. The telescope successfully analyzed atmospheres of both rocky and gas giant exoplanets. Star Formation: Detailed observations of stellar nurseries reveal how massive stars form and influence their surroundings. Infrared imaging penetrates dust clouds that hide star formation from optical telescopes. Galaxy Evolution: JWST observations show early galaxies underwent rapid evolution and merging processes. The telescope has identified intermediate-mass black holes that bridge the gap between stellar and supermassive black holes. Solar System Science: Even within our solar system, JWST has provided new insights into Jupiter's moons, Saturn's rings, and asteroid compositions using its infrared capabilities. Technical Performance: All instruments operate beyond specifications, with image quality exceeding expectations. The telescope's stability and precision enable long-duration observations of faint targets. Future Observations: The next phase of JWST operations will focus on systematic surveys and follow-up observations of the most intriguing discoveries from year one.",
                        "pdfUrl": "https://example.com/papers/nasa006.pdf"
                    }
                ];
                this.filteredPapers = [...this.papers];
                resolve();
            }, 800); // Simulate network delay
        });
    }

    // Setup event listeners
    setupEventListeners() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => this.handleRoute());
        
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const href = link.getAttribute('href');
                this.navigate(href);
            }
        });

        // Handle search input
        document.addEventListener('input', (e) => {
            if (e.target.matches('.search-input')) {
                this.handleSearch(e.target.value);
            }
        });
    }

    // Simple router implementation
    setupRouter() {
        this.routes = {
            '#/': () => this.renderHomePage(),
            '#/article/(.+)': (articleId) => this.renderArticleDetailPage(articleId)
        };
    }

    // Navigate to a new route
    navigate(path) {
        window.history.pushState({}, '', path);
        this.handleRoute();
    }

    // Handle current route
    handleRoute() {
        const hash = window.location.hash || '#/';
        this.currentRoute = hash;
        
        // Update navigation active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });

        // Match route
        for (const [pattern, handler] of Object.entries(this.routes)) {
            const regex = new RegExp(`^${pattern}$`);
            const match = hash.match(regex);
            if (match) {
                handler(...match.slice(1));
                return;
            }
        }

        // Default to home page
        this.renderHomePage();
    }

    // Handle search functionality
    handleSearch(query) {
        this.searchQuery = query.toLowerCase();
        
        if (!this.searchQuery.trim()) {
            this.filteredPapers = [...this.papers];
        } else {
            this.filteredPapers = this.papers.filter(paper => {
                return paper.title.toLowerCase().includes(this.searchQuery) ||
                       paper.abstract.toLowerCase().includes(this.searchQuery) ||
                       paper.keywords.toLowerCase().includes(this.searchQuery);
            });
        }
        
        // Update the articles section if we're on the home page
        if (this.currentRoute === '#/' || this.currentRoute === '') {
            const articlesSection = document.getElementById('articles-section');
            if (articlesSection) {
                articlesSection.innerHTML = this.renderArticlesList();
            }
        }
    }

    // Render home page
    renderHomePage() {
        const mainContent = document.getElementById('main-content');
        
        mainContent.innerHTML = `
            <div class="container">
                <!-- Hero Section -->
                <section class="hero">
                    <div class="hero-content">
                        <h1>NASA Research Archive</h1>
                        <p>Explore groundbreaking research from NASA's leading scientists and engineers. Discover the latest findings in space exploration, planetary science, and aerospace technology.</p>
                    </div>
                </section>

                <!-- Search Section -->
                <section class="search-section">
                    <div class="search-container">
                        <input 
                            type="text" 
                            class="search-input" 
                            placeholder="Search research papers by title, keywords, or abstract..."
                            value="${this.searchQuery}"
                        >
                        <div class="search-icon">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                            </svg>
                        </div>
                    </div>
                </section>

                <!-- Articles Grid -->
                <section id="articles-section">
                    ${this.renderArticlesList()}
                </section>
            </div>
        `;

        // Focus on search input
        setTimeout(() => {
            const searchInput = document.querySelector('.search-input');
            if (searchInput) searchInput.focus();
        }, 100);
    }

    // Render articles list
    renderArticlesList() {
        if (this.filteredPapers.length === 0) {
            return `
                <div class="no-results">
                    <h3>No research papers found</h3>
                    <p>Try adjusting your search terms or browse all available papers.</p>
                </div>
            `;
        }

        const articlesHtml = this.filteredPapers.map(paper => `
            <div class="article-card" onclick="app.navigate('#/article/${paper.articleId}')">
                <h3 class="article-title">${this.escapeHtml(paper.title)}</h3>
                <div class="article-meta">
                    <span class="article-authors">${this.escapeHtml(paper.authors)}</span>
                    <span class="article-date">${this.formatDate(paper.publicationDate)}</span>
                </div>
                <div class="article-keywords">
                    ${paper.keywords.split(', ').map(keyword => 
                        `<span class="keyword-tag">${this.escapeHtml(keyword)}</span>`
                    ).join('')}
                </div>
                <p class="article-abstract">${this.escapeHtml(paper.abstract)}</p>
            </div>
        `).join('');

        return `
            <div class="articles-grid">
                ${articlesHtml}
            </div>
        `;
    }

    // Render article detail page
    renderArticleDetailPage(articleId) {
        const paper = this.papers.find(p => p.articleId === articleId);
        
        if (!paper) {
            this.renderNotFound();
            return;
        }

        const mainContent = document.getElementById('main-content');
        
        mainContent.innerHTML = `
            <div class="container">
                <div class="article-detail">
                    <a href="#/" class="back-button">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"/>
                        </svg>
                        Back to Research Archive
                    </a>

                    <h1 class="article-detail-title">${this.escapeHtml(paper.title)}</h1>

                    <div class="article-detail-meta">
                        <div class="meta-row">
                            <div class="meta-item">
                                <div class="meta-label">Authors</div>
                                <div class="meta-value">${this.escapeHtml(paper.authors)}</div>
                            </div>
                            <div class="meta-item">
                                <div class="meta-label">Publication Date</div>
                                <div class="meta-value">${this.formatDate(paper.publicationDate)}</div>
                            </div>
                        </div>
                        <div class="meta-row">
                            <div class="meta-item">
                                <div class="meta-label">Keywords</div>
                                <div class="meta-value">
                                    ${paper.keywords.split(', ').map(keyword => 
                                        `<span class="keyword-tag">${this.escapeHtml(keyword)}</span>`
                                    ).join('')}
                                </div>
                            </div>
                        </div>
                        <div class="meta-row">
                            <div class="meta-item">
                                <div class="meta-label">Abstract</div>
                                <div class="meta-value">${this.escapeHtml(paper.abstract)}</div>
                            </div>
                        </div>
                    </div>

                    <div class="article-content">
                        ${this.formatContent(paper.content)}
                    </div>

                    <a href="${paper.pdfUrl}" target="_blank" class="pdf-button">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                        </svg>
                        Download PDF
                    </a>
                </div>
            </div>
        `;
    }

    // Render 404 page
    renderNotFound() {
        const mainContent = document.getElementById('main-content');
        
        mainContent.innerHTML = `
            <div class="container">
                <div class="no-results">
                    <h3>Research Paper Not Found</h3>
                    <p>The requested research paper could not be found.</p>
                    <a href="#/" class="btn btn--primary">Return to Archive</a>
                </div>
            </div>
        `;
    }

    // Setup chat widget functionality
    setupChatWidget() {
        const chatToggle = document.getElementById('chat-toggle');
        const chatBox = document.getElementById('chat-box');
        const chatClose = document.getElementById('chat-close');

        chatToggle.addEventListener('click', () => {
            chatBox.classList.remove('hidden');
            chatToggle.style.display = 'none';
        });

        chatClose.addEventListener('click', () => {
            chatBox.classList.add('hidden');
            chatToggle.style.display = 'flex';
        });

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.chat-widget') && !chatBox.classList.contains('hidden')) {
                chatBox.classList.add('hidden');
                chatToggle.style.display = 'flex';
            }
        });
    }

    // Utility functions
    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    formatContent(content) {
        return content.split('\n').map(paragraph => {
            if (paragraph.trim()) {
                return `<p>${this.escapeHtml(paragraph.trim())}</p>`;
            }
            return '';
        }).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showLoading(show) {
        const loading = document.getElementById('loading');
        if (show) {
            loading.classList.remove('hidden');
        } else {
            loading.classList.add('hidden');
        }
    }

    showError(message) {
        const errorBoundary = document.getElementById('error-boundary');
        const errorMessage = document.getElementById('error-message');
        
        errorMessage.textContent = message;
        errorBoundary.classList.remove('hidden');
        this.showLoading(false);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new NASAResearchApp();
});