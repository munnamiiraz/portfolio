"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Code2, Flame, Target, TrendingUp, Star } from "lucide-react";

interface MilestoneCard {
  icon: React.ReactNode;
  value: string;
  label: string;
  sub: string;
  color: "indigo" | "amber" | "emerald" | "violet";
}

interface ContestRow {
  period: string;
  activity: string;
  outcome: string;
}

const colorMap = {
  indigo:  { wrap: "bg-indigo-500/10 text-indigo-400",  border: "border-indigo-500/20",  val: "text-indigo-400",  glow: "group-hover:shadow-[0_8px_32px_rgba(99,102,241,0.15)]" },
  amber:   { wrap: "bg-amber-500/10 text-amber-400",    border: "border-amber-500/20",   val: "text-amber-400",   glow: "group-hover:shadow-[0_8px_32px_rgba(245,158,11,0.15)]" },
  emerald: { wrap: "bg-emerald-500/10 text-emerald-400",border: "border-emerald-500/20", val: "text-emerald-400", glow: "group-hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)]" },
  violet:  { wrap: "bg-violet-500/10 text-violet-400",  border: "border-violet-500/20",  val: "text-violet-400",  glow: "group-hover:shadow-[0_8px_32px_rgba(139,92,246,0.15)]" },
};

const milestones: MilestoneCard[] = [
  { icon: <Code2 size={18} />,     value: "80+",    label: "Rated Contests",     sub: "Codeforces",           color: "indigo"  },
  { icon: <Flame size={18} />,     value: "300+",   label: "Problems Solved",    sub: "across platforms",     color: "amber"   },
  { icon: <Trophy size={18} />,    value: "Top 8%", label: "Placement Rank",     sub: "1300 candidates",      color: "emerald" },
  { icon: <TrendingUp size={18} />,value: "Div. 2", label: "Division Reached",   sub: "Codeforces rated",     color: "violet"  },
];

const contestLog: ContestRow[] = [
  { period: "Early 2022",   activity: "Started Codeforces — first 10 contests",     outcome: "Built problem-reading discipline" },
  { period: "Mid 2022",     activity: "Systematic DP & graph study",                outcome: "Consistent Div. 2 participation" },
  { period: "Late 2022",    activity: "50-contest milestone",                        outcome: "Solved 250+ problems rated 1200–1600" },
  { period: "Early 2023",   activity: "Placement program — 1300 candidates",        outcome: "Selected top 100 on DSA + system design" },
  { period: "2023–Present", activity: "80+ contests, continued grinding",           outcome: "Strong foundation in competitive problem solving" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">
      <span className="h-1 w-1 rounded-full bg-indigo-400" />
      {children}
    </div>
  );
}

function MilestoneCard({ card, index }: { card: MilestoneCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const c = colorMap[card.color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative rounded-2xl border ${c.border} bg-[#111827] p-5 text-center transition-all duration-300 ${c.glow}`}
    >
      <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${c.wrap}`}>
        {card.icon}
      </div>
      <div className={`text-2xl font-black ${c.val}`}>{card.value}</div>
      <div className="mt-0.5 text-sm font-semibold text-white">{card.label}</div>
      <div className="mt-0.5 text-[11px] text-gray-600">{card.sub}</div>
    </motion.div>
  );
}

export default function JourneySection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });
  const leftRef  = useRef<HTMLDivElement>(null);
  const leftIn   = useInView(leftRef,  { once: true, margin: "-60px" });
  const rightRef = useRef<HTMLDivElement>(null);
  const rightIn  = useInView(rightRef, { once: true, margin: "-60px" });

  return (
    <section id="journey" className="relative bg-[#0B0F19] py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/4 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <SectionLabel>Journey</SectionLabel>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Built through{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                reps.
              </span>
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500 sm:text-right">
              Competitive programming isn't a hobby — it's where the problem-solving instinct comes from.
            </p>
          </div>
        </motion.div>

        {/* Milestone cards */}
        <div className="mb-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {milestones.map((m, i) => <MilestoneCard key={m.label} card={m} index={i} />)}
        </div>

        {/* Two-col: CP narrative + Achievement */}
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* LEFT — CP journey */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, y: 32 }}
            animate={leftIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/[0.06] bg-[#111827] p-7"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <Code2 size={17} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Competitive Programming</h3>
                <p className="text-[11px] text-gray-600">Codeforces-based track record</p>
              </div>
            </div>

            {/* Contest log table */}
            <div className="mb-6 overflow-hidden rounded-xl border border-white/[0.05]">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                    <th className="px-4 py-2.5 text-left font-semibold uppercase tracking-wider text-gray-600">Period</th>
                    <th className="px-4 py-2.5 text-left font-semibold uppercase tracking-wider text-gray-600">Activity</th>
                    <th className="hidden px-4 py-2.5 text-left font-semibold uppercase tracking-wider text-gray-600 sm:table-cell">Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {contestLog.map((row, i) => (
                    <motion.tr
                      key={row.period}
                      initial={{ opacity: 0, x: -12 }}
                      animate={leftIn ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                      className="border-b border-white/[0.03] transition-colors duration-150 last:border-0 hover:bg-white/[0.02]"
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-[10px] text-indigo-400">{row.period}</td>
                      <td className="px-4 py-3 text-gray-400">{row.activity}</td>
                      <td className="hidden px-4 py-3 text-gray-600 sm:table-cell">{row.outcome}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Narrative */}
            <p className="text-sm leading-relaxed text-gray-500">
              80+ rated contests forces a specific mental discipline: read fast, model the problem correctly,
              identify constraints, then pick the right algorithm under time pressure. That instinct
              carries directly into production debugging, API design trade-offs, and system design interviews.
              It's not about the rating — it's about the <span className="font-medium text-gray-300">sharpness it builds</span>.
            </p>
          </motion.div>

          {/* RIGHT — Achievement spotlight */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 28 }}
            animate={rightIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Trophy card */}
            <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-[#111827] p-6">
              {/* bg glow */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-amber-500/8 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                    <Trophy size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-amber-500/70">Achievement</div>
                    <div className="text-base font-bold text-white">Placement Program</div>
                  </div>
                </div>

                <div className="mb-4 rounded-xl border border-amber-500/15 bg-amber-500/[0.06] p-4 text-center">
                  <div className="font-mono text-4xl font-black text-amber-400">Top 100</div>
                  <div className="mt-1 text-sm text-gray-500">out of <span className="font-semibold text-white">1,300</span> candidates</div>
                  <div className="mt-0.5 text-[11px] text-gray-600">Top 8% overall</div>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-gray-500">
                  Selected through a multi-round competitive developer program. Evaluation covered
                  data structures, algorithm design, and system design under exam conditions — not
                  self-reported skills or certifications.
                </p>

                {/* Criteria tags */}
                <div className="flex flex-wrap gap-2">
                  {["DSA proficiency", "System design", "Code quality", "Problem decomposition"].map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-amber-500/15 bg-amber-500/[0.06] px-2.5 py-1 text-[11px] font-medium text-amber-400/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* What it means card */}
            <div className="rounded-2xl border border-white/[0.05] bg-[#111827] p-5">
              <div className="mb-3 flex items-center gap-2">
                <Star size={13} className="text-gray-600" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">Why it matters</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-500">
                Ranking in a blind, standardized evaluation against 1,300 others removes the
                ambiguity of self-assessed skill. It's the closest thing to a verified signal
                outside of a live technical interview.
              </p>
            </div>

            {/* Progress bar visual */}
            <div className="rounded-2xl border border-white/[0.05] bg-[#111827] p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">Placement percentile</span>
                <span className="font-mono text-xs font-bold text-amber-400">92nd</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/[0.05]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-400"
                  style={{ boxShadow: "0 0 10px rgba(245,158,11,0.5)" }}
                  initial={{ width: 0 }}
                  animate={rightIn ? { width: "92%" } : {}}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-gray-700">
                <span>0th</span>
                <span className="text-amber-600">Top 100 threshold</span>
                <span>100th</span>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}