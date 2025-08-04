import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useLanguage } from '../contexts/LanguageContext';

const { FiCheck, FiArrowRight, FiStar } = FiIcons;

const PricingPage = () => {
  const { language } = useLanguage();

  const translations = {
    en: {
      hero: {
        title: "Simple, Transparent Pricing",
        subtitle: "Choose the perfect plan for your sales training needs. Start free, upgrade when you're ready."
      },
      plans: [
        {
          name: 'Free',
          price: '$0',
          period: 'forever',
          description: 'Perfect for getting started',
          features: [
            'Unlimited pitches, for now!',
            'Basic speech analysis',
            'Keyword tracking',
            'English language support',
            'Basic analytics'
          ],
          limitations: [],
          cta: 'Get Started Free',
          color: 'gray'
        },
        {
          name: 'Pro',
          price: 'Coming Soon',
          period: '',
          description: 'For serious sales professionals',
          features: [
            'Unlimited pitches',
            'Advanced AI speech analysis',
            'Real-time voice stress detection',
            'Multi-language support (EN/FR)',
            'Advanced analytics & insights',
            'Export performance reports',
            'Priority support'
          ],
          limitations: [],
          cta: 'Not Available Yet',
          color: 'primary',
          popular: true,
          disabled: true
        },
        {
          name: 'Team',
          price: 'Coming Soon',
          period: '',
          description: 'For sales teams and organizations',
          features: [
            'Everything in Pro',
            'Up to 10 team members',
            'Team analytics dashboard',
            'Custom branding',
            'Team leaderboards',
            'Advanced reporting',
            'Dedicated account manager',
            'Custom integrations'
          ],
          limitations: [],
          cta: 'Not Available Yet',
          color: 'purple',
          disabled: true
        }
      ],
      faqs: [
        {
          question: 'How does the free plan work?',
          answer: 'The free plan gives you access to all core features with unlimited pitches during our beta phase. We\'re collecting feedback to make PopSales even better!'
        },
        {
          question: 'Can I upgrade or downgrade my plan anytime?',
          answer: 'Paid plans are not available yet, but when they launch, you\'ll be able to upgrade or downgrade anytime.'
        },
        {
          question: 'What languages are supported?',
          answer: 'Currently, we support English and French speech recognition. More languages are coming soon!'
        },
        {
          question: 'Is there a money-back guarantee?',
          answer: 'Yes! We\'ll offer a 30-day money-back guarantee on all paid plans once they launch.'
        },
        {
          question: 'How accurate is the speech analysis?',
          answer: 'Our AI-powered speech analysis is highly accurate, using advanced algorithms to analyze pace, tone, and stress levels with 95%+ accuracy.'
        }
      ],
      cta: {
        title: "Ready to Get Started?",
        subtitle: "Join our beta program and help us build a better product",
        button: "Start Free Trial",
        contactSales: "Contact Sales"
      },
      betaNotice: {
        title: "We're in Beta!",
        description: "We're currently in beta and offering all features for free while we gather feedback. Paid plans will be available soon."
      }
    },
    fr: {
      hero: {
        title: "Tarification Simple et Transparente",
        subtitle: "Choisissez le forfait idéal pour vos besoins de formation commerciale. Commencez gratuitement, mettez à niveau quand vous êtes prêt."
      },
      plans: [
        {
          name: 'Gratuit',
          price: '0€',
          period: 'pour toujours',
          description: 'Parfait pour débuter',
          features: [
            'Présentations illimitées, pour l\'instant !',
            'Analyse vocale basique',
            'Suivi des mots-clés',
            'Support en anglais',
            'Analyses basiques'
          ],
          limitations: [],
          cta: 'Démarrer Gratuitement',
          color: 'gray'
        },
        {
          name: 'Pro',
          price: 'Bientôt Disponible',
          period: '',
          description: 'Pour les professionnels de la vente',
          features: [
            'Présentations illimitées',
            'Analyse vocale IA avancée',
            'Détection du stress vocal en temps réel',
            'Support multilingue (EN/FR)',
            'Analyses et insights avancés',
            'Export des rapports de performance',
            'Support prioritaire'
          ],
          limitations: [],
          cta: 'Pas Encore Disponible',
          color: 'primary',
          popular: true,
          disabled: true
        },
        {
          name: 'Équipe',
          price: 'Bientôt Disponible',
          period: '',
          description: 'Pour les équipes commerciales',
          features: [
            'Tout ce qui est inclus dans Pro',
            'Jusqu\'à 10 membres d\'équipe',
            'Tableau de bord d\'analyse d\'équipe',
            'Personnalisation de marque',
            'Classements d\'équipe',
            'Rapports avancés',
            'Gestionnaire de compte dédié',
            'Intégrations personnalisées'
          ],
          limitations: [],
          cta: 'Pas Encore Disponible',
          color: 'purple',
          disabled: true
        }
      ],
      faqs: [
        {
          question: 'Comment fonctionne le forfait gratuit ?',
          answer: 'Le forfait gratuit vous donne accès à toutes les fonctionnalités de base avec des présentations illimitées pendant notre phase bêta. Nous recueillons des commentaires pour améliorer PopSales !'
        },
        {
          question: 'Puis-je passer à un forfait supérieur ou inférieur à tout moment ?',
          answer: 'Les forfaits payants ne sont pas encore disponibles, mais à leur lancement, vous pourrez passer à un forfait supérieur ou inférieur à tout moment.'
        },
        {
          question: 'Quelles langues sont prises en charge ?',
          answer: 'Actuellement, nous prenons en charge la reconnaissance vocale en anglais et en français. D\'autres langues arrivent bientôt !'
        },
        {
          question: 'Y a-t-il une garantie de remboursement ?',
          answer: 'Oui ! Nous offrirons une garantie de remboursement de 30 jours sur tous les forfaits payants une fois qu\'ils seront lancés.'
        },
        {
          question: 'Quelle est la précision de l\'analyse vocale ?',
          answer: 'Notre analyse vocale alimentée par l\'IA est très précise, utilisant des algorithmes avancés pour analyser le rythme, le ton et les niveaux de stress avec une précision de plus de 95%.'
        }
      ],
      cta: {
        title: "Prêt à Commencer ?",
        subtitle: "Rejoignez notre programme bêta et aidez-nous à construire un meilleur produit",
        button: "Essai Gratuit",
        contactSales: "Contacter Commercial"
      },
      betaNotice: {
        title: "Nous sommes en Beta !",
        description: "Nous sommes actuellement en beta et proposons toutes les fonctionnalités gratuitement pendant que nous recueillons des commentaires. Les forfaits payants seront bientôt disponibles."
      }
    }
  };

  const t = translations[language];
  const plans = t.plans;

  const getColorClasses = (color, type = 'bg') => {
    const colors = {
      gray: {
        bg: 'bg-gray-500',
        text: 'text-gray-500',
        border: 'border-gray-500',
        hover: 'hover:bg-gray-600'
      },
      primary: {
        bg: 'bg-primary-500',
        text: 'text-primary-500',
        border: 'border-primary-500',
        hover: 'hover:bg-primary-600'
      },
      purple: {
        bg: 'bg-purple-500',
        text: 'text-purple-500',
        border: 'border-purple-500',
        hover: 'hover:bg-purple-600'
      }
    };
    return colors[color][type];
  };

  return (
    <div>
      {/* Hero Section */}
      <section id="pricing-plans" className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
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

          <motion.div
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-blue-700 mb-2">{t.betaNotice.title}</h2>
            <p className="text-blue-600">{t.betaNotice.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg border-2 ${plan.popular ? 'border-primary-500 shadow-2xl' : 'border-gray-200'} p-8 hover:shadow-xl transition-shadow ${plan.disabled ? 'opacity-60' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <SafeIcon icon={FiStar} className="text-sm" />
                      <span>{language === 'en' ? 'Most Popular' : 'Plus Populaire'}</span>
                    </span>
                  </motion.div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                    {plan.period && <span className="text-gray-600">/{plan.period}</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <SafeIcon icon={FiCheck} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.limitations.length > 0 && (
                  <div className="mb-8">
                    <p className="text-sm text-gray-500 mb-2">
                      {language === 'en' ? 'Limitations:' : 'Limitations:'}
                    </p>
                    <ul className="space-y-1">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="text-sm text-gray-500">
                          • {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <motion.button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.disabled 
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                      : `${plan.popular 
                          ? `${getColorClasses(plan.color, 'bg')} text-white ${getColorClasses(plan.color, 'hover')}`
                          : `border-2 ${getColorClasses(plan.color, 'border')} ${getColorClasses(plan.color, 'text')} hover:bg-gray-50`
                        }`
                  }`}
                  whileHover={!plan.disabled ? { scale: 1.02 } : {}}
                  whileTap={!plan.disabled ? { scale: 0.98 } : {}}
                  disabled={plan.disabled}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {language === 'en' ? 'Frequently Asked Questions' : 'Questions Fréquemment Posées'}
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              {language === 'en' ? 'Everything you need to know about PopSales pricing' : 'Tout ce que vous devez savoir sur les tarifs PopSales'}
            </motion.p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {t.faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 mb-4 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
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
            className="text-xl text-primary-100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.cta.subtitle}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to="/auth"
              className="bg-white text-primary-500 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <span>{t.cta.button}</span>
              <SafeIcon icon={FiArrowRight} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;