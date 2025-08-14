import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useLanguage } from '../contexts/LanguageContext';

const { FiUpload, FiX, FiFile, FiLoader, FiCheck, FiAlertCircle, FiPlus, FiMinus } = FiIcons;

const PitchImporter = ({ onClose, onImport }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [suggestedKeywords, setSuggestedKeywords] = useState([]);
  const [suggestedTitle, setSuggestedTitle] = useState('');
  const [error, setError] = useState('');
  const [fileInfo, setFileInfo] = useState(null);
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Import Pitch from Document",
      subtitle: "Extract keywords and content from your existing presentations",
      dropzone: {
        title: "Drag & drop a file here",
        active: "Drop your file here",
        formats: "Supported formats: TXT, PDF*",
        note: "* PDF text extraction works best with text-based PDFs"
      },
      processing: {
        title: "Processing your document...",
        subtitle: "Extracting text and analyzing keywords"
      },
      success: {
        title: "Document processed successfully!",
        stats: "Extracted {wordCount} words and found {keywordCount} potential keywords."
      },
      fields: {
        title: "Suggested Title",
        keywords: "Suggested Keywords ({count})",
        preview: "Extracted Text Preview",
        noKeywords: "No keywords found. You can add them manually in the editor."
      },
      actions: {
        import: "Import Pitch",
        cancel: "Cancel",
        addKeyword: "Add Keyword",
        keywordPlaceholder: "Enter keyword..."
      },
      errors: {
        generic: "An error occurred while processing your file.",
        format: "Please upload a TXT or PDF file.",
        empty: "The file appears to be empty or couldn't be read properly."
      }
    },
    fr: {
      title: "Importer une Présentation depuis un Document",
      subtitle: "Extraire des mots-clés et du contenu de vos présentations existantes",
      dropzone: {
        title: "Glissez et déposez un fichier ici",
        active: "Déposez votre fichier ici",
        formats: "Formats pris en charge: TXT, PDF*",
        note: "* L'extraction de texte PDF fonctionne mieux avec les PDF basés sur du texte"
      },
      processing: {
        title: "Traitement de votre document...",
        subtitle: "Extraction du texte et analyse des mots-clés"
      },
      success: {
        title: "Document traité avec succès !",
        stats: "Extrait {wordCount} mots et trouvé {keywordCount} mots-clés potentiels."
      },
      fields: {
        title: "Titre Suggéré",
        keywords: "Mots-clés Suggérés ({count})",
        preview: "Aperçu du Texte Extrait",
        noKeywords: "Aucun mot-clé trouvé. Vous pouvez les ajouter manuellement dans l'éditeur."
      },
      actions: {
        import: "Importer la Présentation",
        cancel: "Annuler",
        addKeyword: "Ajouter un Mot-clé",
        keywordPlaceholder: "Entrer un mot-clé..."
      },
      errors: {
        generic: "Une erreur s'est produite lors du traitement de votre fichier.",
        format: "Veuillez télécharger un fichier TXT ou PDF.",
        empty: "Le fichier semble être vide ou n'a pas pu être lu correctement."
      }
    }
  };

  const t = translations[language];
  const [newKeyword, setNewKeyword] = useState('');

  // Extract text from uploaded file
  const extractTextFromFile = async (file) => {
    try {
      // For text files, we can use the FileReader API directly
      if (file.type === 'text/plain') {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = (e) => reject(new Error('Failed to read text file'));
          reader.readAsText(file);
        });
      }
      
      // For PDFs, use a text extraction approach that works in browser
      if (file.type === 'application/pdf') {
        // Simple PDF text extraction using ArrayBuffer and text decoder
        // This is a basic implementation that works for text-based PDFs
        // It won't work for scanned PDFs or complex layouts
        const arrayBuffer = await file.arrayBuffer();
        
        // Look for text streams in the PDF
        const textDecoder = new TextDecoder('utf-8');
        const data = textDecoder.decode(arrayBuffer);
        
        // Extract text between stream markers (simplified approach)
        const extractedTexts = [];
        const streamMarker = /stream([\s\S]*?)endstream/g;
        let match;
        
        while ((match = streamMarker.exec(data)) !== null) {
          try {
            // Clean up binary data as much as possible
            let streamContent = match[1]
              .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\xFF]/g, '') // Remove binary chars
              .replace(/(\(\)|\[\]|\{\})/g, ' ') // Replace empty brackets with spaces
              .replace(/\\n|\\r/g, '\n') // Replace escaped newlines
              .trim();
              
            if (streamContent && /[a-zA-Z]{3,}/.test(streamContent)) {
              extractedTexts.push(streamContent);
            }
          } catch (e) {
            console.error('Error processing stream:', e);
          }
        }
        
        // Join all extracted text parts
        return extractedTexts.join('\n\n');
      }
      
      throw new Error('Unsupported file type');
    } catch (error) {
      console.error('Error extracting text:', error);
      throw new Error('Failed to extract text from file');
    }
  };

  // Analyze text to extract keywords and title
  const analyzeText = (text) => {
    if (!text || text.trim().length === 0) {
      throw new Error('Empty or invalid text content');
    }

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
      'this', 'that', 'with', 'have', 'will', 'from', 'they', 'know', 'want', 'been', 'good',
      'much', 'some', 'time', 'very', 'when', 'come', 'here', 'just', 'like', 'long', 'make',
      'many', 'over', 'such', 'take', 'than', 'them', 'well', 'were', 'what', 'your', 'about',
      'after', 'again', 'before', 'could', 'first', 'found', 'great', 'group', 'hand', 'help',
      'high', 'important', 'information', 'large', 'last', 'left', 'life', 'little', 'look',
      'made', 'most', 'move', 'need', 'new', 'number', 'other', 'part', 'place', 'point',
      'problem', 'program', 'public', 'right', 'same', 'school', 'seem', 'several', 'small',
      'social', 'still', 'system', 'those', 'though', 'three', 'through', 'today', 'together',
      'turn', 'under', 'until', 'used', 'using', 'water', 'work', 'world', 'would', 'year',
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

    return { keywords, title, wordCount: words.length };
  };

  // Handle file drop
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    
    if (file.type !== 'text/plain' && file.type !== 'application/pdf') {
      setError(t.errors.format);
      return;
    }

    setFileInfo({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type
    });
    
    setIsProcessing(true);
    setError('');
    
    try {
      const text = await extractTextFromFile(file);
      if (!text || text.trim().length === 0) {
        throw new Error('Empty text content');
      }
      
      setExtractedText(text);
      const analysis = analyzeText(text);
      setSuggestedKeywords(analysis.keywords);
      setSuggestedTitle(analysis.title);
    } catch (error) {
      console.error('File processing error:', error);
      setError(error.message === 'Empty text content' ? t.errors.empty : t.errors.generic);
    } finally {
      setIsProcessing(false);
    }
  }, [t]);

  // Handle drag events
  const [isDragActive, setIsDragActive] = useState(false);
  
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length) {
      onDrop([files[0]]);
    }
  };
  
  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length) {
      onDrop([files[0]]);
    }
  };

  // Import pitch
  const handleImport = () => {
    onImport({
      title: suggestedTitle,
      keywords: suggestedKeywords
    });
  };

  // Remove keyword
  const removeKeyword = (index) => {
    setSuggestedKeywords(suggestedKeywords.filter((_, i) => i !== index));
  };

  // Add keyword manually
  const addKeyword = () => {
    if (newKeyword.trim() && !suggestedKeywords.includes(newKeyword.trim())) {
      setSuggestedKeywords([...suggestedKeywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword();
    }
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
          <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <SafeIcon icon={FiX} className="text-2xl" />
          </button>
        </div>

        {/* Step 1: File Upload */}
        {!extractedText && !isProcessing && (
          <div
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
            }`}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".txt,.pdf"
              onChange={handleFileInputChange}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <SafeIcon icon={FiUpload} className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600 mb-2">
                {isDragActive ? t.dropzone.active : t.dropzone.title}
              </p>
              <p className="text-sm text-gray-500">{t.dropzone.formats}</p>
              <p className="text-xs text-gray-400 mt-2 italic">{t.dropzone.note}</p>
            </label>
          </div>
        )}

        {/* Step 2: Processing */}
        {isProcessing && (
          <div className="text-center py-12">
            <SafeIcon icon={FiLoader} className="text-4xl text-primary-500 mx-auto mb-4 animate-spin" />
            <p className="text-lg text-gray-600">{t.processing.title}</p>
            <p className="text-sm text-gray-500 mt-2">{t.processing.subtitle}</p>
          </div>
        )}

        {/* Step 3: Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiAlertCircle} className="text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Step 4: Results and Editing */}
        {extractedText && !isProcessing && (
          <div className="space-y-6">
            {/* Success message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <SafeIcon icon={FiCheck} className="text-green-500" />
                <p className="text-green-700 font-semibold">{t.success.title}</p>
              </div>
              <p className="text-green-600 text-sm">
                {t.success.stats.replace('{wordCount}', extractedText.split(' ').length).replace('{keywordCount}', suggestedKeywords.length)}
              </p>
              {fileInfo && (
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <SafeIcon icon={FiFile} className="mr-1" />
                  <span>
                    {fileInfo.name} ({fileInfo.size})
                  </span>
                </div>
              )}
            </div>

            {/* Title editor */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.fields.title}
              </label>
              <input
                type="text"
                value={suggestedTitle}
                onChange={(e) => setSuggestedTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Keywords editor */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.fields.keywords.replace('{count}', suggestedKeywords.length)}
              </label>
              
              {/* Add keyword input */}
              <div className="flex mb-4">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t.actions.keywordPlaceholder}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  onClick={addKeyword}
                  className="bg-primary-500 text-white px-4 py-3 rounded-r-lg hover:bg-primary-600 transition-colors"
                >
                  <SafeIcon icon={FiPlus} />
                </button>
              </div>
              
              {/* Keywords list */}
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
                <p className="text-gray-500 text-sm">{t.fields.noKeywords}</p>
              )}
            </div>

            {/* Text preview */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.fields.preview}
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-32 overflow-y-auto">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {extractedText.slice(0, 500)}
                  {extractedText.length > 500 && '...'}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-4">
              <motion.button
                onClick={handleImport}
                className="flex-1 bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.actions.import}
              </motion.button>
              <motion.button
                onClick={onClose}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.actions.cancel}
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PitchImporter;