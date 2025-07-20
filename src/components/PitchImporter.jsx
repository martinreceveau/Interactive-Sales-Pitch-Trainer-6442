import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const { FiUpload, FiX, FiFile, FiLoader, FiCheck, FiAlertCircle } = FiIcons;

const PitchImporter = ({ onClose, onImport }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [suggestedKeywords, setSuggestedKeywords] = useState([]);
  const [suggestedTitle, setSuggestedTitle] = useState('');
  const [error, setError] = useState('');

  const extractTextFromPDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + ' ';
      }
      
      return fullText.trim();
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to extract text from PDF');
    }
  };

  const analyzeText = (text) => {
    // Simple keyword extraction algorithm
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    // Count word frequency
    const wordCount = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    // Filter out common words
    const commonWords = new Set([
      'this', 'that', 'with', 'have', 'will', 'from', 'they', 'know', 'want', 'been',
      'good', 'much', 'some', 'time', 'very', 'when', 'come', 'here', 'just', 'like',
      'long', 'make', 'many', 'over', 'such', 'take', 'than', 'them', 'well', 'were',
      'what', 'your', 'about', 'after', 'again', 'before', 'could', 'first', 'found',
      'great', 'group', 'hand', 'help', 'high', 'important', 'information', 'large',
      'last', 'left', 'life', 'little', 'look', 'made', 'most', 'move', 'need', 'new',
      'number', 'other', 'part', 'place', 'point', 'problem', 'program', 'public',
      'right', 'same', 'school', 'seem', 'several', 'small', 'social', 'still',
      'system', 'those', 'though', 'three', 'through', 'today', 'together', 'turn',
      'under', 'until', 'used', 'using', 'water', 'work', 'world', 'would', 'year',
      'years', 'young'
    ]);
    
    // Get significant keywords
    const keywords = Object.entries(wordCount)
      .filter(([word, count]) => count >= 2 && !commonWords.has(word))
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));
    
    // Extract potential title (first meaningful sentence or heading)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const title = sentences[0]?.trim().slice(0, 50) + (sentences[0]?.length > 50 ? '...' : '') || 'Imported Pitch';
    
    return { keywords, title };
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const text = await extractTextFromPDF(file);
      setExtractedText(text);
      
      const analysis = analyzeText(text);
      setSuggestedKeywords(analysis.keywords);
      setSuggestedTitle(analysis.title);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  const handleImport = () => {
    onImport({
      title: suggestedTitle,
      keywords: suggestedKeywords
    });
  };

  const removeKeyword = (index) => {
    setSuggestedKeywords(suggestedKeywords.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Import Pitch from PDF</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <SafeIcon icon={FiX} className="text-2xl" />
          </button>
        </div>

        {!extractedText && !isProcessing && (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-primary-500 bg-primary-50' : 'hover:border-primary-400'
            }`}
          >
            <input {...getInputProps()} />
            <SafeIcon icon={FiUpload} className="text-4xl text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600 mb-2">
              {isDragActive ? 'Drop your PDF here' : 'Drag & drop a PDF file here'}
            </p>
            <p className="text-sm text-gray-500">or click to select a file</p>
          </div>
        )}

        {isProcessing && (
          <div className="text-center py-12">
            <SafeIcon icon={FiLoader} className="text-4xl text-primary-500 mx-auto mb-4 animate-spin" />
            <p className="text-lg text-gray-600">Processing your PDF...</p>
            <p className="text-sm text-gray-500 mt-2">Extracting text and analyzing keywords</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiAlertCircle} className="text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {extractedText && !isProcessing && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <SafeIcon icon={FiCheck} className="text-green-500" />
                <p className="text-green-700 font-semibold">PDF processed successfully!</p>
              </div>
              <p className="text-green-600 text-sm">
                Extracted {extractedText.split(' ').length} words and found {suggestedKeywords.length} potential keywords.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Suggested Title
              </label>
              <input
                type="text"
                value={suggestedTitle}
                onChange={(e) => setSuggestedTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Suggested Keywords ({suggestedKeywords.length})
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {suggestedKeywords.map((keyword, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-primary-100 text-primary-700 px-3 py-2 rounded-full flex items-center space-x-2 group"
                  >
                    <span className="font-medium">{keyword}</span>
                    <button
                      onClick={() => removeKeyword(index)}
                      className="text-primary-500 hover:text-red-500 transition-colors"
                    >
                      <SafeIcon icon={FiX} className="text-sm" />
                    </button>
                  </motion.div>
                ))}
              </div>
              
              {suggestedKeywords.length === 0 && (
                <p className="text-gray-500 text-sm">No keywords found. You can add them manually in the editor.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Extracted Text Preview
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-32 overflow-y-auto">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {extractedText.slice(0, 500)}...
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <motion.button
                onClick={handleImport}
                className="flex-1 bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Import Pitch
              </motion.button>
              <motion.button
                onClick={onClose}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PitchImporter;