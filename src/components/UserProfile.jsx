import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';
import { usePitch } from '../contexts/PitchContext';
import { useLanguage } from '../contexts/LanguageContext';

const { FiUser, FiMail, FiCalendar, FiTrendingUp, FiMic, FiSave, FiAward, FiTarget } = FiIcons;

const UserProfile = ({ setCurrentView }) => {
  const { user } = useAuth();
  const { savedPitches } = usePitch();
  const { language } = useLanguage();

  const translations = {
    en: {
      plan: "Plan",
      joined: "Joined",
      pitchesCreated: "Pitches Created",
      practiceSessions: "Practice Sessions",
      improvementRate: "Improvement Rate",
      successScore: "Success Score",
      achievements: "Achievements",
      firstPitch: {
        title: "First Pitch",
        description: "Created your first sales pitch"
      },
      practiceMaster: {
        title: "Practice Master",
        description: "Completed 10 practice sessions"
      },
      improvementStreak: {
        title: "Improvement Streak",
        description: "Improved for 5 consecutive sessions"
      },
      quickActions: "Quick Actions",
      createNewPitch: "Create New Pitch",
      startPractice: "Start Practice",
      viewSavedPitches: "View Saved Pitches"
    },
    fr: {
      plan: "Forfait",
      joined: "Inscrit en",
      pitchesCreated: "Présentations Créées",
      practiceSessions: "Sessions de Pratique",
      improvementRate: "Taux d'Amélioration",
      successScore: "Score de Succès",
      achievements: "Réalisations",
      firstPitch: {
        title: "Première Présentation",
        description: "Créé votre première présentation commerciale"
      },
      practiceMaster: {
        title: "Maître de la Pratique",
        description: "Complété 10 sessions de pratique"
      },
      improvementStreak: {
        title: "Série d'Améliorations",
        description: "Amélioré pendant 5 sessions consécutives"
      },
      quickActions: "Actions Rapides",
      createNewPitch: "Créer Nouvelle Présentation",
      startPractice: "Commencer la Pratique",
      viewSavedPitches: "Voir les Présentations Sauvegardées"
    }
  };

  const t = translations[language];

  const stats = [
    { icon: FiSave, label: t.pitchesCreated, value: savedPitches.length, color: 'bg-blue-500' },
    { icon: FiMic, label: t.practiceSessions, value: user?.practicesSessions || 0, color: 'bg-green-500' },
    { icon: FiTrendingUp, label: t.improvementRate, value: '85%', color: 'bg-purple-500' },
    { icon: FiTarget, label: t.successScore, value: '4.8/5', color: 'bg-orange-500' }
  ];

  const achievements = [
    {
      icon: FiAward,
      title: t.firstPitch.title,
      description: t.firstPitch.description,
      earned: savedPitches.length > 0,
      date: savedPitches.length > 0 ? savedPitches[0].createdAt : null
    },
    {
      icon: FiMic,
      title: t.practiceMaster.title,
      description: t.practiceMaster.description,
      earned: (user?.practicesSessions || 0) >= 10,
      date: null
    },
    {
      icon: FiTrendingUp,
      title: t.improvementStreak.title,
      description: t.improvementStreak.description,
      earned: false,
      date: null
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center">
            <SafeIcon icon={FiUser} className="text-white text-3xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{user?.fullName || 'User'}</h2>
            <div className="flex items-center space-x-4 text-gray-600 mt-2">
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiMail} className="text-sm" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiCalendar} className="text-sm" />
                <span>{t.joined} {format(new Date(user?.createdAt || new Date()), 'MMM yyyy')}</span>
              </div>
            </div>
            <div className="mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {user?.plan || 'Free'} {t.plan}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <SafeIcon icon={stat.icon} className="text-white text-xl" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.achievements}</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-xl border-2 ${
                  achievement.earned ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    achievement.earned ? 'bg-green-500' : 'bg-gray-400'
                  }`}>
                    <SafeIcon icon={achievement.icon} className="text-white text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                    {achievement.earned && achievement.date && (
                      <p className="text-xs text-gray-500">
                        {format(new Date(achievement.date), 'MMM d, yyyy')}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.quickActions}</h3>
          <div className="flex flex-wrap gap-4">
            <motion.button
              onClick={() => setCurrentView('editor')}
              className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiTrendingUp} />
              <span>{t.createNewPitch}</span>
            </motion.button>

            <motion.button
              onClick={() => setCurrentView('practice')}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiMic} />
              <span>{t.startPractice}</span>
            </motion.button>

            <motion.button
              onClick={() => setCurrentView('saved')}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiSave} />
              <span>{t.viewSavedPitches}</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;