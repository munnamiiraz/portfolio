"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ExternalLink, GitBranch, ArrowUpRight,
  Server, ShoppingCart, Activity,
  ChevronRight, Layers, Zap, Shield
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  id: string;
  tag: string;
  title: string;
  tagline: string;
  problem: string;
  built: string;
  stack: string[];
  highlights: string[];
  icon: React.ReactNode;
  accentColor: "indigo" | "violet" | "emerald";
  githubUrl: string;
  liveUrl: string;
}

// ─── Color maps ───────────────────────────────────────────────────────────────
const accent = {
  indigo: {
    tag:       "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    iconWrap:  "bg-indigo-500/10 text-indigo-400",
    border:    "hover:border-indigo-500/30 group-hover:shadow-[0_20px_60px_rgba(99,102,241,0.1)]",
    bar:       "bg-indigo-500",
    highlight: "text-indigo-400",
    btn:       "border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10",
    number:    "text-indigo-500/20",
    grad:      "from-indigo-500/10 via-transparent to-transparent",
  },
  violet: {
    tag:       "bg-violet-500/10 text-violet-400 border-violet-500/20",
    iconWrap:  "bg-violet-500/10 text-violet-400",
    border:    "hover:border-violet-500/30 group-hover:shadow-[0_20px_60px_rgba(139,92,246,0.1)]",
    bar:       "bg-violet-500",
    highlight: "text-violet-400",
    btn:       "border-violet-500/30 text-violet-400 hover:bg-violet-500/10",
    number:    "text-violet-500/20",
    grad:      "from-violet-500/10 via-transparent to-transparent",
  },
  emerald: {
    tag:       "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    iconWrap:  "bg-emerald-500/10 text-emerald-400",
    border:    "hover:border-emerald-500/30 group-hover:shadow-[0_20px_60px_rgba(16,185,129,0.1)]",
    bar:       "bg-emerald-500",
    highlight: "text-emerald-400",
    btn:       "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10",
    number:    "text-emerald-500/20",
    grad:      "from-emerald-500/10 via-transparent to-transparent",
  },
};

// ─── Project Data ─────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    id: "launchforge",
    tag: "SaaS / Waitlist",
    title: "LaunchForge",
    tagline: "High-performance waitlist automation for modern SaaS launches.",
    problem:
      "Founders and developers need a high-conversion way to validate ideas and gather emails without spending 2 days building a custom landing page and backend tracking system.",
    built:
      "A complete full-stack solution featuring slug-based routing, real-time leaderboards, and referral tracking. The backend handles high-concurrency requests and utilizes Stripe for subscription management.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Stripe", "Framer Motion", "Tailwind"],
    highlights: [
      "Dynamic slug-based routing for custom waitlist URLs",
      "Referral-based leaderboard system to gamify waitlist growth",
      "Full Stripe integration for handling tiered workspace plans",
    ],
    icon: <Zap size={20} />,
    accentColor: "indigo",
    githubUrl: "https://github.com/munnamiiraz/Launch-Forge",
    liveUrl: "https://launch-vauge.vercel.app/",
  },
  {
    id: "skillbridge",
    tag: "Marketplace / Booking",
    title: "SkillBridge",
    tagline: "Student-tutor marketplace with real-time session booking.",
    problem:
      "Students struggle to find specialized tutors for specific academic needs, and tutors lack a centralized platform to manage availability and incoming request pipelines.",
    built:
      "A marketplace platform with separate student and tutor dashboards. Students can browse, book, and track sessions, while tutors have full control over their availability patterns and session management.",
    stack: ["React", "Express", "Node.js", "MongoDB", "TanStack Query", "JWT", "Tailwind"],
    highlights: [
      "Complex availability state management for tutors",
      "Real-time session booking and conflict resolution",
      "Robust client-server architecture with JWT-based auth",
    ],
    icon: <Layers size={20} />,
    accentColor: "violet",
    githubUrl: "https://github.com/munnamiiraz/SkillBridge-Client",
    liveUrl: "https://skill-bridge-client-iota.vercel.app",
  },
  {
    id: "appifylab",
    tag: "Social / Photos",
    title: "AppifyLab",
    tagline: "A modern photo-centric social platform for seamless image sharing.",
    problem:
      "Users often face friction when trying to share high-quality photography without the bloat of traditional social networks. Existing open-source alternatives lacked a refined UI and easy photo management.",
    built:
      "A full-stack social media application with a clean, grid-based photo feed. It features secure user authentication, real-time image uploads, and a responsive interface that prioritizes visual content across all devices.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Cloudinary", "Tailwind", "JWT"],
    highlights: [
      "Optimized photo upload pipeline with real-time progress",
      "Robust state management for social feeds and interactions",
      "Secure cloud storage integration for heavy image assets",
    ],
    icon: <Activity size={20} />,
    accentColor: "indigo",
    githubUrl: "https://github.com/munnamiiraz/AppifyLabDemo",
    liveUrl: "https://appifylabdemo-frontend.onrender.com/",
  }
];

// ─── Section Label ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">
      <span className="h-1 w-1 rounded-full bg-indigo-400" />
      {children}
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState(false);
  const c = accent[project.accentColor];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/6 bg-gray-50 dark:bg-[#111827] transition-all duration-500 ${c.border}`}
    >
      {/* Ambient gradient top-left */}
      <div className={`pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-gradient-to-br ${c.grad} blur-2xl`} />

      {/* Large ghost number */}
      <div className={`pointer-events-none absolute -bottom-1 -right-1 font-black ${c.number} select-none opacity-50`}
        style={{ fontSize: "clamp(5rem,10vw,7rem)", lineHeight: 0.8, fontFamily: "system-ui" }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10 p-7">
        {/* Top row */}
        <div className="mb-6 flex items-start justify-between gap-2 overflow-hidden">
          <div className="flex flex-1 items-center gap-3 overflow-hidden">
            <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${c.iconWrap}`}>
              {project.icon}
            </div>
            <div className="min-w-0 flex-1">
              <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-tight ${c.tag}`}>
                {project.tag}
              </span>
              <h3 className="mt-1.5 truncate text-xl font-black tracking-tighter text-gray-900 dark:text-white">{project.title}</h3>
            </div>
          </div>

          {/* Links - Higher Z and Background to prevent ghost overlap if it reaches here */}
          <div className="relative z-20 flex flex-shrink-0 items-center gap-2.5">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-200 ${c.btn}`}
              aria-label="GitHub"
            >
              <GitBranch size={13} />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-200 ${c.btn}`}
              aria-label="Live"
            >
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Tagline */}
        <p className="mb-4 text-sm font-medium leading-relaxed text-gray-700 dark:text-gray-300">{project.tagline}</p>

        {/* Divider */}
        <div className="mb-4 h-px bg-white/[0.05]" />

        {/* Problem */}
        <div className="mb-4">
          <div className="mb-1.5 flex items-center gap-1.5">
            <Shield size={11} className="text-gray-600" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">Problem</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-500">{project.problem}</p>
        </div>

        {/* What was built — expandable */}
        <div className="mb-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="mb-1.5 flex w-full items-center gap-1.5 text-left"
          >
            <Layers size={11} className="text-gray-600" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">
              What I built
            </span>
            <motion.span
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="ml-auto"
            >
              <ChevronRight size={12} className="text-gray-600" />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden text-sm leading-relaxed text-gray-500"
              >
                {project.built}
              </motion.p>
            )}
          </AnimatePresence>

          {!expanded && (
            <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">{project.built}</p>
          )}
        </div>

        {/* Highlights */}
        <div className="mb-5">
          <div className="mb-2 flex items-center gap-1.5">
            <Zap size={11} className="text-gray-600" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">
              Key decisions
            </span>
          </div>
          <ul className="space-y-1.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-xs leading-relaxed text-gray-700 dark:text-gray-500">
                <span className={`mt-1.5 h-1 w-1 flex-shrink-0 rounded-full ${c.bar}`} />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Stack pills */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-black/5 dark:border-white/6 bg-black/3 dark:bg-white/3 px-2 py-0.5 font-mono text-[11px] text-gray-600 dark:text-gray-500 transition-colors duration-150 hover:text-gray-900 dark:hover:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom CTA row */}
        <div className="flex items-center gap-3 border-t border-white/[0.04] pt-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="group/link flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:hover:text-white"
          >
            <GitBranch size={13} />
            View source
            <ArrowUpRight size={11} className="transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
          <span className="h-3 w-px bg-black/10 dark:bg-white/10" />
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className={`group/link flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200 ${c.highlight}`}
          >
            <ExternalLink size={13} />
            Live demo
            <ArrowUpRight size={11} className="transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative bg-white dark:bg-[#0B0F19] py-14 transition-colors duration-300">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Glows */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <SectionLabel>Projects</SectionLabel>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-lg text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Things I've{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                actually shipped.
              </span>
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500 sm:text-right">
              Real problems, real constraints. Each project has a reason it exists beyond being a portfolio piece.
            </p>
          </div>
        </motion.div>

        {/* Cards — 3-col on xl, 2-col on lg, 1-col below */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-3"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-xs text-gray-700">
            More on{" "}
            <a
              href="https://github.com/munnamiiraz"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 underline underline-offset-2 transition-colors hover:text-gray-300"
            >
              github.com/munnamiiraz
            </a>
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/10" />
        </motion.div>

      </div>
    </section>
  );
}