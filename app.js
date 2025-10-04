// NASA Biological Science Archive Application
class NASAArchive {
    constructor() {
        this.allArticles = [];
        this.filteredArticles = [];
        this.currentPage = 1;
        this.articlesPerPage = 20;
        this.currentSort = 'date-desc';
        this.searchTerm = '';
        this.filters = {
            startDate: '',
            endDate: '',
            author: '',
            publication: '',
            keyword: ''
        };
        
        this.init();
    }
    
    async init() {
        try {
            console.log('Initializing NASA Archive...');
            
            // Initialize DOM elements first
            this.initializeDOM();
            
            // Show loading indicator
            this.showLoading();
            
            // Load CSV data with fallback
            await this.loadData();
            
            // Setup event listeners after DOM is ready
            this.setupEventListeners();
            
            // Display initial results
            this.applyFilters();
            this.generatePopularKeywords();
            
            // Hide loading indicator
            this.hideLoading();
            
            console.log('NASA Archive initialized successfully');
        } catch (error) {
            console.error('Error initializing application:', error);
            this.hideLoading();
            this.loadSampleData();
            this.setupEventListeners();
            this.applyFilters();
            this.generatePopularKeywords();
        }
    }
    
    async loadData() {
        const csvUrl = 'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/1b341bbc795d985f5172b42a9b91cc52/bdc20fc0-558c-4dfe-b9bc-d8056e494610/53ad0671.csv';
        
        try {
            console.log('Attempting to load CSV data...');
            
            const response = await fetch(csvUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'text/csv,text/plain,*/*'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const csvText = await response.text();
            console.log('CSV data loaded, parsing...');
            
            this.allArticles = this.parseCSV(csvText);
            
            if (this.allArticles.length === 0) {
                throw new Error('No articles found in CSV data');
            }
            
            // Process the data to ensure proper formatting
            this.allArticles = this.allArticles.map(article => ({
                ...article,
                keywords: this.parseKeywords(article.keywords || article.Keywords || ''),
                authors: this.parseAuthors(article.authors || article.Authors || ''),
                publicationDate: this.parseDate(article.publicationDate || article.PublicationDate || article.Date || ''),
                Title: article.Title || article.title || 'Untitled',
                Link: article.Link || article.link || article.URL || '#',
                publication: article.publication || article.Publication || article.Journal || 'Unknown',
                abstract: article.abstract || article.Abstract || article.Summary || 'No abstract available.'
            }));
            
            console.log(`Successfully loaded ${this.allArticles.length} research papers`);
        } catch (error) {
            console.error('Error loading CSV data:', error);
            console.log('Falling back to sample data...');
            this.loadSampleData();
        }
    }
    
    parseCSV(csvText) {
        const lines = csvText.trim().split('\n');
        if (lines.length < 2) {
            throw new Error('Invalid CSV format');
        }
        
        const headers = this.parseCSVLine(lines[0]);
        const articles = [];
        
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            try {
                const values = this.parseCSVLine(line);
                if (values.length > 0) {
                    const article = {};
                    headers.forEach((header, index) => {
                        article[header.trim()] = (values[index] || '').trim();
                    });
                    
                    // Only add articles with a title
                    if (article[headers[0]] && article[headers[0]].trim()) {
                        articles.push(article);
                    }
                }
            } catch (error) {
                console.warn(`Error parsing line ${i}:`, error);
            }
        }
        
        return articles;
    }
    
    parseCSVLine(line) {
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            const nextChar = line[i + 1];
            
            if (char === '"') {
                if (inQuotes && nextChar === '"') {
                    current += '"';
                    i++; // skip next quote
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                values.push(current.replace(/^"|"$/g, ''));
                current = '';
            } else {
                current += char;
            }
        }
        
        values.push(current.replace(/^"|"$/g, ''));
        return values;
    }
    
    parseKeywords(keywordString) {
        if (!keywordString) return [];
        try {
            // Handle JSON array format
            if (keywordString.startsWith('[') && keywordString.endsWith(']')) {
                const parsed = JSON.parse(keywordString);
                return Array.isArray(parsed) ? parsed : [];
            }
            // Handle comma-separated format
            return keywordString.split(',')
                .map(k => k.trim().replace(/^["']|["']$/g, ''))
                .filter(k => k.length > 0);
        } catch {
            return keywordString.split(',')
                .map(k => k.trim().replace(/^["']|["']$/g, ''))
                .filter(k => k.length > 0);
        }
    }
    
    parseAuthors(authorString) {
        if (!authorString) return [];
        try {
            // Handle JSON array format
            if (authorString.startsWith('[') && authorString.endsWith(']')) {
                const parsed = JSON.parse(authorString);
                return Array.isArray(parsed) ? parsed : [];
            }
            // Handle comma-separated format
            return authorString.split(',')
                .map(a => a.trim().replace(/^["']|["']$/g, ''))
                .filter(a => a.length > 0);
        } catch {
            return authorString.split(',')
                .map(a => a.trim().replace(/^["']|["']$/g, ''))
                .filter(a => a.length > 0);
        }
    }
    
    parseDate(dateString) {
        if (!dateString) return new Date().toISOString().split('T')[0];
        
        // Try to parse the date
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            // If parsing fails, try some common formats
            const formats = [
                /(\d{4})-(\d{2})-(\d{2})/,  // YYYY-MM-DD
                /(\d{2})\/(\d{2})\/(\d{4})/, // MM/DD/YYYY
                /(\d{4})\/(\d{2})\/(\d{2})/, // YYYY/MM/DD
            ];
            
            for (const format of formats) {
                const match = dateString.match(format);
                if (match) {
                    const [, year, month, day] = match;
                    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                }
            }
            
            // Return current year if all else fails
            return new Date().toISOString().split('T')[0];
        }
        
        return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    }
    
    loadSampleData() {
        // Enhanced sample data to demonstrate functionality
        this.allArticles = [
            {
                Title: "Genomic Adaptation of Microbes to the International Space Station Environment",
                Link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4136787/",
                keywords: ["Microgravity", "Genomics", "ISS", "Adaptation", "Microbes"],
                publicationDate: "2024-08-15",
                authors: ["Dr. Elena Petrov", "Dr. Kenji Tanaka", "Dr. Sarah Wilson"],
                publication: "Journal of Astrobiology",
                abstract: "A comprehensive study of microbial communities aboard the ISS, identifying key genetic markers for survival in microgravity and elevated radiation environments. This research provides crucial insights for long-duration space missions."
            },
            {
                Title: "The Effects of Long-Duration Spaceflight on Human Cardiovascular Health",
                Link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3630201/",
                keywords: ["Cardiovascular", "Astronaut Health", "Long-Duration", "Countermeasures", "Space Medicine"],
                publicationDate: "2024-03-15",
                authors: ["Dr. Maria Gonzalez", "Dr. Richard Chen", "Dr. Ben Carter"],
                publication: "Space Medicine Review",
                abstract: "This paper analyzes cardiovascular deconditioning in astronauts after 6+ month missions, proposing novel countermeasures using artificial gravity and advanced exercise protocols."
            },
            {
                Title: "Closed-Loop Algae-Based Life Support Systems for Martian Habitats",
                Link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4136787/",
                keywords: ["Algae", "Bioreactor", "Mars", "Life Support", "Sustainability"],
                publicationDate: "2024-02-10",
                authors: ["Dr. Aisha Khan", "Dr. James Morrison"],
                publication: "Life Support & Space Habitation",
                abstract: "Development and testing of a bioregenerative life support system using Chlorella vulgaris to produce oxygen and biomass from waste materials for sustainable Mars habitation."
            },
            {
                Title: "DNA Repair Mechanisms Under Simulated Solar Particle Event Conditions",
                Link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3630201/",
                keywords: ["DNA Repair", "Radiation", "Solar Particle Event", "Genetics", "Cell Biology"],
                publicationDate: "2023-09-05",
                authors: ["Dr. Ben Carter", "Dr. Sofia Rossi", "Dr. Liu Wei"],
                publication: "Radiation Research",
                abstract: "Investigating the efficacy of cellular DNA repair pathways in human cell cultures exposed to proton radiation mimicking a solar particle event during deep space missions."
            },
            {
                Title: "Biomarker Signatures for Extant Life on Enceladus Plumes",
                Link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4136787/",
                keywords: ["Enceladus", "Biomarkers", "Ocean Worlds", "Plumes", "Astrobiology"],
                publicationDate: "2024-06-30",
                authors: ["Dr. Jian Li", "Dr. Eva Rostova", "Dr. Michael Torres"],
                publication: "Journal of Exobiology",
                abstract: "A theoretical model outlining potential organic biomarkers that could be detected in the cryovolcanic plumes of Enceladus if a subsurface biosphere exists."
            }
        ];
        
        // Generate more sample data to test pagination
        const additionalSamples = [];
        for (let i = 0; i < 25; i++) {
            additionalSamples.push({
                Title: `Sample Research Paper ${i + 6}: Advanced Space Biology Studies`,
                Link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4136787/",
                keywords: ["Space Biology", "Research", "NASA", "Microgravity", "Experiments"],
                publicationDate: `202${Math.floor(Math.random() * 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                authors: [`Dr. Researcher ${String.fromCharCode(65 + i)}`, `Dr. Scientist ${String.fromCharCode(90 - i)}`],
                publication: `Science Journal ${i % 3 + 1}`,
                abstract: `This is a sample research paper abstract for testing purposes. Paper ${i + 6} demonstrates various aspects of space biology and microgravity research. The study provides valuable insights into biological processes in space environments.`
            });
        }
        
        this.allArticles = [...this.allArticles, ...additionalSamples];
        console.log('Using enhanced sample data with', this.allArticles.length, 'articles');
    }
    
    initializeDOM() {
        // Wait for DOM to be fully ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeDOM());
            return;
        }
        
        this.elements = {
            mainSearch: document.getElementById('mainSearch'),
            startDate: document.getElementById('startDate'),
            endDate: document.getElementById('endDate'),
            authorFilter: document.getElementById('authorFilter'),
            publicationFilter: document.getElementById('publicationFilter'),
            keywordFilter: document.getElementById('keywordFilter'),
            clearFilters: document.getElementById('clearFilters'),
            sortBy: document.getElementById('sortBy'),
            articlesContainer: document.getElementById('articlesContainer'),
            resultsCount: document.getElementById('resultsCount'),
            noResults: document.getElementById('noResults'),
            loadingIndicator: document.getElementById('loadingIndicator'),
            paginationContainer: document.getElementById('paginationContainer'),
            prevPage: document.getElementById('prevPage'),
            nextPage: document.getElementById('nextPage'),
            pageNumbers: document.getElementById('pageNumbers'),
            popularKeywordsContainer: document.querySelector('.popular-keywords-container'),
            searchButton: document.getElementById('searchButton')
        };
        
        // Verify all elements exist
        Object.entries(this.elements).forEach(([key, element]) => {
            if (!element) {
                console.warn(`Element not found: ${key}`);
            }
        });
    }
    
    setupEventListeners() {
        if (!this.elements.mainSearch) {
            console.error('DOM elements not ready, retrying...');
            setTimeout(() => this.setupEventListeners(), 100);
            return;
        }
        
        // Debounced search
        this.elements.mainSearch.addEventListener('input', this.debounce(() => {
            this.searchTerm = this.elements.mainSearch.value.toLowerCase().trim();
            this.currentPage = 1;
            this.applyFilters();
        }, 300));
        
        // Filter inputs with debouncing
        this.elements.startDate.addEventListener('change', () => this.handleFilters());
        this.elements.endDate.addEventListener('change', () => this.handleFilters());
        this.elements.authorFilter.addEventListener('input', this.debounce(() => this.handleFilters(), 300));
        this.elements.publicationFilter.addEventListener('input', this.debounce(() => this.handleFilters(), 300));
        this.elements.keywordFilter.addEventListener('input', this.debounce(() => this.handleFilters(), 300));
        
        // Clear filters
        this.elements.clearFilters.addEventListener('click', () => this.clearAllFilters());
        
        // Sort
        this.elements.sortBy.addEventListener('change', () => {
            this.currentSort = this.elements.sortBy.value;
            this.applyFilters();
        });
        
        // Search button
        this.elements.searchButton.addEventListener('click', () => {
            this.searchTerm = this.elements.mainSearch.value.toLowerCase().trim();
            this.currentPage = 1;
            this.applyFilters();
        });
        
        // Pagination
        this.elements.prevPage.addEventListener('click', () => this.changePage(this.currentPage - 1));
        this.elements.nextPage.addEventListener('click', () => this.changePage(this.currentPage + 1));
        
        // Enter key for search
        this.elements.mainSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchTerm = this.elements.mainSearch.value.toLowerCase().trim();
                this.currentPage = 1;
                this.applyFilters();
            }
        });
        
        console.log('Event listeners setup complete');
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    handleFilters() {
        this.filters = {
            startDate: this.elements.startDate.value,
            endDate: this.elements.endDate.value,
            author: this.elements.authorFilter.value.toLowerCase().trim(),
            publication: this.elements.publicationFilter.value.toLowerCase().trim(),
            keyword: this.elements.keywordFilter.value.toLowerCase().trim()
        };
        this.currentPage = 1;
        this.applyFilters();
    }
    
    clearAllFilters() {
        // Clear search
        this.elements.mainSearch.value = '';
        this.searchTerm = '';
        
        // Clear filters
        this.elements.startDate.value = '';
        this.elements.endDate.value = '';
        this.elements.authorFilter.value = '';
        this.elements.publicationFilter.value = '';
        this.elements.keywordFilter.value = '';
        
        this.filters = {
            startDate: '',
            endDate: '',
            author: '',
            publication: '',
            keyword: ''
        };
        
        this.currentPage = 1;
        this.applyFilters();
    }
    
    applyFilters() {
        // Start with all articles
        this.filteredArticles = [...this.allArticles];
        
        // Apply search
        if (this.searchTerm) {
            this.filteredArticles = this.filteredArticles.filter(article => 
                this.matchesSearch(article, this.searchTerm)
            );
        }
        
        // Apply filters
        this.filteredArticles = this.filteredArticles.filter(article => {
            return this.matchesFilters(article);
        });
        
        // Apply sorting
        this.sortArticles();
        
        // Update display
        this.updateResultsCount();
        this.displayArticles();
        this.updatePagination();
    }
    
    matchesSearch(article, searchTerm) {
        const searchableText = [
            article.Title || '',
            article.abstract || '',
            ...(article.authors || []),
            ...(article.keywords || []),
            article.publication || ''
        ].join(' ').toLowerCase();
        
        return searchableText.includes(searchTerm);
    }
    
    matchesFilters(article) {
        // Date range filter
        if (this.filters.startDate || this.filters.endDate) {
            const articleDate = new Date(article.publicationDate);
            if (this.filters.startDate && articleDate < new Date(this.filters.startDate)) {
                return false;
            }
            if (this.filters.endDate && articleDate > new Date(this.filters.endDate)) {
                return false;
            }
        }
        
        // Author filter
        if (this.filters.author) {
            const authors = (article.authors || []).join(' ').toLowerCase();
            if (!authors.includes(this.filters.author)) {
                return false;
            }
        }
        
        // Publication filter
        if (this.filters.publication) {
            const publication = (article.publication || '').toLowerCase();
            if (!publication.includes(this.filters.publication)) {
                return false;
            }
        }
        
        // Keyword filter
        if (this.filters.keyword) {
            const keywords = (article.keywords || []).join(' ').toLowerCase();
            if (!keywords.includes(this.filters.keyword)) {
                return false;
            }
        }
        
        return true;
    }
    
    sortArticles() {
        this.filteredArticles.sort((a, b) => {
            switch (this.currentSort) {
                case 'date-desc':
                    return new Date(b.publicationDate) - new Date(a.publicationDate);
                case 'date-asc':
                    return new Date(a.publicationDate) - new Date(b.publicationDate);
                case 'title-asc':
                    return (a.Title || '').localeCompare(b.Title || '');
                case 'title-desc':
                    return (b.Title || '').localeCompare(a.Title || '');
                case 'relevance':
                    if (!this.searchTerm) return 0;
                    const aMatches = this.countMatches(a, this.searchTerm);
                    const bMatches = this.countMatches(b, this.searchTerm);
                    return bMatches - aMatches;
                default:
                    return 0;
            }
        });
    }
    
    countMatches(article, searchTerm) {
        const text = [
            article.Title || '',
            article.abstract || '',
            ...(article.authors || []),
            ...(article.keywords || [])
        ].join(' ').toLowerCase();
        
        return (text.match(new RegExp(this.escapeRegExp(searchTerm), 'gi')) || []).length;
    }
    
    displayArticles() {
        const startIndex = (this.currentPage - 1) * this.articlesPerPage;
        const endIndex = startIndex + this.articlesPerPage;
        const articlesToShow = this.filteredArticles.slice(startIndex, endIndex);
        
        if (articlesToShow.length === 0) {
            this.elements.articlesContainer.innerHTML = '';
            this.elements.noResults.classList.remove('hidden');
            return;
        }
        
        this.elements.noResults.classList.add('hidden');
        this.elements.articlesContainer.innerHTML = articlesToShow.map(article => 
            this.createArticleCard(article)
        ).join('');
    }
    
    createArticleCard(article) {
        const keywords = (article.keywords || []).slice(0, 8);
        const authors = (article.authors || []).slice(0, 3);
        const moreAuthors = article.authors && article.authors.length > 3 ? ` and ${article.authors.length - 3} more` : '';
        
        return `
            <div class="article-card">
                <a href="${this.escapeHtml(article.Link || '#')}" target="_blank" class="article-title">
                    ${this.escapeHtml(article.Title || 'Untitled')}
                </a>
                <div class="article-meta">
                    <div class="article-authors">
                        <strong>Authors:</strong> ${this.escapeHtml(authors.join(', '))}${moreAuthors}
                    </div>
                    <div class="article-publication">
                        <strong>Publication:</strong> ${this.escapeHtml(article.publication || 'Unknown')}
                    </div>
                    <div class="article-date">
                        <strong>Date:</strong> ${this.formatDate(article.publicationDate)}
                    </div>
                </div>
                <div class="article-abstract">
                    ${this.escapeHtml(this.truncateText(article.abstract || 'No abstract available.', 300))}
                </div>
                <div class="article-keywords">
                    ${keywords.map(keyword => 
                        `<span class="keyword-tag">${this.escapeHtml(keyword)}</span>`
                    ).join('')}
                </div>
                <a href="${this.escapeHtml(article.Link || '#')}" target="_blank" class="view-paper-btn">
                    <i class="fas fa-external-link-alt"></i>
                    View Paper
                </a>
            </div>
        `;
    }
    
    updateResultsCount() {
        const total = this.filteredArticles.length;
        const start = Math.min((this.currentPage - 1) * this.articlesPerPage + 1, total);
        const end = Math.min(this.currentPage * this.articlesPerPage, total);
        
        if (total === 0) {
            this.elements.resultsCount.textContent = 'No articles found';
        } else {
            this.elements.resultsCount.textContent = `Showing ${start}-${end} of ${total} articles`;
        }
    }
    
    updatePagination() {
        const totalPages = Math.ceil(this.filteredArticles.length / this.articlesPerPage);
        
        if (totalPages <= 1) {
            this.elements.paginationContainer.classList.add('hidden');
            return;
        }
        
        this.elements.paginationContainer.classList.remove('hidden');
        
        // Update prev/next buttons
        this.elements.prevPage.disabled = this.currentPage === 1;
        this.elements.nextPage.disabled = this.currentPage === totalPages;
        
        // Generate page numbers
        this.elements.pageNumbers.innerHTML = this.generatePageNumbers(totalPages);
    }
    
    generatePageNumbers(totalPages) {
        const pages = [];
        const current = this.currentPage;
        const maxVisible = 7;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(this.createPageButton(i, i === current));
            }
        } else {
            // Always show first page
            pages.push(this.createPageButton(1, current === 1));
            
            if (current > 3) {
                pages.push('<span class="page-ellipsis">...</span>');
            }
            
            // Show current page and neighbors
            const start = Math.max(2, current - 1);
            const end = Math.min(totalPages - 1, current + 1);
            
            for (let i = start; i <= end; i++) {
                pages.push(this.createPageButton(i, i === current));
            }
            
            if (current < totalPages - 2) {
                pages.push('<span class="page-ellipsis">...</span>');
            }
            
            // Always show last page
            pages.push(this.createPageButton(totalPages, current === totalPages));
        }
        
        return pages.join('');
    }
    
    createPageButton(pageNum, isActive) {
        const activeClass = isActive ? ' active' : '';
        return `
            <button class="page-number${activeClass}" onclick="archive.changePage(${pageNum})">
                ${pageNum}
            </button>
        `;
    }
    
    changePage(newPage) {
        const totalPages = Math.ceil(this.filteredArticles.length / this.articlesPerPage);
        if (newPage >= 1 && newPage <= totalPages) {
            this.currentPage = newPage;
            this.displayArticles();
            this.updatePagination();
            this.updateResultsCount();
            
            // Scroll to top of results
            this.elements.articlesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    generatePopularKeywords() {
        const keywordCounts = {};
        
        this.allArticles.forEach(article => {
            if (article.keywords && Array.isArray(article.keywords)) {
                article.keywords.forEach(keyword => {
                    if (keyword && keyword.length > 2) {
                        const key = keyword.toLowerCase().trim();
                        keywordCounts[key] = (keywordCounts[key] || 0) + 1;
                    }
                });
            }
        });
        
        // Sort by frequency and take top 12
        const popularKeywords = Object.entries(keywordCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 12)
            .map(([keyword]) => keyword);
        
        if (this.elements.popularKeywordsContainer) {
            this.elements.popularKeywordsContainer.innerHTML = popularKeywords
                .map(keyword => `
                    <span class="popular-keyword" onclick="archive.selectKeyword('${this.escapeHtml(keyword)}')">
                        ${this.escapeHtml(keyword)}
                    </span>
                `).join('');
        }
    }
    
    selectKeyword(keyword) {
        this.elements.keywordFilter.value = keyword;
        this.handleFilters();
    }
    
    formatDate(dateString) {
        if (!dateString) return 'Unknown';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    }
    
    truncateText(text, maxLength) {
        if (!text || text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }
    
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text.toString();
        return div.innerHTML;
    }
    
    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    showLoading() {
        if (this.elements.loadingIndicator) {
            this.elements.loadingIndicator.classList.remove('hidden');
        }
    }
    
    hideLoading() {
        if (this.elements.loadingIndicator) {
            this.elements.loadingIndicator.classList.add('hidden');
        }
    }
    
    showError(message) {
        if (this.elements.articlesContainer) {
            this.elements.articlesContainer.innerHTML = `
                <div class="error-message" style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <h4>Error</h4>
                    <p>${this.escapeHtml(message)}</p>
                </div>
            `;
        }
    }
}

// Initialize the application
let archive;
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing archive...');
    archive = new NASAArchive();
});

// Fallback initialization if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // DOM hasn't loaded yet
} else {
    // DOM has already loaded
    console.log('DOM already loaded, initializing archive...');
    archive = new NASAArchive();
}