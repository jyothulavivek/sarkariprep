import { useState, useEffect } from 'react';
import { Calendar, Clock, RefreshCw, ExternalLink, Filter, Newspaper } from 'lucide-react';

const API_URL = 'http://localhost:5000';

export default function DailyNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Polity', 'Economy', 'International', 'Science', 'Sports', 'Defence', 'Awards', 'General'];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/news`);
      const data = await response.json();
      if (data.success) {
        setNews(data.data);
        setLastUpdated(data.lastUpdated);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = selectedCategory === 'All' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const getCategoryColor = (category) => {
    const colors = {
      'Polity': 'bg-red-500/20 text-red-400',
      'Economy': 'bg-green-500/20 text-green-400',
      'International': 'bg-blue-500/20 text-blue-400',
      'Science': 'bg-purple-500/20 text-purple-400',
      'Sports': 'bg-orange-500/20 text-orange-400',
      'Defence': 'bg-slate-500/20 text-slate-400',
      'Awards': 'bg-yellow-500/20 text-yellow-400',
      'General': 'bg-gray-500/20 text-gray-400'
    };
    return colors[category] || colors['General'];
  };

  return (
    <section className="py-12 px-4 bg-slate-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Newspaper className="w-8 h-8 text-orange-500" />
            <h2 className="text-3xl font-bold text-white">Daily Current Affairs</h2>
          </div>
          <p className="text-slate-400">Latest news for government exam preparation</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-slate-900 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-slate-500" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-slate-500 text-sm flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Updated: {new Date(lastUpdated).toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={fetchNews}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
          </div>
        )}

        {!loading && filteredNews.map((item) => (
          <article key={item.id} className="bg-slate-900 rounded-xl border border-slate-800 hover:border-orange-500/30 transition-all p-5 mb-4">
            <div className="flex flex-col md:flex-row gap-4">
              {item.image && (
                <div className="md:w-48 h-32 flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover rounded-lg" 
                    onError={(e) => e.target.style.display = 'none'} 
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <span className="text-slate-500 text-sm flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                  <span className="text-slate-600 text-sm">• {item.source}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 hover:text-orange-400 transition-colors">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </h3>
                <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 text-sm font-medium"
                >
                  Read Full Story 
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </article>
        ))}

        {!loading && filteredNews.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No news found. Click Refresh to load.
          </div>
        )}
        
      </div>
    </section>
  );
}