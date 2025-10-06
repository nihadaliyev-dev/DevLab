type Props = {
  currentStep: number;
  totalSteps: number;
};
const ProgressBar = ({ currentStep, totalSteps }: Props) => {
  const clampedTotal = Math.max(totalSteps, 1);
  const maxIndex = Math.max(clampedTotal - 1, 1);
  const progressPercent = Math.min(
    100,
    Math.max(0, (currentStep / maxIndex) * 100)
  );

  return (
    <div className="relative w-full h-[0.5rem] rounded-full overflow-hidden bg-[#999999]">
      <div
        className="bg-blue-500 rounded-full h-full absolute left-0 transition-all duration-300"
        style={{ width: `${progressPercent}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
