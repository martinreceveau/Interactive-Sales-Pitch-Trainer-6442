import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const { FiTrendingUp } = FiIcons;

const Layout = ({ children }) => {
  const location = useLocation();
  const { language } = useLanguage();
  const { user } = useAuth();
  const isDashboard = location.pathname === '/dashboard';

  const translations = {
    en: {
      tagline: "Pitch better. Speak like you",
      nav: {
        home: "Home",
        about: "About",
        features: "Features",
        pricing: "Pricing",
        careers: "Careers",
        signIn: "Sign In",
        getStarted: "Get Started Free"
      },
      footer: {
        description: "Empowering professionals with AI-driven communication coaching and real-time feedback.",
        sections: {
          product: {
            title: "Product",
            links: [
              { name: "Pricing", path: "/pricing" },
              { name: "Features", path: "/about" },
              { name: "Demo", path: "#" }
            ]
          },
          company: {
            title: "Company",
            links: [
              { name: "About", path: "/about" },
              { name: "Blog", path: "#" },
              { name: "Careers", path: "/careers" }
            ]
          },
          support: {
            title: "Support",
            links: [
              { name: "Help Center", path: "#" },
              { name: "Contact", path: "/contact" },
              { name: "Privacy", path: "/privacy" }
            ]
          },
          legal: {
            title: "Legal",
            links: [
              { name: "Privacy Policy", path: "/privacy" },
              { name: "Terms of Service", path: "/terms" },
              { name: "Cookie Policy", path: "/cookie-policy" },
              { name: "GDPR", path: "/confidentiality" },
              { name: "Legal Notice", path: "/legal" }
            ]
          }
        },
        copyright: "© 2025 PopSales. All rights reserved."
      }
    },
    fr: {
      tagline: "Présentez mieux. Parlez comme vous",
      nav: {
        home: "Accueil",
        about: "À Propos",
        features: "Fonctionnalités",
        pricing: "Tarifs",
        careers: "Carrières",
        signIn: "Connexion",
        getStarted: "Commencer Gratuitement"
      },
      footer: {
        description: "Responsabiliser les professionnels avec un coaching de communication alimenté par IA et des commentaires en temps réel.",
        sections: {
          product: {
            title: "Produit",
            links: [
              { name: "Tarifs", path: "/pricing" },
              { name: "Fonctionnalités", path: "/about" },
              { name: "Démo", path: "#" }
            ]
          },
          company: {
            title: "Entreprise",
            links: [
              { name: "À Propos", path: "/about" },
              { name: "Blog", path: "#" },
              { name: "Carrières", path: "/careers" }
            ]
          },
          support: {
            title: "Support",
            links: [
              { name: "Centre d'Aide", path: "#" },
              { name: "Contact", path: "/contact" },
              { name: "Confidentialité", path: "/privacy" }
            ]
          },
          legal: {
            title: "Légal",
            links: [
              { name: "Politique de Confidentialité", path: "/privacy" },
              { name: "Conditions d'Utilisation", path: "/terms" },
              { name: "Politique de Cookies", path: "/cookie-policy" },
              { name: "RGPD", path: "/confidentiality" },
              { name: "Mentions Légales", path: "/legal" }
            ]
          }
        },
        copyright: "© 2025 PopSales. Tous droits réservés."
      }
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Only show for non-dashboard pages */}
      {!isDashboard && (
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Link to="/" className="flex items-center space-x-3">
                  <div className="bg-primary-500 p-2 rounded-lg">
                    <SafeIcon icon={FiTrendingUp} className="text-white text-2xl" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">PopSales</h1>
                    <p className="text-sm text-gray-600">{t.tagline}</p>
                  </div>
                </Link>
              </motion.div>

              <nav className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                  {t.nav.home}
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
                  {t.nav.about}
                </Link>
                <Link to="/pricing" className="text-gray-700 hover:text-primary-600 transition-colors">
                  {t.nav.pricing}
                </Link>
                <Link to="/careers" className="text-gray-700 hover:text-primary-600 transition-colors">
                  {t.nav.careers}
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Contact
                </Link>
                {!user && (
                  <Link to="/auth" className="text-gray-700 hover:text-primary-600 transition-colors">
                    {t.nav.signIn}
                  </Link>
                )}
                <LanguageSwitcher />
                <Link
                  to={user ? "/dashboard" : "/auth"}
                  className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  {user ? "Dashboard" : t.nav.getStarted}
                </Link>
              </nav>

              <div className="md:hidden flex items-center space-x-3">
                <LanguageSwitcher />
                <Link
                  to={user ? "/dashboard" : "/auth"}
                  className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  {user ? "Dashboard" : t.nav.getStarted}
                </Link>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer - Show for all pages */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-primary-500 p-2 rounded-lg">
                  <SafeIcon icon={FiTrendingUp} className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">PopSales</h3>
                  <p className="text-sm text-gray-400">{t.tagline}</p>
                </div>
              </div>
              <p className="text-gray-400">
                {t.footer.description}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.footer.sections.product.title}</h4>
              <ul className="space-y-2 text-gray-400">
                {t.footer.sections.product.links.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.footer.sections.company.title}</h4>
              <ul className="space-y-2 text-gray-400">
                {t.footer.sections.company.links.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.footer.sections.legal.title}</h4>
              <ul className="space-y-2 text-gray-400">
                {t.footer.sections.legal.links.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;