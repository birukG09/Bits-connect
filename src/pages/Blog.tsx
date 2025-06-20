import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  ExternalLink, 
  Filter,
  Search,
  TrendingUp,
  Code,
  Briefcase,
  Zap,
  Brain,
  Globe
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
  category: string;
  readTime: number;
  imageUrl: string;
  externalUrl: string;
  source: string;
}

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Articles', icon: Globe, color: 'from-gray-500 to-gray-600' },
    { id: 'ai', name: 'AI & ML', icon: Brain, color: 'from-purple-500 to-indigo-500' },
    { id: 'webdev', name: 'Web Dev', icon: Code, color: 'from-blue-500 to-cyan-500' },
    { id: 'tools', name: 'Dev Tools', icon: Zap, color: 'from-yellow-500 to-orange-500' },
    { id: 'careers', name: 'Tech Careers', icon: Briefcase, color: 'from-green-500 to-emerald-500' },
    { id: 'trending', name: 'Trending', icon: TrendingUp, color: 'from-red-500 to-pink-500' }
  ];

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of Artificial Intelligence in Education',
      excerpt: 'Exploring how AI is revolutionizing the way we learn and teach, from personalized learning paths to intelligent tutoring systems.',
      author: 'Dr. Sarah Chen',
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      category: 'ai',
      readTime: 8,
      imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      externalUrl: 'https://techcrunch.com/ai-education',
      source: 'TechCrunch'
    },
    {
      id: '2',
      title: 'React 18: What\'s New and Why It Matters',
      excerpt: 'A comprehensive look at React 18\'s new features including Concurrent Features, Suspense improvements, and automatic batching.',
      author: 'Alex Thompson',
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      category: 'webdev',
      readTime: 12,
      imageUrl: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800',
      externalUrl: 'https://blog.react.dev',
      source: 'React Blog'
    },
    {
      id: '3',
      title: 'Top 10 VS Code Extensions for Developers in 2024',
      excerpt: 'Boost your productivity with these essential Visual Studio Code extensions that every developer should know about.',
      author: 'Maria Rodriguez',
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      category: 'tools',
      readTime: 6,
      imageUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
      externalUrl: 'https://freecodecamp.org/vscode-extensions',
      source: 'FreeCodeCamp'
    },
    {
      id: '4',
      title: 'Breaking into Tech: A Complete Roadmap for 2024',
      excerpt: 'Everything you need to know about starting a career in technology, from choosing the right path to landing your first job.',
      author: 'David Kim',
      publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      category: 'careers',
      readTime: 15,
      imageUrl: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800',
      externalUrl: 'https://hackernoon.com/tech-careers-2024',
      source: 'Hacker Noon'
    },
    {
      id: '5',
      title: 'The Rise of Edge Computing and Its Impact',
      excerpt: 'Understanding edge computing and how it\'s transforming everything from IoT devices to content delivery networks.',
      author: 'Jennifer Wu',
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      category: 'trending',
      readTime: 10,
      imageUrl: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800',
      externalUrl: 'https://wired.com/edge-computing',
      source: 'Wired'
    },
    {
      id: '6',
      title: 'Machine Learning for Beginners: A Practical Guide',
      excerpt: 'Start your machine learning journey with this comprehensive guide covering the fundamentals and practical applications.',
      author: 'Prof. Robert Singh',
      publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      category: 'ai',
      readTime: 20,
      imageUrl: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
      externalUrl: 'https://towardsdatascience.com/ml-beginners',
      source: 'Towards Data Science'
    },
    {
      id: '7',
      title: 'CSS Grid vs Flexbox: When to Use Which',
      excerpt: 'A detailed comparison of CSS Grid and Flexbox, helping you choose the right layout method for your projects.',
      author: 'Emma Johnson',
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      category: 'webdev',
      readTime: 8,
      imageUrl: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800',
      externalUrl: 'https://css-tricks.com/grid-vs-flexbox',
      source: 'CSS-Tricks'
    },
    {
      id: '8',
      title: 'The Best Developer Tools for Remote Work',
      excerpt: 'Essential tools and platforms that make remote development work more efficient and collaborative.',
      author: 'Chris Park',
      publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      category: 'tools',
      readTime: 7,
      imageUrl: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800',
      externalUrl: 'https://dev.to/remote-tools',
      source: 'Dev.to'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Tech Blog
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Stay updated with the latest trends, tutorials, and insights from the tech world
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <GlassCard className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Filter Button */}
              <div className="flex items-center">
                <Filter className="w-5 h-5 text-white/50 mr-2" />
                <span className="text-white/70">Filter by category:</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white`
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
            >
              <GlassCard className="overflow-hidden h-full group cursor-pointer">
                <a href={post.externalUrl} target="_blank" rel="noopener noreferrer">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      {(() => {
                        const category = categories.find(cat => cat.id === post.category);
                        return category ? (
                          <span className={`px-3 py-1 bg-gradient-to-r ${category.color} text-white text-xs font-medium rounded-full`}>
                            {category.name}
                          </span>
                        ) : null;
                      })()}
                    </div>

                    {/* External Link Icon */}
                    <div className="absolute top-4 right-4">
                      <div className="p-2 bg-black/50 rounded-full">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Source */}
                    <div className="absolute bottom-4 left-4">
                      <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full">
                        {post.source}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-green-400 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-white/70 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-white/60">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </a>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <GlassCard className="p-12 max-w-md mx-auto">
              <Search className="w-16 h-16 mx-auto mb-4 text-white/50" />
              <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
              <p className="text-white/70">
                Try adjusting your search terms or selecting a different category.
              </p>
            </GlassCard>
          </motion.div>
        )}

        {/* Load More */}
        {filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200"
            >
              Load More Articles
            </motion.button>
          </motion.div>
        )}

        {/* RSS Sources Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16"
        >
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Sources</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'TechCrunch', logo: '🚀' },
                { name: 'Hacker News', logo: '📰' },
                { name: 'FreeCodeCamp', logo: '💻' },
                { name: 'Dev.to', logo: '👨‍💻' },
                { name: 'CSS-Tricks', logo: '🎨' },
                { name: 'Wired', logo: '⚡' },
                { name: 'React Blog', logo: '⚛️' },
                { name: 'Towards Data Science', logo: '📊' }
              ].map((source, index) => (
                <motion.div
                  key={source.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + index * 0.1, duration: 0.3 }}
                  className="text-center p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="text-3xl mb-2">{source.logo}</div>
                  <div className="text-white font-medium">{source.name}</div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;