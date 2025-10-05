// Space-Bio-Knowledge Application JavaScript

// Application data (simulating backend responses)
const appData = {
  papers: [
    {
      id: 1,
      title: "Mice in Bion-M 1 space mission: training and selection",
      authors: ["Smith, J.", "Johnson, A.", "Brown, K."],
      publication_date: "2021-03-15",
      abstract: "This study examines the training and selection process for mice used in the Bion-M 1 space mission, focusing on physiological and behavioral adaptations required for spaceflight.",
      summary: "Comprehensive analysis of mouse selection criteria and training protocols for space missions.",
      doi: "10.1000/example1",
      readability_score: 65.2,
      link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4136787/"
    },
    {
      id: 2,
      title: "Microgravity induces pelvic bone loss through osteoclastic activity, osteocytic osteolysis, and osteoblastic cell cycle inhibition by CDKN1a/p21",
      authors: ["Anderson, M.", "Wilson, T.", "Davis, R."],
      publication_date: "2020-11-22",
      abstract: "Investigation of bone loss mechanisms in microgravity conditions, specifically examining the role of osteoclastic activity and cell cycle regulation.",
      summary: "Study reveals multiple pathways contributing to bone loss in space environments.",
      doi: "10.1000/example2", 
      readability_score: 58.7,
      link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3630201/"
    },
    {
      id: 3,
      title: "Stem Cell Health and Tissue Regeneration in Microgravity",
      authors: ["Martinez, L.", "Thompson, S.", "White, J."],
      publication_date: "2022-05-10",
      abstract: "Analysis of stem cell behavior and tissue regeneration processes under microgravity conditions, with implications for long-term space missions.",
      summary: "Explores how microgravity affects stem cell function and regenerative medicine applications.",
      doi: "10.1000/example3",
      readability_score: 72.1,
      link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11988870/"
    },
    {
      id: 4,
      title: "Spaceflight Modulates the Expression of Key Oxidative Stress and Cell Cycle Related Genes in Heart",
      authors: ["Garcia, P.", "Miller, C.", "Jones, D."],
      publication_date: "2021-08-18",
      abstract: "Examination of gene expression changes in cardiac tissue following spaceflight, focusing on oxidative stress and cell cycle regulation.",
      summary: "Spaceflight induces significant changes in cardiac gene expression patterns.",
      doi: "10.1000/example4",
      readability_score: 61.4,
      link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8396460/"
    },
    {
      id: 5,
      title: "NASA GeneLab platform utilized for biological response to space radiation in animal models",
      authors: ["Rodriguez, A.", "Kim, H.", "Parker, M."],
      publication_date: "2022-02-14",
      abstract: "Utilization of NASA GeneLab database to analyze biological responses to space radiation across multiple animal model studies.",
      summary: "Comprehensive analysis of radiation effects using NASA's open science platform.",
      doi: "10.1000/example5",
      readability_score: 68.9,
      link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7072278/"
    }
  ],
  graphData: {
    nodes: [
      {id: "CDKN1a", name: "CDKN1a/p21", type: "Gene", group: 1, color: "#ff6b6b"},
      {id: "Osteoclast", name: "Osteoclast", type: "Cell", group: 2, color: "#4ecdc4"},
      {id: "Osteoblast", name: "Osteoblast", type: "Cell", group: 2, color: "#4ecdc4"},
      {id: "Mouse", name: "Mus musculus", type: "Organism", group: 3, color: "#45b7d1"},
      {id: "BoneRemodeling", name: "Bone Remodeling", type: "Process", group: 4, color: "#96ceb4"},
      {id: "Microgravity", name: "Microgravity", type: "Condition", group: 5, color: "#ffeaa7"},
      {id: "StemCell", name: "Stem Cell", type: "Cell", group: 2, color: "#4ecdc4"},
      {id: "Heart", name: "Heart", type: "Organ", group: 6, color: "#fd79a8"},
      {id: "OxidativeStress", name: "Oxidative Stress", type: "Process", group: 4, color: "#96ceb4"},
      {id: "GeneLab", name: "NASA GeneLab", type: "Database", group: 7, color: "#a29bfe"},
      {id: "Radiation", name: "Space Radiation", type: "Condition", group: 5, color: "#ffeaa7"}
    ],
    links: [
      {source: "Microgravity", target: "BoneRemodeling", type: "AFFECTS"},
      {source: "CDKN1a", target: "Osteoblast", type: "REGULATES"},
      {source: "Osteoclast", target: "BoneRemodeling", type: "PARTICIPATES_IN"},
      {source: "Mouse", target: "BoneRemodeling", type: "SUBJECT_OF"},
      {source: "Microgravity", target: "StemCell", type: "AFFECTS"},
      {source: "Microgravity", target: "Heart", type: "AFFECTS"},
      {source: "OxidativeStress", target: "Heart", type: "OCCURS_IN"},
      {source: "Radiation", target: "Mouse", type: "EXPOSES"},
      {source: "GeneLab", target: "Radiation", type: "STUDIES"}
    ]
  },
  sampleQA: [
    {
      question: "How does microgravity affect bone density?",
      answer: "Microgravity significantly impacts bone density through multiple mechanisms. Studies show that microgravity induces pelvic bone loss through increased osteoclastic activity, osteocytic osteolysis, and inhibition of osteoblastic cell cycle by proteins like CDKN1a/p21. This leads to decreased bone formation and increased bone resorption, resulting in overall bone density loss during spaceflight."
    },
    {
      question: "What are the effects of space radiation on biological systems?",
      answer: "Space radiation has complex effects on biological systems, including DNA damage, oxidative stress, and altered gene expression. NASA GeneLab studies show that space radiation can activate pathways like FYN through reactive oxygen species, potentially impacting cardiovascular systems long-term. The effects vary depending on radiation dose, ion type, and exposure duration."
    },
    {
      question: "How do plants respond to spaceflight conditions?",
      answer: "Plants show significant responses to spaceflight conditions, including altered gravitropism, changes in root development, and modified gene expression patterns. Studies on Arabidopsis reveal that spaceflight induces specific proteomic changes and affects the unfolded protein response. Plant growth patterns, including root skewing and cell wall modifications, are also altered in microgravity."
    }
  ],
  sampleProtocols: [
    {
      goal: "Study bone loss in microgravity",
      protocol: "1. Select appropriate animal models (mice or rats)\n2. Establish baseline measurements: bone density, markers of bone formation/resorption\n3. Subject animals to simulated microgravity using hindlimb unloading or rotation\n4. Monitor animals daily for health and behavioral changes\n5. Collect samples at predetermined time points (1, 2, 4, 8 weeks)\n6. Analyze: histomorphometry, micro-CT, biochemical markers\n7. Compare results with ground controls\n8. Statistical analysis and interpretation of results"
    },
    {
      goal: "Assess plant growth in space conditions",
      protocol: "1. Select plant species (Arabidopsis thaliana recommended)\n2. Prepare sterile seeds and growth medium\n3. Set up growth chambers with controlled lighting, temperature, humidity\n4. Plant seeds in appropriate substrates\n5. Monitor germination and early growth phases\n6. Document growth patterns, root development, leaf morphology\n7. Collect samples for molecular analysis (RNA, proteins)\n8. Perform comparative analysis with Earth-grown controls\n9. Analyze gene expression changes related to gravity response"
    }
  ],
  translations: {
    en: {
      search: "Search",
      papers: "Papers",
      knowledge_graph: "Knowledge Graph",
      ai_assistant: "AI Assistant",
      protocol_planner: "Protocol Planner",
      ask_question: "Ask a Question",
      generate_protocol: "Generate Protocol",
      readability: "Readability",
      publication_date: "Publication Date",
      authors: "Authors",
      abstract: "Abstract",
      summary: "Summary"
    },
    es: {
      search: "Buscar",
      papers: "Artículos", 
      knowledge_graph: "Gráfico de Conocimiento",
      ai_assistant: "Asistente IA",
      protocol_planner: "Planificador de Protocolos",
      ask_question: "Hacer una Pregunta",
      generate_protocol: "Generar Protocolo",
      readability: "Legibilidad",
      publication_date: "Fecha de Publicación",
      authors: "Autores",
      abstract: "Resumen",
      summary: "Sumario"
    },
    zh: {
      search: "搜索",
      papers: "论文",
      knowledge_graph: "知识图谱", 
      ai_assistant: "AI助手",
      protocol_planner: "协议规划器",
      ask_question: "提问",
      generate_protocol: "生成协议",
      readability: "可读性",
      publication_date: "发表日期",
      authors: "作者",
      abstract: "摘要",
      summary: "总结"
    }
  }
};

// Application state
let currentLanguage = 'en';
let currentSection = 'papers';
let filteredPapers = [...appData.papers];
let graphSimulation = null;

// Initialize application
function initApp() {
  console.log('Initializing app...');
  
  // Hide loading overlay immediately
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    loadingOverlay.classList.add('hidden');
  }
  
  setupEventListeners();
  renderPapers();
  updateLanguage();
  showSection('papers');
  
  // Set initial active language button
  const enButton = document.querySelector('[data-lang="en"]');
  if (enButton) {
    enButton.classList.add('active');
  }
  
  console.log('App initialized successfully');
}

// Event listeners setup
function setupEventListeners() {
  console.log('Setting up event listeners...');
  
  // Navigation tabs
  const navTabs = document.querySelectorAll('.nav-tab');
  navTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const section = tab.dataset.tab;
      console.log('Switching to section:', section);
      showSection(section);
      updateActiveTab(tab);
    });
  });

  // Search functionality
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  
  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Search button clicked');
      performSearch();
    });
  }
  
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        console.log('Search enter pressed');
        performSearch();
      }
    });
  }

  // Filters
  const topicFilter = document.getElementById('topicFilter');
  const yearFilter = document.getElementById('yearFilter');
  
  if (topicFilter) {
    topicFilter.addEventListener('change', applyFilters);
  }
  if (yearFilter) {
    yearFilter.addEventListener('change', applyFilters);
  }

  // AI Assistant
  const askBtn = document.getElementById('askBtn');
  const questionInput = document.getElementById('questionInput');
  
  if (askBtn) {
    askBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Ask button clicked');
      askQuestion();
    });
  }
  
  if (questionInput) {
    questionInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        askQuestion();
      }
    });
  }

  // Example questions
  setTimeout(() => {
    const exampleQuestions = document.querySelectorAll('.example-question');
    exampleQuestions.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const question = btn.dataset.question;
        const questionInput = document.getElementById('questionInput');
        if (questionInput) {
          questionInput.value = question;
          askQuestion();
        }
      });
    });
  }, 100);

  // Protocol Planner
  const generateProtocolBtn = document.getElementById('generateProtocolBtn');
  if (generateProtocolBtn) {
    generateProtocolBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Generate protocol button clicked');
      generateProtocol();
    });
  }

  // Example protocols
  setTimeout(() => {
    const exampleProtocols = document.querySelectorAll('.example-protocol');
    exampleProtocols.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const goal = btn.dataset.goal;
        const goalInput = document.getElementById('goalInput');
        if (goalInput) {
          goalInput.value = goal;
          generateProtocol();
        }
      });
    });
  }, 100);

  // Language switching
  const languageButtons = document.querySelectorAll('[data-lang]');
  languageButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.dataset.lang;
      console.log('Switching language to:', lang);
      switchLanguage(lang);
      updateActiveLanguage(btn);
    });
  });

  // Modal controls
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  
  if (modalClose) {
    modalClose.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }
  
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  // Graph controls
  const resetGraphBtn = document.getElementById('resetGraphBtn');
  const expandGraphBtn = document.getElementById('expandGraphBtn');
  
  if (resetGraphBtn) {
    resetGraphBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetGraph();
    });
  }
  
  if (expandGraphBtn) {
    expandGraphBtn.addEventListener('click', (e) => {
      e.preventDefault();
      expandGraph();
    });
  }
  
  console.log('Event listeners setup complete');
}

// Navigation functions
function showSection(sectionName) {
  console.log('Showing section:', sectionName);
  currentSection = sectionName;
  
  const contentSections = document.querySelectorAll('.content-section');
  contentSections.forEach(section => {
    section.classList.remove('active');
  });
  
  const targetSection = document.getElementById(`${sectionName}-section`);
  if (targetSection) {
    targetSection.classList.add('active');
    console.log('Section activated:', sectionName);
  } else {
    console.error('Section not found:', sectionName);
  }

  // Initialize section-specific functionality
  if (sectionName === 'graph') {
    setTimeout(() => {
      initializeGraph();
    }, 200);
  }
}

function updateActiveTab(activeTab) {
  const navTabs = document.querySelectorAll('.nav-tab');
  navTabs.forEach(tab => {
    tab.classList.remove('active');
  });
  activeTab.classList.add('active');
}

// Search and filter functions
function performSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  
  const query = searchInput.value.toLowerCase().trim();
  console.log('Performing search for:', query);
  
  if (!query) {
    filteredPapers = [...appData.papers];
  } else {
    filteredPapers = appData.papers.filter(paper => 
      paper.title.toLowerCase().includes(query) ||
      paper.abstract.toLowerCase().includes(query) ||
      paper.authors.some(author => author.toLowerCase().includes(query))
    );
  }
  
  console.log('Filtered papers:', filteredPapers.length);
  renderPapers();
  
  // Also search in graph if on graph section
  if (currentSection === 'graph') {
    highlightGraphNodes(query);
  }
}

function applyFilters() {
  console.log('Applying filters');
  let papers = [...appData.papers];
  
  const topicFilter = document.getElementById('topicFilter');
  const yearFilter = document.getElementById('yearFilter');
  
  const topicValue = topicFilter ? topicFilter.value : '';
  const yearValue = yearFilter ? yearFilter.value : '';
  
  if (topicValue) {
    papers = papers.filter(paper => {
      switch(topicValue) {
        case 'bone': return paper.title.toLowerCase().includes('bone');
        case 'radiation': return paper.title.toLowerCase().includes('radiation');
        case 'stem-cell': return paper.title.toLowerCase().includes('stem cell');
        case 'cardiac': return paper.title.toLowerCase().includes('heart') || paper.title.toLowerCase().includes('cardiac');
        default: return true;
      }
    });
  }
  
  if (yearValue) {
    papers = papers.filter(paper => 
      paper.publication_date.startsWith(yearValue)
    );
  }
  
  filteredPapers = papers;
  renderPapers();
}

// Paper rendering functions
function renderPapers() {
  console.log('Rendering papers:', filteredPapers.length);
  const papersGrid = document.getElementById('papersGrid');
  const paperCount = document.getElementById('paperCount');
  
  if (!papersGrid) return;
  
  papersGrid.innerHTML = '';
  if (paperCount) {
    paperCount.textContent = filteredPapers.length;
  }
  
  filteredPapers.forEach(paper => {
    const paperCard = createPaperCard(paper);
    papersGrid.appendChild(paperCard);
  });
}

function createPaperCard(paper) {
  const card = document.createElement('div');
  card.className = 'paper-card';
  
  // Add click listener
  card.addEventListener('click', () => {
    console.log('Paper card clicked:', paper.title);
    openPaperModal(paper);
  });
  
  card.innerHTML = `
    <h3 class="paper-title">${paper.title}</h3>
    <div class="paper-meta">
      <div class="paper-authors">${paper.authors.join(', ')}</div>
      <div class="paper-date">${formatDate(paper.publication_date)}</div>
    </div>
    <p class="paper-abstract">${truncateText(paper.abstract, 150)}</p>
    <div class="paper-footer">
      <div class="readability-badge">
        <span data-translate="readability">Readability</span>: ${paper.readability_score}
      </div>
      <a href="${paper.link}" target="_blank" class="paper-link" onclick="event.stopPropagation()">View Paper →</a>
    </div>
  `;
  
  return card;
}

function openPaperModal(paper) {
  console.log('Opening modal for paper:', paper.title);
  const paperModal = document.getElementById('paperModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  
  if (!paperModal || !modalTitle || !modalBody) {
    console.error('Modal elements not found');
    return;
  }
  
  modalTitle.textContent = paper.title;
  modalBody.innerHTML = `
    <div class="paper-details">
      <div class="detail-section">
        <h4 data-translate="authors">Authors</h4>
        <p>${paper.authors.join(', ')}</p>
      </div>
      <div class="detail-section">
        <h4 data-translate="publication_date">Publication Date</h4>
        <p>${formatDate(paper.publication_date)}</p>
      </div>
      <div class="detail-section">
        <h4>DOI</h4>
        <p>${paper.doi}</p>
      </div>
      <div class="detail-section">
        <h4 data-translate="abstract">Abstract</h4>
        <p>${paper.abstract}</p>
      </div>
      <div class="detail-section">
        <h4 data-translate="summary">Summary</h4>
        <p>${paper.summary}</p>
      </div>
      <div class="detail-section">
        <h4 data-translate="readability">Readability Score</h4>
        <p>${paper.readability_score}</p>
      </div>
      <div class="detail-section">
        <a href="${paper.link}" target="_blank" class="btn btn--primary">View Original Paper</a>
      </div>
    </div>
  `;
  
  paperModal.classList.remove('hidden');
  updateLanguage(); // Update translations in modal
}

function closeModal() {
  console.log('Closing modal');
  const paperModal = document.getElementById('paperModal');
  if (paperModal) {
    paperModal.classList.add('hidden');
  }
}

// Knowledge Graph functions
function initializeGraph() {
  console.log('Initializing graph...');
  const canvas = document.getElementById('graphCanvas');
  if (!canvas) {
    console.error('Graph canvas not found');
    return;
  }
  
  const ctx = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  
  console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
  
  // Initialize node positions
  const nodes = appData.graphData.nodes.map(node => ({
    ...node,
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: 0,
    vy: 0,
    radius: 15
  }));
  
  const links = appData.graphData.links.map(link => ({
    ...link,
    source: nodes.find(n => n.id === link.source),
    target: nodes.find(n => n.id === link.target)
  })).filter(link => link.source && link.target);
  
  console.log('Graph nodes:', nodes.length, 'links:', links.length);
  
  // Simple force simulation
  function simulateForces() {
    // Apply forces
    nodes.forEach(node => {
      // Center force
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      node.vx += (centerX - node.x) * 0.001;
      node.vy += (centerY - node.y) * 0.001;
      
      // Repulsion between nodes
      nodes.forEach(other => {
        if (node !== other) {
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 0 && distance < 200) {
            const force = 300 / (distance * distance);
            node.vx += dx / distance * force;
            node.vy += dy / distance * force;
          }
        }
      });
    });
    
    // Link forces
    links.forEach(link => {
      const dx = link.target.x - link.source.x;
      const dy = link.target.y - link.source.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const targetDistance = 100;
      const force = (distance - targetDistance) * 0.05;
      
      if (distance > 0) {
        link.source.vx += dx / distance * force;
        link.source.vy += dy / distance * force;
        link.target.vx -= dx / distance * force;
        link.target.vy -= dy / distance * force;
      }
    });
    
    // Update positions
    nodes.forEach(node => {
      node.vx *= 0.9; // Damping
      node.vy *= 0.9;
      node.x += node.vx;
      node.y += node.vy;
      
      // Keep nodes in bounds
      node.x = Math.max(node.radius, Math.min(canvas.width - node.radius, node.x));
      node.y = Math.max(node.radius, Math.min(canvas.height - node.radius, node.y));
    });
  }
  
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw links
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    links.forEach(link => {
      ctx.beginPath();
      ctx.moveTo(link.source.x, link.source.y);
      ctx.lineTo(link.target.x, link.target.y);
      ctx.stroke();
      
      // Draw link label
      const midX = (link.source.x + link.target.x) / 2;
      const midY = (link.source.y + link.target.y) / 2;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(link.type, midX, midY);
    });
    
    // Draw nodes
    nodes.forEach(node => {
      ctx.fillStyle = node.color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw node border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw node label
      ctx.fillStyle = '#ffffff';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(node.name, node.x, node.y + node.radius + 15);
    });
    
    simulateForces();
    requestAnimationFrame(render);
  }
  
  // Mouse interaction
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    nodes.forEach(node => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      if (distance < node.radius) {
        console.log('Node clicked:', node.name);
        showNodeDetails(node);
      }
    });
  });
  
  render();
}

function showNodeDetails(node) {
  const nodeDetails = document.getElementById('nodeDetails');
  if (!nodeDetails) return;
  
  const connections = appData.graphData.links.filter(link => 
    link.source === node.id || link.target === node.id
  );
  
  nodeDetails.innerHTML = `
    <h3>${node.name}</h3>
    <p><strong>Type:</strong> ${node.type}</p>
    <p><strong>Connections:</strong></p>
    <ul>
      ${connections.map(link => {
        const connected = link.source === node.id ? link.target : link.source;
        const connectedNode = appData.graphData.nodes.find(n => n.id === connected);
        return `<li>${connectedNode?.name || connected} (${link.type})</li>`;
      }).join('')}
    </ul>
  `;
}

function highlightGraphNodes(query) {
  console.log('Highlighting nodes for query:', query);
}

function resetGraph() {
  console.log('Resetting graph');
  initializeGraph();
}

function expandGraph() {
  console.log('Expanding graph connections');
}

// AI Assistant functions
function askQuestion() {
  const questionInput = document.getElementById('questionInput');
  if (!questionInput) return;
  
  const question = questionInput.value.trim();
  if (!question) return;
  
  console.log('Asking question:', question);
  
  addChatMessage(question, 'user');
  questionInput.value = '';
  
  showLoading();
  
  // Simulate API call
  setTimeout(() => {
    const answer = generateAIAnswer(question);
    addChatMessage(answer, 'ai');
    hideLoading();
  }, 1500);
}

function addChatMessage(message, type) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${type}-message`;
  
  messageDiv.innerHTML = `
    <div class="message-content">
      <p>${message}</p>
    </div>
  `;
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIAnswer(question) {
  // Find matching sample Q&A
  const matchingQA = appData.sampleQA.find(qa => 
    question.toLowerCase().includes('microgravity') && qa.question.toLowerCase().includes('microgravity') ||
    question.toLowerCase().includes('bone') && qa.question.toLowerCase().includes('bone') ||
    question.toLowerCase().includes('radiation') && qa.question.toLowerCase().includes('radiation') ||
    question.toLowerCase().includes('plant') && qa.question.toLowerCase().includes('plant')
  );
  
  if (matchingQA) {
    return matchingQA.answer;
  }
  
  // Generate generic response based on question keywords
  if (question.toLowerCase().includes('bone')) {
    return "Based on the research papers in our database, bone health is significantly affected by microgravity conditions. Studies show increased bone loss through multiple pathways including osteoclastic activity and cell cycle regulation by proteins like CDKN1a/p21.";
  } else if (question.toLowerCase().includes('radiation')) {
    return "Space radiation has complex biological effects including DNA damage, oxidative stress, and altered gene expression. NASA GeneLab provides extensive data on these radiation effects across various biological systems.";
  } else if (question.toLowerCase().includes('plant')) {
    return "Plants show remarkable adaptations to space conditions, including altered growth patterns, modified gene expression, and changes in root development and gravitropism responses.";
  } else if (question.toLowerCase().includes('microgravity')) {
    return "Microgravity affects multiple biological systems including bone density, cardiovascular function, and cellular processes. Research shows significant adaptations occur in both short and long-term exposure scenarios.";
  } else {
    return "That's an interesting question about space biology. Based on the available research, space conditions create unique challenges for biological systems that require careful study and understanding. Would you like to know more about a specific aspect?";
  }
}

// Protocol Planner functions
function generateProtocol() {
  const goalInput = document.getElementById('goalInput');
  if (!goalInput) return;
  
  const goal = goalInput.value.trim();
  if (!goal) return;
  
  console.log('Generating protocol for goal:', goal);
  
  showLoading();
  
  // Simulate API call
  setTimeout(() => {
    const protocol = generateProtocolSteps(goal);
    displayProtocol(protocol);
    hideLoading();
  }, 2000);
}

function generateProtocolSteps(goal) {
  // Find matching sample protocol
  const matchingProtocol = appData.sampleProtocols.find(p => 
    goal.toLowerCase().includes('bone') && p.goal.toLowerCase().includes('bone') ||
    goal.toLowerCase().includes('plant') && p.goal.toLowerCase().includes('plant')
  );
  
  if (matchingProtocol) {
    return matchingProtocol.protocol;
  }
  
  // Generate generic protocol based on keywords
  if (goal.toLowerCase().includes('bone') || goal.toLowerCase().includes('microgravity')) {
    return `1. Define research objectives and hypotheses
2. Select appropriate animal models or cell cultures
3. Establish baseline measurements (bone density, biomarkers)
4. Apply microgravity simulation (hindlimb unloading or clinostat)
5. Monitor subjects throughout exposure period
6. Collect samples at predetermined time points
7. Perform biochemical and molecular analyses
8. Compare results with control groups
9. Statistical analysis and interpretation
10. Document findings and prepare reports`;
  } else if (goal.toLowerCase().includes('plant') || goal.toLowerCase().includes('growth')) {
    return `1. Select appropriate plant species (Arabidopsis recommended)
2. Prepare sterile growth medium and containers
3. Sterilize seeds and equipment
4. Set up controlled environment chambers
5. Plant seeds and monitor germination
6. Document growth patterns and morphology
7. Collect samples for molecular analysis (RNA, proteins)
8. Perform comparative studies with Earth controls
9. Analyze gravitropism and cell wall modifications
10. Prepare comprehensive research report`;
  } else if (goal.toLowerCase().includes('radiation')) {
    return `1. Literature review on space radiation effects
2. Select appropriate biological models
3. Define radiation exposure parameters
4. Establish safety protocols for radiation work
5. Conduct baseline measurements
6. Apply controlled radiation exposure
7. Monitor biological responses over time
8. Collect samples for analysis
9. Perform molecular and cellular assays
10. Compare with control groups and analyze data`;
  } else {
    return `1. Literature review and background research
2. Define specific research objectives and hypotheses
3. Select appropriate experimental models and methods
4. Design control and experimental groups
5. Establish measurement and analysis protocols
6. Conduct preliminary feasibility studies
7. Execute main experimental procedures
8. Collect and process data systematically
9. Perform statistical analysis and interpret results
10. Prepare detailed research documentation and reports`;
  }
}

function displayProtocol(protocolText) {
  const protocolOutput = document.getElementById('protocolOutput');
  if (!protocolOutput) return;
  
  const steps = protocolText.split('\n').filter(step => step.trim());
  
  protocolOutput.innerHTML = `
    <div class="protocol-steps">
      <h3>Generated Experimental Protocol</h3>
      <ol>
        ${steps.map(step => `<li>${step.replace(/^\d+\.\s*/, '')}</li>`).join('')}
      </ol>
      <div class="protocol-note">
        <p><strong>Safety Note:</strong> This protocol is generated based on general space biology research practices. Please consult with domain experts, review relevant literature, and follow institutional safety guidelines before implementation.</p>
      </div>
    </div>
  `;
}

// Language functions
function switchLanguage(lang) {
  console.log('Switching to language:', lang);
  currentLanguage = lang;
  updateLanguage();
}

function updateActiveLanguage(activeBtn) {
  const languageButtons = document.querySelectorAll('[data-lang]');
  languageButtons.forEach(btn => {
    btn.classList.remove('active');
  });
  activeBtn.classList.add('active');
}

function updateLanguage() {
  const translations = appData.translations[currentLanguage];
  if (!translations) return;
  
  // Update text elements
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[key]) {
      element.textContent = translations[key];
    }
  });
  
  // Update placeholders
  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
    const key = element.getAttribute('data-translate-placeholder');
    if (translations[key]) {
      element.placeholder = translations[key];
    }
  });
  
  console.log('Language updated to:', currentLanguage);
}

// Utility functions
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
}

function showLoading() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    loadingOverlay.classList.remove('hidden');
  }
}

function hideLoading() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    loadingOverlay.classList.add('hidden');
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded, initializing app...');
  initApp();
});