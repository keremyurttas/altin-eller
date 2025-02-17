"use client";
import BreadCrumbSection from "@/components/ui/BreadCrumbSection";
import { bmiCalculator } from "@/data/breadCrumbs";
import { useState } from "react";
export default function Page() {
  const [values, setValues] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "",
  });
  const [result, setResult] = useState("");
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const calculateBMI = () => {
    const { height, weight } = values;
    const bmi = parseFloat(weight) / (parseFloat(height) / 100) ** 2;
    setResult(bmi.toFixed(2));
  };

  // Determine BMI category color
  const getResultColor = () => {
    if (result === null || result === "Invalid input") return "text-white";
    const bmi = parseFloat(result);

    if (bmi < 18.5) return "text-red-500"; // Underweight
    if (bmi >= 18.5 && bmi <= 24.9) return "text-green-500"; // Healthy
    if (bmi >= 25 && bmi <= 29.9) return "text-orange-500"; // Overweight
    return "text-red-500"; // Obese
  };

  return (
    <>
      <BreadCrumbSection {...bmiCalculator} />{" "}
      <section className="bmi-calculator-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-title chart-title">
                <span>check your body</span>
                <h2>BMI CALCULATOR CHART</h2>
              </div>
              <div className="chart-table">
                <table>
                  <thead>
                    <tr>
                      <th>Bmi</th>
                      <th>WEIGHT STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="point">Below 18.5</td>
                      <td>Underweight</td>
                    </tr>
                    <tr>
                      <td className="point">18.5 - 24.9</td>
                      <td>Healthy</td>
                    </tr>
                    <tr>
                      <td className="point">25.0 - 29.9</td>
                      <td>Overweight</td>
                    </tr>
                    <tr>
                      <td className="point">30.0 - and Above</td>
                      <td>Obese</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="section-title chart-calculate-title">
                <span>check your body</span>
                <h2>CALCULATE YOUR BMI</h2>
              </div>
              <div className="chart-calculate-form">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis.
                </p>
                <form
                  className="mb-4"
                  action="#"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="row">
                    <div className="col-sm-6">
                      <input
                        onChange={handleChange}
                        name="height"
                        type="number"
                        placeholder="Boyunuz / cm"
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        onChange={handleChange}
                        name="weight"
                        type="number"
                        placeholder="Kilonuz / kg"
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        onChange={handleChange}
                        name="age"
                        type="number"
                        placeholder="Yaş"
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        onChange={handleChange}
                        name="gender"
                        type="text"
                        placeholder="Cinsiyet"
                      />
                    </div>
                    <div className="col-lg-12">
                      <button onClick={() => calculateBMI()} type="submit">
                        Calculate
                      </button>
                    </div>
                  </div>
                </form>
                {result && !isNaN(Number(result)) && (
                  <span>
                    Vücut Kitle Endeksiniz:{" "}
                    <strong className={getResultColor()}>{result}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
