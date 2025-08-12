import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import CookieBanner from './components/CookieBanner';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PitchProvider } from './contexts/PitchContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ConfirmEmailPage from './pages/ConfirmEmailPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import LegalNoticePage from './pages/LegalNoticePage';
import ConfidentialityPage from './pages/ConfidentialityPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import TermsPage from './pages/TermsPage';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return user ? children : <Navigate to="/auth" replace />;
};

// Public route component (redirects to dashboard if logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return !user ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen">
            <Toaster position="top-right" />
            <CookieBanner />
            <Routes>
              <Route path="/" element={<Layout><LandingPage /></Layout>} />
              <Route path="/about" element={<Layout><AboutPage /></Layout>} />
              <Route path="/pricing" element={<Layout><PricingPage /></Layout>} />
              <Route path="/careers" element={<Layout><CareersPage /></Layout>} />
              <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
              <Route path="/legal" element={<Layout><LegalNoticePage /></Layout>} />
              <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
              <Route path="/confidentiality" element={<Layout><ConfidentialityPage /></Layout>} />
              <Route path="/cookie-policy" element={<Layout><CookiePolicyPage /></Layout>} />
              <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
              
              <Route path="/auth" element={<PublicRoute><Layout><AuthPage /></Layout></PublicRoute>} />
              <Route path="/reset-password" element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />
              <Route path="/confirm" element={<ConfirmEmailPage />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <PitchProvider>
                    <Dashboard />
                  </PitchProvider>
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;