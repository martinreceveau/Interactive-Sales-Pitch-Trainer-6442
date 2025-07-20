import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PitchProvider } from './contexts/PitchContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import './App.css';

// Production error tracking
const errorHandler = (error, info) => {
  console.error('Application error:', error, info);
  // In a real app, you would send this to a service like Sentry
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/auth" replace />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  // Register service worker for PWA support in production
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').catch(error => {
          console.error('ServiceWorker registration failed:', error);
        });
      });
    }
  }, []);

  return (
    <LanguageProvider>
      <AuthProvider>
        <PitchProvider>
          <Router>
            <div className="min-h-screen">
              <Toaster position="top-right" />
              <Routes>
                <Route path="/" element={
                  <Layout>
                    <LandingPage />
                  </Layout>
                } />
                <Route path="/about" element={
                  <Layout>
                    <AboutPage />
                  </Layout>
                } />
                <Route path="/pricing" element={
                  <Layout>
                    <PricingPage />
                  </Layout>
                } />
                <Route path="/careers" element={
                  <Layout>
                    <CareersPage />
                  </Layout>
                } />
                <Route path="/auth" element={
                  <PublicRoute>
                    <Layout>
                      <AuthPage />
                    </Layout>
                  </PublicRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Router>
        </PitchProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;