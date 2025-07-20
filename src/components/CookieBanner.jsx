import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useLanguage } from '../contexts/LanguageContext';
import Cookies from 'js-cookie';

const { FiX, FiShield } = FiIcons;

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = Cookies.get('cookie_consent');
    if (!hasAccepted) {
      setShowBanner(true);
    }
  }, []);

  const translations = {
    en: {
      title: "We value your privacy",
      message: "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking 'Accept All', you consent to our use of cookies.",
      acceptAll: "Accept All",
      acceptNecessary: "Accept Necessary Only",
      customize: "Customize Settings",
      privacyLink: "Privacy Policy"
    },
    fr: {
      title: "Nous respectons votre vie privée",
      message: "Nous utilisons des cookies pour améliorer votre expérience de navigation, diffuser du contenu personnalisé et analyser notre trafic. En cliquant sur 'Tout accepter', vous consentez à notre utilisation des cookies.",
      acceptAll: "Tout accepter",
      acceptNecessary: "Accepter uniquement nécessaires",
      customize: "Personnaliser",
      privacyLink: "Politique de confidentialité"
    }
  };

  const t = translations[language];

  const handleAcceptAll = () => {
    Cookies.set('cookie_consent', 'all', { expires: 365 });
    Cookies.set('analytics_consent', 'true', { expires: 365 });
    Cookies.set('marketing_consent', 'true', { expires: 365 });
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    Cookies.set('cookie_consent', 'necessary', { expires: 365 });
    Cookies.set('analytics_consent', 'false', { expires: 365 });
    Cookies.set('marketing_consent', 'false', { expires: 365 });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 p-2 rounded-lg">
                <SafeIcon icon={FiShield} className="text-primary-500 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.title}</h3>
                <p className="text-gray-600 max-w-2xl">{t.message}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptAll}
                className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                {t.acceptAll}
              </button>
              <button
                onClick={handleAcceptNecessary}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                {t.acceptNecessary}
              </button>
              <a
                href="/privacy"
                className="text-primary-500 hover:text-primary-600 px-6 py-2"
              >
                {t.privacyLink}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieBanner;