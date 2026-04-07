"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ExternalLink, Github, ArrowUpRight,
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
    id: "logpulse",
    tag: "SaaS / Analytics",
    title: "LogPulse",
    tagline: "Multi-tenant log analytics platform with real-time alerting.",
    problem:
      "Small engineering teams running on AWS/VPS had no affordable way to centralize application logs and get notified when error rates spiked. Existing tools like Datadog start at $15/host/month — overkill for a 3-person startup.",
    built:
      "A multi-tenant SaaS platform where teams pipe logs via a lightweight SDK or HTTP endpoint. The backend ingests, parses, and indexes log entries using PostgreSQL full-text search. Users get a dashboard with error-rate graphs, a query interface, and configurable alert rules that fire via email or webhook.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Redis", "JWT", "Tailwind"],
    highlights: [
      "Handles ~50k log entries/day per tenant on a $6 VPS",
      "Multi-tenant isolation via row-level security in PostgreSQL",
      "Redis pub/sub for real-time log streaming to the dashboard",
    ],
    icon: <Activity size={20} />,
    accentColor: "indigo",
    githubUrl: "https://github.com/munna/logpulse",
    liveUrl: "https://logpulse.demo.dev",
  },
  {
    id: "cartflow",
    tag: "E-Commerce",
    title: "CartFlow",
    tagline: "Headless e-commerce engine with inventory and order management.",
    problem:
      "A local electronics retailer needed a custom storefront — Shopify was too expensive for their margins, and WooCommerce couldn't handle the inventory sync between their physical store and online orders. They were manually reconciling stock in a spreadsheet.",
    built:
      "A headless e-commerce system with a Next.js storefront and a separate admin panel. The backend exposes a REST API handling products, variants, inventory, orders, and discount codes. Stock is tracked in real time using database-level locking to prevent overselling. Orders flow through a status machine with email notifications at each stage.",
    stack: ["Next.js", "Express", "MongoDB", "Stripe", "Cloudinary", "Node.js", "TypeScript"],
    highlights: [
      "Pessimistic locking prevents race conditions on low-stock items",
      "Stripe webhook handler with idempotency key validation",
      "Admin panel with bulk CSV import for 500+ product catalog",
    ],
    icon: <ShoppingCart size={20} />,
    accentColor: "violet",
    githubUrl: "https://github.com/munna/cartflow",
    liveUrl: "https://cartflow.demo.dev",
  },
  {
    id: "infrasight",
    tag: "DevOps / Monitoring",
    title: "InfraSight",
    tagline: "Self-hosted infrastructure monitoring with Prometheus + Grafana.",
    problem:
      "A side project running on three VPS nodes had no visibility into CPU spikes, memory leaks, or disk pressure until something actually went down. Managed monitoring was either too expensive or too complex to set up for a solo project.",
    built:
      "A Docker Compose stack that spins up Prometheus, Grafana, Node Exporter, and a custom alert manager in under 5 minutes on any Linux VPS. Includes pre-built Grafana dashboards for system metrics, a PostgreSQL exporter for query performance, and a webhook bridge that posts alerts to Discord or Slack.",
    stack: ["Docker", "Prometheus", "Grafana", "Node Exporter", "PostgreSQL Exporter", "Bash"],
    highlights: [
      "One-command deploy: docker compose up -d on a fresh VPS",
      "Pre-configured alert rules for CPU >85%, disk >90%, OOM events",
      "Custom PostgreSQL dashboard tracking slow queries and lock waits",
    ],
    icon: <Server size={20} />,
    accentColor: "emerald",
    githubUrl: "https://github.com/munna/infrasight",
    liveUrl: "https://infrasight.demo.dev",
  },
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
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111827] transition-all duration-500 ${c.border}`}
    >
      {/* Ambient gradient top-left */}
      <div className={`pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-gradient-to-br ${c.grad} blur-2xl`} />

      {/* Large ghost number */}
      <div className={`pointer-events-none absolute right-6 top-4 font-black ${c.number} select-none`}
        style={{ fontSize: "clamp(4rem,8vw,6rem)", lineHeight: 1, fontFamily: "system-ui" }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10 p-7">
        {/* Top row */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${c.iconWrap}`}>
              {project.icon}
            </div>
            <div>
              <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${c.tag}`}>
                {project.tag}
              </span>
              <h3 className="mt-1 text-xl font-black tracking-tight text-white">{project.title}</h3>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-shrink-0 items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-200 ${c.btn}`}
              aria-label="GitHub"
            >
              <Github size={13} />
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
        <p className="mb-4 text-sm font-medium leading-relaxed text-gray-300">{project.tagline}</p>

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
              <li key={h} className="flex items-start gap-2 text-xs leading-relaxed text-gray-500">
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
              className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-gray-500 transition-colors duration-150 hover:text-gray-300"
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
            className="group/link flex items-center gap-1.5 text-xs font-semibold text-gray-500 transition-colors duration-200 hover:text-white"
          >
            <Github size={13} />
            View source
            <ArrowUpRight size={11} className="transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
          <span className="h-3 w-px bg-white/10" />
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
    <section id="projects" className="relative bg-[#0B0F19] py-28">
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
            <h2 className="max-w-lg text-4xl font-black tracking-tight text-white sm:text-5xl">
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
              href="https://github.com/munna"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 underline underline-offset-2 transition-colors hover:text-gray-300"
            >
              github.com/munna
            </a>
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/10" />
        </motion.div>

      </div>
    </section>
  );
}