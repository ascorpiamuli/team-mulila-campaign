"use client";

import Link from "next/link";
import { 
  Download, 
  Mail, 
  Github, 
  Linkedin, 
  ArrowRight, 
  Sparkles,
  Briefcase,
  Lightbulb,
  Calendar,
  Newspaper,
  HelpCircle,
  
} from "lucide-react";
import { HeroTerminal } from "@/components/sections/HeroTerminal";
import { StatsBar } from "@/components/sections/StatsBar";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { IdeaCard } from "@/components/sections/IdeaCard";
import { EventCard } from "@/components/sections/EventCard";
import { BlogCard } from "@/components/sections/BlogCard";
import { FAQCard } from "@/components/sections/FAQCard";
import { Testimonials } from "@/components/sections/Testimonials";
import { MatrixRain } from "@/components/terminal";
import { ScrollReveal } from "@/components/terminal";
import { CommandPrefix } from "@/components/terminal";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/sections/ContactForm";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

// Custom Hooks
import { useFeaturedProjects, useProjectsSeekingContributors } from "@/hooks/useProjects";
import { useUpcomingIdeas, useIdeasSeekingCollaborators } from "@/hooks/useProjectIdeas";
import { useUpcomingEvents } from "@/hooks/useEvents";
import { useRecentPosts } from "@/hooks/useBlogPosts";
import { useFAQs } from "@/hooks/useFAQ";

export default function Home() {
  // Use custom hooks for data fetching
  const { projects: featuredProjects, loading: featuredLoading } = useFeaturedProjects(6);
  const { projects: seekingContributors, loading: seekingLoading } = useProjectsSeekingContributors(4);
  const { ideas: upcomingIdeas, loading: ideasLoading } = useUpcomingIdeas(4);
  const { ideas: seekingIdeas, loading: seekingIdeasLoading } = useIdeasSeekingCollaborators(4);
  const { events: upcomingEvents, loading: eventsLoading } = useUpcomingEvents(3);
  const { posts: recentPosts, loading: postsLoading } = useRecentPosts(3);
  const { faqs: featuredFAQs, loading: faqsLoading } = useFAQs({ featured: true, limit: 4 });

  // Section header component for consistency
  const SectionHeader = ({ icon: Icon, title, command, description }: any) => (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-green-primary/10 border border-green-primary/20">
          <Icon className="h-5 w-5 text-green-primary" />
        </div>
        <div>
          <h2 className="font-mono text-2xl font-bold text-text-primary">
            {title}
          </h2>
          <p className="font-mono text-sm text-green-primary">
            <CommandPrefix /> {command}
          </p>
        </div>
      </div>
      <p className="text-text-secondary max-w-2xl">
        {description}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <MatrixRain opacity={0.02} density={0.1} />
        
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/50 to-bg-primary" />
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-green-primary/5 to-transparent" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff4110_1px,transparent_1px),linear-gradient(to_bottom,#00ff4110_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <ScrollReveal>
              <div className="space-y-8">
                {/* Status badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-primary/5 border border-green-primary/20 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-primary" />
                  </span>
                  <span className="font-mono text-xs text-green-primary">Available for opportunities</span>
                  <span className="w-1 h-1 rounded-full bg-green-primary/30" />
                  <span className="font-mono text-xs text-text-dim">Nairobi, KE</span>
                </div>

                {/* Title */}
                <div>
                  <h1 className="font-mono text-5xl lg:text-7xl font-bold tracking-tight">
                    <span className="text-text-primary">Stephen Muli</span>
                    <br />
                    <span className="text-green-primary">Musyoki</span>
                  </h1>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="font-mono text-sm px-3 py-1 bg-bg-card rounded-full border border-border-default">
                      &lt;full-stack_dev /&gt;
                    </span>
                    <span className="font-mono text-sm px-3 py-1 bg-bg-card rounded-full border border-border-default">
                      3+ years
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
                  I build <span className="text-green-primary font-medium">production-ready web applications</span> that solve real problems. 
                  Currently focused on <span className="text-amber">fintech, ISP tools, and developer platforms</span>.
                </p>

                {/* CTA Buttons */}
                <div className="flex items-center gap-4">
                  <a href="/resume.pdf" download>
                    <Button variant="primary" className="group">
                      <Download className="mr-2 h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
                      Download Resume
                    </Button>
                  </a>
                  <a href="#contact">
                    <Button variant="secondary" className="group border-2">
                      Contact Me
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  <a href="https://github.com/stephenmuli" target="_blank" rel="noopener noreferrer"
                     className="p-3 rounded-lg border border-border-default hover:border-green-primary/30 hover:bg-green-primary/5 transition-all">
                    <Github className="h-5 w-5 text-text-dim hover:text-green-primary" />
                  </a>
                  <a href="https://linkedin.com/in/stephenmuli" target="_blank" rel="noopener noreferrer"
                     className="p-3 rounded-lg border border-border-default hover:border-green-primary/30 hover:bg-green-primary/5 transition-all">
                    <Linkedin className="h-5 w-5 text-text-dim hover:text-green-primary" />
                  </a>
                  <a href="mailto:stephen@example.com"
                     className="p-3 rounded-lg border border-border-default hover:border-green-primary/30 hover:bg-green-primary/5 transition-all">
                    <Mail className="h-5 w-5 text-text-dim hover:text-green-primary" />
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Terminal */}
            <ScrollReveal delay={200} className="hidden lg:block">
              <HeroTerminal />
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <a href="#projects" className="flex flex-col items-center gap-2 text-text-dim/50 hover:text-green-primary transition-colors group">
            <span className="font-mono text-xs uppercase tracking-wider">Scroll</span>
            <div className="relative">
              <div className="h-12 w-px bg-gradient-to-b from-green-primary/30 to-transparent" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-primary/50 group-hover:bg-green-primary animate-bounce" />
            </div>
          </a>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="border-y border-border-default bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <StatsBar />
        </div>
      </section>

      {/* ─── Featured Projects ─── */}
      <section id="projects" className="max-w-7xl mx-auto px-4 py-24">
        <SectionHeader
          icon={Briefcase}
          title="Featured Projects"
          command="ls projects/ --featured"
          description="A selection of my best work — real applications I've built and shipped to production."
        />

        {featuredLoading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <ScrollReveal stagger={150} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ScrollReveal>
        )}

        <div className="text-center mt-12">
          <Link href="/projects">
            <Button variant="secondary" className="group">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <Testimonials />

      {/* ─── Project Ideas ─── */}
      <section className="border-y border-border-default bg-bg-secondary/50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            icon={Lightbulb}
            title="Project Ideas"
            command="ls ideas/ --upcoming"
            description="Fresh concepts I'm exploring — open to collaboration and feedback."
          />

          {ideasLoading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : (
            <ScrollReveal stagger={150} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {upcomingIdeas.map((idea) => (
                <IdeaCard key={idea.id} project={idea} />
              ))}
            </ScrollReveal>
          )}

          <div className="text-center mt-12">
            <Link href="/ideas">
              <Button variant="secondary" className="group">
                Explore All Ideas
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Upcoming Events ─── */}
      {upcomingEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-24">
          <SectionHeader
            icon={Calendar}
            title="Upcoming Events"
            command="calendar --upcoming"
            description="Join me at these upcoming events and connect with the community."
          />

          {eventsLoading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : (
            <ScrollReveal stagger={150} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </ScrollReveal>
          )}

          <div className="text-center mt-12">
            <Link href="/events">
              <Button variant="secondary" className="group">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* ─── Recent Blog Posts ─── */}
      {recentPosts.length > 0 && (
        <section className="border-y border-border-default bg-bg-secondary/50 py-24">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeader
              icon={Newspaper}
              title="Latest Writing"
              command="tail blog/ -n 3"
              description="Thoughts, tutorials, and insights on software development."
            />

            {postsLoading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : (
              <ScrollReveal stagger={150} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recentPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </ScrollReveal>
            )}

            <div className="text-center mt-12">
              <Link href="/blog">
                <Button variant="secondary" className="group">
                  Read All Posts
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── Ideas Seeking Collaborators ─── */}
      {seekingIdeas.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-24">
          <SectionHeader
            icon={Sparkles}
            title="Collaboration Opportunities"
            command="grep -r 'help wanted' ideas/"
            description="Project ideas that are actively looking for contributors."
          />

          {seekingIdeasLoading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : (
            <ScrollReveal stagger={150} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {seekingIdeas.map((idea) => (
                <IdeaCard key={idea.id} project={idea} variant="compact" />
              ))}
            </ScrollReveal>
          )}
        </section>
      )}

      {/* ─── Projects Seeking Contributors ─── */}
      {seekingContributors.length > 0 && (
        <section className="border-y border-border-default bg-bg-secondary/50 py-24">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeader
              icon={Sparkles}
              title="Open Source Contributions"
              command="grep -r 'help wanted' projects/"
              description="Active projects that welcome contributors."
            />

            {seekingLoading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : (
              <ScrollReveal stagger={150} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {seekingContributors.map((project) => (
                  <ProjectCard key={project.id} project={project} variant="compact" />
                ))}
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      {/* ─── Featured FAQs ─── */}
      {featuredFAQs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-24">
          <SectionHeader
            icon={HelpCircle}
            title="Frequently Asked Questions"
            command="cat FAQ.md --featured"
            description="Common questions about my work, process, and collaboration."
          />

          {faqsLoading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : (
            <ScrollReveal stagger={150} className="grid gap-6 md:grid-cols-2">
              {featuredFAQs.map((faq) => (
                <FAQCard key={faq.id} faq={faq} />
              ))}
            </ScrollReveal>
          )}

          <div className="text-center mt-12">
            <Link href="/faq">
              <Button variant="secondary" className="group">
                View All FAQs
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>
      )}
      <ScrollReveal>
        <ContactForm 
          email="info@ascorpi.cloud"
          github="ascorpi"
          linkedin="stephenmuli"
          location="Mombasa, Kenya"
        />
      </ScrollReveal>

    </div>
  );  
}