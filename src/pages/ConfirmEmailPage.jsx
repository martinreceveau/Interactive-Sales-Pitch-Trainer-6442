import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';
import supabase from '../lib/supabase';

const { FiTrendingUp, FiCheckCircle, FiAlertCircle, FiLoader } = FiIcons;

const ConfirmEmailPage = () => {
  const [status, setStatus] = useState('loading'); // loading, success, error
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    en: {
      loading: {
        title: "Verifying Your Email",
        message: "Please wait while we verify your email address..."
      },
      success: {
        title: "Email Verified Successfully",
        message: "Your email has been verified. You can now sign in to your account.",
        button: "Go to Dashboard"
      },
      error: {
        title: "Verification Failed",
        message: "We couldn't verify your email. The link might have expired or is invalid.",
        button: "Go to Login"
      }
    },
    fr: {
      loading: {
        title: "Vérification de Votre Email",
        message: "Veuillez patienter pendant que nous vérifions votre adresse email..."
      },
      success: {
        title: "Email Vérifié avec Succès",
        message: "Votre email a été vérifié. Vous pouvez maintenant vous connecter à votre compte.",
        button: "Aller au Tableau de Bord"
      },
      error: {
        title: "Échec de la Vérification",
        message: "Nous n'avons pas pu vérifier votre email. Le lien a peut-être expiré ou est invalide.",
        button: "Aller à la Connexion"
      }
    }
  };

  const t = translations[language];

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Supabase automatically handles the email verification when the user clicks the link
        // We just need to check if the user is now authenticated
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          setStatus('error');
          return;
        }

        if (session) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        setStatus('error');
      }
    };

    verifyEmail();
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return FiLoader;
      case 'success':
        return FiCheckCircle;
      case 'error':
        return FiAlertCircle;
      default:
        return FiLoader;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'blue';
      case 'success':
        return 'green';
      case 'error':
        return 'red';
      default:
        return 'blue';
    }
  };

  const handleContinue = () => {
    if (status === 'success') {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="bg-primary-500 p-2 rounded-lg">
              <SafeIcon icon={FiTrendingUp} className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">PopSales</h1>
              <p className="text-sm text-gray-600">Pitch better. Speak like you</p>
            </div>
          </Link>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={`bg-${getStatusColor()}-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center`}>
            <SafeIcon 
              icon={getStatusIcon()} 
              className={`text-${getStatusColor()}-500 text-3xl ${status === 'loading' ? 'animate-spin' : ''}`} 
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t[status].title}
          </h2>

          <p className="text-gray-600 mb-8">
            {t[status].message}
          </p>

          {status !== 'loading' && (
            <motion.button
              onClick={handleContinue}
              className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t[status].button}
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ConfirmEmailPage;