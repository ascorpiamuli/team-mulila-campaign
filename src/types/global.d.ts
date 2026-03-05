// types/global.d.ts
// Global type declarations - NO IMPORT NEEDED, available everywhere automatically

// ============================================
// PROJECT TYPES
// ============================================

// Project Status Types
type ProjectStatus = "live" | "in-production" | "in-development" | "completed" | null;
type ProjectIdeaStatus = "planning" | "in-progress" | "seeking-collaborators" | "on-hold" | "almost-complete" | "started";
type Priority = "low" | "medium" | "high";
type Complexity = "beginner" | "intermediate" | "advanced";

// Project from projects table (built projects)
interface Project {
  id: string;
  name: string;
  builder: string;
  description: string;
  full_description?: string;
  stack: string[];
  status: ProjectStatus;
  demo_url?: string;
  repo_url?: string;
  is_featured: boolean;
  client?: string;
  year?: number;
  highlights?: string[];
  is_open_source?: boolean;
  seeking_contributors?: boolean;
  created_at?: string;
  updated_at?: string;
}

// ProjectIdea from project_ideas table (ideas/brainstorming)
interface ProjectIdea {
  id: string;
  slug: string;
  title: string;
  description: string;
  full_description?: string;
  problem: string;
  solution: string;
  technologies: string[];
  complexity: Complexity;
  status: ProjectIdeaStatus;
  seeking_collaborators: boolean;
  estimated_timeline?: string;
  category: string;
  motivation?: string;
  features?: string[];
  github_url?: string;
  discussion_url?: string;
  collaborators_needed?: string[];
  priority: Priority;
  date_added: string;
  docker_images?: string[];
  architecture?: string;
  created_at?: string;
  updated_at?: string;
}

// ============================================
// EVENT TYPES
// ============================================

type EventStatus = "upcoming" | "ongoing" | "completed" | "cancelled" | "postponed";
type EventType = "workshop" | "webinar" | "meetup" | "conference" | "hackathon" | "training" | "seminar" | "panel_discussion" | "networking" | "other";

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  full_description?: string;
  event_type: EventType;
  status: EventStatus;
  start_date: string;
  end_date: string;
  timezone?: string;
  is_virtual: boolean;
  venue_name?: string;
  venue_address?: string;
  venue_city?: string;
  venue_country?: string;
  online_platform?: string;
  meeting_link?: string;
  organizer_name: string;
  organizer_email?: string;
  speakers?: Speaker[];
  max_attendees?: number;
  current_attendees?: number;
  tags?: string[];
  is_featured: boolean;
  requires_registration: boolean;
  registration_url?: string;
  created_at: string;
  updated_at: string;
}

interface Speaker {
  name: string;
  title?: string;
  bio?: string;
  photo?: string;
}

// ============================================
// BLOG POST TYPES
// ============================================

type BlogStatus = "draft" | "published" | "archived" | "under_review";

// types/global.d.ts - Update the BlogPost interface
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author_id?: string;
  author_name: string;
  author_bio?: string;
  author_avatar?: string;
  category?: string;
  tags?: string[];
  status: BlogStatus;
  is_featured?: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  featured_image?: string;
  thumbnail_url?: string;
  views_count?: number;
  likes_count?: number;
  reading_time_minutes?: number;
  // Add this:
  author?: {
    name: string;
    avatar_url?: string;
  };
}

// ============================================
// TEAM MEMBER TYPES
// ============================================

type TeamRole = "founder" | "lead" | "senior" | "junior" | "contributor" | "mentor" | "advisor" | "community_manager";

interface TeamMember {
  id: string;
  name: string;
  slug: string;
  role: TeamRole;
  title: string;
  bio?: string;
  email?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  avatar_url?: string;
  skills?: string[];
  is_core: boolean;
  is_lead: boolean;
  is_mentor: boolean;
  location?: string;
  display_order: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================
// FAQ TYPES
// ============================================

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  tags?: string[];
  is_featured: boolean;
  display_order: number;
  views_count: number;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

// ============================================
// RESOURCE TYPES
// ============================================

type ResourceType = "article" | "tutorial" | "video" | "ebook" | "case_study" | "template" | "tool" | "code_snippet" | "documentation" | "cheat_sheet" | "course" | "guide";
type SkillLevel = "beginner" | "intermediate" | "advanced" | "all";

interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string;
  resource_type: ResourceType;
  category?: string;
  tags?: string[];
  skill_level?: SkillLevel;
  author_name?: string;
  external_url?: string;
  file_url?: string;
  thumbnail_url?: string;
  duration_minutes?: number;
  is_featured: boolean;
  views_count: number;
  downloads_count: number;
  created_at: string;
  updated_at: string;
}



interface FAQCardProps {
  faq: FAQ;  // FAQ is globally available from your global.d.ts
  variant?: "default" | "compact" | "featured";
}

// ============================================
// HOOK RETURN TYPES
// ============================================

interface HookReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

interface SingleHookReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// ============================================
// UTILITY TYPES
// ============================================

type WithClassName<T = {}> = T & { className?: string };
type WithVariant<T = {}> = T & { variant?: "default" | "compact" | "featured" };
type WithChildren<T = {}> = T & { children?: React.ReactNode };


