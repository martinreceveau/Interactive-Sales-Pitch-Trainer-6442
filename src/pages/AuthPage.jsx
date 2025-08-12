import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';

const { FiTrendingUp, FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiBriefcase } = FiIcons;

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    industry: ''
  });
  const [errors, setErrors] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isSubmittingReset, setIsSubmittingReset] = useState(false);
  
  const { signUp, signIn, resetPassword, loading } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    en: {
      title: {
        signUp: "Create Account",
        signIn: "Welcome Back",
        forgotPassword: "Reset Password"
      },
      subtitle: {
        signUp: "Start your journey to better sales presentations",
        signIn: "Sign in to continue your sales training",
        forgotPassword: "Enter your email to receive a password reset link"
      },
      form: {
        fullName: "Full Name",
        fullNamePlaceholder: "Enter your full name",
        industry: "Industry",
        industryPlaceholder: "Select your industry",
        email: "Email Address",
        emailPlaceholder: "Enter your email",
        password: "Password",
        passwordPlaceholder: "Enter your password",
        signUpButton: "Create Account",
        signInButton: "Sign In",
        resetButton: "Send Reset Link",
        backToLogin: "Back to Login",
        creatingAccount: "Creating Account...",
        signingIn: "Signing In...",
        sendingReset: "Sending...",
        alreadyAccount: "Already have an account?",
        noAccount: "Don't have an account?",
        signUpLink: "Sign Up",
        signInLink: "Sign In",
        forgotPassword: "Forgot password?"
      },
      features: {
        title: "What you'll get:",
        list: [
          "AI-powered speech analysis",
          "Weekly industry news suggestions",
          "Pitch performance tracking",
          "PDF import and keyword extraction"
        ]
      },
      errors: {
        emailRequired: "Email is required",
        emailInvalid: "Email is invalid",
        passwordRequired: "Password is required",
        passwordLength: "Password must be at least 6 characters",
        nameRequired: "Full name is required",
        industryRequired: "Industry is required"
      },
      messages: {
        verificationSent: "Verification email sent to your address.",
        resetSent: "Password reset link sent to your email."
      }
    },
    fr: {
      title: {
        signUp: "Créer un Compte",
        signIn: "Bon Retour",
        forgotPassword: "Réinitialiser le Mot de Passe"
      },
      subtitle: {
        signUp: "Commencez votre parcours vers de meilleures présentations commerciales",
        signIn: "Connectez-vous pour continuer votre formation commerciale",
        forgotPassword: "Entrez votre email pour recevoir un lien de réinitialisation"
      },
      form: {
        fullName: "Nom Complet",
        fullNamePlaceholder: "Entrez votre nom complet",
        industry: "Secteur d'Activité",
        industryPlaceholder: "Sélectionnez votre secteur",
        email: "Adresse Email",
        emailPlaceholder: "Entrez votre email",
        password: "Mot de Passe",
        passwordPlaceholder: "Entrez votre mot de passe",
        signUpButton: "Créer un Compte",
        signInButton: "Se Connecter",
        resetButton: "Envoyer le Lien",
        backToLogin: "Retour à la Connexion",
        creatingAccount: "Création du Compte...",
        signingIn: "Connexion...",
        sendingReset: "Envoi...",
        alreadyAccount: "Vous avez déjà un compte ?",
        noAccount: "Vous n'avez pas de compte ?",
        signUpLink: "S'inscrire",
        signInLink: "Se Connecter",
        forgotPassword: "Mot de passe oublié ?"
      },
      features: {
        title: "Ce que vous obtiendrez :",
        list: [
          "Analyse vocale alimentée par IA",
          "Suggestions d'actualités hebdomadaires",
          "Suivi des performances de présentation",
          "Importation PDF et extraction de mots-clés"
        ]
      },
      errors: {
        emailRequired: "L'email est requis",
        emailInvalid: "L'email est invalide",
        passwordRequired: "Le mot de passe est requis",
        passwordLength: "Le mot de passe doit contenir au moins 6 caractères",
        nameRequired: "Le nom complet est requis",
        industryRequired: "Le secteur d'activité est requis"
      },
      messages: {
        verificationSent: "Email de vérification envoyé à votre adresse.",
        resetSent: "Lien de réinitialisation envoyé à votre email."
      }
    }
  };

  const t = translations[language];

  const industries = {
    en: [
      'Technology & Software',
      'Healthcare & Medical',
      'Finance & Banking',
      'Real Estate',
      'Manufacturing',
      'Retail & E-commerce',
      'Marketing & Advertising',
      'Education',
      'Consulting',
      'Insurance',
      'Automotive',
      'Energy & Utilities',
      'Food & Beverage',
      'Travel & Hospitality',
      'Media & Entertainment',
      'Construction',
      'Telecommunications',
      'Pharmaceutical',
      'Legal Services',
      'Other'
    ],
    fr: [
      'Technologie & Logiciels',
      'Santé & Médical',
      'Finance & Banque',
      'Immobilier',
      'Fabrication',
      'Commerce de Détail & E-commerce',
      'Marketing & Publicité',
      'Éducation',
      'Conseil',
      'Assurance',
      'Automobile',
      'Énergie & Services Publics',
      'Alimentation & Boissons',
      'Voyage & Hôtellerie',
      'Médias & Divertissement',
      'Construction',
      'Télécommunications',
      'Pharmaceutique',
      'Services Juridiques',
      'Autre'
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = t.errors.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.errors.emailInvalid;
    }

    if (!formData.password) {
      newErrors.password = t.errors.passwordRequired;
    } else if (formData.password.length < 6) {
      newErrors.password = t.errors.passwordLength;
    }

    if (isSignUp) {
      if (!formData.fullName) {
        newErrors.fullName = t.errors.nameRequired;
      }
      if (!formData.industry) {
        newErrors.industry = t.errors.industryRequired;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let result;
      if (isSignUp) {
        result = await signUp(formData.email, formData.password, formData.fullName, formData.industry);
        if (result.success) {
          // The email will be sent by Supabase
          toast.success(t.messages.verificationSent);
          navigate('/dashboard');
        }
      } else {
        result = await signIn(formData.email, formData.password);
        if (result.success) {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  const handleSendPasswordReset = async (e) => {
    e.preventDefault();
    if (!resetEmail || !/\S+@\S+\.\S+/.test(resetEmail)) {
      toast.error(t.errors.emailInvalid);
      return;
    }

    setIsSubmittingReset(true);
    try {
      const result = await resetPassword(resetEmail);
      if (result.success) {
        toast.success(t.messages.resetSent);
        setShowForgotPassword(false);
      }
    } catch (error) {
      console.error('Password reset error:', error);
    } finally {
      setIsSubmittingReset(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/" className="inline-flex items-center space-x-3 mb-6">
              <div className="bg-primary-500 p-2 rounded-lg">
                <SafeIcon icon={FiTrendingUp} className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">PopSales</h1>
                <p className="text-sm text-gray-600">Pitch better. Speak like you</p>
              </div>
            </Link>
            <div className="absolute top-4 right-4">
              <LanguageSwitcher variant="buttons" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {t.title.forgotPassword}
            </h2>
            <p className="text-gray-600">
              {t.subtitle.forgotPassword}
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSendPasswordReset} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.form.email}
                </label>
                <div className="relative">
                  <SafeIcon
                    icon={FiMail}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder={t.form.emailPlaceholder}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 border-gray-300"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <motion.button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="py-2 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.form.backToLogin}
                </motion.button>
                
                <motion.button
                  type="submit"
                  disabled={isSubmittingReset}
                  className="bg-primary-500 text-white py-2 px-6 rounded-lg hover:bg-primary-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmittingReset ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>{t.form.sendingReset}</span>
                    </div>
                  ) : (
                    t.form.resetButton
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
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
          <div className="absolute top-4 right-4">
            <LanguageSwitcher variant="buttons" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {isSignUp ? t.title.signUp : t.title.signIn}
          </h2>
          <p className="text-gray-600">
            {isSignUp ? t.subtitle.signUp : t.subtitle.signIn}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.form.fullName}
                  </label>
                  <div className="relative">
                    <SafeIcon
                      icon={FiUser}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder={t.form.fullNamePlaceholder}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                        errors.fullName ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.form.industry}
                  </label>
                  <div className="relative">
                    <SafeIcon
                      icon={FiBriefcase}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                        errors.industry ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">{t.form.industryPlaceholder}</option>
                      {industries[language].map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.industry && (
                    <p className="mt-1 text-sm text-red-600">{errors.industry}</p>
                  )}
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.form.email}
              </label>
              <div className="relative">
                <SafeIcon
                  icon={FiMail}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t.form.emailPlaceholder}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {t.form.password}
                </label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-primary-500 hover:text-primary-600"
                  >
                    {t.form.forgotPassword}
                  </button>
                )}
              </div>
              <div className="relative">
                <SafeIcon
                  icon={FiLock}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
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
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>{isSignUp ? t.form.creatingAccount : t.form.signingIn}</span>
                </div>
              ) : (
                isSignUp ? t.form.signUpButton : t.form.signInButton
              )}
            </motion.button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isSignUp ? t.form.alreadyAccount : t.form.noAccount}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setFormData({ email: '', password: '', fullName: '', industry: '' });
                  setErrors({});
                }}
                className="text-primary-500 hover:text-primary-600 font-semibold"
              >
                {isSignUp ? t.form.signInLink : t.form.signUpLink}
              </button>
            </p>
          </div>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          className="mt-8 bg-white/50 backdrop-blur-sm rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.features.title}</h3>
          <ul className="space-y-2 text-gray-700">
            {t.features.list.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;