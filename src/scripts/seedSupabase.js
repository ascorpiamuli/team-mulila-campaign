const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Import the data - we need to copy it from the TypeScript file
// For now, I'll include a simplified version. You can copy the full data from your TS file.

const projectIdeas = [
  {
    id: "1",
    slug: "kenya-social",
    title: "Kenya Social",
    description: "A homegrown social media platform built exclusively for Kenyans to connect, share, and communicate.",
    fullDescription: "Kenya Social is a dedicated social media platform designed specifically for the Kenyan community. It provides a space for Kenyans to connect, share updates, discuss local issues, promote businesses, and celebrate culture without relying on foreign platforms. Features include posts, stories, groups, marketplace, and local news aggregation.",
    problem: "Kenyans are heavily dependent on foreign social media platforms like Facebook, Twitter, and Instagram where content is often irrelevant to local context, data is stored abroad, and there's no sense of community ownership.",
    solution: "A locally-owned platform that understands Kenyan culture, prioritizes local content, keeps data within the country, and fosters genuine community connections.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Redis", "WebSockets", "Tailwind CSS", "NextAuth", "Docker", "AWS"],
    complexity: "advanced",
    status: "planning",
    seekingCollaborators: true,
    estimatedTimeline: "8 months",
    category: "social",
    motivation: "I believe Kenyans deserve a digital space that truly belongs to them, where our stories, conversations, and data remain under our control.",
    features: [
      "User profiles with verification badges",
      "Posts with images, videos, and text",
      "Stories that disappear after 24 hours",
      "Private and public groups",
      "Local marketplace for buying/selling",
      "Events creation and discovery",
      "Local news aggregation",
      "Real-time messaging",
      "Content in English and Swahili",
      "Data centers in Kenya"
    ],
    collaboratorsNeeded: ["Senior React/Next.js developer", "Mobile developer (React Native)", "DevOps engineer", "UI/UX designer", "Community manager"],
    githubUrl: "https://github.com/stephenmuli/kenya-social",
    discussionUrl: "https://github.com/stephenmuli/kenya-social/discussions",
    dockerImages: ["stephenmuli/kenya-social-api:latest", "stephenmuli/kenya-social-web:latest"],
    architecture: "Microservices architecture with separate services for auth, posts, messaging, and marketplace. Redis for real-time features.",
    priority: "high",
    dateAdded: "2024-03-01"
  },
  {
    id: "2",
    slug: "isp-billing-system",
    title: "ISP Billing Engine",
    description: "Comprehensive billing and management system for ISPs with MikroTik and Ruijie integration via custom APIs.",
    fullDescription: "ISP Billing Engine is a powerful solution for Internet Service Providers to manage customers, automate billing, and control network access. It integrates directly with MikroTik RouterOS and Ruijie devices through custom APIs, enabling automatic bandwidth management, quota enforcement, and payment synchronization. Development has started with core billing features.",
    problem: "ISPs in Kenya struggle with manual customer management, billing errors, and complex network device configurations. Existing solutions are either too expensive or don't integrate well with local payment methods.",
    solution: "A cost-effective billing system with deep integration with MikroTik and Ruijie devices, supporting M-Pesa payments and automated provisioning.",
    technologies: ["Python", "FastAPI", "Celery", "Redis", "PostgreSQL", "MikroTik API", "Ruijie API", "React", "Docker", "M-Pesa API"],
    complexity: "advanced",
    status: "started",
    seekingCollaborators: true,
    estimatedTimeline: "6 months remaining",
    category: "isp",
    motivation: "Local ISPs in my area have told me about the challenges of managing customers and devices. An integrated solution would transform their operations.",
    features: [
      "Customer management and CRM",
      "Automated billing and invoicing",
      "M-Pesa payment integration",
      "Bandwidth management via MikroTik API",
      "Ruijie device integration",
      "Quota management and enforcement",
      "Network usage monitoring",
      "Automated account suspension/reconnection",
      "Customer portal for self-service",
      "Detailed analytics and reports"
    ],
    collaboratorsNeeded: ["Python backend developer", "Network engineer with MikroTik experience", "Frontend developer", "DevOps engineer"],
    githubUrl: "https://github.com/stephenmuli/isp-billing",
    discussionUrl: "https://github.com/stephenmuli/isp-billing/discussions",
    dockerImages: ["stephenmuli/isp-api:latest", "stephenmuli/isp-worker:latest", "stephenmuli/isp-web:latest"],
    architecture: "Event-driven architecture with Celery workers. Separate containers for API, workers, and web interface. MikroTik API integration layer completed.",
    priority: "high",
    dateAdded: "2024-02-20"
  },
  {
    id: "3",
    slug: "smart-scheduler",
    title: "Smart Meeting Scheduler",
    description: "Intelligent scheduling system for booking meetings, managing availability, and optimizing time slots across teams.",
    fullDescription: "Smart Scheduler is an AI-powered meeting coordination tool that eliminates the back-and-forth of finding meeting times. It integrates with Google Calendar, Outlook, and other calendar services to find optimal meeting times, send invitations, and manage room bookings. The core scheduling engine is complete with just final UI polish and testing remaining.",
    problem: "Professionals waste hours coordinating meeting times across different time zones and calendars. The email ping-pong for scheduling is inefficient and frustrating.",
    solution: "An intelligent scheduler that automatically finds optimal meeting times based on participants' availability, preferences, and meeting requirements.",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Google Calendar API", "Microsoft Graph API", "WebSockets", "Docker"],
    complexity: "intermediate",
    status: "almost-complete",
    seekingCollaborators: false,
    estimatedTimeline: "2 weeks remaining",
    category: "scheduling",
    motivation: "As a freelancer, I waste at least 2 hours every week just scheduling meetings. This tool would give that time back.",
    features: [
      "Multi-calendar integration (Google, Outlook, Apple)",
      "Intelligent time slot suggestions",
      "Meeting poll creation",
      "Room/resource booking",
      "Time zone intelligence",
      "Recurring meeting optimization",
      "Conflict resolution",
      "Calendar analytics",
      "Meeting reminders",
      "API for third-party integration"
    ],
    collaboratorsNeeded: [],
    githubUrl: "https://github.com/stephenmuli/smart-scheduler",
    discussionUrl: "https://github.com/stephenmuli/smart-scheduler/discussions",
    dockerImages: ["stephenmuli/scheduler-api:latest", "stephenmuli/scheduler-web:latest"],
    architecture: "Microservices with Redis for session management and job queues. Core scheduling algorithm completed.",
    priority: "medium",
    dateAdded: "2024-02-25"
  }
  // Add projects 4, 5, 6 here following the same pattern
];

// Transform function
function transformIdeaForDb(idea) {
  return {
    id: idea.id,
    slug: idea.slug,
    title: idea.title,
    description: idea.description,
    full_description: idea.fullDescription || null,
    problem: idea.problem,
    solution: idea.solution,
    technologies: idea.technologies,
    complexity: idea.complexity,
    status: idea.status,
    seeking_collaborators: idea.seekingCollaborators,
    estimated_timeline: idea.estimatedTimeline || null,
    category: idea.category,
    motivation: idea.motivation || null,
    challenges: idea.challenges || [],
    features: idea.features || [],
    discussion_url: idea.discussionUrl || null,
    github_url: idea.githubUrl || null,
    collaborators_needed: idea.collaboratorsNeeded || [],
    inspiration: idea.inspiration || null,
    priority: idea.priority,
    date_added: idea.dateAdded,
    docker_images: idea.dockerImages || [],
    architecture: idea.architecture || null
  };
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedDatabase() {
  console.log('🚀 Starting to seed database...');
  
  const transformedIdeas = projectIdeas.map(transformIdeaForDb);
  
  for (const idea of transformedIdeas) {
    const { data, error } = await supabase
      .from('project_ideas')
      .upsert(idea, { onConflict: 'id' });
    
    if (error) {
      console.error(`❌ Error seeding ${idea.title}:`, error);
    } else {
      console.log(`✅ Seeded: ${idea.title}`);
    }
  }
  
  console.log('✨ Seeding complete!');
}

seedDatabase().catch(console.error);
