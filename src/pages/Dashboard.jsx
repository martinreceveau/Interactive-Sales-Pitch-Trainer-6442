import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import PitchEditor from '../components/PitchEditor';
import PracticeSavedPitches from '../components/PracticeSavedPitches';
import SavedPitches from '../components/SavedPitches';
import UserProfile from '../components/UserProfile';
import { PitchProvider } from '../contexts/PitchContext';

function Dashboard() {
  const [currentView, setCurrentView] = useState('editor');

  return (
    <PitchProvider>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
        <Header currentView={currentView} setCurrentView={setCurrentView} />
        <motion.main
          className="container mx-auto px-4 py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {currentView === 'editor' && <PitchEditor setCurrentView={setCurrentView} />}
          {currentView === 'practice' && <PracticeSavedPitches setCurrentView={setCurrentView} />}
          {currentView === 'saved' && <SavedPitches setCurrentView={setCurrentView} />}
          {currentView === 'profile' && <UserProfile setCurrentView={setCurrentView} />}
        </motion.main>
      </div>
    </PitchProvider>
  );
}

export default Dashboard;