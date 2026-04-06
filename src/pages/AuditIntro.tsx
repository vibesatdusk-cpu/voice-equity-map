import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProgressTracker from "@/components/ProgressTracker";

const AuditIntro = () => {
  return (
    <div className="min-h-screen bg-warm-white grain-texture flex flex-col items-center justify-center px-6 pt-24">
      <ProgressTracker currentStep={-1} />

      <motion.h1
        className="font-display text-deep text-3xl sm:text-5xl text-center mt-12 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Let's look at your AI strategy together.
      </motion.h1>

      <motion.p
        className="font-body text-deep-70 text-base sm:text-lg text-center mt-6 max-w-xl tracking-brand leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7 }}
      >
        This audit evaluates your AI practices across five key pillars — Visibility,
        Ownership, Investment, Co-Creation, and Embed. It takes about 10 minutes.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <Link
          to="/audit/questions"
          className="mt-12 inline-block bg-maroon text-cream font-body text-sm tracking-brand-wide px-8 py-4 hover:bg-maroon/90 transition-colors duration-200 rounded"
        >
          Begin Audit
        </Link>
      </motion.div>
    </div>
  );
};

export default AuditIntro;
