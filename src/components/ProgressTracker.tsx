import { motion } from "framer-motion";

const pillars = [
  { letter: "V", name: "Visibility" },
  { letter: "O", name: "Ownership" },
  { letter: "I", name: "Investment" },
  { letter: "C", name: "Co-Creation" },
  { letter: "E", name: "Embed" },
];

interface ProgressTrackerProps {
  currentStep: number; // 0-4, use -1 for intro (first dot active)
}

const ProgressTracker = ({ currentStep }: ProgressTrackerProps) => {
  const activeStep = currentStep === -1 ? 0 : currentStep;

  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-lg mx-auto py-6">
      {pillars.map((pillar, i) => (
        <div key={pillar.letter} className="flex items-center">
          <div className="flex flex-col items-center gap-2">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-body text-sm
                ${i === activeStep
                  ? "bg-[#C9A96E] text-white shadow-[0_0_0_5px_rgba(201,169,110,0.2)]"
                  : i < activeStep
                    ? "bg-[rgba(201,169,110,0.3)] border-[1.5px] border-[#C9A96E] text-[#C9A96E]"
                    : "bg-transparent border-[1.5px] border-[rgba(201,169,110,0.35)] text-[rgba(10,10,10,0.3)]"
                }`}
              animate={i === activeStep ? { scale: [1, 1.08, 1] } : {}}
              transition={{ duration: 0.6 }}
            >
              {pillar.letter}
            </motion.div>
            <span
              className={`font-body text-[11px] tracking-brand ${
                i === activeStep ? "text-deep font-medium" : "text-[rgba(10,10,10,0.35)]"
              }`}
            >
              {pillar.name}
            </span>
          </div>
          {i < pillars.length - 1 && (
            <div
              className="w-8 sm:w-12 h-px mx-1 -mt-6 bg-[rgba(201,169,110,0.25)]"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressTracker;
