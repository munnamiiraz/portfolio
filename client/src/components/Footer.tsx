"use client";

import { motion } from "framer-motion";
import { GitBranch, Globe, Mail, Code2, ArrowUp, ExternalLink } from "lucide-react";

const SOCIAL = [
  { icon: <GitBranch size={16} />, label: "GitHub",      href: "https://github.com/munnamiiraz"          },
  { icon: <Globe     size={16} />, label: "LinkedIn",    href: "https://www.linkedin.com/in/md-mahedi-hassan-58718a304/" },
  { icon: <Code2     size={16} />, label: "Codeforces",  href: "https://codeforces.com/profile/munnamiraz"  },
  { icon: <Mail      size={16} />, label: "Email",       href: "mailto:munnamiiraz@gmail.com"               },
];

const NAV = [
  { label: "Home",     href: "#home"     },
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Journey",  href: "#journey"  },
  { label: "Contact",  href: "#contact"  },
];

const scrollTo = (href: string) =>
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-black/5 dark:border-white/5 bg-gray-50 dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">

        {/* Main row */}
        <div className="flex flex-col gap-10 py-12 sm:flex-row sm:items-start sm:justify-between">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <button onClick={() => scrollTo("#home")} className="flex w-fit items-center gap-2.5 outline-none">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-[0_0_12px_rgba(99,102,241,0.35)]">
                <Code2 size={15} className="text-white" />
              </div>
              <span className="text-indigo-600 dark:text-indigo-400">munna<span className="text-indigo-500 dark:text-indigo-400">.dev</span></span>
            </button>
            <p className="max-w-[200px] text-xs leading-relaxed text-gray-500 dark:text-gray-600">
              Full stack developer focused on backend systems, clean architecture, and shipping things that work.
            </p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-[11px] text-gray-600">Open to remote opportunities</span>
            </div>
          </motion.div>

          {/* Nav */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
          >
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-700">Navigation</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {NAV.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="text-left text-xs text-gray-600 transition-colors duration-150 hover:text-gray-300"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Social + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
            className="flex flex-col gap-4"
          >
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-700">Connect</p>
              <div className="flex flex-col gap-2.5">
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2.5 text-xs text-gray-600 transition-colors duration-150 hover:text-gray-300"
                  >
                    <span className="text-gray-700 transition-colors duration-150 group-hover:text-indigo-400">{s.icon}</span>
                    {s.label}
                    <ExternalLink size={9} className="opacity-0 transition-opacity duration-150 group-hover:opacity-50" />
                  </a>
                ))}
              </div>
            </div>

            <button
              onClick={() => scrollTo("#contact")}
              className="flex w-fit items-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/[0.08] px-4 py-2.5 text-xs font-semibold text-indigo-400 transition-all duration-200 hover:border-indigo-400/50 hover:bg-indigo-500/15 hover:text-indigo-300"
            >
              <Mail size={12} />
              Get in touch
            </button>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.04] py-5 sm:flex-row">
          <p className="text-[11px] text-gray-700">
            © {year} Md. Mahedi Hassan Munna. Built with Next.js, TypeScript &amp; Tailwind.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-gray-500 dark:text-gray-700">
              Designed &amp; developed by <span className="text-gray-700 dark:text-gray-500">MH Munna</span>
            </span>
            <button
              onClick={() => scrollTo("#home")}
              aria-label="Back to top"
              className="group flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#111827] text-gray-500 dark:text-gray-400 shadow-sm transition-all duration-300 hover:border-indigo-500/50 hover:bg-indigo-500/5 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-indigo-500/10"
            >
              <ArrowUp size={16} className="transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}