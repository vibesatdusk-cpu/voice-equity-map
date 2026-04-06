import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EmailGate = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      sessionStorage.setItem("voiceEmail", email);
      navigate("/audit/results");
    }
  };

  return (
    <div className="min-h-screen bg-warm-white grain-texture flex flex-col items-center justify-center px-6">
      {/* Decorative gold line */}
      <motion.div
        className="w-[80px] h-px bg-gold/60 mb-8"
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <motion.h1
        className="font-display text-deep text-3xl sm:text-5xl text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Your Equity Gap Map is ready.
      </motion.h1>

      <motion.p
        className="font-body text-deep-70 text-base text-center mt-6 max-w-md tracking-brand"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7 }}
      >
        Enter your email to see your results and save your audit.
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-md space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-white border border-gold text-deep font-body text-sm tracking-brand px-5 py-4 placeholder:text-deep-40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors rounded"
        />
        <button
          type="submit"
          className={`w-full bg-maroon text-cream font-body text-sm tracking-brand-wide py-4 hover:bg-maroon/90 transition-all duration-200 rounded ${
            showPulse ? "animate-gold-pulse" : ""
          }`}
        >
          Show My Results
        </button>
      </motion.form>

      <motion.p
        className="font-body text-deep-40 text-xs mt-6 text-center tracking-brand max-w-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        No spam. Ever. Just your results and occasional insights from Labyrinth.
      </motion.p>
    </div>
  );
};

export default EmailGate;
