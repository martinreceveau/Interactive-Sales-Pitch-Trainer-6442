import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAuth } from './AuthContext';

const PitchContext = createContext();

export const usePitch = () => {
  const context = useContext(PitchContext);
  if (!context) {
    throw new Error('usePitch must be used within a PitchProvider');
  }
  return context;
};

export const PitchProvider = ({ children }) => {
  const { user, updateUserStats } = useAuth();
  const [currentPitch, setCurrentPitch] = useState({
    title: '',
    keywords: [],
    language: 'en-US',
    duration: 5,
    flaggedKeywords: {}
  });
  const [savedPitches, setSavedPitches] = useState([]);

  useEffect(() => {
    if (user) {
      const saved = Cookies.get(`popsales_pitches_${user.id}`);
      if (saved) {
        try {
          const pitches = JSON.parse(saved);
          const updatedPitches = pitches.map(pitch => ({
            ...pitch,
            language: pitch.language || 'en-US',
            duration: pitch.duration || 5,
            flaggedKeywords: pitch.flaggedKeywords || {}
          }));
          setSavedPitches(updatedPitches);
        } catch (error) {
          console.error('Error parsing saved pitches:', error);
        }
      }
    }
  }, [user]);

  const savePitch = (pitch) => {
    if (!user) return null;

    const pitchWithId = {
      ...pitch,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      language: pitch.language || 'en-US',
      duration: pitch.duration || 5,
      flaggedKeywords: pitch.flaggedKeywords || {},
      userId: user.id,
      analytics: {
        totalPractices: 0,
        weeklyScores: [],
        keywordPerformance: {}
      }
    };

    const updatedPitches = [...savedPitches, pitchWithId];
    setSavedPitches(updatedPitches);
    Cookies.set(`popsales_pitches_${user.id}`, JSON.stringify(updatedPitches), { expires: 365 });

    // Update user stats
    updateUserStats({ pitchesCreated: updatedPitches.length });

    return pitchWithId;
  };

  const loadPitch = (pitchId) => {
    const pitch = savedPitches.find(p => p.id === pitchId);
    if (pitch) {
      setCurrentPitch({
        ...pitch,
        language: pitch.language || 'en-US',
        duration: pitch.duration || 5,
        flaggedKeywords: pitch.flaggedKeywords || {}
      });
    }
  };

  const deletePitch = (pitchId) => {
    if (!user) return;
    const updatedPitches = savedPitches.filter(p => p.id !== pitchId);
    setSavedPitches(updatedPitches);
    Cookies.set(`popsales_pitches_${user.id}`, JSON.stringify(updatedPitches), { expires: 365 });

    // Update user stats
    updateUserStats({ pitchesCreated: updatedPitches.length });
  };

  const incrementPracticeSession = () => {
    if (user) {
      const newCount = (user.practicesSessions || 0) + 1;
      updateUserStats({ practicesSessions: newCount });
    }
  };

  const updatePitchAnalytics = (pitchId, analyticsData) => {
    const updatedPitches = savedPitches.map(pitch => {
      if (pitch.id === pitchId) {
        return {
          ...pitch,
          analytics: {
            ...pitch.analytics,
            ...analyticsData,
            lastUpdated: new Date().toISOString()
          }
        };
      }
      return pitch;
    });
    setSavedPitches(updatedPitches);
    Cookies.set(`popsales_pitches_${user.id}`, JSON.stringify(updatedPitches), { expires: 365 });
  };

  const value = {
    currentPitch,
    setCurrentPitch,
    savedPitches,
    savePitch,
    loadPitch,
    deletePitch,
    incrementPracticeSession,
    updatePitchAnalytics
  };

  return (
    <PitchContext.Provider value={value}>
      {children}
    </PitchContext.Provider>
  );
};