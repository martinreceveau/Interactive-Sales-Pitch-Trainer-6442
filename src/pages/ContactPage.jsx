import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';

const { FiMail, FiMapPin, FiPhone, FiSend, FiCheck } = FiIcons;

const ContactPage = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const translations = {
    en: {
      hero: {
        title: "Contact Us",
        subtitle: "We'd love to hear from you. Get in touch with our team."
      },
      form: {
        title: "Send us a message",
        name: "Your Name",
        namePlaceholder: "Enter your full name",
        email: "Email Address",
        emailPlaceholder: "Enter your email address",
        subject: "Subject",
        subjectPlaceholder: "What is this regarding?",
        message: "Message",
        messagePlaceholder: "Tell us how we can help you...",
        submit: "Send Message",
        submitting: "Sending...",
        required: "This field is required"
      },
      contact: {
        title: "Contact Information",
        email: "Email",
        emailValue: "contact@popsales.io",
        address: "Address",
        addressValue: "123 Innovation Street, Tech District, San Francisco, CA 94103",
        phone: "Phone",
        phoneValue: "+1 (555) 123-4567"
      },
      success: {
        title: "Message Sent Successfully!",
        message: "Thank you for reaching out. We'll get back to you as soon as possible.",
        button: "Send Another Message"
      }
    },
    fr: {
      hero: {
        title: "Contactez-Nous",
        subtitle: "Nous aimerions avoir de vos nouvelles. Contactez notre équipe."
      },
      form: {
        title: "Envoyez-nous un message",
        name: "Votre Nom",
        namePlaceholder: "Entrez votre nom complet",
        email: "Adresse Email",
        emailPlaceholder: "Entrez votre adresse email",
        subject: "Sujet",
        subjectPlaceholder: "De quoi s'agit-il?",
        message: "Message",
        messagePlaceholder: "Dites-nous comment nous pouvons vous aider...",
        submit: "Envoyer Message",
        submitting: "Envoi...",
        required: "Ce champ est requis"
      },
      contact: {
        title: "Informations de Contact",
        email: "Email",
        emailValue: "contact@popsales.io",
        address: "Adresse",
        addressValue: "123 Rue de l'Innovation, Quartier Tech, Paris, 75001",
        phone: "Téléphone",
        phoneValue: "+33 (0)1 23 45 67 89"
      },
      success: {
        title: "Message Envoyé avec Succès!",
        message: "Merci de nous avoir contactés. Nous vous répondrons dès que possible.",
        button: "Envoyer un Autre Message"
      }
    }
  };

  const t = translations[language];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t.form.required);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // In a real application, you would send this data to contact@popsales.io
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form data:', formData);
      
      toast.success(language === 'en' ? 'Message sent successfully!' : 'Message envoyé avec succès!');
      setSubmitted(true);
    } catch (error) {
      toast.error(language === 'en' ? 'Error sending message' : 'Erreur lors de l\'envoi');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-5xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t.hero.title}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t.hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              {submitted ? (
                <motion.div 
                  className="bg-white rounded-2xl shadow-lg p-8 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-6">
                    <SafeIcon icon={FiCheck} className="text-green-500 text-3xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.success.title}</h2>
                  <p className="text-gray-600 mb-6">{t.success.message}</p>
                  <button 
                    onClick={resetForm}
                    className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    {t.success.button}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">{t.form.title}</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t.form.name}
                      </label>
                      <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t.form.namePlaceholder}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t.form.email}
                      </label>
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t.form.emailPlaceholder}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t.form.subject}
                      </label>
                      <input 
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder={t.form.subjectPlaceholder}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t.form.message}
                      </label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t.form.messagePlaceholder}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        required
                      />
                    </div>
                    <motion.button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>{t.form.submitting}</span>
                        </>
                      ) : (
                        <>
                          <SafeIcon icon={FiSend} />
                          <span>{t.form.submit}</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </div>
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-8">{t.contact.title}</h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <SafeIcon icon={FiMail} className="text-primary-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{t.contact.email}</h3>
                    <p className="text-gray-600">
                      <a href="mailto:contact@popsales.io" className="hover:text-primary-500 transition-colors">
                        {t.contact.emailValue}
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <SafeIcon icon={FiMapPin} className="text-primary-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{t.contact.address}</h3>
                    <p className="text-gray-600">{t.contact.addressValue}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <SafeIcon icon={FiPhone} className="text-primary-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{t.contact.phone}</h3>
                    <p className="text-gray-600">
                      <a href={`tel:${t.contact.phoneValue.replace(/\s+/g, '')}`} className="hover:text-primary-500 transition-colors">
                        {t.contact.phoneValue}
                      </a>
                    </p>
                  </div>
                </div>
                
                {/* Map Placeholder */}
                <div className="mt-8">
                  <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                    <p className="text-gray-500">Interactive Map Coming Soon</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;