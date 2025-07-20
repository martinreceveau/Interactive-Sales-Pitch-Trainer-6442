import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useLanguage } from '../contexts/LanguageContext';

const { FiStar, FiRotateCcw, FiX, FiClock, FiThumbsUp, FiThumbsDown } = FiIcons;

const ResultsModal = ({ spokenKeywords, totalKeywords, onClose, onRestart, practiceTime }) => {
  const { language } = useLanguage();
  const [effectivenessRating, setEffectivenessRating] = useState(null);
  
  const percentage = (spokenKeywords.length / totalKeywords) * 100;

  const translations = {
    en: {
      effectiveness: {
        question: "Did your pitch hit the mark?",
        subtitle: "Was your message clear and compelling?",
        yes: "Yes, it was effective",
        no: "No, needs improvement",
        thanks: "Thanks for your feedback!"
      },
      results: {
        perfect: 'Perfect Pitch! 🎉',
        great: 'Great Job! 👏',
        good: 'Good Start! 👍',
        practice: 'Keep Practicing! 💪',
        perfectMsg: 'You hit all your keywords! Your pitch is on point.',
        greatMsg: 'You covered most of your key points. Well done!',
        goodMsg: 'You got some keywords in. Keep practicing to improve.',
        practiceMsg: 'Focus on incorporating more keywords into your pitch.',
        keywordsHit: 'Keywords Hit:',
        practiceTime: 'Practice Time:',
        tryAgain: 'Try Again',
        done: 'Done'
      }
    },
    fr: {
      effectiveness: {
        question: "Votre présentation a-t-elle atteint son objectif ?",
        subtitle: "Votre message était-il clair et convaincant ?",
        yes: "Oui, c'était efficace",
        no: "Non, à améliorer",
        thanks: "Merci pour vos commentaires !"
      },
      results: {
        perfect: 'Présentation Parfaite ! 🎉',
        great: 'Excellent Travail ! 👏',
        good: 'Bon Début ! 👍',
        practice: 'Continuez à Pratiquer ! 💪',
        perfectMsg: 'Vous avez utilisé tous vos mots-clés ! Votre présentation est parfaite.',
        greatMsg: 'Vous avez couvert la plupart des points clés. Bien joué !',
        goodMsg: 'Vous avez inclus quelques mots-clés. Continuez à pratiquer pour vous améliorer.',
        practiceMsg: 'Concentrez-vous sur l\'incorporation de plus de mots-clés dans votre présentation.',
        keywordsHit: 'Mots-clés Atteints :',
        practiceTime: 'Temps de Pratique :',
        tryAgain: 'Réessayer',
        done: 'Terminé'
      }
    }
  };

  const t = translations[language];

  const getStars = () => {
    if (percentage === 100) return { count: 3, type: 'gold' };
    if (percentage >= 50) return { count: 3, type: 'green' };
    if (percentage >= 25) return { count: 2, type: 'green' };
    return { count: 1, type: 'green' };
  };

  const stars = getStars();

  const getTitle = () => {
    if (percentage === 100) return t.results.perfect;
    if (percentage >= 50) return t.results.great;
    if (percentage >= 25) return t.results.good;
    return t.results.practice;
  };

  const getMessage = () => {
    if (percentage === 100) return t.results.perfectMsg;
    if (percentage >= 50) return t.results.greatMsg;
    if (percentage >= 25) return t.results.goodMsg;
    return t.results.practiceMsg;
  };

  // Format time to minutes:seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <SafeIcon icon={FiX} className="text-xl" />
        </button>

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{getTitle()}</h3>
          <p className="text-gray-600">{getMessage()}</p>
        </div>

        <div className="flex justify-center space-x-2 mb-6">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`text-4xl ${
                index < stars.count
                  ? stars.type === 'gold'
                    ? 'text-gold-500 star-animation'
                    : 'text-success-500 star-animation'
                  : 'text-gray-300'
              }`}
            >
              <SafeIcon icon={FiStar} />
            </motion.div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">{t.results.keywordsHit}</span>
            <span className="font-bold text-lg">
              {spokenKeywords.length} / {totalKeywords}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`h-3 rounded-full ${percentage === 100 ? 'bg-gold-500' : 'bg-success-500'}`}
            />
          </div>
          <div className="text-right mt-1">
            <span className="text-sm font-medium text-gray-700">
              {Math.round(percentage)}%
            </span>
          </div>
        </div>

        {/* Practice time */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiClock} className="text-blue-500" />
              <span className="text-gray-600">{t.results.practiceTime}</span>
            </div>
            <span className="font-bold text-lg text-blue-700">
              {formatTime(practiceTime)}
            </span>
          </div>
        </div>

        {/* Effectiveness Question */}
        {effectivenessRating === null ? (
          <div className="bg-purple-50 rounded-lg p-4 mb-6 border border-purple-200">
            <h4 className="text-lg font-semibold text-purple-800 mb-2">
              {t.effectiveness.question}
            </h4>
            <p className="text-purple-600 text-sm mb-4">{t.effectiveness.subtitle}</p>
            <div className="flex space-x-3 justify-center">
              <motion.button
                onClick={() => setEffectivenessRating('yes')}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiThumbsUp} />
                <span>{t.effectiveness.yes}</span>
              </motion.button>
              <motion.button
                onClick={() => setEffectivenessRating('no')}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiThumbsDown} />
                <span>{t.effectiveness.no}</span>
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200">
            <p className="text-green-700 font-medium">{t.effectiveness.thanks}</p>
          </div>
        )}

        <div className="flex space-x-3">
          <motion.button
            onClick={onRestart}
            className="flex-1 bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiRotateCcw} />
            <span>{t.results.tryAgain}</span>
          </motion.button>
          <motion.button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.results.done}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultsModal;