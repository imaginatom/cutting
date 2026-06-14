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
      "Collection hiver. Laines brutes et coupes nettes, teintes dans la masse. Chaque pièce porte un numéro.hiver. Laines brutes et coupes nettes Chaque pièce porte un numéro.hiver",
      "Séries de cinquante, fabriquées à Roubaix. Expédiées sous dix jours. Aucune reproduction.cinquante, fabriquées à Roubaix. Expédiées sous Aucune reproduction",
    ],
  },
  bestSellers: {
    title: "Bestsellers",
    feature: {
      image: {
        src: "/images/coldwell-hero.png",
        alt: "Coldwell — pièce phare",
      },
      title: "Manteau N°01",
      subtitle: "Laine vierge, doublure soie. Série de cinquante.",
    },
  },
} as const;
