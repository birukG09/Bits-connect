import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload as UploadIcon, FileText, Link, Check, X, AlertCircle, Cross as Progress, Download, Eye, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import GlassCard from '../components/ui/GlassCard';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  url?: string;
  convertedUrl?: string;
  thumbnail?: string;
}

const Upload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach(file => {
      simulateUpload(file.id);
    });

    toast.success(`${acceptedFiles.length} file(s) uploaded successfully!`);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/epub+zip': ['.epub'],
      'text/plain': ['.txt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = file.progress + Math.random() * 20;
          if (newProgress >= 100) {
            clearInterval(interval);
            return {
              ...file,
              progress: 100,
              status: 'completed',
              url: `https://example.com/files/${file.name}`,
              convertedUrl: `https://example.com/converted/${file.name}`,
              thumbnail: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400'
            };
          }
          return { ...file, progress: newProgress };
        }
        return file;
      }));
    }, 500);
  };

  const handleUrlConvert = async () => {
    if (!urlInput.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsConverting(true);
    
    // Simulate URL conversion
    setTimeout(() => {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: `${new URL(urlInput).hostname}.pdf`,
        size: Math.floor(Math.random() * 5000000) + 1000000, // Random size 1-5MB
        type: 'application/pdf',
        status: 'completed',
        progress: 100,
        url: urlInput,
        convertedUrl: `https://example.com/converted/${new URL(urlInput).hostname}.pdf`,
        thumbnail: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400'
      };

      setFiles(prev => [newFile, ...prev]);
      setUrlInput('');
      setIsConverting(false);
      toast.success('URL converted to PDF successfully!');
    }, 3000);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
    toast.success('File removed');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <Progress className="w-5 h-5 text-blue-400 animate-spin" />;
      case 'completed':
        return <Check className="w-5 h-5 text-green-400" />;
      case 'error':
        return <X className="w-5 h-5 text-red-400" />;
      default:
        return <FileText className="w-5 h-5 text-white/50" />;
    }
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
            Upload & Convert
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Upload your files or convert web pages to PDFs. Support for PDF, EPUB, DOC, and more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* File Upload */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <UploadIcon className="w-6 h-6 mr-2" />
                File Upload
              </h2>
              
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                  isDragActive
                    ? 'border-green-400 bg-green-400/10'
                    : 'border-white/30 hover:border-white/50 hover:bg-white/5'
                }`}
              >
                <input {...getInputProps()} />
                <UploadIcon className="w-16 h-16 mx-auto mb-4 text-white/50" />
                {isDragActive ? (
                  <p className="text-white text-lg">Drop files here...</p>
                ) : (
                  <>
                    <p className="text-white text-lg mb-2">
                      Drag & drop files here, or click to select
                    </p>
                    <p className="text-white/60 text-sm">
                      Supports PDF, EPUB, DOC, DOCX, TXT files
                    </p>
                  </>
                )}
              </div>
            </GlassCard>
          </motion.div>

          {/* URL Converter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Link className="w-6 h-6 mr-2" />
                URL to PDF
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2">Enter URL</label>
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUrlConvert}
                  disabled={isConverting}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isConverting ? (
                    <>
                      <Progress className="w-5 h-5 mr-2 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    'Convert to PDF'
                  )}
                </motion.button>
              </div>

              <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-400 mr-2 mt-0.5" />
                  <div className="text-sm text-blue-200">
                    <p className="font-medium mb-1">How it works:</p>
                    <p>Enter any web URL and we'll convert it to a PDF file for easy reading and sharing.</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Files List */}
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Recent Uploads ({files.length})
              </h2>
              
              <div className="space-y-4">
                {files.map((file, index) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      {file.thumbnail ? (
                        <img
                          src={file.thumbnail}
                          alt={file.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white/50" />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">{file.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-white/60">
                          <span>{formatFileSize(file.size)}</span>
                          <span className="capitalize">{file.status}</span>
                        </div>
                        
                        {file.status === 'uploading' && (
                          <div className="mt-2 w-full bg-white/10 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${file.progress}%` }}
                              transition={{ duration: 0.3 }}
                              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {getStatusIcon(file.status)}
                      
                      {file.status === 'completed' && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                            title="Preview"
                          >
                            <Eye className="w-4 h-4 text-white" />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4 text-white" />
                          </motion.button>
                        </>
                      )}
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => removeFile(file.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12"
        >
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Supported Formats</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Documents</h3>
                <p className="text-white/70 text-sm">PDF, DOC, DOCX, TXT, RTF</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  <UploadIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">E-Books</h3>
                <p className="text-white/70 text-sm">EPUB, MOBI, AZW3</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Link className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Web Pages</h3>
                <p className="text-white/70 text-sm">Any URL converted to PDF</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Upload;