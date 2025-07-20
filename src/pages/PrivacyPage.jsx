import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const PrivacyPage = () => {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: January 2024",
      sections: [
        {
          title: "1. Introduction",
          content: `PopSales ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.`
        },
        {
          title: "2. Information We Collect",
          content: `We collect information that you provide directly to us, including:
          • Account information (name, email, password)
          • Profile information (industry, preferences)
          • Voice recordings during practice sessions
          • Usage data and analytics
          • Technical data (IP address, browser type, device information)`
        },
        {
          title: "3. How We Use Your Information",
          content: `We use the collected information for:
          • Providing and improving our services
          • Personalizing your experience
          • Analyzing usage patterns
          • Communicating with you
          • Ensuring security and preventing fraud`
        },
        {
          title: "4. Cookie Policy",
          content: `We use cookies and similar tracking technologies to:
          • Maintain your preferences
          • Analyze usage patterns
          • Provide personalized content
          • Improve our services
          
          You can control cookie preferences through your browser settings.`
        },
        {
          title: "5. Data Security",
          content: `We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.`
        },
        {
          title: "6. GDPR Compliance",
          content: `For users in the European Union, we comply with GDPR requirements and provide:
          • Right to access your data
          • Right to correct your data
          • Right to delete your data
          • Right to data portability
          • Right to withdraw consent`
        },
        {
          title: "7. Contact Us",
          content: `For privacy-related questions or concerns, contact us at:
          contact@popsales.io`
        }
      ]
    },
    fr: {
      title: "Politique de Confidentialité",
      lastUpdated: "Dernière mise à jour : Janvier 2024",
      sections: [
        {
          title: "1. Introduction",
          content: `PopSales (« nous » ou « notre ») s'engage à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lors de l'utilisation de notre site web et de nos services.`
        },
        {
          title: "2. Informations Collectées",
          content: `Nous collectons les informations que vous nous fournissez directement, notamment :
          • Informations de compte (nom, email, mot de passe)
          • Informations de profil (secteur, préférences)
          • Enregistrements vocaux pendant les sessions de pratique
          • Données d'utilisation et analyses
          • Données techniques (adresse IP, type de navigateur, informations sur l'appareil)`
        },
        {
          title: "3. Utilisation de vos Informations",
          content: `Nous utilisons les informations collectées pour :
          • Fournir et améliorer nos services
          • Personnaliser votre expérience
          • Analyser les modèles d'utilisation
          • Communiquer avec vous
          • Assurer la sécurité et prévenir la fraude`
        },
        {
          title: "4. Politique des Cookies",
          content: `Nous utilisons des cookies et technologies similaires pour :
          • Maintenir vos préférences
          • Analyser les modèles d'utilisation
          • Fournir du contenu personnalisé
          • Améliorer nos services
          
          Vous pouvez contrôler les préférences de cookies via les paramètres de votre navigateur.`
        },
        {
          title: "5. Sécurité des Données",
          content: `Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos informations personnelles. Cependant, aucune méthode de transmission sur Internet n'est 100% sécurisée.`
        },
        {
          title: "6. Conformité RGPD",
          content: `Pour les utilisateurs de l'Union européenne, nous respectons les exigences du RGPD et fournissons :
          • Droit d'accès à vos données
          • Droit de rectification
          • Droit à l'effacement
          • Droit à la portabilité des données
          • Droit de retirer votre consentement`
        },
        {
          title: "7. Nous Contacter",
          content: `Pour toute question relative à la confidentialité, contactez-nous à :
          contact@popsales.io`
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t.title}</h1>
          <p className="text-gray-600 mb-8">{t.lastUpdated}</p>

          <div className="space-y-8">
            {t.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {section.title}
                </h2>
                <div className="text-gray-600 space-y-2 whitespace-pre-line">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;