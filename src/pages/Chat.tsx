import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip,
  Smile,
  Users,
  UserPlus,
  Settings,
  Hash,
  Lock
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'image';
}

interface Chat {
  id: string;
  name: string;
  type: 'direct' | 'group';
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  members?: number;
}

const Chat = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chats: Chat[] = [
    {
      id: '1',
      name: 'CS Study Group',
      type: 'group',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=cs-group',
      lastMessage: 'Hey everyone, ready for the exam?',
      lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
      unreadCount: 3,
      isOnline: true,
      members: 12
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      type: 'direct',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      lastMessage: 'Thanks for sharing those notes!',
      lastMessageTime: new Date(Date.now() - 15 * 60 * 1000),
      unreadCount: 1,
      isOnline: true
    },
    {
      id: '3',
      name: 'Math Tutoring',
      type: 'group',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=math-group',
      lastMessage: 'Can someone help with problem 15?',
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
      unreadCount: 0,
      isOnline: false,
      members: 8
    },
    {
      id: '4',
      name: 'Alex Kumar',
      type: 'direct',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      lastMessage: 'See you in the library tomorrow',
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 0,
      isOnline: false
    },
    {
      id: '5',
      name: 'Project Team Alpha',
      type: 'group',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=alpha-team',
      lastMessage: 'Updated the presentation slides',
      lastMessageTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
      unreadCount: 2,
      isOnline: true,
      members: 5
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      senderId: 'sarah',
      senderName: 'Sarah Johnson',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      content: 'Hey everyone! I just uploaded the lecture notes from today\'s class. Check them out in the library section.',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      type: 'text'
    },
    {
      id: '2',
      senderId: 'alex',
      senderName: 'Alex Kumar',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      content: 'Thanks Sarah! That\'s really helpful. I was struggling with the recursion examples.',
      timestamp: new Date(Date.now() - 58 * 60 * 1000),
      type: 'text'
    },
    {
      id: '3',
      senderId: user?.id || 'current',
      senderName: user?.name || 'You',
      senderAvatar: user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=current',
      content: 'Same here! The binary tree traversal part was confusing. Can we schedule a study session?',
      timestamp: new Date(Date.now() - 55 * 60 * 1000),
      type: 'text'
    },
    {
      id: '4',
      senderId: 'sarah',
      senderName: 'Sarah Johnson',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      content: 'Absolutely! How about tomorrow at 3 PM in the library? I can bring my whiteboard.',
      timestamp: new Date(Date.now() - 50 * 60 * 1000),
      type: 'text'
    },
    {
      id: '5',
      senderId: 'mike',
      senderName: 'Mike Chen',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
      content: 'Count me in! I\'ll bring some practice problems too.',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      type: 'text'
    }
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    // Mock sending message
    console.log('Sending message:', message);
    setMessage('');
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60 * 1000) return 'now';
    if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}m`;
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))}h`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen pt-20 pb-4">
      <div className="max-w-7xl mx-auto px-4 h-[calc(100vh-8rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Chat List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <GlassCard className="h-full flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-white">Messages</h1>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg"
                  >
                    <UserPlus className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto">
                {filteredChats.map((chat, index) => (
                  <motion.button
                    key={chat.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`w-full p-4 text-left hover:bg-white/5 transition-colors ${
                      selectedChat === chat.id ? 'bg-white/10' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={chat.avatar}
                          alt={chat.name}
                          className="w-12 h-12 rounded-full"
                        />
                        {chat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-medium truncate flex items-center">
                            {chat.type === 'group' && <Hash className="w-4 h-4 mr-1" />}
                            {chat.name}
                          </h3>
                          <span className="text-white/50 text-xs">
                            {formatTime(chat.lastMessageTime)}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-white/70 text-sm truncate">
                            {chat.lastMessage}
                          </p>
                          {chat.unreadCount > 0 && (
                            <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                              {chat.unreadCount}
                            </span>
                          )}
                        </div>
                        
                        {chat.type === 'group' && (
                          <div className="flex items-center mt-1">
                            <Users className="w-3 h-3 text-white/50 mr-1" />
                            <span className="text-white/50 text-xs">{chat.members} members</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <GlassCard className="h-full flex flex-col">
              {selectedChatData ? (
                <>
                  {/* Chat Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={selectedChatData.avatar}
                            alt={selectedChatData.name}
                            className="w-10 h-10 rounded-full"
                          />
                          {selectedChatData.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
                          )}
                        </div>
                        <div>
                          <h2 className="text-white font-semibold flex items-center">
                            {selectedChatData.type === 'group' && <Hash className="w-4 h-4 mr-1" />}
                            {selectedChatData.name}
                          </h2>
                          <p className="text-white/60 text-sm">
                            {selectedChatData.type === 'group' 
                              ? `${selectedChatData.members} members`
                              : selectedChatData.isOnline ? 'Online' : 'Last seen recently'
                            }
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        >
                          <Phone className="w-5 h-5 text-white" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        >
                          <Video className="w-5 h-5 text-white" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-white" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((msg, index) => {
                      const isOwnMessage = msg.senderId === (user?.id || 'current');
                      
                      return (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className={`flex items-start space-x-3 ${
                            isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''
                          }`}
                        >
                          <img
                            src={msg.senderAvatar}
                            alt={msg.senderName}
                            className="w-8 h-8 rounded-full"
                          />
                          
                          <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'text-right' : ''}`}>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-white/70 text-sm font-medium">
                                {msg.senderName}
                              </span>
                              <span className="text-white/50 text-xs">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            
                            <div
                              className={`px-4 py-2 rounded-2xl inline-block ${
                                isOwnMessage
                                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                                  : 'bg-white/10 text-white'
                              }`}
                            >
                              {msg.content}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-6 border-t border-white/10">
                    <div className="flex items-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        <Paperclip className="w-5 h-5 text-white" />
                      </motion.button>
                      
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          placeholder="Type a message..."
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                        >
                          <Smile className="w-4 h-4 text-white" />
                        </motion.button>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={sendMessage}
                        disabled={!message.trim()}
                        className="p-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full hover:from-green-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </>
              ) : (
                // Empty State
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Welcome to BiTS Chat
                    </h2>
                    <p className="text-white/70 max-w-md">
                      Select a conversation from the sidebar to start chatting with your classmates and study groups.
                    </p>
                  </div>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Chat;