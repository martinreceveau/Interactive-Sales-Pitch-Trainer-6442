import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { usePitch } from '../contexts/PitchContext';
import { useLanguage } from '../contexts/LanguageContext';
import NewsSuggestions from './NewsSuggestions';
import PitchImporter from './PitchImporter';

const { FiPlus, FiX, FiSave, FiPlay, FiEdit2, FiGlobe, FiClock, FiMove, FiTrendingUp, FiFlag, FiCheck, FiUpload } = FiIcons;

const PitchEditor = ({ setCurrentView }) => {
  const { currentPitch, setCurrentPitch, savePitch } = usePitch();
  const { language } = useLanguage();

  const [title, setTitle] = useState(currentPitch?.title || '');
  const [keywords, setKeywords] = useState(currentPitch?.keywords || []);
  const [newKeyword, setNewKeyword] = useState('');
  const [flaggedKeywords, setFlaggedKeywords] = useState(currentPitch?.flaggedKeywords || {});
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(currentPitch?.language || 'en-US');
  const [duration, setDuration] = useState(currentPitch?.duration || 5);
  const [showNewsSuggestions, setShowNewsSuggestions] = useState(false);
  const [showImporter, setShowImporter] = useState(false);

  const translations = {
    en: {
      title: "Create Your Pitch",
      subtitle: "Add a title and keywords for your sales pitch",
      titleLabel: "Pitch Title",
      titlePlaceholder: "Enter a title for your pitch",
      keywordsLabel: "Keywords",
      keywordPlaceholder: "Add a keyword...",
      addKeyword: "Add",
      flaggedLabel: "Flag as essential",
      saveButton: "Save Pitch",
      practiceButton: "Practice Now",
      languageLabel: "Speech Recognition Language",
      durationLabel: "Approximate Duration",
      newsIdeas: "News & Ideas",
      importButton: "Import from File",
      saveSuccess: "Pitch saved successfully!",
      errors: {
        titleRequired: "Title is required",
        keywordsRequired: "At least one keyword is required"
      }
    },
    fr: {
      title: "Créez Votre Présentation",
      subtitle: "Ajoutez un titre et des mots-clés pour votre présentation commerciale",
      titleLabel: "Titre de la Présentation",
      titlePlaceholder: "Entrez un titre pour votre présentation",
      keywordsLabel: "Mots-clés",
      keywordPlaceholder: "Ajouter un mot-clé...",
      addKeyword: "Ajouter",
      flaggedLabel: "Marquer comme essentiel",
      saveButton: "Enregistrer la Présentation",
      practiceButton: "Pratiquer Maintenant",
      languageLabel: "Langue de Reconnaissance Vocale",
      durationLabel: "Durée Approximative",
      newsIdeas: "Actualités & Idées",
      importButton: "Importer depuis un Fichier",
      saveSuccess: "Présentation enregistrée avec succès!",
      errors: {
        titleRequired: "Le titre est requis",
        keywordsRequired: "Au moins un mot-clé est requis"
      }
    }
  };

  const t = translations[language];

  const languageOptions = [
    { value: 'en-US', label: language === 'en' ? 'English (US)' : 'Anglais (US)' },
    { value: 'fr-FR', label: language === 'en' ? 'French' : 'Français' }
  ];

  const durationOptions = [
    { value: 1, label: language === 'en' ? '1 minute - Elevator Pitch' : '1 minute - Présentation Éclair' },
    { value: 5, label: language === 'en' ? '5 minutes - Quick Presentation' : '5 minutes - Présentation Rapide' },
    { value: 10, label: language === 'en' ? '10 minutes - Short Presentation' : '10 minutes - Présentation Courte' },
    { value: 15, label: language === 'en' ? '15 minutes - Standard Pitch' : '15 minutes - Présentation Standard' },
    { value: 30, label: language === 'en' ? '30 minutes - Meeting Presentation' : '30 minutes - Présentation de Réunion' },
    { value: 60, label: language === 'en' ? '60 minutes - Full Presentation' : '60 minutes - Présentation Complète' }
  ];

  useEffect(() => {
    if (currentPitch) {
      setTitle(currentPitch.title || '');
      setKeywords(currentPitch.keywords || []);
      setFlaggedKeywords(currentPitch.flaggedKeywords || {});
      setSelectedLanguage(currentPitch.language || 'en-US');
      setDuration(currentPitch.duration || 5);
    }
  }, [currentPitch]);

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (index) => {
    const updatedKeywords = [...keywords];
    const removedKeyword = updatedKeywords.splice(index, 1)[0];

    // Also remove from flagged keywords if it exists
    if (flaggedKeywords[removedKeyword]) {
      const updatedFlagged = { ...flaggedKeywords };
      delete updatedFlagged[removedKeyword];
      setFlaggedKeywords(updatedFlagged);
    }

    setKeywords(updatedKeywords);
  };

  const toggleFlaggedKeyword = (keyword) => {
    setFlaggedKeywords(prev => {
      const updated = { ...prev };
      if (updated[keyword]) {
        delete updated[keyword];
      } else {
        updated[keyword] = true;
      }
      return updated;
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(keywords);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setKeywords(items);
  };

  const handleSavePitch = () => {
    if (!title.trim()) {
      alert(t.errors.titleRequired);
      return;
    }

    if (keywords.length === 0) {
      alert(t.errors.keywordsRequired);
      return;
    }

    const pitchData = {
      ...currentPitch,
      title,
      keywords,
      language: selectedLanguage,
      duration,
      flaggedKeywords
    };

    setCurrentPitch(pitchData);
    savePitch(pitchData);
    setShowSaveSuccess(true);
    setTimeout(() => {
      setShowSaveSuccess(false);
    }, 3000);
  };

  const handlePracticeNow = () => {
    handleSavePitch();
    setCurrentView('practice');
  };

  const handleImport = (importData) => {
    if (importData.title) {
      setTitle(importData.title);
    }
    
    if (importData.keywords && importData.keywords.length > 0) {
      // Merge existing and new keywords, removing duplicates
      const combinedKeywords = [...keywords];
      
      importData.keywords.forEach(keyword => {
        if (!combinedKeywords.includes(keyword)) {
          combinedKeywords.push(keyword);
        }
      });
      
      setKeywords(combinedKeywords);
    }
    
    setShowImporter(false);
  };

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
              onClick={() => setShowImporter(true)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiUpload} />
              <span>{t.importButton}</span>
            </motion.button>
            
            <motion.button
              onClick={() => setShowNewsSuggestions(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiTrendingUp} />
              <span>{t.newsIdeas}</span>
            </motion.button>
            
            <SafeIcon icon={FiEdit2} className="text-4xl text-primary-500" />
          </div>
        </div>

        {/* Pitch Title */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t.titleLabel}
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.titlePlaceholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Settings Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.languageLabel}
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.durationLabel}
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {durationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Keywords */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t.keywordsLabel}
          </label>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
              placeholder={t.keywordPlaceholder}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              onClick={addKeyword}
              className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
            >
              {t.addKeyword}
            </button>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="keywords">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {keywords.map((keyword, index) => (
                    <Draggable
                      key={`${keyword}-${index}`}
                      draggableId={`${keyword}-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-gray-100 p-4 rounded-lg flex items-center justify-between ${
                            snapshot.isDragging ? 'shadow-lg' : ''
                          } ${flaggedKeywords[keyword] ? 'border-l-4 border-red-500' : ''}`}
                        >
                          <div className="flex items-center space-x-3">
                            <SafeIcon icon={FiMove} className="text-gray-400 cursor-grab" />
                            <span className="text-gray-800">{keyword}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <input
                                type="checkbox"
                                id={`flag-${index}`}
                                checked={!!flaggedKeywords[keyword]}
                                onChange={() => toggleFlaggedKeyword(keyword)}
                                className="w-4 h-4 text-red-500 rounded focus:ring-red-500"
                              />
                              <label htmlFor={`flag-${index}`} className="text-sm text-gray-600">
                                {t.flaggedLabel}
                              </label>
                            </div>
                            <button
                              onClick={() => removeKeyword(index)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <SafeIcon icon={FiX} />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {keywords.length === 0 && (
            <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
              {language === 'en'
                ? 'Add keywords to track in your pitch'
                : 'Ajoutez des mots-clés à suivre dans votre présentation'}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <motion.button
            onClick={handleSavePitch}
            className="flex-1 bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SafeIcon icon={FiSave} />
            <span>{t.saveButton}</span>
          </motion.button>

          <motion.button
            onClick={handlePracticeNow}
            className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!title || keywords.length === 0}
          >
            <SafeIcon icon={FiPlay} />
            <span>{t.practiceButton}</span>
          </motion.button>
        </div>

        <AnimatePresence>
          {showSaveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 right-4 bg-success-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
            >
              <SafeIcon icon={FiCheck} />
              <span>{t.saveSuccess}</span>
            </motion.div>
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

          {showImporter && (
            <PitchImporter
              onClose={() => setShowImporter(false)}
              onImport={handleImport}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PitchEditor;