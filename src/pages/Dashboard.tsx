import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  MessageSquare, 
  TrendingUp, 
  Clock,
  Star,
  Download,
  Users,
  Calendar,
  Target,
  Award,
  FileText,
  Heart
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import GlassCard from '../components/ui/GlassCard';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const studyData = [
    { name: 'Mon', hours: 3.5 },
    { name: 'Tue', hours: 4.2 },
    { name: 'Wed', hours: 2.8 },
    { name: 'Thu', hours: 5.1 },
    { name: 'Fri', hours: 3.9 },
    { name: 'Sat', hours: 6.2 },
    { name: 'Sun', hours: 4.5 }
  ];

  const subjectData = [
    { name: 'Computer Science', value: 35, color: '#10B981' },
    { name: 'Mathematics', value: 25, color: '#3B82F6' },
    { name: 'Physics', value: 20, color: '#8B5CF6' },
    { name: 'Chemistry', value: 20, color: '#F59E0B' }
  ];

  const recentFiles = [
    {
      id: '1',
      name: 'Advanced Algorithms Notes',
      type: 'PDF',
      size: '2.4 MB',
      uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '2',
      name: 'Quantum Physics Lecture',
      type: 'MP4',
      size: '145 MB',
      uploadedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      thumbnail: 'https://images.pexels.com/photos/207529/pexels-photo-207529.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '3',
      name: 'Chemistry Lab Report',
      type: 'DOCX',
      size: '1.8 MB',
      uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      thumbnail: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const bookmarkedResources = [
    {
      id: '1',
      title: 'Machine Learning Fundamentals',
      author: 'Dr. Sarah Johnson',
      rating: 4.8,
      category: 'Computer Science'
    },
    {
      id: '2',
      title: 'Calculus III Complete Guide',
      author: 'Prof. Michael Chen',
      rating: 4.9,
      category: 'Mathematics'
    },
    {
      id: '3',
      title: 'Organic Chemistry Reactions',
      author: 'Dr. Emily Rodriguez',
      rating: 4.7,
      category: 'Chemistry'
    }
  ];

  const recentChats = [
    {
      id: '1',
      name: 'CS Study Group',
      lastMessage: 'Thanks for sharing the notes!',
      time: '2 min ago',
      unread: 2,
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=cs-group'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      lastMessage: 'See you in the library tomorrow',
      time: '15 min ago',
      unread: 0,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
    },
    {
      id: '3',
      name: 'Math Tutoring',
      lastMessage: 'Can someone help with problem 15?',
      time: '1 hour ago',
      unread: 1,
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=math-group'
    }
  ];

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60 * 1000) return 'now';
    if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}m ago`;
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))}h ago`;
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
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, {user?.name || 'Student'}! 👋
              </h1>
              <p className="text-white/70">
                Here's what's happening with your learning journey today.
              </p>
            </div>
            <div className="hidden md:block">
              <img
                src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                alt="Profile"
                className="w-16 h-16 rounded-full border-4 border-white/20"
              />
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Current GPA</p>
                <p className="text-3xl font-bold text-white">3.85</p>
                <p className="text-green-400 text-sm flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +0.12 this semester
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Study Hours</p>
                <p className="text-3xl font-bold text-white">28.2</p>
                <p className="text-blue-400 text-sm">This week</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Files Uploaded</p>
                <p className="text-3xl font-bold text-white">47</p>
                <p className="text-purple-400 text-sm">Total resources</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Study Streak</p>
                <p className="text-3xl font-bold text-white">12</p>
                <p className="text-orange-400 text-sm">Days in a row</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Study Hours Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold text-white mb-6">Study Hours This Week</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={studyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="name" 
                        stroke="rgba(255,255,255,0.7)" 
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.7)" 
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="hours" 
                        stroke="#10B981" 
                        fill="url(#studyGradient)"
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="studyGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </motion.div>

            {/* Recent Files */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Recent Files</h2>
                  <button className="text-green-400 hover:text-green-300 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentFiles.map((file, index) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                      className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <img
                        src={file.thumbnail}
                        alt={file.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">{file.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-white/60">
                          <span>{file.type}</span>
                          <span>•</span>
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>{formatTime(file.uploadedAt)}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Subject Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold text-white mb-6">Study Distribution</h2>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={subjectData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {subjectData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {subjectData.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: subject.color }}
                        />
                        <span className="text-white/80 text-sm">{subject.name}</span>
                      </div>
                      <span className="text-white font-medium">{subject.value}%</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Bookmarked Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Bookmarked</h2>
                  <Heart className="w-5 h-5 text-red-400" />
                </div>
                <div className="space-y-4">
                  {bookmarkedResources.map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + index * 0.1, duration: 0.3 }}
                      className="p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <h3 className="text-white font-medium text-sm mb-1">{resource.title}</h3>
                      <p className="text-white/60 text-xs mb-2">by {resource.author}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-green-400 text-xs">{resource.category}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-white/70 text-xs">{resource.rating}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Recent Chats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Recent Chats</h2>
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                </div>
                <div className="space-y-4">
                  {recentChats.map((chat, index) => (
                    <motion.div
                      key={chat.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 + index * 0.1, duration: 0.3 }}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-medium text-sm truncate">{chat.name}</h3>
                          <span className="text-white/50 text-xs">{chat.time}</span>
                        </div>
                        <p className="text-white/70 text-xs truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unread > 0 && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                          {chat.unread}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;