import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';

const { FiChevronDown, FiMic, FiTarget, FiBarChart, FiUsers, FiTrendingUp, FiBriefcase, FiUser, FiHeart, FiHome, FiBookOpen, FiScale, FiSend, FiPlay, FiX } = FiIcons;

const AboutPage = () => {
  const { language } = useLanguage();
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [contactForm, setContactForm] = useState({ useCase: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const translations = {
    en: {
      hero: {
        title: "Discover How PopSales Can Help You",
        subtitle: "Select your situation to see how PopSales can transform your communication",
        watchDemo: "Watch Demo",
        videoTitle: "See PopSales in Action"
      },
      personas: [
        {
          id: 'founder',
          title: "I'm a technical founder who needs to pitch better to my VCs",
          icon: FiBriefcase,
          color: 'blue',
          keywords: ['market opportunity', 'scalability', 'revenue model', 'competitive advantage', 'growth metrics'],
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
          keywords: ['project updates', 'key achievements', 'next steps', 'resource needs', 'timeline'],
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
          keywords: ['action plan', 'accountability', 'transparency', 'next steps', 'team unity'],
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
          id: 'sales_rep',
          title: "I'm a sales rep who wants to stay genuine while keeping consistent selling points",
          icon: FiTrendingUp,
          color: 'purple',
          keywords: ['value proposition', 'customer benefits', 'pain points', 'solution fit', 'closing techniques'],
          benefits: [
            "Maintain your authentic voice while structuring your message",
            "Balance personal rapport with business selling points",
            "Practice until your pitch feels natural and genuine",
            "Track consistency across different sales contexts",
            "Build confidence without losing your personality"
          ],
          features: [
            "Authenticity preservation tools",
            "Sales message consistency tracking",
            "Natural flow optimization",
            "Multi-context practice scenarios"
          ]
        },
        {
          id: 'parent',
          title: "I'm a parent who needs to have a difficult conversation with my teenager",
          icon: FiHeart,
          color: 'pink',
          keywords: ['understanding', 'boundaries', 'consequences', 'support', 'expectations'],
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
          keywords: ['learning objectives', 'student engagement', 'clear instructions', 'feedback', 'motivation'],
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
        },
        {
          id: 'negotiator',
          title: "I'm a negotiator who needs to master my key arguments",
          icon: FiScale,
          color: 'indigo',
          keywords: ['leverage points', 'compromise options', 'bottom line', 'mutual benefits', 'closing terms'],
          benefits: [
            "Practice complex negotiation scenarios",
            "Master your key arguments and counterarguments",
            "Track emotional control during high-pressure situations",
            "Ensure you cover all critical negotiation points",
            "Build confidence for high-stakes discussions"
          ],
          features: [
            "Negotiation scenario practice",
            "Argument structure optimization",
            "Pressure situation training",
            "Strategic point tracking"
          ]
        },
        {
          id: 'lawyer',
          title: "I'm a lawyer who wants to perfect my courtroom presentation",
          icon: FiScale,
          color: 'gray',
          keywords: ['opening statement', 'key evidence', 'legal precedent', 'closing argument', 'jury persuasion'],
          benefits: [
            "Practice courtroom presentations with precision",
            "Master the art of legal argumentation",
            "Track persuasive language and tone",
            "Ensure all critical legal points are covered",
            "Build confidence for high-stakes legal presentations"
          ],
          features: [
            "Legal presentation structure",
            "Persuasive language optimization",
            "Courtroom presence building",
            "Evidence presentation tracking"
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
      },
      contact: {
        title: "Have a Specific Use Case?",
        subtitle: "Tell us about your situation and we'll help you get started",
        useCasePlaceholder: "Describe your specific communication challenge...",
        emailPlaceholder: "Your email address",
        submitButton: "Send My Use Case",
        submitting: "Sending...",
        successMessage: "Thank you! We'll get back to you soon with personalized suggestions.",
        errorMessage: "Please fill in both fields"
      }
    },
    fr: {
      hero: {
        title: "Découvrez Comment PopSales Peut Vous Aider",
        subtitle: "Sélectionnez votre situation pour voir comment PopSales peut transformer votre communication",
        watchDemo: "Voir la Démo",
        videoTitle: "Découvrez PopSales en Action"
      },
      personas: [
        {
          id: 'founder',
          title: "Je suis un fondateur technique qui doit mieux présenter aux investisseurs",
          icon: FiBriefcase,
          color: 'blue',
          keywords: ['opportunité de marché', 'évolutivité', 'modèle de revenus', 'avantage concurrentiel', 'métriques de croissance'],
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
          keywords: ['mises à jour projet', 'réalisations clés', 'prochaines étapes', 'besoins ressources', 'calendrier'],
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
          keywords: ['plan d\'action', 'responsabilité', 'transparence', 'prochaines étapes', 'unité équipe'],
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
          id: 'sales_rep',
          title: "Je suis un commercial qui veut rester authentique tout en gardant des arguments de vente cohérents",
          icon: FiTrendingUp,
          color: 'purple',
          keywords: ['proposition de valeur', 'bénéfices client', 'points de douleur', 'adéquation solution', 'techniques de closing'],
          benefits: [
            "Maintenir votre voix authentique tout en structurant le message",
            "Équilibrer rapport personnel et arguments commerciaux",
            "Pratiquer jusqu'à ce que votre pitch soit naturel et authentique",
            "Suivre la cohérence dans différents contextes de vente",
            "Développer la confiance sans perdre votre personnalité"
          ],
          features: [
            "Outils de préservation de l'authenticité",
            "Suivi de cohérence des messages de vente",
            "Optimisation du flux naturel",
            "Scénarios de pratique multi-contextes"
          ]
        },
        {
          id: 'parent',
          title: "Je suis un parent qui doit avoir une conversation difficile avec mon adolescent",
          icon: FiHeart,
          color: 'pink',
          keywords: ['compréhension', 'limites', 'conséquences', 'soutien', 'attentes'],
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
          keywords: ['objectifs d\'apprentissage', 'engagement étudiant', 'instructions claires', 'feedback', 'motivation'],
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
        },
        {
          id: 'negotiator',
          title: "Je suis un négociateur qui doit maîtriser mes arguments clés",
          icon: FiScale,
          color: 'indigo',
          keywords: ['points de levier', 'options de compromis', 'ligne rouge', 'bénéfices mutuels', 'termes de clôture'],
          benefits: [
            "Pratiquer des scénarios de négociation complexes",
            "Maîtriser vos arguments clés et contre-arguments",
            "Suivre le contrôle émotionnel dans les situations de pression",
            "S'assurer de couvrir tous les points critiques de négociation",
            "Développer la confiance pour les discussions à enjeux élevés"
          ],
          features: [
            "Pratique de scénarios de négociation",
            "Optimisation de la structure d'argumentation",
            "Entraînement aux situations de pression",
            "Suivi des points stratégiques"
          ]
        },
        {
          id: 'lawyer',
          title: "Je suis un avocat qui veut perfectionner ma plaidoirie",
          icon: FiScale,
          color: 'gray',
          keywords: ['déclaration d\'ouverture', 'preuves clés', 'précédent juridique', 'plaidoirie finale', 'persuasion du jury'],
          benefits: [
            "Pratiquer les plaidoiries avec précision",
            "Maîtriser l'art de l'argumentation juridique",
            "Suivre le langage persuasif et le ton",
            "S'assurer que tous les points juridiques critiques sont couverts",
            "Développer la confiance pour les plaidoiries à enjeux élevés"
          ],
          features: [
            "Structure de plaidoirie juridique",
            "Optimisation du langage persuasif",
            "Développement de présence au tribunal",
            "Suivi de présentation des preuves"
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
      },
      contact: {
        title: "Vous Avez un Cas d'Usage Spécifique ?",
        subtitle: "Parlez-nous de votre situation et nous vous aiderons à commencer",
        useCasePlaceholder: "Décrivez votre défi de communication spécifique...",
        emailPlaceholder: "Votre adresse email",
        submitButton: "Envoyer Mon Cas d'Usage",
        submitting: "Envoi...",
        successMessage: "Merci ! Nous vous répondrons bientôt avec des suggestions personnalisées.",
        errorMessage: "Veuillez remplir les deux champs"
      }
    }
  };

  const t = translations[language];

  // Direct link to video (public accessible link)
  const videoUrl = "https://drive.google.com/file/d/1CD2jSSAcBlBf-RxWfFU87wLZ0Ne7BhUF/preview";
  // Thumbnail image (optional - could be added if you have one)
  const thumbnailUrl = "https://via.placeholder.com/800x450/e0f2fe/0ea5e9?text=PopSales+Demo";

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      red: 'from-red-500 to-red-600',
      purple: 'from-purple-500 to-purple-600',
      pink: 'from-pink-500 to-pink-600',
      orange: 'from-orange-500 to-orange-600',
      indigo: 'from-indigo-500 to-indigo-600',
      gray: 'from-gray-500 to-gray-600'
    };
    return colors[color] || colors.blue;
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.useCase.trim() || !contactForm.email.trim()) {
      toast.error(t.contact.errorMessage);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Contact form submission:', contactForm);
      toast.success(t.contact.successMessage);
      setContactForm({ useCase: '', email: '' });
    } catch (error) {
      toast.error('Error sending message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t.hero.title}
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {t.hero.subtitle}
              </motion.p>
              
              <motion.div
                className="flex justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={() => setShowVideo(true)}
                  className="bg-primary-500 text-white px-8 py-4 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2 text-lg font-semibold"
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
                <div 
                  className="aspect-video bg-gray-100 flex items-center justify-center relative group cursor-pointer"
                  onClick={() => setShowVideo(true)}
                  style={{
                    backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.2), rgba(168, 85, 247, 0.2)), url(${thumbnailUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
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
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                            <ul className="space-y-2 mb-4">
                              {persona.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start space-x-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-700">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">
                              {language === 'en' ? 'Suggested Keywords:' : 'Mots-clés Suggérés :'}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {persona.keywords.map((keyword, keywordIndex) => (
                                <span
                                  key={keywordIndex}
                                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
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

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                className="text-4xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {t.contact.title}
              </motion.h2>
              <motion.p
                className="text-xl text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                {t.contact.subtitle}
              </motion.p>
            </div>

            <motion.form
              onSubmit={handleContactSubmit}
              className="bg-white rounded-2xl p-8 shadow-lg space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <textarea
                  name="useCase"
                  value={contactForm.useCase}
                  onChange={handleContactChange}
                  placeholder={t.contact.useCasePlaceholder}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  placeholder={t.contact.emailPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>{t.contact.submitting}</span>
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiSend} />
                    <span>{t.contact.submitButton}</span>
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
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
            {language === 'en' ? 'Start practicing today and see immediate improvements in your presentations' : 'Commencez à pratiquer aujourd\'hui et voyez des améliorations immédiates dans vos présentations'}
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