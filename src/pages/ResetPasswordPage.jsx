import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';

const { FiTrendingUp, FiLock, FiEye, FiEyeOff, FiCheckCircle } = FiIcons;

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { updatePassword, loading } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Reset Your Password",
      subtitle: "Enter a new password for your account",
      successTitle: "Password Reset Successfully",
      successMessage: "Your password has been updated. You can now sign in with your new password.",
      form: {
        password: "New Password",
        passwordPlaceholder: "Enter your new password",
        confirmPassword: "Confirm Password",
        confirmPasswordPlaceholder: "Confirm your new password",
        resetButton: "Reset Password",
        resetting: "Resetting...",
        goToLogin: "Go to Login",
        backToDashboard: "Back to Dashboard"
      },
      errors: {
        passwordRequired: "New password is required",
        passwordLength: "Password must be at least 6 characters",
        confirmRequired: "Please confirm your password",
        passwordsNotMatch: "Passwords do not match"
      }
    },
    fr: {
      title: "Réinitialiser Votre Mot de Passe",
      subtitle: "Entrez un nouveau mot de passe pour votre compte",
      successTitle: "Mot de Passe Réinitialisé avec Succès",
      successMessage: "Votre mot de passe a été mis à jour. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
      form: {
        password: "Nouveau Mot de Passe",
        passwordPlaceholder: "Entrez votre nouveau mot de passe",
        confirmPassword: "Confirmer le Mot de Passe",
        confirmPasswordPlaceholder: "Confirmez votre nouveau mot de passe",
        resetButton: "Réinitialiser le Mot de Passe",
        resetting: "Réinitialisation...",
        goToLogin: "Aller à la Connexion",
        backToDashboard: "Retour au Tableau de Bord"
      },
      errors: {
        passwordRequired: "Le nouveau mot de passe est requis",
        passwordLength: "Le mot de passe doit contenir au moins 6 caractères",
        confirmRequired: "Veuillez confirmer votre mot de passe",
        passwordsNotMatch: "Les mots de passe ne correspondent pas"
      }
    }
  };

  const t = translations[language];

  const validateForm = () => {
    const newErrors = {};
    if (!password) {
      newErrors.password = t.errors.passwordRequired;
    } else if (password.length < 6) {
      newErrors.password = t.errors.passwordLength;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = t.errors.confirmRequired;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = t.errors.passwordsNotMatch;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const result = await updatePassword(password);
      if (result.success) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Password update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <SafeIcon icon={FiCheckCircle} className="text-green-500 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.successTitle}</h2>
            <p className="text-gray-600 mb-8">{t.successMessage}</p>
            <div className="flex justify-center">
              <Link
                to="/auth"
                className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
              >
                {t.form.goToLogin}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
          <p className="text-gray-600">{t.subtitle}</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.form.password}
              </label>
              <div className="relative">
                <SafeIcon
                  icon={FiLock}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.form.passwordPlaceholder}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={showPassword ? FiEyeOff : FiEye} />
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.form.confirmPassword}
              </label>
              <div className="relative">
                <SafeIcon
                  icon={FiLock}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t.form.confirmPasswordPlaceholder}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={showConfirmPassword ? FiEyeOff : FiEye} />
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>{t.form.resetting}</span>
                </div>
              ) : (
                t.form.resetButton
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;