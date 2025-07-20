import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { usePitch } from '../contexts/PitchContext';
import { useAuth } from '../contexts/AuthContext';
import ResultsModal from './ResultsModal';
import SpeechAnalyzer from './SpeechAnalyzer';

const { FiMic, FiMicOff, FiArrowLeft, FiAlertCircle, FiEdit3, FiPlus, FiX, FiClock, FiMove, FiZap, FiFlag } = FiIcons;

const PitchPractice = ({ setCurrentView }) => {
  const { currentPitch, setCurrentPitch, incrementPracticeSession, savePitch } = usePitch();
  const { user } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [spokenKeywords, setSpokenKeywords] = useState([]);
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editKeywords, setEditKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [practiceDuration, setPracticeDuration] = useState(currentPitch.duration || 5);
  const [prioritizedKeywords, setPrioritizedKeywords] = useState([]);
  const [practiceTimer, setPracticeTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [speechAnalysisData, setSpeechAnalysisData] = useState({
    volume: 0,
    speechRate: 0,
    pauseDetected: false,
    lastSpeechTime: Date.now()
  });

  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const speechTimeRef = useRef([]);
  const lastWordTimeRef = useRef(0);

  const durationOptions = [
    { value: 1, label: '1 min - Elevator Pitch' },
    { value: 5, label: '5 min - Quick Presentation' },
    { value: 10, label: '10 min - Short Presentation' },
    { value: 15, label: '15 min - Standard Pitch' },
    { value: 30, label: '30 min - Meeting Presentation' },
    { value: 60, label: '60 min - Full Presentation' }
  ];

  useEffect(() => {
    if (currentPitch.keywords) {
      setEditKeywords([...currentPitch.keywords]);
      // Auto-prioritize keywords based on duration
      prioritizeKeywords();
    }
  }, [currentPitch, practiceDuration]);

  // Clear timer when component unmounts
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  const prioritizeKeywords = () => {
    // Include flagged keywords first
    const flaggedKeywords = currentPitch.flaggedKeywords || {};
    const flaggedKeywordsList = currentPitch.keywords.filter(kw => flaggedKeywords[kw]);
    
    // Calculate how many non-flagged keywords we can include based on duration
    const keywordsPerDuration = {
      1: 2,    // 1 min - 2 keywords
      5: 3,    // 5 min - 3 keywords
      10: 5,   // 10 min - 5 keywords
      15: 7,   // 15 min - 5-7 keywords
      30: 10,  // 30 min - 10 keywords
      60: 15   // 60 min - 15 keywords
    };
    
    // Get the target number of keywords for this duration
    const targetKeywords = keywordsPerDuration[practiceDuration] || 3;
    
    // Calculate how many additional (non-flagged) keywords we can include
    const additionalKeywordsNeeded = Math.max(0, targetKeywords - flaggedKeywordsList.length);
    
    // Get non-flagged keywords
    const nonFlaggedKeywords = currentPitch.keywords.filter(kw => !flaggedKeywords[kw]);
    
    // Take only the number we need
    const additionalKeywords = nonFlaggedKeywords.slice(0, additionalKeywordsNeeded);
    
    // Combine flagged and additional keywords while preserving the original order
    const allSelectedKeywords = [...flaggedKeywordsList, ...additionalKeywords];
    const orderedKeywords = currentPitch.keywords.filter(kw => allSelectedKeywords.includes(kw));
    
    setPrioritizedKeywords(orderedKeywords);
  };

  const getActiveKeywords = () => {
    return isEditMode ? editKeywords : prioritizedKeywords;
  };

  const getDurationAdvice = () => {
    const originalDuration = currentPitch.duration || 5;
    const flaggedCount = Object.keys(currentPitch.flaggedKeywords || {}).length;
    const keywordsPerDuration = {
      1: 2,    // 1 min - 2 keywords
      5: 3,    // 5 min - 3 keywords
      10: 5,   // 10 min - 5 keywords
      15: 7,   // 15 min - 5-7 keywords
      30: 10,  // 30 min - 10 keywords
      60: 15   // 60 min - 15 keywords
    };
    
    const targetKeywords = keywordsPerDuration[practiceDuration] || 3;
    const currentKeywordCount = prioritizedKeywords.length;
    
    let message = '';
    let type = 'info';
    
    if (flaggedCount > 0) {
      message = `Including ${flaggedCount} flagged keyword${flaggedCount > 1 ? 's' : ''} plus ${currentKeywordCount - flaggedCount} additional keyword${currentKeywordCount - flaggedCount !== 1 ? 's' : ''} for a ${practiceDuration}-minute pitch.`;
      type = 'success';
    } else if (practiceDuration < originalDuration) {
      message = `Shortened from ${originalDuration} to ${practiceDuration} minutes. Showing ${currentKeywordCount} priority keywords.`;
      type = 'info';
    } else if (practiceDuration > originalDuration) {
      const needed = Math.max(0, targetKeywords - currentPitch.keywords.length);
      message = `Extended to ${practiceDuration} minutes. ${needed > 0 ? `Consider adding ${needed} more keywords.` : 'You have enough keywords.'}`;
      type = 'warning';
    }
    
    const colors = {
      info: 'bg-blue-50 border-blue-200 text-blue-700',
      warning: 'bg-orange-50 border-orange-200 text-orange-700',
      success: 'bg-green-50 border-green-200 text-green-700'
    };
    
    return message ? { type, message, color: colors[type] } : null;
  };

  const advice = getDurationAdvice();

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = currentPitch.language || 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setTranscript(prev => prev + ' ' + finalTranscript);
        checkForKeywords(finalTranscript);
        analyzeSpeechPattern(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognition) {
        recognition.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [currentPitch.language]);

  const startAudioAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      microphoneRef.current.connect(analyserRef.current);

      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const analyze = () => {
        if (!isRecording) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        const volume = dataArray.reduce((a, b) => a + b) / bufferLength;
        setSpeechAnalysisData(prev => ({
          ...prev,
          volume: volume,
          lastSpeechTime: Date.now()
        }));
        requestAnimationFrame(analyze);
      };

      analyze();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const analyzeSpeechPattern = (text) => {
    const currentTime = Date.now();
    const wordCount = text.split(' ').length;

    if (lastWordTimeRef.current > 0) {
      const timeDiff = (currentTime - lastWordTimeRef.current) / 1000;
      const wordsPerSecond = wordCount / timeDiff;
      const wordsPerMinute = wordsPerSecond * 60;

      setSpeechAnalysisData(prev => ({
        ...prev,
        speechRate: wordsPerMinute
      }));
    }

    lastWordTimeRef.current = currentTime;
    speechTimeRef.current.push(currentTime);
    if (speechTimeRef.current.length > 10) {
      speechTimeRef.current.shift();
    }
  };

  const checkForKeywords = (text) => {
    const lowerText = text.toLowerCase();
    const activeKeywords = getActiveKeywords();
    
    activeKeywords.forEach((keyword, index) => {
      if (lowerText.includes(keyword.toLowerCase()) && !spokenKeywords.includes(index)) {
        setSpokenKeywords(prev => [...prev, index]);
        if (index === currentKeywordIndex) {
          setCurrentKeywordIndex(prev => prev + 1);
        }
      }
    });
  };

  const startRecording = () => {
    if (!isSupported || !recognitionRef.current) return;
    setIsRecording(true);
    setSpokenKeywords([]);
    setCurrentKeywordIndex(0);
    setTranscript('');
    setPracticeTimer(0);
    speechTimeRef.current = [];
    lastWordTimeRef.current = 0;
    recognitionRef.current.start();
    startAudioAnalysis();
    
    // Start timer
    const interval = setInterval(() => {
      setPracticeTimer(prev => prev + 1);
    }, 1000);
    setTimerInterval(interval);
  };

  const stopRecording = () => {
    if (!recognitionRef.current) return;
    setIsRecording(false);
    recognitionRef.current.stop();
    
    // Stop timer
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    incrementPracticeSession();
    setShowResults(true);
  };

  const handleEditKeywords = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      setEditKeywords([...getActiveKeywords()]);
    }
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !editKeywords.includes(newKeyword.trim())) {
      setEditKeywords([...editKeywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (index) => {
    setEditKeywords(editKeywords.filter((_, i) => i !== index));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(editKeywords);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setEditKeywords(items);
  };

  const saveEditedKeywords = () => {
    const updatedPitch = {
      ...currentPitch,
      keywords: editKeywords,
      duration: practiceDuration
    };
    setCurrentPitch(updatedPitch);
    savePitch(updatedPitch);
    setIsEditMode(false);
    prioritizeKeywords();
  };

  const getVisibleKeywords = () => {
    const activeKeywords = getActiveKeywords();
    const maxVisible = 4;
    const startIndex = Math.max(0, currentKeywordIndex - 1);
    const endIndex = Math.min(startIndex + maxVisible, activeKeywords.length);
    
    return activeKeywords.slice(startIndex, endIndex).map((keyword, index) => ({
      keyword,
      originalIndex: startIndex + index,
      displayIndex: index,
      isFlagged: currentPitch.flaggedKeywords && currentPitch.flaggedKeywords[keyword]
    }));
  };

  const getKeywordStatus = (originalIndex) => {
    if (spokenKeywords.includes(originalIndex)) {
      return originalIndex === currentKeywordIndex - 1 || spokenKeywords.indexOf(originalIndex) === spokenKeywords.length - 1
        ? 'spoken'
        : 'spoken-out-of-order';
    }
    return originalIndex === currentKeywordIndex ? 'current' : 'pending';
  };

  const getKeywordColor = (status, isFlagged) => {
    const baseColors = {
      'spoken': 'bg-success-500 text-white',
      'spoken-out-of-order': 'bg-warning-500 text-white',
      'current': 'bg-primary-500 text-white animate-pulse',
      'default': 'bg-gray-200 text-gray-700'
    };
    
    // If flagged, add a border
    if (isFlagged) {
      return `${baseColors[status] || baseColors.default} border-2 border-red-500`;
    }
    
    return baseColors[status] || baseColors.default;
  };

  // Format timer display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (!currentPitch.title || currentPitch.keywords.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <SafeIcon icon={FiAlertCircle} className="text-6xl text-warning-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Pitch Available</h3>
          <p className="text-gray-600 mb-6">Please create a pitch first before practicing.</p>
          <motion.button
            onClick={() => setCurrentView('editor')}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Pitch
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!isSupported) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <SafeIcon icon={FiAlertCircle} className="text-6xl text-warning-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Speech Recognition Not Supported</h3>
          <p className="text-gray-600 mb-6">Your browser doesn't support speech recognition. Please use Chrome, Safari, or Edge.</p>
        </motion.div>
      </div>
    );
  }

  const visibleKeywords = getVisibleKeywords();
  const activeKeywords = getActiveKeywords();
  const flaggedCount = Object.keys(currentPitch.flaggedKeywords || {}).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{currentPitch.title}</h2>
            <p className="text-gray-600">Practice your pitch and hit the keywords in order</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiClock} className="text-gray-500" />
              <select
                value={practiceDuration}
                onChange={(e) => setPracticeDuration(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {durationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <motion.button
              onClick={handleEditKeywords}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                isEditMode ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={isEditMode ? FiZap : FiEdit3} />
              <span>{isEditMode ? 'Save Changes' : 'Edit Keywords'}</span>
            </motion.button>
            <motion.button
              onClick={() => setCurrentView('editor')}
              className="text-gray-600 hover:text-primary-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiArrowLeft} className="text-xl" />
            </motion.button>
          </div>
        </div>
        
        {/* Duration Advice */}
        {advice && (
          <div className={`mt-4 p-3 rounded-lg border ${advice.color}`}>
            <p className="text-sm">{advice.message}</p>
          </div>
        )}
        
        {/* Flagged Keywords Info */}
        {flaggedCount > 0 && (
          <div className="mt-4 p-3 rounded-lg border bg-yellow-50 border-yellow-200 text-yellow-800">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiFlag} className="text-red-500" />
              <p className="text-sm">
                {flaggedCount} essential keyword{flaggedCount > 1 ? 's' : ''} will always be included in your pitch.
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Keywords Column */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Keywords {isEditMode ? 'Editor' : 'Progress'}
            </h3>
            {isEditMode ? (
              <div className="space-y-4">
                {/* Add New Keyword */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                    placeholder="Add keyword..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={addKeyword}
                    className="bg-primary-500 text-white px-3 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    <SafeIcon icon={FiPlus} />
                  </button>
                </div>

                {/* Draggable Keywords */}
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="edit-keywords">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2"
                      >
                        {editKeywords.map((keyword, index) => (
                          <Draggable key={`edit-${keyword}-${index}`} draggableId={`edit-${keyword}-${index}`} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-gray-100 p-3 rounded-lg flex items-center justify-between text-sm ${
                                  snapshot.isDragging ? 'shadow-lg' : ''
                                } ${currentPitch.flaggedKeywords && currentPitch.flaggedKeywords[keyword] ? 'border-2 border-red-500' : ''}`}
                              >
                                <div className="flex items-center space-x-2">
                                  <SafeIcon icon={FiMove} className="text-gray-400 cursor-grab" />
                                  <span>#{index + 1}</span>
                                  <span>{keyword}</span>
                                  {currentPitch.flaggedKeywords && currentPitch.flaggedKeywords[keyword] && (
                                    <SafeIcon icon={FiFlag} className="text-red-500" />
                                  )}
                                </div>
                                <button
                                  onClick={() => removeKeyword(index)}
                                  className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                  <SafeIcon icon={FiX} />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                <button
                  onClick={saveEditedKeywords}
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence mode="wait">
                  {visibleKeywords.map((item, index) => {
                    const status = getKeywordStatus(item.originalIndex);
                    return (
                      <motion.div
                        key={item.originalIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className={`p-4 rounded-lg text-center font-medium transition-all duration-300 ${getKeywordColor(status, item.isFlagged)}`}
                      >
                        <div className="text-sm opacity-75">#{item.originalIndex + 1}</div>
                        <div className="text-lg flex items-center justify-center space-x-1">
                          <span>{item.keyword}</span>
                          {item.isFlagged && <SafeIcon icon={FiFlag} className="text-red-300" />}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                {currentKeywordIndex < activeKeywords.length && (
                  <div className="text-center text-sm text-gray-500 mt-4">
                    {activeKeywords.length - currentKeywordIndex} keywords remaining
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Recording Controls */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-6 h-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recording Controls</h3>
            <div className="text-center mb-6">
              <motion.button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isEditMode}
                className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl transition-all duration-300 ${
                  isEditMode
                    ? 'bg-gray-400 cursor-not-allowed'
                    : isRecording
                    ? 'bg-red-500 hover:bg-red-600 recording-pulse'
                    : 'bg-primary-500 hover:bg-primary-600'
                }`}
                whileHover={!isEditMode ? { scale: 1.1 } : {}}
                whileTap={!isEditMode ? { scale: 0.9 } : {}}
              >
                <SafeIcon icon={isRecording ? FiMicOff : FiMic} />
              </motion.button>
              <p className="mt-4 text-sm text-gray-600">
                {isEditMode
                  ? 'Finish editing to start recording'
                  : isRecording
                  ? 'Recording... Click to stop'
                  : 'Click to start recording'}
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress:</span>
                <span className="font-semibold">
                  {spokenKeywords.length} / {activeKeywords.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(spokenKeywords.length / activeKeywords.length) * 100}%` }}
                />
              </div>

              {/* Timer display */}
              <div className="flex justify-between text-sm mt-4">
                <span className="text-gray-600">Time:</span>
                <span className="font-semibold">
                  {formatTime(practiceTimer)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Speech Analysis */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <SpeechAnalyzer
              isRecording={isRecording}
              analysisData={speechAnalysisData}
              transcript={transcript}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showResults && (
          <ResultsModal
            spokenKeywords={spokenKeywords}
            totalKeywords={activeKeywords.length}
            onClose={() => setShowResults(false)}
            onRestart={() => {
              setShowResults(false);
              setSpokenKeywords([]);
              setCurrentKeywordIndex(0);
              setTranscript('');
              setPracticeTimer(0);
            }}
            practiceTime={practiceTimer}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PitchPractice;