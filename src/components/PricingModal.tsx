import { motion, AnimatePresence } from "framer-motion";

interface PricingModalProps {
  open: boolean;
  onClose: () => void;
}

const tiers = [
  {
    label: "Free",
    price: "Current Plan",
    features: ["Visibility Audit + Equity Gap Map"],
    cta: "Current Plan",
    disabled: true,
    recommended: false,
  },
  {
    label: "Growth",
    price: "$49 / month",
    features: [
      "Full V.O.I.C.E. Action Plan",
      "Progress Dashboard",
      "Quarterly Equity Pulse Report",
      "Cancel anytime",
    ],
    cta: "Start Growth Plan →",
    disabled: false,
    recommended: true,
  },
  {
    label: "Scale",
    price: "$149 / month",
    features: [
      "Everything in Growth",
      "Team Seats",
      "V.O.I.C.E. Certified Badge",
      "Board-Ready Reporting",
      "Strategy Session with Labyrinth",
    ],
    cta: "Start Scale Plan →",
    disabled: false,
    recommended: false,
  },
];

const PricingModal = ({ open, onClose }: PricingModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div
            className="relative bg-[#FDFAF5] max-w-4xl w-full rounded-lg shadow-xl p-8 sm:p-12 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.35 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-5 font-body text-deep-50 text-xl hover:text-deep transition-colors"
            >
              ×
            </button>

            <h2 className="font-display text-deep text-2xl sm:text-3xl text-center mb-3">
              You've taken the first step.
            </h2>
            <p className="font-body text-[rgba(10,10,10,0.75)] text-sm text-center max-w-2xl mx-auto mb-10 tracking-brand leading-relaxed">
              Your full V.O.I.C.E. Action Plan maps out exactly what your company needs to do,
              pillar by pillar, with timelines, responsible roles, and success metrics. It's the
              roadmap from where you are to where you want to be.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {tiers.map((tier) => (
                <div
                  key={tier.label}
                  className={`relative bg-white rounded-lg p-6 border transition-all ${
                    tier.recommended
                      ? "border-[#C9A96E] shadow-[0_2px_16px_rgba(201,169,110,0.15)]"
                      : "border-[rgba(201,169,110,0.3)]"
                  }`}
                >
                  {tier.recommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-body text-[#C9A96E] text-[11px] tracking-brand-wide bg-[#FDFAF5] px-3">
                      Recommended
                    </span>
                  )}
                  <h3 className="font-display text-deep text-xl mb-1">{tier.label}</h3>
                  <p className="font-body text-deep text-sm tracking-brand mb-5">
                    {tier.price}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((f) => (
                      <li key={f} className="font-body text-deep-65 text-[13px] tracking-brand leading-relaxed">
                        • {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    disabled={tier.disabled}
                    className={`w-full font-body text-sm tracking-brand-wide py-3 rounded transition-colors ${
                      tier.disabled
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#6B1F2A] text-[#F5F0E8] hover:bg-[#6B1F2A]/90"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              ))}
            </div>

            <p className="font-body text-deep-50 text-xs text-center mt-8 tracking-brand">
              All plans include access to the V.O.I.C.E. Method™ framework. Powered by Labyrinth Digital Global.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PricingModal;
