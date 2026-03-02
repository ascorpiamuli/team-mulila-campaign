import type { Metadata } from "next";
import Link from "next/link";
import { Terminal, Code, GraduationCap, MessageSquare, Users, Calendar, Share2, Download, Mail, Github, Linkedin, MapPin } from "lucide-react";
import { HeroTerminal } from "@/components/sections/HeroTerminal";
import { StatsBar } from "@/components/sections/StatsBar";
import { IdeaCard } from "@/components/sections/IdeaCard";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { MatrixRain } from "@/components/terminal";
import { ScrollReveal } from "@/components/terminal";
import { TerminalWindow } from "@/components/terminal";
import { GlitchText } from "@/components/terminal";
import { CommandPrefix } from "@/components/terminal";
import { Button } from "@/components/ui/Button";
import { getUpcomingIdeas } from "@/data/ideas";
import { getFeaturedProjects } from "@/data/projects";
import { SOCIAL_LINKS } from "@/lib/constants";
import { SkillsCarousel } from "@/components/ui/SkillsCarousel";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Stephen Muli Musyoki | Web Developer",
  description:
    "Personal portfolio of Stephen Muli Musyoki - Web developer specializing in modern web technologies, React, Next.js, and creative digital experiences in Nairobi, Kenya.",
  openGraph: {
    title: "Stephen Muli Musyoki | Web Developer",
    description:
      "Personal portfolio of Stephen Muli Musyoki - Web developer specializing in modern web technologies, React, and Next.js. Based in Nairobi, Kenya.",
    url: "https://stephenmuli.dev",
    siteName: "Stephen Muli Musyoki",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stephen Muli Musyoki | Web Developer",
    description:
      "Personal portfolio of Stephen Muli Musyoki - Web developer specializing in modern web technologies. Based in Nairobi, Kenya.",
  },
};

const whatWeDoItems = [
  {
    icon: Terminal,
    title: "Frontend Development",
    description:
      "Building responsive, performant web applications with React, Next.js, and TypeScript. I focus on clean code, accessibility, and exceptional user experiences that work seamlessly across all devices.",
  },
  {
    icon: Code,
    title: "Backend Development",
    description:
      "Creating robust server-side solutions with Node.js, Python, and various databases. I design RESTful APIs, GraphQL schemas, and cloud architecture on AWS that scale with your needs.",
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    description:
      "Technology never stops evolving, and neither do I. Currently exploring AI integration, advanced cloud patterns, and performance optimization to bring cutting-edge solutions to every project.",
  },
  {
    icon: MessageSquare,
    title: "Community & Mentorship",
    description:
      "Active participant in Nairobi's developer community. I share knowledge through mentorship, tech talks, and open source contributions, believing that we grow faster when we grow together.",
  },
];
const joinPathways = [
  {
    icon: MessageSquare,
    title: "GitHub",
    description:
      "Explore my code repositories, open source contributions, and personal projects. 50+ repos showcasing my work and learning journey.",
    href: "https://github.com/stephenmuli",
    isPrimary: true,
    cta: "VIEW_GITHUB",
    external: true,
  },
  {
    icon: Calendar,
    title: "Work With Me",
    description:
      "Available for freelance projects, collaborations, and full-time opportunities. Let's build something great together.",
    href: "/contact",
    isPrimary: false,
    cta: "GET_IN_TOUCH",
    external: false,
  },
  {
    icon: Share2,
    title: "LinkedIn",
    description:
      "Connect with me professionally. Follow my journey for tech insights, project updates, and web development tips.",
    href: "https://linkedin.com/in/stephenmuli",
    isPrimary: false,
    cta: "CONNECT",
    external: true,
  },
];



export default function Home() {
  const upcomingIdeas = getUpcomingIdeas();
  const featuredProjects = getFeaturedProjects();

  return (
    <div>
      {/* ─── Hero Section ─── */}
      <section
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
        aria-label="Hero"
      >
        <MatrixRain opacity={0.03} density={0.15} />
        
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/50 to-bg-primary pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg-primary to-transparent pointer-events-none" />
        
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff4110_1px,transparent_1px),linear-gradient(to_bottom,#00ff4110_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Desktop Layout (lg and above) */}
        <div className="relative z-10 hidden lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:max-w-7xl lg:w-full lg:px-8">
          {/* Left Column - Personal Info */}
          <div className="flex-1 space-y-6">
            <ScrollReveal delay={200}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-primary/20 bg-bg-card/50 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-primary"></span>
                </span>
                <span className="font-mono text-xs text-green-primary">Available for opportunities</span>
                <span className="w-1 h-1 rounded-full bg-green-primary/30 mx-2" />
                <span className="font-mono text-xs text-text-dim">Nairobi, Kenya</span>
                <span className="w-1 h-1 rounded-full bg-green-primary/30 mx-2" />
                <span className="font-mono text-xs text-text-dim">EAT (UTC+3)</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <h1 className="font-mono text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                <span className="text-text-primary">Stephen Muli</span>
                <br />
                <span className="text-green-primary">Musyoki</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-text-dim bg-bg-card/50 px-3 py-1 rounded-full border border-border-default">
                  &lt;web_developer /&gt;
                </span>
                <span className="font-mono text-sm text-text-dim bg-bg-card/50 px-3 py-1 rounded-full border border-border-default">
                  🚀 5+ years
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={500}>
              <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
                I build <span className="text-green-primary font-medium">full-stack web applications</span> that solve real problems. 
                Currently focused on <span className="text-amber">fintech, ISP tools, and developer platforms</span>.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <div className="flex items-center gap-4">
                <a
                  href="/resume.pdf"
                  download
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-primary to-amber rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
                  <Button variant="primary" className="relative px-6 py-3 text-base">
                    <Download className="mr-2 h-4 w-4" />
                    DOWNLOAD_RESUME
                  </Button>
                </a>
                <a
                  href="#contact"
                  className="group relative"
                >
                  <Button variant="secondary" className="relative px-6 py-3 text-base border-2 group-hover:border-green-primary/50 transition-all">
                    CONTACT_ME
                    <span className="ml-2 text-green-primary group-hover:translate-x-1 transition-transform">→</span>
                  </Button>
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={700}>
              <div className="flex items-center gap-6 pt-6">
                <div className="text-center">
                  <div className="font-mono text-2xl font-bold text-green-primary">5+</div>
                  <div className="font-mono text-xs text-text-dim mt-1">Years</div>
                </div>
                <div className="w-px h-8 bg-border-default" />
                <div className="text-center">
                  <div className="font-mono text-2xl font-bold text-green-primary">30+</div>
                  <div className="font-mono text-xs text-text-dim mt-1">Projects</div>
                </div>
                <div className="w-px h-8 bg-border-default" />
                <div className="text-center">
                  <div className="font-mono text-2xl font-bold text-green-primary">15+</div>
                  <div className="font-mono text-xs text-text-dim mt-1">Clients</div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={800}>
              <div className="flex items-center gap-4 pt-4">
                <a
                  href="https://github.com/stephenmuli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-border-default hover:border-green-primary/30 hover:bg-green-primary/5 transition-all duration-200"
                >
                  <Github className="h-4 w-4 text-text-dim group-hover:text-green-primary" />
                  <span className="font-mono text-xs text-text-dim group-hover:text-green-primary">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/stephenmuli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-border-default hover:border-green-primary/30 hover:bg-green-primary/5 transition-all duration-200"
                >
                  <Linkedin className="h-4 w-4 text-text-dim group-hover:text-green-primary" />
                  <span className="font-mono text-xs text-text-dim group-hover:text-green-primary">LinkedIn</span>
                </a>
                <a
                  href="mailto:stephen.muli@example.com"
                  className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-border-default hover:border-green-primary/30 hover:bg-green-primary/5 transition-all duration-200"
                >
                  <Mail className="h-4 w-4 text-text-dim group-hover:text-green-primary" />
                  <span className="font-mono text-xs text-text-dim group-hover:text-green-primary">Email</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Terminal (visible only on lg screens) */}
          <div className="flex-1">
            <ScrollReveal delay={200}>
              <HeroTerminal />
            </ScrollReveal>
          </div>
        </div>

        {/* Mobile/Tablet Layout (below lg screens) - No terminal */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-6 max-w-4xl mx-auto w-full px-4 py-12 lg:hidden">
          <ScrollReveal delay={200}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-primary/20 bg-bg-card/50 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-primary"></span>
              </span>
              <span className="font-mono text-xs text-green-primary">Available for opportunities</span>
              <span className="w-1 h-1 rounded-full bg-green-primary/30 mx-2" />
              <span className="font-mono text-xs text-text-dim">Nairobi, Kenya</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="text-center">
              <h1 className="font-mono text-4xl sm:text-5xl font-bold tracking-tight">
                <span className="text-text-primary">Stephen Muli</span>
                <br />
                <span className="text-green-primary">Musyoki</span>
              </h1>
              <div className="flex items-center justify-center gap-3 mt-3">
                <span className="font-mono text-sm text-text-dim bg-bg-card/50 px-3 py-1 rounded-full border border-border-default">
                  &lt;web_developer /&gt;
                </span>
                <span className="font-mono text-sm text-text-dim bg-bg-card/50 px-3 py-1 rounded-full border border-border-default">
                  🚀 5+ years
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <p className="max-w-2xl text-center font-sans text-base sm:text-lg text-text-secondary leading-relaxed">
              I build <span className="text-green-primary font-medium">full-stack web applications</span> that solve real problems. 
              Currently focused on <span className="text-amber">fintech, ISP tools, and developer platforms</span>.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={500}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/resume.pdf"
                download
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-primary to-amber rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
                <Button variant="primary" className="relative px-6 py-3 text-base">
                  <Download className="mr-2 h-4 w-4" />
                  DOWNLOAD_RESUME
                </Button>
              </a>
              <a
                href="#contact"
                className="group relative"
              >
                <Button variant="secondary" className="relative px-6 py-3 text-base border-2 group-hover:border-green-primary/50 transition-all">
                  CONTACT_ME
                  <span className="ml-2 text-green-primary group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <div className="grid grid-cols-3 gap-6 mt-4 pt-6 border-t border-border-default/50 w-full max-w-md">
              <div className="text-center">
                <div className="font-mono text-2xl font-bold text-green-primary">5+</div>
                <div className="font-mono text-xs text-text-dim mt-1">Years</div>
              </div>
              <div className="text-center">
                <div className="font-mono text-2xl font-bold text-green-primary">30+</div>
                <div className="font-mono text-xs text-text-dim mt-1">Projects</div>
              </div>
              <div className="text-center">
                <div className="font-mono text-2xl font-bold text-green-primary">15+</div>
                <div className="font-mono text-xs text-text-dim mt-1">Clients</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={700}>
            <div className="flex items-center justify-center gap-4 mt-2">
              <a
                href="https://github.com/stephenmuli"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-lg border border-border-default hover:border-green-primary/30 hover:bg-green-primary/5 transition-all duration-200"
              >
                <Github className="h-5 w-5 text-text-dim group-hover:text-green-primary" />
              </a>
              <a
                href="https://linkedin.com/in/stephenmuli"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-lg border border-border-default hover:border-green-primary/30 hover:bg-green-primary/5 transition-all duration-200"
              >
                <Linkedin className="h-5 w-5 text-text-dim group-hover:text-green-primary" />
              </a>
              <a
                href="mailto:stephen.muli@example.com"
                className="group p-3 rounded-lg border border-border-default hover:border-green-primary/30 hover:bg-green-primary/5 transition-all duration-200"
              >
                <Mail className="h-5 w-5 text-text-dim group-hover:text-green-primary" />
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll indicator - visible on all screens */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ScrollReveal delay={2000}>
            <a href="#skills" className="flex flex-col items-center gap-2 text-text-dim/50 hover:text-green-primary transition-colors group">
              <span className="font-mono text-[10px] tracking-wider uppercase">
                Scroll
              </span>
              <div className="relative">
                <div className="h-8 w-px bg-gradient-to-b from-green-primary/30 to-transparent" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-primary/50 group-hover:bg-green-primary animate-bounce" />
              </div>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="relative z-20 mx-auto max-w-6xl px-4 py-12 sm:py-16 md:py-20 bg-bg-primary" aria-label="Community stats">
        <div className="border-t border-border-default pt-12 sm:pt-16">
          <StatsBar />
        </div>
      </section>

      {/* ─── Upcoming Project Ideas ─── */}
      <section className="mx-auto max-w-7xl px-4 py-20" aria-label="Upcoming project ideas">
        <ScrollReveal>
          <h2 className="mb-2 font-mono text-xl text-green-primary">
            <CommandPrefix />
            ls ideas/ --upcoming
          </h2>
          <p className="mb-10 font-sans text-text-secondary">
            Project ideas I'm planning to build. Open to collaboration and feedback.
          </p>
        </ScrollReveal>

        <ScrollReveal
          stagger={150}
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {getUpcomingIdeas().map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mt-10 text-center">
            <Link href="/ideas">
              <Button variant="secondary">VIEW_ALL_IDEAS</Button>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── What I Do ─── */}
      <section
        className="border-y border-border-default bg-bg-secondary py-24"
        aria-label="What I do"
      >
        <div className="mx-auto max-w-6xl px-4">
          <ScrollReveal>
            <h2 className="mb-2 font-mono text-xl text-green-primary">
              <CommandPrefix />
              skills --expertise
            </h2>
            <p className="mb-12 font-sans text-text-secondary">
              My technical expertise and the value I bring to every project.
            </p>
          </ScrollReveal>

      {/* Alternative: 3-column layout */}
      <ScrollReveal
        stagger={100}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {whatWeDoItems.map((item) => (
          <TerminalWindow
            key={item.title}
            title={item.title.toLowerCase().replace(/\s+/g, '-') + ".sh"}
            variant="command"
            className="h-full group hover:border-green-primary/30 transition-all duration-300"
          >
            <div className="flex flex-col gap-3 p-4">
              {/* Icon and title stacked for 3-col layout */}
              <div className="flex flex-col items-start gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-green-primary/20 bg-green-primary/10 group-hover:border-green-primary/40 group-hover:bg-green-primary/20 transition-all duration-300">
                  <item.icon
                    className="h-5 w-5 text-green-primary"
                    aria-hidden="true"
                  />
                </div>
                
                <h3 className="font-mono text-base font-bold text-text-primary group-hover:text-green-primary transition-colors duration-200">
                  {item.title}
                </h3>
              </div>
              
              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.description}
              </p>
              
              {/* Tech tags */}
              {item.title === "Frontend Development" && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {["React", "Next.js", "TypeScript", "Tailwind"].map(tech => (
                    <span key={tech} className="text-[10px] font-mono px-2 py-1 rounded-full border border-border-default bg-bg-primary/40 text-text-dim">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Other tech tags remain similar but with fewer items */}
            </div>
          </TerminalWindow>
        ))}
      </ScrollReveal>

          {/* Compact stats bar */}
          <ScrollReveal delay={200}>
            <div className="mt-16 flex justify-center">
              <div className="inline-flex items-center divide-x divide-border-default border border-border-default rounded-lg bg-bg-card">
                <div className="px-6 py-3 text-center">
                  <div className="font-mono text-2xl font-bold text-green-primary">5+</div>
                  <div className="font-mono text-xs text-text-dim">Years</div>
                </div>
                <div className="px-6 py-3 text-center">
                  <div className="font-mono text-2xl font-bold text-green-primary">30+</div>
                  <div className="font-mono text-xs text-text-dim">Projects</div>
                </div>
                <div className="px-6 py-3 text-center">
                  <div className="font-mono text-2xl font-bold text-green-primary">10+</div>
                  <div className="font-mono text-xs text-text-dim">Technologies</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Featured Projects ─── */}
      <section className="mx-auto max-w-6xl px-4 py-24" aria-label="Featured projects">
        <ScrollReveal>
          <h2 className="mb-2 font-mono text-xl text-green-primary">
            <CommandPrefix />
            ls projects/ --featured
          </h2>
          <p className="mb-12 font-sans text-text-secondary">
            A selection of my best work — real projects I've built and shipped.
          </p>
        </ScrollReveal>

        <ScrollReveal
          stagger={150}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mt-12 text-center">
            <Link href="/projects">
              <Button variant="secondary" className="group">
                <span className="mr-2">VIEW_ALL_PROJECTS</span>
                <span className="text-green-primary group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── Contact Me ─── */}
      <section
        className="border-y border-border-default bg-bg-secondary py-24"
        aria-label="Contact me"
        id="contact"
      >
        <div className="mx-auto max-w-6xl px-4">
          <ScrollReveal>
            <h2 className="mb-2 text-center font-mono text-xl text-green-primary">
              <CommandPrefix />
              contact --get-in-touch
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center font-sans text-text-secondary">
              Have a project in mind, an opportunity to discuss, or just want to say hello? 
              I'd love to hear from you. Fill out the form below and I'll get back to you within 24 hours.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger={100}>
            <ContactForm 
              email="info@ascorpi.cloud"
              github="ascorpi"
              linkedin="stephenmuli"
              location="Mombasa, Kenya"
            />
          </ScrollReveal>
        </div>
      </section>    
      {/* ─── Technologies Stack ─── */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 overflow-hidden" aria-label="Technologies">
        {/* Background with gradient and glow effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/50 to-bg-primary" />
        
        {/* Animated grid background - smaller grid on mobile */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff4110_1px,transparent_1px),linear-gradient(to_bottom,#00ff4110_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Glowing orbs for depth - smaller on mobile */}
        <div className="absolute top-1/4 left-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-green-primary/5 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-amber/5 rounded-full blur-2xl sm:blur-3xl" />
        
        {/* Diagonal accent lines - hidden on mobile */}
        <div className="absolute inset-0 opacity-20 hidden sm:block">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-primary/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-primary/50 to-transparent" />
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-primary/50 to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-primary/50 to-transparent" />
        </div>

        <div className="relative z-10">
          {/* Section header with decorative elements */}
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="h-px w-4 sm:w-8 bg-gradient-to-r from-transparent to-green-primary/50" />
              <span className="font-mono text-[10px] sm:text-xs lg:text-sm font-medium text-green-primary tracking-[0.2em] uppercase">
                Tech Stack
              </span>
              <div className="h-px w-4 sm:w-8 bg-gradient-to-l from-transparent to-green-primary/50" />
            </div>
            
            <h2 className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary mb-2 sm:mb-3 lg:mb-4 px-4">
              Tools I <span className="text-green-primary">⚡</span> Work With
            </h2>
            
            <p className="font-sans text-sm sm:text-base text-text-secondary max-w-2xl mx-auto px-4">
              A collection of technologies I've mastered and actively use to build 
              robust, scalable applications.
            </p>
          </div>

          {/* Terminal-style header for the carousel */}
          <div className="max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-bg-card/30 border border-border-default rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-red" />
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-amber" />
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-green-primary" />
              </div>
              <span className="font-mono text-[10px] sm:text-xs text-text-dim truncate">
                <span className="text-green-primary">$</span> ls /usr/share/technologies --color=always
              </span>
            </div>
          </div>

          {/* Main carousel with enhanced container */}
          <div className="relative">
            {/* Gradient masks for smooth edges - smaller on mobile */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-bg-secondary via-bg-secondary/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-bg-secondary via-bg-secondary/80 to-transparent z-10 pointer-events-none" />
            
            {/* Skills Carousel */}
            <div className="relative bg-bg-card/30 backdrop-blur-sm border-y border-border-default py-6 sm:py-8">
              <SkillsCarousel />
            </div>
          </div>

          {/* Bottom stats - stacked on mobile */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-10 lg:mt-12 text-[10px] sm:text-xs font-mono text-text-dim px-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-primary"></span>
              </span>
              <span>Continuously learning</span>
            </div>
            
            <div className="w-8 sm:w-px h-px sm:h-4 bg-border-default rotate-90 sm:rotate-0" />
            
            <div className="flex items-center gap-2">
              <span className="text-green-primary">⚡</span>
              <span>Production ready</span>
            </div>
            
            <div className="w-8 sm:w-px h-px sm:h-4 bg-border-default rotate-90 sm:rotate-0" />
            
            <div className="flex items-center gap-2">
              <span className="text-amber">🔄</span>
              <span>Always updating</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
