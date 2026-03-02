// data/projects.ts
export interface Project {
  id: string;
  name: string;
  builder: string;
  description: string;
  fullDescription?: string;
  stack: string[];
  status: "live" | "in-production" | "in-development" | "completed" | null;
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  client?: string;
  year?: number;
  highlights?: string[];
}

export const projects: Project[] = [
  {
    id: "procuremaster",
    name: "ProcureMaster - Requisition System",
    builder: "Stephen Muli",
    description: "A comprehensive procurement and requisition management system built with PHP CodeIgniter. Streamlines purchase requests, approvals, vendor management, and inventory tracking for organizations.",
    fullDescription: "ProcureMaster is an enterprise-grade requisition system that digitizes the entire procurement workflow. Features include multi-level approval chains, budget tracking, vendor management, purchase order generation, and real-time inventory updates. Built for organizations looking to eliminate paper-based processes and gain visibility into spending.",
    stack: ["PHP", "CodeIgniter 4", "MySQL", "Bootstrap 5", "jQuery", "TCPDF", "PHPMailer"],
    status: "live",
    repoUrl: "https://github.com/stephenmuli/procuremaster",
    demoUrl: "https://procuremaster.demo.ke",
    featured: true,
    client: "Multiple Enterprises",
    year: 2023,
    highlights: [
      "Multi-company support",
      "Automated approval workflows",
      "Budget vs actual tracking",
      "Vendor rating system",
      "PDF report generation"
    ]
  },
  {
    id: "ecclesia-cms",
    name: "Ecclesia Church Management System",
    builder: "Stephen Muli",
    description: "Complete church management solution handling member registration, tithes and offerings, small groups, event management, and communication. Empowers churches to manage their community effectively.",
    fullDescription: "Ecclesia CMS is a tailored solution for churches of all sizes. It manages member databases, tracks contributions, handles small group assignments, schedules events, and facilitates communication. Includes role-based access for pastors, administrators, and group leaders.",
    stack: ["PHP", "CodeIgniter 4", "MySQL", "Tailwind CSS", "Alpine.js", "Chart.js", "Twilio API"],
    status: "live",
    repoUrl: "https://github.com/stephenmuli/ecclesia-cms",
    demoUrl: "https://ecclesia.demo.ke",
    featured: true,
    client: "Multiple Churches",
    year: 2023,
    highlights: [
      "Member directory with groups",
      "Tithe and offering tracking",
      "SMS/Email broadcast",
      "Event management",
      "Attendance tracking",
      "Financial reports"
    ]
  },
  {
    id: "mailu-enterprise",
    name: "Mailu Enterprise Mail System",
    builder: "Stephen Muli",
    description: "Complete email infrastructure solution using Mailu - a Docker-based mail server suite. Deployed and configured for businesses requiring self-hosted, secure email with webmail, spam filtering, and admin controls.",
    fullDescription: "A fully configured email infrastructure built on Mailu, providing organizations with complete control over their email. Includes webmail interface (Roundcube), spam filtering (Rspamd), antivirus (ClamAV), and comprehensive admin controls. Deployed with Docker for scalability and easy maintenance.",
    stack: ["Mailu", "Docker", "Docker Compose", "PostgreSQL", "Redis", "Nginx", "Let's Encrypt SSL"],
    status: "live",
    repoUrl: "https://github.com/stephenmuli/mailu-enterprise",
    demoUrl: "https://mail.enterprise.co.ke",
    featured: true,
    client: "Multiple Businesses",
    year: 2024,
    highlights: [
      "Complete email server in Docker",
      "Webmail interface (Roundcube)",
      "Spam & virus filtering",
      "Custom domains",
      "Admin management UI",
      "Mobile device sync"
    ]
  },
  {
    id: "your-project",
    name: "Your Project Here",
    builder: "You?",
    description: "Built something with modern tech? I'd love to feature it! Share your project and inspire other developers. Every project, big or small, matters.",
    stack: ["Your Stack Here"],
    status: null,
    featured: false
  }
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}