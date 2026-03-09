import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ScrollReveal,
  TerminalWindow,
  CommandPrefix,
} from "@/components/terminal";
import { Timeline } from "@/components/ui/Timeline";
import { Button } from "@/components/ui/Button";
import { TeamMemberCard } from "@/components/sections/TeamMemberCard";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { team as localTeam } from "@/data/team";
import { SOCIAL_LINKS } from "@/lib/constants";
import {
  Code2,
  Globe,
  Database,
  Box,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  ExternalLink,
  Sparkles,
  Terminal,
  Cpu,
  Award
} from "lucide-react";

export const metadata: Metadata = {
  title: "About | Stephen Muli Musyoki",
  description:
    "Full-stack developer from Kenya. Building production-ready web applications with React, Next.js, and TypeScript.",
  alternates: {
    canonical: "https://stephenmuli.dev/about",
  },
  openGraph: {
    title: "About | Stephen Muli Musyoki",
    description:
      "Full-stack developer from Kenya. Building production-ready web applications with React, Next.js, and TypeScript.",
    url: "https://stephenmuli.dev/about",
    siteName: "Stephen Muli Musyoki",
    type: "website",
    images: [
      {
        url: "/images/profile.jpg",
        width: 800,
        height: 800,
        alt: "Stephen Muli Musyoki",
      },
    ],
  },
};

// Transform local team data to match global TeamMember interface
function transformToTeamMember(localMember: any): TeamMember {
  return {
    id: localMember.id,
    name: localMember.name,
    slug: localMember.slug || localMember.id.toLowerCase().replace(/\s+/g, '-'),
    role: localMember.role as TeamRole || 'contributor',
    title: localMember.title || localMember.role,
    bio: localMember.bio,
    full_bio: localMember.full_bio,
    email: localMember.email,
    phone: localMember.phone,
    website: localMember.website,
    github: localMember.github,
    twitter: localMember.twitter,
    linkedin: localMember.linkedin,
    facebook: localMember.facebook,
    instagram: localMember.instagram,
    youtube: localMember.youtube,
    discord: localMember.discord,
    slack: localMember.slack,
    telegram: localMember.telegram,
    whatsapp: localMember.whatsapp,
    calendly: localMember.calendly,
    avatar_url: localMember.avatar_url,
    cover_image: localMember.cover_image,
    profile_image: localMember.profile_image,
    skills: localMember.skills || [],
    expertise: localMember.expertise || [],
    technologies: localMember.technologies || [],
    languages: localMember.languages || [],
    interests: localMember.interests || [],
    company: localMember.company,
    position: localMember.position,
    years_experience: localMember.years_experience || 0,
    specialties: localMember.specialties || [],
    certifications: localMember.certifications || [],
    education: localMember.education || [],
    current_projects: localMember.current_projects || [],
    past_projects: localMember.past_projects || [],
    open_source_contributions: localMember.open_source_contributions || [],
    blog_posts: localMember.blog_posts || [],
    resources_created: localMember.resources_created || [],
    events_hosted: localMember.events_hosted || [],
    contributions_count: localMember.contributions_count || 0,
    projects_count: localMember.projects_count || 0,
    followers_count: localMember.followers_count || 0,
    following_count: localMember.following_count || 0,
    is_active: localMember.is_active !== undefined ? localMember.is_active : true,
    is_core: localMember.is_core || false,
    is_lead: localMember.is_lead || false,
    is_mentor: localMember.is_mentor || false,
    join_date: localMember.join_date,
    leave_date: localMember.leave_date,
    display_order: localMember.display_order || 0,
    is_featured: localMember.is_featured || false,
    timezone: localMember.timezone || 'Africa/Nairobi',
    location: localMember.location,
    country: localMember.country || 'Kenya',
    city: localMember.city,
    testimonials: localMember.testimonials || [],
    recommendations: localMember.recommendations || [],
    meta_title: localMember.meta_title,
    meta_description: localMember.meta_description,
    meta_keywords: localMember.meta_keywords || [],
    created_at: localMember.created_at || new Date().toISOString(),
    updated_at: localMember.updated_at || new Date().toISOString(),
  };
}

// Transform the team data
const team = localTeam.map(transformToTeamMember);

const timelineEntries = [
  {
    date: "2021",
    title: "Started Development Journey",
    description:
      "Began learning web development, starting with HTML, CSS, and JavaScript. Built my first responsive websites.",
    hash: "a1b2c3d",
  },
  {
    date: "2022",
    title: "First Freelance Projects",
    description:
      "Started taking on freelance work, building websites and simple web applications for local businesses.",
    hash: "f0a1b2c",
  },
  {
    date: "2023",
    title: "Launched ProcureMaster",
    description:
      "Released my first major project - a comprehensive procurement system built with PHP CodeIgniter.",
    hash: "c3d4e5f",
  },
  {
    date: "2024",
    title: "Expanded to Mombasa",
    description:
      "Moved to Mombasa and continued building solutions for Kenyan businesses, including Ecclesia CMS and Mailu Enterprise.",
    hash: "e5f6g7h",
  },
];

const skills = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
  backend: ["Node.js", "Python", "PHP", "CodeIgniter", "FastAPI"],
  database: ["PostgreSQL", "MySQL", "Redis", "Supabase"],
  devops: ["Docker", "Linux", "Nginx", "GitHub Actions"],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "About" }]} />

      {/* Hero Section with Profile */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-primary/5 via-transparent to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Profile Image with Glow Effect */}
            <ScrollReveal>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-primary to-amber rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-green-primary/30 ring-4 ring-green-primary/20">
                  <Image
                    src="/images/profile.jpg"
                    alt="Stephen Muli Musyoki"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Title and Info */}
            <ScrollReveal delay={200}>
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-primary/10 border border-green-primary/20 mb-4">
                  <Sparkles className="h-4 w-4 text-green-primary" />
                  <span className="font-mono text-xs text-green-primary">Full-Stack Developer</span>
                </div>

                <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                  <span className="text-text-primary">Stephen Muli</span>
                  <br />
                  <span className="text-green-primary">Musyoki</span>
                </h1>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                  <div className="flex items-center gap-2 text-text-dim">
                    <MapPin className="h-4 w-4" />
                    <span className="font-mono text-sm">Mombasa, Kenya</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-border-default" />
                  <div className="flex items-center gap-2 text-text-dim">
                    <Briefcase className="h-4 w-4" />
                    <span className="font-mono text-sm">3+ years</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-border-default" />
                  <div className="flex items-center gap-2 text-text-dim">
                    <Terminal className="h-4 w-4" />
                    <span className="font-mono text-sm">Full-Stack</span>
                  </div>
                </div>

                <p className="max-w-2xl text-lg text-text-secondary leading-relaxed">
                  Building production-ready web applications that solve real problems for
                  <span className="text-green-primary font-medium"> Kenyan businesses and communities</span>.
                  Passionate about clean code, performance, and user experience.
                </p>

                {/* Social Links */}
                <div className="flex items-center justify-center md:justify-start gap-3 mt-8">
                  <a
                    href="https://github.com/stephenmuli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-border-default hover:border-green-primary/30 hover:bg-green-primary/5 transition-all group"
                  >
                    <Github className="h-5 w-5 text-text-dim group-hover:text-green-primary" />
                  </a>
                  <a
                    href="https://linkedin.com/in/stephenmuli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-border-default hover:border-green-primary/30 hover:bg-green-primary/5 transition-all group"
                  >
                    <Linkedin className="h-5 w-5 text-text-dim group-hover:text-green-primary" />
                  </a>
                  <a
                    href="mailto:stephen@example.com"
                    className="p-3 rounded-lg border border-border-default hover:border-green-primary/30 hover:bg-green-primary/5 transition-all group"
                  >
                    <Mail className="h-5 w-5 text-text-dim group-hover:text-green-primary" />
                  </a>
                  <a
                    href="/resume.pdf"
                    download
                    className="px-4 py-2 rounded-lg border border-green-primary text-green-primary hover:bg-green-primary/10 transition-all font-mono text-sm ml-2"
                  >
                    Download CV
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border-default bg-bg-secondary/50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="font-mono text-3xl font-bold text-green-primary">3+</div>
              <div className="font-mono text-xs text-text-dim">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-3xl font-bold text-green-primary">15+</div>
              <div className="font-mono text-xs text-text-dim">Projects Built</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-3xl font-bold text-green-primary">10+</div>
              <div className="font-mono text-xs text-text-dim">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-3xl font-bold text-green-primary">∞</div>
              <div className="font-mono text-xs text-text-dim">Lines of Code</div>
            </div>
          </div>
        </div>
      </section>

      {/* My Story */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-primary/10 border border-green-primary/20">
              <Code2 className="h-5 w-5 text-green-primary" />
            </div>
            <h2 className="font-mono text-2xl font-bold text-text-primary">
              My Story
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 mt-8">
          <ScrollReveal delay={100}>
            <div className="space-y-6 text-text-secondary leading-relaxed">
              <p>
                I'm Stephen Muli Musyoki, a full-stack developer based in Mombasa, Kenya.
                My journey into software development started with curiosity:
                how do the apps and websites I use every day actually work?
              </p>
              <p>
                That curiosity led me to learn PHP, JavaScript, and eventually modern frameworks
                like React and Next.js. Over the past 3+ years, I've built everything from
                church management systems to procurement platforms, always with a focus on
                solving real problems for real people.
              </p>
              <p>
                What drives me is the opportunity to build tools that make a difference —
                whether it's helping a church manage its community, streamlining procurement
                for a business, or creating platforms that connect Kenyan developers.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bg-bg-card border border-border-default rounded-xl p-6">
              <h3 className="font-mono text-lg font-bold text-green-primary mb-4 flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                Quick Facts
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-primary mt-1">▹</span>
                  <span className="text-text-secondary">Based in <span className="text-text-primary">Mombasa, Kenya</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-primary mt-1">▹</span>
                  <span className="text-text-secondary"><span className="text-text-primary">3+ years</span> of professional experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-primary mt-1">▹</span>
                  <span className="text-text-secondary">Specialized in <span className="text-text-primary">React/Next.js</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-primary mt-1">▹</span>
                  <span className="text-text-secondary">Built <span className="text-text-primary">15+</span> production applications</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-primary mt-1">▹</span>
                  <span className="text-text-secondary">Open source contributor</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-primary mt-1">▹</span>
                  <span className="text-text-secondary">Tech community organizer</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Skills Section */}
      <section className="border-y border-border-default bg-bg-secondary/50 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-12">
              <div className="p-2 rounded-lg bg-green-primary/10 border border-green-primary/20">
                <Terminal className="h-5 w-5 text-green-primary" />
              </div>
              <h2 className="font-mono text-2xl font-bold text-text-primary">
                Skills & Expertise
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Frontend */}
            <ScrollReveal delay={0}>
              <TerminalWindow title="frontend.ts" variant="command" className="h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-amber">
                    <Code2 className="h-4 w-4" />
                    <h3 className="font-mono text-sm font-bold">// Frontend</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.frontend.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs font-mono bg-bg-secondary/50 text-text-dim rounded-full border border-border-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </TerminalWindow>
            </ScrollReveal>

            {/* Backend */}
            <ScrollReveal delay={100}>
              <TerminalWindow title="backend.py" variant="command" className="h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-amber">
                    <Box className="h-4 w-4" />
                    <h3 className="font-mono text-sm font-bold">// Backend</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.backend.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs font-mono bg-bg-secondary/50 text-text-dim rounded-full border border-border-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </TerminalWindow>
            </ScrollReveal>

            {/* Database */}
            <ScrollReveal delay={200}>
              <TerminalWindow title="database.sql" variant="command" className="h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-amber">
                    <Database className="h-4 w-4" />
                    <h3 className="font-mono text-sm font-bold">// Database</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.database.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs font-mono bg-bg-secondary/50 text-text-dim rounded-full border border-border-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </TerminalWindow>
            </ScrollReveal>

            {/* DevOps */}
            <ScrollReveal delay={300}>
              <TerminalWindow title="devops.yml" variant="command" className="h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-amber">
                    <Globe className="h-4 w-4" />
                    <h3 className="font-mono text-sm font-bold">// DevOps</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.devops.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs font-mono bg-bg-secondary/50 text-text-dim rounded-full border border-border-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </TerminalWindow>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-primary/10 border border-green-primary/20">
                <Briefcase className="h-5 w-5 text-green-primary" />
              </div>
              <h2 className="font-mono text-2xl font-bold text-text-primary">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-sm font-mono text-green-primary hover:text-amber transition-colors flex items-center gap-1"
            >
              View all <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {/* ProcureMaster */}
          <ScrollReveal delay={0}>
            <Link href="/projects/procuremaster" className="block group">
              <div className="border border-border-default bg-bg-card rounded-xl p-6 hover:border-green-primary/30 hover:-translate-y-1 transition-all duration-300">
                <h3 className="font-mono text-lg font-bold text-green-primary mb-2 group-hover:text-amber">
                  ProcureMaster
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Enterprise procurement and requisition system with multi-level approvals.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="text-[10px] px-2 py-1 bg-bg-secondary/50 text-text-dim rounded-full">PHP</span>
                  <span className="text-[10px] px-2 py-1 bg-bg-secondary/50 text-text-dim rounded-full">CodeIgniter</span>
                  <span className="text-[10px] px-2 py-1 bg-bg-secondary/50 text-text-dim rounded-full">MySQL</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-dim">2023</span>
                  <span className="text-xs text-green-primary group-hover:translate-x-1 transition-transform">View →</span>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Ecclesia CMS */}
          <ScrollReveal delay={100}>
            <Link href="/projects/ecclesia-cms" className="block group">
              <div className="border border-border-default bg-bg-card rounded-xl p-6 hover:border-green-primary/30 hover:-translate-y-1 transition-all duration-300">
                <h3 className="font-mono text-lg font-bold text-green-primary mb-2 group-hover:text-amber">
                  Ecclesia CMS
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Church management system for member tracking, tithes, and small groups.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="text-[10px] px-2 py-1 bg-bg-secondary/50 text-text-dim rounded-full">PHP</span>
                  <span className="text-[10px] px-2 py-1 bg-bg-secondary/50 text-text-dim rounded-full">MySQL</span>
                  <span className="text-[10px] px-2 py-1 bg-bg-secondary/50 text-text-dim rounded-full">Tailwind</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-dim">2023</span>
                  <span className="text-xs text-green-primary group-hover:translate-x-1 transition-transform">View →</span>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Mailu Enterprise */}
          <ScrollReveal delay={200}>
            <Link href="/projects/mailu-enterprise" className="block group">
              <div className="border border-border-default bg-bg-card rounded-xl p-6 hover:border-green-primary/30 hover:-translate-y-1 transition-all duration-300">
                <h3 className="font-mono text-lg font-bold text-green-primary mb-2 group-hover:text-amber">
                  Mailu Enterprise
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Docker-based email infrastructure solution for businesses.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="text-[10px] px-2 py-1 bg-bg-secondary/50 text-text-dim rounded-full">Docker</span>
                  <span className="text-[10px] px-2 py-1 bg-bg-secondary/50 text-text-dim rounded-full">Mailu</span>
                  <span className="text-[10px] px-2 py-1 bg-bg-secondary/50 text-text-dim rounded-full">PostgreSQL</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-dim">2024</span>
                  <span className="text-xs text-green-primary group-hover:translate-x-1 transition-transform">View →</span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y border-border-default bg-bg-secondary/50 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-12">
              <div className="p-2 rounded-lg bg-green-primary/10 border border-green-primary/20">
                <Calendar className="h-5 w-5 text-green-primary" />
              </div>
              <h2 className="font-mono text-2xl font-bold text-text-primary">
                My Journey
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal>
              <Timeline entries={timelineEntries} />
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-bg-card border border-border-default rounded-xl p-8">
                <h3 className="font-mono text-lg font-bold text-green-primary mb-6 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  What I Value
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green-primary mt-1.5 text-lg">•</span>
                    <div>
                      <span className="font-mono text-sm font-bold text-text-primary">Clean Code</span>
                      <p className="text-xs text-text-dim mt-1">Writing maintainable, scalable, and well-documented code</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-primary mt-1.5 text-lg">•</span>
                    <div>
                      <span className="font-mono text-sm font-bold text-text-primary">User First</span>
                      <p className="text-xs text-text-dim mt-1">Building experiences that users actually enjoy using</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-primary mt-1.5 text-lg">•</span>
                    <div>
                      <span className="font-mono text-sm font-bold text-text-primary">Continuous Learning</span>
                      <p className="text-xs text-text-dim mt-1">Always exploring new technologies and best practices</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-primary mt-1.5 text-lg">•</span>
                    <div>
                      <span className="font-mono text-sm font-bold text-text-primary">Community</span>
                      <p className="text-xs text-text-dim mt-1">Sharing knowledge and growing together with others</p>
                    </div>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-4 py-24 text-center">
        <ScrollReveal>
          <div className="bg-gradient-to-br from-green-primary/5 via-bg-card to-bg-card border border-border-default rounded-2xl p-12">
            <h2 className="font-mono text-3xl font-bold text-green-primary mb-4">
              Let's Build Something
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Have a project in mind? Looking for a developer? I'd love to hear about it.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/#contact">
                <Button variant="primary" className="min-w-[200px]">
                  Start a Conversation
                </Button>
              </a>
              <a href="/projects">
                <Button variant="secondary" className="min-w-[200px]">
                  View My Work
                </Button>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
