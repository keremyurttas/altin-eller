"use client";
import { useState } from "react";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    sportsHistory: "",
    courseType: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [formStatus, setFormStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries()); // Convert FormData to an object

    const phonePattern = /^\(\+90\) \d{3}-\d{3}-\d{2}-\d{2}$/;

    // Validate phone number before submitting the form
    if (!phonePattern.test(formObject.phone as string)) {
      setFormStatus("error");
      setMessage("Lütfen geçerli bir telefon numarası girin.");
      return;
    }

    setMessage(""); // Clear previous message
    setFormStatus("idle"); // Reset form status
    setIsLoading(true); // Set loading state to true

    // Map form data to Turkish names
    const formDataInTurkish = {
      "İsim - Soyisim": formObject.name,
      "Telefon Numarası": formObject.phone,
      Cinsiyet: formObject.gender === "male" ? "Erkek" : "Kadın",
      "Doğum Tarihi": formObject.dob,
      "Sporcu Geçmişi": formObject.sportsHistory,
      "Bilgi Almak İstediğiniz Bölüm": formObject.courseType,
    };

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/altinellersporkulubu1@gmail.com",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formDataInTurkish), // Send the form data with Turkish keys
        }
      );

      if (response.ok) {
        setFormStatus("success");
        setMessage("Form başarıyla gönderildi!");
        e.target.reset(); // Clear the form
        setFormData({
          name: "",
          gender: "",
          dob: "",
          sportsHistory: "",
          courseType: "",
          phone: "",
        });
      } else {
        setFormStatus("error");
        setMessage(
          "Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
        );
      }
    } catch (error) {
      console.error("Form gönderme hatası:", error);
      setFormStatus("error");
      setMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false); // Set loading state to false after submission attempt
    }
  };

  const handlePhoneChange = (e: any) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
    if (value.startsWith("90")) {
      value = value.slice(2); // Remove "90" if user types it manually
    }

    // Format as (+90)111-222-11-11
    let formattedValue = "(+90) ";

    if (value.length > 0) formattedValue += value.substring(0, 3);
    if (value.length > 3) formattedValue += "-" + value.substring(3, 6);
    if (value.length > 6) formattedValue += "-" + value.substring(6, 8);
    if (value.length > 8) formattedValue += "-" + value.substring(8, 10);

    setFormData({ ...formData, phone: formattedValue });
  };

  return (
    <>
      {formStatus !== "idle" && (
        <h6
          className={`text-center mb-2 ${
            formStatus === "success"
              ? "text-success"
              : formStatus === "error"
              ? "text-danger"
              : ""
          }`}
        >
          {message}
        </h6>
      )}
      {!isLoading ? (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Kurs Kayıt Formu
          </h2>

          <form
            onSubmit={handleSubmit}
            method="POST"
            className="space-y-4 text-black"
          >
            {/* Name */}
            <div>
              <label className="block text-gray-700">İsim - Soyisim</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Adınızı ve soyadınızı girin"
              />
            </div>

            {/* Phone, Gender, and Date of Birth in the Same Line */}
            <div className="flex flex-col md:flex-row md:space-x-4">
              {/* Phone Number */}
              <div className="md:w-1/3">
                <label className="block text-gray-700">Telefon Numarası</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="(+90)xxx-xxx-xx-xx"
                />
              </div>

              {/* Gender */}
              <div className="md:w-1/3">
                <label className="block text-gray-700">Cinsiyet</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz</option>
                  <option value="male">Erkek</option>
                  <option value="female">Kadın</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div className="md:w-1/3">
                <label className="block text-gray-700">Doğum Tarihi</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Sports History */}
            <div>
              <label className="block text-gray-700">
                Sporcu Geçmişi (Varsa)
              </label>
              <textarea
                name="sportsHistory"
                value={formData.sportsHistory}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Varsa spor geçmişiniz hakkında bilgi verin"
              ></textarea>
            </div>

            {/* Course Type */}
            <div>
              <label className="block text-gray-700">
                Bilgi Almak İstediğiniz Bölüm
              </label>
              <select
                name="courseType"
                value={formData.courseType}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seçiniz</option>
                <option value="personal-training">Özel Ders</option>
                <option value="basketball">Basketbol</option>
                <option value="volleyball">Voleybol</option>
              </select>
            </div>

            <input type="hidden" name="_next" value="" />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Başvuruyu Gönder
            </button>
          </form>
        </div>
      ) : (
        <div className="max-w-lg mx-auto p-6 shadow-lg rounded-lg h-full flex  flex-col  gap-12 items-center justify-center bg-[#151515]">
          <h2 className="text-white text-2xl">Form Gönderiliyor...</h2>
          <div className="w-16 h-16 border-4 border-t-4 border-primary rounded-full border-dashed  animate-spin-slow"></div>
        </div>
      )}
    </>
  );
}
