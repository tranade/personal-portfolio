"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useAnimation, useInView, easeInOut } from "framer-motion";

// SVG background blob for hero (add a second blurred layer for depth)
const HeroBlob = () => (
  <>
    <svg
      className="absolute -z-20 left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 w-[700px] h-[400px] opacity-60 blur-2xl pointer-events-none select-none"
      viewBox="0 0 700 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="hero-gradient" x1="0" y1="0" x2="700" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent1)" />
          <stop offset="0.3" stopColor="var(--accent2)" />
          <stop offset="0.6" stopColor="var(--accent3)" />
          <stop offset="1" stopColor="var(--accent5)" />
        </linearGradient>
      </defs>
      <ellipse cx="350" cy="200" rx="320" ry="160" fill="url(#hero-gradient)" />
    </svg>
    <svg
      className="absolute -z-30 left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] opacity-30 blur-3xl pointer-events-none select-none"
      viewBox="0 0 900 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="450" cy="250" rx="400" ry="200" fill="var(--accent4)" />
    </svg>
  </>
);

// Radial gradient overlay for extra depth
const RadialOverlay = () => (
  <div
    className="pointer-events-none fixed inset-0 -z-10"
    style={{
      background: "radial-gradient(ellipse at 60% 10%, rgba(255,183,71,0.10) 0%, rgba(255,127,80,0.08) 40%, rgba(255,111,145,0.07) 70%, transparent 100%)"
    }}
    aria-hidden
  />
);

// Section divider SVG
const SectionWave = () => (
  <svg
    className="w-full h-16 md:h-24 lg:h-32 -mb-2"
    viewBox="0 0 1440 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M0 40 Q 360 80 720 40 T 1440 40 V80 H0Z"
      fill="url(#wave-gradient)"
    />
    <defs>
      <linearGradient id="wave-gradient" x1="0" y1="0" x2="1440" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--accent2)" />
        <stop offset="0.5" stopColor="var(--accent3)" />
        <stop offset="1" stopColor="var(--accent4)" />
      </linearGradient>
    </defs>
  </svg>
);

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  // Helper for nav underline
  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeInOut } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col relative overflow-x-clip">
      <RadialOverlay />
      {/* Hero SVG background */}
      <HeroBlob />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur border-b border-accent1 flex justify-center py-4 shadow-md">
        <ul className="flex gap-6 text-sm font-semibold text-foreground relative">
          {sections.map((section) => (
            <li key={section.id} className="relative">
              <button
                onClick={() => handleNavClick(section.id)}
                className={`hover:underline underline-offset-4 transition-colors px-1 py-0.5 focus:text-accent1 ${activeSection === section.id ? "text-accent1" : ""}`}
                onFocus={() => setActiveSection(section.id)}
                onMouseEnter={() => setActiveSection(section.id)}
                onMouseLeave={() => setActiveSection("")}
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-1 h-0.5 bg-accent1 rounded"
                    style={{ zIndex: 1 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center pt-24 pb-16 px-4 max-w-3xl mx-auto w-full gap-24">
        {/* Hero Section */}
        <motion.section
          className="w-full flex flex-col items-center text-center gap-4 relative"
          id="hero"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
          variants={fadeInUp}
        >
          <motion.div
            className="rounded-full bg-background border-4 border-accent1 w-36 h-36 mb-4 flex items-center justify-center shadow-2xl shadow-[var(--accent2)]/40 overflow-hidden"
            whileHover={{ scale: 1.07, boxShadow: "0 0 64px 0 var(--accent3)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image src="/profile.jpg" alt="Tanvi Ranade profile" width={120} height={120} className="rounded-full object-cover w-32 h-32" />
          </motion.div>
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[var(--accent1)] via-[var(--accent3)] to-[var(--accent5)] bg-clip-text text-transparent drop-shadow">Tanvi Ranade</h1>
          <p className="text-xl font-semibold bg-gradient-to-r from-[var(--accent2)] via-[var(--accent4)] to-[var(--accent1)] bg-clip-text text-transparent">Johns Hopkins '26 &mdash; B.S. Computer Science, B.S. Biomedical Engineering</p>
          <div className="flex gap-4 mt-2 flex-wrap justify-center">
            <motion.a
              href="/Tanvi_Ranade_Resume.pdf"
              className="px-5 py-2 rounded font-bold bg-gradient-to-r from-[var(--accent1)] via-[var(--accent3)] to-[var(--accent5)] text-black shadow-lg shadow-[var(--accent2)]/40"
              whileHover={{ scale: 1.07, boxShadow: "0 0 16px 0 var(--accent3)" }}
              transition={{ type: "spring", stiffness: 300 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </motion.a>
            <motion.a
              href="mailto:tranade1@jhu.edu"
              className="px-5 py-2 rounded border-2 border-[var(--accent2)] font-bold text-[var(--accent2)] hover:bg-gradient-to-r hover:from-[var(--accent2)] hover:via-[var(--accent3)] hover:to-[var(--accent4)] hover:text-black shadow-[var(--accent2)]/40"
              whileHover={{ scale: 1.07, boxShadow: "0 0 16px 0 var(--accent2)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Contact
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/tanviranade/"
              className="px-5 py-2 rounded border-2 border-[var(--accent3)] font-bold text-[var(--accent3)] hover:bg-gradient-to-r hover:from-[var(--accent3)] hover:via-[var(--accent4)] hover:to-[var(--accent1)] hover:text-black shadow-[var(--accent3)]/40"
              whileHover={{ scale: 1.07, boxShadow: "0 0 16px 0 var(--accent3)" }}
              transition={{ type: "spring", stiffness: 300 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </motion.a>
            <motion.a
              href="https://github.com/tranade"
              className="px-5 py-2 rounded border-2 border-[var(--accent4)] font-bold text-[var(--accent4)] hover:bg-gradient-to-r hover:from-[var(--accent4)] hover:via-[var(--accent5)] hover:to-[var(--accent2)] hover:text-black shadow-[var(--accent4)]/40"
              whileHover={{ scale: 1.07, boxShadow: "0 0 16px 0 var(--accent4)" }}
              transition={{ type: "spring", stiffness: 300 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </motion.a>
            <motion.a
              href="https://devpost.com/tanviranade"
              className="px-5 py-2 rounded border-2 border-[var(--accent5)] font-bold text-[var(--accent5)] hover:bg-gradient-to-r hover:from-[var(--accent5)] hover:via-[var(--accent1)] hover:to-[var(--accent3)] hover:text-black shadow-[var(--accent5)]/40"
              whileHover={{ scale: 1.07, boxShadow: "0 0 16px 0 var(--accent5)" }}
              transition={{ type: "spring", stiffness: 300 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Devpost
            </motion.a>
          </div>
        </motion.section>
        <SectionWave />

        {/* About Section */}
        <motion.section
          className="w-full flex flex-col gap-4 relative"
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-2 text-accent1">About Me</h2>
          <p className="text-base text-muted-foreground">Hi! I'm a 3rd year undergraduate interested in software engineering, AI/ML, data science, and medical applications. This past summer I interned at <b>Aryn</b>, where I worked on developing an LLM-based query planning and execution pipeline for analytics questions on unstructured data and co-authored a systems paper. I'm currently improving a <b>website</b> for the JHU Physics & Astronomy and on the student developer team for <b>Semester.ly</b>. In the past I worked on an iOS and Android app for <b>dearYou Health</b>, and have had experience working as an R&D intern at <b>CurveAssure</b> as a Full-Stack Software Developer.<br/><br/>On campus, I'm the president of <b>WiCS@JHU</b>, a counselor for Camp Kesem, and on a dance team, Blue Jay Bhangra. Recently, I joined Dr. Suchi Saria's lab for Machine Learning in Healthcare. I'm also currently an Intro Algorithms TA and have previously been one for Data Structures and Intermediate Programming (C/C++).</p>
        </motion.section>
        <SectionWave />

        {/* Skills Section */}
        <motion.section
          className="w-full flex flex-col gap-4 relative"
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-2 text-accent2">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {['JavaScript (Experienced)', 'HTML (Intermediate)', 'CSS (Intermediate)', 'TypeScript (Intermediate)', 'React (Intermediate)', 'Redux (Basic)', 'Python (Experienced)', 'Java (Experienced)', 'C/C++ (Experienced)', 'Databases (Intermediate)', 'API Calls (Intermediate)', 'Node.js (Intermediate)', 'Express.js (Basic)', 'Nest.js (Basic)'].map(skill => (
              <motion.span
                key={skill}
                className="px-3 py-1 rounded-full border border-accent2 text-accent2 text-sm font-semibold bg-background/80 cursor-pointer"
                whileHover={{ backgroundColor: "var(--accent2)", color: "#111215", scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>
        <SectionWave />

        {/* Projects Section */}
        <motion.section
          className="w-full flex flex-col gap-4 relative"
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-2 text-accent3">Projects</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <motion.div
              className="rounded-lg border border-black/10 dark:border-white/10 p-4 bg-background shadow-xl shadow-[var(--accent1)]/20 flex flex-col gap-2 cursor-pointer"
              whileHover={{ scale: 1.04, boxShadow: "0 0 24px 0 var(--accent3)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="font-semibold text-lg">PlatePal</h3>
              <p className="text-sm text-muted-foreground">A nutrition and meal planning app. (Details coming soon!)</p>
              <div className="flex gap-2 mt-2">
                <a href="https://github.com/tranade/platepal" className="text-accent3 hover:underline text-sm font-medium" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="#" className="text-accent4 hover:underline text-sm font-medium">Live Demo</a>
              </div>
            </motion.div>
            <motion.div
              className="rounded-lg border border-black/10 dark:border-white/10 p-4 bg-background shadow-xl shadow-[var(--accent2)]/20 flex flex-col gap-2 cursor-pointer"
              whileHover={{ scale: 1.04, boxShadow: "0 0 24px 0 var(--accent4)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="font-semibold text-lg">TerraVision</h3>
              <p className="text-sm text-muted-foreground">A full-stack mapping and visualization tool. (Details coming soon!)</p>
              <div className="flex gap-2 mt-2">
                <a href="#" className="text-accent3 hover:underline text-sm font-medium">Backend</a>
                <a href="#" className="text-accent4 hover:underline text-sm font-medium">Frontend</a>
              </div>
            </motion.div>
            <motion.div
              className="rounded-lg border border-black/10 dark:border-white/10 p-4 bg-background shadow-xl shadow-[var(--accent3)]/20 flex flex-col gap-2 cursor-pointer"
              whileHover={{ scale: 1.04, boxShadow: "0 0 24px 0 var(--accent5)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="font-semibold text-lg">MindMatch</h3>
              <p className="text-sm text-muted-foreground">Coming soon!</p>
            </motion.div>
          </div>
        </motion.section>
        <SectionWave />

        {/* Experience Section */}
        <motion.section
          className="w-full flex flex-col gap-4 relative"
          id="experience"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-2 text-accent4">Experience</h2>
          <ul className="flex flex-col gap-4">
            <motion.li
              className="border-l-4 border-accent4 pl-4"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: easeInOut }}
            >
              <div className="font-semibold">Aryn (Software Engineering Intern) <span className="text-xs text-muted-foreground">(Summer 2023)</span></div>
              <div className="text-sm text-muted-foreground">Developed an LLM-based query planning and execution pipeline for analytics on unstructured data. Co-authored a systems paper.</div>
            </motion.li>
            <motion.li
              className="border-l-4 border-accent4 pl-4"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: easeInOut }}
            >
              <div className="font-semibold">Semester.ly (Student Developer) <span className="text-xs text-muted-foreground">(2023 - Present)</span></div>
              <div className="text-sm text-muted-foreground">Full-stack development for a course scheduling platform used by students at multiple universities.</div>
            </motion.li>
            <motion.li
              className="border-l-4 border-accent4 pl-4"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: easeInOut }}
            >
              <div className="font-semibold">dearYou Health (Mobile App Developer) <span className="text-xs text-muted-foreground">(2022)</span></div>
              <div className="text-sm text-muted-foreground">Developed an iOS and Android app for health and wellness.</div>
            </motion.li>
            <motion.li
              className="border-l-4 border-accent4 pl-4"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: easeInOut }}
            >
              <div className="font-semibold">CurveAssure (R&D Intern, Full-Stack SWE) <span className="text-xs text-muted-foreground">(2021)</span></div>
              <div className="text-sm text-muted-foreground">Worked on full-stack software for medical device analytics.</div>
            </motion.li>
            <motion.li
              className="border-l-4 border-accent4 pl-4"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: easeInOut }}
            >
              <div className="font-semibold">JHU Physics & Astronomy (Web Developer) <span className="text-xs text-muted-foreground">(2023 - Present)</span></div>
              <div className="text-sm text-muted-foreground">Improving and maintaining the department website.</div>
            </motion.li>
            <motion.li
              className="border-l-4 border-accent4 pl-4"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: easeInOut }}
            >
              <div className="font-semibold">WiCS@JHU (President) <span className="text-xs text-muted-foreground">(2023 - Present)</span></div>
              <div className="text-sm text-muted-foreground">Leading the Women in Computer Science chapter at JHU.</div>
            </motion.li>
            <motion.li
              className="border-l-4 border-accent4 pl-4"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: easeInOut }}
            >
              <div className="font-semibold">Camp Kesem (Counselor) <span className="text-xs text-muted-foreground">(2022 - Present)</span></div>
              <div className="text-sm text-muted-foreground">Counselor for a national nonprofit supporting children through and beyond a parent's cancer.</div>
            </motion.li>
            <motion.li
              className="border-l-4 border-accent4 pl-4"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: easeInOut }}
            >
              <div className="font-semibold">Blue Jay Bhangra (Dancer) <span className="text-xs text-muted-foreground">(2021 - Present)</span></div>
              <div className="text-sm text-muted-foreground">Member of JHU's competitive bhangra dance team.</div>
            </motion.li>
            <motion.li
              className="border-l-4 border-accent4 pl-4"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: easeInOut }}
            >
              <div className="font-semibold">JHU ML Healthcare Lab (Researcher) <span className="text-xs text-muted-foreground">(2024 - Present)</span></div>
              <div className="text-sm text-muted-foreground">Research in AI/ML for healthcare under Dr. Suchi Saria.</div>
            </motion.li>
            <motion.li
              className="border-l-4 border-accent4 pl-4"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: easeInOut }}
            >
              <div className="font-semibold">Teaching Assistant (JHU) <span className="text-xs text-muted-foreground">(2022 - Present)</span></div>
              <div className="text-sm text-muted-foreground">Intro Algorithms, Data Structures, Intermediate Programming (C/C++).</div>
            </motion.li>
          </ul>
        </motion.section>
        <SectionWave />

        {/* Testimonials Section */}
        <motion.section
          className="w-full flex flex-col gap-4 relative"
          id="testimonials"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-2 text-accent5">Contact</h2>
          <div className="relative w-full max-w-xl mx-auto">
            <motion.div
              className="rounded-lg border border-accent5 p-6 bg-background shadow-2xl shadow-[var(--accent3)]/30 flex flex-col items-center gap-2"
              whileHover={{ scale: 1.03, boxShadow: "0 0 24px 0 var(--accent5)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-base text-center">tranade1@jhu.edu</div>
              <div className="flex gap-4 mt-2">
                <a href="https://www.linkedin.com/in/tanviranade/" className="text-accent1 hover:underline text-sm font-medium" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/tranade" className="text-accent2 hover:underline text-sm font-medium" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://devpost.com/tanviranade" className="text-accent3 hover:underline text-sm font-medium" target="_blank" rel="noopener noreferrer">Devpost</a>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-accent3 py-6 border-t border-accent3 mt-8 bg-background/80">
        &copy; {new Date().getFullYear()} Tanvi Ranade. All rights reserved.
      </footer>
    </div>
  );
}
