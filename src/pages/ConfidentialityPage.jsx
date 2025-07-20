import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const ConfidentialityPage = () => {
  const { language } = useLanguage();
  
  const translations = {
    en: {
      title: "GDPR Compliance",
      lastUpdated: "Last Updated: January 2024",
      sections: [
        {
          title: "1. Introduction",
          content: `PopSales is committed to protecting your privacy and ensuring compliance with the General Data Protection Regulation (GDPR). This document outlines how we adhere to GDPR principles and protect your personal data.`
        },
        {
          title: "2. Data Controller",
          content: `PopSales acts as a data controller for personal data collected through our website and services. As a data controller, we are responsible for determining the purposes and means of processing personal data.`
        },
        {
          title: "3. Your Rights Under GDPR",
          content: `Under GDPR, you have the following rights:

• Right to Access: You can request a copy of your personal data.
• Right to Rectification: You can request corrections to inaccurate personal data.
• Right to Erasure: You can request deletion of your personal data in certain circumstances.
• Right to Restrict Processing: You can request restriction of processing of your personal data.
• Right to Data Portability: You can request transfer of your personal data.
• Right to Object: You can object to processing of your personal data.
• Rights Related to Automated Decision Making: You can request human intervention in automated decisions.

To exercise any of these rights, please contact us at gdpr@popsales.io.`
        },
        {
          title: "4. Data Processing Principles",
          content: `We process personal data in accordance with these principles:

• Lawfulness, Fairness, and Transparency: We process data legally, fairly, and transparently.
• Purpose Limitation: We collect data for specified, explicit, and legitimate purposes.
• Data Minimization: We limit data collection to what is necessary.
• Accuracy: We keep personal data accurate and up-to-date.
• Storage Limitation: We store data only as long as necessary.
• Integrity and Confidentiality: We ensure appropriate security of personal data.
• Accountability: We demonstrate compliance with these principles.`
        },
        {
          title: "5. Legal Basis for Processing",
          content: `We process personal data based on one of the following legal bases:

• Consent: You have given clear consent for us to process your personal data for a specific purpose.
• Contract: Processing is necessary for a contract with you or to take steps at your request before entering into a contract.
• Legal Obligation: Processing is necessary for us to comply with the law.
• Legitimate Interests: Processing is necessary for our legitimate interests or those of a third party.`
        },
        {
          title: "6. International Data Transfers",
          content: `When we transfer personal data outside the European Economic Area (EEA), we ensure appropriate safeguards are in place, such as:

• Standard Contractual Clauses approved by the European Commission
• Adequacy decisions by the European Commission
• Binding Corporate Rules for transfers within a corporate group

We only transfer data to countries or organizations that provide an adequate level of data protection.`
        },
        {
          title: "7. Data Protection Impact Assessments",
          content: `For processing operations that may result in high risk to individuals' rights and freedoms, we conduct Data Protection Impact Assessments (DPIAs) to identify and minimize data protection risks.`
        },
        {
          title: "8. Data Breach Notification",
          content: `In the event of a personal data breach, we will notify the relevant supervisory authority within 72 hours of becoming aware of the breach, where feasible. If the breach is likely to result in high risk to your rights and freedoms, we will also notify you without undue delay.`
        },
        {
          title: "9. Data Protection Officer",
          content: `For questions about our GDPR compliance or to exercise your rights, please contact our Data Protection Officer at dpo@popsales.io.`
        },
        {
          title: "10. Updates to This Policy",
          content: `We may update this GDPR compliance statement from time to time. Any changes will be posted on this page with a revised "Last Updated" date.`
        }
      ]
    },
    fr: {
      title: "Conformité au RGPD",
      lastUpdated: "Dernière mise à jour : Janvier 2024",
      sections: [
        {
          title: "1. Introduction",
          content: `PopSales s'engage à protéger votre vie privée et à assurer la conformité avec le Règlement Général sur la Protection des Données (RGPD). Ce document décrit comment nous adhérons aux principes du RGPD et protégeons vos données personnelles.`
        },
        {
          title: "2. Responsable du Traitement",
          content: `PopSales agit en tant que responsable du traitement pour les données personnelles collectées via notre site web et nos services. En tant que responsable du traitement, nous sommes chargés de déterminer les finalités et les moyens du traitement des données personnelles.`
        },
        {
          title: "3. Vos Droits selon le RGPD",
          content: `Selon le RGPD, vous disposez des droits suivants :

• Droit d'Accès : Vous pouvez demander une copie de vos données personnelles.
• Droit de Rectification : Vous pouvez demander la correction de données personnelles inexactes.
• Droit à l'Effacement : Vous pouvez demander la suppression de vos données personnelles dans certaines circonstances.
• Droit à la Limitation du Traitement : Vous pouvez demander la limitation du traitement de vos données personnelles.
• Droit à la Portabilité des Données : Vous pouvez demander le transfert de vos données personnelles.
• Droit d'Opposition : Vous pouvez vous opposer au traitement de vos données personnelles.
• Droits Liés à la Prise de Décision Automatisée : Vous pouvez demander une intervention humaine dans les décisions automatisées.

Pour exercer l'un de ces droits, veuillez nous contacter à gdpr@popsales.io.`
        },
        {
          title: "4. Principes de Traitement des Données",
          content: `Nous traitons les données personnelles conformément à ces principes :

• Licéité, Loyauté et Transparence : Nous traitons les données de manière licite, loyale et transparente.
• Limitation des Finalités : Nous collectons les données pour des finalités déterminées, explicites et légitimes.
• Minimisation des Données : Nous limitons la collecte de données à ce qui est nécessaire.
• Exactitude : Nous maintenons les données personnelles exactes et à jour.
• Limitation de la Conservation : Nous ne conservons les données que le temps nécessaire.
• Intégrité et Confidentialité : Nous assurons une sécurité appropriée des données personnelles.
• Responsabilité : Nous démontrons la conformité à ces principes.`
        },
        {
          title: "5. Base Juridique du Traitement",
          content: `Nous traitons les données personnelles sur la base de l'une des bases juridiques suivantes :

• Consentement : Vous avez donné un consentement clair pour que nous traitions vos données personnelles à une fin spécifique.
• Contrat : Le traitement est nécessaire à l'exécution d'un contrat avec vous ou pour prendre des mesures à votre demande avant de conclure un contrat.
• Obligation Légale : Le traitement est nécessaire pour nous conformer à la loi.
• Intérêts Légitimes : Le traitement est nécessaire à nos intérêts légitimes ou à ceux d'un tiers.`
        },
        {
          title: "6. Transferts Internationaux de Données",
          content: `Lorsque nous transférons des données personnelles en dehors de l'Espace Économique Européen (EEE), nous veillons à ce que des garanties appropriées soient en place, telles que :

• Clauses Contractuelles Types approuvées par la Commission Européenne
• Décisions d'adéquation de la Commission Européenne
• Règles d'Entreprise Contraignantes pour les transferts au sein d'un groupe d'entreprises

Nous ne transférons des données qu'à des pays ou des organisations qui fournissent un niveau adéquat de protection des données.`
        },
        {
          title: "7. Analyses d'Impact sur la Protection des Données",
          content: `Pour les opérations de traitement susceptibles d'engendrer un risque élevé pour les droits et libertés des personnes, nous effectuons des Analyses d'Impact sur la Protection des Données (AIPD) pour identifier et minimiser les risques liés à la protection des données.`
        },
        {
          title: "8. Notification de Violation de Données",
          content: `En cas de violation de données personnelles, nous notifierons l'autorité de contrôle compétente dans les 72 heures suivant la prise de connaissance de la violation, dans la mesure du possible. Si la violation est susceptible d'engendrer un risque élevé pour vos droits et libertés, nous vous en informerons également sans délai indu.`
        },
        {
          title: "9. Délégué à la Protection des Données",
          content: `Pour toute question concernant notre conformité au RGPD ou pour exercer vos droits, veuillez contacter notre Délégué à la Protection des Données à dpo@popsales.io.`
        },
        {
          title: "10. Mises à Jour de Cette Politique",
          content: `Nous pouvons mettre à jour cette déclaration de conformité au RGPD de temps à autre. Toute modification sera publiée sur cette page avec une date de "Dernière mise à jour" révisée.`
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

export default ConfidentialityPage;