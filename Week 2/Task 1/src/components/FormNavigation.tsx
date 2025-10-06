type Props = {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onReset: () => void;
  onNext: () => void;
};

const FormNavigation = ({
  currentStep,
  totalSteps,
  onPrevious,
  onReset,
  onNext,
}: Props) => {
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onPrevious}
        disabled={isFirst}
        className="px-[1rem] py-[0.5rem] border-[1px] border-[#212121] rounded-[0.5rem] hover:shadow-cyan-900 hover:shadow-[0px_0px_10px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button
        onClick={onReset}
        className="px-[1rem] py-[0.5rem] border-[1px] border-[#212121] rounded-[0.5rem] hover:shadow-cyan-900 hover:shadow-[0px_0px_10px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Reset
      </button>
      <button
        onClick={onNext}
        className="px-[1rem] py-[0.5rem] border-[1px] border-[#212121] rounded-[0.5rem] hover:shadow-cyan-900 hover:shadow-[0px_0px_10px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLast ? "Apply" : "Next"}
      </button>
    </div>
  );
};

export default FormNavigation;
