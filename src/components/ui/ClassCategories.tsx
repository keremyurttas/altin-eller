import { ClassCategory } from "@/lib/types";
export default function ClassCategories({
  categories,
}: {
  categories: ClassCategory[];
}) {
  const calculateYearsByAge = (minAge: number, maxAge: number) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const isAfterSeptember = today.getMonth() >= 8; // September is month 8 (0-based)

    const academicYear = isAfterSeptember ? currentYear + 1 : currentYear;
    const minYear = academicYear - maxAge;
    const maxYear = academicYear - minAge;
    return `${minYear} - ${maxYear}`;
  };

  return (
    <div className="so-categories">
      <header className="flex justify-between text-white">
        <h5 className="title !capitalize">Kategoriler</h5>
        <h3 className="capitalize">Doğum Yılları</h3>
      </header>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <a href="#">
              {category.name}{" "}
              <span className="year-range">
                {calculateYearsByAge(category.minAge, category.maxAge)}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
