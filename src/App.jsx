import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Sun, Moon, FileText, Menu } from "lucide-react";

// Final polish: hero + navbar + constrained profile image + reveal animations + accessibility + performance tweaks
// This file is the main portfolio component. It expects Tailwind CSS classes available.

export default function SukiPortfolio() {
  const [isLight, setIsLight] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const lastScroll = useRef(0);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("light", isLight);
    }
  }, [isLight]);

  // hide navbar on scroll down, show on scroll up (small debounce)
  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      if (y > lastScroll.current && y > 120) setShowNav(false);
      else setShowNav(true);
      lastScroll.current = y;
    };
    let t = null;
    const throttled = () => {
      if (t) return;
      t = setTimeout(() => {
        handler();
        t = null;
      }, 80);
    };
    window.addEventListener("scroll", throttled);
    return () => window.removeEventListener("scroll", throttled);
  }, []);

  // keyboard accessibility: close mobile nav on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowMobileNav(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const projects = [
    {
      title: "Tutor Draw",
      desc: "AI-powered tutoring system that generates visual explanations using LLMs.",
      image: "/project-tutor-draw.png",
      webp: "/project-tutor-draw.webp",
      demo: "https://tutoring-system.streamlit.app/",
      git: "https://github.com/wedha-prabha/tutor-draw",
    },
    {
      title: "ChainGuard AI",
      desc: "AI + Blockchain cybersecurity solution for threat detection and secure reporting.",
      image: "/project-chainguard.png",
      webp: "/project-chainguard.webp",
      demo: "",
      git: "https://github.com/wedha-prabha/chainguard-ai",
    },
    {
      title: "Algoverse",
      desc: "A bot that generates code in 4 languages and analyzes time/space complexity.",
      image: "/project-algoverse.png",
      webp: "/project-algoverse.webp",
      demo: "",
      git: "https://github.com/wedha-prabha/algoverse",
    },
    {
      title: "Sahaaya — The Rescue Drone",
      desc: "Drone system integrated with AI/ML for disaster-area rescue and situational awareness.",
      image: "/project-sahaaya.png",
      webp: "/project-sahaaya.webp",
      demo: "",
      git: "https://github.com/wedha-prabha/sahaaya",
    },
  ];

  const skills = [
    { category: "AI / ML & GenAI", items: ["Python", "LangChain", "OpenAI SDK", "Google Gemini SDK", "Deep Learning"] },
    { category: "Blockchain & Backend", items: ["Blockchain", "Solidity", "Flask", "FastAPI", "Docker"] },
    { category: "Frontend & Tools", items: ["HTML", "CSS", "JavaScript", "React", "Git"] },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans scroll-smooth">
      {/* Scoped styles to prevent global anchor leakage and control nav appearance */}
      <style>{` 
        /* Scope nav links to match canvas look */
        .nav-link {
          color: rgba(255,255,255,0.92);
          padding: 6px 10px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
        }
        .nav-link:hover {
          color: #22d3ee;
          background: rgba(255,255,255,0.02);
        }
        /* prevent global anchors from turning blue and underlined */
        main a, .nav-link, .nav-link:visited { color: inherit; text-decoration: none; }
        a:focus { outline: 3px solid rgba(34,211,238,0.12); outline-offset: 3px; }
        /* ensure navbar inner pill doesn't stretch too wide */
        nav[aria-label="Primary navigation"] > div { max-width: 1200px; margin: 0 auto; }
        /* small adjustments for hero buttons spacing */
        .hero-buttons a { margin-right: 12px; }
        /* make sure icons in header keep color */
        .header-icon { color: rgba(255,255,255,0.9); }
        /* constrain very large images accidentally placed */
        img { max-width: 100%; height: auto; }
      `}</style>
      {/* Floating navbar (shows/hides on scroll) */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: showNav ? 0 : -96 }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[1200px] px-4 sm:px-6"
        aria-label="Primary navigation"
      >
        <div className="mx-auto bg-gray-900/75 backdrop-blur-md border border-gray-800 py-2 rounded-full shadow-xl flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden mr-2 text-gray-200 p-2 rounded"
              aria-label="menu"
              aria-expanded={showMobileNav}
              onClick={() => setShowMobileNav((s) => !s)}
            >
              <Menu />
            </button>

            <div className="hidden md:flex items-center gap-4 whitespace-nowrap">
              <a href="#home" className="nav-link">Home</a>
              <a href="#skills" className="nav-link">Skills</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#internship" className="nav-link">Internship</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
          </div>

          <div className="ml-3 flex items-center gap-3">
            <a href="/resume.pdf" className="hidden sm:inline-flex items-center gap-2 bg-cyan-500 text-black font-semibold px-3 py-1.5 rounded-full hover:bg-cyan-400 transition">
              <FileText size={14} /> Resume
            </a>

            <a href="https://github.com/wedha-prabha" target="_blank" rel="noreferrer" className="text-gray-200 hover:text-cyan-400 p-2 rounded">
              <Github />
            </a>
            <a href="https://linkedin.com/in/wedha-prabha" target="_blank" rel="noreferrer" className="text-gray-200 hover:text-cyan-400 p-2 rounded">
              <Linkedin />
            </a>

            <button onClick={() => setIsLight((s) => !s)} aria-label="Toggle theme" className="ml-1 text-gray-200 hover:text-cyan-400 p-2 rounded">
              {isLight ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>
      </motion.nav>

      {showMobileNav && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 bg-gray-900/95 border border-gray-800 rounded-lg shadow-lg px-4 py-3 md:hidden" role="dialog" aria-modal="true">
          <div className="flex flex-col items-start gap-2">
            <a href="#home" className="nav-link">Home</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#internship" className="nav-link">Internship</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <AnimatePresence mode="wait">
          <motion.section id="home" variants={sectionVariants} initial="hidden" animate="visible" className="min-h-[60vh] flex items-center">
            <div className="grid md:grid-cols-2 gap-8 items-center w-full">
              <div className="pr-2">
                <motion.h1 whileInView={{ opacity: [0, 1], y: [12, 0] }} transition={{ duration: 0.6 }} className="text-5xl sm:text-6xl font-extrabold leading-tight text-cyan-300 mb-4">Hi, I'm <span className="text-white">Wedha Prabha</span></motion.h1>
                <motion.p whileInView={{ opacity: [0, 1], y: [8, 0] }} transition={{ delay: 0.08, duration: 0.5 }} className="mt-2 text-gray-300 max-w-xl text-lg">AI/ML Developer — specialized in Generative AI and Blockchain. I'm a B.E. Computer Science student focused on building impactful AI + web solutions.</motion.p>
                <motion.div whileInView={{ opacity: [0, 1], y: [8, 0] }} transition={{ delay: 0.16, duration: 0.45 }} className="mt-6 flex gap-3">
                  <a href="#projects" className="inline-flex items-center gap-2 bg-cyan-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-cyan-400">View Projects</a>
                  <a href="/resume.pdf" className="inline-flex items-center gap-2 border border-gray-700 px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800">Download Resume</a>
                </motion.div>
              </div>

              <div className="flex flex-col items-center">
                {/* Constrained, responsive profile image with lazy loading */}
                <motion.div whileInView={{ scale: [0.98, 1], opacity: [0, 1] }} transition={{ duration: 0.5 }} className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl bg-gray-800">
                  <img
                    src="/Profile.jpeg"
                    alt="Wedha Prabha"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/vite.svg";
                    }}
                    className="w-full h-full object-cover"
                    style={{ maxHeight: "100%", display: "block", objectPosition: "50% 60%" }}
                    loading="lazy"
                  />
                </motion.div>

                <div className="mt-4 flex gap-4 text-gray-300">
                  <a href="mailto:wedhaprabha@gmail.com" className="hover:text-cyan-400" aria-label="Email"><Mail /></a>
                  <a href="https://github.com/wedha-prabha" target="_blank" rel="noreferrer" className="hover:text-cyan-400" aria-label="GitHub"><Github /></a>
                  <a href="https://linkedin.com/in/wedha-prabha" target="_blank" rel="noreferrer" className="hover:text-cyan-400" aria-label="LinkedIn"><Linkedin /></a>
                </div>
              </div>
            </div>
          </motion.section>
        </AnimatePresence>

        <motion.section id="skills" variants={sectionVariants} initial="hidden" animate="visible" className="py-12">
          <h2 className="text-3xl font-semibold text-cyan-300 mb-6">Skills</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <motion.div key={skill.category} whileInView={{ opacity: [0, 1], y: [8, 0] }} transition={{ duration: 0.45 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-3">{skill.category}</h3>
                <ul className="space-y-2 list-disc list-inside">
                  {skill.items.map((it) => (
                    <li key={it} className="text-gray-300 text-sm">{it}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section id="projects" variants={sectionVariants} initial="hidden" animate="visible" className="py-12">
          <h2 className="text-3xl font-semibold text-cyan-300 mb-6">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <motion.article key={p.title} whileHover={{ y: -6 }} whileInView={{ opacity: [0, 1], y: [12, 0] }} transition={{ duration: 0.45 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-md">
                <div className="rounded-lg overflow-hidden bg-gray-800">
                  <picture>
                    <source srcSet={p.webp} type="image/webp" />
                    <img src={p.image} alt={p.title} className="w-full h-44 object-cover" loading="lazy" />
                  </picture>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                  <p className="text-gray-300 mt-2">{p.desc}</p>
                  <div className="mt-4 flex gap-3">
                    <a href={p.demo || "#"} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-md bg-cyan-600 text-black text-sm font-medium hover:bg-cyan-500">Live Demo</a>
                    <a href={p.git || "#"} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-md border border-gray-700 text-gray-300 text-sm hover:bg-gray-800 flex items-center gap-2"><Github size={14} /> GitHub</a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section id="internship" variants={sectionVariants} initial="hidden" animate="visible" className="py-12">
          <h2 className="text-3xl font-semibold text-cyan-300 mb-6">Internship</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-3xl">
            <h4 className="text-lg font-semibold text-white">AI/ML Developer Intern — SNS Innovation Hub</h4>
            <p className="text-gray-300 text-sm mt-2">5-month internship (2025) — worked on generative AI models, dataset pipelines and automation tools.</p>
          </div>
        </motion.section>

        <motion.section id="about" variants={sectionVariants} initial="hidden" animate="visible" className="py-12">
          <h2 className="text-3xl font-semibold text-cyan-300 mb-6">About</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-3xl space-y-4">
            <p className="text-gray-300">I am Wedha Prabha R, a committed and hardworking student pursuing <strong className="text-cyan-300">B.E. Computer Science and Engineering</strong> with a specialization in <strong className="text-cyan-300">Cyber Security, Blockchain, and Internet of Things</strong>. I come from a supportive middle-class family that has always encouraged me to value education, discipline, and integrity.</p>
            <p className="text-gray-300">My strengths include <strong className="text-cyan-300">consistency, problem-solving, adaptability, and strong communication skills</strong>. I am passionate about learning new technologies and applying them to real-world problems. I consider myself sincere, empathetic, and capable of taking initiative when required.</p>
            <p className="text-gray-300">I have completed a <strong className="text-cyan-300">6-month internship in software testing</strong> and an <strong className="text-cyan-300">AI/ML internship</strong>. I won <strong className="text-cyan-300">3rd prize</strong> in the Make-a-Thon competition for <strong className="text-cyan-300">Tutor Draw</strong>, and I am involved in research-based and innovation-driven projects in AI and security.</p>
            <p className="text-gray-300">I have also filed a <strong className="text-cyan-300">product patent for The Rescue Drone (Sahaaya)</strong>. This scholarship will support my academic journey and future aspirations.</p>
          </div>
        </motion.section>

        <motion.section id="contact" variants={sectionVariants} initial="hidden" animate="visible" className="py-12 text-center">
          <h2 className="text-3xl font-semibold text-cyan-300 mb-6">Get in Touch</h2>
          <p className="text-gray-300 mb-6">Have a project or opportunity in mind? Let’s connect — email me at <a href="mailto:wedhaprabha@gmail.com" className="text-cyan-300">wedhaprabha@gmail.com</a>.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="mailto:wedhaprabha@gmail.com" className="px-4 py-2 rounded-md bg-cyan-600 text-black font-medium">Send Email</a>
            <a href="https://github.com/wedha-prabha" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-cyan-300"><Github /></a>
            <a href="https://linkedin.com/in/wedha-prabha" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-cyan-300"><Linkedin /></a>
          </div>
        </motion.section>

      </main>
    </div>
  );
}


