import { FaBasketball, FaVolleyball, FaAppleWhole } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";

export type Item = {
  icon: typeof FaBasketball; // Using a specific icon type as reference
  title: string;
  description: string;
};

export const chooseUsItems: Item[] = [
  {
    icon: FaBasketball,
    title: "Basketbol",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore facilisis.",
  },
  {
    icon: FaVolleyball,
    title: "Voleybol",
    description:
      "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
  },
  {
    icon: FaAppleWhole,
    title: "Beslenme Planı",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore facilisis.",
  },
  {
    icon: FaHeartbeat,
    title: "Kardiyo Programı",
    description:
      "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
  },
];
