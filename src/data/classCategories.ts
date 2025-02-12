export const basketballClassesCategories = [
  { name: "Mini", minAge: 8, maxAge: 10 },
  { name: "Midi", minAge: 10, maxAge: 12 },
  { name: "Maxi", minAge: 12, maxAge: 14 },
  { name: "Teen", minAge: 14, maxAge: 16 },
  { name: "Senior", minAge: 16, maxAge: 18 },
  { name: "Adult", minAge: 18, maxAge: 100 },
];
export const volleyballClassesClassesCategories = [
    { name: "Mini", minAge: 8, maxAge: 10 },
    { name: "Midi", minAge: 10, maxAge: 12 },
    { name: "Maxi", minAge: 12, maxAge: 14 },
    { name: "Teen", minAge: 14, maxAge: 16 },
    { name: "Senior", minAge: 16, maxAge: 18 },
    { name: "Adult", minAge: 18, maxAge: 100 },
  ];

export type ClassCategory = (typeof basketballClassesCategories)[number];
