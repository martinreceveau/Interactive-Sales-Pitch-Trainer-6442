import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useLanguage } from '../contexts/LanguageContext';

const { FiMic, FiTarget, FiBarChart, FiUsers, FiStar, FiArrowRight, FiPlay, FiZap } = FiIcons;

const LandingPage = () => {
  const { language } = useLanguage();

  const translations = {
    en: {
      // Hero Section
      hero: {
        headline: "Pitch better. Speak like you",
        subheadline: "Transform your sales presentations with real-time AI feedback, keyword tracking, and speech analysis. Close more deals with confidence.",
        startTrial: "Start Free Trial",
        watchDemo: "Watch Demo"
      },
      // Stats
      stats: [
        { number: '10,000+', label: 'Sales Professionals' },
        { number: '50,000+', label: 'Pitches Practiced' },
        { number: '95%', label: 'Success Rate' },
        { number: '24/7', label: 'Available' }
      ],
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
      // Testimonials
      testimonials: {
        title: "Loved by Sales Professionals",
        subtitle: "See what our users are saying about PopSales",
        items: [
          {
            name: 'Sarah Johnson',
            role: 'Sales Director',
            company: 'TechCorp',
            content: 'PopSales transformed how I prepare for client presentations. The real-time feedback is invaluable.',
            rating: 5
          },
          {
            name: 'Michael Chen',
            role: 'Account Manager',
            company: 'GrowthCo',
            content: 'I\'ve closed 40% more deals since using PopSales. The keyword tracking keeps me focused.',
            rating: 5
          },
          {
            name: 'Emma Rodriguez',
            role: 'Business Development',
            company: 'InnovateLab',
            content: 'The speech analysis helped me overcome my presentation anxiety. Highly recommended!',
            rating: 5
          }
        ]
      },
      // CTA Section
      cta: {
        title: "Ready to Transform Your Sales Game?",
        subtitle: "Join thousands of sales professionals who are already using PopSales to close more deals.",
        button: "Get Started Free"
      }
    },
    fr: {
      // Hero Section
      hero: {
        headline: "Présentez mieux. Parlez comme vous",
        subheadline: "Transformez vos présentations commerciales avec des commentaires IA en temps réel, le suivi de mots-clés et l'analyse vocale. Concluez plus d'affaires avec confiance.",
        startTrial: "Essai Gratuit",
        watchDemo: "Voir la Démo"
      },
      // Stats
      stats: [
        { number: '10 000+', label: 'Professionnels de la Vente' },
        { number: '50 000+', label: 'Présentations Pratiquées' },
        { number: '95%', label: 'Taux de Réussite' },
        { number: '24/7', label: 'Disponible' }
      ],
      // Features
      features: {
        title: "Fonctionnalités Puissantes pour le Succès Commercial",
        subtitle: "Tout ce dont vous avez besoin pour créer des présentations commerciales convaincantes qui convertissent les prospects en clients.",
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
      // Testimonials
      testimonials: {
        title: "Apprécié par les Professionnels de la Vente",
        subtitle: "Découvrez ce que nos utilisateurs disent de PopSales",
        items: [
          {
            name: 'Sarah Johnson',
            role: 'Directrice des Ventes',
            company: 'TechCorp',
            content: 'PopSales a transformé ma façon de préparer les présentations clients. Les commentaires en temps réel sont inestimables.',
            rating: 5
          },
          {
            name: 'Michael Chen',
            role: 'Gestionnaire de Comptes',
            company: 'GrowthCo',
            content: 'J\'ai conclu 40% plus d\'affaires depuis que j\'utilise PopSales. Le suivi des mots-clés me garde concentré.',
            rating: 5
          },
          {
            name: 'Emma Rodriguez',
            role: 'Développement Commercial',
            company: 'InnovateLab',
            content: 'L\'analyse vocale m\'a aidée à surmonter mon anxiété de présentation. Hautement recommandé !',
            rating: 5
          }
        ]
      },
      // CTA Section
      cta: {
        title: "Prêt à Transformer Votre Jeu Commercial ?",
        subtitle: "Rejoignez des milliers de professionnels de la vente qui utilisent déjà PopSales pour conclure plus d'affaires.",
        button: "Commencer Gratuitement"
      }
    }
  };

  const t = translations[language];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t.hero.headline.split(' ').map((word, index) => (
                <span key={index} className={index >= 2 ? 'text-primary-500' : ''}>
                  {word}{index < t.hero.headline.split(' ').length - 1 ? ' ' : ''}
                </span>
              ))}
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t.hero.subheadline}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
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
              <button className="border border-primary-500 text-primary-500 px-8 py-4 rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold">
                <SafeIcon icon={FiPlay} />
                <span>{t.hero.watchDemo}</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
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
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-primary-100 p-3 rounded-lg w-fit mb-4">
                  <SafeIcon icon={[FiMic, FiTarget, FiBarChart, FiUsers][index]} className="text-2xl text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.testimonials.title}
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t.testimonials.subtitle}
            </motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.items.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <SafeIcon key={i} icon={FiStar} className="text-yellow-400 text-lg" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</div>
                </div>
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