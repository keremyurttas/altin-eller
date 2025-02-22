import { FaBasketball, FaVolleyball } from "react-icons/fa6";
import { BsPersonFillUp } from "react-icons/bs";
import { PiTrafficConeFill } from "react-icons/pi";
import { Item } from "@/lib/types";
export const chooseUsItems: Item[] = [
  {
    icon: FaBasketball,
    title: "Basketbol",
    description:
      "Her seviyeden çocuklar için eğlenceli basketbol dersleriyle oyun becerilerini geliştiriyoruz!",
  },
  {
    icon: FaVolleyball,
    title: "Voleybol",
    description:
      "Voleybol antrenmanlarımızda, takım ruhunu ve eğlenceyi bir arada yaşarken yeteneklerinizi geliştiriyoruz.",
  },
  {
    icon: BsPersonFillUp,
    title: "Bireysel Antrenman",
    description:
      "Kişisel antrenmanlarımızla, ihtiyaçlarınıza göre özel programlar ile daha iyi bir sporcu olmanıza yardımcı oluyoruz.",
  },
  {
    icon: PiTrafficConeFill,
    title: "Mevkiye Özel Antrenman",
    description:
      "Oynadığınız pozisyona uygun özel antrenmanlarla, sahadaki performansınızı artırmayı hedefliyoruz.",
  },
];
