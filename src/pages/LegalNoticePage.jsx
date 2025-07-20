import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const LegalNoticePage = () => {
  const { language } = useLanguage();
  
  const translations = {
    en: {
      title: "Legal Notice",
      lastUpdated: "Last Updated: January 2024",
      sections: [
        {
          title: "1. Company Information",
          content: `PopSales [Company Registration Details]
[Company Address]
Email: contact@popsales.io`
        },
        {
          title: "2. Website Terms",
          content: `This website is operated by PopSales. By accessing and using this website, you accept and agree to be bound by these terms and conditions.`
        },
        {
          title: "3. Intellectual Property",
          content: `All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of PopSales and is protected by international copyright laws.`
        },
        {
          title: "4. Disclaimer",
          content: `The information provided on this website is for general information purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website.`
        },
        {
          title: "5. Limitation of Liability",
          content: `PopSales shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of the website.`
        },
        {
          title: "6. Governing Law",
          content: `These terms and conditions are governed by and construed in accordance with the laws of [Your Country], and you submit to the non-exclusive jurisdiction of the courts in that location.`
        }
      ]
    },
    fr: {
      title: "Mentions Légales",
      lastUpdated: "Dernière mise à jour : Janvier 2024",
      sections: [
        {
          title: "1. Informations sur la Société",
          content: `PopSales [Détails d'Enregistrement de la Société]
[Adresse de la Société]
Email : contact@popsales.io`
        },
        {
          title: "2. Conditions d'Utilisation du Site",
          content: `Ce site web est exploité par PopSales. En accédant et en utilisant ce site web, vous acceptez d'être lié par ces conditions générales.`
        },
        {
          title: "3. Propriété Intellectuelle",
          content: `Tout le contenu de ce site web, y compris mais non limité aux textes, graphiques, logos, images, clips audio, téléchargements numériques et logiciels, est la propriété de PopSales et est protégé par les lois internationales sur le droit d'auteur.`
        },
        {
          title: "4. Avertissement",
          content: `Les informations fournies sur ce site web sont uniquement à titre d'information générale. Bien que nous nous efforcions de maintenir les informations à jour et correctes, nous ne faisons aucune déclaration ou garantie d'aucune sorte concernant l'exhaustivité, l'exactitude, la fiabilité, l'adéquation ou la disponibilité du site web ou des informations, produits, services ou graphiques connexes contenus sur le site web.`
        },
        {
          title: "5. Limitation de Responsabilité",
          content: `PopSales ne sera pas responsable des dommages directs, indirects, accessoires, consécutifs ou punitifs résultant de votre accès ou de votre utilisation du site web.`
        },
        {
          title: "6. Loi Applicable",
          content: `Ces conditions générales sont régies et interprétées conformément aux lois de [Votre Pays], et vous vous soumettez à la juridiction non exclusive des tribunaux de ce lieu.`
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t.title}</h1>
          <p className="text-gray-600 mb-8">{t.lastUpdated}</p>
          
          <div className="space-y-8">
            {t.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {section.title}
                </h2>
                <div className="text-gray-600 space-y-2 whitespace-pre-line">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalNoticePage;