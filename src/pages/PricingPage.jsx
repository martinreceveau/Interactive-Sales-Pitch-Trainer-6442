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
            'Up to 5 pitches per month',
            'Basic speech analysis',
            'Keyword tracking',
            'English language support',
            'Basic analytics'
          ],
          limitations: [
            'Limited to 5 pitches/month',
            'Basic features only'
          ],
          cta: 'Get Started Free',
          color: 'gray'
        },
        {
          name: 'Pro',
          price: '$29',
          period: 'month',
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
          cta: 'Start Pro Trial',
          color: 'primary',
          popular: true
        },
        {
          name: 'Team',
          price: '$99',
          period: 'month',
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
          cta: 'Contact Sales',
          color: 'purple'
        }
      ],
      faqs: [
        {
          question: 'How does the free plan work?',
          answer: 'The free plan gives you access to all core features with a limit of 5 pitches per month. Perfect for trying out PopSales and seeing how it can improve your presentations.'
        },
        {
          question: 'Can I upgrade or downgrade my plan anytime?',
          answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
        },
        {
          question: 'What languages are supported?',
          answer: 'Currently, we support English and French speech recognition. More languages are coming soon!'
        },
        {
          question: 'Is there a money-back guarantee?',
          answer: 'Yes! We offer a 30-day money-back guarantee on all paid plans. If you\'re not satisfied, we\'ll refund your money.'
        },
        {
          question: 'How accurate is the speech analysis?',
          answer: 'Our AI-powered speech analysis is highly accurate, using advanced algorithms to analyze pace, tone, and stress levels with 95%+ accuracy.'
        }
      ],
      cta: {
        title: "Ready to Get Started?",
        subtitle: "Join thousands of sales professionals improving their pitch game with PopSales",
        button: "Start Free Trial",
        contactSales: "Contact Sales"
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
            'Jusqu\'à 5 présentations par mois',
            'Analyse vocale basique',
            'Suivi des mots-clés',
            'Support en anglais',
            'Analyses basiques'
          ],
          limitations: [
            'Limité à 5 présentations/mois',
            'Fonctionnalités basiques uniquement'
          ],
          cta: 'Démarrer Gratuitement',
          color: 'gray'
        },
        {
          name: 'Pro',
          price: '29€',
          period: 'mois',
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
          cta: 'Essayer Pro',
          color: 'primary',
          popular: true
        },
        {
          name: 'Équipe',
          price: '99€',
          period: 'mois',
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
          cta: 'Contacter Commercial',
          color: 'purple'
        }
      ],
      faqs: [
        {
          question: 'Comment fonctionne le forfait gratuit ?',
          answer: 'Le forfait gratuit vous donne accès à toutes les fonctionnalités de base avec une limite de 5 présentations par mois. Parfait pour essayer PopSales et voir comment il peut améliorer vos présentations.'
        },
        {
          question: 'Puis-je passer à un forfait supérieur ou inférieur à tout moment ?',
          answer: 'Oui ! Vous pouvez passer à un forfait supérieur ou inférieur à tout moment. Les changements seront reflétés dans votre prochain cycle de facturation.'
        },
        {
          question: 'Quelles langues sont prises en charge ?',
          answer: 'Actuellement, nous prenons en charge la reconnaissance vocale en anglais et en français. D\'autres langues arrivent bientôt !'
        },
        {
          question: 'Y a-t-il une garantie de remboursement ?',
          answer: 'Oui ! Nous offrons une garantie de remboursement de 30 jours sur tous les forfaits payants. Si vous n\'êtes pas satisfait, nous vous rembourserons.'
        },
        {
          question: 'Quelle est la précision de l\'analyse vocale ?',
          answer: 'Notre analyse vocale alimentée par l\'IA est très précise, utilisant des algorithmes avancés pour analyser le rythme, le ton et les niveaux de stress avec une précision de plus de 95%.'
        }
      ],
      cta: {
        title: "Prêt à Commencer ?",
        subtitle: "Rejoignez des milliers de professionnels de la vente qui améliorent leurs présentations avec PopSales",
        button: "Essai Gratuit",
        contactSales: "Contacter Commercial"
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
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg border-2 ${
                  plan.popular ? 'border-primary-500 shadow-2xl' : 'border-gray-200'
                } p-8 hover:shadow-xl transition-shadow`}
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
                    <span className="text-gray-600">/{plan.period}</span>
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
                    plan.popular
                      ? `${getColorClasses(plan.color, 'bg')} text-white ${getColorClasses(
                          plan.color,
                          'hover'
                        )}`
                      : `border-2 ${getColorClasses(plan.color, 'border')} ${getColorClasses(
                          plan.color,
                          'text'
                        )} hover:bg-gray-50`
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary-500 transition-colors text-lg font-semibold">
              {t.cta.contactSales}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;