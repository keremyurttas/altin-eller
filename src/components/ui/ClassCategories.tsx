import { ClassCategory } from "@/data/classCategories";
export default function ClassCategories(props: {
  categories: ClassCategory[];
}) {
  const calculateYearsByAge = (minAge: number, maxAge: number) => {
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - maxAge;
    const maxYear = currentYear - minAge;
    return `${minYear} - ${maxYear}`;
  };
  return (
    <div className="so-categories">
      <div className="flex justify-between text-white">
        <h5 className="title !capitalize">Kategoriler</h5>
        <h3 className="capitalize">Doğum Yılları</h3>
      </div>
      <ul>
        {props.categories.map((category) => {
          return (
            <li>
              <a href="#">
                {category.name}{" "}
                <span>
                  {calculateYearsByAge(category.minAge, category.maxAge)}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
