// Tout le contenu du portfolio est ici.
// Pour mettre à jour le site, on modifie ce fichier — pas les composants.

export const profile = {
  name: 'Yiboula Carine Jennifer BATIONO',
  shortName: 'Carine Jennifer',
  role: 'Étudiante en Licence 3 Génie Informatique',
  location: 'Ouagadougou, Burkina Faso',
  email: 'jenniferbationo2@gmail.com',
  // Liens laissés vides = boutons masqués automatiquement
  github: 'https://github.com/jenniferbationo2-tech',
  linkedin: 'https://www.linkedin.com/in/jennifer-bationo-2b6879352',
  currently: 'Stagiaire IA / Computer Vision — Orange Digital Center',
  // Fichiers placés dans le dossier public/
  portrait: '/moi4.png',
  cv: '/cv/BATIONO_Carine_Jennifer_CV_2026.pdf',
}

// Nom du fichier tel qu'il sera enregistré sur l'ordinateur du visiteur
export const cvFileName = 'CV_Carine_Jennifer_BATIONO.pdf'

export const navLinks = [
  { id: 'apropos', label: 'À propos' },
  { id: 'competences', label: 'Compétences' },
  { id: 'projets', label: 'Projets' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  text: [
    "Étudiante en 3e année de Licence en Génie Informatique à l'Université Aube Nouvelle, je construis des solutions qui vont du site web à la vision par ordinateur, en passant par l'infrastructure réseau.",
    "Créative et autodidacte, j'aime partir d'un problème réel et le transformer en une solution concrète et fonctionnelle.",
  ],
  pillars: [
    {
      icon: 'code',
      title: 'Développement Web',
      text: "Des plateformes complètes, du back-end Laravel/Node.js aux interfaces React.",
    },
    {
      icon: 'brain',
      title: 'Data & IA',
      text: 'Analyse de données, Machine Learning et détection d’objets avec YOLO.',
    },
    {
      icon: 'network',
      title: 'Réseaux & Systèmes',
      text: 'Câblage, routeurs, Wifizone, portails captifs et cloud AWS.',
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

export const skills = [
  {
    category: 'Développement Web',
    items: ['React', 'JavaScript', 'PHP', 'Laravel', 'Node.js', 'Inertia.js', 'WordPress'],
  },
  {
    category: 'Python & Data Science',
    items: ['Python', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'Django', 'Machine Learning'],
  },
  {
    category: 'IA & Computer Vision',
    items: ['YOLO', 'Computer Vision'],
  },
  {
    category: 'Développement Mobile',
    items: ['Flutter', 'Dart'],
  },
  {
    category: 'Réseaux & Systèmes',
    items: ['Cisco Packet Tracer', 'AWS Cloud (VPC)', 'Câblage structuré', 'Wifizone', 'Portails captifs'],
  },
  {
    category: 'Conception & Modélisation',
    items: ['Merise', 'UML'],
  },
]

// type : sert au filtre de la section Projets
// image : capture d'écran placée dans public/projets/ (si absente, un visuel de remplacement s'affiche)
export const projects = [
  {
    title: 'VEXDRONE',
    category: 'IA / Computer Vision',
    type: 'ia',
    featured: true,
    context: 'Orange Digital Center — Orange Summer Challenge 2026',
    description:
      "Système intelligent d'inspection des infrastructures électriques : détection automatique d'anomalies sur pylônes et lignes par vision par ordinateur, avec une application web de gestion et d'alerte.",
    stack: ['Python', 'YOLO', 'Computer Vision', 'Frontend web'],
    image: '/projets/vexdrone.png',
    link: '',
  },
  {
    title: 'MoovFlow',
    category: 'Plateforme web',
    type: 'web',
    context: 'Moov Africa Burkina — Stage de fin de cycle',
    description:
      "Plateforme web d'administration et de gestion des événements d'entreprise, conçue et réalisée de bout en bout.",
    stack: ['Laravel', 'PHP', 'Vue.js', 'Inertia.js', 'Tailwind CSS', 'MySQL'],
    image: '/projets/moovflow.png',
    link: '',
  },
  {
    title: 'Sites ABCA & IAS Tech',
    category: 'Sites web',
    type: 'web',
    context: 'Impact Africa Solution Technology',
    description:
      "Conception et réalisation intégrale du site de l'ABCA et du site officiel de l'entreprise, plus la migration du site du FESPACO et la mise en production de celui de la Cinémathèque Africaine.",
    stack: ['WordPress', 'Hébergement', 'Migration'],
    image: '/projets/ias-tech.png',
    link: 'https://cinemathequeafricaine.bf/',
  },
  {
    title: 'Site de la Clinique Médical Nathan',
    category: 'Sites web',
    type: 'web',
    context: 'Clinique Médical Nathan',
    description:
      "Conception et réalisation intégrale du site de la clinique",
    stack: ['React', 'TypeScript', 'Hébergement', 'Migration'],
    image: '/projets/clinique-nathan.png',
    link: 'https://clinique-medical-nathan.vercel.app/',
  },
  {
    title: 'Gestion Hôtelière',
    category: 'Projet académique',
    type: 'academique',
    context: 'Université Aube Nouvelle',
    description:
      'Application web de réservation et de gestion des chambres, avec gestion des clients et facturation automatisée. Travail en équipe sur l’architecture logicielle.',
    stack: [],
    image: '/projets/gestion-hoteliere.png',
    link: '',
  },
  {
    title: 'Gestion Immobilière',
    category: 'Projet académique',
    type: 'academique',
    context: 'Université Aube Nouvelle',
    description:
      'Plateforme de gestion de biens immobiliers : suivi des propriétés, locataires et contrats de bail, avec des interfaces adaptatives.',
    stack: [],
    image: '/projets/gestion-immobiliere.png',
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
      "Système de détection d'anomalies sur pylônes et lignes électriques par vision par ordinateur (YOLO).",
      "Conception et intégration frontend de l'application web de gestion et d'alerte.",
    ],
  },
  {
    period: 'Avr. 2026 — Juil. 2026',
    title: 'Technicienne Développeuse & Réseau',
    org: 'Impact Africa Solution Technology (IAS Tech)',
    points: [
      "Réalisation des sites de l'ABCA et de l'entreprise (WordPress).",
      'Migration du site du FESPACO, mise en production du site de la Cinémathèque Africaine.',
      'Câblage structuré, configuration de routeurs, déploiement de Wifizone avec portails captifs.',
    ],
  },
  {
    period: 'Mars 2026 — Juin 2026',
    title: 'Stagiaire Développeuse — Stage de fin de cycle',
    org: 'Moov Africa Burkina',
    points: ["Conception et réalisation intégrale de MoovFlow, plateforme de gestion des événements d'entreprise."],
  },
  {
    period: 'Août 2024 — Oct. 2024',
    title: 'Technicienne Stagiaire Polyvalente',
    org: 'Flashtech',
    points: ['Développement web, maintenance informatique, dépannage réseau et création de supports infographiques.'],
  },
]

export const education = [
  {
    period: '2025 — 2026',
    title: 'Licence 3 en Génie Informatique',
    org: 'Université Aube Nouvelle (U-AUBEN), Ouagadougou',
    status: 'En cours',
  },
  {
    period: '2024 — 2025',
    title: 'Licence 2 en Génie Informatique',
    org: 'Université Aube Nouvelle (U-AUBEN), Ouagadougou',
    status: 'Validé',
  },
  {
    period: '2023 — 2024',
    title: 'Licence 1 en Génie Informatique',
    org: 'Université Aube Nouvelle (U-AUBEN), Ouagadougou',
    status: 'Validé',
  },
]

// image : photo/scan du certificat placé dans public/certifications/
export const certifications = [
  { title: 'Formation Python Data Analyst', org: 'REESO', date: 'Janv. — Avr. 2026', image: '/certifications/python-data-analyst.jpg' },
  { title: 'Certificat Data Science & IA', org: 'GO AI Academy', date: 'Août 2025', image: '/certifications/data-science-ia.jpg' },
  { title: 'Sécurité Réseau Cisco', org: 'Coursera / ODC', date: 'Oct. 2025', image: '/certifications/securite-reseau-cisco.jpg' },
  { title: 'Décryptage avec Python', org: 'Coursera / ODC', date: 'Sept. 2025', image: '/certifications/decryptage-python.jpg' },
  { title: 'VPC sur AWS Cloud', org: 'Coursera / ODC', date: 'Sept. 2025', image: '/certifications/vpc-aws.jpg' },
  { title: 'Sensibilisation Cybersécurité', org: 'Ministère de la Transition Digitale', date: 'Mai 2025', image: '/certifications/cybersecurite.jpg' },
]
