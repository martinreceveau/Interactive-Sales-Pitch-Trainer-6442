import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { usePitch } from '../contexts/PitchContext';
import { useLanguage } from '../contexts/LanguageContext';
import PitchImporter from './PitchImporter';
import NewsSuggestions from './NewsSuggestions';

const { FiPlus, FiX, FiSave, FiPlay, FiEdit2, FiGlobe, FiClock, FiUpload, FiMove, FiTrendingUp, FiFlag, FiCheck } = FiIcons;

const PitchEditor = ({ setCurrentView }) => {
  const { currentPitch, setCurrentPitch, savePitch } = usePitch();
  const { language } = useLanguage();
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [pitchLanguage, setPitchLanguage] = useState('en-US');
  const [pitchDuration, setPitchDuration] = useState(5);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [showImporter, setShowImporter] = useState(false);
  const [showNewsSuggestions, setShowNewsSuggestions] = useState(false);
  // Add flagged keywords state
  const [flaggedKeywords, setFlaggedKeywords] = useState({});

  const translations = {
    en: {
      title: "Create Your Sales Pitch",
      subtitle: "Define your keywords and build your authentic pitch around them",
      newsIdeas: "News Ideas",
      importPDF: "Import PDF",
      pitchTitle: "Pitch Title",
      titlePlaceholder: "Enter your pitch title...",
      duration: "Duration",
      language: "Language",
      keywords: "Keywords",
      dragToReorder: "Drag to reorder",
      flagEssential: "Flag essential keywords",
      addKeyword: "Add a keyword...",
      add: "Add",
      savePitch: "Save Pitch",
      startPractice: "Start Practice",
      saveSuccess: "Pitch saved successfully!",
      durationOptions: [
        { value: 1, label: '1 min - Elevator Pitch' },
        { value: 5, label: '5 min - Quick Presentation' },
        { value: 10, label: '10 min - Short Presentation' },
        { value: 15, label: '15 min - Standard Pitch' },
        { value: 30, label: '30 min - Meeting Presentation' },
        { value: 60, label: '60 min - Full Presentation' }
      ],
      languages: [
        { code: 'en-US', name: 'English', flag: '🇺🇸' },
        { code: 'fr-FR', name: 'Français', flag: '🇫🇷' }
      ]
    },
    fr: {
      title: "Créez Votre Présentation Commerciale",
      subtitle: "Définissez vos mots-clés et construisez votre présentation authentique autour d'eux",
      newsIdeas: "Idées d'Actualités",
      importPDF: "Importer PDF",
      pitchTitle: "Titre de la Présentation",
      titlePlaceholder: "Entrez le titre de votre présentation...",
      duration: "Durée",
      language: "Langue",
      keywords: "Mots-Clés",
      dragToReorder: "Glisser pour réorganiser",
      flagEssential: "Marquer les mots-clés essentiels",
      addKeyword: "Ajouter un mot-clé...",
      add: "Ajouter",
      savePitch: "Sauvegarder",
      startPractice: "Commencer la Pratique",
      saveSuccess: "Présentation sauvegardée avec succès !",
      durationOptions: [
        { value: 1, label: '1 min - Présentation Éclair' },
        { value: 5, label: '5 min - Présentation Rapide' },
        { value: 10, label: '10 min - Présentation Courte' },
        { value: 15, label: '15 min - Présentation Standard' },
        { value: 30, label: '30 min - Présentation de Réunion' },
        { value: 60, label: '60 min - Présentation Complète' }
      ],
      languages: [
        { code: 'en-US', name: 'Anglais', flag: '🇺🇸' },
        { code: 'fr-FR', name: 'Français', flag: '🇫🇷' }
      ]
    }
  };

  const t = translations[language];

  useEffect(() => {
    if (currentPitch.title || currentPitch.keywords.length > 0) {
      setTitle(currentPitch.title);
      setKeywords(currentPitch.keywords);
      setPitchLanguage(currentPitch.language || 'en-US');
      setPitchDuration(currentPitch.duration || 5);
      // Load flagged keywords if they exist
      setFlaggedKeywords(currentPitch.flaggedKeywords || {});
    }
  }, [currentPitch]);

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (index) => {
    const keywordToRemove = keywords[index];
    const newKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(newKeywords);
    // Remove from flagged keywords if it was flagged
    if (flaggedKeywords[keywordToRemove]) {
      const newFlaggedKeywords = { ...flaggedKeywords };
      delete newFlaggedKeywords[keywordToRemove];
      setFlaggedKeywords(newFlaggedKeywords);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(keywords);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setKeywords(items);
  };

  const handleSave = () => {
    if (title.trim() && keywords.length > 0) {
      const pitch = {
        title: title.trim(),
        keywords,
        language: pitchLanguage,
        duration: pitchDuration,
        flaggedKeywords
      };
      savePitch(pitch);
      setCurrentPitch(pitch);
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 2000);
    }
  };

  const handlePractice = () => {
    if (title.trim() && keywords.length > 0) {
      setCurrentPitch({
        title: title.trim(),
        keywords,
        language: pitchLanguage,
        duration: pitchDuration,
        flaggedKeywords
      });
      setCurrentView('practice');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addKeyword();
    }
  };

  const handleImportedPitch = (importedData) => {
    setTitle(importedData.title);
    setKeywords(importedData.keywords);
    setShowImporter(false);
  };

  const toggleFlagKeyword = (keyword) => {
    const newFlaggedKeywords = { ...flaggedKeywords };
    if (newFlaggedKeywords[keyword]) {
      delete newFlaggedKeywords[keyword];
    } else {
      newFlaggedKeywords[keyword] = true;
    }
    setFlaggedKeywords(newFlaggedKeywords);
  };

  const getOptimalKeywordCount = () => {
    // New optimal keyword counts based on pitch duration
    switch (pitchDuration) {
      case 1: return 2;  // 1 min - 2 keywords
      case 5: return 3;  // 5 min - 3 keywords
      case 10: return 5; // 10 min - 5 keywords
      case 15: return 7; // 15 min - 5-7 keywords
      case 30: return 10; // 30 min - 10 keywords
      case 60: return 15; // 60 min - 15 keywords
      default: return 3;
    }
  };

  const getKeywordRecommendation = () => {
    const optimal = getOptimalKeywordCount();
    const current = keywords.length;
    const flaggedCount = Object.keys(flaggedKeywords).length;

    if (current < optimal * 0.7) {
      return {
        type: 'warning',
        message: language === 'en' 
          ? `Consider adding ${optimal - current} more keywords for a ${pitchDuration}-minute pitch`
          : `Considérez ajouter ${optimal - current} mots-clés de plus pour une présentation de ${pitchDuration} minute${pitchDuration > 1 ? 's' : ''}`,
        color: 'text-orange-600'
      };
    } else if (current > optimal * 1.3) {
      return {
        type: 'info',
        message: language === 'en'
          ? `You have many keywords for a ${pitchDuration}-minute pitch. Consider prioritizing the most important ones or flagging essential keywords.`
          : `Vous avez beaucoup de mots-clés pour une présentation de ${pitchDuration} minute${pitchDuration > 1 ? 's' : ''}. Considérez prioriser les plus importants ou marquer les mots-clés essentiels.`,
        color: 'text-blue-600'
      };
    } else {
      return {
        type: 'success',
        message: language === 'en'
          ? `Great! You have an optimal number of keywords for a ${pitchDuration}-minute pitch`
          : `Parfait ! Vous avez un nombre optimal de mots-clés pour une présentation de ${pitchDuration} minute${pitchDuration > 1 ? 's' : ''}`,
        color: 'text-green-600'
      };
    }
  };

  const recommendation = getKeywordRecommendation();

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={() => setShowNewsSuggestions(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiTrendingUp} />
              <span>{t.newsIdeas}</span>
            </motion.button>
            <motion.button
              onClick={() => setShowImporter(true)}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiUpload} />
              <span>{t.importPDF}</span>
            </motion.button>
            <SafeIcon icon={FiEdit2} className="text-4xl text-primary-500" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.pitchTitle}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.titlePlaceholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <SafeIcon icon={FiClock} className="inline mr-1" />
                {t.duration}
              </label>
              <select
                value={pitchDuration}
                onChange={(e) => setPitchDuration(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                {t.durationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <SafeIcon icon={FiGlobe} className="inline mr-1" />
                {t.language}
              </label>
              <select
                value={pitchLanguage}
                onChange={(e) => setPitchLanguage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                {t.languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                {t.keywords} ({keywords.length})
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiMove} className="text-gray-400" />
                  <span className="text-sm text-gray-500">{t.dragToReorder}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiFlag} className="text-red-500" />
                  <span className="text-sm text-gray-500">{t.flagEssential}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.addKeyword}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
              <motion.button
                onClick={addKeyword}
                className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiPlus} />
                <span>{t.add}</span>
              </motion.button>
            </div>

            {/* Keyword Recommendation */}
            <div className={`p-3 rounded-lg mb-4 ${
              recommendation.type === 'warning' ? 'bg-orange-50 border border-orange-200' :
              recommendation.type === 'info' ? 'bg-blue-50 border border-blue-200' :
              'bg-green-50 border border-green-200'
            }`}>
              <p className={`text-sm ${recommendation.color}`}>
                {recommendation.message}
              </p>
            </div>

            {/* Flagged Keywords Info */}
            <div className="p-3 rounded-lg mb-4 bg-yellow-50 border border-yellow-200">
              <p className="text-sm text-yellow-700">
                <SafeIcon icon={FiFlag} className="inline-block mr-1 text-red-500" />
                {language === 'en' 
                  ? `Flagged keywords will always be included in your pitch regardless of duration. ${Object.keys(flaggedKeywords).length > 0 ? `You have ${Object.keys(flaggedKeywords).length} flagged keyword${Object.keys(flaggedKeywords).length > 1 ? 's' : ''}.` : ''}`
                  : `Les mots-clés marqués seront toujours inclus dans votre présentation quelle que soit la durée. ${Object.keys(flaggedKeywords).length > 0 ? `Vous avez ${Object.keys(flaggedKeywords).length} mot${Object.keys(flaggedKeywords).length > 1 ? 's' : ''}-clé${Object.keys(flaggedKeywords).length > 1 ? 's' : ''} marqué${Object.keys(flaggedKeywords).length > 1 ? 's' : ''}.` : ''}`
                }
              </p>
            </div>

            {/* Draggable Keywords */}
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="keywords">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    <AnimatePresence>
                      {keywords.map((keyword, index) => (
                        <Draggable key={`${keyword}-${index}`} draggableId={`${keyword}-${index}`} index={index}>
                          {(provided, snapshot) => (
                            <motion.div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className={`${
                                flaggedKeywords[keyword] ? 'bg-red-100 text-red-700' : 'bg-primary-100 text-primary-700'
                              } px-4 py-3 rounded-lg flex items-center justify-between group hover:bg-primary-200 transition-colors duration-200 ${
                                snapshot.isDragging ? 'shadow-lg' : ''
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <SafeIcon icon={FiMove} className="text-primary-500 cursor-grab" />
                                <span className="font-medium">#{index + 1}</span>
                                <span className="font-medium">{keyword}</span>
                                {flaggedKeywords[keyword] && (
                                  <SafeIcon icon={FiFlag} className="text-red-500" />
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => toggleFlagKeyword(keyword)}
                                  className={`${
                                    flaggedKeywords[keyword] ? 'text-red-500 hover:text-gray-500' : 'text-gray-500 hover:text-red-500'
                                  } transition-colors duration-200`}
                                  title={flaggedKeywords[keyword] ? 
                                    (language === 'en' ? "Remove flag" : "Retirer le marquage") : 
                                    (language === 'en' ? "Flag as essential" : "Marquer comme essentiel")
                                  }
                                >
                                  <SafeIcon icon={flaggedKeywords[keyword] ? FiCheck : FiFlag} className="text-sm" />
                                </button>
                                <button
                                  onClick={() => removeKeyword(index)}
                                  className="text-primary-500 hover:text-red-500 transition-colors duration-200"
                                >
                                  <SafeIcon icon={FiX} className="text-sm" />
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </Draggable>
                      ))}
                    </AnimatePresence>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          <div className="flex space-x-4 pt-6">
            <motion.button
              onClick={handleSave}
              disabled={!title.trim() || keywords.length === 0}
              className="flex items-center space-x-2 bg-success-500 text-white px-6 py-3 rounded-lg hover:bg-success-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiSave} />
              <span>{t.savePitch}</span>
            </motion.button>

            <motion.button
              onClick={handlePractice}
              disabled={!title.trim() || keywords.length === 0}
              className="flex items-center space-x-2 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiPlay} />
              <span>{t.startPractice}</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {showSaveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-success-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
          >
            <SafeIcon icon={FiSave} />
            <span>{t.saveSuccess}</span>
          </motion.div>
        )}

        {showImporter && (
          <PitchImporter
            onClose={() => setShowImporter(false)}
            onImport={handleImportedPitch}
          />
        )}

        {showNewsSuggestions && (
          <NewsSuggestions
            onClose={() => setShowNewsSuggestions(false)}
            onAddKeyword={(keyword) => {
              if (!keywords.includes(keyword)) {
                setKeywords([...keywords, keyword]);
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PitchEditor;