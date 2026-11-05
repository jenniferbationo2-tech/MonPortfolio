// Tout le contenu du portfolio est ici.
// Pour mettre à jour le site, on modifie ce fichier — pas les composants.

export const profile = {
  name: 'Yiboula Carine Jennifer BATIONO',
  // Nom affiché sur l'intro : les initiales de chaque mot forment la signature BYCJ
  signatureName: 'BATIONO Yiboula Carine Jennifer',
  shortName: 'Carine Jennifer',
  role: 'Ingénieure des Travaux en Informatique',
  location: 'Ouagadougou, Burkina Faso',
  email: 'jenniferbationo2@gmail.com',
  // Liens laissés vides = boutons masqués automatiquement
  github: 'https://github.com/jenniferbationo2-tech',
  linkedin: 'https://www.linkedin.com/in/jennifer-bationo-2b6879352',
  currently: 'En stage IA / Computer Vision chez Orange Digital Center',
  // Fichiers placés dans le dossier public/
  portrait: '/moiTop.jpg',
  cv: '/cv/BATIONO_Yiboula_Carine_Jennifer.pdf',
}

// Nom du fichier tel qu'il sera enregistré sur l'ordinateur du visiteur
export const cvFileName = 'BATIONO_Yiboula_Carine_Jennifer.pdf'

export const navLinks = [
  { id: 'apropos', label: 'À propos' },
  { id: 'competences', label: 'Compétences' },
  { id: 'projets', label: 'Projets' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  text: [
    "Je suis Carine Jennifer, titulaire d'un Diplôme d'Ingénieur des Travaux en Informatique. Mon terrain de jeu ? Tout ce qui va du site web à l'intelligence artificielle, en passant par le réseau qui relie le tout.",
    "Créative et passionnée, je pars toujours d'un besoin réel. Ce que je construis doit vous simplifier la vie, pas la compliquer.",
  ],
  pillars: [
    {
      icon: 'code',
      title: 'Développement Web',
      text: 'Des plateformes complètes, pensées pour celles et ceux qui les utilisent, du back-end Laravel/Node.js aux interfaces React.',
    },
    {
      icon: 'brain',
      title: 'Data & IA',
      text: 'Des données qui parlent et des modèles qui voient : analyse, Machine Learning et détection d’objets avec YOLO.',
    },
    {
      icon: 'network',
      title: 'Réseaux & Systèmes',
      text: 'Des connexions fiables, du câble au cloud : routeurs, Wifizone, portails captifs et AWS.',
    },
  ],
  languages: [
    { name: 'Français', level: 'Courant' },
    { name: 'Dioula', level: 'Courant' },
    { name: 'Anglais', level: 'Intermédiaire' },
    { name: 'Mooré', level: 'Intermédiaire' },
    { name: 'Gourounsi', level: 'Intermédiaire' },
  ],
}

// icon : icône de la catégorie ; les logos des compétences sont dans skillLogos.js
export const skills = [
  {
    category: 'Développement Web',
    icon: 'code',
    items: ['React', 'JavaScript', 'PHP', 'Laravel', 'Node.js', 'Inertia.js', 'WordPress'],
  },
  {
    category: 'Python & Data Science',
    icon: 'chart',
    items: ['Python', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'Django', 'Machine Learning'],
  },
  {
    category: 'IA & Computer Vision',
    icon: 'brain',
    items: ['YOLO', 'Computer Vision'],
  },
  {
    category: 'Développement Mobile',
    icon: 'phone',
    items: ['Flutter', 'Dart'],
  },
  {
    category: 'Réseaux & Systèmes',
    icon: 'network',
    items: ['Cisco Packet Tracer', 'AWS Cloud (VPC)', 'Câblage structuré', 'Wifizone', 'Portails captifs'],
  },
  {
    category: 'Conception & Modélisation',
    icon: 'layers',
    items: ['Merise', 'UML'],
  },
]

// type : sert au filtre de la section Projets
// icon : icône affichée en en-tête de la carte (voir components/ui/Icon.jsx)
// image : capture d'écran optionnelle, ex. '/projets/moovflow.png' (fichier dans public/projets/).
//         Vide = carte sans image, avec en-tête icône.
export const projects = [
  {
    title: 'VEXDRONE',
    category: 'IA / Computer Vision',
    type: 'ia',
    featured: true,
    context: 'Orange Digital Center — Orange Summer Challenge 2026',
    description:
      "Repérer un défaut sur une ligne électrique avant qu'il ne devienne une panne : c'est la mission de VEXDRONE. Le système détecte automatiquement les anomalies sur les pylônes et les lignes par vision par ordinateur, puis alerte les équipes via une application web.",
    stack: ['Python', 'YOLO', 'Computer Vision', 'Frontend web'],
    icon: 'eye',
    image: '',
    link: '',
  },
  {
    title: 'MoovFlow',
    category: 'Plateforme web',
    type: 'web',
    context: 'Moov Africa Burkina — Stage de fin de cycle',
    description:
      "Une seule plateforme pour administrer et suivre tous les événements d'une entreprise. J'ai conçu et développé MoovFlow de A à Z pendant mon stage de fin de cycle.",
    stack: ['Laravel', 'PHP', 'Vue.js', 'Inertia.js', 'Tailwind CSS', 'MySQL'],
    icon: 'calendar',
    image: '',
    link: '',
  },
  {
    title: 'Sites ABCA & IAS Tech',
    category: 'Sites web',
    type: 'web',
    context: 'Impact Africa Solution Technology',
    description:
      "Du FESPACO à la Cinémathèque Africaine, des sites qui portent l'image de grandes institutions. J'ai créé de A à Z les sites de l'ABCA et d'IAS Tech, migré celui du FESPACO et mis en production celui de la Cinémathèque Africaine.",
    stack: ['WordPress', 'Hébergement', 'Migration'],
    icon: 'globe',
    image: '',
    link: 'https://cinemathequeafricaine.bf/',
  },
  {
    title: 'Site de la Clinique Médical Nathan',
    category: 'Sites web',
    type: 'web',
    context: 'Clinique Médical Nathan',
    description:
      "Un site qui rassure les patients dès la première visite. Je l'ai conçu et réalisé de A à Z pour la clinique, en React et TypeScript.",
    stack: ['React', 'TypeScript', 'Hébergement', 'Migration'],
    icon: 'health',
    image: '',
    link: 'https://clinique-medical-nathan.vercel.app/',
  },
  {
    title: 'Gestion Hôtelière',
    category: 'Projet académique',
    type: 'academique',
    context: 'Université Aube Nouvelle',
    description:
      'Réserver une chambre, suivre ses clients, facturer automatiquement : tout un hôtel géré depuis une seule application web. Un projet d’équipe où j’ai contribué à l’architecture logicielle.',
    stack: [],
    icon: 'building',
    image: '',
    link: '',
  },
  {
    title: 'Gestion Immobilière',
    category: 'Projet académique',
    type: 'academique',
    context: 'Université Aube Nouvelle',
    description:
      'Propriétés, locataires, contrats de bail : tout le suivi d’un parc immobilier réuni sur une seule plateforme, avec des interfaces qui s’adaptent à chaque écran.',
    stack: [],
    icon: 'home',
    image: '',
    link: '',
  },
]

export const projectFilters = [
  { id: 'tous', label: 'Tous' },
  { id: 'ia', label: 'IA' },
  { id: 'web', label: 'Web' },
  { id: 'academique', label: 'Académique' },
]

export const experiences = [
  {
    period: '2026 — En cours',
    title: 'Stagiaire IA / Computer Vision — VEXDRONE',
    org: 'Orange Digital Center · Orange Summer Challenge',
    points: [
      "Je développe un système qui détecte les anomalies sur les pylônes et les lignes électriques grâce à la vision par ordinateur (YOLO).",
      "Je conçois et j'intègre l'interface de l'application web de gestion et d'alerte.",
    ],
  },
  {
    period: 'Avr. 2026 — Juil. 2026',
    title: 'Technicienne Développeuse & Réseau',
    org: 'Impact Africa Solution Technology (IAS Tech)',
    points: [
      "J'ai créé de A à Z les sites de l'ABCA et d'IAS Tech sous WordPress.",
      "J'ai migré le site du FESPACO et mis en production celui de la Cinémathèque Africaine.",
      "J'ai déployé des Wifizones avec portails captifs, configuré routeurs et points d'accès, et réalisé du câblage structuré.",
    ],
  },
  {
    period: 'Mars 2026 — Juin 2026',
    title: 'Stagiaire Développeuse — Stage de fin de cycle',
    org: 'Moov Africa Burkina',
    points: ["J'ai conçu et développé MoovFlow de A à Z : la plateforme qui centralise l'administration des événements de l'entreprise."],
  },
  {
    period: 'Août 2024 — Oct. 2024',
    title: 'Technicienne Stagiaire Polyvalente',
    org: 'Flashtech',
    points: ['Ma première immersion sur le terrain : développement web, maintenance informatique, dépannage réseau et création de supports graphiques.'],
  },
]

// status : 'Diplômée' et 'En cours' s'affichent en orange, le reste en bleu
export const education = [
  {
    period: '2023 — 2026',
    title: "Diplôme d'Ingénieur des Travaux en Informatique",
    org: 'Université Aube Nouvelle (U-AUBEN), Ouagadougou',
    status: 'Diplômée',
  },
]

// image : photo/scan du certificat placé dans public/certifications/
export const certifications = [
  { title: "Compétences pratiques en IA pour le travail et l'entrepreneuriat", org: 'ImpactEra / World Bank Group / Microsoft Elevate', date: 'Oct. 2026', image: '/certifications/impactera-ia-jour2.jpeg' },
  { title: "Fondamentaux de l'IA et opportunités pour l'Afrique", org: 'ImpactEra / World Bank Group / Microsoft Elevate', date: 'Oct. 2026', image: '/certifications/impactera-ia-jour1.jpeg' },
  { title: 'Formation Python Data Analyst', org: 'REESO', date: 'Janv. — Avr. 2026', image: '/certifications/python-data-analyst.jpg' },
  { title: 'Certificat Data Science & IA', org: 'GO AI Academy', date: 'Août 2025', image: '/certifications/GoIA.png' },
  { title: 'Sécurité Réseau Cisco', org: 'Coursera / ODC', date: 'Oct. 2025', image: '/certifications/ciscocoursera.jpeg' },
  { title: 'Décryptage avec Python', org: 'Coursera / ODC', date: 'Sept. 2025', image: '/certifications/pythoncoursera.png' },
  { title: 'VPC sur AWS Cloud', org: 'Coursera / ODC', date: 'Sept. 2025', image: '/certifications/AWScoursera.jpeg' },
  { title: 'Sensibilisation Cybersécurité', org: 'Ministère de la Transition Digitale', date: 'Mai 2025', image: '/certifications/sécurite.jpeg' },
]
