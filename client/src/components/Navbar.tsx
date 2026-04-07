"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Moon, Sun, Menu, X, Code2 } from "lucide-react";
import { useTheme } from "next-themes";

const NAV_LINKS = [
  { label: "Home",     href: "#home"     },
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Journey",  href: "#journey"  },
  { label: "Contact",  href: "#contact"  },
];

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.35, rootMargin: "-80px 0px -40% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);
  return active;
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return (
    <div className="h-8 w-8 rounded-lg border border-white/10 bg-white/5" />
  );

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400 transition-all duration-200 hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-400"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            exit={{    rotate:  90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={14} />
          </motion.span>
        ) : (
          <motion.span key="sun"
            initial={{ rotate: 90,  opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            exit={{    rotate: -90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={14} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeIndex = NAV_LINKS.findIndex((l) => l.href.replace("#", "") === active);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1  }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-black/5 dark:border-white/6 bg-white/90 dark:bg-[#0B0F19]/95 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-md"
            : "bg-[#0B0F19]/60 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          {/* Logo / Wordmark */}
          <button 
            onClick={() => scrollTo("#home")} 
            className="group flex items-center outline-none cursor-pointer"
          >
            <div className="relative flex items-center">
              {/* Outer Glow behind the logo */}
              <div className="absolute inset-0 bg-indigo-500/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Left bracket aesthetic */}
              <span className="font-mono text-lg font-black text-gray-500/40 transition-colors duration-300 group-hover:text-indigo-500/50">
                [
              </span>
              
              <span className="mx-0.5 font-mono text-base font-black tracking-tighter sm:text-lg">
                <span className="bg-linear-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent transition-all duration-300 group-hover:from-indigo-400 group-hover:to-purple-300">
                  munna.dev
                </span>
              </span>
              
              {/* Right bracket aesthetic */}
              <span className="font-mono text-lg font-black text-gray-500/40 transition-colors duration-300 group-hover:text-indigo-500/50">
                ]
              </span>

              {/* Subtle underline shimmer */}
              <motion.div 
                className="absolute -bottom-1 left-4 right-4 h-px bg-linear-to-r from-transparent via-indigo-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
              />
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="relative hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-indigo-400"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-px bg-indigo-500/60"
                      transition={{ type: "spring", bounce: 0.22, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            {/* <ThemeToggle /> */}
            <button
              onClick={() => scrollTo("#contact")}
              className="hidden items-center gap-1.5 rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-300 transition-all duration-200 hover:border-indigo-400/60 hover:bg-indigo-500/20 hover:text-indigo-500 dark:hover:text-indigo-200 sm:flex"
            >
              Hire me
            </button>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-400 md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="x"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <X size={15} />
                  </motion.span>
                ) : (
                  <motion.span key="menu"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Menu size={15} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        {scrolled && (
          <motion.div
            className="absolute bottom-0 left-0 h-[1.5px] bg-linear-to-r from-indigo-500 via-purple-400 to-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${((activeIndex + 1) / NAV_LINKS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        )}
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.div key="drawer"
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-20 z-50 overflow-hidden rounded-2xl border border-white/6 bg-[#0d1117]/95 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl md:hidden"
            >
              <nav className="flex flex-col p-3">
                {NAV_LINKS.map((link, i) => {
                  const isActive = active === link.href.replace("#", "");
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                      onClick={() => scrollTo(link.href)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-150 ${
                        isActive ? "bg-indigo-500/10 text-indigo-300" : "text-gray-500 hover:bg-white/4 hover:text-white"
                      }`}
                    >
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />}
                      {link.label}
                    </motion.button>
                  );
                })}
                <div className="mx-4 my-2 h-px bg-white/5" />
                <button
                  onClick={() => scrollTo("#contact")}
                  className="mx-1 mb-1 rounded-xl bg-indigo-600/80 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
                >
                  Hire me
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}