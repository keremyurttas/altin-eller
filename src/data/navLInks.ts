export const navLinks = [
  { href: "/", label: "ANA SAYFA" },
  { href: "/about-us", label: "HAKKIMIZDA" },
  {
    label: "SINIFLAR",
    dropdown: [
      { href: "/basketball-classes", label: "Basketbol" },
      { href: "/volleyball-classes", label: "Voleybol" },
    ],
  },
  { href: "/services", label: "HİZMETLERİMİZ" },
  { href: "/our-team", label: "EKİBİMİZ" },
  { href: "/contact-us", label: "BİZE ULAŞIN" },
];

export type NavLink = typeof navLinks[number];