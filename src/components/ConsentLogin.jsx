import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './SafeIcon';
import { useLanguage } from '../contexts/LanguageContext';

const { FiShield } = FiIcons;

const ConsentLogin = ({ onAccept, onDecline }) => {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Privacy Consent",
      message: "By signing in, you agree to our Privacy Policy and Terms of Service. We'll handle your data according to our privacy guidelines and GDPR requirements.",
      privacyLink: "Privacy Policy",
      termsLink: "Terms of Service",
      accept: "I Agree & Continue",
      decline: "Decline"
    },
    fr: {
      title: "Consentement de Confidentialité",
      message: "En vous connectant, vous acceptez notre Politique de Confidentialité et nos Conditions d'Utilisation. Nous traiterons vos données conformément à nos directives de confidentialité et aux exigences du RGPD.",
      privacyLink: "Politique de Confidentialité",
      termsLink: "Conditions d'Utilisation",
      accept: "J'accepte & Continue",
      decline: "Refuser"
    }
  };

  const t = translations[language];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-primary-100 p-2 rounded-lg">
          <SafeIcon icon={FiShield} className="text-primary-500 text-xl" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{t.title}</h3>
      </div>

      <p className="text-gray-600 mb-4">
        {t.message}
      </p>

      <div className="flex items-center justify-center space-x-4 mb-6">
        <a
          href="/privacy"
          className="text-primary-500 hover:text-primary-600 text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.privacyLink}
        </a>
        <span className="text-gray-300">|</span>
        <a
          href="/terms"
          className="text-primary-500 hover:text-primary-600 text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.termsLink}
        </a>
      </div>

      <div className="flex flex-col space-y-2">
        <button
          onClick={onAccept}
          className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
        >
          {t.accept}
        </button>
        <button
          onClick={onDecline}
          className="text-gray-500 hover:text-gray-600 transition-colors"
        >
          {t.decline}
        </button>
      </div>
    </motion.div>
  );
};

export default ConsentLogin;