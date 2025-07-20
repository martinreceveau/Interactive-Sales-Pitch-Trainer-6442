import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const CookiePolicyPage = () => {
  const { language } = useLanguage();
  
  const translations = {
    en: {
      title: "Cookie Policy",
      lastUpdated: "Last Updated: January 2024",
      sections: [
        {
          title: "1. Introduction",
          content: `This Cookie Policy explains how PopSales ("we", "us", "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.`
        },
        {
          title: "2. What Are Cookies?",
          content: `Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.

Cookies set by the website owner (in this case, PopSales) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).`
        },
        {
          title: "3. Why Do We Use Cookies?",
          content: `We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our website. Third parties serve cookies through our website for advertising, analytics, and other purposes.

The specific types of first and third-party cookies served through our website and the purposes they perform are described below.`
        },
        {
          title: "4. Types of Cookies We Use",
          content: `Essential Cookies:
These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our website functions.

Performance and Functionality Cookies:
These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.

Analytics and Customization Cookies:
These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.

Advertising Cookies:
These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.

Social Media Cookies:
These cookies are used to enable you to share pages and content that you find interesting on our website through third-party social networking and other websites. These cookies may also be used for advertising purposes.`
        },
        {
          title: "5. How Can You Control Cookies?",
          content: `You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in our cookie banner.

You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.

In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit http://www.aboutads.info/choices/ or http://www.youronlinechoices.com.`
        },
        {
          title: "6. How Often Will We Update This Cookie Policy?",
          content: `We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.

The date at the top of this Cookie Policy indicates when it was last updated.`
        },
        {
          title: "7. Where Can You Get Further Information?",
          content: `If you have any questions about our use of cookies or other technologies, please email us at privacy@popsales.io.`
        }
      ]
    },
    fr: {
      title: "Politique de Cookies",
      lastUpdated: "Dernière mise à jour : Janvier 2024",
      sections: [
        {
          title: "1. Introduction",
          content: `Cette Politique de Cookies explique comment PopSales (« nous », « notre ») utilise les cookies et technologies similaires pour vous reconnaître lorsque vous visitez notre site web. Elle explique ce que sont ces technologies et pourquoi nous les utilisons, ainsi que vos droits pour contrôler leur utilisation.`
        },
        {
          title: "2. Que Sont les Cookies?",
          content: `Les cookies sont de petits fichiers de données qui sont placés sur votre ordinateur ou appareil mobile lorsque vous visitez un site web. Les cookies sont largement utilisés par les propriétaires de sites web pour faire fonctionner leurs sites, ou pour les faire fonctionner plus efficacement, ainsi que pour fournir des informations de reporting.

Les cookies définis par le propriétaire du site web (dans ce cas, PopSales) sont appelés "cookies de première partie". Les cookies définis par des parties autres que le propriétaire du site web sont appelés "cookies tiers". Les cookies tiers permettent de fournir des fonctionnalités ou des caractéristiques tierces sur ou via le site web (par exemple, publicité, contenu interactif et analyses).`
        },
        {
          title: "3. Pourquoi Utilisons-nous des Cookies?",
          content: `Nous utilisons des cookies de première et de tierce partie pour plusieurs raisons. Certains cookies sont nécessaires pour des raisons techniques afin que notre site web fonctionne, et nous les appelons cookies "essentiels" ou "nécessaires". D'autres cookies nous permettent également de suivre et de cibler les intérêts de nos utilisateurs pour améliorer l'expérience sur notre site web. Des tiers utilisent des cookies via notre site web à des fins publicitaires, d'analyse et autres.

Les types spécifiques de cookies de première et tierce partie utilisés via notre site web et les objectifs qu'ils accomplissent sont décrits ci-dessous.`
        },
        {
          title: "4. Types de Cookies que Nous Utilisons",
          content: `Cookies Essentiels :
Ces cookies sont strictement nécessaires pour vous fournir des services disponibles via notre site web et pour utiliser certaines de ses fonctionnalités, comme l'accès à des zones sécurisées. Comme ces cookies sont strictement nécessaires pour fournir le site web, vous ne pouvez pas les refuser sans affecter le fonctionnement de notre site web.

Cookies de Performance et de Fonctionnalité :
Ces cookies sont utilisés pour améliorer la performance et la fonctionnalité de notre site web mais ne sont pas essentiels à leur utilisation. Cependant, sans ces cookies, certaines fonctionnalités peuvent devenir indisponibles.

Cookies d'Analyse et de Personnalisation :
Ces cookies collectent des informations qui sont utilisées soit sous forme agrégée pour nous aider à comprendre comment notre site web est utilisé ou l'efficacité de nos campagnes marketing, soit pour nous aider à personnaliser notre site web pour vous.

Cookies Publicitaires :
Ces cookies sont utilisés pour rendre les messages publicitaires plus pertinents pour vous. Ils exécutent des fonctions comme empêcher la même annonce de réapparaître continuellement, s'assurer que les annonces sont correctement affichées, et dans certains cas, sélectionner des publicités basées sur vos intérêts.

Cookies de Médias Sociaux :
Ces cookies sont utilisés pour vous permettre de partager des pages et du contenu que vous trouvez intéressants sur notre site web via des réseaux sociaux tiers et d'autres sites web. Ces cookies peuvent également être utilisés à des fins publicitaires.`
        },
        {
          title: "5. Comment Pouvez-vous Contrôler les Cookies?",
          content: `Vous avez le droit de décider d'accepter ou de refuser les cookies. Vous pouvez exercer vos préférences en matière de cookies en cliquant sur les liens de désactivation appropriés fournis dans notre bannière de cookies.

Vous pouvez également définir ou modifier les contrôles de votre navigateur web pour accepter ou refuser les cookies. Si vous choisissez de refuser les cookies, vous pouvez toujours utiliser notre site web, bien que votre accès à certaines fonctionnalités et zones de notre site web puisse être limité. Comme les moyens par lesquels vous pouvez refuser les cookies via les contrôles de votre navigateur web varient d'un navigateur à l'autre, vous devriez visiter le menu d'aide de votre navigateur pour plus d'informations.

En outre, la plupart des réseaux publicitaires vous offrent un moyen de vous désinscrire de la publicité ciblée. Si vous souhaitez obtenir plus d'informations, veuillez visiter http://www.aboutads.info/choices/ ou http://www.youronlinechoices.com.`
        },
        {
          title: "6. À quelle Fréquence Mettrons-nous à Jour cette Politique de Cookies?",
          content: `Nous pouvons mettre à jour cette Politique de Cookies de temps à autre afin de refléter, par exemple, des changements dans les cookies que nous utilisons ou pour d'autres raisons opérationnelles, légales ou réglementaires. Veuillez donc consulter régulièrement cette Politique de Cookies pour rester informé de notre utilisation des cookies et des technologies connexes.

La date en haut de cette Politique de Cookies indique quand elle a été mise à jour pour la dernière fois.`
        },
        {
          title: "7. Où Pouvez-vous Obtenir Plus d'Informations?",
          content: `Si vous avez des questions sur notre utilisation des cookies ou d'autres technologies, veuillez nous envoyer un email à privacy@popsales.io.`
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

export default CookiePolicyPage;