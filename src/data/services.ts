export const servicesData = [
  {
    title: "Personal training",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut dolore facilisis.",
    image:
      "https://ik.imagekit.io/dyw3rzban/K%C3%9C%C3%87%C3%9CK%20A/_IGP5264.JPG?updatedAt=1739119467711",
    order: 1,
  },
  {
    title: "Group fitness classes",
    description:
      "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus.",
    image:
      "https://ik.imagekit.io/dyw3rzban/M%C4%B0N%C4%B0K%20TAKIM/458A8943.JPG?updatedAt=1739119244686",
    order: 3,
  },
  {
    title: "Body building",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut dolore facilisis.",
    image:
      "https://ik.imagekit.io/dyw3rzban/K%C3%9C%C3%87%C3%9CK%20A/_IGP5264.JPG?updatedAt=1739119467711",
    order: 8,
  },
  {
    title: "Strength training",
    description:
      "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus.",
    image:
      "https://ik.imagekit.io/dyw3rzban/K%C3%9C%C3%87%C3%9CK%20A/_IGP5264.JPG?updatedAt=1739119467711",
    order: 6,
  },
];
export type Service = (typeof servicesData)[number];
