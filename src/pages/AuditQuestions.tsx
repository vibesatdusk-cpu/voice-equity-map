import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProgressTracker from "@/components/ProgressTracker";
import { auditQuestions } from "@/data/auditQuestions";

const TooltipIcon = ({ text }: { text: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block ml-2 align-middle">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="w-4 h-4 rounded-full border border-[rgba(10,10,10,0.3)] text-deep-50 text-[10px] font-body inline-flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
        aria-label="More info"
      >
        ?
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 left-6 top-0 w-64 p-3 bg-white border border-[rgba(201,169,110,0.4)] shadow-md rounded text-xs font-body text-deep-70 leading-relaxed"
          >
            <span className="text-gold font-medium block mb-1 tracking-brand">What's this?</span>
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

const AuditQuestions = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const question = auditQuestions[currentIndex];
  const pillarIndex = Math.floor(currentIndex / 4);

  const setAnswer = useCallback(
    (value: number) => {
      setAnswers((prev) => ({ ...prev, [question.id]: value }));
    },
    [question.id]
  );

  const handleNext = () => {
    if (currentIndex < auditQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      sessionStorage.setItem("voiceAnswers", JSON.stringify(answers));
      navigate("/audit/results-gate");
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const selectedValue = answers[question.id];

  return (
    <div className="min-h-screen bg-warm-white grain-texture px-6 pt-24 pb-12 flex flex-col">
      <ProgressTracker currentStep={pillarIndex} />

      <div className="flex-1 max-w-3xl mx-auto w-full mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            <div className="relative mb-8">
              <span className="font-display text-gold text-6xl sm:text-7xl leading-none opacity-20 absolute top-0 left-0">
                {question.pillarLetter}
              </span>
              <div className="pl-16 pt-2">
                <h2 className="font-body text-deep text-sm tracking-brand-wide uppercase">
                  {question.pillar}
                </h2>
                <p className="font-body text-deep-50 text-xs mt-1">{question.pillarDescription}</p>
              </div>
            </div>

            <p className="font-body text-deep-40 text-xs tracking-brand mb-3">
              {currentIndex + 1} of {auditQuestions.length}
            </p>

            <div className="mb-8">
              <h3 className="font-display text-deep text-[24px] sm:text-[28px] font-medium leading-relaxed">
                {question.question}
                {question.tooltip && <TooltipIcon text={question.tooltip} />}
              </h3>
              <p className="font-body text-deep-50 text-sm mt-3 tracking-brand">
                How true is this statement for your organization?
              </p>
            </div>

            {question.type === "maturity" && question.options && (
              <div className="space-y-3">
                {question.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setAnswer(opt.value)}
                    className={`w-full text-left p-4 border transition-all duration-200 rounded group
                      ${selectedValue === opt.value
                        ? "border-2 border-gold bg-[#FBF6EE]"
                        : "bg-white border-[rgba(10,10,10,0.12)] hover:border-gold hover:bg-warm-white"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all duration-200
                        ${selectedValue === opt.value
                          ? "border-gold bg-gold"
                          : "border-[rgba(10,10,10,0.2)] group-hover:border-gold"
                        }`}
                      />
                      <div>
                        <span className={`font-body text-sm font-medium tracking-brand-wide block
                          ${selectedValue === opt.value ? "text-deep" : "text-deep-70"}`}>
                          {opt.label}
                        </span>
                        <span className="font-body text-xs text-deep-50 mt-0.5 block">
                          {opt.description}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="max-w-3xl mx-auto w-full flex items-center justify-between mt-8">
        <button
          onClick={handleBack}
          disabled={currentIndex === 0}
          className="font-body text-deep-50 text-sm tracking-brand hover:text-deep transition-colors disabled:opacity-20"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          disabled={selectedValue === undefined}
          className="bg-maroon text-cream font-body text-sm tracking-brand-wide px-6 py-3 hover:bg-maroon/90 transition-colors duration-200 disabled:opacity-40 rounded"
        >
          {currentIndex === auditQuestions.length - 1 ? "Complete Audit →" : "Next →"}
        </button>
      </div>
    </div>
  );
};

export default AuditQuestions;