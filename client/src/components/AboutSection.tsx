"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Server,
  Layers,
  Container,
  Trophy,
  ArrowUpRight,
  CheckCircle2,
  Clock,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FocusCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  status: "solid" | "learning";
}

interface TimelineItem {
  year: string;
  title: string;
  detail: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const focusAreas: FocusCard[] = [
  {
    icon: <Trophy size={18} />,
    title: "Algorithms & Problem Solving",
    description:
      "80+ rated contests on Codeforces. Strong grasp of graph algorithms, dynamic programming, and data structures — skills that translate directly into clean production code.",
    tags: ["Codeforces", "DSA", "Graph Theory", "DP"],
    status: "solid",
  },
  {
    icon: <Layers size={18} />,
    title: "Full-Stack Development",
    description:
      "Built complete applications end-to-end — from database schema design to UI. Comfortable owning a feature across the entire stack without being a generalist who runs shallow everywhere.",
    tags: ["Next.js", "React", "TypeScript", "REST"],
    status: "solid",
  },
  {
    icon: <Server size={18} />,
    title: "Backend & System Design",
    description:
      "Primary focus. Designing APIs that scale, picking the right database for the job, understanding trade-offs in distributed systems — this is where most of my thinking goes.",
    tags: ["Node.js", "PostgreSQL", "MongoDB", "Prisma"],
    status: "solid",
  },
  {
    icon: <Container size={18} />,
    title: "DevOps & Infrastructure",
    description:
      "Actively learning. Comfortable with Docker and basic CI/CD pipelines. Exploring observability — Prometheus and Grafana for monitoring production systems.",
    tags: ["Docker", "CI/CD", "Prometheus", "Grafana"],
    status: "learning",
  },
];

const timeline: TimelineItem[] = [
  {
    year: "2022",
    title: "Started competitive programming",
    detail: "Joined Codeforces, began systematic study of algorithms and data structures.",
  },
  {
    year: "2023",
    title: "Built first production-grade app",
    detail:
      "Shipped a full-stack SaaS project with auth, payments integration, and a real user base.",
  },
  {
    year: "2023",
    title: "Selected — Top 100 / 1300",
    detail:
      "Placed in the top 8% of a competitive developer placement program based on DSA + system design.",
  },
  {
    year: "2024",
    title: "Shifted focus to backend depth",
    detail:
      "Started studying distributed systems, database internals, and API performance at scale.",
  },
  {
    year: "2025",
    title: "Expanding into DevOps",
    detail:
      "Containerizing projects with Docker, building CI/CD pipelines, and learning production monitoring.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">
      <span className="h-1 w-1 rounded-full bg-indigo-400" />
      {children}
    </div>
  );
}

function FocusAreaCard({ card, index }: { card: FocusCard; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border border-white/5 bg-[#111827] p-5 transition-all duration-300 hover:border-indigo-500/25 hover:shadow-[0_8px_40px_rgba(99,102,241,0.08)]"
    >
      {/* Status indicator */}
      <div className="absolute right-4 top-4">
        {card.status === "learning" ? (
          <span className="flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
            <Clock size={9} />
            Learning
          </span>
        ) : (
          <span className="flex items-center gap-1 rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-[10px] font-semibold text-green-400">
            <CheckCircle2 size={9} />
            Solid
          </span>
        )}
      </div>

      {/* Icon */}
      <div
        className={`mb-4 inline-flex items-center justify-center rounded-xl p-2.5 ${
          card.status === "learning"
            ? "bg-amber-500/10 text-amber-400"
            : "bg-indigo-500/10 text-indigo-400"
        }`}
      >
        {card.icon}
      </div>

      <h3 className="mb-2 text-sm font-semibold text-white">{card.title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-gray-500">{card.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-white/5 bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-gray-500"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function TimelineRow({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group relative flex gap-4 pb-6 last:pb-0"
    >
      {/* Line + dot */}
      <div className="relative flex flex-col items-center">
        <div className="z-10 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-indigo-500/40 bg-[#0B0F19] transition-colors duration-200 group-hover:border-indigo-400 group-hover:bg-indigo-500/10">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
        </div>
        <div className="mt-1.5 w-px flex-1 bg-gradient-to-b from-indigo-500/20 to-transparent" />
      </div>

      <div className="pb-1 pt-0.5">
        <div className="mb-0.5 font-mono text-[11px] font-semibold text-indigo-400">{item.year}</div>
        <div className="mb-1 text-sm font-semibold text-white">{item.title}</div>
        <div className="text-xs leading-relaxed text-gray-500">{item.detail}</div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AboutSection() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative bg-[#0B0F19] py-28">
      {/* Subtle top border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">

        {/* ── Section Heading ── */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <SectionLabel>About</SectionLabel>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl">
              The background,{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                unfiltered.
              </span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-gray-500 sm:text-right">
              No fluff. Here's where I spend my time, what I've shipped, and
              what I'm actively improving.
            </p>
          </div>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

          {/* LEFT: Focus cards grid */}
          <div>
            <div className="mb-6 flex items-center gap-2">
              <Code2 size={14} className="text-indigo-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Where I spend my time
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {focusAreas.map((card, i) => (
                <FocusAreaCard key={card.title} card={card} index={i} />
              ))}
            </div>

            {/* Inline summary quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-8 rounded-2xl border border-indigo-500/15 bg-indigo-500/[0.06] p-5"
            >
              <div className="mb-3 h-0.5 w-8 rounded-full bg-indigo-500/40" />
              <p className="text-sm leading-relaxed text-gray-400">
                My approach: understand the problem before picking the tool. I've seen too many
                systems built around a framework instead of a requirement. I try to go the other direction —{" "}
                <span className="font-medium text-gray-200">
                  constraints first, then architecture.
                </span>
              </p>
            </motion.blockquote>
          </div>

          {/* RIGHT: Timeline + quick stats */}
          <div className="flex flex-col gap-8">

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-white/5 bg-[#111827] p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  Timeline
                </span>
                <span className="font-mono text-[11px] text-gray-600">2022 → now</span>
              </div>
              <div>
                {timeline.map((item, i) => (
                  <TimelineRow key={item.year + item.title} item={item} index={i} />
                ))}
              </div>
            </motion.div>

            {/* Quick stat cards */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-3"
            >
              {[
                { value: "80+", label: "CF contests", color: "text-indigo-400" },
                { value: "Top 8%", label: "Placement rank", color: "text-green-400" },
                { value: "15+", label: "Projects shipped", color: "text-purple-400" },
                { value: "2 yrs", label: "In the craft", color: "text-amber-400" },
              ].map(({ value, label, color }) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/5 bg-[#111827] p-4 text-center"
                >
                  <div className={`text-xl font-black ${color}`}>{value}</div>
                  <div className="mt-0.5 text-[11px] text-gray-600">{label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA card */}
            <motion.a
              href="#projects"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-center justify-between rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.07] p-5 transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/[0.12] cursor-pointer no-underline"
            >
              <div>
                <div className="text-sm font-semibold text-white">See the actual work</div>
                <div className="mt-0.5 text-xs text-gray-500">
                  Projects with real context and trade-offs
                </div>
              </div>
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-indigo-500/30 text-indigo-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                <ArrowUpRight size={15} />
              </div>
            </motion.a>

          </div>
        </div>
      </div>
    </section>
  );
}