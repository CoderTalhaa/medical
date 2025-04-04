// src/data/lungData.js

// Main Sponsor Category
const mainSponsor = [
  {
    category: "Main Sponsor",
    items: [
      {
        name: "Gebro Pharma",
        img: "/img/gebra.png",
        description:
          "A Spanish pharmaceutical company specializing in the development and commercialization of treatments across various therapeutic areas, including pain management, respiratory conditions, autoimmune diseases, and urogynecology. The company's focus on respiratory diseases aligns with its commitment to improving patient outcomes in lung-related health.",
      },
    ],
  },
];

// Supporting Stakeholders Category
const supportingStakeholders = [
  {
    category: "Supporting Stakeholders",
    subcategories: [
      {
        name: "Startups",
        items: [
          {
            name: "Aqsitania",
            description:
              "Innovates in respiratory medicine by analyzing tidal breathing airflow signals to create a personalized breathing signature, offering effective solutions for diagnosing, monitoring, and telemonitoring respiratory diseases like asthma, COPD, and cystic fibrosis.",
            img: "/lung/Aqsitania.png",
          },
          {
            name: "UniWearables GmbH",
            description:
              "Develops an adhesive patch-worn clinical wearable that continuously monitors vital signs like heart rate, respiratory rate, oxygen saturation, skin temperature, and orientation. It provides real-time data to medical staff and caregivers for 24/7 patient monitoring.",
            img: "/lung/UniWearables.png",
          },
          {
            name: "Hyfe",
            description:
              "Uses Acoustic AI to detect and classify coughs, aiding in the diagnosis of respiratory conditions by analyzing coughing patterns and their relationship to specific diseases.",
            img: "/lung/hyfe.png",
          },
          {
            name: "HumanITcare",
            description:
              "Collaborating with Gebro Pharma, HumanITcare is co-developing a connected health solution for asthma patients, aiming to enhance remote monitoring and personalized care.",
            img: "/lung/HumanITcare.png",
          },
        ],
      },
      {
        name: "Pharmaceutical Companies",
        items: [
          {
            name: "AstraZeneca",
            description:
              "A global pharmaceutical leader focused on developing medicines primarily for respiratory diseases, including asthma and COPD, alongside therapies for oncology, cardiovascular, and renal conditions.",
            img: "/lung/AstraZeneca.png",
          },
          {
            name: "Boehringer Ingelheim",
            description:
              "One of the top 20 pharmaceutical companies globally, working on breakthrough therapies for respiratory diseases, as well as oncology and immunology.",
            img: "/lung/Boehringer.png",
          },
          {
            name: "Almirall",
            description:
              "Specializes in dermatology and respiratory diseases, including treatments for asthma and COPD, focusing on innovative therapeutic options for chronic respiratory conditions.",
            img: "/lung/Almirall.png",
          },
        ],
      },
      {
        name: "Health Institutions",
        items: [
          {
            name: "Mayo Clinic",
            description:
              "Renowned for its comprehensive care, Mayo Clinic provides specialized treatment for respiratory diseases, conducting cutting-edge research in lung health.",
            img: "/lung/Mayo.png",
          },
          {
            name: "Hospital de Sant Pau",
            description:
              "A scientific foundation in Catalonia, dedicated to research in respiratory diseases, particularly in relation to biomedicine and public health.",
            img: "/lung/Hospital.png",
          },
          {
            name: "Hospital German Trias i Pujol",
            description:
              "Offers advanced medical care and specialized services, including research on respiratory conditions like COPD and asthma.",
            img: "/lung/pujol.jpeg",
          },
        ],
      },
      {
        name: "Research Institutions",
        items: [
          {
            name: "University of Barcelona",
            description:
              "Spain’s leading public university, conducting extensive research in respiratory diseases and biomedicine.",
            img: "/lung/UniversityB.png",
          },
          {
            name: "EIT Health",
            description:
              "A network of innovators that works with health startups, promoting digital health innovations and accelerating the development of respiratory disease solutions.",
            img: "/lung/EIT.png",
          },
        ],
      },
      {
        name: "Government Agencies",
        items: [
          {
            name: "BioCat",
            description:
              "A public-private foundation supporting the growth and international positioning of Catalonia’s life sciences and healthcare sector, fostering innovation in respiratory health.",
            img: "/lung/BioCat.jpeg",
          },
        ],
      },
      {
        name: "Philanthropic Foundations",
        items: [
          {
            name: "Lovexair Foundation",
            description:
              "Non-profit organization providing personalized respiratory care by connecting patients with healthcare professionals to support prevention, control, and self-care in respiratory diseases.",
            img: "/lung/Lovexair.jpeg",
          },
          {
            name: "RightCare Foundation",
            description:
              "Focuses on improving patient care through the adoption of new technologies, particularly for underserved populations with respiratory conditions.",
            img: "/lung/RightCare.jpeg",
          },
        ],
      },
      {
        name: "Investors",
        items: [
          {
            name: "CaixaBank",
            description:
              "Dayone is CaixaBank’s initiative to support and guide rapidly growing young businesses, particularly those innovating in healthcare and respiratory health.",
            img: "/lung/CaixaBank.png",
          },
          {
            name: "CRB Health",
            description:
              "A venture capital firm investing in digital health companies, with a particular focus on respiratory technologies.",
            img: "/lung/CRB.jpeg",
          },
          {
            name: "Ship2Ventures",
            description:
              "Invests in high-impact startups, including those focused on improving healthcare delivery for respiratory conditions.",
            img: "/lung/Ship2Ventures.png",
          },
          {
            name: "Digital Pharma Lab",
            description:
              "An accelerator program for pharma companies and pharmatech startups, aiding innovation in respiratory treatments.",
            img: "/lung/Digital.png",
          },
        ],
      },
      {
        name: "Insurance Companies",
        items: [
          {
            name: "Sanitas",
            description:
              "A comprehensive healthcare insurance provider offering health insurance plans, hospitals, medical centers, dental clinics, and elderly care, supporting individuals managing respiratory conditions.",
            img: "/lung/Sanitas.png",
          },
          {
            name: "Occident",
            description:
              "A leading global insurance company, offering a variety of health and life insurance solutions, including for individuals with respiratory diseases.",
            img: "/lung/Occident.png",
          },
        ],
      },
    ],
  },
];

// Panel Discussion Category
const panelDiscussion = [
  {
    category: "Panel Discussion",
    title:
      "Medicine in the Post-Pandemic Era: How the Pandemic Accelerated Innovation and Shaped Healthcare in Respiratory Health",
    description:
      "This panel will discuss how the COVID-19 pandemic catalyzed rapid innovation in respiratory healthcare, including advancements in diagnostics, treatments, and patient management. Topics will cover the accelerated development of vaccines, digital health technologies, and telemedicine, and how these innovations are now being applied in the management of respiratory diseases and other chronic conditions.",
    panelists: [
      {
        name: "César Velasco",
        position: "Science & Innovation Director, AstraZeneca Barcelona",
      },
      {
        name: "Beatriz Arriaga",
        position: "CFO, Teladoc",
      },
      {
        name: "Frank Manning",
        position: "Director, RQMIS",
      },
      {
        name: "Leire Jiménez Ayesa",
        position: "Chief Innovation Officer, MAPFRE",
      },
    ],
  },
];

// Open Innovation Challenges Category
const openInnovationChallenges = [
  {
    category: "Open Innovation Challenges",
    items: [
      {
        name: "AI-powered Technological Solution to Support Smoking Cessation",
        challengeOwner: "Gebro Pharma",
        description:
          "Developers are invited to create an AI-powered solution that assists patients in quitting smoking by offering personalized guidance, real-time tracking, and educational resources to aid in their cessation journey.",
      },
      {
        name: "Intelligent Healthcare Analytics Platform",
        challengeOwner: "Catalan Health Service",
        description:
          "This challenge seeks to develop a Business Intelligence platform utilizing Large Language Models (LLMs) that allows users to interact with healthcare data, generate real-time reports, and ensure data security while managing large-scale data efficiently.",
      },
      {
        name: "Health and Wellness Network at Home",
        challengeOwner: "EAP Sardenya",
        description:
          "This challenge aims to improve home care for the elderly and dependent individuals by creating a coordinated network of home service providers and health professionals. The platform will enhance communication and enable better monitoring, reducing hospitalizations and delays in institutional care.",
      },
    ],
    description:
      "Think you have a solution? Innovate and be part of the revolution!",
  },
];

// Export all categories in an object
export const lungCategories = {
  mainSponsor,
  supportingStakeholders,
  panelDiscussion,
  openInnovationChallenges,
};
