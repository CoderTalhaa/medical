// src/data/femaleData.js

// Main Sponsor Category
const mainSponsor = [
  {
    category: "Main Sponsor",
    items: [
      {
        name: "Bayer",
        img: "/img/bayer.png",
        description:
          "A leading life sciences company that focuses on healthcare and agriculture. Bayer is committed to advancing reproductive health, hormonal therapies, and fertility solutions for women. The company develops scientifically backed treatments to improve the quality of life for women, focusing on accessible and innovative healthcare solutions in the female reproductive system and overall women's health.",
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
            name: "Oxolife",
            description:
              "A healthtech startup specializing in innovative solutions for fertility preservation and reproductive health. Oxolife focuses on developing cutting-edge technologies to optimize egg and sperm freezing processes, helping women and men preserve their fertility for future family planning.",
          },
          {
            name: "Rejuven Health",
            description:
              "A health and wellness startup focused on developing non-invasive treatments for female reproductive health, particularly for women experiencing menopause, hormonal imbalances, and age-related reproductive issues.",
          },
          {
            name: "The Blue Box Biomedical Solutions",
            description:
              "A biomedical company focused on providing innovative diagnostic solutions for women’s health, particularly in the areas of fertility, menstrual health, and reproductive system diseases like endometriosis.",
          },
          {
            name: "Frontwave Imaging",
            description:
              "A healthtech startup developing advanced imaging technologies for the early detection and diagnosis of female reproductive system disorders, including ovarian cancer, fibroids, and other gynecological conditions.",
          },
          {
            name: "Dana",
            description:
              "A digital health company offering a platform that uses AI and data analytics to provide personalized health solutions for women. The platform helps with managing reproductive health, including fertility tracking and hormonal health.",
          },
          {
            name: "Apricity",
            description:
              "A fertility-focused startup providing digital health tools that support women undergoing fertility treatments. Apricity offers an AI-powered platform to optimize the IVF process, provide personalized care, and improve the chances of conception.",
          },
        ],
      },
      {
        name: "Pharmaceutical Companies",
        items: [
          {
            name: "Ferrer",
            description:
              "A global pharmaceutical company with a focus on women’s health, Ferrer develops innovative treatments for reproductive health, including hormonal therapies and fertility solutions.",
          },
          {
            name: "Merck",
            description:
              "A leading global pharmaceutical company offering a range of treatments in reproductive health, including solutions for contraception, fertility, and hormone-related disorders affecting women.",
          },
          {
            name: "AbbVie",
            description:
              "A global biopharmaceutical company focused on developing treatments for women’s health conditions, including hormonal therapies, fertility treatments, and management of menopause symptoms.",
          },
        ],
      },
      {
        name: "Research Institutions",
        items: [
          {
            name: "EMBL Barcelona",
            description:
              "A research institution focused on advancing scientific knowledge in the areas of reproductive health, women’s health, and genetic factors influencing fertility and hormonal health.",
          },
          {
            name: "IDIBAPS (Institut d'Investigacions Biomèdiques August Pi i Sunyer)",
            description:
              "A biomedical research institute conducting cutting-edge research on women’s health, including reproductive system diseases, hormonal therapies, and fertility treatments.",
          },
          {
            name: "Sant Pau Research Institute",
            description:
              "A prominent research institute focusing on gynecology, fertility, and reproductive health, with particular emphasis on improving diagnostic and therapeutic solutions for women’s health conditions.",
          },
        ],
      },
      {
        name: "Health Institutions",
        items: [
          {
            name: "Clinica Dexeus Mujer",
            description:
              "A leading healthcare provider specializing in women’s health, including fertility treatments, gynecology, hormonal therapies, and comprehensive care for women throughout all stages of life.",
          },
          {
            name: "Hospital Clinic",
            description:
              "A major medical institution offering specialized care in women’s health, particularly focusing on reproductive health, fertility treatments, and gynecological services.",
          },
          {
            name: "Hospital Sant Pau",
            description:
              "A renowned hospital specializing in reproductive health, providing innovative treatments for women’s fertility, menopause management, and other gynecological conditions.",
          },
        ],
      },
      {
        name: "Government Agencies",
        items: [
          {
            name: "Accio",
            description:
              "The Agency for the Competitiveness of the Catalan Government, supporting innovation and investment in the healthcare sector, particularly in women’s health and reproductive technologies.",
          },
        ],
      },
      {
        name: "Investors",
        items: [
          {
            name: "Acitoflux",
            description:
              "A venture capital firm investing in innovative healthtech startups, with a focus on supporting companies that develop solutions for women’s reproductive health and fertility.",
          },
          {
            name: "Women TechEU",
            description:
              "A European funding initiative aimed at supporting innovative startups founded by women or focused on advancing women’s health, including fertility, hormonal therapies, and reproductive health technologies.",
          },
          {
            name: "Ysios Capital",
            description:
              "A venture capital firm investing in early-stage startups focused on innovation in the healthcare sector, with an emphasis on women’s health, including fertility treatments, gynecology, and reproductive health.",
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
      "Bridging the Gender Health Gap: Advancing Female-Specific Solutions to Disease",
    description:
      "This panel will explore the gender disparities in healthcare, focusing on the unique health challenges women face. Experts will discuss the need for tailored solutions in disease prevention, diagnosis, and treatment, emphasizing the role of research, innovation, and policy reform to bridge the health gap and improve outcomes for women.",
    panelists: [
      "Eva Vila-Massanas, Co-Founder, Juno House",
      "Agnes Arbat, CEO & Co-Founder, Oxolife",
      "Joan Ruis Tarruella, Medical Advisor, Women's Health",
      "Michelle Commane, Head of Business Expansion Strategy, Alexion (AstraZeneca)",
    ],
  },
];

// Open Innovation Challenges Category
const openInnovationChallenges = [
  {
    category: "Open Innovation Challenges",
    items: [
      {
        name: "Enhancing Access to Essential Medicines",
        challengeOwner: "Reig Jofre",
        description:
          "Reig Jofre is dedicated to enhancing access to essential medicines for women's health by developing a digital solution that prevents supply disruptions and optimizes procurement processes. This challenge seeks partners who can leverage data analytics and automation to drive smarter procurement decisions, ensuring that essential medicines, particularly in reproductive health, are available and accessible to patients in a timely manner.",
      },
    ],
    description:
      "Think you have a solution? Innovate and be part of the revolution!",
  },
];

// Export all categories in an object
export const femaleCategories = {
  mainSponsor,
  supportingStakeholders,
  panelDiscussion,
  openInnovationChallenges,
};
