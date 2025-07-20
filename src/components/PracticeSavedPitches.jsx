import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { usePitch } from '../contexts/PitchContext';
import { useLanguage } from '../contexts/LanguageContext';
import PitchPractice from './PitchPractice';

const { FiFolder, FiPlay, FiCalendar, FiGlobe, FiClock, FiTarget, FiMic, FiEdit3 } = FiIcons;

const PracticeSavedPitches = ({ setCurrentView }) => {
  const { savedPitches, loadPitch } = usePitch();
  const { language } = useLanguage();
  const [selectedPitchForPractice, setSelectedPitchForPractice] = useState(null);

  const translations = {
    en: {
      title: "Practice Saved Pitches",
      subtitle: "Choose a pitch to practice or create your first one",
      noPitches: "No Saved Pitches",
      noPitchesDesc: "Create your first pitch to get started with practice sessions.",
      createFirst: "Create Your First Pitch",
      selectPitch: "Select a Pitch to Practice",
      practice: "Practice",
      edit: "Edit",
      backToPitches: "Back to Pitches",
      keywords: "keywords"
    },
    fr: {
      title: "Pratiquer les Présentations Sauvegardées",
      subtitle: "Choisissez une présentation à pratiquer ou créez votre première",
      noPitches: "Aucune Présentation Sauvegardée",
      noPitchesDesc: "Créez votre première présentation pour commencer les sessions de pratique.",
      createFirst: "Créer Votre Première Présentation",
      selectPitch: "Sélectionner une Présentation à Pratiquer",
      practice: "Pratiquer",
      edit: "Modifier",
      backToPitches: "Retour aux Présentations",
      keywords: "mots-clés"
    }
  };

  const t = translations[language];

  const getLanguageFlag = (language) => {
    switch (language) {
      case 'fr-FR': return '🇫🇷';
      case 'en-US': return '🇺🇸';
      default: return '🌐';
    }
  };

  const getLanguageName = (language) => {
    switch (language) {
      case 'fr-FR': return 'Français';
      case 'en-US': return 'English';
      default: return 'Unknown';
    }
  };

  const getDurationLabel = (duration) => {
    if (duration <= 1) return language === 'en' ? '1 min - Elevator Pitch' : '1 min - Présentation Éclair';
    if (duration <= 5) return language === 'en' ? '5 min - Quick Presentation' : '5 min - Présentation Rapide';
    if (duration <= 10) return language === 'en' ? '10 min - Short Presentation' : '10 min - Présentation Courte';
    if (duration <= 15) return language === 'en' ? '15 min - Standard Pitch' : '15 min - Présentation Standard';
    if (duration <= 30) return language === 'en' ? '30 min - Meeting Presentation' : '30 min - Présentation de Réunion';
    return language === 'en' ? '60 min - Full Presentation' : '60 min - Présentation Complète';
  };

  const handlePracticePitch = (pitch) => {
    loadPitch(pitch.id);
    setSelectedPitchForPractice(pitch);
  };

  const handleEditPitch = (pitch) => {
    loadPitch(pitch.id);
    setCurrentView('editor');
  };

  // If a pitch is selected for practice, show the practice component
  if (selectedPitchForPractice) {
    return (
      <PitchPractice 
        setCurrentView={setCurrentView}
        onBack={() => setSelectedPitchForPractice(null)}
        pitch={selectedPitchForPractice}
      />
    );
  }

  // If no saved pitches, show empty state
  if (savedPitches.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <SafeIcon icon={FiFolder} className="text-6xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.noPitches}</h3>
          <p className="text-gray-600 mb-6">{t.noPitchesDesc}</p>
          <motion.button
            onClick={() => setCurrentView('editor')}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.createFirst}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Show saved pitches for practice selection
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
            <p className="text-gray-600">{t.selectPitch}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-500">{savedPitches.length}</div>
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'Available Pitches' : 'Présentations Disponibles'}
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <AnimatePresence>
            {savedPitches.map((pitch, index) => (
              <motion.div
                key={pitch.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200 border-l-4 border-primary-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-800">{pitch.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center space-x-1">
                          <span>{getLanguageFlag(pitch.language || 'en-US')}</span>
                          <span>{getLanguageName(pitch.language || 'en-US')}</span>
                        </span>
                        <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full flex items-center space-x-1">
                          <SafeIcon icon={FiClock} className="text-xs" />
                          <span>{getDurationLabel(pitch.duration || 5)}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <SafeIcon icon={FiCalendar} />
                        <span>{format(new Date(pitch.createdAt), 'MMM d, yyyy')}</span>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center space-x-1">
                        <SafeIcon icon={FiTarget} />
                        <span>{pitch.keywords.length} {t.keywords}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {pitch.keywords.slice(0, 6).map((keyword, keywordIndex) => (
                        <span
                          key={keywordIndex}
                          className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {keyword}
                        </span>
                      ))}
                      {pitch.keywords.length > 6 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{pitch.keywords.length - 6} {language === 'en' ? 'more' : 'de plus'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <motion.button
                      onClick={() => handlePracticePitch(pitch)}
                      className="bg-success-500 text-white px-6 py-3 rounded-lg hover:bg-success-600 transition-colors duration-200 flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SafeIcon icon={FiMic} />
                      <span className="font-medium">{t.practice}</span>
                    </motion.button>
                    <motion.button
                      onClick={() => handleEditPitch(pitch)}
                      className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SafeIcon icon={FiEdit3} />
                      <span className="font-medium">{t.edit}</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default PracticeSavedPitches;