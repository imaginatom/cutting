/** Single source of truth for everything rendered on the site. Hardcoded — no CMS. */
export const content = {
  nav: {
    cart: "Cart",
    menu: "Menu",
  },
  hero: {
    title: "Coldwell",
    image: {
      src: "/images/coldwell-hero.jpg",
      alt: "Coldwell — campagne hiver",
    },
    // band copy: [0] center column, [1] right column
    intro: [
      "Collection hiver. Denim dense, lignes droites, pièces numérotées.",
      "Séries de cinquante, coupées à Roubaix. Aucun réassort.",
    ],
  },
  doctrine: {
    eyebrow: "Hiver 26",
    title: "froid net lent",
    thesis: "Une garde-robe réduite à l’os. Rien ne cherche à séduire vite.",
    image: {
      alt: "Coldwell — silhouette droite en denim",
    },
    principles: [
      {
        index: "01",
        title: "Masse",
        text: "Des tissus denses. Le vêtement garde son aplomb quand le corps bouge.",
      },
      {
        index: "02",
        title: "Trait",
        text: "Des lignes franches, coupées sans décor. Le volume dit le reste.",
      },
      {
        index: "03",
        title: "Série",
        text: "Peu de pièces. Un bain, une coupe, une trace nette dans l’hiver.",
      },
    ],
    footnote: "Roubaix / série courte / pièces numérotées",
  },
  bestSellers: {
    title: "Pièces tenues",
    feature: {
      image: {
        src: "/images/coldwell-hero.png",
        alt: "Coldwell — pièce phare",
      },
      title: "Manteau N°01",
      subtitle: "Laine vierge",
      price: "490 €",
    },
    // pair under the feature: left third open, two portrait pieces on the right two thirds
    pair: [
      {
        image: { src: "/images/coldwell-hero.png", alt: "Coldwell — pièce N°02" },
        title: "Veste N°02",
        subtitle: "Laine bouillie",
        price: "320 €",
      },
      {
        image: { src: "/images/coldwell-hero.png", alt: "Coldwell — pièce N°03" },
        title: "Pull N°03",
        subtitle: "Mérinos extrafin",
        price: "180 €",
      },
    ],
  },
  protocol: {
    eyebrow: "Protocole",
    title: "La coupe se vérifie à plat.",
    body: [
      "Contrôle du tombé après lavage. Reprise des épaules, longueur tenue au millimètre, aucun volume corrigé par doublure.",
      "Le vêtement sort seulement quand il garde sa ligne fermé, ouvert, porté.",
    ],
    specs: [
      { label: "Matière", value: "Denim 14 oz" },
      { label: "Lavage", value: "Froid / pierre claire" },
      { label: "Montage", value: "Point noué, fil ton sur ton" },
      { label: "Contrôle", value: "3 passages atelier" },
    ],
    metrics: [
      { value: "50", label: "pièces par forme" },
      { value: "12", label: "jours atelier" },
      { value: "01", label: "bain par série" },
    ],
    image: {
      alt: "Coldwell — essayage atelier",
    },
  },
  store: {
    eyebrow: "Boutique",
    title: "Essayer avant le bruit.",
    intro: "La boutique reçoit sur créneau court. Lumière froide, portants espacés, toutes les tailles sorties à la demande.",
    details: [
      { label: "Adresse", value: "12 rue de la Manufacture, Roubaix" },
      { label: "Ouverture", value: "Jeu - Sam / 11:00 - 18:00" },
      { label: "Accès", value: "Sur rendez-vous, série en cours uniquement" },
    ],
    cta: "Réserver un créneau",
    vertical: "Team Denim",
    video: {
      src: "/videos/store.mp4",
      alt: "Coldwell — boutique",
    },
  },
  footer: {
    brand: "Coldwell",
    atelier: {
      title: "Atelier",
      lines: ["12 rue de la Manufacture", "59100 Roubaix"],
    },
    dispatch: {
      title: "Expédition",
      line: "Sous dix jours ouvrés",
    },
    contact: "contact@coldwell.fr",
    links: [
      { label: "Livraison", href: "#" },
      { label: "Retours", href: "#" },
      { label: "Contact", href: "#contact" },
      { label: "Mentions", href: "#" },
    ],
    copyright: "© 2026 Coldwell",
  },
} as const;
