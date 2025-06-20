import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Library, 
  MessageSquare, 
  Calculator,
  BookOpen,
  Users,
  TrendingUp,
  Zap
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

const Home = () => {
  const features = [
    {
      icon: Upload,
      title: 'Upload & Convert',
      description: 'Upload PDFs, EPUBs, or convert URLs to accessible formats',
      href: '/upload',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Library,
      title: 'Digital Library',
      description: 'Access thousands of educational resources and materials',
      href: '/library',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MessageSquare,
      title: 'Student Chat',
      description: 'Connect with peers in real-time chat rooms and groups',
      href: '/chat',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Calculator,
      title: 'GPA Calculator',
      description: 'Track your academic progress with advanced GPA tools',
      href: '/gpa',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { label: 'Active Students', value: '2,847', icon: Users },
    { label: 'Resources Shared', value: '15,392', icon: BookOpen },
    { label: 'Study Groups', value: '428', icon: MessageSquare },
    { label: 'Success Rate', value: '94%', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold text-white mb-6"
          >
            BiTS Connect
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-2xl md:text-3xl text-white/80 mb-4"
          >
            From collecting... to connecting...
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg text-white/60 mb-12 max-w-2xl mx-auto"
          >
            The future of educational collaboration. Upload, share, learn, and connect with students worldwide in our advanced learning ecosystem.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/library"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold text-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-2xl hover:shadow-green-500/25"
            >
              Explore Library
            </Link>
            <Link
              to="/upload"
              className="px-8 py-4 backdrop-blur-xl bg-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              Upload Resources
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
            >
              <Link to={feature.href}>
                <GlassCard className="p-6 h-full hover:shadow-2xl transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <GlassCard className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <GlassCard className="p-12">
            <Zap className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Connect?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of students already using BiTS Connect to enhance their learning experience.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25"
            >
              <Zap className="w-5 h-5 mr-2" />
              Get Started Now
            </Link>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;