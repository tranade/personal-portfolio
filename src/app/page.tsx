"use client";

import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { href: "/Tanvi_Ranade_Resume.pdf", label: "Resume" },
  { href: "mailto:tranade1@jhu.edu", label: "Email" },
  { href: "https://www.linkedin.com/in/tanviranade/", label: "LinkedIn" },
  { href: "https://github.com/tranade", label: "GitHub" },
  { href: "https://devpost.com/tanviranade", label: "Devpost" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center px-4">
      {/* Navigation */}
      <nav className="w-full max-w-3xl mx-auto flex justify-between items-center py-6 mb-8 sticky top-0 bg-background z-10">
        <span className="text-lg font-bold tracking-tight">Tanvi Ranade</span>
        <div className="flex gap-6 text-sm">
          {socialLinks.map(link => (
            <Link key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="hover:text-accent2 transition-colors font-medium">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
      <main className="w-full max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center gap-20 pb-20">
        {/* Hero Section */}
        <section className="flex flex-col items-center gap-6 pt-12 pb-8">
          <Image src="/profile.jpg" alt="Tanvi Ranade profile" width={120} height={120} className="rounded-full object-cover w-32 h-32 border-2 border-accent2" />
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center">Tanvi Ranade</h1>
          <p className="text-lg text-center text-accent2 font-medium">Johns Hopkins '26 — B.S. Computer Science, B.S. Biomedical Engineering</p>
          <div className="flex gap-4 mt-2 flex-wrap justify-center">
            {socialLinks.map(link => (
              <Link key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="px-4 py-1 rounded border border-accent2 text-accent2 hover:bg-accent2 hover:text-background transition-colors text-sm font-semibold">
                {link.label}
              </Link>
            ))}
          </div>
        </section>
        {/* About Section */}
        <section className="w-full flex flex-col gap-4 py-8 border-b border-neutral-800">
          <h2 className="text-2xl font-bold mb-2">About</h2>
          <p className="text-base">Hi! I'm a 3rd year undergraduate interested in software engineering, AI/ML, data science, and medical applications. This past summer I interned at Aryn, where I worked on developing an LLM-based query planning and execution pipeline for analytics questions on unstructured data and co-authored a systems paper. I'm currently improving a website for the JHU Physics & Astronomy and on the student developer team for Semester.ly. In the past I worked on an iOS and Android app for dearYou Health, and have had experience working as an R&D intern at CurveAssure as a Full-Stack Software Developer. On campus, I'm the president of WiCS@JHU, a counselor for Camp Kesem, and on a dance team, Blue Jay Bhangra. Recently, I joined Dr. Suchi Saria's lab for Machine Learning in Healthcare. I'm also currently an Intro Algorithms TA and have previously been one for Data Structures and Intermediate Programming (C/C++).</p>
        </section>
        {/* Skills Section */}
        <section className="w-full flex flex-col gap-4 py-8 border-b border-neutral-800">
          <h2 className="text-2xl font-bold mb-2">Skills</h2>
          <ul className="flex flex-wrap gap-3">
            {['JavaScript', 'HTML', 'CSS', 'TypeScript', 'React', 'Redux', 'Python', 'Java', 'C/C++', 'Databases', 'API Calls', 'Node.js', 'Express.js', 'Nest.js'].map(skill => (
              <li key={skill} className="px-3 py-1 rounded-full border border-accent2 text-accent2 text-sm font-semibold bg-background/80">
                {skill}
              </li>
            ))}
          </ul>
        </section>
        {/* Projects Section */}
        <section className="w-full flex flex-col gap-4 py-8 border-b border-neutral-800">
          <h2 className="text-2xl font-bold mb-2">Projects</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-neutral-800 p-4 bg-background flex flex-col gap-2">
              <h3 className="font-semibold text-lg">PlatePal</h3>
              <p className="text-sm">A nutrition and meal planning app.</p>
              <div className="flex gap-2 mt-2">
                <a href="https://github.com/tranade/platepal" className="text-accent2 hover:underline text-sm font-medium" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="#" className="text-accent2 hover:underline text-sm font-medium">Live Demo</a>
              </div>
            </div>
            <div className="rounded-lg border border-neutral-800 p-4 bg-background flex flex-col gap-2">
              <h3 className="font-semibold text-lg">TerraVision</h3>
              <p className="text-sm">A full-stack mapping and visualization tool.</p>
              <div className="flex gap-2 mt-2">
                <a href="#" className="text-accent2 hover:underline text-sm font-medium">Backend</a>
                <a href="#" className="text-accent2 hover:underline text-sm font-medium">Frontend</a>
              </div>
            </div>
            <div className="rounded-lg border border-neutral-800 p-4 bg-background flex flex-col gap-2">
              <h3 className="font-semibold text-lg">MindMatch</h3>
              <p className="text-sm">Coming soon!</p>
            </div>
            <div className="rounded-lg border border-neutral-800 p-4 bg-background flex flex-col gap-2">
              <h3 className="font-semibold text-lg">HealthTrackr</h3>
              <p className="text-sm">A health and fitness dashboard.</p>
            </div>
          </div>
        </section>
        {/* Experience Section */}
        <section className="w-full flex flex-col gap-4 py-8 border-b border-neutral-800">
          <h2 className="text-2xl font-bold mb-2">Experience</h2>
          <ul className="flex flex-col gap-2">
            <li><span className="font-semibold">Aryn</span> — Software Engineering Intern (Summer 2023): Developed an LLM-based query planning and execution pipeline for analytics on unstructured data. Co-authored a systems paper.</li>
            <li><span className="font-semibold">Semester.ly</span> — Student Developer (2023 - Present): Full-stack development for a course scheduling platform used by students at multiple universities.</li>
            <li><span className="font-semibold">dearYou Health</span> — Mobile App Developer (2022): Developed an iOS and Android app for health and wellness.</li>
            <li><span className="font-semibold">CurveAssure</span> — R&D Intern, Full-Stack SWE (2021): Worked on full-stack software for medical device analytics.</li>
            <li><span className="font-semibold">JHU Physics & Astronomy</span> — Web Developer (2023 - Present): Improving and maintaining the department website.</li>
            <li><span className="font-semibold">WiCS@JHU</span> — President (2023 - Present): Leading the Women in Computer Science chapter at JHU.</li>
            <li><span className="font-semibold">Camp Kesem</span> — Counselor (2022 - Present): Counselor for a national nonprofit supporting children through and beyond a parent's cancer.</li>
            <li><span className="font-semibold">Blue Jay Bhangra</span> — Dancer (2021 - Present): Member of JHU's competitive bhangra dance team.</li>
            <li><span className="font-semibold">JHU ML Healthcare Lab</span> — Researcher (2024 - Present): Research in AI/ML for healthcare under Dr. Suchi Saria.</li>
            <li><span className="font-semibold">Teaching Assistant (JHU)</span> (2022 - Present): Intro Algorithms, Data Structures, Intermediate Programming (C/C++).</li>
          </ul>
        </section>
        {/* Testimonials Section */}
        <section className="w-full flex flex-col gap-4 py-8 border-b border-neutral-800">
          <h2 className="text-2xl font-bold mb-2">Testimonials</h2>
          <div className="flex flex-col gap-4">
            <div className="rounded-lg border border-neutral-800 p-4 bg-background flex flex-col gap-2">
              <div className="text-base italic">"Tanvi is a fantastic collaborator and always brings creative solutions to the table. Her technical skills and positive attitude made a huge impact on our project!"</div>
              <div className="mt-2 text-sm font-semibold text-accent2">Alex Smith</div>
              <div className="text-xs text-muted-foreground">Teammate, Aryn</div>
            </div>
            <div className="rounded-lg border border-neutral-800 p-4 bg-background flex flex-col gap-2">
              <div className="text-base italic">"Working with Tanvi was a pleasure. She is organized, driven, and a great leader."</div>
              <div className="mt-2 text-sm font-semibold text-accent2">Priya Patel</div>
              <div className="text-xs text-muted-foreground">President, WiCS@JHU</div>
            </div>
            <div className="rounded-lg border border-neutral-800 p-4 bg-background flex flex-col gap-2">
              <div className="text-base italic">"Tanvi's ability to quickly learn new technologies and contribute meaningfully is impressive. Highly recommend!"</div>
              <div className="mt-2 text-sm font-semibold text-accent2">Jordan Lee</div>
              <div className="text-xs text-muted-foreground">Mentor, Semester.ly</div>
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section className="w-full flex flex-col gap-4 py-8">
          <h2 className="text-2xl font-bold mb-2">Contact</h2>
          <div className="flex flex-col gap-2 items-center">
            <div className="text-base">tranade1@jhu.edu</div>
            <div className="flex gap-4 mt-2">
              <a href="https://www.linkedin.com/in/tanviranade/" className="text-accent2 hover:underline text-sm font-medium" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/tranade" className="text-accent2 hover:underline text-sm font-medium" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://devpost.com/tanviranade" className="text-accent2 hover:underline text-sm font-medium" target="_blank" rel="noopener noreferrer">Devpost</a>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="w-full text-center text-xs text-accent2 py-6 mt-8">
        &copy; {new Date().getFullYear()} Tanvi Ranade. All rights reserved.
      </footer>
    </div>
  );
}
