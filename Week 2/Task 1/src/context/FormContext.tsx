type FormData = {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  educationLevel: string;
  country: string;
  university: string;
  company: string;
  others: string;
};

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type FormContextValue = {
  formData: FormData;
  updateFormData: <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => void;
  resetForm: () => void;
};

const FormContext = createContext<FormContextValue | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const defaultFormData: FormData = {
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    educationLevel: "",
    country: "",
    university: "",
    company: "",
    others: "",
  };

  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const raw = localStorage.getItem("formData");
      if (!raw) return defaultFormData;
      const parsed = JSON.parse(raw);
      if (
        typeof parsed === "object" &&
        parsed &&
        "name" in parsed &&
        "surname" in parsed &&
        "email" in parsed &&
        "phoneNumber" in parsed &&
        "educationLevel" in parsed &&
        "country" in parsed &&
        "university" in parsed &&
        "company" in parsed &&
        "others" in parsed
      ) {
        return parsed as FormData;
      }
      return defaultFormData;
    } catch {
      return defaultFormData;
    }
  });

  const updateFormData: FormContextValue["updateFormData"] = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const resetForm = () => {
    setFormData(defaultFormData);
  };
  useEffect(() => {
    try {
      localStorage.setItem("formData", JSON.stringify(formData));
    } catch {
      // ignore write errors (e.g., storage full or disabled)
    }
  }, [formData]);

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useForm = () => {
  const ctx = useContext(FormContext);
  if (!ctx) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return ctx;
};
