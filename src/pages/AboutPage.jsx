import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useLanguage } from '../contexts/LanguageContext';

const { 
  FiChevronDown, 
  FiMic, 
  FiTarget, 
  FiBarChart, 
  FiUsers, 
  FiTrendingUp,
  FiBriefcase,
  FiUser,
  FiHeart,
  FiHome,
  FiBookOpen
} = FiIcons;

const AboutPage = () => {
  const { language } = useLanguage();
  const [selectedPersona, setSelectedPersona] = useState(null);

  const translations = {
    en: {
      hero: {
        title: "Discover How PopSales Can Help You",
        subtitle: "Select your situation to see how PopSales can transform your communication"
      },
      personas: [
        {
          id: 'founder',
          title: "I'm a technical founder who needs to pitch better to my VCs",
          icon: FiBriefcase,
          color: 'blue',
          benefits: [
            "Transform technical jargon into compelling investor language",
            "Track key metrics and market opportunity keywords",
            "Practice your pitch until it flows naturally",
            "Real-time feedback on speaking pace and confidence",
            "Analytics to identify your strongest talking points"
          ],
          features: [
            "Investor-specific keyword tracking",
            "Market opportunity language optimization",
            "Technical concept simplification",
            "Confidence building through practice"
          ]
        },
        {
          id: 'employee',
          title: "I'm a worker who needs to have a presentation soon with my manager",
          icon: FiUser,
          color: 'green',
          benefits: [
            "Build confidence for important workplace presentations",
            "Ensure you hit all key points your manager expects",
            "Practice until your message is clear and professional",
            "Get feedback on your speaking pace and clarity",
            "Track your improvement over multiple practice sessions"
          ],
          features: [
            "Professional presentation structure",
            "Key point tracking and reminders",
            "Speaking confidence building",
            "Performance improvement analytics"
          ]
        },
        {
          id: 'executive',
          title: "I'm an executive who needs to mitigate a crisis with my team",
          icon: FiUsers,
          color: 'red',
          benefits: [
            "Craft clear, calm communication during crisis situations",
            "Ensure critical information is delivered effectively",
            "Practice difficult conversations before they happen",
            "Maintain authority and empathy in your tone",
            "Track emotional stability in your delivery"
          ],
          features: [
            "Crisis communication templates",
            "Emotional tone monitoring",
            "Critical message tracking",
            "Leadership presence optimization"
          ]
        },
        {
          id: 'solopreneur',
          title: "I'm a solopreneur who wants to stay genuine to myself while keeping consistent logic",
          icon: FiTrendingUp,
          color: 'purple',
          benefits: [
            "Maintain your authentic voice while structuring your message",
            "Balance personal storytelling with business logic",
            "Practice until your pitch feels natural and genuine",
            "Track consistency across different presentation contexts",
            "Build confidence without losing your personality"
          ],
          features: [
            "Authenticity preservation tools",
            "Personal brand consistency tracking",
            "Natural flow optimization",
            "Multi-context practice scenarios"
          ]
        },
        {
          id: 'parent',
          title: "I'm a mom who needs to have a difficult conversation with my teenager",
          icon: FiHeart,
          color: 'pink',
          benefits: [
            "Practice sensitive conversations in a safe environment",
            "Find the right words for difficult topics",
            "Balance authority with empathy in your tone",
            "Ensure important messages are heard and understood",
            "Build confidence for challenging parenting moments"
          ],
          features: [
            "Empathetic communication practice",
            "Difficult conversation preparation",
            "Emotional balance monitoring",
            "Parent-child communication optimization"
          ]
        },
        {
          id: 'teacher',
          title: "I'm a teacher who wants to engage my students more effectively",
          icon: FiBookOpen,
          color: 'orange',
          benefits: [
            "Practice lesson delivery for maximum student engagement",
            "Track key educational concepts and learning objectives",
            "Improve your classroom presence and speaking clarity",
            "Adapt your communication style for different age groups",
            "Build confidence in public speaking and instruction"
          ],
          features: [
            "Educational content optimization",
            "Student engagement tracking",
            "Classroom presence building",
            "Age-appropriate communication"
          ]
        }
      ],
      features: {
        title: "Core Features That Power Every Use Case",
        items: [
          {
            icon: FiMic,
            title: "AI-Powered Speech Analysis",
            description: "Real-time feedback on pace, tone, and clarity"
          },
          {
            icon: FiTarget,
            title: "Smart Keyword Tracking",
            description: "Never miss important points in your presentation"
          },
          {
            icon: FiBarChart,
            title: "Performance Analytics",
            description: "Track your improvement over time"
          },
          {
            icon: FiUsers,
            title: "Multi-Language Support",
            description: "Practice in English and French"
          }
        ]
      }
    },
    fr: {
      hero: {
        title: "Découvrez Comment PopSales Peut Vous Aider",
        subtitle: "Sélectionnez votre situation pour voir comment PopSales peut transformer votre communication"
      },
      personas: [
        {
          id: 'founder',
          title: "Je suis un fondateur technique qui doit mieux présenter aux investisseurs",
          icon: FiBriefcase,
          color: 'blue',
          benefits: [
            "Transformer le jargon technique en langage d'investisseur convaincant",
            "Suivre les métriques clés et mots-clés d'opportunité de marché",
            "Pratiquer votre présentation jusqu'à ce qu'elle soit naturelle",
            "Commentaires en temps réel sur le rythme et la confiance",
            "Analyses pour identifier vos points forts"
          ],
          features: [
            "Suivi de mots-clés spécifiques aux investisseurs",
            "Optimisation du langage d'opportunité de marché",
            "Simplification des concepts techniques",
            "Renforcement de la confiance par la pratique"
          ]
        },
        {
          id: 'employee',
          title: "Je suis un employé qui doit faire une présentation prochainement avec mon manager",
          icon: FiUser,
          color: 'green',
          benefits: [
            "Développer la confiance pour les présentations importantes",
            "S'assurer de couvrir tous les points clés attendus",
            "Pratiquer jusqu'à ce que le message soit clair et professionnel",
            "Obtenir des commentaires sur le rythme et la clarté",
            "Suivre l'amélioration sur plusieurs sessions"
          ],
          features: [
            "Structure de présentation professionnelle",
            "Suivi et rappels des points clés",
            "Renforcement de la confiance en expression",
            "Analyses d'amélioration des performances"
          ]
        },
        {
          id: 'executive',
          title: "Je suis un dirigeant qui doit gérer une crise avec mon équipe",
          icon: FiUsers,
          color: 'red',
          benefits: [
            "Créer une communication claire et calme en situation de crise",
            "S'assurer que l'information critique est transmise efficacement",
            "Pratiquer les conversations difficiles avant qu'elles n'arrivent",
            "Maintenir autorité et empathie dans le ton",
            "Suivre la stabilité émotionnelle dans la livraison"
          ],
          features: [
            "Modèles de communication de crise",
            "Surveillance du ton émotionnel",
            "Suivi des messages critiques",
            "Optimisation de la présence de leadership"
          ]
        },
        {
          id: 'solopreneur',
          title: "Je suis un entrepreneur solo qui veut rester authentique tout en gardant une logique cohérente",
          icon: FiTrendingUp,
          color: 'purple',
          benefits: [
            "Maintenir votre voix authentique tout en structurant le message",
            "Équilibrer storytelling personnel et logique business",
            "Pratiquer jusqu'à ce que votre pitch soit naturel et authentique",
            "Suivre la cohérence dans différents contextes",
            "Développer la confiance sans perdre votre personnalité"
          ],
          features: [
            "Outils de préservation de l'authenticité",
            "Suivi de cohérence de marque personnelle",
            "Optimisation du flux naturel",
            "Scénarios de pratique multi-contextes"
          ]
        },
        {
          id: 'parent',
          title: "Je suis une maman qui doit avoir une conversation difficile avec mon adolescent",
          icon: FiHeart,
          color: 'pink',
          benefits: [
            "Pratiquer les conversations sensibles dans un environnement sûr",
            "Trouver les bons mots pour les sujets difficiles",
            "Équilibrer autorité et empathie dans le ton",
            "S'assurer que les messages importants sont entendus",
            "Développer la confiance pour les moments parentaux difficiles"
          ],
          features: [
            "Pratique de communication empathique",
            "Préparation aux conversations difficiles",
            "Surveillance de l'équilibre émotionnel",
            "Optimisation communication parent-enfant"
          ]
        },
        {
          id: 'teacher',
          title: "Je suis un enseignant qui veut engager mes étudiants plus efficacement",
          icon: FiBookOpen,
          color: 'orange',
          benefits: [
            "Pratiquer la livraison de cours pour un engagement maximal",
            "Suivre les concepts éducatifs clés et objectifs d'apprentissage",
            "Améliorer votre présence en classe et clarté d'expression",
            "Adapter votre style de communication pour différents âges",
            "Développer la confiance en prise de parole publique"
          ],
          features: [
            "Optimisation du contenu éducatif",
            "Suivi de l'engagement étudiant",
            "Développement de présence en classe",
            "Communication adaptée à l'âge"
          ]
        }
      ],
      features: {
        title: "Fonctionnalités Principales Qui Alimentent Chaque Cas d'Usage",
        items: [
          {
            icon: FiMic,
            title: "Analyse Vocale Alimentée par IA",
            description: "Commentaires en temps réel sur le rythme, le ton et la clarté"
          },
          {
            icon: FiTarget,
            title: "Suivi Intelligent des Mots-Clés",
            description: "Ne manquez jamais les points importants de votre présentation"
          },
          {
            icon: FiBarChart,
            title: "Analyses de Performance",
            description: "Suivez votre amélioration au fil du temps"
          },
          {
            icon: FiUsers,
            title: "Support Multilingue",
            description: "Pratiquez en anglais et en français"
          }
        ]
      }
    }
  };

  const t = translations[language];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      red: 'from-red-500 to-red-600',
      purple: 'from-purple-500 to-purple-600',
      pink: 'from-pink-500 to-pink-600',
      orange: 'from-orange-500 to-orange-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-5xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t.hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Personas Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {t.personas.map((persona, index) => (
              <motion.div
                key={persona.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.button
                  onClick={() => setSelectedPersona(selectedPersona === persona.id ? null : persona.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${getColorClasses(persona.color)}`}>
                      <SafeIcon icon={persona.icon} className="text-white text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{persona.title}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: selectedPersona === persona.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SafeIcon icon={FiChevronDown} className="text-gray-400" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {selectedPersona === persona.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 bg-gray-50">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">
                              {language === 'en' ? 'How PopSales Helps You:' : 'Comment PopSales Vous Aide :'}
                            </h4>
                            <ul className="space-y-2">
                              {persona.benefits.map((benefit, benefitIndex) => (
                                <li key={benefitIndex} className="flex items-start space-x-2">
                                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-700">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">
                              {language === 'en' ? 'Key Features:' : 'Fonctionnalités Clés :'}
                            </h4>
                            <ul className="space-y-2">
                              {persona.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start space-x-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-700">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
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
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.features.items.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-primary-100 p-4 rounded-lg w-fit mx-auto mb-4">
                  <SafeIcon icon={feature.icon} className="text-3xl text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
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
            {language === 'en' ? 'Ready to Transform Your Communication?' : 'Prêt à Transformer Votre Communication ?'}
          </motion.h2>
          <motion.p
            className="text-xl text-primary-100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            {language === 'en' 
              ? 'Start practicing today and see immediate improvements in your presentations'
              : 'Commencez à pratiquer aujourd\'hui et voyez des améliorations immédiates dans vos présentations'
            }
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <a
              href="/auth"
              className="bg-white text-primary-500 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 text-lg font-semibold"
            >
              <span>{language === 'en' ? 'Start Free Trial' : 'Essai Gratuit'}</span>
              <SafeIcon icon={FiTrendingUp} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;