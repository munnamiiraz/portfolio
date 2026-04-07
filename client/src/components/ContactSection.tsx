"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Send, CheckCircle2, ArrowUpRight, MapPin, Clock, GitBranch, Globe } from "lucide-react";

interface FormState { name: string; email: string; subject: string; message: string; }
type SendState = "idle" | "sending" | "sent";

const socialLinks = [
  {
    icon: <GitBranch size={18} />,
    label: "GitHub",
    handle: "@munnamiiraz",
    href: "https://github.com/munnamiiraz",
    desc: "Code, projects, commits",
    color: "hover:border-white/20 hover:bg-white/5",
    iconColor: "text-gray-400 group-hover:text-white",
  },
  {
    icon: <Globe size={18} />,
    label: "LinkedIn",
    handle: "md-mahedi-hassan",
    href: "https://www.linkedin.com/in/md-mahedi-hassan-58718a304/",
    desc: "Professional profile",
    color: "hover:border-blue-500/30 hover:bg-blue-500/5",
    iconColor: "text-gray-400 group-hover:text-blue-400",
  },
  {
    icon: <Mail size={18} />,
    label: "Email",
    handle: "munnamiiraz@gmail.com",
    href: "mailto:munnamiiraz@gmail.com",
    desc: "Best for project inquiries",
    color: "hover:border-indigo-500/30 hover:bg-indigo-500/5",
    iconColor: "text-gray-400 group-hover:text-indigo-400",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">
      <span className="h-1 w-1 rounded-full bg-indigo-400" />
      {children}
    </div>
  );
}

export default function ContactSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });
  const formRef = useRef<HTMLDivElement>(null);
  const formIn  = useInView(formRef,  { once: true, margin: "-60px" });
  const leftRef = useRef<HTMLDivElement>(null);
  const leftIn  = useInView(leftRef,  { once: true, margin: "-60px" });

  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [sendState, setSendState] = useState<SendState>("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setSendState("sending");

    try {
      // Get your free access key at: https://web3forms.com/
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "2e0b18c9-1e38-48e9-9a6c-5ffc59879d13"; 
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          subject: `Portfolio Inquiry: ${form.subject}`,
          message: form.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSendState("sent");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        console.error("Form submission failed:", result);
        setSendState("idle");
        alert("Something went wrong. Please try again or use direct email.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSendState("idle");
      alert("Network error. Please check your connection.");
    }
  };

  const field =
    "w-full rounded-xl border border-black/10 dark:border-white/7 bg-white dark:bg-white/3 px-4 py-3 text-sm text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all duration-200 focus:border-indigo-500/50 focus:bg-white/5 focus:ring-0";

  return (
    <section id="contact" className="relative bg-white dark:bg-[#0B0F19] py-12 transition-colors duration-300">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <SectionLabel>Contact</SectionLabel>
          <h2 className="mt-2 text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Let's{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              work together.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-gray-500">
            Open to full-time remote roles, freelance projects, and technical collaborations.
            Response time is typically under 24 hours.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">

          {/* LEFT — availability + socials */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -24 }}
            animate={leftIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Availability card */}
            <div className="rounded-2xl border border-green-500/20 bg-gray-50 dark:bg-[#111827] p-5">
              <div className="mb-4 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <span className="text-sm font-semibold text-green-400">Available for work</span>
              </div>
              <div className="space-y-3">
                {[
                  { icon: <Clock size={13} />,  label: "Response time",   val: "Under 24 hours" },
                  { icon: <MapPin size={13} />, label: "Location",        val: "Bangladesh (Remote OK)" },
                  { icon: <Mail size={13} />,   label: "Preferred contact",val: "Email or LinkedIn" },
                ].map(({ icon, label, val }) => (
                  <div key={label} className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                      {icon}
                      {label}
                    </div>
                    <span className="text-right text-[11px] font-medium text-gray-400">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              {socialLinks.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -16 }}
                  animate={leftIn ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
                  className={`group flex items-center gap-4 rounded-xl border border-black/5 dark:border-white/6 bg-gray-50 dark:bg-[#111827] p-4 transition-all duration-200 no-underline ${s.color}`}
                >
                  <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/6 transition-colors duration-200 ${s.iconColor}`}>
                    {s.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white">{s.label}</div>
                    <div className="truncate text-[11px] text-gray-600">{s.handle}</div>
                  </div>
                  <ArrowUpRight size={14} className="flex-shrink-0 text-gray-700 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gray-400" />
                </motion.a>
              ))}
            </div>

            {/* Note */}
            <div className="rounded-xl border border-white/4 bg-white/1 p-4">
              <p className="text-xs leading-relaxed text-gray-600">
                For freelance work, share a brief project description upfront — it saves a round-trip and
                helps me give a more accurate response.
              </p>
            </div>
          </motion.div>

          {/* RIGHT — Contact form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 24 }}
            animate={formIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-black/5 dark:border-white/6 bg-gray-50 dark:bg-[#111827] p-7"
          >
            {sendState === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/25 bg-green-500/10 text-green-400">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Message received.</h3>
                  <p className="mt-1 text-sm text-gray-500">I'll get back to you within 24 hours.</p>
                </div>
                <button
                  onClick={() => setSendState("idle")}
                  className="mt-2 rounded-xl border border-white/10 px-5 py-2 text-sm text-gray-500 transition-colors hover:border-white/20 hover:text-white"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                      Name <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={field}
                    />
                    {errors.name && <p className="mt-1 text-[11px] text-red-400">{errors.name}</p>}
                  </div>
                  {/* Email */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                      Email <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={field}
                    />
                    {errors.email && <p className="mt-1 text-[11px] text-red-400">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                    Subject <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Full-time remote role / Freelance project"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={field}
                  />
                  {errors.subject && <p className="mt-1 text-[11px] text-red-400">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                    Message <span className="text-indigo-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Describe the project or role. Include tech stack, timeline, and budget if applicable."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${field} resize-none`}
                  />
                  {errors.message && <p className="mt-1 text-[11px] text-red-400">{errors.message}</p>}
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={sendState === "sending"}
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_0_28px_rgba(99,102,241,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {/* shimmer */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                  <span className="relative flex items-center gap-2">
                    {sendState === "sending" ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Send Message
                      </>
                    )}
                  </span>
                </button>

                <p className="text-center text-[11px] text-gray-700">
                  Secure transmission enabled via Web3Forms API.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}