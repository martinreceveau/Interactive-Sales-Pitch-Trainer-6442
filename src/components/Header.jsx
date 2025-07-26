import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const { FiEdit3, FiMic, FiSave, FiTrendingUp, FiUser, FiLogOut } = FiIcons;

const Header = ({ currentView, setCurrentView }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    en: {
      welcome: "Welcome back",
      pitchEditor: "Pitch Editor",
      practice: "Practice Saved Pitches",
      savedPitches: "Saved Pitches",
      profile: "Profile",
      signOut: "Sign Out"
    },
    fr: {
      welcome: "Bon retour",
      pitchEditor: "Éditeur de Présentation",
      practice: "Pratiquer Présentations Sauvegardées",
      savedPitches: "Présentations Sauvegardées",
      profile: "Profil",
      signOut: "Déconnexion"
    }
  };

  const t = translations[language];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { id: 'editor', label: t.pitchEditor, icon: FiEdit3 },
    { id: 'practice', label: t.practice, icon: FiMic },
    { id: 'saved', label: t.savedPitches, icon: FiSave }
  ];

  return (
    <header className="bg-white shadow-lg border-b border-primary-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-primary-500 p-2 rounded-lg">
              <SafeIcon icon={FiTrendingUp} className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">PopSales</h1>
              <p className="text-sm text-gray-600">{t.welcome}, {user?.fullName || 'User'}!</p>
            </div>
          </motion.div>

          <nav className="flex items-center space-x-4">
            <div className="flex space-x-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentView === item.id
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SafeIcon icon={item.icon} className="text-lg" />
                  <span className="font-medium hidden sm:inline">{item.label}</span>
                </motion.button>
              ))}
            </div>

            <div className="flex items-center space-x-2 border-l border-gray-200 pl-4">
              <LanguageSwitcher />
              <motion.button
                onClick={() => setCurrentView('profile')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  currentView === 'profile'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiUser} className="text-lg" />
                <span className="font-medium hidden sm:inline">{t.profile}</span>
              </motion.button>
              <motion.button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiLogOut} className="text-lg" />
                <span className="font-medium hidden sm:inline">{t.signOut}</span>
              </motion.button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;