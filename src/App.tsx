import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Library from './pages/Library';
import Upload from './pages/Upload';
import GPA from './pages/GPA';
import Chat from './pages/Chat';
import Blog from './pages/Blog';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Login from './pages/Login';
import MatrixBackground from './components/ui/MatrixBackground';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 relative overflow-hidden">
            <MatrixBackground />
            <div className="relative z-10">
              <Navbar />
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/gpa" element={<GPA />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </AnimatePresence>
            </div>
            <Toaster
              position="top-right"
              toastOptions={{
                className: 'backdrop-blur-sm bg-white/10 text-white border border-white/20',
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;