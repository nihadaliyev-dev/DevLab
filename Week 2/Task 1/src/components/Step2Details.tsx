import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "../context/FormContext";

type University = {
  name: string;
};
type RestCountry = {
  name: { common: string };
};
const Step2Details = () => {
  const { formData, updateFormData } = useForm();
  const [universities, setUniversities] = useState<University[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [errors, setErrors] = useState<{
    educationLevel?: string;
    country?: string;
    company?: string;
    university?: string;
  }>({});

  const validateField = (field: keyof typeof errors, value: string) => {
    let msg = "";
    if (field === "educationLevel") {
      msg = !value.trim()
        ? "Education level is required"
        : value.trim().length < 2
        ? "Enter at least 2 characters"
        : "";
    }
    if (field === "country") {
      msg = !value.trim() ? "Country is required" : "";
    }
    if (field === "company") {
      msg = !value.trim()
        ? "Company is required"
        : value.trim().length < 2
        ? "Enter at least 2 characters"
        : "";
    }
    if (field === "university") {
      msg = !value.trim()
        ? selectedCountry
          ? "University is required"
          : "Please select a country first"
        : "";
    }
    setErrors((prev) => ({ ...prev, [field]: msg || undefined }));
    return !msg;
  };

  const getCountries = async () => {
    const response = await axios.get<RestCountry[]>(
      "https://restcountries.com/v3.1/all?fields=name"
    );
    const names = response.data
      .map((c) => c.name?.common)
      .filter((n): n is string => Boolean(n))
      .sort((a, b) => a.localeCompare(b));
    setCountries(names);
  };
  const getUniversities = async (countryName: string) => {
    if (!countryName) {
      setUniversities([]);
      return;
    }
    const response = await axios.get<University[]>(
      `http://universities.hipolabs.com/search?country=${encodeURIComponent(
        countryName
      )}`
    );
    setUniversities(response.data);
  };
  useEffect(() => {
    getCountries();
  }, []);
  useEffect(() => {
    getUniversities(selectedCountry);
    if (selectedCountry) {
      validateField("country", selectedCountry);
      if (!formData.university) {
        setErrors((prev) => ({
          ...prev,
          university: "University is required",
        }));
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        country: "Country is required",
        university: undefined,
      }));
    }
  }, [selectedCountry]);

  return (
    <div className="p-3 w-full grid grid-cols-2 grid-rows-4 gap-[1.25rem]">
      <div className="flex flex-col gap-[0.25rem]">
        <label
          className="px-[0.25rem] py-[0.1rem] text-sm font-light outline-none"
          htmlFor="educationLevel"
        >
          Education Level <span className="text-red-500">*</span>
        </label>
        <input
          id="educationLevel"
          className={`rounded-[0.5rem] px-[0.75rem] py-[0.5rem] border-[1px] outline-none transition-all focus:bg-blue-200 hover:bg-blue-100 focus:scale-[1.01] ${
            errors.educationLevel ? "border-red-500" : "border-[#212121]"
          }`}
          type="text"
          required
          placeholder="High School, Bachelor, Master, etc."
          value={formData?.educationLevel}
          onChange={(e) => {
            updateFormData("educationLevel", e.target.value);
            if (errors.educationLevel)
              validateField("educationLevel", e.target.value);
          }}
          onBlur={() =>
            validateField("educationLevel", formData?.educationLevel ?? "")
          }
          aria-invalid={Boolean(errors.educationLevel)}
          aria-describedby={
            errors.educationLevel ? "educationLevel-error" : undefined
          }
        />
        {errors.educationLevel && (
          <p id="educationLevel-error" className="text-red-500 text-xs mt-1">
            {errors.educationLevel}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-[0.25rem]">
        <label
          className="px-[0.25rem] py-[0.1rem] text-sm font-light outline-none"
          htmlFor="countries"
        >
          Country <span className="text-red-500">*</span>
        </label>
        <select
          className={`rounded-[0.5rem] px-[0.75rem] py-[0.5rem] border-[1px] outline-none transition-all focus:bg-blue-200 hover:bg-blue-100 focus:scale-[1.01] ${
            errors.country ? "border-red-500" : "border-[#212121]"
          }`}
          name="countries"
          id="countries"
          required
          value={formData?.country}
          onChange={(e) => {
            updateFormData("country", e.target.value);
            setSelectedCountry(e.target.value);
            if (errors.country) validateField("country", e.target.value);
          }}
          onBlur={() => validateField("country", formData?.country ?? "")}
          aria-invalid={Boolean(errors.country)}
          aria-describedby={errors.country ? "country-error" : undefined}
        >
          <option value="">Select a country</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.country && (
          <p id="country-error" className="text-red-500 text-xs mt-1">
            {errors.country}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-[0.25rem]">
        <label
          className="px-[0.25rem] py-[0.1rem] text-sm font-light outline-none"
          htmlFor="company"
        >
          Company <span className="text-red-500">*</span>
        </label>
        <input
          id="company"
          className={`rounded-[0.5rem] px-[0.75rem] py-[0.5rem] border-[1px] outline-none transition-all focus:bg-blue-200 hover:bg-blue-100 focus:scale-[1.01] ${
            errors.company ? "border-red-500" : "border-[#212121]"
          }`}
          type="text"
          required
          placeholder="facebook, linkedin, etc."
          value={formData?.company}
          onChange={(e) => {
            updateFormData("company", e.target.value);
            if (errors.company) validateField("company", e.target.value);
          }}
          onBlur={() => validateField("company", formData?.company ?? "")}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? "company-error" : undefined}
        />
        {errors.company && (
          <p id="company-error" className="text-red-500 text-xs mt-1">
            {errors.company}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-[0.25rem]">
        <label
          className="px-[0.25rem] py-[0.1rem] text-sm font-light outline-none"
          htmlFor="university"
        >
          University <span className="text-red-500">*</span>
        </label>
        <select
          className={`rounded-[0.5rem] px-[0.75rem] py-[0.5rem] border-[1px] outline-none transition-all focus:bg-blue-200 hover:bg-blue-100 focus:scale-[1.01] ${
            errors.university ? "border-red-500" : "border-[#212121]"
          }`}
          name="university"
          id="university"
          required
          value={formData?.university}
          onChange={(e) => {
            updateFormData("university", e.target.value);
            if (errors.university) validateField("university", e.target.value);
          }}
          onBlur={() => validateField("university", formData?.university ?? "")}
          aria-invalid={Boolean(errors.university)}
          aria-describedby={errors.university ? "university-error" : undefined}
        >
          <option value="">
            {selectedCountry ? "Select a university" : "Select a country"}
          </option>
          {universities.map((u) => (
            <option key={u.name} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>
        {errors.university && (
          <p id="university-error" className="text-red-500 text-xs mt-1">
            {errors.university}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-[0.25rem] col-span-2">
        <label
          className="px-[0.25rem] py-[0.1rem] text-sm font-light outline-none"
          htmlFor="others"
        >
          Others
        </label>
        <input
          id="others"
          className="rounded-[0.5rem] px-[0.75rem] py-[0.5rem] border-[1px] border-[#212121] outline-none transition-all focus:bg-blue-200 hover:bg-blue-100 focus:scale-[1.01]"
          type="text"
          placeholder="Message about application"
          value={formData?.others}
          onChange={(e) => updateFormData("others", e.target.value)}
          onKeyDown={(e) => {
            console.log(e.key);
          }}
        />
      </div>
    </div>
  );
};

export default Step2Details;
