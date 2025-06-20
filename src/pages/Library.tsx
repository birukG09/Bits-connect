import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  Eye, 
  Heart,
  BookOpen,
  FileText,
  Video,
  Music,
  Image,
  Archive
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen },
    { id: 'lectures', name: 'Lecture Notes', icon: FileText },
    { id: 'videos', name: 'Video Lectures', icon: Video },
    { id: 'audio', name: 'Audio Books', icon: Music },
    { id: 'images', name: 'Diagrams', icon: Image },
    { id: 'archives', name: 'Archives', icon: Archive }
  ];

  const departments = [
    'all',
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Engineering',
    'Literature'
  ];

  const resources = [
    {
      id: 1,
      title: 'Advanced Algorithms & Data Structures',
      description: 'Comprehensive guide covering sorting, searching, and optimization algorithms',
      author: 'Dr. Sarah Johnson',
      department: 'Computer Science',
      category: 'lectures',
      rating: 4.8,
      downloads: 1250,
      fileType: 'PDF',
      size: '12.4 MB',
      thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Quantum Mechanics Fundamentals',
      description: 'Introduction to quantum theory and its applications in modern physics',
      author: 'Prof. Michael Chen',
      department: 'Physics',
      category: 'videos',
      rating: 4.9,
      downloads: 892,
      fileType: 'MP4',
      size: '245 MB',
      thumbnail: 'https://images.pexels.com/photos/207529/pexels-photo-207529.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Organic Chemistry Reactions',
      description: 'Complete reference for organic synthesis and reaction mechanisms',
      author: 'Dr. Emily Rodriguez',
      department: 'Chemistry',
      category: 'lectures',
      rating: 4.7,
      downloads: 756,
      fileType: 'PDF',
      size: '18.7 MB',
      thumbnail: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      title: 'Machine Learning Foundations',
      description: 'Essential concepts in ML including supervised and unsupervised learning',
      author: 'Dr. Alex Kumar',
      department: 'Computer Science',
      category: 'lectures',
      rating: 4.6,
      downloads: 1680,
      fileType: 'PDF',
      size: '25.3 MB',
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 5,
      title: 'Calculus III Video Series',
      description: 'Complete video course on multivariable calculus and vector analysis',
      author: 'Prof. Lisa Wang',
      department: 'Mathematics',
      category: 'videos',
      rating: 4.9,
      downloads: 2100,
      fileType: 'MP4',
      size: '1.2 GB',
      thumbnail: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 6,
      title: 'Cell Biology Illustrated',
      description: 'Visual guide to cellular structures and biological processes',
      author: 'Dr. Robert Smith',
      department: 'Biology',
      category: 'images',
      rating: 4.5,
      downloads: 934,
      fileType: 'PDF',
      size: '45.2 MB',
      thumbnail: 'https://images.pexels.com/photos/954929/pexels-photo-954929.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesDepartment = selectedDepartment === 'all' || resource.department === selectedDepartment;
    
    return matchesSearch && matchesCategory && matchesDepartment;
  });

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
            Digital Library
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Discover thousands of educational resources shared by students and educators worldwide
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
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Department Filter */}
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept} className="bg-gray-800">
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
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
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
            >
              <GlassCard className="overflow-hidden h-full">
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full">
                      {resource.fileType}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-green-400 font-medium">
                      {resource.department}
                    </span>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm text-white">{resource.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                    {resource.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">
                    {resource.description}
                  </p>

                  <p className="text-white/60 text-sm mb-4">
                    by {resource.author}
                  </p>

                  <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                    <span>{resource.downloads} downloads</span>
                    <span>{resource.size}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center space-x-2 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200"
                    >
                      <Heart className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <GlassCard className="p-12 max-w-md mx-auto">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-white/50" />
              <h3 className="text-xl font-semibold text-white mb-2">No resources found</h3>
              <p className="text-white/70">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Library;