import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiZap, FiClock, FiVolume2, FiAlertTriangle } = FiIcons;

const SpeechAnalyzer = ({ isRecording, analysisData, transcript }) => {
  const [alerts, setAlerts] = useState({
    speakingTooFast: false,
    noSilence: false,
    stressedVoice: false
  });
  const [speechStats, setSpeechStats] = useState({
    averageWPM: 0,
    silenceDuration: 0,
    stressLevel: 0
  });

  useEffect(() => {
    if (!isRecording) return;

    const checkSpeechPatterns = () => {
      const { speechRate, volume, lastSpeechTime } = analysisData;
      const currentTime = Date.now();
      const timeSinceLastSpeech = currentTime - lastSpeechTime;

      // Check if speaking too fast (>200 WPM is considered too fast for presentations)
      const tooFast = speechRate > 200;
      
      // Check for lack of silence (no pause for more than 30 seconds)
      const noSilence = timeSinceLastSpeech < 30000 && transcript.length > 100;
      
      // Check for stressed voice (high volume consistently)
      const stressedVoice = volume > 150;

      setAlerts({
        speakingTooFast: tooFast,
        noSilence: noSilence,
        stressedVoice: stressedVoice
      });

      setSpeechStats({
        averageWPM: Math.round(speechRate),
        silenceDuration: Math.round(timeSinceLastSpeech / 1000),
        stressLevel: Math.round((volume / 255) * 100)
      });
    };

    const interval = setInterval(checkSpeechPatterns, 1000);
    return () => clearInterval(interval);
  }, [isRecording, analysisData, transcript]);

  const getAlertColor = (isActive) => {
    return isActive ? 'bg-red-100 border-red-300 text-red-700' : 'bg-gray-50 border-gray-200 text-gray-600';
  };

  const getAlertIcon = (isActive) => {
    return isActive ? 'text-red-500' : 'text-gray-400';
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Speech Analysis</h3>
        
        {/* Real-time Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <SafeIcon icon={FiZap} className="text-2xl text-blue-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-blue-700">{speechStats.averageWPM}</div>
            <div className="text-sm text-blue-600">Words/Min</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <SafeIcon icon={FiClock} className="text-2xl text-green-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-700">{speechStats.silenceDuration}s</div>
            <div className="text-sm text-green-600">Since Pause</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <SafeIcon icon={FiVolume2} className="text-2xl text-purple-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-purple-700">{speechStats.stressLevel}%</div>
            <div className="text-sm text-purple-600">Voice Level</div>
          </div>
        </div>

        {/* Alerts */}
        <div className="space-y-3">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-lg border transition-all duration-300 ${getAlertColor(alerts.speakingTooFast)}`}
            >
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiZap} className={`text-xl ${getAlertIcon(alerts.speakingTooFast)}`} />
                <div className="flex-1">
                  <div className="font-medium">Speaking Pace</div>
                  <div className="text-sm opacity-75">
                    {alerts.speakingTooFast 
                      ? 'You\'re speaking too fast! Try to slow down.' 
                      : 'Your speaking pace is good'}
                  </div>
                </div>
                {alerts.speakingTooFast && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <SafeIcon icon={FiAlertTriangle} className="text-red-500" />
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`p-4 rounded-lg border transition-all duration-300 ${getAlertColor(alerts.noSilence)}`}
            >
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiClock} className={`text-xl ${getAlertIcon(alerts.noSilence)}`} />
                <div className="flex-1">
                  <div className="font-medium">Pauses & Silence</div>
                  <div className="text-sm opacity-75">
                    {alerts.noSilence 
                      ? 'Take some pauses to let your message sink in!' 
                      : 'Good use of pauses'}
                  </div>
                </div>
                {alerts.noSilence && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <SafeIcon icon={FiAlertTriangle} className="text-red-500" />
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`p-4 rounded-lg border transition-all duration-300 ${getAlertColor(alerts.stressedVoice)}`}
            >
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiVolume2} className={`text-xl ${getAlertIcon(alerts.stressedVoice)}`} />
                <div className="flex-1">
                  <div className="font-medium">Voice Stress</div>
                  <div className="text-sm opacity-75">
                    {alerts.stressedVoice 
                      ? 'Your voice sounds tense. Try to relax and breathe.' 
                      : 'Your voice sounds calm and confident'}
                  </div>
                </div>
                {alerts.stressedVoice && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <SafeIcon icon={FiAlertTriangle} className="text-red-500" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Live Transcript */}
      {transcript && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gray-50 rounded-lg"
        >
          <h4 className="font-semibold text-gray-800 mb-2">Live Transcript:</h4>
          <div className="max-h-32 overflow-y-auto">
            <p className="text-gray-700 text-sm leading-relaxed">{transcript}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SpeechAnalyzer;