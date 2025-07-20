import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const { FiX, FiTrendingUp, FiGlobe, FiPlus, FiCalendar, FiEye } = FiIcons;

const NewsSuggestions = ({ onClose, onAddKeyword }) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [selectedNews, setSelectedNews] = useState(null);

  const translations = {
    en: {
      title: "Weekly News Suggestions",
      subtitle: "Fresh insights to enhance your pitch with current trends and topics",
      fromIndustry: "From Your Industry",
      crossIndustry: "Cross-Industry Insights",
      suggestedKeywords: "Suggested Keywords:",
      source: "Source:",
      viewDetails: "View Details",
      backToNews: "Back to News",
      proTip: {
        title: "💡 Pro Tip",
        content: "Incorporating current trends and news into your pitch shows you're knowledgeable about the market and can help build credibility with prospects. Click on any keyword to add it to your pitch!"
      },
      keyTakeaways: "Key Takeaways",
      howToUse: "How to Use in Your Pitch",
      addKeywords: "Add Keywords to Your Pitch",
      useCaseKeywords: {
        founder: ["market opportunity", "scalability", "revenue model", "competitive advantage", "growth metrics"],
        employee: ["project updates", "key achievements", "next steps", "resource needs", "timeline"],
        executive: ["action plan", "accountability", "transparency", "next steps", "team unity"],
        sales_rep: ["value proposition", "customer benefits", "pain points", "solution fit", "closing techniques"],
        parent: ["understanding", "boundaries", "consequences", "support", "expectations"],
        teacher: ["learning objectives", "student engagement", "clear instructions", "feedback", "motivation"],
        negotiator: ["leverage points", "compromise options", "bottom line", "mutual benefits", "closing terms"],
        lawyer: ["opening statement", "key evidence", "legal precedent", "closing argument", "jury persuasion"]
      },
      takeaways: [
        "Market trends are shifting towards digital solutions",
        "Customer expectations are evolving rapidly",
        "Companies need to adapt quickly to stay competitive",
        "Innovation is key to maintaining market position"
      ],
      usage: [
        "Reference current market conditions",
        "Show awareness of industry trends",
        "Connect your solution to market needs",
        "Demonstrate thought leadership"
      ]
    },
    fr: {
      title: "Suggestions d'Actualités Hebdomadaires",
      subtitle: "Insights frais pour améliorer votre présentation avec les tendances et sujets actuels",
      fromIndustry: "De Votre Secteur",
      crossIndustry: "Insights Inter-Sectoriels",
      suggestedKeywords: "Mots-clés Suggérés :",
      source: "Source :",
      viewDetails: "Voir les Détails",
      backToNews: "Retour aux Actualités",
      proTip: {
        title: "💡 Conseil Pro",
        content: "Incorporer les tendances et actualités actuelles dans votre présentation montre que vous connaissez le marché et peut aider à établir la crédibilité avec les prospects. Cliquez sur n'importe quel mot-clé pour l'ajouter à votre présentation !"
      },
      keyTakeaways: "Points Clés à Retenir",
      howToUse: "Comment Utiliser dans Votre Présentation",
      addKeywords: "Ajouter des Mots-clés à Votre Présentation",
      useCaseKeywords: {
        founder: ["opportunité de marché", "évolutivité", "modèle de revenus", "avantage concurrentiel", "métriques de croissance"],
        employee: ["mises à jour projet", "réalisations clés", "prochaines étapes", "besoins ressources", "calendrier"],
        executive: ["plan d'action", "responsabilité", "transparence", "prochaines étapes", "unité équipe"],
        sales_rep: ["proposition de valeur", "bénéfices client", "points de douleur", "adéquation solution", "techniques de closing"],
        parent: ["compréhension", "limites", "conséquences", "soutien", "attentes"],
        teacher: ["objectifs d'apprentissage", "engagement étudiant", "instructions claires", "feedback", "motivation"],
        negotiator: ["points de levier", "options de compromis", "ligne rouge", "bénéfices mutuels", "termes de clôture"],
        lawyer: ["déclaration d'ouverture", "preuves clés", "précédent juridique", "plaidoirie finale", "persuasion du jury"]
      },
      takeaways: [
        "Les tendances du marché évoluent vers les solutions numériques",
        "Les attentes des clients évoluent rapidement",
        "Les entreprises doivent s'adapter rapidement pour rester compétitives",
        "L'innovation est la clé pour maintenir la position sur le marché"
      ],
      usage: [
        "Référencer les conditions actuelles du marché",
        "Montrer la connaissance des tendances du secteur",
        "Connecter votre solution aux besoins du marché",
        "Démontrer le leadership éclairé"
      ]
    }
  };

  const t = translations[language];

  // Generate contextual keywords based on use cases
  const getContextualKeywords = () => {
    const allKeywords = [];
    Object.values(t.useCaseKeywords).forEach(keywords => {
      allKeywords.push(...keywords);
    });
    return [...new Set(allKeywords)]; // Remove duplicates
  };

  // Mock news data with contextual keywords
  const mockNews = {
    industry: [
      {
        id: 1,
        title: language === 'en' ? "AI-Powered Communication Tools See 300% Growth" : "Les Outils de Communication Alimentés par IA Voient une Croissance de 300%",
        summary: language === 'en' ? "The communication technology sector is experiencing unprecedented growth as AI tools become mainstream." : "Le secteur de la technologie de communication connaît une croissance sans précédent alors que les outils IA deviennent mainstream.",
        keywords: getContextualKeywords().slice(0, 6),
        date: "2024-01-15",
        source: language === 'en' ? "Industry Report" : "Rapport Sectoriel"
      },
      {
        id: 2,
        title: language === 'en' ? "Remote Communication Skills Become Essential" : "Les Compétences de Communication à Distance Deviennent Essentielles",
        summary: language === 'en' ? "Companies with strong remote communication are outperforming traditional office-based teams." : "Les entreprises avec une forte communication à distance surpassent les équipes traditionnelles basées au bureau.",
        keywords: getContextualKeywords().slice(6, 12),
        date: "2024-01-12",
        source: language === 'en' ? "Communication Research Institute" : "Institut de Recherche Communication"
      }
    ],
    external: [
      {
        id: 3,
        title: language === 'en' ? "Effective Communication Drives Business Success" : "La Communication Efficace Stimule le Succès Commercial",
        summary: language === 'en' ? "78% of business leaders now consider communication skills as the top factor for success." : "78% des dirigeants d'entreprise considèrent maintenant les compétences de communication comme le facteur principal de succès.",
        keywords: getContextualKeywords().slice(12, 18),
        date: "2024-01-14",
        source: language === 'en' ? "Business Trends Weekly" : "Tendances Business Hebdomadaire"
      },
      {
        id: 4,
        title: language === 'en' ? "Presentation Skills Training Shows ROI Growth" : "La Formation aux Compétences de Présentation Montre une Croissance du ROI",
        summary: language === 'en' ? "Companies investing in presentation training see 25% higher success rates in business deals." : "Les entreprises investissant dans la formation aux présentations voient des taux de succès 25% plus élevés dans les affaires.",
        keywords: getContextualKeywords().slice(18, 24),
        date: "2024-01-13",
        source: language === 'en' ? "Training ROI Today" : "ROI Formation Aujourd'hui"
      }
    ]
  };

  const handleAddKeyword = (keyword) => {
    onAddKeyword(keyword);
  };

  const handleViewDetails = (news) => {
    setSelectedNews(news);
  };

  const NewsCard = ({ news, type }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <SafeIcon icon={type === 'industry' ? FiTrendingUp : FiGlobe} className={`text-lg ${type === 'industry' ? 'text-blue-500' : 'text-green-500'}`} />
          <span className={`text-xs px-2 py-1 rounded-full ${type === 'industry' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
            {type === 'industry' ? `${user?.industry || (language === 'en' ? 'Your Industry' : 'Votre Secteur')}` : (language === 'en' ? 'Cross-Industry' : 'Inter-Sectoriel')}
          </span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <SafeIcon icon={FiCalendar} />
          <span>{new Date(news.date).toLocaleDateString()}</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">{news.title}</h3>
      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{news.summary}</p>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">{t.suggestedKeywords}</h4>
          <div className="flex flex-wrap gap-2">
            {news.keywords.map((keyword, index) => (
              <motion.button
                key={index}
                onClick={() => handleAddKeyword(keyword)}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 transition-colors flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{keyword}</span>
                <SafeIcon icon={FiPlus} className="text-xs" />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">{t.source} {news.source}</span>
          <button
            onClick={() => handleViewDetails(news)}
            className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center space-x-1"
          >
            <SafeIcon icon={FiEye} />
            <span>{t.viewDetails}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );

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
        className="bg-gray-50 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
      >
        {!selectedNews ? (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{t.title}</h2>
                <p className="text-gray-600 mt-2">{t.subtitle}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <SafeIcon icon={FiX} className="text-2xl" />
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <SafeIcon icon={FiTrendingUp} className="text-blue-500 text-xl" />
                  <h3 className="text-xl font-semibold text-gray-800">{t.fromIndustry}</h3>
                </div>
                <div className="space-y-4">
                  {mockNews.industry.map((news) => (
                    <NewsCard key={news.id} news={news} type="industry" />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <SafeIcon icon={FiGlobe} className="text-green-500 text-xl" />
                  <h3 className="text-xl font-semibold text-gray-800">{t.crossIndustry}</h3>
                </div>
                <div className="space-y-4">
                  {mockNews.external.map((news) => (
                    <NewsCard key={news.id} news={news} type="external" />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-lg font-semibold text-blue-800 mb-2">{t.proTip.title}</h4>
              <p className="text-blue-700 text-sm">{t.proTip.content}</p>
            </div>
          </div>
        ) : (
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setSelectedNews(null)}
                className="text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiX} className="transform rotate-45" />
                <span>{t.backToNews}</span>
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <SafeIcon icon={FiX} className="text-2xl" />
              </button>
            </div>

            <div className="bg-white rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedNews.title}</h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{selectedNews.summary}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.keyTakeaways}</h3>
                  <ul className="space-y-2 text-gray-600">
                    {t.takeaways.map((takeaway, index) => (
                      <li key={index}>• {takeaway}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.howToUse}</h3>
                  <ul className="space-y-2 text-gray-600">
                    {t.usage.map((usage, index) => (
                      <li key={index}>• {usage}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.addKeywords}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedNews.keywords.map((keyword, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAddKeyword(keyword)}
                      className="bg-primary-100 text-primary-700 px-4 py-2 rounded-lg hover:bg-primary-200 transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>{keyword}</span>
                      <SafeIcon icon={FiPlus} />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default NewsSuggestions;