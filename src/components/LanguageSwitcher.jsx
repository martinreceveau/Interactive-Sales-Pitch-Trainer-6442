import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useLanguage } from '../contexts/LanguageContext';

const { FiGlobe } = FiIcons;

const LanguageSwitcher = ({ variant = 'default' }) => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  if (variant === 'buttons') {
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => changeLanguage('en')}
          className={`px-3 py-1 rounded ${
            language === 'en' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700'
          }`}
        >
          🇺🇸 EN
        </button>
        <button
          onClick={() => changeLanguage('fr')}
          className={`px-3 py-1 rounded ${
            language === 'fr' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700'
          }`}
        >
          🇫🇷 FR
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <SafeIcon icon={FiGlobe} className="text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {language === 'en' ? '🇺🇸 EN' : '🇫🇷 FR'}
        </span>
      </motion.button>
      
      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[100px] z-20">
            <button
              onClick={() => {
                changeLanguage('en');
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2 ${
                language === 'en' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              <span>🇺🇸</span>
              <span>English</span>
            </button>
            <button
              onClick={() => {
                changeLanguage('fr');
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2 ${
                language === 'fr' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              <span>🇫🇷</span>
              <span>Français</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;