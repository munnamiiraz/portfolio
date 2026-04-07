"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  note?: string;
}

interface SkillGroup {
  id: string;
  label: string;
  color: "indigo" | "violet" | "slate" | "amber";
  icon: React.ReactNode;
  description: string;
  skills: Skill[];
}

const Icons = {
  monitor: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
    </svg>
  ),
  server: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
      <path d="M6 6h.01M6 18h.01" />
    </svg>
  ),
  tool: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  cloud: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  ),
};

const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    color: "indigo",
    icon: Icons.monitor,
    description: "UI layer — component architecture, type safety, styling systems.",
    skills: [
      { name: "React",        level: 88, note: "hooks, context, perf patterns" },
      { name: "Next.js",      level: 85, note: "App Router, RSC, ISR" },
      { name: "TypeScript",   level: 82, note: "generics, utility types" },
      { name: "Tailwind CSS", level: 90, note: "design systems, custom config" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "violet",
    icon: Icons.server,
    description: "Server-side logic, data modeling, API design, and query optimization.",
    skills: [
      { name: "Node.js",    level: 87, note: "event loop, streams, clustering" },
      { name: "Express",    level: 84, note: "middleware, REST, error handling" },
      { name: "PostgreSQL", level: 80, note: "indexing, transactions, joins" },
      { name: "MongoDB",    level: 78, note: "aggregation pipeline, schema design" },
      { name: "Prisma",     level: 83, note: "ORM, migrations, relations" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    color: "slate",
    icon: Icons.tool,
    description: "Day-to-day tooling — version control and containerization.",
    skills: [
      { name: "Git",    level: 88, note: "branching, rebasing, workflows" },
      { name: "Docker", level: 75, note: "images, compose, networking" },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    color: "amber",
    icon: Icons.cloud,
    description: "Currently ramping — CI/CD pipelines and production observability.",
    skills: [
      { name: "CI/CD",      level: 65, note: "GitHub Actions, build pipelines" },
      { name: "Prometheus", level: 58, note: "metrics, alerting, exporters" },
      { name: "Grafana",    level: 55, note: "dashboards, data sources" },
    ],
  },
];

const colorMap = {
  indigo: {
    border:  "hover:border-indigo-500/30",
    iconBg:  "bg-indigo-500/10 text-indigo-400",
    bar:     "bg-indigo-500",
    barGlow: "shadow-[0_0_8px_rgba(99,102,241,0.5)]",
    label:   "text-indigo-400",
    badge:   "border-indigo-500/20 bg-indigo-500/10 text-indigo-400",
    heading: "from-indigo-400 to-purple-400",
  },
  violet: {
    border:  "hover:border-violet-500/30",
    iconBg:  "bg-violet-500/10 text-violet-400",
    bar:     "bg-violet-500",
    barGlow: "shadow-[0_0_8px_rgba(139,92,246,0.5)]",
    label:   "text-violet-400",
    badge:   "border-violet-500/20 bg-violet-500/10 text-violet-400",
    heading: "from-violet-400 to-purple-400",
  },
  slate: {
    border:  "hover:border-slate-500/40",
    iconBg:  "bg-slate-500/10 text-slate-400",
    bar:     "bg-slate-400",
    barGlow: "shadow-[0_0_8px_rgba(148,163,184,0.4)]",
    label:   "text-slate-400",
    badge:   "border-slate-500/20 bg-slate-500/10 text-slate-400",
    heading: "from-slate-300 to-slate-400",
  },
  amber: {
    border:  "hover:border-amber-500/30",
    iconBg:  "bg-amber-500/10 text-amber-400",
    bar:     "bg-amber-500",
    barGlow: "shadow-[0_0_8px_rgba(245,158,11,0.4)]",
    label:   "text-amber-400",
    badge:   "border-amber-500/20 bg-amber-500/10 text-amber-400",
    heading: "from-amber-400 to-orange-400",
  },
};

function SkillBar({ skill, color, index, inView }: {
  skill: Skill; color: keyof typeof colorMap; index: number; inView: boolean;
}) {
  const c = colorMap[color];
  return (
    <div className="group">
      <div className="mb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-200">{skill.name}</span>
          {skill.note && (
            <span className="hidden text-[11px] text-gray-600 group-hover:text-gray-500 sm:inline">
              — {skill.note}
            </span>
          )}
        </div>
        <motion.span
          className={`font-mono text-xs font-semibold ${c.label}`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 + index * 0.06 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className={`h-full rounded-full ${c.bar} ${c.barGlow}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={inView ? { x: "400%" } : {}}
          transition={{ duration: 0.9, delay: 0.5 + index * 0.08, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function SkillGroupCard({ group, index }: { group: SkillGroup; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const c = colorMap[group.color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-2xl border border-white/[0.06] bg-[#111827] p-6 transition-all duration-300 ${c.border} hover:shadow-[0_12px_48px_rgba(0,0,0,0.3)]`}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${c.iconBg}`}>
            {group.icon}
          </div>
          <div>
            <h3 className={`bg-gradient-to-r ${c.heading} bg-clip-text text-base font-bold text-transparent`}>
              {group.label}
            </h3>
            <p className="mt-0.5 text-[11px] leading-snug text-gray-600">{group.description}</p>
          </div>
        </div>
        {group.id === "devops" && (
          <span className={`flex-shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${c.badge}`}>
            Leveling up
          </span>
        )}
      </div>
      <div className="mb-5 h-px w-full bg-white/[0.04]" />
      <div className="flex flex-col gap-4">
        {group.skills.map((skill, i) => (
          <SkillBar key={skill.name} skill={skill} color={group.color} index={i} inView={inView} />
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-[10px] text-gray-700">
          {group.skills.length} {group.skills.length === 1 ? "skill" : "skills"}
        </span>
        <div className="flex gap-1">
          {group.skills.map((s) => (
            <div
              key={s.name}
              title={s.name}
              className={`h-1 rounded-full ${c.bar} opacity-40`}
              style={{ width: `${Math.max(s.level * 0.2, 10)}px` }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">
      <span className="h-1 w-1 rounded-full bg-indigo-400" />
      {children}
    </div>
  );
}

export default function SkillsSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });
  const totalSkills = skillGroups.reduce((acc, g) => acc + g.skills.length, 0);

  return (
    <section id="skills" className="relative bg-[#0B0F19] py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full bg-indigo-600/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <SectionLabel>Skills</SectionLabel>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Stack &{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                proficiency.
              </span>
            </h2>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              {[
                { label: `${totalSkills} skills tracked`, color: "text-gray-400" },
                { label: "3 solid groups",         color: "text-green-400" },
                { label: "1 actively learning",    color: "text-amber-400" },
              ].map(({ label, color }) => (
                <span key={label} className={`rounded-full border border-white/5 bg-white/[0.03] px-3 py-1 text-xs font-medium ${color}`}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <SkillGroupCard key={group.id} group={group} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 text-center text-xs text-gray-700"
        >
          Proficiency levels are self-assessed based on real project usage — not certifications.
        </motion.p>
      </div>
    </section>
  );
}