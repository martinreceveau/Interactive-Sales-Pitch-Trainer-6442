import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useLanguage } from '../contexts/LanguageContext';

const { FiMic, FiTarget, FiBarChart, FiUsers, FiArrowRight, FiPlay, FiZap, FiX } = FiIcons;

const LandingPage = () => {
  const { language } = useLanguage();
  const [showVideo, setShowVideo] = useState(false);

  const translations = {
    en: {
      // Hero Section
      hero: {
        headline: "Pitch better. Speak like you",
        subheadline: "Transform your sales presentations with real-time AI feedback, keyword tracking, and speech analysis. Close more deals with confidence.",
        startTrial: "Start Free Trial",
        watchDemo: "Watch Demo",
        videoTitle: "See PopSales in Action"
      },
      // Features
      features: {
        title: "Powerful Features for Sales Success",
        subtitle: "Everything you need to deliver compelling sales presentations that convert prospects into customers.",
        items: [
          {
            title: 'AI-Powered Speech Analysis',
            description: 'Get real-time feedback on your speaking pace, pauses, and voice stress levels.'
          },
          {
            title: 'Keyword Tracking',
            description: 'Never miss important talking points with our intelligent keyword tracking system.'
          },
          {
            title: 'Performance Analytics',
            description: 'Track your progress with detailed analytics and improvement suggestions.'
          },
          {
            title: 'Multi-Language Support',
            description: 'Practice your pitches in English and French with native speech recognition.'
          }
        ]
      },
      // CTA Section
      cta: {
        title: "Ready to Transform Your Communication?",
        subtitle: "Start practicing today and see immediate improvements in your presentations",
        button: "Start Free Trial"
      }
    },
    fr: {
      // Hero Section
      hero: {
        headline: "Présentez mieux. Parlez comme vous",
        subheadline: "Transformez vos présentations avec des commentaires IA en temps réel, le suivi de mots-clés et l'analyse vocale. Communiquez avec confiance.",
        startTrial: "Essai Gratuit",
        watchDemo: "Voir la Démo",
        videoTitle: "Découvrez PopSales en Action"
      },
      // Features
      features: {
        title: "Fonctionnalités Puissantes pour le Succès en Communication",
        subtitle: "Tout ce dont vous avez besoin pour créer des présentations convaincantes qui convertissent.",
        items: [
          {
            title: 'Analyse Vocale Alimentée par IA',
            description: 'Obtenez des commentaires en temps réel sur votre rythme d\'élocution, vos pauses et vos niveaux de stress vocal.'
          },
          {
            title: 'Suivi des Mots-Clés',
            description: 'Ne manquez jamais les points importants avec notre système intelligent de suivi des mots-clés.'
          },
          {
            title: 'Analyses de Performance',
            description: 'Suivez vos progrès avec des analyses détaillées et des suggestions d\'amélioration.'
          },
          {
            title: 'Support Multilingue',
            description: 'Pratiquez vos présentations en anglais et en français avec reconnaissance vocale native.'
          }
        ]
      },
      // CTA Section
      cta: {
        title: "Prêt à Transformer Votre Communication ?",
        subtitle: "Commencez à pratiquer aujourd'hui et voyez des améliorations immédiates dans vos présentations",
        button: "Essai Gratuit"
      }
    }
  };

  const t = translations[language];

  // Convert Google Drive link to direct video link
  const videoUrl = "https://drive.google.com/file/d/1CD2jSSAcBlBf-RxWfFU87wLZ0Ne7BhUF/preview";

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {t.hero.headline.split(' ').map((word, index) => (
                  <span
                    key={index}
                    className={index >= 2 ? 'text-primary-500' : ''}
                  >
                    {word}{index < t.hero.headline.split(' ').length - 1 ? ' ' : ''}
                  </span>
                ))}
              </motion.h1>
              
              <motion.p
                className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t.hero.subheadline}
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link
                  to="/auth"
                  className="bg-primary-500 text-white px-8 py-4 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
                >
                  <span>{t.hero.startTrial}</span>
                  <SafeIcon icon={FiArrowRight} />
                </Link>
                
                <button
                  onClick={() => setShowVideo(true)}
                  className="border border-primary-500 text-primary-500 px-8 py-4 rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
                >
                  <SafeIcon icon={FiPlay} />
                  <span>{t.hero.watchDemo}</span>
                </button>
              </motion.div>
            </div>

            {/* Right Column - Video Preview */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative group cursor-pointer"
                     onClick={() => setShowVideo(true)}>
                  {/* Video thumbnail/preview */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20"></div>
                  
                  {/* Play button overlay */}
                  <motion.div
                    className="relative z-10 bg-white rounded-full p-6 shadow-lg group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SafeIcon icon={FiPlay} className="text-primary-500 text-4xl ml-1" />
                  </motion.div>
                  
                  {/* Video preview text */}
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-white font-semibold text-lg drop-shadow-lg">
                      {t.hero.videoTitle}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors"
              >
                <SafeIcon icon={FiX} className="text-xl" />
              </button>
              
              <div className="aspect-video">
                <iframe
                  src={videoUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  title="PopSales Demo Video"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.features.title}
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t.features.subtitle}
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.features.items.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-primary-100 p-3 rounded-lg w-fit mb-4">
                  <SafeIcon
                    icon={[FiMic, FiTarget, FiBarChart, FiUsers][index]}
                    className="text-2xl text-primary-500"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t.cta.title}
          </motion.h2>
          <motion.p
            className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.cta.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to="/auth"
              className="bg-white text-primary-500 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 text-lg font-semibold"
            >
              <span>{t.cta.button}</span>
              <SafeIcon icon={FiZap} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;