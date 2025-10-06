import { useState } from "react";
import { useForm } from "../context/FormContext";

const Step1BasicInfo = () => {
  const { formData, updateFormData } = useForm();
  const [errors, setErrors] = useState<{
    name?: string;
    surname?: string;
    email?: string;
    phoneNumber?: string;
  }>({});

  const isLetters = (v: string) => /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$/.test(v.trim());
  const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  const isAzPhone = (v: string) => {
    const s = v.replace(/\s+/g, "");
    return /^\+994\d{9}$/.test(s);
  };

  const validators = {
    name: (v: string) => (!v.trim() ? "Name is required" : !isLetters(v) ? "Enter a valid name" : ""),
    surname: (v: string) => (!v.trim() ? "Surname is required" : !isLetters(v) ? "Enter a valid surname" : ""),
    email: (v: string) => (!v.trim() ? "Email is required" : !isEmail(v) ? "Enter a valid email" : ""),
    phoneNumber: (v: string) => (!v.trim() ? "Phone number is required" : !isAzPhone(v) ? "Enter a valid phone like +994XX XXX XX XX" : ""),
  } as const;

  const validateField = (field: keyof typeof validators, value: string) => {
    const msg = validators[field](value ?? "");
    setErrors((prev) => ({ ...prev, [field]: msg || undefined }));
    return !msg;
  };

  const handleChange = (field: keyof typeof validators) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    updateFormData(field as any, v as any);
    if (errors[field]) {
      validateField(field, v);
    }
  };

  return (
    <div className="p-3 w-full grid grid-cols-2 grid-rows-4 gap-[1.25rem]">
      <div className="flex flex-col gap-[0.25rem]">
        <label className="px-[0.25rem] py-[0.1rem] text-sm font-light outline-none" htmlFor="name">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          className={`rounded-[0.5rem] px-[0.75rem] py-[0.5rem] border-[1px] outline-none transition-all focus:bg-blue-200 hover:bg-blue-100 focus:scale-[1.01] ${errors.name ? "border-red-500" : "border-[#212121]"}`}
          type="text"
          required
          placeholder="John"
          value={formData?.name}
          onChange={handleChange("name")}
          onBlur={() => validateField("name", formData?.name ?? "")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      <div className="flex flex-col gap-[0.25rem]">
        <label className="px-[0.25rem] py-[0.1rem] text-sm font-light outline-none" htmlFor="surname">
          Surname <span className="text-red-500">*</span>
        </label>
        <input
          id="surname"
          className={`rounded-[0.5rem] px-[0.75rem] py-[0.5rem] border-[1px] outline-none transition-all focus:bg-blue-200 hover:bg-blue-100 focus:scale-[1.01] ${errors.surname ? "border-red-500" : "border-[#212121]"}`}
          type="text"
          required
          placeholder="Smith"
          value={formData?.surname}
          onChange={handleChange("surname")}
          onBlur={() => validateField("surname", formData?.surname ?? "")}
          aria-invalid={Boolean(errors.surname)}
          aria-describedby={errors.surname ? "surname-error" : undefined}
        />
        {errors.surname && (
          <p id="surname-error" className="text-red-500 text-xs mt-1">{errors.surname}</p>
        )}
      </div>

      <div className="flex flex-col gap-[0.25rem]">
        <label className="px-[0.25rem] py-[0.1rem] text-sm font-light outline-none" htmlFor="email">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          className={`rounded-[0.5rem] px-[0.75rem] py-[0.5rem] border-[1px] outline-none transition-all focus:bg-blue-200 hover:bg-blue-100 focus:scale-[1.01] ${errors.email ? "border-red-500" : "border-[#212121]"}`}
          type="email"
          required
          placeholder="johnsmith@gmail.com"
          value={formData?.email}
          onChange={handleChange("email")}
          onBlur={() => validateField("email", formData?.email ?? "")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-[0.25rem]">
        <label className="px-[0.25rem] py-[0.1rem] text-sm font-light outline-none" htmlFor="phoneNumber">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          id="phoneNumber"
          className={`rounded-[0.5rem] px-[0.75rem] py-[0.5rem] border-[1px] outline-none transition-all focus:bg-blue-200 hover:bg-blue-100 focus:scale-[1.01] ${errors.phoneNumber ? "border-red-500" : "border-[#212121]"}`}
          type="tel"
          required
          placeholder="+994XX XXX XX XX"
          value={formData?.phoneNumber}
          onChange={handleChange("phoneNumber")}
          onBlur={() => validateField("phoneNumber", formData?.phoneNumber ?? "")}
          aria-invalid={Boolean(errors.phoneNumber)}
          aria-describedby={errors.phoneNumber ? "phoneNumber-error" : undefined}
        />
        {errors.phoneNumber && (
          <p id="phoneNumber-error" className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
        )}
      </div>
    </div>
  );
};

export default Step1BasicInfo;
