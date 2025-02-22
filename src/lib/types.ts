import { FaBasketball } from "react-icons/fa6";

export type Service = {
  title: string;
  description: string;
  image: string;
  order: number;
};
export type Item = {
  icon: typeof FaBasketball; // Using a specific icon type as reference
  title: string;
  description: string;
};
export type ClassCategory = {
  name: string;
  minAge: number;
  maxAge: number;
};
export interface NavLink {
  href?: string; // Optional href for dropdown links
  label: string; // Required label for all links
  dropdown?: NavLink[]; // Optional dropdown property for links with submenus
}
export type New = {
  title: string;
  date: string;
  description: string;
  imageUrls: string[];
};
export type TimeTableData = {
  day: string;
  time: string;
  category: string;
};
