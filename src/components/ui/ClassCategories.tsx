import { ClassCategory } from "@/data/classCategories";

export default function ClassCategories(props: {
  categories: ClassCategory[];
}) {
  const calculateYearsByAge = (minAge: number, maxAge: number) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const isAfterSeptember = today.getMonth() >= 8; // September is month 8 (0-based)

    // If we're in or after September, we'll use the next year's calculation
    const academicYear = isAfterSeptember ? currentYear + 1 : currentYear;

    const minYear = academicYear - maxAge;
    const maxYear = academicYear - minAge;
    return `${minYear} - ${maxYear}`;
  };

  return (
    <div className="so-categories">
      <div className="flex justify-between text-white">
        <h5 className="title !capitalize">Kategoriler</h5>
        <h3 className="capitalize">Doğum Yılları</h3>
      </div>
      <ul>
        {props.categories.map((category, index) => {
          return (
            <li key={index}>
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
