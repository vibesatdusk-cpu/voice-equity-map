import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/labyrinth-logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: "easeOut" as const },
  }),
};

const pillars = [
  { letter: "V", name: "Visibility", desc: "Name who is missing from your AI team, your data, and your decision rooms. Out loud." },
  { letter: "O", name: "Ownership", desc: "Give women and underrepresented voices real authorship — not just access." },
  { letter: "I", name: "Investment", desc: "Put equity in the budget. Not the footnotes." },
  { letter: "C", name: "Co-Creation", desc: "Build with the communities your AI affects. Not for them." },
  { letter: "E", name: "Embed", desc: "Make equity structural so it survives a leadership change." },
];

const audiences = [
  { title: "Founders & Co-Founders", desc: "Build AI strategies that reflect your values from day one." },
  { title: "Operations & Product Leads", desc: "Audit existing workflows and tools for equity gaps." },
  { title: "Consultants & Coaches", desc: "Add the V.O.I.C.E. framework to your advisory toolkit." },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-warm-white grain-texture">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.img
          src={logo}
          alt="Labyrinth Digital"
          className="w-20 h-20 object-contain mb-4 bg-transparent border-none p-0 shadow-none"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        />

        {/* Gold divider between logo and headline */}
        <motion.div
          className="w-[120px] h-px bg-gold/60 mb-10"
          custom={0.5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        />

        <motion.h1
          className="font-display text-deep text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold max-w-4xl leading-tight"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          Your AI Strategy Has a Blind Spot.
        </motion.h1>
        <motion.p
          className="font-body text-deep-70 mt-6 text-base sm:text-lg max-w-2xl tracking-brand leading-relaxed"
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          The V.O.I.C.E. Method™ helps SMBs build and deploy AI responsibly.
          Start with a free audit.
        </motion.p>
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Link
            to="/audit"
            className="mt-10 inline-block bg-maroon text-cream font-body text-sm tracking-brand-wide px-8 py-4 hover:bg-maroon/90 transition-colors duration-200 rounded"
          >
            Audit Your AI Strategy — Free
          </Link>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 h-px bg-gold/40"
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
        />
      </section>

      {/* Pillars */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-deep text-3xl sm:text-4xl text-center mb-16">
            Five Steps. Real Change.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {pillars.map((p, i) => (
              <motion.div
                key={p.letter}
                className="card-light p-8 sm:p-9 text-center group hover:border-gold hover:shadow-[0_0_20px_rgba(201,169,110,0.1)] transition-all duration-300 rounded"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="font-display text-gold text-4xl block mb-3">{p.letter}</span>
                <h3 className="font-body text-deep text-sm tracking-brand mb-3">{p.name}</h3>
                <p className="font-body text-deep-65 text-[13px] leading-relaxed text-left">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-deep text-3xl sm:text-4xl text-center mb-16">
            Who It's For
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {audiences.map((a) => (
              <div key={a.title} className="border-t-2 border-gold pt-6">
                <h3 className="font-body text-deep text-sm tracking-brand-wide mb-3">{a.title}</h3>
                <p className="font-body text-deep-65 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold/20 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-3">
          <p className="font-display text-gold text-xl">V.O.I.C.E. by Labyrinth</p>
          <p className="font-body text-deep-50 text-xs tracking-brand">
            A product of Labyrinth Digital Global — labyrinthdigitalglobal.com
          </p>
          <p className="font-body text-deep-40 text-xs tracking-brand">
            © 2026 Labyrinth Digital Global. The V.O.I.C.E. Method™ is a proprietary framework.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
