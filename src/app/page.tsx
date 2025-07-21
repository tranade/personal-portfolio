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

const aboutTabs = [
  { label: "Bio", content: (
    <p className="text-base text-muted-foreground">Hi! I'm a 3rd year undergraduate interested in software engineering, AI/ML, data science, and medical applications. This past summer I interned at <b>Aryn</b>, where I worked on developing an LLM-based query planning and execution pipeline for analytics questions on unstructured data and co-authored a systems paper. I'm currently improving a <b>website</b> for the JHU Physics & Astronomy and on the student developer team for <b>Semester.ly</b>. In the past I worked on an iOS and Android app for <b>dearYou Health</b>, and have had experience working as an R&D intern at <b>CurveAssure</b> as a Full-Stack Software Developer.<br/><br/>On campus, I'm the president of <b>WiCS@JHU</b>, a counselor for Camp Kesem, and on a dance team, Blue Jay Bhangra. Recently, I joined Dr. Suchi Saria's lab for Machine Learning in Healthcare. I'm also currently an Intro Algorithms TA and have previously been one for Data Structures and Intermediate Programming (C/C++).</p>
  ) },
  { label: "Fun Facts", content: (
    <ul className="list-disc pl-6 text-base text-muted-foreground">
      <li>Loves dancing (Bhangra team!)</li>
      <li>Enjoys hiking and photography</li>
      <li>Can solve a Rubik's cube in under a minute</li>
      <li>Speaks 3 languages</li>
      <li>Favorite food: Sushi 🍣</li>
    </ul>
  ) },
  { label: "Education", content: (
    <ul className="list-disc pl-6 text-base text-muted-foreground">
      <li>Johns Hopkins University, B.S. Computer Science</li>
      <li>Johns Hopkins University, B.S. Biomedical Engineering</li>
      <li>Expected Graduation: 2026</li>
      <li>Relevant Coursework: Data Structures, Algorithms, Machine Learning, Web Development, Systems Programming</li>
    </ul>
  ) },
];

function AboutTabs() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="w-full">
      <div className="flex gap-2 mb-4">
        {aboutTabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`px-4 py-1 rounded-t font-semibold border-b-2 transition-colors ${activeTab === idx ? 'border-accent1 text-accent1 bg-background' : 'border-transparent text-muted-foreground bg-background/60 hover:text-accent1'}`}
            onClick={() => setActiveTab(idx)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="rounded-b bg-background/80 p-4 border border-accent1 border-t-0 shadow-lg min-h-[100px]">
        {aboutTabs[activeTab].content}
      </div>
    </div>
  );
}

const skillsTabs = [
  {
    label: "Languages",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { name: "JavaScript", level: 5 },
          { name: "Python", level: 5 },
          { name: "Java", level: 4 },
          { name: "C/C++", level: 4 },
          { name: "HTML", level: 3 },
          { name: "CSS", level: 3 },
          { name: "TypeScript", level: 3 },
        ].map(skill => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} />
        ))}
      </div>
    )
  },
  {
    label: "Frameworks",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { name: "React", level: 4 },
          { name: "Redux", level: 2 },
          { name: "Node.js", level: 3 },
          { name: "Express.js", level: 2 },
          { name: "Nest.js", level: 2 },
        ].map(skill => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} />
        ))}
      </div>
    )
  },
  {
    label: "Tools",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { name: "Git", level: 4 },
          { name: "Databases", level: 3 },
          { name: "API Calls", level: 3 },
          { name: "Figma", level: 2 },
          { name: "Jira", level: 2 },
        ].map(skill => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} />
        ))}
      </div>
    )
  },
];

function SkillsTabs() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="w-full">
      <div className="flex gap-2 mb-4">
        {skillsTabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`px-4 py-1 rounded-t font-semibold border-b-2 transition-colors ${activeTab === idx ? 'border-accent2 text-accent2 bg-background' : 'border-transparent text-muted-foreground bg-background/60 hover:text-accent2'}`}
            onClick={() => setActiveTab(idx)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="rounded-b bg-background/80 p-4 border border-accent2 border-t-0 shadow-lg min-h-[100px]">
        {skillsTabs[activeTab].content}
      </div>
    </div>
  );
}

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-32 font-medium text-sm">{name}</span>
      <div className="flex gap-1">
        {[1,2,3,4,5].map(i => (
          <span
            key={i}
            className={`inline-block w-3 h-3 rounded-full ${i <= level ? 'bg-accent2' : 'bg-accent2/20'}`}
          />
        ))}
      </div>
    </div>
  );
}

const projectsData = [
  {
    name: "PlatePal",
    type: "Mobile",
    description: "A nutrition and meal planning app.",
    tags: ["React Native", "Firebase"],
    github: "https://github.com/tranade/platepal",
    demo: "#",
    image: "/file.svg"
  },
  {
    name: "TerraVision",
    type: "Web",
    description: "A full-stack mapping and visualization tool.",
    tags: ["React", "Node.js"],
    github: "#",
    demo: "#",
    image: "/globe.svg"
  },
  {
    name: "MindMatch",
    type: "Other",
    description: "Coming soon!",
    tags: ["AI", "ML"],
    github: "#",
    demo: "#",
    image: "/window.svg"
  },
  {
    name: "HealthTrackr",
    type: "Web",
    description: "A health and fitness dashboard.",
    tags: ["Next.js", "MongoDB"],
    github: "#",
    demo: "#",
    image: "/vercel.svg"
  },
];

const projectTabs = [
  { label: "All", filter: () => true },
  { label: "Web", filter: (p: any) => p.type === "Web" },
  { label: "Mobile", filter: (p: any) => p.type === "Mobile" },
  { label: "Other", filter: (p: any) => p.type === "Other" },
];

function ProjectsTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const filtered = projectsData.filter(projectTabs[activeTab].filter);
  return (
    <div className="w-full">
      <div className="flex gap-2 mb-4">
        {projectTabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`px-4 py-1 rounded-t font-semibold border-b-2 transition-colors ${activeTab === idx ? 'border-accent3 text-accent3 bg-background' : 'border-transparent text-muted-foreground bg-background/60 hover:text-accent3'}`}
            onClick={() => setActiveTab(idx)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.map(project => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ name, description, tags, github, demo, image }: any) {
  return (
    <motion.div
      className="rounded-lg border border-black/10 dark:border-white/10 p-4 bg-background shadow-xl shadow-[var(--accent1)]/20 flex flex-col gap-2 cursor-pointer hover:scale-[1.05] active:scale-[0.98] hover:rotate-[-1deg] active:rotate-[1deg] transition-transform"
      whileHover={{ scale: 1.07, boxShadow: "0 0 24px 0 var(--accent3)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="w-full h-32 flex items-center justify-center mb-2 bg-background/60 rounded">
        <Image src={image} alt={name} width={64} height={64} className="object-contain" />
      </div>
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag: string) => (
          <span key={tag} className="px-2 py-0.5 rounded-full bg-accent3/10 text-accent3 text-xs font-medium">{tag}</span>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        {github && <a href={github} className="text-accent3 hover:underline text-sm font-medium" target="_blank" rel="noopener noreferrer">GitHub</a>}
        {demo && <a href={demo} className="text-accent4 hover:underline text-sm font-medium" target="_blank" rel="noopener noreferrer">Live Demo</a>}
      </div>
    </motion.div>
  );
}

const experienceData = [
  {
    title: "Aryn",
    role: "Software Engineering Intern",
    period: "Summer 2023",
    summary: "Developed an LLM-based query planning and execution pipeline for analytics on unstructured data. Co-authored a systems paper.",
    details: "Worked with a team to design and implement a scalable analytics pipeline using LLMs. Collaborated on a research paper and presented findings to stakeholders."
  },
  {
    title: "Semester.ly",
    role: "Student Developer",
    period: "2023 - Present",
    summary: "Full-stack development for a course scheduling platform used by students at multiple universities.",
    details: "Contributed to both frontend and backend features, improved user experience, and participated in code reviews."
  },
  {
    title: "dearYou Health",
    role: "Mobile App Developer",
    period: "2022",
    summary: "Developed an iOS and Android app for health and wellness.",
    details: "Built cross-platform features, integrated APIs, and worked closely with designers to deliver a polished product."
  },
  {
    title: "CurveAssure",
    role: "R&D Intern, Full-Stack SWE",
    period: "2021",
    summary: "Worked on full-stack software for medical device analytics.",
    details: "Developed analytics dashboards, improved data pipelines, and automated reporting tools."
  },
  // Add more as needed...
];

function ExperienceTimeline() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <ul className="flex flex-col gap-4">
      {experienceData.map((exp, idx) => (
        <li key={exp.title + exp.period} className="relative pl-8 border-l-4 border-accent4">
          <div className="absolute left-0 top-2 w-4 h-4 bg-accent4 rounded-full border-2 border-background" />
          <div className="flex items-center justify-between">
            <div className="font-semibold">{exp.title} <span className="text-xs text-muted-foreground">({exp.role})</span> <span className="text-xs text-muted-foreground">[{exp.period}]</span></div>
            <button
              className="ml-2 text-accent4 text-xs underline"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              type="button"
            >
              {openIdx === idx ? "Hide" : "Details"}
            </button>
          </div>
          <div className="text-sm text-muted-foreground">{exp.summary}</div>
          {openIdx === idx && (
            <div className="mt-2 text-sm text-foreground bg-background/80 p-3 rounded border border-accent4/40 shadow">
              {exp.details}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

const testimonialsData = [
  {
    name: "Alex Smith",
    role: "Teammate, Aryn",
    text: "Tanvi is a fantastic collaborator and always brings creative solutions to the table. Her technical skills and positive attitude made a huge impact on our project!"
  },
  {
    name: "Priya Patel",
    role: "President, WiCS@JHU",
    text: "Working with Tanvi was a pleasure. She is organized, driven, and a great leader."
  },
  {
    name: "Jordan Lee",
    role: "Mentor, Semester.ly",
    text: "Tanvi's ability to quickly learn new technologies and contribute meaningfully is impressive. Highly recommend!"
  },
];

function TestimonialsCarousel() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i === 0 ? testimonialsData.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === testimonialsData.length - 1 ? 0 : i + 1));
  const t = testimonialsData[idx];
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <motion.div
        className="rounded-lg border border-accent5 p-6 bg-background shadow-2xl shadow-[var(--accent3)]/30 flex flex-col items-center gap-2 min-h-[120px] transition-transform"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="text-base text-center italic">"{t.text}"</div>
        <div className="mt-2 text-sm font-semibold text-accent5">{t.name}</div>
        <div className="text-xs text-muted-foreground">{t.role}</div>
      </motion.div>
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 px-2 py-1 bg-background/80 border border-accent5 rounded-full text-accent5 hover:bg-accent5 hover:text-background transition"
        onClick={prev}
        aria-label="Previous testimonial"
        type="button"
      >
        &#8592;
      </button>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 px-2 py-1 bg-background/80 border border-accent5 rounded-full text-accent5 hover:bg-accent5 hover:text-background transition"
        onClick={next}
        aria-label="Next testimonial"
        type="button"
      >
        &#8594;
      </button>
    </div>
  );
}

function ContactTabs() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex gap-2 mb-4">
        {["Contact Info", "Contact Form"].map((label, idx) => (
          <button
            key={label}
            className={`px-4 py-1 rounded-t font-semibold border-b-2 transition-colors ${activeTab === idx ? 'border-accent1 text-accent1 bg-background' : 'border-transparent text-muted-foreground bg-background/60 hover:text-accent1'}`}
            onClick={() => setActiveTab(idx)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <div className="rounded-b bg-background/80 p-4 border border-accent1 border-t-0 shadow-lg min-h-[100px]">
        {activeTab === 0 ? (
          <div className="flex flex-col items-center gap-2">
            <div className="text-base text-center">tranade1@jhu.edu</div>
            <div className="flex gap-4 mt-2">
              <a href="https://www.linkedin.com/in/tanviranade/" className="text-accent1 hover:underline text-sm font-medium" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/tranade" className="text-accent2 hover:underline text-sm font-medium" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://devpost.com/tanviranade" className="text-accent3 hover:underline text-sm font-medium" target="_blank" rel="noopener noreferrer">Devpost</a>
            </div>
          </div>
        ) : (
          <form className="flex flex-col gap-3">
            <input type="text" placeholder="Your Name" className="px-3 py-2 rounded border border-accent1 bg-background text-foreground" disabled />
            <input type="email" placeholder="Your Email" className="px-3 py-2 rounded border border-accent1 bg-background text-foreground" disabled />
            <textarea placeholder="Your Message" className="px-3 py-2 rounded border border-accent1 bg-background text-foreground" rows={4} disabled />
            <button type="submit" className="px-4 py-2 rounded bg-accent1 text-black font-bold shadow hover:bg-accent2 transition" disabled>Send (Coming Soon)</button>
          </form>
        )}
      </div>
    </div>
  );
}

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
          <motion.h1
            className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[var(--accent1)] via-[var(--accent3)] to-[var(--accent5)] bg-clip-text text-transparent drop-shadow font-heading"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Tanvi Ranade
          </motion.h1>
          <motion.p
            className="text-xl font-semibold bg-gradient-to-r from-[var(--accent2)] via-[var(--accent4)] to-[var(--accent1)] bg-clip-text text-transparent font-heading"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Johns Hopkins '26 &mdash; B.S. Computer Science, B.S. Biomedical Engineering
          </motion.p>
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
          <motion.h2
            className="text-3xl font-bold mb-2 text-accent1 font-heading"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            About Me
          </motion.h2>
          {/* Tabs for About Section */}
          <AboutTabs />
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
          <motion.h2
            className="text-3xl font-bold mb-2 text-accent2 font-heading"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Skills
          </motion.h2>
          <SkillsTabs />
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
          <motion.h2
            className="text-3xl font-bold mb-2 text-accent3 font-heading"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Projects
          </motion.h2>
          <ProjectsTabs />
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
          <motion.h2
            className="text-3xl font-bold mb-2 text-accent4 font-heading"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Experience
          </motion.h2>
          <ExperienceTimeline />
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
          <motion.h2
            className="text-3xl font-bold mb-2 text-accent5 font-heading"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Testimonials
          </motion.h2>
          <TestimonialsCarousel />
        </motion.section>
        {/* Contact Section */}
        <motion.section
          className="w-full flex flex-col gap-4 relative"
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
        >
          <motion.h2
            className="text-3xl font-bold mb-2 text-accent1 font-heading"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact
          </motion.h2>
          <ContactTabs />
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-accent3 py-6 border-t border-accent3 mt-8 bg-background/80">
        &copy; {new Date().getFullYear()} Tanvi Ranade. All rights reserved.
      </footer>
    </div>
  );
}
