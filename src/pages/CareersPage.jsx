import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';

const { FiUpload, FiUser, FiMail, FiFileText, FiSend, FiCheck } = FiIcons;

const CareersPage = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    position: '',
    coverLetter: '',
    cv: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const translations = {
    en: {
      hero: {
        title: "Join Our Team",
        subtitle: "Help us revolutionize how people communicate and present their ideas"
      },
      form: {
        title: "Apply for a Position",
        subtitle: "We're always looking for talented individuals to join our growing team",
        fullName: "Full Name",
        fullNamePlaceholder: "Enter your full name",
        email: "Email Address",
        emailPlaceholder: "Enter your email address",
        position: "Position of Interest",
        positionPlaceholder: "e.g. Frontend Developer, Sales Manager, etc.",
        coverLetter: "Cover Letter",
        coverLetterPlaceholder: "Tell us why you'd like to join PopSales and what you can bring to our team...",
        cv: "Upload CV/Resume",
        cvPlaceholder: "Choose file (PDF, DOC, DOCX)",
        submit: "Submit Application",
        submitting: "Submitting...",
        required: "This field is required"
      },
      success: {
        title: "Application Submitted Successfully!",
        message: "Thank you for your interest in PopSales. We'll review your application and get back to you soon.",
        backToSite: "Back to Site"
      },
      positions: {
        title: "Open Positions",
        list: [
          {
            title: "Senior Frontend Developer",
            location: "Remote",
            type: "Full-time",
            description: "Build beautiful, responsive user interfaces using React and modern web technologies."
          },
          {
            title: "AI/ML Engineer",
            location: "Remote",
            type: "Full-time",
            description: "Develop and improve our speech analysis and natural language processing capabilities."
          },
          {
            title: "Sales Development Representative",
            location: "Remote",
            type: "Full-time",
            description: "Help grow our customer base by identifying and qualifying potential customers."
          },
          {
            title: "UX/UI Designer",
            location: "Remote",
            type: "Full-time",
            description: "Design intuitive and engaging user experiences for our speech coaching platform."
          }
        ]
      },
      benefits: {
        title: "Why Work at PopSales?",
        items: [
          "🌍 Fully remote team",
          "💰 Competitive salary & equity",
          "🏥 Health, dental & vision insurance",
          "🏖️ Unlimited PTO policy",
          "📚 Learning & development budget",
          "🎯 Meaningful work that helps people communicate better"
        ]
      }
    },
    fr: {
      hero: {
        title: "Rejoignez Notre Équipe",
        subtitle: "Aidez-nous à révolutionner la façon dont les gens communiquent et présentent leurs idées"
      },
      form: {
        title: "Postuler pour un Poste",
        subtitle: "Nous recherchons toujours des personnes talentueuses pour rejoindre notre équipe en croissance",
        fullName: "Nom Complet",
        fullNamePlaceholder: "Entrez votre nom complet",
        email: "Adresse Email",
        emailPlaceholder: "Entrez votre adresse email",
        position: "Poste d'Intérêt",
        positionPlaceholder: "ex. Développeur Frontend, Responsable Commercial, etc.",
        coverLetter: "Lettre de Motivation",
        coverLetterPlaceholder: "Dites-nous pourquoi vous aimeriez rejoindre PopSales et ce que vous pouvez apporter à notre équipe...",
        cv: "Télécharger CV",
        cvPlaceholder: "Choisir fichier (PDF, DOC, DOCX)",
        submit: "Soumettre Candidature",
        submitting: "Soumission...",
        required: "Ce champ est requis"
      },
      success: {
        title: "Candidature Soumise avec Succès !",
        message: "Merci pour votre intérêt pour PopSales. Nous examinerons votre candidature et vous répondrons bientôt.",
        backToSite: "Retour au Site"
      },
      positions: {
        title: "Postes Ouverts",
        list: [
          {
            title: "Développeur Frontend Senior",
            location: "Télétravail",
            type: "Temps plein",
            description: "Créer des interfaces utilisateur belles et responsives en utilisant React et les technologies web modernes."
          },
          {
            title: "Ingénieur IA/ML",
            location: "Télétravail",
            type: "Temps plein",
            description: "Développer et améliorer nos capacités d'analyse vocale et de traitement du langage naturel."
          },
          {
            title: "Représentant Développement Commercial",
            location: "Télétravail",
            type: "Temps plein",
            description: "Aider à développer notre base de clients en identifiant et qualifiant les clients potentiels."
          },
          {
            title: "Designer UX/UI",
            location: "Télétravail",
            type: "Temps plein",
            description: "Concevoir des expériences utilisateur intuitives et engageantes pour notre plateforme de coaching vocal."
          }
        ]
      },
      benefits: {
        title: "Pourquoi Travailler chez PopSales ?",
        items: [
          "🌍 Équipe entièrement à distance",
          "💰 Salaire compétitif et actions",
          "🏥 Assurance santé, dentaire et vision",
          "🏖️ Politique de congés illimités",
          "📚 Budget d'apprentissage et développement",
          "🎯 Travail significatif qui aide les gens à mieux communiquer"
        ]
      }
    }
  };

  const t = translations[language];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'cv') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.position || !formData.coverLetter) {
      toast.error(t.form.required);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real application, you would send this data to your backend
      console.log('Form data:', formData);
      
      toast.success(language === 'en' ? 'Application submitted successfully!' : 'Candidature soumise avec succès !');
      setSubmitted(true);
    } catch (error) {
      toast.error(language === 'en' ? 'Error submitting application' : 'Erreur lors de la soumission');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-6">
            <SafeIcon icon={FiCheck} className="text-green-500 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.success.title}</h2>
          <p className="text-gray-600 mb-6">{t.success.message}</p>
          <a
            href="/"
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
          >
            {t.success.backToSite}
          </a>
        </motion.div>
      </div>
    );
  }

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

      {/* Open Positions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t.positions.title}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            {t.positions.list.map((position, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{position.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <span>{position.location}</span>
                  <span>•</span>
                  <span>{position.type}</span>
                </div>
                <p className="text-gray-700">{position.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t.benefits.title}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {t.benefits.items.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-gray-700">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">{t.form.title}</h2>
              <p className="text-xl text-gray-600">{t.form.subtitle}</p>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              className="bg-gray-50 p-8 rounded-2xl space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.form.fullName}
                  </label>
                  <div className="relative">
                    <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder={t.form.fullNamePlaceholder}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.form.email}
                  </label>
                  <div className="relative">
                    <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t.form.emailPlaceholder}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.form.position}
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder={t.form.positionPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.form.coverLetter}
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder={t.form.coverLetterPlaceholder}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.form.cv}
                </label>
                <div className="relative">
                  <SafeIcon icon={FiUpload} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="file"
                    name="cv"
                    onChange={handleInputChange}
                    accept=".pdf,.doc,.docx"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{t.form.cvPlaceholder}</p>
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
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;