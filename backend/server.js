const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ==================== MOCK DATA (Backup) ====================

const mockNews = [
  {
    id: 1,
    title: "Union Budget 2024-25: Key Highlights for Exam Preparation",
    description: "Finance Minister presents budget with focus on infrastructure, agriculture, and digital economy. Important for UPSC, Banking, and SSC exams.",
    url: "https://www.indiatoday.in/business/budget-2024",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    source: "India Today",
    publishedAt: new Date().toISOString(),
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    category: "Economy",
    importantFor: ["SSC", "Banking", "UPSC"]
  },
  {
    id: 2,
    title: "ISRO Successfully Launches Gaganyaan Test Flight",
    description: "India's first human spaceflight mission test successful. Crew module safely splashed down in Bay of Bengal. Major milestone for Indian space program.",
    url: "https://www.isro.gov.in",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop",
    source: "ISRO",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    date: new Date(Date.now() - 3600000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    category: "Science",
    importantFor: ["SSC", "UPSC", "Railways"]
  },
  {
    id: 3,
    title: "India-China Border Talks: 21st Round of WMCC Meeting",
    description: "Diplomatic discussions continue for border disengagement. Important for International Relations section of competitive exams.",
    url: "https://www.mea.gov.in",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=300&fit=crop",
    source: "MEA India",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    date: new Date(Date.now() - 7200000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    category: "International",
    importantFor: ["UPSC", "SSC"]
  }
];

let dailyNews = [];
let lastUpdated = null;
let isUsingMockData = false;

// ==================== CATEGORIZATION ====================

function categorizeNews(text) {
  const lowerText = (text || '').toLowerCase();
  if (lowerText.includes('election') || lowerText.includes('parliament') || lowerText.includes('minister') || lowerText.includes('govt') || lowerText.includes('bill') || lowerText.includes('act') || lowerText.includes('pm ') || lowerText.includes('president') || lowerText.includes('lok sabha') || lowerText.includes('rajya sabha')) return 'Polity';
  if (lowerText.includes('economy') || lowerText.includes('gdp') || lowerText.includes('inflation') || lowerText.includes('rbi') || lowerText.includes('bank') || lowerText.includes('budget') || lowerText.includes('market') || lowerText.includes('stock') || lowerText.includes('rupee') || lowerText.includes('tax') || lowerText.includes('finance')) return 'Economy';
  if (lowerText.includes('china') || lowerText.includes('pakistan') || lowerText.includes('us ') || lowerText.includes('america') || lowerText.includes('bilateral') || lowerText.includes('summit') || lowerText.includes('g20') || lowerText.includes('g7') || lowerText.includes('un ') || lowerText.includes('nato') || lowerText.includes('russia') || lowerText.includes('diplomatic') || lowerText.includes('embassy')) return 'International';
  if (lowerText.includes('isro') || lowerText.includes('space') || lowerText.includes('rocket') || lowerText.includes('satellite') || lowerText.includes('mission') || lowerText.includes('scientist') || lowerText.includes('research') || lowerText.includes('tech') || lowerText.includes('ai ') || lowerText.includes('digital') || lowerText.includes('launch')) return 'Science';
  if (lowerText.includes('cricket') || lowerText.includes('ipl') || lowerText.includes('match') || lowerText.includes('team') || lowerText.includes('player') || lowerText.includes('sport') || lowerText.includes('olympic') || lowerText.includes('tournament') || lowerText.includes('medal') || lowerText.includes('bcci')) return 'Sports';
  if (lowerText.includes('army') || lowerText.includes('military') || lowerText.includes('defence') || lowerText.includes('navy') || lowerText.includes('air force') || lowerText.includes('missile') || lowerText.includes('drone') || lowerText.includes('weapon') || lowerText.includes('soldier') || lowerText.includes('jawan')) return 'Defence';
  if (lowerText.includes('award') || lowerText.includes('prize') || lowerText.includes('padma') || lowerText.includes('bharat ratna') || lowerText.includes('nobel') || lowerText.includes('honour') || lowerText.includes('recipient')) return 'Awards';
  return 'General';
}

// ==================== FETCH FROM RSS FEEDS (FREE) ====================

async function fetchFromRSS() {
  const articles = [];
  
  try {
    // Use RSS2JSON API (free) to convert RSS to JSON
    const rssFeeds = [
      { url: 'https://feeds.feedburner.com/ndtvnews-india-news', source: 'NDTV' },
      { url: 'https://www.indiatoday.in/rss/1206578', source: 'India Today' },
      { url: 'https://feeds.feedburner.com/TheHindu-News', source: 'The Hindu' }
    ];
    
    for (const feed of rssFeeds) {
      try {
        console.log(`  Fetching from ${feed.source}...`);
        const response = await axios.get('https://api.rss2json.com/v1/api.json', {
          params: { rss_url: feed.url },
          timeout: 10000
        });
        
        if (response.data.items) {
          const feedArticles = response.data.items.slice(0, 5).map((item, idx) => ({
            id: articles.length + idx + 1,
            title: item.title,
            description: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...' || item.title,
            url: item.link,
            image: item.enclosure?.link || item.thumbnail || getDefaultImage(articles.length + idx),
            source: feed.source,
            publishedAt: item.pubDate,
            date: new Date(item.pubDate).toLocaleDateString('en-IN', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric'
            }),
            category: categorizeNews(item.title + ' ' + item.description),
            importantFor: ['SSC', 'Banking', 'UPSC', 'Railways']
          }));
          
          articles.push(...feedArticles);
          console.log(`  ✅ Got ${feedArticles.length} from ${feed.source}`);
        }
      } catch (e) {
        console.log(`  ❌ ${feed.source} failed:`, e.message);
      }
    }
    
    return articles;
  } catch (error) {
    console.error('RSS fetch error:', error);
    return [];
  }
}

// ==================== FETCH REAL NEWS ====================

async function fetchRealNews() {
  console.log('📰 Fetching real news...', new Date().toLocaleString());
  
  try {
    let articles = [];
    
    // Try 1: NewsAPI (if it works)
    if (process.env.NEWS_API_KEY && process.env.NEWS_API_KEY !== 'your_api_key_here') {
      try {
        console.log('  Trying NewsAPI...');
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: { country: 'in', pageSize: 20, apiKey: process.env.NEWS_API_KEY },
          timeout: 10000
        });
        
        if (response.data.articles && response.data.articles.length > 0) {
          const apiArticles = response.data.articles
            .filter(a => a.title && a.title !== '[Removed]')
            .map((a, idx) => ({
              id: idx + 1,
              title: a.title,
              description: a.description || a.title,
              url: a.url,
              image: a.urlToImage || getDefaultImage(idx),
              source: a.source?.name || 'News',
              publishedAt: a.publishedAt,
              date: new Date(a.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
              category: categorizeNews(a.title + ' ' + a.description),
              importantFor: ['SSC', 'Banking', 'UPSC', 'Railways']
            }));
          
          articles = [...apiArticles];
          console.log(`  ✅ NewsAPI: ${apiArticles.length} articles`);
        }
      } catch (e) {
        console.log('  NewsAPI failed:', e.message);
      }
    }
    
    // Try 2: RSS Feeds (always works)
    if (articles.length < 5) {
      console.log('  Trying RSS feeds...');
      const rssArticles = await fetchFromRSS();
      articles = [...articles, ...rssArticles];
    }
    
    // Remove duplicates
    const uniqueArticles = articles.filter((article, index, self) =>
      index === self.findIndex((t) => t.title === article.title)
    ).slice(0, 15);
    
    if (uniqueArticles.length === 0) {
      throw new Error('No articles from any source');
    }
    
    dailyNews = uniqueArticles;
    isUsingMockData = false;
    lastUpdated = new Date().toISOString();
    
    console.log(`✅ Loaded ${dailyNews.length} REAL news articles`);
    
    // Save to file
    fs.writeFileSync('./daily-news.json', JSON.stringify({ 
      data: dailyNews, 
      lastUpdated,
      isMock: false 
    }, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('ℹ️  Using mock data...');
    //useMockData();
  }
}

function useMockData() {
  dailyNews = [...mockNews];
  isUsingMockData = true;
  lastUpdated = new Date().toISOString();
  console.log(`✅ Loaded ${dailyNews.length} MOCK news articles`);
  
  fs.writeFileSync('./daily-news.json', JSON.stringify({ 
    data: dailyNews, 
    lastUpdated,
    isMock: true 
  }, null, 2));
}

function getDefaultImage(index) {
  const images = [
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=300&fit=crop'
  ];
  return images[index % images.length];
}

// ==================== LOAD SAVED DATA ====================

function loadSavedData() {
  try {
    if (fs.existsSync('./daily-news.json')) {
      const saved = JSON.parse(fs.readFileSync('./daily-news.json', 'utf8'));
      if (saved.data && saved.data.length > 0) {
        dailyNews = saved.data;
        lastUpdated = saved.lastUpdated;
        isUsingMockData = saved.isMock || false;
        console.log(`📂 Loaded ${dailyNews.length} saved articles`);
        return;
      }
    }
  } catch (e) {
    console.error('Error loading saved data:', e);
  }
  //useMockData();
}

// ==================== API ROUTES ====================

app.get('/api/news', (req, res) => {
  const { category } = req.query;
  let filtered = dailyNews;
  
  if (category && category !== 'All') {
    filtered = dailyNews.filter(item => item.category === category);
  }
  
  res.json({
    success: true,
    count: filtered.length,
    lastUpdated,
    isMock: isUsingMockData,
    data: filtered
  });
});

app.get('/api/categories', (req, res) => {
  const categories = [...new Set(dailyNews.map(n => n.category))];
  res.json({ success: true, data: categories });
});

app.post('/api/refresh-news', async (req, res) => {
  await fetchRealNews();
  res.json({ 
    success: true, 
    message: isUsingMockData ? 'Using mock data' : 'Real news loaded',
    count: dailyNews.length,
    isMock: isUsingMockData
  });
});

// ==================== AUTO UPDATE ====================

cron.schedule('*/5 * * * *', fetchRealNews);
loadSavedData();
setTimeout(fetchRealNews, 2000);

// ==================== START ====================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📰 News API: http://localhost:${PORT}/api/news`);
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}