import React, { useState, useRef } from 'react';
import { Upload, File, X, Check, AlertCircle, Image, FileText, Download, Plus } from 'lucide-react';

interface DocumentUploadProps {
  darkMode: boolean;
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  category: string;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
  uploadDate: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ darkMode }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('circular');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { value: 'circular', label: 'Circular', icon: FileText },
    { value: 'notice', label: 'Notice', icon: AlertCircle },
    { value: 'event', label: 'Event', icon: Image },
    { value: 'report', label: 'Report', icon: File },
    { value: 'safety', label: 'Safety Document', icon: AlertCircle },
    { value: 'research', label: 'Research Paper', icon: FileText }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        category: selectedCategory,
        status: 'uploading',
        progress: 0,
        uploadDate: new Date().toISOString()
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      simulateUpload(newFile.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles(prev => 
        prev.map(file => {
          if (file.id === fileId) {
            const newProgress = Math.min(file.progress + Math.random() * 30, 100);
            return {
              ...file,
              progress: newProgress,
              status: newProgress === 100 ? 'completed' : 'uploading'
            };
          }
          return file;
        })
      );
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setUploadedFiles(prev => 
        prev.map(file => 
          file.id === fileId ? { ...file, status: 'completed', progress: 100 } : file
        )
      );
    }, 3000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handlePublish = () => {
    // Here you would typically send the data to your backend
    console.log('Publishing documents:', {
      title,
      description,
      category: selectedCategory,
      files: uploadedFiles.filter(f => f.status === 'completed')
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setUploadedFiles([]);
    
    // Show success message
    alert('Documents published successfully!');
  };

  return (
    <div className="space-y-8">
      {/* Upload Form */}
      <div className={`rounded-xl border-2 border-dashed transition-all duration-300 ${
        dragActive 
          ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
          : darkMode 
          ? 'border-gray-600 bg-gray-800' 
          : 'border-gray-300 bg-gray-50'
      }`}>
        <div className="p-8">
          {/* Document Info */}
          <div className="mb-6 space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Document Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title..."
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Category
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                      selectedCategory === category.value
                        ? 'bg-red-600 text-white border-red-600 shadow-lg'
                        : darkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <category.icon size={16} />
                    <span className="text-sm font-medium">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter document description..."
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>

          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              dragActive 
                ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                : darkMode 
                ? 'border-gray-600 hover:border-gray-500' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleChange}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
              className="hidden"
            />
            
            <div className="space-y-4">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                dragActive 
                  ? 'bg-red-100 dark:bg-red-900/30' 
                  : darkMode 
                  ? 'bg-gray-700' 
                  : 'bg-gray-100'
              }`}>
                <Upload className={`w-8 h-8 ${
                  dragActive 
                    ? 'text-red-600' 
                    : darkMode 
                    ? 'text-gray-400' 
                    : 'text-gray-500'
                }`} />
              </div>
              
              <div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {dragActive ? 'Drop files here' : 'Upload Documents'}
                </h3>
                <p className={`text-sm mb-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Drag and drop files here, or click to browse
                </p>
                <button
                  onClick={onButtonClick}
                  className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus size={16} />
                  <span>Choose Files</span>
                </button>
              </div>
              
              <p className={`text-xs ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                Supported formats: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, JPG, PNG (Max 10MB)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className={`rounded-lg border ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className={`text-lg font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Uploaded Files ({uploadedFiles.length})
            </h3>
          </div>
          
          <div className="p-6 space-y-4">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className={`flex items-center space-x-4 p-4 rounded-lg border ${
                  darkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  file.status === 'completed' 
                    ? 'bg-green-100 dark:bg-green-900/30' 
                    : file.status === 'error'
                    ? 'bg-red-100 dark:bg-red-900/30'
                    : 'bg-blue-100 dark:bg-blue-900/30'
                }`}>
                  {file.status === 'completed' ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : file.status === 'error' ? (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  ) : (
                    <File className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-sm font-medium truncate ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {file.name}
                    </p>
                    <span className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {file.size}
                    </span>
                  </div>
                  
                  {file.status === 'uploading' && (
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      ></div>
                    </div>
                  )}
                  
                  {file.status === 'completed' && (
                    <p className={`text-xs ${
                      darkMode ? 'text-green-400' : 'text-green-600'
                    }`}>
                      Upload completed
                    </p>
                  )}
                </div>
                
                <button
                  onClick={() => removeFile(file.id)}
                  className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          
          {/* Publish Button */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handlePublish}
              disabled={!title || uploadedFiles.filter(f => f.status === 'completed').length === 0}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
                !title || uploadedFiles.filter(f => f.status === 'completed').length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl'
              }`}
            >
              Publish Documents
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;