import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useLanguage } from '../contexts/LanguageContext';

const { FiMail, FiLock, FiRefreshCw, FiCheck } = FiIcons;

const PasswordResetModal = ({ email, onClose, onSend }) => {
  const { language } = useLanguage();
  const [isSent, setIsSent] = useState(false);
  
  const translations = {
    en: {
      title: {
        request: "Reset Your Password",
        sent: "Check Your Email"
      },
      subtitle: {
        request: "Enter your email address to receive a password reset link",
        sent: "We've sent a password reset link to:"
      },
      instruction: "Click the link in the email to reset your password.",
      note: "If you don't see the email, check your spam folder.",
      placeholder: "Enter your email address",
      send: "Send Reset Link",
      resend: "Resend Email",
      close: "Close",
      back: "Back",
      emailPreview: {
        subject: "Reset your PopSales password",
        greeting: "Hello,",
        message: "We received a request to reset your password for your PopSales account. Click the button below to set a new password:",
        button: "Reset Password",
        validity: "This link is valid for 1 hour.",
        ignore: "If you didn't request a password reset, you can safely ignore this email.",
        contact: "If you need assistance, please contact us at support@popsales.io",
        signature: "The PopSales Team",
      }
    },
    fr: {
      title: {
        request: "Réinitialiser Votre Mot de Passe",
        sent: "Vérifiez Votre Email"
      },
      subtitle: {
        request: "Entrez votre adresse email pour recevoir un lien de réinitialisation",
        sent: "Nous avons envoyé un lien de réinitialisation à :"
      },
      instruction: "Cliquez sur le lien dans l'email pour réinitialiser votre mot de passe.",
      note: "Si vous ne voyez pas l'email, vérifiez votre dossier spam.",
      placeholder: "Entrez votre adresse email",
      send: "Envoyer le Lien",
      resend: "Renvoyer l'Email",
      close: "Fermer",
      back: "Retour",
      emailPreview: {
        subject: "Réinitialisez votre mot de passe PopSales",
        greeting: "Bonjour,",
        message: "Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte PopSales. Cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe :",
        button: "Réinitialiser le Mot de Passe",
        validity: "Ce lien est valable pendant 1 heure.",
        ignore: "Si vous n'avez pas demandé de réinitialisation de mot de passe, vous pouvez ignorer cet email.",
        contact: "Si vous avez besoin d'aide, veuillez nous contacter à support@popsales.io",
        signature: "L'équipe PopSales",
      }
    }
  };

  const t = translations[language];

  const handleSend = () => {
    onSend(email);
    setIsSent(true);
  };

  const handleResend = () => {
    onSend(email);
    // Add a small animation or feedback here
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-8 max-w-lg w-full"
      >
        {!isSent ? (
          <>
            <div className="text-center mb-6">
              <div className="bg-primary-100 p-4 rounded-full w-fit mx-auto mb-4">
                <SafeIcon icon={FiLock} className="text-primary-500 text-3xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.title.request}</h2>
              <p className="text-gray-600">{t.subtitle.request}</p>
            </div>
            
            <div className="mb-6">
              <input 
                type="email"
                value={email || ''}
                onChange={(e) => email = e.target.value}
                placeholder={t.placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex justify-between">
              <motion.button
                onClick={onClose}
                className="py-2 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.close}
              </motion.button>
              
              <motion.button
                onClick={handleSend}
                className="bg-primary-500 text-white py-2 px-6 rounded-lg hover:bg-primary-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.send}
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="bg-primary-100 p-4 rounded-full w-fit mx-auto mb-4">
                <SafeIcon icon={FiMail} className="text-primary-500 text-3xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.title.sent}</h2>
              <p className="text-gray-600 mb-2">{t.subtitle.sent}</p>
              <p className="text-lg font-medium text-primary-600">{email}</p>
              <p className="text-gray-600 mt-4">{t.instruction}</p>
              <p className="text-gray-500 text-sm mt-2">{t.note}</p>
            </div>
            
            {/* Email Preview */}
            <div className="border border-gray-200 rounded-lg p-6 mb-6 max-h-64 overflow-y-auto">
              <div className="border-b border-gray-200 pb-2 mb-4">
                <p className="text-gray-500 text-sm">From: <span className="font-medium">PopSales &lt;contact@popsales.io&gt;</span></p>
                <p className="text-gray-500 text-sm">To: <span className="font-medium">{email}</span></p>
                <p className="text-gray-500 text-sm">Subject: <span className="font-medium">{t.emailPreview.subject}</span></p>
              </div>
              
              <div className="space-y-4">
                <p className="font-bold text-gray-800 text-lg">{t.emailPreview.greeting}</p>
                <p className="text-gray-700">{t.emailPreview.message}</p>
                
                <div className="text-center py-2">
                  <button className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium">
                    {t.emailPreview.button}
                  </button>
                </div>
                
                <p className="text-gray-600 text-sm">{t.emailPreview.validity}</p>
                <p className="text-gray-600 text-sm">{t.emailPreview.ignore}</p>
                <p className="text-gray-500 text-sm">{t.emailPreview.contact}</p>
                <p className="text-gray-700 mt-4">{t.emailPreview.signature}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
              <motion.button
                onClick={handleResend}
                className="flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <SafeIcon icon={FiRefreshCw} />
                <span>{t.resend}</span>
              </motion.button>
              
              <motion.button
                onClick={onClose}
                className="bg-primary-500 text-white py-2 px-6 rounded-lg hover:bg-primary-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.close}
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PasswordResetModal;