import { FaBasketball, FaVolleyball } from "react-icons/fa6";

export const pricingCards = [
  {
    subtitle: "Grup Dersleri",
    title: "Basketbol",

    features: [
      "Haftada 3 ders",
      "Takım antrenmanları",
      "Spor salonunda",
      "Takım çalışması odaklı",
      "Antrenör desteği",
      "Teknik beceri geliştirme",
    ],
    icon: FaBasketball,
  },
  {
    subtitle: "Grup Dersleri",
    title: "Voleybol",

    features: [
      "Haftada 3 ders",
      "Takım antrenmanları",
      "Spor salonunda",
      "Eğlenceli oyunlar",
      "Antrenör desteği",
      "Koordinasyon geliştirme",
    ],
    icon: FaVolleyball,
  },
  {
    subtitle: "Özel Dersler",
    title: "Kişiye Özel",

    features: [
      "Uzman antrenör eşliğinde",
      "Kişiye özel eğitim",
      "Spor salonunda",

      "Hedefe yönelik antrenman programı",
      "Teknik analiz ve geri bildirim",
      "Bireysel gelişim odaklı",
    ],
    icon: [FaBasketball, FaVolleyball],
  },
];
