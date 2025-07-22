"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiDevpost } from "react-icons/si";
import { FiMail } from "react-icons/fi";

const navSections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const socialLinks = [
  { href: "/Tanvi_Ranade_Resume.pdf", label: "Resume" },
  { href: "mailto:tranade1@jhu.edu", label: "Email" },
  { href: "https://www.linkedin.com/in/tanvi-ranade/", label: "LinkedIn" },
  { href: "https://github.com/tranade", label: "GitHub" },
  { href: "https://devpost.com/tanviranade", label: "Devpost" },
];

export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setNavScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ensure smooth scrolling for anchor links
  if (typeof window !== 'undefined') {
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  // Typewriter effect for subtitle
  const subtitles = ["builder.", "dreamer.", "learner."];
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const current = subtitles[subtitleIndex];
    if (!isDeleting && typedSubtitle.length < current.length) {
      timeout = setTimeout(() => {
        setTypedSubtitle(current.slice(0, typedSubtitle.length + 1));
      }, 140);
    } else if (isDeleting && typedSubtitle.length > 0) {
      timeout = setTimeout(() => {
        setTypedSubtitle(current.slice(0, typedSubtitle.length - 1));
      }, 90);
    } else if (!isDeleting && typedSubtitle.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && typedSubtitle.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setSubtitleIndex((subtitleIndex + 1) % subtitles.length);
      }, 400);
    }
    return () => clearTimeout(timeout);
  }, [typedSubtitle, isDeleting, subtitleIndex, subtitles]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center px-4">
      {/* Navigation */}
      <div className="fixed top-0 left-0 w-screen h-[80px] z-20 pointer-events-none">
        <div className={`w-full h-full transition-colors duration-300 ${navScrolled ? "bg-[#070d16] shadow-md" : "bg-background"}`} />
      </div>
      <nav className="w-full max-w-3xl mx-auto flex justify-between items-center py-6 px-4 sm:px-0 sticky top-0 z-30 bg-transparent">
        <a href="#" className="font-tech-heading text-2xl font-normal tracking-widest flex items-center focus:outline-none" style={{ color: 'var(--accent1)'}}>
          <span style={{ fontWeight: 400}}>T</span>
          <span style={{ fontWeight: 400, marginLeft: '0.1em' }}>R</span>
        </a>
        {/* Desktop nav links */}
        <div className="hidden sm:flex gap-6 text-sm">
          {navSections.map(section => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`hover:text-accent2 transition-colors font-medium`}
              >
                {section.label}
            </a>
          ))}
        </div>
        {/* Mobile hamburger */}
        <MobileNav navSections={navSections} />
      </nav>
      <main className="w-full max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center gap-12 pb-20 px-4">
        {/* Hero Section */}
        <section className="flex flex-col items-center gap-6 min-h-[calc(80vh-96px)] justify-center w-full">
          <Image src="/profile.jpg" alt="Tanvi Ranade profile" width={120} height={120} className="rounded-full object-cover w-32 h-32 border-2 border-accent2" />
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-center tech-title tech-heading max-w-xs sm:max-w-none mx-auto">Tanvi Ranade</h1>
          <div className="font-tech-heading flex items-center justify-center min-h-[2em] mt-0 max-w-xs sm:max-w-none mx-auto">
            <span className="text-accent1 text-base sm:text-xl" style={{ letterSpacing: '0.18em' }}>
              {typedSubtitle}
              <motion.span
                className="font-mono text-lg sm:text-xl"
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                aria-hidden="true"
              >|
              </motion.span>
            </span>
          </div>
          <div className="flex flex-wrap gap-4 mt-2 justify-center w-full max-w-xs sm:max-w-none mx-auto">
            {socialLinks.map(link => {
              if (link.label === "LinkedIn") {
                return (
                  <Link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="social-link text-accent2 hover:text-accent1 transition-colors text-xl flex items-center justify-center" aria-label="LinkedIn" title="LinkedIn">
                    <FaLinkedin />
                  </Link>
                );
              } else if (link.label === "Email") {
                return (
                  <Link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="social-link text-accent2 hover:text-accent1 transition-colors text-xl flex items-center justify-center" aria-label="Email" title="Email">
                    <FiMail />
                  </Link>
                );
              } else if (link.label === "GitHub") {
                return (
                  <Link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="social-link text-accent2 hover:text-accent1 transition-colors text-xl flex items-center justify-center" aria-label="GitHub" title="GitHub">
                    <FaGithub />
                  </Link>
                );
              } else if (link.label === "Devpost") {
                return (
                  <Link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="social-link text-accent2 hover:text-accent1 transition-colors text-xl flex items-center justify-center" aria-label="Devpost" title="Devpost">
                    <SiDevpost />
                  </Link>
                );
              } else {
                return (
                  <Link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="social-link px-4 py-1 rounded border border-accent2 text-accent2 hover:bg-accent2 hover:text-background transition-colors text-sm font-semibold">
                    {link.label}
                  </Link>
                );
              }
            })}
          </div>
        </section>
        {/* About Section */}
        <motion.section
          id="about"
          className="w-full flex flex-col gap-4 py-8 border-b border-neutral-800 scroll-mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-2xl font-bold mb-2 tech-title tech-heading">About</h2>
          <div className="font-tech-heading text-accent1 text-lg sm:text-xl" style={{ letterSpacing: '0.18em' }}>
            JHU &apos;26 • BS in CS + BME • 3 + 1 MSE in CS
          </div>
          <p className="text-base">Hi! I&apos;m an incoming senior at JHU interested in software engineering, AI/ML, data science, and medical applications. I&apos;m currently a SWE Intern for AWS Redshift, where I am working on developing a GenAI project employing multi-agent orchestration with Strands. Last summer I was at Aryn (startup), where I worked on developing an LLM-based query planning and execution pipeline for analytics questions on unstructured data and co-authored a systems paper.</p>
          <p className="text-base">On campus, I&apos;m involved with WiCS@JHU, Camp Kesem, and Blue Jay Bhangra (💃). I also do applied machine learning research through Dr. Suchi Saria&apos;s lab for AI/ML in Healthcare!</p>
        </motion.section>
        {/* Skills Section */}
        <motion.section
          id="skills"
          className="w-full flex flex-col gap-4 py-8 border-b border-neutral-800 scroll-mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-2xl font-bold mb-2 tech-title tech-heading">Skills</h2>
          <ul className="flex flex-wrap gap-3">
            {['JavaScript', 'HTML', 'CSS', 'TypeScript', 'React', 'Redux', 'Python', 'Java', 'C/C++', 'Databases', 'API Calls', 'Node.js', 'Express.js', 'Nest.js'].map(skill => (
              <li key={skill} className="px-3 py-1 rounded-full border border-accent2 text-accent2 text-sm font-semibold bg-background/80">
                {skill}
              </li>
            ))}
          </ul>
        </motion.section>
        {/* Projects Section */}
        <motion.section
          id="projects"
          className="w-full flex flex-col gap-4 py-8 border-b border-neutral-800 scroll-mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-2xl font-bold mb-2 tech-title tech-heading">Projects</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-neutral-800 p-4 bg-background flex flex-col gap-2">
              <h3 className="font-semibold text-lg project-title">PlatePal</h3>
              <p className="text-sm">A nutrition and meal planning app.</p>
              <div className="flex gap-2 mt-2">
                <a href="https://github.com/tranade/platepal" className="project-link text-accent2 text-sm font-medium" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="#" className="project-link text-accent2 text-sm font-medium">Live Demo</a>
              </div>
            </div>
            <div className="rounded-lg border border-neutral-800 p-4 bg-background flex flex-col gap-2">
              <h3 className="font-semibold text-lg project-title">TerraVision</h3>
              <p className="text-sm">A full-stack mapping and visualization tool.</p>
              <div className="flex gap-2 mt-2">
                <a href="#" className="project-link text-accent2 text-sm font-medium">Backend</a>
                <a href="#" className="project-link text-accent2 text-sm font-medium">Frontend</a>
              </div>
            </div>
            <div className="rounded-lg border border-neutral-800 p-4 bg-background flex flex-col gap-2">
              <h3 className="font-semibold text-lg project-title">MindMatch</h3>
              <p className="text-sm">Coming soon!</p>
            </div>
            <div className="rounded-lg border border-neutral-800 p-4 bg-background flex flex-col gap-2">
              <h3 className="font-semibold text-lg project-title">HealthTrackr</h3>
              <p className="text-sm">A health and fitness dashboard.</p>
            </div>
          </div>
        </motion.section>
        {/* Experience Section */}
        <motion.section
          id="experience"
          className="w-full flex flex-col gap-4 py-8 border-b border-neutral-800 scroll-mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-2xl font-bold mb-2 tech-title tech-heading">Experience</h2>
          <ul className="flex flex-col gap-2">
            <li><span className="font-semibold">Aryn</span> — Software Engineering Intern (Summer 2023): Developed an LLM-based query planning and execution pipeline for analytics on unstructured data. Co-authored a systems paper.</li>
            <li><span className="font-semibold">Semester.ly</span> — Student Developer (2023 - Present): Full-stack development for a course scheduling platform used by students at multiple universities.</li>
            <li><span className="font-semibold">dearYou Health</span> — Mobile App Developer (2022): Developed an iOS and Android app for health and wellness.</li>
            <li><span className="font-semibold">CurveAssure</span> — R&D Intern, Full-Stack SWE (2021): Worked on full-stack software for medical device analytics.</li>
            <li><span className="font-semibold">JHU Physics & Astronomy</span> — Web Developer (2023 - Present): Improving and maintaining the department website.</li>
            <li><span className="font-semibold">WiCS@JHU</span> — President (2023 - Present): Leading the Women in Computer Science chapter at JHU.</li>
            <li><span className="font-semibold">Camp Kesem</span> — Counselor (2022 - Present): Counselor for a national nonprofit supporting children through and beyond a parent&apos;s cancer.</li>
            <li><span className="font-semibold">Blue Jay Bhangra</span> — Dancer (2021 - Present): Member of JHU&apos;s competitive bhangra dance team.</li>
            <li><span className="font-semibold">JHU ML in Healthcare Lab</span> — Researcher (2024 - Present): Research in AI/ML for healthcare under Dr. Suchi Saria.</li>
            <li><span className="font-semibold">Teaching Assistant (JHU)</span> (2022 - Present): Intro Algorithms, Data Structures, Intermediate Programming (C/C++).</li>
          </ul>
        </motion.section>
        {/* Contact Section */}
        <motion.section
          id="contact"
          className="w-full flex flex-col gap-4 py-8 scroll-mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-2xl font-bold mb-2 tech-title tech-heading">Contact</h2>
          <div className="flex flex-col gap-2 items-center">
            <div className="text-base">tranade1@jhu.edu</div>
              <div className="flex gap-4 mt-2">
              <a href="mailto:tranade1@jhu.edu" className="social-link text-accent2 hover:underline text-sm font-medium inline-flex items-center" aria-label="Email" title="Email" target="_blank" rel="noopener noreferrer"><FiMail className="text-accent2 text-xl" /></a>
              <a href="https://www.linkedin.com/in/tanviranade/" className="social-link text-accent2 hover:underline text-sm font-medium inline-flex items-center" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><FaLinkedin className="text-accent2 text-xl" /></a>
              <a href="https://github.com/tranade" className="social-link text-accent2 hover:underline text-sm font-medium inline-flex items-center" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><FaGithub className="text-accent2 text-xl" /></a>
              <a href="https://devpost.com/tanviranade" className="social-link text-accent2 hover:underline text-sm font-medium inline-flex items-center" target="_blank" rel="noopener noreferrer" aria-label="Devpost" title="Devpost"><SiDevpost className="text-accent2 text-xl" /></a>
              </div>
          </div>
        </motion.section>
      </main>
      {/* Footer */}
      <footer className="w-full text-center text-xs text-accent2 py-6 mt-8">
        &copy; {new Date().getFullYear()} Tanvi Ranade. All rights reserved.
      </footer>
    </div>
  );
}

// MobileNav component
type NavSection = { id: string; label: string };
function MobileNav({ navSections }: { navSections: NavSection[] }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (open && menuRef.current && !(menuRef.current as HTMLDivElement).contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);
  return (
    <div className="sm:hidden relative">
      <button
        className="mobile-nav-btn flex flex-col justify-center items-center w-8 h-8 focus:outline-none z-50 bg-transparent border-none shadow-none outline-none"
        style={{ background: 'none' }}
        aria-label="Open navigation menu"
        onClick={() => setOpen(v => !v)}
        tabIndex={0}
      >
        <span className={`block w-6 h-0.5 bg-accent1 mb-1 transition-transform duration-200`} style={{backgroundColor: 'var(--accent1)', zIndex: 20, opacity: open ? 1 : 1, transform: open ? 'rotate(45deg) translateY(0.375rem)' : 'none'}}></span>
        <span className={`block w-6 h-0.5 bg-accent1 mb-1 transition-opacity duration-200`} style={{backgroundColor: 'var(--accent1)', zIndex: 20, opacity: open ? 0 : 1}}></span>
        <span className={`block w-6 h-0.5 bg-accent1 transition-transform duration-200`} style={{backgroundColor: 'var(--accent1)', zIndex: 20, opacity: open ? 1 : 1, transform: open ? 'rotate(-45deg) translateY(-0.375rem)' : 'none'}}></span>
      </button>
      {open && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
          {/* Menu */}
          <div ref={menuRef} className="absolute right-0 mt-2 w-40 rounded-lg !bg-[#070d16] border border-accent2/30 shadow-lg py-2 z-50 flex flex-col" style={{ backgroundColor: '#070d16' }}>
            {navSections.map((section: NavSection) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="px-4 py-2 text-accent2 hover:text-accent1 font-medium text-base text-left"
                onClick={() => setOpen(false)}
              >
                {section.label}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
