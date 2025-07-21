"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  }, [typedSubtitle, isDeleting, subtitleIndex]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center px-4">
      {/* Navigation */}
      <div className="fixed top-0 left-0 w-screen h-[75px] z-20 pointer-events-none">
        <div className={`w-full h-full transition-colors duration-300 ${navScrolled ? "bg-[#070d16] shadow-md" : "bg-background"}`} />
      </div>
      <nav className="w-full max-w-3xl mx-auto flex justify-between items-center py-6 sticky top-0 z-30 bg-transparent">
        <a href="#" className="font-tech-heading text-2xl font-normal tracking-widest flex items-center focus:outline-none" style={{ color: 'var(--accent1)'}}>
          <span style={{ fontWeight: 400}}>T</span>
          <span style={{ fontWeight: 400, marginLeft: '0.1em' }}>R</span>
        </a>
          <div className="flex gap-6 text-sm">
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
        </nav>
      <main className="w-full max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center gap-20 pb-20">
        {/* Hero Section */}
        <section className="flex flex-col items-center gap-6 min-h-[calc(80vh-96px)] justify-center">
          <Image src="/profile.jpg" alt="Tanvi Ranade profile" width={120} height={120} className="rounded-full object-cover w-32 h-32 border-2 border-accent2" />
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center tech-title tech-heading">Tanvi Ranade</h1>
          <div className="font-tech-heading flex items-center justify-center min-h-[2em] mt-0">
            <span className="text-accent1 text-lg sm:text-xl" style={{ letterSpacing: '0.18em' }}>
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
          <div className="flex gap-4 mt-2 flex-wrap justify-center">
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
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-2xl font-bold mb-2 tech-title tech-heading">About</h2>
          <div className="font-tech-heading text-accent1 text-lg sm:text-xl" style={{ letterSpacing: '0.18em' }}>
            JHU '26 • BS in CS + BME • 3 + 1 MSE in CS
          </div>
          <p className="text-base">Hi! I'm a 3rd year undergraduate interested in software engineering, AI/ML, data science, and medical applications. This past summer I interned at Aryn, where I worked on developing an LLM-based query planning and execution pipeline for analytics questions on unstructured data and co-authored a systems paper. I'm currently improving a website for the JHU Physics & Astronomy and on the student developer team for Semester.ly. In the past I worked on an iOS and Android app for dearYou Health, and have had experience working as an R&D intern at CurveAssure as a Full-Stack Software Developer. On campus, I'm the president of WiCS@JHU, a counselor for Camp Kesem, and on a dance team, Blue Jay Bhangra. Recently, I joined Dr. Suchi Saria's lab for Machine Learning in Healthcare. I'm also currently an Intro Algorithms TA and have previously been one for Data Structures and Intermediate Programming (C/C++).</p>
        </motion.section>
        {/* Skills Section */}
        <motion.section
          id="skills"
          className="w-full flex flex-col gap-4 py-8 border-b border-neutral-800 scroll-mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
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
          viewport={{ once: true, amount: 0.3 }}
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
          viewport={{ once: true, amount: 0.3 }}
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
            <li><span className="font-semibold">Camp Kesem</span> — Counselor (2022 - Present): Counselor for a national nonprofit supporting children through and beyond a parent's cancer.</li>
            <li><span className="font-semibold">Blue Jay Bhangra</span> — Dancer (2021 - Present): Member of JHU's competitive bhangra dance team.</li>
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
          viewport={{ once: true, amount: 0.3 }}
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
