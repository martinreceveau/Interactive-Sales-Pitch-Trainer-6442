import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const TermsPage = () => {
  const { language } = useLanguage();
  
  const translations = {
    en: {
      title: "Terms of Service",
      lastUpdated: "Last Updated: January 2024",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content: `By accessing or using the PopSales service, website, and software provided through or in connection with the service, including through a mobile device (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). These Terms affect your legal rights and obligations, so if you do not agree to these Terms, do not use the Service.`
        },
        {
          title: "2. Service Description",
          content: `PopSales provides a platform for sales professionals to improve their pitch and presentation skills through AI-powered feedback and practice tools. The Service may include features such as speech analysis, keyword tracking, performance analytics, and other related tools.`
        },
        {
          title: "3. Eligibility",
          content: `You must be at least 18 years old to use the Service. By using the Service, you represent and warrant that you have the right, authority, and capacity to enter into these Terms and to abide by all of the terms and conditions set forth herein.`
        },
        {
          title: "4. Account Creation",
          content: `To use certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.

You are responsible for safeguarding your password and for all activities that occur under your account. You agree to immediately notify PopSales of any unauthorized use of your account or any other breach of security.`
        },
        {
          title: "5. User Content",
          content: `"User Content" means any content that you submit to the Service, including speech recordings, pitch texts, and other materials. You retain all rights in, and are solely responsible for, the User Content you post to the Service.

By posting User Content to the Service, you grant us a non-exclusive, royalty-free, worldwide, perpetual, irrevocable, and fully sublicensable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such User Content in connection with the Service and our business, including for promoting and redistributing part or all of the Service.`
        },
        {
          title: "6. Prohibited Activities",
          content: `You agree not to engage in any of the following prohibited activities:

• Use the Service for any illegal purpose or in violation of any local, state, national, or international law
• Harass, threaten, intimidate, or defame any other user of the Service
• Upload or transmit viruses or any other type of malicious code
• Attempt to access, search, or scrape the Service by any means other than the publicly supported interfaces
• Attempt to decipher, decompile, disassemble, or reverse engineer any of the software comprising the Service
• Interfere with, or attempt to interfere with, the access of any user, host, or network`
        },
        {
          title: "7. Intellectual Property Rights",
          content: `The Service and its original content, features, and functionality are and will remain the exclusive property of PopSales and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of PopSales.`
        },
        {
          title: "8. Subscription Fees and Payment",
          content: `Some aspects of the Service may be provided for a fee or other charge. If you elect to use paid aspects of the Service, you agree to the pricing and payment terms as we may update them from time to time.

We may add new services for additional fees and charges, or amend fees and charges for existing services, at any time in our sole discretion. Any change to our pricing or payment terms shall become effective in the billing cycle following notice of such change to you.`
        },
        {
          title: "9. Cancellation and Termination",
          content: `You may cancel your subscription at any time by logging into your account and following the cancellation instructions. If you cancel your subscription, your account will automatically close at the end of your current billing period.

We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.`
        },
        {
          title: "10. Disclaimer of Warranties",
          content: `The Service is provided on an "AS IS" and "AS AVAILABLE" basis. PopSales expressly disclaims all warranties of any kind, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement.

PopSales makes no warranty that (i) the Service will meet your requirements, (ii) the Service will be uninterrupted, timely, secure, or error-free, (iii) the results that may be obtained from the use of the Service will be accurate or reliable, or (iv) the quality of any products, services, information, or other material purchased or obtained by you through the Service will meet your expectations.`
        },
        {
          title: "11. Limitation of Liability",
          content: `In no event shall PopSales, its officers, directors, employees, or agents, be liable to you for any direct, indirect, incidental, special, punitive, or consequential damages whatsoever resulting from any (i) errors, mistakes, or inaccuracies of content, (ii) personal injury or property damage, of any nature whatsoever, resulting from your access to and use of the Service, (iii) any unauthorized access to or use of our secure servers and/or any and all personal information stored therein, (iv) any interruption or cessation of transmission to or from the Service, (v) any bugs, viruses, trojan horses, or the like, which may be transmitted to or through the Service by any third party, and/or (vi) any errors or omissions in any content or for any loss or damage of any kind incurred as a result of your use of any content posted, emailed, transmitted, or otherwise made available via the Service, whether based on warranty, contract, tort, or any other legal theory, and whether or not the company is advised of the possibility of such damages.`
        },
        {
          title: "12. Indemnification",
          content: `You agree to defend, indemnify, and hold harmless PopSales and its officers, directors, employees, and agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from: (i) your use of and access to the Service; (ii) your violation of any term of these Terms; (iii) your violation of any third-party right, including without limitation any copyright, property, or privacy right; or (iv) any claim that your User Content caused damage to a third party. This defense and indemnification obligation will survive these Terms and your use of the Service.`
        },
        {
          title: "13. Governing Law",
          content: `These Terms shall be governed and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.`
        },
        {
          title: "14. Changes to Terms",
          content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.`
        },
        {
          title: "15. Contact Us",
          content: `If you have any questions about these Terms, please contact us at legal@popsales.io.`
        }
      ]
    },
    fr: {
      title: "Conditions d'Utilisation",
      lastUpdated: "Dernière mise à jour : Janvier 2024",
      sections: [
        {
          title: "1. Acceptation des Conditions",
          content: `En accédant ou en utilisant le service PopSales, le site web et les logiciels fournis via ou en relation avec le service, y compris via un appareil mobile (collectivement, le « Service »), vous acceptez d'être lié par ces Conditions d'Utilisation (« Conditions »). Ces Conditions affectent vos droits et obligations légaux, donc si vous n'acceptez pas ces Conditions, n'utilisez pas le Service.`
        },
        {
          title: "2. Description du Service",
          content: `PopSales fournit une plateforme permettant aux professionnels de la vente d'améliorer leurs compétences en matière de présentation grâce à des outils de feedback et de pratique alimentés par l'IA. Le Service peut inclure des fonctionnalités telles que l'analyse vocale, le suivi des mots-clés, les analyses de performance et d'autres outils connexes.`
        },
        {
          title: "3. Éligibilité",
          content: `Vous devez avoir au moins 18 ans pour utiliser le Service. En utilisant le Service, vous déclarez et garantissez que vous avez le droit, l'autorité et la capacité de conclure ces Conditions et de respecter tous les termes et conditions énoncés dans les présentes.`
        },
        {
          title: "4. Création de Compte",
          content: `Pour utiliser certaines fonctionnalités du Service, vous devez vous inscrire pour un compte. Vous acceptez de fournir des informations exactes, actuelles et complètes lors du processus d'inscription et de mettre à jour ces informations pour les maintenir exactes, actuelles et complètes.

Vous êtes responsable de la protection de votre mot de passe et de toutes les activités qui se déroulent sous votre compte. Vous acceptez d'informer immédiatement PopSales de toute utilisation non autorisée de votre compte ou de toute autre violation de la sécurité.`
        },
        {
          title: "5. Contenu Utilisateur",
          content: `« Contenu Utilisateur » désigne tout contenu que vous soumettez au Service, y compris les enregistrements vocaux, les textes de présentation et autres matériels. Vous conservez tous les droits sur le Contenu Utilisateur que vous publiez sur le Service et en êtes seul responsable.

En publiant du Contenu Utilisateur sur le Service, vous nous accordez une licence non exclusive, libre de redevances, mondiale, perpétuelle, irrévocable et entièrement sous-licenciable pour utiliser, reproduire, modifier, adapter, publier, traduire, créer des œuvres dérivées, distribuer et afficher ce Contenu Utilisateur en relation avec le Service et notre activité, y compris pour promouvoir et redistribuer tout ou partie du Service.`
        },
        {
          title: "6. Activités Interdites",
          content: `Vous acceptez de ne pas vous engager dans les activités interdites suivantes :

• Utiliser le Service à des fins illégales ou en violation de toute loi locale, étatique, nationale ou internationale
• Harceler, menacer, intimider ou diffamer tout autre utilisateur du Service
• Télécharger ou transmettre des virus ou tout autre type de code malveillant
• Tenter d'accéder, de rechercher ou de scraper le Service par tout moyen autre que les interfaces publiquement prises en charge
• Tenter de déchiffrer, décompiler, désassembler ou faire de l'ingénierie inverse sur tout logiciel composant le Service
• Interférer avec, ou tenter d'interférer avec, l'accès de tout utilisateur, hôte ou réseau`
        },
        {
          title: "7. Droits de Propriété Intellectuelle",
          content: `Le Service et son contenu, ses fonctionnalités et ses fonctions originales sont et resteront la propriété exclusive de PopSales et de ses concédants. Le Service est protégé par le droit d'auteur, les marques de commerce et d'autres lois des États-Unis et des pays étrangers. Nos marques de commerce et notre présentation commerciale ne peuvent pas être utilisées en relation avec un produit ou un service sans le consentement écrit préalable de PopSales.`
        },
        {
          title: "8. Frais d'Abonnement et Paiement",
          content: `Certains aspects du Service peuvent être fournis moyennant des frais ou autres charges. Si vous choisissez d'utiliser des aspects payants du Service, vous acceptez les conditions de tarification et de paiement que nous pouvons mettre à jour de temps à autre.

Nous pouvons ajouter de nouveaux services moyennant des frais et des charges supplémentaires, ou modifier les frais et les charges pour les services existants, à tout moment à notre seule discrétion. Tout changement dans nos conditions de tarification ou de paiement prendra effet dans le cycle de facturation suivant la notification de ce changement à votre intention.`
        },
        {
          title: "9. Annulation et Résiliation",
          content: `Vous pouvez annuler votre abonnement à tout moment en vous connectant à votre compte et en suivant les instructions d'annulation. Si vous annulez votre abonnement, votre compte sera automatiquement fermé à la fin de votre période de facturation en cours.

Nous pouvons résilier ou suspendre votre compte et votre accès au Service immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris, sans limitation, si vous violez les Conditions. Dès la résiliation, votre droit d'utiliser le Service cessera immédiatement.`
        },
        {
          title: "10. Avertissement de Garanties",
          content: `Le Service est fourni « TEL QUEL » et « SELON DISPONIBILITÉ ». PopSales décline expressément toutes les garanties de quelque nature que ce soit, qu'elles soient expresses ou implicites, y compris, mais sans s'y limiter, les garanties implicites de qualité marchande, d'adéquation à un usage particulier, de titre et de non-violation.

PopSales ne garantit pas que (i) le Service répondra à vos exigences, (ii) le Service sera ininterrompu, opportun, sécurisé ou sans erreur, (iii) les résultats qui peuvent être obtenus de l'utilisation du Service seront précis ou fiables, ou (iv) la qualité de tout produit, service, information ou autre matériel acheté ou obtenu par vous via le Service répondra à vos attentes.`
        },
        {
          title: "11. Limitation de Responsabilité",
          content: `En aucun cas PopSales, ses dirigeants, administrateurs, employés ou agents ne seront responsables envers vous pour tout dommage direct, indirect, accessoire, spécial, punitif ou consécutif résultant de (i) erreurs, fautes ou inexactitudes de contenu, (ii) blessure personnelle ou dommage matériel, de quelque nature que ce soit, résultant de votre accès et utilisation du Service, (iii) tout accès non autorisé ou utilisation de nos serveurs sécurisés et/ou de toutes les informations personnelles qui y sont stockées, (iv) toute interruption ou cessation de transmission vers ou depuis le Service, (v) tout bogue, virus, chevaux de Troie ou autres, qui peuvent être transmis vers ou via le Service par un tiers, et/ou (vi) toute erreur ou omission dans tout contenu ou pour toute perte ou dommage de quelque nature que ce soit encouru suite à votre utilisation de tout contenu publié, envoyé par email, transmis ou autrement rendu disponible via le Service, que ce soit sur la base d'une garantie, d'un contrat, d'un délit ou de toute autre théorie juridique, et que la société soit ou non avisée de la possibilité de tels dommages.`
        },
        {
          title: "12. Indemnisation",
          content: `Vous acceptez de défendre, d'indemniser et de tenir indemne PopSales et ses dirigeants, administrateurs, employés et agents, contre toutes réclamations, dommages, obligations, pertes, responsabilités, coûts ou dettes et dépenses (y compris, mais sans s'y limiter, les honoraires d'avocat) découlant de : (i) votre utilisation et accès au Service; (ii) votre violation de toute condition des présentes Conditions; (iii) votre violation de tout droit de tiers, y compris, sans limitation, tout droit d'auteur, de propriété ou de confidentialité; ou (iv) toute réclamation selon laquelle votre Contenu Utilisateur a causé un dommage à un tiers. Cette obligation de défense et d'indemnisation survivra à ces Conditions et à votre utilisation du Service.`
        },
        {
          title: "13. Loi Applicable",
          content: `Ces Conditions seront régies et interprétées conformément aux lois de [Votre Pays], sans égard à ses dispositions en matière de conflit de lois. Notre incapacité à faire respecter tout droit ou disposition de ces Conditions ne sera pas considérée comme une renonciation à ces droits.`
        },
        {
          title: "14. Modifications des Conditions",
          content: `Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer ces Conditions à tout moment. Si une révision est importante, nous fournirons un préavis d'au moins 30 jours avant que de nouvelles conditions ne prennent effet. Ce qui constitue un changement important sera déterminé à notre seule discrétion.

En continuant à accéder ou à utiliser notre Service après que des révisions soient devenues effectives, vous acceptez d'être lié par les conditions révisées. Si vous n'acceptez pas les nouvelles conditions, vous n'êtes plus autorisé à utiliser le Service.`
        },
        {
          title: "15. Contactez-Nous",
          content: `Si vous avez des questions concernant ces Conditions, veuillez nous contacter à legal@popsales.io.`
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

export default TermsPage;