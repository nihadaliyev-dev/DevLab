import { useState, useMemo } from "react";
import FormHeader from "./FormHeader";
import FormNavigation from "./FormNavigation";
import ProgressBar from "./ProgressBar";
import Step1BasicInfo from "./Step1BasicInfo";
import Step2Details from "./Step2Details";
import Step3Preview from "./Step3Preview";
import { useForm } from "../context/FormContext";

const Form = () => {
  const totalSteps = 3;
  const [currentStep, setCurrentStep] = useState(0);
  const { resetForm } = useForm();
  const translateStyle = useMemo(() => {
    return {
      transform: `translateX(-${currentStep * 100}%)`,
    } as React.CSSProperties;
  }, [currentStep]);

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, totalSteps - 1));
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 0));
  const handleResetForm = () => resetForm();
  return (
    <div className="bg-white px-[3rem] py-[2rem] rounded-[2rem] grid gap-[1rem] shadow-lg">
      <FormHeader />
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="overflow-hidden">
        <div
          className="flex w-full transition-transform duration-500 ease-in-out"
          style={translateStyle}
        >
          <div className="min-w-full">
            <Step1BasicInfo />
          </div>
          <div className="min-w-full">
            <Step2Details />
          </div>
          <div className="min-w-full">
            <Step3Preview />
          </div>
        </div>
      </div>
      <FormNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrevious={goPrev}
        onReset={handleResetForm}
        onNext={goNext}
      />
    </div>
  );
};

export default Form;
