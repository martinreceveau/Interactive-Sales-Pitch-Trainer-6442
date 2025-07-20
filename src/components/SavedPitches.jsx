import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { usePitch } from '../contexts/PitchContext';
import PitchAnalytics from './PitchAnalytics';

const { FiFolder, FiTrash2, FiEdit3, FiPlay, FiCalendar, FiGlobe, FiBarChart, FiClock } = FiIcons;

const SavedPitches = ({ setCurrentView }) => {
  const { savedPitches, loadPitch, deletePitch } = usePitch();
  const [selectedPitch, setSelectedPitch] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const handleLoadPitch = (pitchId) => {
    loadPitch(pitchId);
    setCurrentView('editor');
  };

  const handlePracticePitch = (pitchId) => {
    loadPitch(pitchId);
    setCurrentView('practice');
  };

  const handleDeletePitch = (pitchId) => {
    if (window.confirm('Are you sure you want to delete this pitch?')) {
      deletePitch(pitchId);
    }
  };

  const handleViewAnalytics = (pitch) => {
    setSelectedPitch(pitch);
    setShowAnalytics(true);
  };

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
    if (duration <= 1) return '1 min - Elevator Pitch';
    if (duration <= 5) return '5 min - Quick Presentation';
    if (duration <= 10) return '10 min - Short Presentation';
    if (duration <= 15) return '15 min - Standard Pitch';
    if (duration <= 30) return '30 min - Meeting Presentation';
    return '60 min - Full Presentation';
  };

  if (showAnalytics && selectedPitch) {
    return (
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{selectedPitch.title}</h2>
              <p className="text-gray-600">Performance analytics and insights</p>
            </div>
            <motion.button
              onClick={() => setShowAnalytics(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Pitches
            </motion.button>
          </div>
          
          <PitchAnalytics pitch={selectedPitch} />
        </motion.div>
      </div>
    );
  }

  if (savedPitches.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <SafeIcon icon={FiFolder} className="text-6xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Saved Pitches</h3>
          <p className="text-gray-600 mb-6">Create your first pitch to get started with practice sessions.</p>
          <motion.button
            onClick={() => setCurrentView('editor')}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Your First Pitch
          </motion.button>
        </motion.div>
      </div>
    );
  }

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
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Saved Pitches</h2>
            <p className="text-gray-600">Manage your saved pitches and track their performance</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-500">{savedPitches.length}</div>
            <div className="text-sm text-gray-600">Total Pitches</div>
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
                className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200"
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
                      <div className="text-sm text-gray-600">
                        {pitch.keywords.length} keywords
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
                          +{pitch.keywords.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    <div className="flex space-x-2">
                      <motion.button
                        onClick={() => handleLoadPitch(pitch.id)}
                        className="bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Edit Pitch"
                      >
                        <SafeIcon icon={FiEdit3} />
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handlePracticePitch(pitch.id)}
                        className="bg-success-500 text-white p-2 rounded-lg hover:bg-success-600 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Practice Pitch"
                      >
                        <SafeIcon icon={FiPlay} />
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleViewAnalytics(pitch)}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="View Analytics"
                      >
                        <SafeIcon icon={FiBarChart} />
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleDeletePitch(pitch.id)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Delete Pitch"
                      >
                        <SafeIcon icon={FiTrash2} />
                      </motion.button>
                    </div>
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

export default SavedPitches;