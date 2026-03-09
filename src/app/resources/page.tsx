// app/resources/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from 'next/headers';
import {
  Rocket,
  Terminal,
  GitBranch,
  Link as LinkIcon,
  GraduationCap,
  Code2,
  Zap,
  Wifi,
  Network,
  Calendar,
  Mail,
  Phone,
  BookOpen,
  Settings,
  Database,
  Globe,
  Lock,
  Server,
  Cpu,
  HardDrive,
  Shield,
  Layers,
  Radio,
  WifiOff,
  Router,
  FileText,
  Youtube,
  BookMarked,
  HelpCircle
} from "lucide-react";
import { ScrollReveal, CommandPrefix } from "@/components/terminal";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import Image from 'next/image';
import { supabase } from '../../../lib/supabase/client';

export const metadata: Metadata = {
  title: "Resources | Stephen Muli Musyoki",
  description:
    "Technical guides and resources for MikroTik configuration, networking fundamentals, scheduling systems, Mailu email hosting, and M-Pesa integration.",
  alternates: {
    canonical: "https://stephenmuli.dev/resources",
  },
  openGraph: {
    title: "Resources | Stephen Muli Musyoki",
    description:
      "Technical guides and resources for MikroTik configuration, networking fundamentals, scheduling systems, Mailu email hosting, and M-Pesa integration.",
    url: "https://stephenmuli.dev/resources",
    siteName: "Stephen Muli Musyoki",
    type: "website",
  },
};

// Icon mapping object
const iconMap: { [key: string]: any } = {
  Router,
  Terminal,
  Layers,
  Wifi,
  Network,
  GitBranch,
  Radio,
  Calendar,
  Phone,
  Server,
  Code2,
  Globe,
  Mail,
  FileText,
  BookMarked,
  HelpCircle,
  GraduationCap,
  BookOpen,
  // Add more icon mappings as needed
};

// Helper function to get icon component
function getIcon(iconName: string) {
  return iconMap[iconName] || BookOpen; // Default fallback
}

async function getResourcesData() {
  // Fetch categories with their resources
  const { data: categories, error } = await supabase
    .from('categories')
    .select(`
      *,
      resources:resources(*)
    `)
    .eq('resources.is_published', true)
    .order('display_order', { ascending: true })
    .order('display_order', { foreignTable: 'resources', ascending: true });

  if (error) {
    console.error('Error fetching resources:', error);
    return [];
  }

  return (categories as Category[]) || [];
}

export default async function ResourcesPage() {
  const categories = await getResourcesData();

  // Calculate total resources
  const totalResources = categories.reduce(
    (acc: number, cat: Category) => acc + (cat.resources?.length || 0),
    0
  );

  return (
    <main className="min-h-screen bg-bg-primary">
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Resources" }]} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff4110_1px,transparent_1px),linear-gradient(to_bottom,#00ff4110_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-primary/10 border border-green-primary/20 mb-6 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-primary" />
                </span>
                <BookOpen className="h-4 w-4 text-green-primary" />
                <span className="font-mono text-xs text-green-primary">Developer Resources</span>
              </div>

              <h1 className="mb-4 font-mono text-5xl md:text-6xl font-bold tracking-tight">
                <span className="text-text-primary">Technical</span>
                <br />
                <span className="text-green-primary">Resources & Guides</span>
              </h1>

              <p className="max-w-2xl text-lg text-text-secondary leading-relaxed mb-8">
                Comprehensive guides for MikroTik configuration, networking fundamentals,
                scheduling systems, Mailu email hosting, and M-Pesa integration.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-text-dim">
                  <BookMarked className="h-4 w-4" />
                  <span className="font-mono text-sm">{totalResources} resources</span>
                </div>
                <div className="w-px h-4 bg-border-default" />
                <div className="flex items-center gap-2 text-text-dim">
                  <GraduationCap className="h-4 w-4" />
                  <span className="font-mono text-sm">All skill levels</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Categories and Resources */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {categories.map((category: Category, categoryIndex: number) => {
          const CategoryIcon = getIcon(category.icon);

          return (
            <div key={category.id} className="mb-20">
              <ScrollReveal delay={categoryIndex * 100}>
                <div className="flex items-center gap-3 mb-8">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color} border border-green-primary/20`}>
                    <CategoryIcon className="h-6 w-6 text-green-primary" />
                  </div>
                  <div>
                    <h2 className="font-mono text-2xl font-bold text-text-primary">
                      {category.title}
                    </h2>
                    <p className="text-text-dim text-sm max-w-2xl">
                      {category.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.resources?.map((resource: Resource, index: number) => {
                  const ResourceIcon = getIcon(resource.icon || 'BookOpen');
                  return (
                    <ScrollReveal key={resource.id} delay={index * 50}>
                      <Link
                        href={resource.href}
                        className="group block h-full border border-border-default bg-bg-card rounded-xl overflow-hidden hover:border-green-primary/30 transition-all duration-300 hover:-translate-y-1"
                      >
                        {/* Image placeholder */}
                        <div className="relative h-40 bg-gradient-to-br from-green-primary/10 to-bg-secondary overflow-hidden">
                          {resource.image && (
                            <div
                              className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-500"
                              style={{ backgroundImage: `url(${resource.image})` }}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent" />
                          <div className="absolute bottom-3 left-3 flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-bg-card/90 backdrop-blur-sm border border-border-default">
                              <ResourceIcon className="h-4 w-4 text-green-primary" />
                            </div>
                            <div className="flex gap-1">
                              {resource.tags?.slice(0, 2).map((tag: string) => (
                                <span
                                  key={tag}
                                  className="text-[8px] px-2 py-1 bg-bg-card/90 backdrop-blur-sm rounded-full border border-border-default text-text-dim"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="p-5">
                          <h3 className="font-mono text-lg font-bold text-green-primary group-hover:text-amber transition-colors mb-2">
                            {resource.title}
                          </h3>
                          <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                            {resource.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-text-dim">
                              <span className="flex items-center gap-1">
                                <GraduationCap className="h-3 w-3" />
                                {resource.difficulty}
                              </span>
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-3 w-3" />
                                {resource.time || 'N/A'}
                              </span>
                            </div>
                            <span className="text-xs font-mono text-green-primary opacity-0 group-hover:opacity-100 transition-opacity">
                              Read more →
                            </span>
                          </div>
                        </div>
                      </Link>
                    </ScrollReveal>
                  );
                })}
              </div>

              {/* Quick Reference Preview - Only show for first category */}
              {categoryIndex === 0 && category.resources?.[0] && (
                <ScrollReveal delay={300}>
                  <div className="mt-12 p-6 border border-border-default bg-bg-secondary/50 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <HelpCircle className="h-5 w-5 text-green-primary" />
                      <h3 className="font-mono text-lg font-semibold text-text-primary">Quick Reference</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-mono text-sm text-amber mb-2">
                          {category.resources[0].title}
                        </h4>
                        <pre className="text-xs bg-bg-card p-3 rounded-lg border border-border-default overflow-x-auto">
                          <code>{category.resources[0].content?.code || '# No code snippet available'}</code>
                        </pre>
                      </div>
                      {category.resources[1] && (
                        <div>
                          <h4 className="font-mono text-sm text-amber mb-2">
                            {category.resources[1].title}
                          </h4>
                          <div className="text-xs space-y-1 bg-bg-card p-3 rounded-lg border border-border-default">
                            {category.resources[1].content?.steps ? (
                              category.resources[1].content.steps.slice(0, 5).map((step: string, i: number) => (
                                <p key={i}>{i + 1}. {step}</p>
                              ))
                            ) : (
                              <p>Quick reference content available in the full guide</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </div>
          );
        })}

        {/* Show message if no categories found */}
        {categories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-dim">No resources available at the moment.</p>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="border-t border-border-default bg-bg-secondary/50">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <ScrollReveal>
            <h2 className="font-mono text-2xl font-bold text-green-primary mb-4">
              Need Help with Implementation?
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              These guides are based on real projects I've built. If you need assistance
              implementing any of these solutions, I'm available for consulting and development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-green-primary text-green-primary hover:bg-green-primary hover:text-bg-primary transition-all duration-200 rounded-lg font-mono"
              >
                Get in Touch
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border-default text-text-dim hover:text-green-primary hover:border-green-primary/30 transition-all duration-200 rounded-lg font-mono"
              >
                View Related Projects
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
