// Update PitchEditor.jsx to remove PDF import button and related code
// Replace the "Import PDF" button with just the "News Ideas" button

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { usePitch } from '../contexts/PitchContext';
import { useLanguage } from '../contexts/LanguageContext';
import NewsSuggestions from './NewsSuggestions';

// Remove FiUpload from imports
const { FiPlus, FiX, FiSave, FiPlay, FiEdit2, FiGlobe, FiClock, FiMove, FiTrendingUp, FiFlag, FiCheck } = FiIcons;

const PitchEditor = ({ setCurrentView }) => {
  // ... rest of your existing state and hooks ...

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
            {/* Keep only the News Ideas button */}
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

        {/* ... rest of your existing JSX ... */}

        {/* Remove showImporter state and PitchImporter modal */}
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
      </motion.div>
    </div>
  );
};

export default PitchEditor;