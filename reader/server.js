const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage
let papers = [];

/**
 * Load and parse CSV file into memory
 * This function reads the papers_processed.csv file and converts it to an array of objects
 */
function loadPapersFromCSV() {
    return new Promise((resolve, reject) => {
        const results = [];
        const csvPath = path.join(__dirname, 'papers_processed.csv');
        
        // Check if processed CSV file exists
        if (!fs.existsSync(csvPath)) {
            reject(new Error('papers_processed.csv file not found. Please ensure it exists in the server directory.'));
            return;
        }

        console.log('Loading papers from CSV...');
        
        fs.createReadStream(csvPath)
            .pipe(csv())
            .on('data', (data) => {
                // Parse CSV row into paper object
                results.push({
                    articleId: data.articleId,
                    title: data.title,
                    authors: data.authors,
                    publicationDate: data.publicationDate,
                    keywords: data.keywords,
                    abstract: data.abstract,
                    content: data.content,
                    pdfUrl: data.pdfUrl
                });
            })
            .on('end', () => {
                papers = results;
                console.log(`Successfully loaded ${papers.length} papers from CSV`);
                resolve(results);
            })
            .on('error', (error) => {
                console.error('Error loading CSV:', error);
                reject(error);
            });
    });
}

/**
 * API Routes
 */

// GET /api/papers - Returns the full list of all articles
app.get('/api/papers', (req, res) => {
    try {
        res.json({
            success: true,
            data: papers,
            count: papers.length,
            message: `Retrieved ${papers.length} research papers`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving papers',
            error: error.message
        });
    }
});

// GET /api/search - Search papers by query parameter
app.get('/api/search', (req, res) => {
    try {
        const query = req.query.q;
        
        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Query parameter "q" is required'
            });
        }

        // Search through title, abstract, keywords, and authors
        const searchResults = papers.filter(paper => {
            const searchFields = [
                paper.title || '',
                paper.abstract || '',
                paper.keywords || '',
                paper.authors || ''
            ].join(' ').toLowerCase();
            
            return searchFields.includes(query.toLowerCase());
        });

        res.json({
            success: true,
            data: searchResults,
            count: searchResults.length,
            query: query,
            message: `Found ${searchResults.length} papers matching "${query}"`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching papers',
            error: error.message
        });
    }
});

// GET /api/article/:articleId - Get specific article by ID
app.get('/api/article/:articleId', (req, res) => {
    try {
        const articleId = req.params.articleId;
        
        // Find the specific article in the in-memory array
        const article = papers.find(paper => paper.articleId === articleId);
        
        if (!article) {
            return res.status(404).json({
                success: false,
                message: `Article with ID "${articleId}" not found`
            });
        }

        res.json({
            success: true,
            data: article
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving article',
            error: error.message
        });
    }
});

// GET /api/stats - Get database statistics
app.get('/api/stats', (req, res) => {
    try {
        // Calculate some basic statistics
        const totalPapers = papers.length;
        const keywordStats = {};
        const yearStats = {};
        
        papers.forEach(paper => {
            // Count keywords
            if (paper.keywords) {
                const keywords = paper.keywords.split(',').map(k => k.trim());
                keywords.forEach(keyword => {
                    keywordStats[keyword] = (keywordStats[keyword] || 0) + 1;
                });
            }
            
            // Count publication years
            if (paper.publicationDate) {
                const year = paper.publicationDate.split('-')[0];
                yearStats[year] = (yearStats[year] || 0) + 1;
            }
        });

        // Get top 10 keywords
        const topKeywords = Object.entries(keywordStats)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([keyword, count]) => ({ keyword, count }));

        res.json({
            success: true,
            data: {
                totalPapers,
                topKeywords,
                publicationYears: Object.keys(yearStats).sort(),
                yearStats
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving statistics',
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'NASA Research Archive API is running',
        timestamp: new Date().toISOString(),
        papersLoaded: papers.length,
        status: 'healthy'
    });
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found'
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server Error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

/**
 * Server startup
 */
async function startServer() {
    try {
        // Load papers from CSV before starting the server
        await loadPapersFromCSV();
        
        app.listen(PORT, () => {
            console.log('='.repeat(60));
            console.log('🚀 NASA Research Archive Server Started');
            console.log('='.repeat(60));
            console.log(`📡 Server running on: http://localhost:${PORT}`);
            console.log(`📊 Papers loaded: ${papers.length}`);
            console.log(`🔍 API endpoints:`);
            console.log(`   GET /api/papers - Get all papers`);
            console.log(`   GET /api/search?q=query - Search papers`);
            console.log(`   GET /api/article/:id - Get specific article`);
            console.log(`   GET /api/stats - Get database statistics`);
            console.log(`   GET /api/health - Health check`);
            console.log('='.repeat(60));
            console.log('📄 Database contains real NASA/space research papers');
            console.log('🔗 All papers link to PMC articles');
            console.log('='.repeat(60));
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        console.error('💡 Make sure papers_processed.csv exists in the server directory');
        process.exit(1);
    }
}

// Start the server
startServer();

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down NASA Research Archive Server...');
    process.exit(0);
});