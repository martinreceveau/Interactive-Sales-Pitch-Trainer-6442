import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Initialize language from cookies on mount
  useEffect(() => {
    const savedLanguage = Cookies.get('popsales_language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      setLanguage(savedLanguage);
    } else {
      // Set default language and save to cookies
      Cookies.set('popsales_language', 'en', { expires: 365 });
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    if (newLanguage === 'en' || newLanguage === 'fr') {
      setLanguage(newLanguage);
      Cookies.set('popsales_language', newLanguage, { expires: 365 });
      // Also update localStorage for backward compatibility
      localStorage.setItem('appLanguage', newLanguage);
    }
  };

  const value = {
    language,
    changeLanguage,
    isEnglish: language === 'en',
    isFrench: language === 'fr'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};