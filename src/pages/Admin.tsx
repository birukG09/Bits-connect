import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  TrendingUp,
  Shield,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Ban,
  UserCheck,
  Download,
  Calendar,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import GlassCard from '../components/ui/GlassCard';
import { useAuth } from '../contexts/AuthContext';

const Admin = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for admin dashboard
  const userGrowthData = [
    { month: 'Jan', users: 1200 },
    { month: 'Feb', users: 1450 },
    { month: 'Mar', users: 1680 },
    { month: 'Apr', users: 1920 },
    { month: 'May', users: 2150 },
    { month: 'Jun', users: 2400 },
    { month: 'Jul', users: 2680 }
  ];

  const activityData = [
    { name: 'Mon', uploads: 45, chats: 120, gpa: 35 },
    { name: 'Tue', uploads: 52, chats: 135, gpa: 42 },
    { name: 'Wed', uploads: 38, chats: 98, gpa: 28 },
    { name: 'Thu', uploads: 61, chats: 156, gpa: 51 },
    { name: 'Fri', uploads: 48, chats: 142, gpa: 39 },
    { name: 'Sat', uploads: 35, chats: 89, gpa: 25 },
    { name: 'Sun', uploads: 29, chats: 76, gpa: 18 }
  ];

  const pendingFiles = [
    {
      id: '1',
      name: 'Advanced Machine Learning Notes',
      uploader: 'Sarah Johnson',
      uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      size: '15.2 MB',
      type: 'PDF',
      status: 'pending'
    },
    {
      id: '2',
      name: 'Quantum Physics Lecture Series',
      uploader: 'Alex Kumar',
      uploadedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      size: '245 MB',
      type: 'MP4',
      status: 'pending'
    },
    {
      id: '3',
      name: 'Chemistry Lab Manual',
      uploader: 'Emily Rodriguez',
      uploadedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      size: '8.7 MB',
      type: 'PDF',
      status: 'pending'
    }
  ];

  const recentUsers = [
    {
      id: '1',
      name: 'Michael Chen',
      email: 'michael.chen@student.edu',
      joinedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'active',
      role: 'student'
    },
    {
      id: '2',
      name: 'Lisa Wang',
      email: 'lisa.wang@student.edu',
      joinedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'active',
      role: 'student'
    },
    {
      id: '3',
      name: 'David Park',
      email: 'david.park@student.edu',
      joinedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'pending',
      role: 'student'
    }
  ];

  const reportedContent = [
    {
      id: '1',
      type: 'file',
      title: 'Inappropriate Content in Physics Notes',
      reporter: 'Anonymous',
      reportedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      status: 'pending'
    },
    {
      id: '2',
      type: 'chat',
      title: 'Spam in CS Study Group',
      reporter: 'Sarah Johnson',
      reportedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      status: 'reviewing'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'content', name: 'Content', icon: FileText },
    { id: 'moderation', name: 'Moderation', icon: Shield },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60 * 1000) return 'now';
    if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}m ago`;
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))}h ago`;
    return date.toLocaleDateString();
  };

  const approveFile = (fileId: string) => {
    console.log('Approving file:', fileId);
  };

  const rejectFile = (fileId: string) => {
    console.log('Rejecting file:', fileId);
  };

  const banUser = (userId: string) => {
    console.log('Banning user:', userId);
  };

  const approveUser = (userId: string) => {
    console.log('Approving user:', userId);
  };

  // Check if user is admin
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <GlassCard className="p-12 text-center max-w-md">
          <Shield className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-white/70">
            You don't have permission to access the admin dashboard.
          </p>
        </GlassCard>
      </div>
    );
  }

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
                Admin Dashboard
              </h1>
              <p className="text-white/70">
                Manage users, content, and platform settings
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-green-400" />
              <span className="text-green-400 font-medium">Administrator</span>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-white/5 p-1 rounded-lg border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Total Users</p>
                      <p className="text-3xl font-bold text-white">2,847</p>
                      <p className="text-green-400 text-sm">+12% this month</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Total Files</p>
                      <p className="text-3xl font-bold text-white">15,392</p>
                      <p className="text-green-400 text-sm">+8% this month</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Active Chats</p>
                      <p className="text-3xl font-bold text-white">428</p>
                      <p className="text-green-400 text-sm">+15% this month</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Pending Reports</p>
                      <p className="text-3xl font-bold text-white">7</p>
                      <p className="text-orange-400 text-sm">Needs attention</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <GlassCard className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6">User Growth</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" fontSize={12} />
                        <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(0,0,0,0.8)', 
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '8px',
                            color: 'white'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="users" 
                          stroke="#10B981" 
                          strokeWidth={3}
                          dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </GlassCard>

                <GlassCard className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Weekly Activity</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={activityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" fontSize={12} />
                        <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(0,0,0,0.8)', 
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '8px',
                            color: 'white'
                          }} 
                        />
                        <Bar dataKey="uploads" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="chats" fill="#10B981" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="gpa" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </GlassCard>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-8">
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Recent Users</h2>
                  <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200">
                    Export Users
                  </button>
                </div>
                <div className="space-y-4">
                  {recentUsers.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                          alt={user.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="text-white font-medium">{user.name}</h3>
                          <p className="text-white/60 text-sm">{user.email}</p>
                          <p className="text-white/50 text-xs">Joined {formatTime(user.joinedAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {user.status}
                        </span>
                        <div className="flex space-x-2">
                          {user.status === 'pending' && (
                            <button
                              onClick={() => approveUser(user.id)}
                              className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors"
                            >
                              <UserCheck className="w-4 h-4 text-green-400" />
                            </button>
                          )}
                          <button
                            onClick={() => banUser(user.id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                          >
                            <Ban className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-8">
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Pending File Approvals</h2>
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                    {pendingFiles.length} pending
                  </span>
                </div>
                <div className="space-y-4">
                  {pendingFiles.map((file, index) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white/50" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{file.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-white/60">
                            <span>by {file.uploader}</span>
                            <span>•</span>
                            <span>{file.type}</span>
                            <span>•</span>
                            <span>{file.size}</span>
                            <span>•</span>
                            <span>{formatTime(file.uploadedAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={() => approveFile(file.id)}
                          className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </button>
                        <button
                          onClick={() => rejectFile(file.id)}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                        >
                          <XCircle className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {activeTab === 'moderation' && (
            <div className="space-y-8">
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Reported Content</h2>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                    {reportedContent.length} reports
                  </span>
                </div>
                <div className="space-y-4">
                  {reportedContent.map((report, index) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="w-6 h-6 text-red-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{report.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-white/60">
                            <span>Reported by {report.reporter}</span>
                            <span>•</span>
                            <span>{formatTime(report.reportedAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.status === 'pending' 
                            ? 'bg-yellow-500/20 text-yellow-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {report.status}
                        </span>
                        <div className="flex space-x-2">
                          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-white" />
                          </button>
                          <button className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </button>
                          <button className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors">
                            <XCircle className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold text-white mb-6">Platform Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div>
                      <h3 className="text-white font-medium">File Upload Limit</h3>
                      <p className="text-white/60 text-sm">Maximum file size for uploads</p>
                    </div>
                    <select className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white">
                      <option value="50">50 MB</option>
                      <option value="100">100 MB</option>
                      <option value="200">200 MB</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div>
                      <h3 className="text-white font-medium">Auto-approve Files</h3>
                      <p className="text-white/60 text-sm">Automatically approve uploaded files</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div>
                      <h3 className="text-white font-medium">Chat Moderation</h3>
                      <p className="text-white/60 text-sm">Enable automatic chat content filtering</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div>
                      <h3 className="text-white font-medium">User Registration</h3>
                      <p className="text-white/60 text-sm">Allow new user registrations</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200">
                    Save Settings
                  </button>
                </div>
              </GlassCard>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;