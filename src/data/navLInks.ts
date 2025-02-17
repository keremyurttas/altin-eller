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

  { href: "/our-team", label: "EKİBİMİZ" },
  { href: "/contact-us", label: "BİZE ULAŞIN" },
  {
    label: "DİĞER SAYFALAR",
    dropdown: [
      { href: "/registiration-files", label: "Kayıt Belgeleri" },
      { href: "/our-camps", label: "Kamplarımız" },
      { href: "/news", label: "Haberler" },
        { href: "/services", label: "Hizmetlerimiz" },
    ],
  },
];

export type NavLink = typeof navLinks[number];