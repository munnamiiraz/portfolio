"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Mail, Github, ExternalLink, Terminal, Cpu, Layers, Zap } from "lucide-react";
import Image from "next/image";

// ─── Floating Badge ───────────────────────────────────────────────────────────
interface FloatingBadgeProps {
  icon: React.ReactNode;
  label: string;
  style: React.CSSProperties;
  delay: number;
}

function FloatingBadge({ icon, label, style, delay }: FloatingBadgeProps) {
  return (
    <motion.div
      className="absolute flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#111827]/80 px-3 py-1.5 text-xs font-medium text-gray-300 shadow-lg backdrop-blur-sm"
      style={style}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.08, borderColor: "rgba(99,102,241,0.5)" }}
    >
      <span className="text-indigo-400">{icon}</span>
      {label}
    </motion.div>
  );
}

// ─── Typewriter Hook ───────────────────────────────────────────────────────────
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayed(current.slice(0, displayed.length + 1));
          if (displayed.length + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), pause);
          }
        } else {
          setDisplayed(current.slice(0, displayed.length - 1));
          if (displayed.length - 1 === 0) {
            setIsDeleting(false);
            setWordIndex((i) => i + 1);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, speed, pause]);

  return displayed;
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(value / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl font-bold text-white">
        {count}
        <span className="text-indigo-400">{suffix}</span>
      </div>
      <div className="mt-0.5 text-xs text-gray-500">{label}</div>
    </div>
  );
}

// ─── Magnetic Button ──────────────────────────────────────────────────────────
function MagneticButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

// ─── Main Hero Section ────────────────────────────────────────────────────────
export default function HeroSection() {
  const roles = ["Full Stack Developer", "Backend Engineer", "System Designer", "DSA Enthusiast"];
  const role = useTypewriter(roles);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0B0F19]"
    >
      {/* ── Background Grid ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Radial Glow ── */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-green-500/6 blur-[100px]" />

      {/* ── Noise Texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:py-0">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-12">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-4 py-1.5 text-sm text-green-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Available for remote opportunities
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Hi, I'm{" "}
                <span className="relative inline-block">
                  <span
                    className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
                    style={{ backgroundSize: "200% auto", animation: "shimmer 4s linear infinite" }}
                  >
                    Munna
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                    style={{ transformOrigin: "left" }}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Typewriter Role */}
            <motion.div variants={itemVariants} className="mt-4 flex items-center justify-center gap-2 lg:justify-start">
              <Terminal size={16} className="text-indigo-400" />
              <span className="font-mono text-xl font-semibold text-gray-300 sm:text-2xl">
                {role}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                  className="ml-0.5 inline-block h-6 w-0.5 bg-indigo-400 align-middle"
                />
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-lg text-base leading-relaxed text-gray-400 sm:text-lg lg:mx-0 mx-auto"
            >
              I build{" "}
              <span className="text-white font-medium">scalable web applications</span>{" "}
              with clean architecture and real-world performance in mind — from database design to deployment pipelines.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <MagneticButton
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </MagneticButton>

              <MagneticButton
                className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/50 hover:bg-white/10 hover:text-white"
              >
                <Mail size={15} />
                Contact Me
              </MagneticButton>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="mt-6 flex items-center justify-center gap-4 lg:justify-start">
              {[
                { icon: <Github size={18} />, label: "GitHub", href: "#" },
                { icon: <ExternalLink size={18} />, label: "LinkedIn", href: "#" },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors duration-200 hover:text-indigo-400"
                >
                  {icon}
                  <span>{label}</span>
                </a>
              ))}
              <span className="h-4 w-px bg-white/10" />
              <span className="text-xs text-gray-600">munna@dev.io</span>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={itemVariants}
              className="mt-10 inline-grid grid-cols-3 gap-6 rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-4 backdrop-blur-sm"
            >
              <StatCounter value={80} suffix="+" label="CF Contests" />
              <div className="w-px bg-white/5" />
              <StatCounter value={15} suffix="+" label="Projects Built" />
              <div className="w-px bg-white/5" />
              <StatCounter value={2} suffix="yr" label="Experience" />
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-500/10 to-transparent blur-2xl" />

            {/* Rotating Dashed Ring */}
            <motion.div
              className="absolute -inset-4 rounded-full border border-dashed border-indigo-500/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -inset-8 rounded-full border border-dashed border-white/5"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />

            {/* Profile Image Container */}
            <motion.div
              className="relative h-72 w-72 overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:h-80 sm:w-80 lg:h-96 lg:w-96"
              whileHover={{ scale: 1.02, borderColor: "rgba(99,102,241,0.4)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0B0F19]/60 via-transparent to-transparent" />

              {/* Code Pattern Background (placeholder until real photo) */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#1a1f35] to-[#0d1117]"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 30%, rgba(99,102,241,0.15) 0%, transparent 60%),
                    radial-gradient(circle at 70% 70%, rgba(34,197,94,0.08) 0%, transparent 50%)`,
                }}
              />

              {/* Placeholder avatar */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="h-28 w-28 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-xl">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#1a1f35] text-4xl font-black text-white">
                    M
                  </div>
                </div>
                <p className="mt-3 text-sm font-medium text-gray-400">
                  Replace with <code className="text-indigo-400 text-xs">/public/avatar.jpg</code>
                </p>
              </div>

              {/* Scanline effect */}
              <motion.div
                className="absolute inset-0 z-20 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
              />
            </motion.div>

            {/* Floating Badges */}
            <FloatingBadge
              icon={<Layers size={12} />}
              label="Next.js"
              style={{ top: "-12px", left: "-20px" }}
              delay={0.8}
            />
            <FloatingBadge
              icon={<Cpu size={12} />}
              label="Node.js"
              style={{ top: "30%", right: "-30px" }}
              delay={1.0}
            />
            <FloatingBadge
              icon={<Zap size={12} />}
              label="PostgreSQL"
              style={{ bottom: "18%", left: "-30px" }}
              delay={1.2}
            />
            <FloatingBadge
              icon={<Terminal size={12} />}
              label="Docker"
              style={{ bottom: "-12px", right: "10%" }}
              delay={1.4}
            />

            {/* Codeforces badge */}
            <motion.div
              className="absolute -top-5 right-0 rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-400 shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, type: "spring" }}
            >
              🏆 Top 100 / 1300
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5"
          animate={{ borderColor: ["rgba(255,255,255,0.2)", "rgba(99,102,241,0.5)", "rgba(255,255,255,0.2)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="h-1.5 w-1 rounded-full bg-indigo-400"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Shimmer keyframe */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
}