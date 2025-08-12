import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useLanguage } from '../contexts/LanguageContext';

const { FiMail, FiCheckCircle, FiAlertCircle, FiRefreshCw } = FiIcons;

const EmailVerificationModal = ({ email, onClose, onResend }) => {
  const { language } = useLanguage();
  
  const translations = {
    en: {
      title: "Check Your Email",
      subtitle: "We've sent a verification link to:",
      instruction: "Click the link in the email to verify your account.",
      note: "If you don't see the email, check your spam folder.",
      resend: "Resend Email",
      close: "Close",
      emailPreview: {
        subject: "Verify your PopSales account",
        greeting: "Welcome to PopSales!",
        message: "Thank you for creating an account with us. To get started, please verify your email address by clicking the button below:",
        button: "Verify Email Address",
        validity: "This link is valid for 24 hours.",
        contact: "If you didn't create an account, please ignore this email or contact us at support@popsales.io",
        signature: "The PopSales Team",
      }
    },
    fr: {
      title: "Vérifiez Votre Email",
      subtitle: "Nous avons envoyé un lien de vérification à :",
      instruction: "Cliquez sur le lien dans l'email pour vérifier votre compte.",
      note: "Si vous ne voyez pas l'email, vérifiez votre dossier spam.",
      resend: "Renvoyer l'Email",
      close: "Fermer",
      emailPreview: {
        subject: "Vérifiez votre compte PopSales",
        greeting: "Bienvenue sur PopSales !",
        message: "Merci d'avoir créé un compte chez nous. Pour commencer, veuillez vérifier votre adresse email en cliquant sur le bouton ci-dessous :",
        button: "Vérifier l'Adresse Email",
        validity: "Ce lien est valable pendant 24 heures.",
        contact: "Si vous n'avez pas créé de compte, veuillez ignorer cet email ou nous contacter à support@popsales.io",
        signature: "L'équipe PopSales",
      }
    }
  };

  const t = translations[language];

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
        <div className="text-center mb-6">
          <div className="bg-primary-100 p-4 rounded-full w-fit mx-auto mb-4">
            <SafeIcon icon={FiMail} className="text-primary-500 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.title}</h2>
          <p className="text-gray-600 mb-2">{t.subtitle}</p>
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
            <p className="text-gray-500 text-sm">{t.emailPreview.contact}</p>
            <p className="text-gray-700 mt-4">{t.emailPreview.signature}</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
          <motion.button
            onClick={onResend}
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
      </motion.div>
    </motion.div>
  );
};

export default EmailVerificationModal;