import { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from "recharts";
import logo from "@/assets/labyrinth-logo.png";
import PricingModal from "@/components/PricingModal";
import { calculateResults, type AuditResult, type MaturityBand } from "@/data/auditQuestions";

const linkedInUrl = "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fvoicebylabyrinth.com&summary=" +
  encodeURIComponent("I just completed the V.O.I.C.E. Audit from Labyrinth Digital Global. Try it free: voicebylabyrinth.com #EthicalAI #VOICE #ResponsibleAI");

const BAND_COLORS: Record<MaturityBand, string> = {
  Reactive: "#6B1F2A", Developing: "#B5651D", Progressing: "#4A4A4A", Advanced: "#C9A96E", Embedded: "#C9A96E",
};

const BAND_DESCRIPTIONS: Record<MaturityBand, string> = {
  Reactive: "Your AI practices are mostly informal right now. The gaps are real and fixable — knowing where they are is already the hardest part.",
  Developing: "You are building momentum. The foundation exists. A few intentional moves will change the picture significantly.",
  Progressing: "Solid groundwork is in place. The opportunity now is making it structural so it holds regardless of who is in the room.",
  Advanced: "You are ahead of most organizations at your scale. The work now is locking in what you have built so it survives growth and leadership change.",
  Embedded: "Ethical AI is woven into how you actually operate. That puts you in rare company. The next move is leading publicly.",
};

const STRENGTH_COPY: Record<MaturityBand, string> = {
  Reactive: "Even at the Reactive stage, something brought you here. That instinct matters. Use it.",
  Developing: "You have made a start. That puts you ahead of organizations still pretending this is not their problem.",
  Progressing: "Your practices are real. Now the goal is making them repeatable and independent of any one person.",
  Advanced: "You have built something genuinely strong. The standard you are holding is one most organizations aspire to.",
  Embedded: "You are operating at the highest level of AI maturity. This is not common. Own it.",
};

const GAP_COPY: Record<MaturityBand, string> = {
  Reactive: "The gap between your intentions and your infrastructure is significant right now. That is a resource and priority question. Labyrinth can help you close it.",
  Developing: "There are structural gaps that good intentions alone will not close. The next phase is resourcing the work, not just willing it.",
  Progressing: "A few pillars are lagging behind your strongest areas. Closing those gaps is what moves you from Progressing to Advanced.",
  Advanced: "You are close. One or two pillars are holding you back from Embedded status. A targeted Labyrinth audit would identify exactly where.",
  Embedded: "Even at this level, continuous review matters. AI moves fast. The organizations that stay Embedded are the ones that keep asking hard questions and publishing their answers.",
};

const NEXT_STEP_OVERRIDE: Record<MaturityBand, string> = {
  Reactive: "", Developing: "", Progressing: "", Advanced: "",
  Embedded: "Publish your AI strategy. Not an internal memo — a public commitment. Name your standards, your review process, and what triggers a halt. That document becomes your market position and Labyrinth can help you build it.",
};

const CTA: Record<MaturityBand, { headline: string; sub: string }> = {
  Reactive: { headline: "Get Your 90-Day Recovery Roadmap", sub: "Labyrinth works with Reactive-stage organizations to build a practical AI ethics action plan starting this quarter." },
  Developing: { headline: "Get Your Full Action Plan", sub: "Labyrinth can help you move from Developing to Progressing with a focused strategy sprint." },
  Progressing: { headline: "Close the Gaps With Expert Support", sub: "A Labyrinth audit identifies exactly which pillars need structural investment and what that looks like in practice." },
  Advanced: { headline: "Get to Embedded. We Know the Path.", sub: "Labyrinth works with Advanced organizations to finalize governance structures and prepare their first public AI commitments." },
  Embedded: { headline: "Turn Your Ethics Practice Into a Market Position", sub: "You have done the work. Labyrinth can help you publish your AI strategy, build a public accountability framework, and become the reference point in your industry." },
};

const Results = () => {
  const [chartVisible, setChartVisible] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setChartVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const result: AuditResult = useMemo(() => {
    const raw = sessionStorage.getItem("voiceAnswers");
    const answers: Record<string, number> = raw ? JSON.parse(raw) : {};
    return calculateResults(answers);
  }, []);

  const chartData = result.pillarScores.map((p) => ({ pillar: p.pillar, score: p.score, fullMark: 12 }));
  const overallColor = BAND_COLORS[result.overallBand];
  const strongestPillar = result.pillarScores.reduce((a, b) => a.score >= b.score ? a : b);
  const isEmbedded = result.overallBand === "Embedded";
  const cta = CTA[result.overallBand];
  const nextStepOverride = NEXT_STEP_OVERRIDE[result.overallBand];

  return (
    <div className="min-h-screen bg-warm-white grain-texture pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="font-body text-[#0A0A0A] text-xs tracking-brand-wide uppercase mb-3 opacity-50">Your V.O.I.C.E. Audit Results</p>
          <h1 className="font-display text-[#0A0A0A] text-3xl sm:text-4xl font-semibold mb-4">Here is what your AI strategy is telling us.</h1>
          <div className="inline-flex items-center gap-3 border px-5 py-2 rounded mt-2" style={{ borderColor: overallColor }}>
            <span className="font-body text-xs tracking-brand-wide uppercase font-medium" style={{ color: overallColor }}>Overall Maturity</span>
            <span className="font-display text-lg font-semibold" style={{ color: overallColor }}>{result.overallBand}</span>
          </div>
          <p className="font-body text-[#0A0A0A] text-sm mt-4 tracking-brand max-w-lg mx-auto leading-relaxed opacity-75">{BAND_DESCRIPTIONS[result.overallBand]}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div className="card-light p-6 sm:p-8 rounded" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <h2 className="font-display text-[#0A0A0A] text-2xl font-semibold mb-1 text-center">Equity Gap Map</h2>
            <p className="font-body text-[#0A0A0A] text-xs tracking-brand text-center mb-6 opacity-60">Score out of 12 per pillar</p>
            <div className="w-full aspect-square max-w-md mx-auto">
              {chartVisible && (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="65%">
                    <PolarGrid stroke="rgba(10,10,10,0.2)" />
                    <PolarAngleAxis dataKey="pillar" tick={{ fill: "#0A0A0A", fontSize: 12, fontFamily: "Josefin Sans", fontWeight: 500 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 12]} tickCount={4} tick={{ fill: "rgba(10,10,10,0.5)", fontSize: 10 }} />
                    <Radar name="Score" dataKey="score" stroke="#C9A96E" fill="#C9A96E" fillOpacity={0.4} strokeWidth={2} animationDuration={1200} animationEasing="ease-out" />
                  </RadarChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {result.pillarScores.map((p) => (
                <div key={p.pillarLetter} className="bg-white border px-3 py-1.5 flex items-center gap-2 rounded" style={{ borderColor: p.color }}>
                  <span className="font-display text-base font-semibold" style={{ color: p.color }}>{p.pillarLetter}</span>
                  <span className="font-body text-xs font-medium" style={{ color: p.color }}>{p.score}/12</span>
                  <span className="font-body text-[10px] tracking-brand" style={{ color: p.color, opacity: 0.7 }}>{p.band}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="space-y-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
            <div className="border-l-[3px] border-[#C9A96E] pl-5">
              <span className="font-body text-[#C9A96E] text-xs tracking-brand-wide uppercase font-medium">
                {isEmbedded ? "Where You Stand" : "Strength — " + strongestPillar.pillar}
              </span>
              <p className="font-body text-[#0A0A0A] text-sm mt-2 leading-relaxed">
                {isEmbedded ? STRENGTH_COPY[result.overallBand] : "Your strongest pillar is " + strongestPillar.pillar + " with a score of " + strongestPillar.score + "/12. " + STRENGTH_COPY[result.overallBand]}
              </p>
            </div>

            <div className="border-l-[3px] pl-5" style={{ borderColor: isEmbedded ? "#C9A96E" : "#6B1F2A" }}>
              <span className="font-body text-xs tracking-brand-wide uppercase font-medium" style={{ color: isEmbedded ? "#C9A96E" : "#6B1F2A" }}>
                {isEmbedded ? "What Comes Next" : "Gap — " + result.lowestPillar.pillar}
              </span>
              <p className="font-body text-[#0A0A0A] text-sm mt-2 leading-relaxed">
                {isEmbedded ? GAP_COPY[result.overallBand] : "Your lowest score is in " + result.lowestPillar.pillar + " at " + result.lowestPillar.score + "/12, rated " + result.lowestPillar.band + ". " + GAP_COPY[result.overallBand]}
              </p>
            </div>

            <div className="rounded p-5 border-l-4" style={{ background: "rgba(245, 240, 232, 0.8)", borderLeftColor: "#C9A96E", borderTop: "1px solid rgba(201,169,110,0.3)", borderRight: "1px solid rgba(201,169,110,0.3)", borderBottom: "1px solid rgba(201,169,110,0.3)" }}>
              <span className="font-body text-[#C9A96E] text-xs tracking-brand-wide uppercase block mb-2 font-medium">Your One Next Step</span>
              <p className="font-body text-[#0A0A0A] text-sm leading-relaxed">{nextStepOverride || result.nextStep}</p>
            </div>

            <div className="space-y-3 pt-2">
              <button onClick={() => setPricingOpen(true)} className="w-full bg-[#6B1F2A] text-[#F5F0E8] font-body text-sm tracking-brand-wide px-10 py-4 hover:bg-[#6B1F2A]/90 transition-colors rounded font-medium">
                {cta.headline}
              </button>
              <p className="font-body text-[#0A0A0A] text-[12px] tracking-brand text-center opacity-50">{cta.sub}</p>
              <p className="text-center">
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="font-body text-[#C9A96E] text-[13px] tracking-brand hover:underline transition-colors">
                  Share your results on LinkedIn
                </a>
              </p>
            </div>
          </motion.div>
        </div>

        <footer className="border-t border-[rgba(201,169,110,0.3)] mt-20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Labyrinth" className="h-6 w-6 object-contain bg-transparent border-none p-0 shadow-none" />
            <span className="font-display text-[#C9A96E] text-sm">V.O.I.C.E.</span>
          </div>
          <p className="font-body text-[#0A0A0A] text-xs tracking-brand opacity-50">Powered by the V.O.I.C.E. Method — labyrinthdigitalglobal.com</p>
        </footer>
      </div>
      <PricingModal open={pricingOpen} onClose={() => setPricingOpen(false)} />
    </div>
  );
};

export default Results;