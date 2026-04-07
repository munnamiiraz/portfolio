"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Sparkles, Layout, Database, Cpu, Cloud, Globe, Zap, Code2 } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  note?: string;
}

interface SkillGroup {
  id: string;
  label: string;
  color: "indigo" | "violet" | "slate" | "amber" | "emerald";
  icon: React.ReactNode;
  description: string;
  skills: Skill[];
}

const skillGroups: SkillGroup[] = [
  {
    id: "overview",
    label: "Overview",
    color: "emerald",
    icon: <Sparkles size={18} />,
    description: "Multi-disciplinary developer focused on building high-performance agentic systems and scalable architectures.",
    skills: [], // Handled specially
  },
  {
    id: "frontend",
    label: "Frontend",
    color: "indigo",
    icon: <Layout size={18} />,
    description: "Crafting premium user experiences with modern frameworks and smooth interactions.",
    skills: [
      { name: "React",        level: 88, note: "hooks, context, patterns" },
      { name: "Next.js",      level: 85, note: "App Router, RSC" },
      { name: "TypeScript",   level: 82, note: "Generics, Utility types" },
      { name: "Tailwind CSS", level: 90, note: "Design systems" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "violet",
    icon: <Database size={18} />,
    description: "Designing robust server-side logic and optimized database schemas.",
    skills: [
      { name: "Node.js",    level: 87, note: "Event loop, streams" },
      { name: "Express",    level: 84, note: "REST, middleware" },
      { name: "PostgreSQL", level: 80, note: "Indexing, transactions" },
      { name: "Prisma",     level: 83, note: "ORM, migrations" },
      { name: "MongoDB",    level: 78, note: "Aggregations" },
    ],
  },
  {
    id: "ai",
    label: "AI & Agents",
    color: "indigo",
    icon: <Cpu size={18} />,
    description: "Building autonomous systems with state-of-the-art LLM orchestrators.",
    skills: [
      { name: "GenAI / LLMs", level: 85, note: "RAG, prompt engineering" },
      { name: "LangChain",    level: 82, note: "Chains, tools" },
      { name: "LangGraph",    level: 78, note: "Multi-agent workflows" },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    color: "amber",
    icon: <Cloud size={18} />,
    description: "Ensuring elastic scaling and reliable delivery in the cloud.",
    skills: [
      { name: "AWS",         level: 75, note: "S3, EC2, CloudFront" },
      { name: "Docker",      level: 80, note: "Containerization" },
      { name: "CI/CD",       level: 65, note: "Automated pipelines" },
    ],
  },
];

const colorMap = {
  indigo: {
    active: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    bar: "bg-indigo-500",
    glow: "shadow-[0_0_12px_rgba(99,102,241,0.4)]",
  },
  violet: {
    active: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    bar: "bg-violet-500",
    glow: "shadow-[0_0_12px_rgba(139,92,246,0.4)]",
  },
  amber: {
    active: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    bar: "bg-amber-500",
    glow: "shadow-[0_0_12px_rgba(245,158,11,0.4)]",
  },
  emerald: {
    active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    bar: "bg-emerald-500",
    glow: "shadow-[0_0_12px_rgba(16,185,129,0.4)]",
  },
  slate: {
    active: "bg-slate-500/10 text-slate-400 border-slate-500/30",
    bar: "bg-slate-500",
    glow: "shadow-[0_0_12px_rgba(148,163,184,0.4)]",
  },
};

function SkillBar({ skill, color, index }: { skill: Skill; color: keyof typeof colorMap; index: number }) {
  const c = colorMap[color];
  return (
    <div className="group">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900 dark:text-white">{skill.name}</span>
          <span className="text-[10px] text-gray-500 dark:text-gray-600 italic opacity-0 transition-opacity group-hover:opacity-100">
            {skill.note}
          </span>
        </div>
        <span className="font-mono text-xs font-bold text-indigo-400">{skill.level}%</span>
      </div>
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/5">
        <motion.div
          className={`h-full rounded-full ${c.bar} ${c.glow}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.05, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function OverviewPanel() {
  const coreStats = [
    { label: "Frontend", value: "React / Next.js", icon: <Globe size={16} /> },
    { label: "Backend", value: "Node.js / Express", icon: <Database size={16} /> },
    { label: "Database", value: "PostgreSQL / Prisma", icon: <Zap size={16} /> },
    { label: "AI & Agents", value: "LangChain / LLMs", icon: <Sparkles size={16} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="grid gap-6 sm:grid-cols-2"
    >
      {coreStats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="flex flex-col rounded-2xl border border-black/5 dark:border-white/5 bg-gray-100/50 dark:bg-black/40 p-5 transition-all hover:border-indigo-500/20 group"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              {stat.icon}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{stat.label}</span>
          </div>
          <span className="text-lg font-black text-gray-900 dark:text-white">{stat.value}</span>
        </motion.div>
      ))}
      <div className="sm:col-span-2 mt-2 rounded-2xl border border-white/5 bg-linear-to-r from-indigo-500/5 to-purple-500/5 p-6 border-dashed">
        <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-indigo-400">Core Expertise</h4>
        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          I specialize in building full-stack applications that leverage autonomous AI agents for complex task orchestration. From zero-downtime AWS deployments to pixel-perfect Next.js interfaces, I maintain a high standard of architectural integrity across the entire lifecycle.
        </p>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState(skillGroups[0].id);
  const activeGroup = skillGroups.find((g) => g.id === activeTab)!;

  return (
    <section id="skills" className="relative bg-white dark:bg-[#0B0F19] py-10 transition-colors duration-300">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        
        {/* Simple Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
            Technical <span className="bg-gradient-to-r from-indigo-500 via-purple-400 to-indigo-500 bg-clip-text text-transparent">Prowess.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-400">
            A comprehensive look at my technical landscape. Select a category below to view specific skill proficiencies in detail.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {skillGroups.map((group) => {
            const isActive = activeTab === group.id;
            const c = colorMap[group.color];

            return (
              <button
                key={group.id}
                onClick={() => setActiveTab(group.id)}
                className={`flex items-center gap-2.5 rounded-xl border px-6 py-3 text-sm font-bold transition-all duration-300 pointer-events-auto
                  ${isActive 
                    ? `${c.active} shadow-lg shadow-indigo-500/10 scale-[1.02]` 
                    : "border-black/5 dark:border-white/5 bg-gray-50 dark:bg-white/3 text-gray-500 hover:border-indigo-500/30 hover:text-indigo-400 hover:scale-105"}`}
              >
                <span className={isActive ? "text-current" : "text-gray-600"}>
                   {group.icon}
                </span>
                {group.label}
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          
          {/* Detailed Info (Left) */}
          <div className="flex flex-col justify-center rounded-3xl border border-black/5 dark:border-white/5 bg-gray-50 dark:bg-black/20 p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${colorMap[activeGroup.color].active}`}>
                   {activeGroup.icon}
                </div>
                <h3 className="mb-3 text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                  {activeGroup.id === 'overview' ? 'Expertise' : activeGroup.label} Domain
                </h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {activeGroup.description}
                </p>
                
                {activeGroup.id !== 'overview' && (
                  <div className="mt-8 flex flex-wrap gap-2">
                    {activeGroup.skills.map(s => (
                      <span key={s.name} className="rounded-lg border border-white/5 bg-white/[0.05] px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {s.name}
                      </span>
                    ))}
                  </div>
                )}

                {activeGroup.id === 'overview' && (
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Cross-Platform Specialist</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Agentic AI Architect</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Visualization (Right) */}
          <div className="rounded-3xl border border-black/5 dark:border-white/10 bg-gray-50 dark:bg-white/1 p-8 lg:p-12">
            <AnimatePresence mode="wait">
               {activeGroup.id === 'overview' ? (
                 <OverviewPanel key="overview" />
               ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-x-12 gap-y-10 sm:grid-cols-2"
                >
                  {activeGroup.skills.map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} color={activeGroup.color} index={i} />
                  ))}
                </motion.div>
               )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}