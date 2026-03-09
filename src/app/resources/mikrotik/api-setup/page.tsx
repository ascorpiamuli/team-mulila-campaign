"use client";
// src/app/resources/mikrotik/api-setup/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import {
  Terminal,
  AlertCircle,
  CheckCircle2,
  Info,
  Wifi,
  Shield,
  Lock,
  Users,
  Settings,
  Globe,
  Server,
  Cpu,
  HardDrive,
  Network,
  Zap,
  Clock,
  BookOpen,
  Code2,
  GitBranch,
  GraduationCap,
  ArrowLeft,
  ChevronRight,
  Home,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Layers,
  Radio,
  WifiOff,
  Router,
  HelpCircle,
  BookMarked,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info as InfoIcon,
  Lightbulb,
  Rocket,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Eye,
  EyeOff,
  Key,
  Fingerprint,
  Database,
  Cloud,
  CloudOff,
  RefreshCw,
  Save,
  Trash2,
  Edit,
  Plus,
  Minus,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  List,
  Menu,
  X,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  StopCircle,
  RotateCw,
  Loader2,
  Award,
  Star,
  Heart,
  Flag,
  MapPin,
  Navigation,
  Compass,
  Gift,
  Coffee,
  Beer,
  Pizza,
  Plane,
  Car,
  Bike,
  Bus,
  Train,
  Ship,
  Rocket as RocketIcon,
  Satellite,
  Telescope,
  Microscope,
  Beaker,
  Dna,
  Atom,
  Brain,
  HeartPulse,
  Bone,
  Eye as EyeIcon,
  Ear,

  Hand,
  Fingerprint as FingerprintIcon,
  Key as KeyIcon,
  Lock as LockIcon,
  Unlock,
  Shield as ShieldIcon,
  Sword,
  ShieldCheck as ShieldCheckIcon,
  ShieldAlert as ShieldAlertIcon,
  ShieldBan,
  ShieldX,
  ShieldPlus,
  ShieldHalf,
  ShieldQuestion as ShieldQuestionIcon,
  ShieldClose,
  ShieldOff,
  Maximize,
  Minimize,
  PanelLeft,
  PanelRight,
  BookText,
  ScrollText,
  ChevronDown,
  ChevronUp,
  Filter as FilterIcon,
  Tag,
  Clock3,
  Calendar,
  CheckSquare,
  Square,
  Radio as RadioIcon,
  Activity,
  Gauge,
  Thermometer,
  HardHat,
  Wrench,
  Brush,
  Palette,
  ZapOff,
  Power,
  PowerOff,
  Volume1,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Headphones,
  Speaker,
  Disc,
  Disc3,
  RadioTower,
  Antenna,
  Signal,
  SignalHigh,
  SignalLow,
  SignalMedium,
  SignalZero,
  WifiHigh,
  WifiLow,
  WifiZero,
  Menu as MenuIcon
} from "lucide-react";
import React, { useState } from 'react';

// Types
interface Section {
  id: string;
  title: string;
  icon: any;
  subsections?: { id: string; title: string; }[];
}

interface Highlight {
  id: string;
  title: string;
  description: string;
  category: 'tip' | 'warning' | 'note' | 'best-practice';
  icon: any;
}

// Navigation Sections
const sections: Section[] = [
  {
    id: "introduction",
    title: "Introduction",
    icon: BookOpen,
    subsections: [
      { id: "overview", title: "Overview" },
      { id: "whats-new", title: "What's New in v7" }
    ]
  },
  {
    id: "prerequisites",
    title: "Prerequisites",
    icon: CheckCircle2,
    subsections: [
      { id: "hardware", title: "Hardware Requirements" },
      { id: "software", title: "Software Requirements" },
      { id: "knowledge", title: "Knowledge Required" },
      { id: "virtual-lab", title: "Virtual Lab Setup" }
    ]
  },
  {
    id: "api-overview",
    title: "API Overview",
    icon: Layers,
    subsections: [
      { id: "api-types", title: "API Types" },
      { id: "comparison", title: "Comparison" },
      { id: "choosing", title: "Choosing the Right API" }
    ]
  },
  {
    id: "enabling-api",
    title: "Enabling API",
    icon: Power,
    subsections: [
      { id: "enable-services", title: "Enable Services" },
      { id: "configure-services", title: "Configure Services" },
      { id: "verify", title: "Verification" }
    ]
  },
  {
    id: "ssl-configuration",
    title: "SSL/TLS Setup",
    icon: Lock,
    subsections: [
      { id: "generate-cert", title: "Generate Certificate" },
      { id: "apply-cert", title: "Apply Certificate" },
      { id: "ciphers", title: "Cipher Configuration" }
    ]
  },
  {
    id: "user-management",
    title: "User Management",
    icon: Users,
    subsections: [
      { id: "create-groups", title: "Create Groups" },
      { id: "create-users", title: "Create Users" },
      { id: "configure-access", title: "Configure Access" }
    ]
  },
  {
    id: "authentication",
    title: "Authentication",
    icon: Key,
    subsections: [
      { id: "basic-auth", title: "Basic Auth" },
      { id: "token-auth", title: "Token-Based" },
      { id: "cert-auth", title: "Certificate Auth" },
      { id: "jwt", title: "JWT (v7+)" }
    ]
  },
  {
    id: "security",
    title: "Security Hardening",
    icon: Shield,
    subsections: [
      { id: "firewall-rules", title: "Firewall Rules" },
      { id: "ip-restrictions", title: "IP Restrictions" },
      { id: "rate-limiting", title: "Rate Limiting" },
      { id: "audit-logging", title: "Audit Logging" }
    ]
  },
  {
    id: "api-clients",
    title: "API Clients",
    icon: Code2,
    subsections: [
      { id: "python", title: "Python" },
      { id: "nodejs", title: "Node.js" },
      { id: "php", title: "PHP" },
      { id: "bash", title: "Bash/curl" },
      { id: "go", title: "Go" },
      { id: "rust", title: "Rust" }
    ]
  },
  {
    id: "api-endpoints",
    title: "API Endpoints",
    icon: RadioTower,
    subsections: [
      { id: "system", title: "System" },
      { id: "interfaces", title: "Interfaces" },
      { id: "ip", title: "IP" },
      { id: "routing", title: "Routing" },
      { id: "firewall", title: "Firewall" },
      { id: "queue", title: "Queue" },
      { id: "dhcp", title: "DHCP" },
      { id: "wireless", title: "Wireless" },
      { id: "ppp", title: "PPP" }
    ]
  },
  {
    id: "advanced",
    title: "Advanced Topics",
    icon: Rocket,
    subsections: [
      { id: "webhooks", title: "Webhooks" },
      { id: "monitoring", title: "Monitoring" },
      { id: "automation", title: "Automation" },
      { id: "backup", title: "Backup/Restore" },
      { id: "high-availability", title: "High Availability" },
      { id: "load-balancing", title: "Load Balancing" }
    ]
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: Wrench,
    subsections: [
      { id: "error-codes", title: "Error Codes" },
      { id: "debugging", title: "Debugging" },
      { id: "performance", title: "Performance" },
      { id: "common-issues", title: "Common Issues" }
    ]
  },
  {
    id: "best-practices",
    title: "Best Practices",
    icon: Award,
    subsections: [
      { id: "security-checklist", title: "Security Checklist" },
      { id: "monitoring-setup", title: "Monitoring Setup" },
      { id: "backup-strategy", title: "Backup Strategy" },
      { id: "performance-tuning", title: "Performance Tuning" }
    ]
  },
  {
    id: "examples",
    title: "Real-World Examples",
    icon: GitBranch,
    subsections: [
      { id: "bandwidth-monitor", title: "Bandwidth Monitor" },
      { id: "auto-backup", title: "Auto Backup" },
      { id: "user-manager", title: "User Manager" },
      { id: "dashboard", title: "Dashboard" },
      { id: "failover", title: "Failover Setup" }
    ]
  },
  {
    id: "resources",
    title: "Resources",
    icon: Database,
    subsections: [
      { id: "official-docs", title: "Official Docs" },
      { id: "community", title: "Community" },
      { id: "tools", title: "Tools" },
      { id: "books", title: "Books" }
    ]
  },
  {
    id: "conclusion",
    title: "Conclusion",
    icon: Flag,
    subsections: [
      { id: "summary", title: "Summary" },
      { id: "next-steps", title: "Next Steps" }
    ]
  }
];

// Highlights for right panel
const highlights: Highlight[] = [
  {
    id: "virtual-lab",
    title: "💻 No Hardware? No Problem!",
    description: "Download MikroTik CHR VMDK and run a virtual router in VirtualBox, VMware, or Hyper-V for testing.",
    category: "tip",
    icon: Server
  },
  {
    id: "security-first",
    title: "🔒 Security First",
    description: "Never expose API directly to internet. Always use VPN, SSL/TLS, and IP restrictions.",
    category: "warning",
    icon: ShieldAlert
  },
  {
    id: "routeros-v7",
    title: "✨ RouterOS v7 Features",
    description: "Native REST API, JWT authentication, WebSocket support, and improved performance.",
    category: "note",
    icon: Sparkles
  },
  {
    id: "best-practice",
    title: "🎯 Principle of Least Privilege",
    description: "Create dedicated API users with minimal required permissions only.",
    category: "best-practice",
    icon: ShieldCheck
  },
  {
    id: "connection-pooling",
    title: "🔄 Connection Pooling",
    description: "Use connection pooling for production apps to improve performance and resource usage.",
    category: "tip",
    icon: Database
  },
  {
    id: "rate-limiting",
    title: "⏱️ Rate Limiting",
    description: "Implement rate limiting to prevent API abuse and ensure fair usage.",
    category: "best-practice",
    icon: Gauge
  },
  {
    id: "error-handling",
    title: "🛡️ Robust Error Handling",
    description: "Always implement retry logic with exponential backoff for production systems.",
    category: "tip",
    icon: AlertCircle
  },
  {
    id: "monitoring",
    title: "📊 Proactive Monitoring",
    description: "Set up alerts for CPU > 80%, memory > 85%, and interface errors.",
    category: "best-practice",
    icon: Activity
  },
  {
    id: "backup",
    title: "💾 Automated Backups",
    description: "Schedule daily backups and store them in multiple locations (local + cloud).",
    category: "tip",
    icon: Save
  },
  {
    id: "encryption",
    title: "🔐 Encrypt Everything",
    description: "Use API-SSL with strong ciphers and enable certificate verification.",
    category: "warning",
    icon: Lock
  },
  {
    id: "audit-logs",
    title: "📝 Audit Logs",
    description: "Enable detailed logging for all API activities and review logs weekly.",
    category: "best-practice",
    icon: ScrollText
  },
  {
    id: "testing",
    title: "🧪 Test in Lab First",
    description: "Always test API scripts in a virtual lab before production deployment.",
    category: "tip",
    icon: Beaker
  }
];

// Custom components with copy functionality
const CodeBlock = ({ code, language = 'bash', title }: { code: string; language?: string; title?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border border-gray-700 rounded-t-lg">
          <span className="text-xs font-mono text-gray-400">{title}</span>
          <button
            onClick={handleCopy}
            className="p-1 hover:bg-green-500/10 rounded transition-colors flex items-center gap-1"
          >
            {copied ? (
              <>
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-400">Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      <pre className={`bg-gray-900 p-4 rounded-lg border border-gray-800 overflow-x-auto text-sm font-mono ${!title ? 'rounded-t-lg' : 'rounded-b-lg'}`}>
        <code className={`language-${language} text-gray-300`}>{code}</code>
      </pre>
    </div>
  );
};

const Callout = ({ type, title, children }: { type: 'info' | 'warning' | 'success' | 'error' | 'tip'; title?: string; children: React.ReactNode }) => {
  const styles = {
    info: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: Info, text: 'text-blue-400' },
    warning: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: AlertTriangle, text: 'text-yellow-400' },
    success: { bg: 'bg-green-500/10', border: 'border-green-500/20', icon: CheckCircle, text: 'text-green-400' },
    error: { bg: 'bg-red-500/10', border: 'border-red-500/20', icon: XCircle, text: 'text-red-400' },
    tip: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: Lightbulb, text: 'text-purple-400' },
  };
  const { bg, border, icon: Icon, text } = styles[type];

  return (
    <div className={`flex gap-3 p-4 rounded-lg ${bg} border ${border} my-6`}>
      <Icon className={`h-5 w-5 flex-shrink-0 ${text}`} />
      <div className="flex-1">
        {title && <h4 className={`font-mono text-sm font-semibold ${text} mb-1`}>{title}</h4>}
        <div className="text-gray-300 text-sm">{children}</div>
      </div>
    </div>
  );
};

const Step = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4 my-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
      <span className="text-sm font-mono text-green-500">{number}</span>
    </div>
    <div className="flex-1">
      <h3 className="font-mono text-lg font-semibold text-green-500 mb-2">{title}</h3>
      <div className="text-gray-300">{children}</div>
    </div>
  </div>
);

const Tabs = ({ children }: { children: React.ReactNode[] }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="my-6">
      <div className="flex gap-1 border-b border-gray-800">
        {React.Children.map(children, (child, index) => (
          <button
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-mono transition-colors ${activeTab === index
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-green-500'
              }`}
          >
            {(child as any).props.label || `Tab ${index + 1}`}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
};

const Tab = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>{children}</div>
);

const Table = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto my-6">
    <table className="min-w-full border border-gray-800 rounded-lg">
      <thead>
        <tr className="bg-gray-800/50">
          {headers.map((header, i) => (
            <th key={i} className="px-4 py-3 text-left text-xs font-mono text-green-500 border-b border-gray-800">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-t border-gray-800">
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-3 text-sm text-gray-300">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Card = ({ title, icon: Icon, children }: { title: string; icon?: any; children: React.ReactNode }) => (
  <div className="bg-gray-800/50 border border-gray-800 rounded-lg p-6 my-4">
    <div className="flex items-center gap-3 mb-4">
      {Icon && <Icon className="h-5 w-5 text-green-500" />}
      <h3 className="font-mono text-lg font-semibold text-green-500">{title}</h3>
    </div>
    <div className="text-gray-300">{children}</div>
  </div>
);

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
    {children}
  </div>
);

const HighlightCard = ({ highlight }: { highlight: Highlight }) => {
  const categoryColors = {
    tip: 'border-purple-500/20 bg-purple-500/5',
    warning: 'border-yellow-500/20 bg-yellow-500/5',
    note: 'border-blue-500/20 bg-blue-500/5',
    'best-practice': 'border-green-500/20 bg-green-500/5'
  };

  return (
    <div className={`p-4 rounded-lg border ${categoryColors[highlight.category]}`}>
      <div className="flex items-start gap-3">
        <highlight.icon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-mono text-sm font-semibold text-gray-200 mb-1">{highlight.title}</h4>
          <p className="text-xs text-gray-400">{highlight.description}</p>
        </div>
      </div>
    </div>
  );
};

const VirtualLabCard = () => (
  <div className="p-6 rounded-lg border border-green-500/20 bg-gradient-to-br from-green-500/10 to-blue-500/10 my-6">
    <div className="flex items-start gap-4">
      <Server className="h-8 w-8 text-green-500" />
      <div>
        <h3 className="font-mono text-lg font-semibold text-green-500 mb-2">No Physical Router? No Problem! 🎯</h3>
        <p className="text-gray-300 mb-4">
          MikroTik offers Cloud Hosted Router (CHR) - a virtual router that runs on:
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-300">VirtualBox</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-300">VMware</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-300">Hyper-V</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-300">KVM</span>
          </div>
        </div>
        <div className="flex gap-3">
          <a
            href="https://mikrotik.com/download"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 hover:bg-green-500/20 transition-colors text-sm"
          >
            <Download className="h-4 w-4" />
            Download CHR VMDK
          </a>
          <a
            href="#virtual-lab-setup"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-lg text-gray-300 hover:text-green-500 transition-colors text-sm"
          >
            <BookOpen className="h-4 w-4" />
            Setup Guide
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default function MikroTikApiSetupPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [expandedSections, setExpandedSections] = useState<string[]>(['introduction', 'prerequisites']);
  const [showHighlights, setShowHighlights] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['tip', 'warning', 'note', 'best-practice']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const filteredHighlights = highlights.filter(h =>
    selectedCategories.includes(h.category) &&
    (searchQuery === '' ||
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      {/* Navigation Bar */}
      <div className="border-b border-gray-800 bg-gray-900/50 sticky top-0 z-20 backdrop-blur-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-400 hover:text-green-500 flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-600" />
              <Link href="/resources" className="text-gray-400 hover:text-green-500 hidden sm:block">
                Resources
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-600 hidden sm:block" />
              <Link href="/resources/mikrotik" className="text-gray-400 hover:text-green-500 hidden sm:block">
                MikroTik
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-600 hidden sm:block" />
              <span className="text-green-500 truncate">API Setup Guide</span>
            </nav>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHighlights(!showHighlights)}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-800 text-gray-400 hover:text-green-500 hover:border-green-500/20 transition-colors"
              >
                <PanelRight className="h-4 w-4" />
                <span className="text-sm">Highlights</span>
              </button>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-800 text-gray-400"
              >
                <MenuIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-30 bg-gray-950/95 backdrop-blur-sm">
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-mono text-sm font-semibold text-green-500">Navigation</h3>
              <button onClick={() => setShowMobileMenu(false)} className="p-2">
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <nav className="space-y-2">
              {sections.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-300 hover:text-green-500"
                  >
                    <div className="flex items-center gap-2">
                      <section.icon className="h-4 w-4" />
                      <span>{section.title}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.includes(section.id) ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSections.includes(section.id) && section.subsections && (
                    <div className="ml-6 mt-1 space-y-1">
                      {section.subsections.map((sub) => (
                        <a
                          key={sub.id}
                          href={`#${sub.id}`}
                          onClick={() => {
                            setActiveSection(section.id);
                            setShowMobileMenu(false);
                          }}
                          className="block px-3 py-1.5 text-sm text-gray-400 hover:text-green-500"
                        >
                          {sub.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content - Full Width */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Hidden on mobile */}
          <aside className="w-72 hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="pr-4">
              <div className="mb-4">
                <h3 className="font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Contents</span>
                  <span className="text-green-500">{sections.length} chapters</span>
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-9 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-green-500/50"
                  />
                </div>
              </div>

              <nav className="space-y-1">
                {sections.map((section) => (
                  <div key={section.id} className="mb-2">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${activeSection === section.id
                          ? 'bg-green-500/10 text-green-500'
                          : 'text-gray-400 hover:text-green-500 hover:bg-green-500/5'
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <section.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{section.title}</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.includes(section.id) ? 'rotate-180' : ''
                        }`} />
                    </button>

                    {expandedSections.includes(section.id) && section.subsections && (
                      <div className="ml-6 mt-1 space-y-1">
                        {section.subsections.map((sub) => (
                          <a
                            key={sub.id}
                            href={`#${sub.id}`}
                            onClick={() => setActiveSection(section.id)}
                            className={`block px-3 py-1.5 text-sm rounded-lg transition-colors ${activeSection === section.id
                                ? 'text-green-500'
                                : 'text-gray-400 hover:text-green-500'
                              }`}
                          >
                            {sub.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-6 p-4 rounded-lg bg-gradient-to-br from-green-500/5 to-blue-500/5 border border-green-500/10">
                <h4 className="font-mono text-sm font-semibold text-green-500 mb-2">📚 Quick Reference</h4>
                <ul className="space-y-2 text-xs text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>API Ports: 8728 (TCP), 8729 (SSL)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Max Connections: 100 default</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Timeout: 30s idle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Auth: Basic, Token, Cert, JWT</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Article - Scrollable */}
          <article className="flex-1 min-w-0 overflow-y-auto" style={{ height: 'calc(100vh - 5rem)' }}>
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <section id="introduction" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Introduction
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The MikroTik RouterOS API provides a powerful interface for programmatically managing and monitoring
                  your network infrastructure. Whether you're building a custom dashboard, automating network tasks,
                  or integrating with existing systems, the API offers comprehensive access to virtually all router
                  functions.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  This guide covers everything from basic API enablement to advanced automation scenarios. You'll learn
                  how to securely configure the API, manage users and permissions, interact with various router services,
                  and build robust applications that leverage the full power of RouterOS.
                </p>

                <Callout type="info" title="RouterOS Versions">
                  This guide covers API features available in RouterOS v6 and v7. Some features may vary between versions.
                  Always check your specific RouterOS version documentation.
                </Callout>

                <section id="whats-new" className="mt-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">What's New in RouterOS v7</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Native REST API support (no additional packages needed)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>JWT (JSON Web Token) authentication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>WebSocket support for real-time updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Improved SSL/TLS with modern cipher suites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Rate limiting and connection management</span>
                    </li>
                  </ul>
                </section>
              </section>

              {/* Virtual Lab Setup */}
              <section id="virtual-lab-setup" className="mb-12 scroll-mt-20">
                <VirtualLabCard />

                <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Setting Up Your Virtual Lab</h3>

                <Step number={1} title="Download CHR VMDK">
                  <p className="mb-2">Download the Cloud Hosted Router image from MikroTik:</p>
                  <CodeBlock
                    title="Download CHR"
                    language="bash"
                    code={`# Download CHR VMDK (VirtualBox/VMware format)
wget https://download.mikrotik.com/routeros/7.13/chr-7.13.vmdk

# Or use curl
curl -O https://download.mikrotik.com/routeros/7.13/chr-7.13.vmdk`}
                  />
                </Step>

                <Step number={2} title="Create Virtual Machine">
                  <p className="mb-2">VirtualBox setup instructions:</p>
                  <CodeBlock
                    language="bash"
                    code={`# Create new VM
VBoxManage createvm --name "MikroTik-CHR" --ostype "Linux_64" --register

# Configure VM
VBoxManage modifyvm "MikroTik-CHR" --memory 256 --cpus 1
VBoxManage modifyvm "MikroTik-CHR" --nic1 bridged
VBoxManage modifyvm "MikroTik-CHR" --nic2 intnet

# Attach disk
VBoxManage storagectl "MikroTik-CHR" --name "SATA" --add sata
VBoxManage storageattach "MikroTik-CHR" --storagectl "SATA" --port 0 \
  --device 0 --type hdd --medium /path/to/chr-7.13.vmdk`}
                  />
                </Step>

                <Step number={3} title="Initial Configuration">
                  <p className="mb-2">After boot, configure basic settings:</p>
                  <CodeBlock
                    language="bash"
                    code={`# Login (default: admin/blank password)
Username: admin
Password: (leave blank)

# Set password
[admin@MikroTik] > /password
old-password:
new-password: your-secure-password

# Configure IP address
[admin@MikroTik] > /ip address add address=192.168.56.10/24 interface=ether1

# Enable API
[admin@MikroTik] > /ip service enable api
[admin@MikroTik] > /ip service enable api-ssl

# Verify
[admin@MikroTik] > /ip service print`}
                  />
                </Step>

                <Callout type="tip" title="CHR License">
                  CHR has a free license with some limitations (1Mbps bandwidth cap).
                  For full testing, you can purchase a license or use the 60-day trial.
                </Callout>
              </section>

              {/* Prerequisites */}
              <section id="prerequisites" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Prerequisites
                </h2>

                <Grid>
                  <Card title="Hardware" icon={Cpu}>
                    <ul className="space-y-1 text-sm">
                      <li>• Physical MikroTik router (or CHR virtual machine)</li>
                      <li>• At least 64MB RAM for API operations</li>
                      <li>• Network connectivity to the router</li>
                      <li>• Sufficient storage for logs (min 100MB)</li>
                    </ul>
                  </Card>

                  <Card title="Software" icon={Terminal}>
                    <ul className="space-y-1 text-sm">
                      <li>• RouterOS v6.0 or later (v7 recommended)</li>
                      <li>• API client library for your language</li>
                      <li>• curl or Postman for testing</li>
                      <li>• OpenSSL for certificate generation</li>
                    </ul>
                  </Card>

                  <Card title="Knowledge" icon={GraduationCap}>
                    <ul className="space-y-1 text-sm">
                      <li>• Basic RouterOS CLI familiarity</li>
                      <li>• Networking fundamentals (IP, routing, firewall)</li>
                      <li>• Programming basics in Python/JavaScript</li>
                      <li>• Security best practices</li>
                    </ul>
                  </Card>
                </Grid>
              </section>

              {/* API Overview */}
              <section id="api-overview" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">API Overview</h2>

                <p className="text-gray-300 leading-relaxed mb-4">
                  RouterOS provides multiple API interfaces to suit different use cases and security requirements:
                </p>

                <Table
                  headers={["Interface", "Port", "Protocol", "Authentication", "Best For"]}
                  rows={[
                    ["API (legacy)", "8728", "TCP", "Basic", "Simple scripts, internal tools"],
                    ["API-SSL", "8729", "TCP/SSL", "Basic/Certificate", "Production environments"],
                    ["REST API", "80/443", "HTTP/HTTPS", "Basic/Token/JWT", "Web applications (v7+)"],
                    ["WebSocket", "8728/8729", "WS/WSS", "Basic/Token", "Real-time updates"]
                  ]}
                />

                <section id="comparison" className="mt-6">
                  <h3 className="font-mono text-lg font-semibold text-green-500 mb-3">API Comparison</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card title="Legacy API (TCP)" icon={Radio}>
                      <p className="text-sm mb-2">Binary protocol, efficient for batch operations</p>
                      <ul className="space-y-1 text-xs">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Lower overhead than HTTP</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Supports multiple commands per connection</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-3 w-3 text-red-400 flex-shrink-0 mt-0.5" />
                          <span>No native SSL (requires separate tunnel)</span>
                        </li>
                      </ul>
                    </Card>

                    <Card title="API-SSL" icon={Lock}>
                      <p className="text-sm mb-2">Encrypted version of legacy API</p>
                      <ul className="space-y-1 text-xs">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Full encryption with TLS 1.2/1.3</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Certificate-based auth supported</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Recommended for production</span>
                        </li>
                      </ul>
                    </Card>

                    <Card title="REST API (v7+)" icon={Globe}>
                      <p className="text-sm mb-2">HTTP/RESTful interface</p>
                      <ul className="space-y-1 text-xs">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>JSON over HTTP/HTTPS</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>JWT token authentication</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Easy integration with web apps</span>
                        </li>
                      </ul>
                    </Card>

                    <Card title="WebSocket" icon={RadioTower}>
                      <p className="text-sm mb-2">Real-time bidirectional communication</p>
                      <ul className="space-y-1 text-xs">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Push notifications for events</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Real-time monitoring</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Lower latency than polling</span>
                        </li>
                      </ul>
                    </Card>
                  </div>
                </section>

                <Callout type="tip" title="Choose the Right Interface">
                  For production use, always prefer API-SSL or REST API over plain API.
                  RouterOS v7's REST API is particularly well-suited for web applications
                  and microservices architectures.
                </Callout>
              </section>

              {/* Enabling API */}
              <section id="enabling-api" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Enabling the API</h2>

                <Step number={1} title="Enable API Services">
                  <p className="mb-3">First, enable the API services via command line or WinBox:</p>

                  <Tabs>
                    <Tab label="CLI">
                      <CodeBlock
                        title="Enable API Services"
                        language="bash"
                        code={`# Enable standard API
/ip service enable api
/ip service set api port=8728

# Enable API-SSL (recommended for production)
/ip service enable api-ssl
/ip service set api-ssl port=8729

# Verify services are running
/ip service print

# Expected output:
# Flags: X - disabled, I - invalid
#   #   NAME      PORT   ADDRESS         CERTIFICATE
#   0   api       8728   0.0.0.0/0
#   1   api-ssl   8729   0.0.0.0/0      none`}
                      />
                    </Tab>
                    <Tab label="WinBox">
                      <p className="text-gray-300">
                        1. Navigate to <code className="text-green-500">IP → Services</code><br />
                        2. Find "api" and "api-ssl" in the list<br />
                        3. Double-click each and ensure they're enabled<br />
                        4. Set the port numbers (default: 8728, 8729)<br />
                        5. Configure access restrictions if needed
                      </p>
                    </Tab>
                  </Tabs>
                </Step>

                <Step number={2} title="Configure Service Settings">
                  <p className="mb-3">Fine-tune API service settings for optimal performance:</p>

                  <CodeBlock
                    title="API Service Configuration"
                    language="bash"
                    code={`# Set maximum connections
/ip service set api max-connections=100
/ip service set api-ssl max-connections=100

# Configure connection timeout (seconds)
/ip service set api-ssl idle-timeout=30s

# Set TCP keepalive
/ip service set api-ssl tcp-keepalive-enabled=yes

# Limit access to specific IP ranges
/ip service set api-ssl address=192.168.1.0/24,10.0.0.0/8

# View all settings
/ip service print detail

# Monitor active connections
/ip service monitor api-ssl`}
                  />
                </Step>

                <Callout type="warning" title="Security First">
                  Never expose the API directly to the internet without additional security measures.
                  Always use VPN, IP restrictions, and SSL/TLS encryption.
                </Callout>
              </section>

              {/* SSL/TLS Configuration */}
              <section id="ssl-configuration" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">SSL/TLS Configuration</h2>

                <p className="text-gray-300 leading-relaxed mb-4">
                  For secure API communication, you must configure SSL/TLS certificates. RouterOS supports
                  both self-signed and CA-issued certificates.
                </p>

                <Step number={1} title="Generate Certificate">
                  <CodeBlock
                    title="Create Self-Signed Certificate"
                    language="bash"
                    code={`# Generate CA certificate
/certificate add name=ca-template common-name=MyCA key-usage=key-cert-sign,crl-sign \
    days=3650 trusted=yes key-size=4096

# Sign CA certificate
/certificate sign ca-template ca-on-smart-card=no name=ca

# Generate server certificate
/certificate add name=api-server-template common-name=router.local \
    days=365 key-size=2048

# Sign server certificate with CA
/certificate sign api-server-template ca=ca name=api-server

# Verify certificates
/certificate print

# Expected output:
# Flags: K - private-key, A - authority, I - invalid, R - revoked, T - trusted
# 0 T  name="ca" common-name="MyCA" ...
# 1 K T name="api-server" common-name="router.local" ...`}
                  />
                </Step>

                <Step number={2} title="Apply Certificate to API-SSL">
                  <CodeBlock
                    language="bash"
                    code={`# Apply certificate to API-SSL service
/ip service set api-ssl certificate=api-server

# Verify configuration
/ip service print where name=api-ssl

# Test SSL connection
/tool fetch ssl url="https://router.local:8729/"`}
                  />
                </Step>

                <Step number={3} title="Configure Strong Ciphers">
                  <CodeBlock
                    language="bash"
                    code={`# Enable strong cipher suites
/ip service set api-ssl tls-version=1.2,1.3
/ip service set api-ssl ciphers="ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384"

# Disable weak protocols
/ip service set api-ssl tls-version=1.2,1.3

# Enable HSTS (if using REST API)
/ip service set www-ssl hsts=yes hsts-max-age=31536000`}
                  />
                </Step>
              </section>

              {/* User Management */}
              <section id="user-management" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">User Management</h2>

                <p className="text-gray-300 leading-relaxed mb-4">
                  Create dedicated API users with minimal required permissions following the principle of least privilege.
                </p>

                <Step number={1} title="Create User Groups">
                  <CodeBlock
                    title="Define User Groups with Specific Permissions"
                    language="bash"
                    code={`# Read-only group (monitoring)
/user group add name=api-readonly policy=api,read,!local,!telnet,!ssh,!ftp,!reboot,!write,!policy

# Read-write group (configuration changes)
/user group add name=api-readwrite policy=api,read,write,!local,!telnet,!ssh,!ftp,!reboot,!policy

# Admin group (limited admin access)
/user group add name=api-admin policy=api,read,write,reboot,!local,!telnet,!ssh,!ftp,!policy

# View available policies
/user group policies print

# List all groups
/user group print

# Explanation of policy flags:
# api - API access
# read - Read configuration
# write - Write configuration
# reboot - Reboot router
# policy - Change user policies (dangerous)
# !local - Disable local terminal access
# !ssh - Disable SSH access`}
                  />
                </Step>

                <Step number={2} title="Create API Users">
                  <CodeBlock
                    language="bash"
                    code={`# Create read-only monitoring user
/user add name=monitor password="StrongP@ssw0rd123" group=api-readonly \
    comment="API monitoring user" disabled=no

# Create admin user for automation
/user add name=automation password="AutomationP@ssw0rd456" group=api-admin \
    comment="Automation scripts" disabled=no

# Create temporary user with expiration
/user add name=temp-admin password="TempP@ssw0rd789" group=api-admin \
    comment="Temporary admin" disabled=no

# Set user expiration (30 days)
/user set temp-admin last-logged-out=30d

# List all users
/user print

# Expected output:
# Flags: X - disabled
#  0  name="monitor" group="api-readonly" ...
#  1  name="automation" group="api-admin" ...
#  2 X name="temp-admin" group="api-admin" expires=2024-04-05`}
                  />
                </Step>

                <Step number={3} title="Configure User Access">
                  <CodeBlock
                    language="bash"
                    code={`# Limit user access to specific IPs
/user set monitor allowed-address=192.168.1.0/24,10.0.0.0/8

# Set password policy (minimum length, complexity)
/user set monitor minimum-password-length=12

# Configure password expiration (90 days)
/user set monitor password-expiration-days=90

# Enable failed login logging
/user set monitor log-failed-login=yes

# View user details
/user print detail where name=monitor`}
                  />
                </Step>
              </section>

              {/* Authentication */}
              <section id="authentication" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Authentication Methods</h2>

                <Table
                  headers={["Method", "Description", "Security Level", "Use Case"]}
                  rows={[
                    ["Basic Auth", "Username/password in headers", "Low", "Simple scripts, testing"],
                    ["Token-based", "Pre-generated tokens", "Medium", "Automated systems"],
                    ["Certificate", "Client SSL certificates", "High", "Production, sensitive systems"],
                    ["JWT", "JSON Web Tokens (v7+)", "High", "Web applications"],
                    ["RADIUS", "External authentication", "High", "Enterprise environments"]
                  ]}
                />

                <section id="token-auth" className="mt-6">
                  <h3 className="font-mono text-lg font-semibold text-green-500 mb-3">Token-Based Authentication</h3>
                  <CodeBlock
                    language="bash"
                    code={`# Generate API token (RouterOS v7+)
/ip/api token generate name=api-token permissions=read,write user=monitor

# List tokens
/ip/api token print

# Revoke token
/ip/api token revoke api-token`}
                  />
                </section>

                <section id="cert-auth" className="mt-6">
                  <h3 className="font-mono text-lg font-semibold text-green-500 mb-3">Client Certificate Authentication</h3>
                  <CodeBlock
                    language="bash"
                    code={`# Generate client certificate
/certificate add name=client-template common-name=api-client
/certificate sign client-template ca=ca name=client-cert

# Export client certificate
/certificate export-certificate client-cert export-passphrase="export-pass"

# Configure API-SSL to require client certificates
/ip service set api-ssl verify-client-certificate=yes`}
                  />
                </section>
              </section>

              {/* Python Client */}
              <section id="python" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Python API Client</h2>

                <Step number={1} title="Install Library">
                  <CodeBlock
                    language="bash"
                    code={`pip install routeros-api
pip install routeros-api-pool
pip install asyncio-routeros-api`}
                  />
                </Step>

                <Step number={2} title="Basic Connection">
                  <CodeBlock
                    language="python"
                    code={`import routeros_api
import ssl
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MikroTikAPIClient:
    def __init__(self, host, username, password, port=8729, use_ssl=True):
        self.host = host
        self.username = username
        self.password = password
        self.port = port
        self.use_ssl = use_ssl
        self.connection = None
        self.api = None

    def connect(self):
        """Establish connection to MikroTik API"""
        try:
            # Configure SSL context
            ssl_context = ssl.create_default_context()
            ssl_context.check_hostname = False
            ssl_context.verify_mode = ssl.CERT_NONE

            self.connection = routeros_api.RouterOsApiPool(
                host=self.host,
                username=self.username,
                password=self.password,
                port=self.port,
                use_ssl=self.use_ssl,
                ssl_context=ssl_context,
                plaintext_login=True
            )

            self.api = self.connection.get_api()
            logger.info(f"Connected to {self.host}")
            return True

        except Exception as e:
            logger.error(f"Connection failed: {e}")
            return False

    def disconnect(self):
        """Close connection"""
        if self.connection:
            self.connection.disconnect()
            logger.info("Disconnected")

    def get_interfaces(self):
        """Get all network interfaces"""
        try:
            interfaces = self.api.get_resource('/interface')
            return interfaces.get()
        except Exception as e:
            logger.error(f"Failed to get interfaces: {e}")
            return []

    def get_system_resources(self):
        """Get system resource information"""
        try:
            resources = self.api.get_resource('/system/resource')
            return resources.get()[0]
        except Exception as e:
            logger.error(f"Failed to get system resources: {e}")
            return {}

    def add_firewall_rule(self, chain, action, dst_port=None, protocol=None):
        """Add a firewall rule"""
        try:
            firewall = self.api.get_resource('/ip/firewall/filter')
            rule = {
                'chain': chain,
                'action': action,
            }
            if dst_port:
                rule['dst-port'] = str(dst_port)
            if protocol:
                rule['protocol'] = protocol

            result = firewall.add(**rule)
            logger.info(f"Firewall rule added: {result}")
            return result
        except Exception as e:
            logger.error(f"Failed to add firewall rule: {e}")
            return None

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.disconnect()

# Usage example
if __name__ == "__main__":
    with MikroTikAPIClient(
        host="192.168.1.1",
        username="monitor",
        password="StrongP@ssw0rd123"
    ) as client:

        # Get interfaces
        interfaces = client.get_interfaces()
        print(f"Found {len(interfaces)} interfaces")

        # Get system resources
        resources = client.get_system_resources()
        print(f"CPU Load: {resources.get('cpu-load', 'N/A')}%")
        print(f"Uptime: {resources.get('uptime', 'N/A')}")
        print(f"Free Memory: {resources.get('free-memory', 'N/A')}")

        # Add firewall rule
        client.add_firewall_rule(
            chain="input",
            action="accept",
            dst_port=22,
            protocol="tcp"
        )`}
                  />
                </Step>

                <Step number={3} title="Async Python Client">
                  <CodeBlock
                    language="python"
                    code={`import asyncio
import aiohttp
import json
from typing import Optional, Dict, Any

class AsyncMikroTikRESTClient:
    def __init__(self, host: str, username: str, password: str, use_ssl: bool = True):
        self.host = host
        self.username = username
        self.password = password
        self.use_ssl = use_ssl
        self.session: Optional[aiohttp.ClientSession] = None
        self.base_url = f"{'https' if use_ssl else 'http'}://{host}/rest"

    async def __aenter__(self):
        await self.connect()
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.disconnect()

    async def connect(self):
        """Initialize session"""
        self.session = aiohttp.ClientSession(
            auth=aiohttp.BasicAuth(self.username, self.password),
            headers={"Content-Type": "application/json"}
        )

    async def disconnect(self):
        """Close session"""
        if self.session:
            await self.session.close()

    async def get(self, path: str) -> Dict[str, Any]:
        """GET request"""
        async with self.session.get(f"{self.base_url}{path}") as response:
            return await response.json()

    async def post(self, path: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """POST request"""
        async with self.session.post(
            f"{self.base_url}{path}",
            data=json.dumps(data)
        ) as response:
            return await response.json()

    async def put(self, path: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """PUT request"""
        async with self.session.put(
            f"{self.base_url}{path}",
            data=json.dumps(data)
        ) as response:
            return await response.json()

    async def delete(self, path: str) -> Dict[str, Any]:
        """DELETE request"""
        async with self.session.delete(f"{self.base_url}{path}") as response:
            return await response.json()

    async def monitor_interface_traffic(self, interface: str, interval: int = 1):
        """Monitor interface traffic in real-time"""
        try:
            while True:
                interfaces = await self.get("/interface")
                iface = next((i for i in interfaces if i["name"] == interface), None)
                if iface:
                    print(f"\rTX: {iface['tx-byte']} bytes | RX: {iface['rx-byte']} bytes", end="")
                await asyncio.sleep(interval)
        except KeyboardInterrupt:
            print("\nMonitoring stopped")

# Async usage
async def main():
    async with AsyncMikroTikRESTClient(
        host="192.168.1.1",
        username="monitor",
        password="StrongP@ssw0rd123"
    ) as client:

        # Get system info
        resources = await client.get("/system/resource")
        print(f"Router: {resources.get('board-name')}")
        print(f"Version: {resources.get('version')}")

        # Get interfaces
        interfaces = await client.get("/interface")
        for iface in interfaces[:3]:  # Show first 3 interfaces
            print(f"{iface['name']}: {iface.get('mac-address', 'N/A')}")

        # Monitor traffic for 5 seconds
        try:
            await asyncio.wait_for(
                client.monitor_interface_traffic("ether1"),
                timeout=5
            )
        except asyncio.TimeoutError:
            pass

asyncio.run(main())`}
                  />
                </Step>
              </section>

              {/* Node.js Client */}
              <section id="nodejs" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Node.js API Client</h2>

                <Step number={1} title="Install Package">
                  <CodeBlock
                    language="bash"
                    code={`npm install routeros-client
npm install axios
npm install node-fetch
npm install ws`}
                  />
                </Step>

                <Step number={2} title="Node.js Client">
                  <CodeBlock
                    language="javascript"
                    code={`const RouterOSClient = require('routeros-client').RouterOSClient;
const { RouterOSAPI } = require('routeros-client');

class MikroTikNodeClient {
    constructor(config) {
        this.config = {
            host: config.host,
            user: config.username,
            password: config.password,
            port: config.port || 8729,
            secure: config.secure !== false,
            timeout: config.timeout || 30000
        };
        this.client = null;
    }

    async connect() {
        try {
            this.client = new RouterOSAPI(this.config);
            await this.client.connect();
            console.log(\`Connected to \${this.config.host}\`);
            return true;
        } catch (error) {
            console.error('Connection failed:', error.message);
            return false;
        }
    }

    async disconnect() {
        if (this.client) {
            await this.client.close();
            console.log('Disconnected');
        }
    }

    async getInterfaces() {
        try {
            const interfaces = await this.client.write('/interface/print');
            return interfaces;
        } catch (error) {
            console.error('Failed to get interfaces:', error.message);
            return [];
        }
    }

    async getSystemResources() {
        try {
            const [resources] = await this.client.write('/system/resource/print');
            return resources;
        } catch (error) {
            console.error('Failed to get resources:', error.message);
            return {};
        }
    }

    async addDHCPLease(macAddress, address, comment = '') {
        try {
            const result = await this.client.write('/ip/dhcp-server/lease/add', [
                \`=mac-address=\${macAddress}\`,
                \`=address=\${address}\`,
                \`=comment=\${comment}\`,
                '=disabled=no'
            ]);
            console.log(\`DHCP lease added for \${macAddress}\`);
            return result;
        } catch (error) {
            console.error('Failed to add DHCP lease:', error.message);
            return null;
        }
    }

    async createSimpleQueue(name, target, maxLimit, comment = '') {
        try {
            const result = await this.client.write('/queue/simple/add', [
                \`=name=\${name}\`,
                \`=target=\${target}\`,
                \`=max-limit=\${maxLimit}\`,
                \`=comment=\${comment}\`
            ]);
            console.log(\`Queue \${name} created\`);
            return result;
        } catch (error) {
            console.error('Failed to create queue:', error.message);
            return null;
        }
    }

    async executeCommand(command, params = []) {
        try {
            const result = await this.client.write(command, params);
            return result;
        } catch (error) {
            console.error(\`Command failed: \${command}\`, error.message);
            return null;
        }
    }

    async monitor() {
        const monitor = await this.client.monitor('/interface/print', '.proplist=name,tx-byte,rx-byte', 2);
        monitor.on('data', (data) => {
            console.clear();
            console.log('Interface Monitor (updates every 2s)');
            console.log('='.repeat(50));
            data.forEach(iface => {
                console.log(\`\${iface.name.padEnd(10)} TX: \${iface['tx-byte']} bytes | RX: \${iface['rx-byte']} bytes\`);
            });
        });
    }
}

// Usage example
async function main() {
    const client = new MikroTikNodeClient({
        host: '192.168.1.1',
        username: 'monitor',
        password: 'StrongP@ssw0rd123'
    });

    try {
        await client.connect();

        // Get system info
        const resources = await client.getSystemResources();
        console.log('System Resources:', resources);

        // Get interfaces
        const interfaces = await client.getInterfaces();
        console.log(\`Found \${interfaces.length} interfaces\`);

        // Add DHCP lease
        await client.addDHCPLease(
            '00:11:22:33:44:55',
            '192.168.1.100',
            'Printer'
        );

        // Create simple queue
        await client.createSimpleQueue(
            'guest-limit',
            '192.168.2.0/24',
            '5M/5M',
            'Guest bandwidth limit'
        );

        // Execute custom command
        const users = await client.executeCommand('/user/print');
        console.log('Users:', users);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.disconnect();
    }
}

main();`}
                  />
                </Step>

                <Step number={3} title="REST API Client (v7+)">
                  <CodeBlock
                    language="javascript"
                    code={`const axios = require('axios');
const https = require('https');

class MikroTikRESTClient {
    constructor(host, username, password, useSSL = true) {
        this.baseURL = \`\${useSSL ? 'https' : 'http'}://\${host}/rest\`;
        this.auth = {
            username,
            password
        };
        this.client = axios.create({
            baseURL: this.baseURL,
            auth: this.auth,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
            timeout: 10000
        });
    }

    async get(path) {
        try {
            const response = await this.client.get(path);
            return response.data;
        } catch (error) {
            console.error(\`GET \${path} failed:\`, error.message);
            throw error;
        }
    }

    async post(path, data) {
        try {
            const response = await this.client.post(path, data);
            return response.data;
        } catch (error) {
            console.error(\`POST \${path} failed:\`, error.message);
            throw error;
        }
    }

    async put(path, data) {
        try {
            const response = await this.client.put(path, data);
            return response.data;
        } catch (error) {
            console.error(\`PUT \${path} failed:\`, error.message);
            throw error;
        }
    }

    async patch(path, data) {
        try {
            const response = await this.client.patch(path, data);
            return response.data;
        } catch (error) {
            console.error(\`PATCH \${path} failed:\`, error.message);
            throw error;
        }
    }

    async delete(path) {
        try {
            const response = await this.client.delete(path);
            return response.data;
        } catch (error) {
            console.error(\`DELETE \${path} failed:\`, error.message);
            throw error;
        }
    }

    // High-level methods
    async getInterfaces() {
        return this.get('/interface');
    }

    async getInterface(interfaceName) {
        const interfaces = await this.get(\`/interface?name=\${interfaceName}\`);
        return interfaces[0];
    }

    async setInterfaceComment(interfaceName, comment) {
        const interfaces = await this.getInterfaces();
        const iface = interfaces.find(i => i.name === interfaceName);
        if (!iface) throw new Error(\`Interface \${interfaceName} not found\`);

        return this.patch(\`/interface/\${iface['.id']}\`, {
            comment
        });
    }

    async enableInterface(interfaceName) {
        const interfaces = await this.getInterfaces();
        const iface = interfaces.find(i => i.name === interfaceName);
        if (!iface) throw new Error(\`Interface \${interfaceName} not found\`);

        return this.patch(\`/interface/\${iface['.id']}\`, {
            disabled: false
        });
    }

    async disableInterface(interfaceName) {
        const interfaces = await this.getInterfaces();
        const iface = interfaces.find(i => i.name === interfaceName);
        if (!iface) throw new Error(\`Interface \${interfaceName} not found\`);

        return this.patch(\`/interface/\${iface['.id']}\`, {
            disabled: true
        });
    }

    async addIPAddress(address, interface) {
        return this.post('/ip/address', {
            address,
            interface
        });
    }

    async removeIPAddress(addressId) {
        return this.delete(\`/ip/address/\${addressId}\`);
    }

    async getFirewallRules() {
        return this.get('/ip/firewall/filter');
    }

    async addFirewallRule(rule) {
        return this.post('/ip/firewall/filter', rule);
    }
}

// Usage with async/await
async function demonstrateAPI() {
    const client = new MikroTikRESTClient(
        '192.168.1.1',
        'monitor',
        'StrongP@ssw0rd123'
    );

    try {
        // Get all interfaces
        const interfaces = await client.getInterfaces();
        console.log('Interfaces:', interfaces.map(i => i.name).join(', '));

        // Get specific interface
        const ether1 = await client.getInterface('ether1');
        console.log('ether1 details:', ether1);

        // Enable/disable interface
        await client.disableInterface('ether2');
        console.log('ether2 disabled');

        // Wait 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));

        await client.enableInterface('ether2');
        console.log('ether2 enabled');

        // Add IP address
        await client.addIPAddress('192.168.10.1/24', 'vlan10');
        console.log('IP address added to vlan10');

        // Get firewall rules
        const rules = await client.getFirewallRules();
        console.log(\`Found \${rules.length} firewall rules\`);

        // Add firewall rule
        await client.addFirewallRule({
            chain: 'input',
            action: 'accept',
            protocol: 'tcp',
            'dst-port': 22,
            comment: 'Allow SSH'
        });
        console.log('Firewall rule added');

    } catch (error) {
        console.error('API operation failed:', error);
    }
}

demonstrateAPI();`}
                  />
                </Step>
              </section>

              {/* PHP Client */}
              <section id="php" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">PHP API Client</h2>

                <CodeBlock
                  language="php"
                  code={`<?php
class MikroTikAPIClient {
    private $socket;
    private $debug = false;
    private $connected = false;

    public function __construct($debug = false) {
        $this->debug = $debug;
    }

    public function connect($host, $port = 8729, $username, $password, $ssl = true) {
        $target = ($ssl ? 'ssl://' : '') . $host . ':' . $port;

        $this->socket = @fsockopen($target, $port, $errno, $errstr, 10);

        if (!$this->socket) {
            throw new Exception("Connection failed: $errstr ($errno)");
        }

        // Login
        $this->write('/login');
        $response = $this->read();

        if (isset($response[1]) && strpos($response[1], '!done') !== false) {
            // Old login method
            $this->write('/login', [
                'name' => $username,
                'password' => $password
            ]);
        } else {
            // New login method with challenge
            $challenge = $this->parseChallenge($response[0]);
            $md5 = md5($challenge . pack('H*', md5($password)), true);
            $this->write('/login', [
                'name' => $username,
                'response' => '00' . bin2hex($md5)
            ]);
        }

        $loginResponse = $this->read();
        if (!isset($loginResponse[0]) || strpos($loginResponse[0], '!done') === false) {
            throw new Exception("Login failed");
        }

        $this->connected = true;
        return true;
    }

    private function parseChallenge($sentence) {
        $parts = explode('=', $sentence);
        return isset($parts[1]) ? pack('H*', $parts[1]) : '';
    }

    public function disconnect() {
        if ($this->socket) {
            fclose($this->socket);
            $this->connected = false;
        }
    }

    public function write($command, $params = []) {
        $data = $command . "\n";
        foreach ($params as $key => $value) {
            $data .= '=' . $key . '=' . str_replace(['=', "\n"], ['\=', '\n'], $value) . "\n";
        }
        $data .= "\n";

        if ($this->debug) {
            echo ">> $data";
        }

        fwrite($this->socket, $data);
    }

    public function read() {
        $responses = [];
        while (($line = fgets($this->socket, 4096)) !== false) {
            $line = rtrim($line, "\r\n");
            if ($this->debug) {
                echo "<< $line\n";
            }
            if (empty($line)) {
                break;
            }
            $responses[] = $line;
        }
        return $responses;
    }

    public function exec($command, $params = []) {
        $this->write($command, $params);
        return $this->parseResponse($this->read());
    }

    private function parseResponse($responses) {
        $result = [];
        foreach ($responses as $response) {
            if (strpos($response, '!re') === 0) {
                continue;
            }
            if (strpos($response, '!done') === 0) {
                break;
            }
            $parts = explode('=', $response, 2);
            if (count($parts) == 2) {
                $result[$parts[0]] = $parts[1];
            }
        }
        return $result;
    }

    public function getInterfaces() {
        $this->write('/interface/print');
        $responses = $this->read();

        $interfaces = [];
        foreach ($responses as $response) {
            if (strpos($response, '!re') === 0) {
                continue;
            }
            if (strpos($response, '!done') === 0) {
                break;
            }

            $parts = explode('=', $response, 2);
            if (count($parts) == 2) {
                $interfaces[$parts[0]] = $parts[1];
            }
        }

        return $interfaces;
    }

    public function getSystemResources() {
        return $this->exec('/system/resource/print');
    }

    public function addFirewallRule($chain, $action, $dstPort = null, $protocol = null) {
        $params = [
            'chain' => $chain,
            'action' => $action
        ];

        if ($dstPort) {
            $params['dst-port'] = $dstPort;
        }
        if ($protocol) {
            $params['protocol'] = $protocol;
        }

        return $this->exec('/ip/firewall/filter/add', $params);
    }

    public function __destruct() {
        $this->disconnect();
    }
}

// Usage example
try {
    $client = new MikroTikAPIClient(true); // Enable debug mode

    $client->connect(
        '192.168.1.1',
        8729,
        'monitor',
        'StrongP@ssw0rd123',
        true
    );

    // Get system resources
    $resources = $client->getSystemResources();
    echo "CPU Load: " . ($resources['cpu-load'] ?? 'N/A') . "%\n";
    echo "Uptime: " . ($resources['uptime'] ?? 'N/A') . "\n";

    // Get interfaces
    $interfaces = $client->getInterfaces();
    echo "Interfaces: " . print_r($interfaces, true) . "\n";

    // Add firewall rule
    $result = $client->addFirewallRule('input', 'accept', '22', 'tcp');
    echo "Firewall rule added\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>`}
                />
              </section>

              {/* Go Client */}
              <section id="go" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Go API Client</h2>

                <CodeBlock
                  language="go"
                  code={`package main

import (
    "crypto/tls"
    "fmt"
    "log"

    "github.com/go-routeros/routeros"
)

type MikroTikClient struct {
    client *routeros.Client
}

func NewMikroTikClient(host, username, password string, port int, useTLS bool) (*MikroTikClient, error) {
    address := fmt.Sprintf("%s:%d", host, port)

    var client *routeros.Client
    var err error

    if useTLS {
        config := &tls.Config{
            InsecureSkipVerify: true, // Only for testing!
        }
        client, err = routeros.DialTLS(address, username, password, config)
    } else {
        client, err = routeros.Dial(address, username, password)
    }

    if err != nil {
        return nil, fmt.Errorf("connection failed: %w", err)
    }

    return &MikroTikClient{client: client}, nil
}

func (c *MikroTikClient) Close() {
    if c.client != nil {
        c.client.Close()
    }
}

func (c *MikroTikClient) GetSystemResources() (map[string]string, error) {
    reply, err := c.client.Run("/system/resource/print")
    if err != nil {
        return nil, fmt.Errorf("failed to get resources: %w", err)
    }

    if len(reply.Re) == 0 {
        return nil, fmt.Errorf("no resource data received")
    }

    return reply.Re[0].Map, nil
}

func (c *MikroTikClient) GetInterfaces() ([]map[string]string, error) {
    reply, err := c.client.Run("/interface/print")
    if err != nil {
        return nil, fmt.Errorf("failed to get interfaces: %w", err)
    }

    interfaces := make([]map[string]string, len(reply.Re))
    for i, re := range reply.Re {
        interfaces[i] = re.Map
    }

    return interfaces, nil
}

func (c *MikroTikClient) AddIPAddress(address, interface_name string) error {
    cmd := []string{
        "/ip/address/add",
        "=address=" + address,
        "=interface=" + interface_name,
        "=comment=Added via Go API",
    }

    _, err := c.client.RunArgs(cmd)
    if err != nil {
        return fmt.Errorf("failed to add IP address: %w", err)
    }

    return nil
}

func (c *MikroTikClient) AddFirewallRule(chain, action, dstPort, protocol string) error {
    cmd := []string{
        "/ip/firewall/filter/add",
        "=chain=" + chain,
        "=action=" + action,
    }

    if dstPort != "" {
        cmd = append(cmd, "=dst-port="+dstPort)
    }
    if protocol != "" {
        cmd = append(cmd, "=protocol="+protocol)
    }

    _, err := c.client.RunArgs(cmd)
    if err != nil {
        return fmt.Errorf("failed to add firewall rule: %w", err)
    }

    return nil
}

func (c *MikroTikClient) CreateSimpleQueue(name, target, maxLimit string) error {
    cmd := []string{
        "/queue/simple/add",
        "=name=" + name,
        "=target=" + target,
        "=max-limit=" + maxLimit,
    }

    _, err := c.client.RunArgs(cmd)
    if err != nil {
        return fmt.Errorf("failed to create queue: %w", err)
    }

    return nil
}

func (c *MikroTikClient) GetDHCPLeases() ([]map[string]string, error) {
    reply, err := c.client.Run("/ip/dhcp-server/lease/print")
    if err != nil {
        return nil, fmt.Errorf("failed to get DHCP leases: %w", err)
    }

    leases := make([]map[string]string, len(reply.Re))
    for i, re := range reply.Re {
        leases[i] = re.Map
    }

    return leases, nil
}

func main() {
    client, err := NewMikroTikClient(
        "192.168.1.1",
        "monitor",
        "StrongP@ssw0rd123",
        8729,
        true,
    )
    if err != nil {
        log.Fatal(err)
    }
    defer client.Close()

    fmt.Println("Connected to MikroTik router")

    // Get system resources
    resources, err := client.GetSystemResources()
    if err != nil {
        log.Printf("Error getting resources: %v", err)
    } else {
        fmt.Printf("CPU Load: %s%%\n", resources["cpu-load"])
        fmt.Printf("Uptime: %s\n", resources["uptime"])
        fmt.Printf("Free Memory: %s\n", resources["free-memory"])
    }

    // Get interfaces
    interfaces, err := client.GetInterfaces()
    if err != nil {
        log.Printf("Error getting interfaces: %v", err)
    } else {
        fmt.Printf("\nInterfaces (%d):\n", len(interfaces))
        for _, iface := range interfaces {
            fmt.Printf("  - %s: %s\n", iface["name"], iface["type"])
        }
    }

    // Add IP address
    err = client.AddIPAddress("192.168.100.1/24", "bridge1")
    if err != nil {
        log.Printf("Error adding IP: %v", err)
    } else {
        fmt.Println("\nIP address added successfully")
    }

    // Add firewall rule
    err = client.AddFirewallRule("input", "accept", "22", "tcp")
    if err != nil {
        log.Printf("Error adding firewall rule: %v", err)
    } else {
        fmt.Println("Firewall rule added successfully")
    }

    // Create queue
    err = client.CreateSimpleQueue("guest-limit", "192.168.2.0/24", "5M/5M")
    if err != nil {
        log.Printf("Error creating queue: %v", err)
    } else {
        fmt.Println("Queue created successfully")
    }

    // Get DHCP leases
    leases, err := client.GetDHCPLeases()
    if err != nil {
        log.Printf("Error getting DHCP leases: %v", err)
    } else {
        fmt.Printf("\nDHCP Leases (%d):\n", len(leases))
        for _, lease := range leases {
            fmt.Printf("  - MAC: %s, IP: %s\n", lease["mac-address"], lease["address"])
        }
    }
}`}
                />
              </section>

              {/* Rust Client */}
              <section id="rust" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Rust API Client</h2>

                <CodeBlock
                  language="rust"
                  code={`use std::collections::HashMap;
use routeros::{ApiClient, ApiResult};
use tokio::net::TcpStream;
use tokio_native_tls::TlsStream;
use anyhow::Result;

#[derive(Debug)]
struct MikroTikClient {
    client: ApiClient<TcpStream>,
}

#[cfg(feature = "tls")]
struct MikroTikTlsClient {
    client: ApiClient<TlsStream<TcpStream>>,
}

impl MikroTikClient {
    async fn connect(host: &str, port: u16, username: &str, password: &str) -> Result<Self> {
        let addr = format!("{}:{}", host, port);
        let stream = TcpStream::connect(&addr).await?;
        let mut client = ApiClient::connect(stream, username, password).await?;

        Ok(Self { client })
    }

    async fn get_system_resources(&mut self) -> Result<HashMap<String, String>> {
        let response = self.client
            .cmd("/system/resource/print")
            .run()
            .await?;

        Ok(response.first()
            .map(|r| r.to_owned())
            .unwrap_or_default())
    }

    async fn get_interfaces(&mut self) -> Result<Vec<HashMap<String, String>>> {
        let response = self.client
            .cmd("/interface/print")
            .run()
            .await?;

        Ok(response)
    }

    async fn add_ip_address(&mut self, address: &str, interface: &str) -> Result<()> {
        self.client
            .cmd("/ip/address/add")
            .arg("address", address)
            .arg("interface", interface)
            .arg("comment", "Added via Rust API")
            .run()
            .await?;

        Ok(())
    }

    async fn add_firewall_rule(
        &mut self,
        chain: &str,
        action: &str,
        dst_port: Option<&str>,
        protocol: Option<&str>
    ) -> Result<()> {
        let mut cmd = self.client
            .cmd("/ip/firewall/filter/add")
            .arg("chain", chain)
            .arg("action", action);

        if let Some(port) = dst_port {
            cmd = cmd.arg("dst-port", port);
        }
        if let Some(proto) = protocol {
            cmd = cmd.arg("protocol", proto);
        }

        cmd.run().await?;
        Ok(())
    }

    async fn create_simple_queue(&mut self, name: &str, target: &str, max_limit: &str) -> Result<()> {
        self.client
            .cmd("/queue/simple/add")
            .arg("name", name)
            .arg("target", target)
            .arg("max-limit", max_limit)
            .run()
            .await?;

        Ok(())
    }

    async fn monitor_interface(&mut self, interface: &str) -> Result<()> {
        let response = self.client
            .cmd("/interface/monitor-traffic")
            .arg("interface", interface)
            .arg("once", "")
            .run()
            .await?;

        println!("Traffic data for {}:", interface);
        for data in response {
            println!("{:?}", data);
        }

        Ok(())
    }
}

#[tokio::main]
async fn main() -> Result<()> {
    println!("Connecting to MikroTik router...");

    let mut client = MikroTikClient::connect(
        "192.168.1.1",
        8728,
        "monitor",
        "StrongP@ssw0rd123",
    ).await?;

    println!("Connected successfully!\n");

    // Get system resources
    match client.get_system_resources().await {
        Ok(resources) => {
            println!("System Resources:");
            println!("  CPU Load: {}%", resources.get("cpu-load").unwrap_or(&"N/A".to_string()));
            println!("  Uptime: {}", resources.get("uptime").unwrap_or(&"N/A".to_string()));
            println!("  Free Memory: {}", resources.get("free-memory").unwrap_or(&"N/A".to_string()));
            println!();
        }
        Err(e) => eprintln!("Error getting resources: {}", e),
    }

    // Get interfaces
    match client.get_interfaces().await {
        Ok(interfaces) => {
            println!("Interfaces ({}):", interfaces.len());
            for iface in interfaces {
                println!("  - {}: {}",
                    iface.get("name").unwrap_or(&"unknown".to_string()),
                    iface.get("type").unwrap_or(&"unknown".to_string())
                );
            }
            println!();
        }
        Err(e) => eprintln!("Error getting interfaces: {}", e),
    }

    // Add IP address
    match client.add_ip_address("192.168.200.1/24", "bridge2").await {
        Ok(()) => println!("IP address added successfully"),
        Err(e) => eprintln!("Error adding IP address: {}", e),
    }

    // Add firewall rule
    match client.add_firewall_rule("input", "accept", Some("22"), Some("tcp")).await {
        Ok(()) => println!("Firewall rule added successfully"),
        Err(e) => eprintln!("Error adding firewall rule: {}", e),
    }

    // Create queue
    match client.create_simple_queue("test-queue", "192.168.100.0/24", "10M/10M").await {
        Ok(()) => println!("Queue created successfully"),
        Err(e) => eprintln!("Error creating queue: {}", e),
    }

    // Monitor interface
    match client.monitor_interface("ether1").await {
        Ok(()) => println!("Monitoring completed"),
        Err(e) => eprintln!("Error monitoring interface: {}", e),
    }

    Ok(())
}`}
                />
              </section>

              {/* API Endpoints - System */}
              <section id="system" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">System Operations</h2>

                <Table
                  headers={["Command", "Description", "Parameters", "Example"]}
                  rows={[
                    ["/system/resource/print", "Get system resources", "none", "/system/resource/print"],
                    ["/system/identity/print", "Get router identity", "none", "/system/identity/print"],
                    ["/system/identity/set", "Set router name", "name", "/system/identity/set name=MyRouter"],
                    ["/system/clock/print", "Get system time", "none", "/system/clock/print"],
                    ["/system/clock/set", "Set system time", "time,date", "/system/clock/set time=12:00:00"],
                    ["/system/reboot", "Reboot router", "=at=", "/system/reboot"],
                    ["/system/shutdown", "Shutdown router", "none", "/system/shutdown"],
                    ["/system/package/print", "List installed packages", "none", "/system/package/print"],
                    ["/system/package/update/check-for-updates", "Check for updates", "none", "/system/package/update/check-for-updates"],
                    ["/system/note/print", "Get system notes", "none", "/system/note/print"],
                    ["/system/note/set", "Set system note", "note", "/system/note/set note=\"Production Router\""],
                    ["/system/history/print", "View command history", "none", "/system/history/print"],
                    ["/system/logging/print", "View log settings", "none", "/system/logging/print"],
                    ["/system/logging/action/print", "List logging actions", "none", "/system/logging/action/print"],
                    ["/system/script/print", "List scripts", "none", "/system/script/print"],
                    ["/system/script/add", "Add script", "name,source", "/system/script/add name=backup source={...}"],
                    ["/system/script/run", "Run script", "number,id", "/system/script/run number=0"],
                    ["/system/scheduler/print", "List scheduled tasks", "none", "/system/scheduler/print"],
                    ["/system/scheduler/add", "Add scheduled task", "name,interval,on-event", "/system/scheduler/add name=backup interval=1d on-event=backup-script"],
                    ["/system/backup/save", "Create backup", "name", "/system/backup/save name=backup-2024"],
                    ["/system/backup/load", "Load backup", "name", "/system/backup/load name=backup-2024"]
                  ]}
                />

                <CodeBlock
                  title="System Operations Examples"
                  language="python"
                  code={`# Get system resources
resources = api.get_resource('/system/resource').get()
print(f"CPU: {resources[0]['cpu-load']}%")
print(f"Uptime: {resources[0]['uptime']}")

# Set router identity
api.get_resource('/system/identity').set(name="Main-Router")

# Reboot router with delay
api.get_resource('/system/reboot').call(at="00:00")

# Create and run a script
script_resource = api.get_resource('/system/script')
script_resource.add(
    name="daily-backup",
    source="/system backup save name=backup-[/system clock get date]"
)

# Schedule the script
scheduler = api.get_resource('/system/scheduler')
scheduler.add(
    name="backup-schedule",
    interval="1d",
    on_event="daily-backup",
    start_time="00:00"
)`}
                />
              </section>

              {/* API Endpoints - Interfaces */}
              <section id="interfaces" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Interface Management</h2>

                <Table
                  headers={["Command", "Description", "Parameters", "Example"]}
                  rows={[
                    ["/interface/print", "List all interfaces", "none", "/interface/print"],
                    ["/interface/print where name=ether1", "Filter interfaces", "name,type", "/interface/print where type=ether"],
                    ["/interface/set", "Configure interface", "number,name,comment,mtu", "/interface/set number=0 comment=\"WAN Interface\""],
                    ["/interface/enable", "Enable interface", "number", "/interface/enable numbers=0"],
                    ["/interface/disable", "Disable interface", "number", "/interface/disable numbers=1"],
                    ["/interface/monitor-traffic", "Monitor traffic", "interface", "/interface/monitor-traffic ether1 once"],
                    ["/interface/ethernet/print", "Ethernet specific", "none", "/interface/ethernet/print"],
                    ["/interface/ethernet/set", "Configure ethernet", "number,advertise", "/interface/ethernet set ether1 advertise=1000M"],
                    ["/interface/bridge/print", "List bridges", "none", "/interface/bridge/print"],
                    ["/interface/bridge/add", "Add bridge", "name", "/interface/bridge/add name=bridge1"],
                    ["/interface/bridge/port/print", "List bridge ports", "none", "/interface/bridge/port/print"],
                    ["/interface/bridge/port/add", "Add port to bridge", "interface,bridge", "/interface/bridge/port/add interface=ether2 bridge=bridge1"],
                    ["/interface/vlan/print", "List VLANs", "none", "/interface/vlan/print"],
                    ["/interface/vlan/add", "Add VLAN", "name,vlan-id,interface", "/interface/vlan/add name=vlan10 vlan-id=10 interface=bridge1"],
                    ["/interface/wireless/print", "List wireless interfaces", "none", "/interface/wireless/print"],
                    ["/interface/wireless/set", "Configure wireless", "number,ssid,band", "/interface/wireless/set wlan1 ssid=MyNetwork band=2ghz"],
                    ["/interface/pppoe-client/print", "List PPPoE clients", "none", "/interface/pppoe-client/print"],
                    ["/interface/pppoe-client/add", "Add PPPoE client", "name,user,password", "/interface/pppoe-client/add name=pppoe-out1 user=user@isp password=pass interface=ether1"]
                  ]}
                />

                <CodeBlock
                  title="Interface Management Examples"
                  language="python"
                  code={`# Get all interfaces
interfaces = api.get_resource('/interface').get()
for iface in interfaces:
    print(f"{iface['name']}: {iface.get('mac-address', 'N/A')} - {'UP' if not iface.get('disabled') else 'DOWN'}")

# Configure VLAN
vlan = api.get_resource('/interface/vlan')
vlan.add(
    name="vlan20",
    vlan_id=20,
    interface="bridge1",
    comment="Office Network"
)

# Configure bridge with STP
bridge = api.get_resource('/interface/bridge')
bridge.add(
    name="bridge-home",
    protocol_mode="rstp",
    priority="0x8000"
)

# Add ports to bridge
bridge_port = api.get_resource('/interface/bridge/port')
bridge_port.add(
    interface="ether2",
    bridge="bridge-home",
    comment="LAN Port"
)

# Enable interface
api.get_resource('/interface').set(
    numbers="ether1",
    disabled="no"
)

# Monitor traffic
monitor = api.get_resource('/interface/monitor-traffic')
traffic = monitor.call(interface="ether1", once="")`}
                />
              </section>

              {/* API Endpoints - IP */}
              <section id="ip" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">IP Configuration</h2>

                <Table
                  headers={["Command", "Description", "Parameters", "Example"]}
                  rows={[
                    ["/ip/address/print", "List IP addresses", "none", "/ip/address/print"],
                    ["/ip/address/add", "Add IP address", "address,interface", "/ip/address/add address=192.168.1.1/24 interface=bridge1"],
                    ["/ip/address/remove", "Remove IP address", "number", "/ip/address remove numbers=0"],
                    ["/ip/route/print", "List routes", "none", "/ip/route/print"],
                    ["/ip/route/add", "Add route", "dst-address,gateway", "/ip/route/add dst-address=0.0.0.0/0 gateway=192.168.1.254"],
                    ["/ip/route/remove", "Remove route", "number", "/ip/route remove numbers=1"],
                    ["/ip/dhcp-server/print", "List DHCP servers", "none", "/ip/dhcp-server/print"],
                    ["/ip/dhcp-server/add", "Add DHCP server", "name,interface,address-pool", "/ip/dhcp-server/add name=dhcp1 interface=bridge1 address-pool=pool1"],
                    ["/ip/dhcp-server/lease/print", "List DHCP leases", "none", "/ip/dhcp-server/lease/print"],
                    ["/ip/dhcp-server/lease/add", "Add static lease", "mac-address,address", "/ip/dhcp-server/lease/add mac-address=00:11:22:33:44:55 address=192.168.1.100"],
                    ["/ip/dhcp-server/network/print", "List DHCP networks", "none", "/ip/dhcp-server/network/print"],
                    ["/ip/dhcp-server/network/add", "Add DHCP network", "address,gateway", "/ip/dhcp-server/network/add address=192.168.1.0/24 gateway=192.168.1.1"],
                    ["/ip/pool/print", "List IP pools", "none", "/ip/pool/print"],
                    ["/ip/pool/add", "Add IP pool", "name,ranges", "/ip/pool/add name=pool1 ranges=192.168.1.100-192.168.1.200"],
                    ["/ip/dns/print", "DNS settings", "none", "/ip/dns/print"],
                    ["/ip/dns/set", "Configure DNS", "servers", "/ip/dns/set servers=8.8.8.8,8.8.4.4"],
                    ["/ip/dns/static/print", "Static DNS entries", "none", "/ip/dns/static/print"],
                    ["/ip/dns/static/add", "Add static DNS", "name,address", "/ip/dns/static/add name=router.local address=192.168.1.1"],
                    ["/ip/firewall/filter/print", "Firewall rules", "none", "/ip/firewall/filter/print"],
                    ["/ip/firewall/nat/print", "NAT rules", "none", "/ip/firewall/nat/print"],
                    ["/ip/firewall/mangle/print", "Mangle rules", "none", "/ip/firewall/mangle/print"],
                    ["/ip/hotspot/print", "Hotspot settings", "none", "/ip/hotspot/print"],
                    ["/ip/hotspot/user/print", "Hotspot users", "none", "/ip/hotspot/user/print"],
                    ["/ip/hotspot/user/add", "Add hotspot user", "name,password", "/ip/hotspot/user/add name=guest password=welcome"]
                  ]}
                />

                <CodeBlock
                  title="IP Configuration Examples"
                  language="python"
                  code={`# Configure IP address
address = api.get_resource('/ip/address')
address.add(
    address="192.168.10.1/24",
    interface="vlan10",
    comment="Office Network"
)

# Set up DHCP
pool = api.get_resource('/ip/pool')
pool.add(
    name="office-pool",
    ranges="192.168.10.100-192.168.10.200"
)

network = api.get_resource('/ip/dhcp-server/network')
network.add(
    address="192.168.10.0/24",
    gateway="192.168.10.1",
    dns_server="192.168.10.1",
    comment="Office DHCP"
)

dhcp = api.get_resource('/ip/dhcp-server')
dhcp.add(
    name="office-dhcp",
    interface="vlan10",
    address_pool="office-pool",
    lease_time="10m"
)

# Add static lease
lease = api.get_resource('/ip/dhcp-server/lease')
lease.add(
    mac_address="00:11:22:33:44:55",
    address="192.168.10.50",
    comment="Printer"
)

# Configure default route
route = api.get_resource('/ip/route')
route.add(
    dst_address="0.0.0.0/0",
    gateway="192.168.1.254",
    comment="Default Gateway"
)

# Add DNS records
dns_static = api.get_resource('/ip/dns/static')
dns_static.add(
    name="fileserver.local",
    address="192.168.10.10"
)

# Configure NAT for internet access
nat = api.get_resource('/ip/firewall/nat')
nat.add(
    chain="srcnat",
    action="masquerade",
    out_interface="ether1",
    comment="Internet NAT"
)`}
                />
              </section>

              {/* API Endpoints - Firewall */}
              <section id="firewall" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Firewall Configuration</h2>

                <CodeBlock
                  title="Advanced Firewall Rules"
                  language="python"
                  code={`# Filter rules
filter = api.get_resource('/ip/firewall/filter')

# Allow established connections
filter.add(
    chain="input",
    connection_state="established,related",
    action="accept",
    comment="Allow Established"
)

# Allow SSH from management network
filter.add(
    chain="input",
    protocol="tcp",
    dst_port="22",
    src_address="192.168.1.0/24",
    action="accept",
    comment="Allow SSH from management"
)

# Allow ping
filter.add(
    chain="input",
    protocol="icmp",
    action="accept",
    comment="Allow ICMP"
)

# Drop everything else
filter.add(
    chain="input",
    action="drop",
    comment="Default Drop",
    place_before="0"
)

# NAT rules
nat = api.get_resource('/ip/firewall/nat')

# Port forwarding
nat.add(
    chain="dstnat",
    protocol="tcp",
    dst_port="8080",
    action="dst-nat",
    to_addresses="192.168.1.100",
    to_ports="80",
    comment="Web Server Forward"
)

# Mangle rules for routing
mangle = api.get_resource('/ip/firewall/mangle')

# Mark HTTP traffic
mangle.add(
    chain="prerouting",
    protocol="tcp",
    dst_port="80,443",
    action="mark-packet",
    new_packet_mark="web-traffic",
    comment="Mark Web Traffic"
)

# Address lists
address_list = api.get_resource('/ip/firewall/address-list')

# Add to block list
address_list.add(
    list="blocked",
    address="10.0.0.100",
    comment="Malicious IP"
)

# Layer7 protocols
layer7 = api.get_resource('/ip/firewall/layer7-protocol')
layer7.add(
    name="youtube",
    regexp="^.*youtube.com.*$"
)

# Filter using layer7
filter.add(
    chain="forward",
    layer7_protocol="youtube",
    action="drop",
    comment="Block YouTube"
)`}
                />
              </section>

              {/* API Endpoints - Queue */}
              <section id="queue" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Queue & Bandwidth Management</h2>

                <CodeBlock
                  title="Queue Configuration"
                  language="python"
                  code={`# Simple queues for basic bandwidth control
simple_queue = api.get_resource('/queue/simple')

# Limit guest network to 5Mbps
simple_queue.add(
    name="guest-limit",
    target="192.168.2.0/24",
    max_limit="5M/5M",
    comment="Guest Network Limit"
)

# Priority queue for VoIP
simple_queue.add(
    name="voip-priority",
    target="192.168.3.0/24",
    max_limit="2M/2M",
    priority="1",
    comment="VoIP Priority"
)

# Queue tree for complex shaping
queue_tree = api.get_resource('/queue/tree')

# Create parent queues
queue_tree.add(
    name="total-download",
    parent="global",
    max_limit="100M"
)

queue_tree.add(
    name="total-upload",
    parent="global",
    max_limit="50M"
)

# Create child queues for different traffic types
queue_tree.add(
    name="web-traffic",
    parent="total-download",
    packet_mark="web-traffic",
    limit_at="10M",
    max_limit="50M",
    priority="4"
)

queue_tree.add(
    name="voip-traffic",
    parent="total-upload",
    packet_mark="voip-traffic",
    limit_at="1M",
    max_limit="2M",
    priority="1"
)

# PCQ for fair sharing
pcq = api.get_resource('/queue/type')
pcq.add(
    name="pcq-download",
    kind="pcq",
    pcq_rate="2M",
    pcq_classifier="dst-address"
)

# Apply PCQ to queue
simple_queue.add(
    name="fair-share",
    target="192.168.10.0/24",
    queue="pcq-download/pcq-upload",
    comment="Fair Share"
)

# Burst configuration
simple_queue.add(
    name="burst-example",
    target="192.168.20.50",
    max_limit="2M/2M",
    burst_limit="4M/4M",
    burst_threshold="1.5M/1.5M",
    burst_time="10/10",
    comment="Burst for downloads"
)`}
                />
              </section>

              {/* Webhooks */}
              <section id="webhooks" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Webhooks & Event Handling</h2>

                <p className="text-gray-300 leading-relaxed mb-4">
                  RouterOS can trigger external systems via webhooks when specific events occur.
                </p>

                <CodeBlock
                  title="Webhook Setup"
                  language="python"
                  code={`# Create script that sends webhook
script = api.get_resource('/system/script')
script.add(
    name="webhook-notify",
    source='''
:local url "https://your-server.com/webhook"
:local data "{\\"event\\":\\"interface-down\\",\\"interface\\":\\"ether1\\"}"
/tool fetch url=$url http-method=post http-data=$data http-header-field="content-type: application/json"
'''
)

# Schedule script to run on interface down
scheduler = api.get_resource('/system/scheduler')
scheduler.add(
    name="webhook-check",
    on_event="webhook-notify",
    start_time="startup",
    interval="1m"
)

# Python webhook handler
from flask import Flask, request
import json

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.json
    print(f"Received webhook: {data}")

    # Handle different events
    if data.get('event') == 'interface-down':
        # Send alert
        send_alert(f"Interface {data['interface']} is down!")
    elif data.get('event') == 'high-cpu':
        # Scale resources
        scale_resources()

    return {'status': 'ok'}

if __name__ == '__main__':
    app.run(port=5000)`}
                />
              </section>

              {/* Monitoring */}
              <section id="monitoring" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Advanced Monitoring</h2>

                <CodeBlock
                  title="Comprehensive Monitoring Script"
                  language="python"
                  code={`import time
import json
from datetime import datetime
import requests
import smtplib
from email.mime.text import MIMEText
import sqlite3

class MikroTikMonitor:
    def __init__(self, api_client):
        self.api = api_client
        self.metrics = {}
        self.alerts = []

    def collect_metrics(self):
        """Collect all system metrics"""
        metrics = {}

        # System resources
        resources = self.api.get_resource('/system/resource').get()[0]
        metrics['cpu_load'] = float(resources['cpu-load'])
        metrics['uptime'] = resources['uptime']
        metrics['free_memory'] = int(resources['free-memory'])
        metrics['total_memory'] = int(resources['total-memory'])
        metrics['free_hdd'] = int(resources['free-hdd-space'])

        # Memory usage percentage
        metrics['memory_usage'] = (
            (metrics['total_memory'] - metrics['free_memory']) /
            metrics['total_memory'] * 100
        )

        # Interface statistics
        interfaces = self.api.get_resource('/interface').get()
        metrics['interfaces'] = {}
        for iface in interfaces:
            if not iface.get('disabled'):
                metrics['interfaces'][iface['name']] = {
                    'rx_byte': int(iface.get('rx-byte', 0)),
                    'tx_byte': int(iface.get('tx-byte', 0)),
                    'rx_packet': int(iface.get('rx-packet', 0)),
                    'tx_packet': int(iface.get('tx-packet', 0)),
                    'rx_error': int(iface.get('rx-error', 0)),
                    'tx_error': int(iface.get('tx-error', 0)),
                    'rx_drop': int(iface.get('rx-drop', 0)),
                    'tx_drop': int(iface.get('tx-drop', 0))
                }

        # Connection tracking
        connections = self.api.get_resource('/ip/firewall/connection').get()
        metrics['connections'] = len(connections)

        # DHCP leases
        leases = self.api.get_resource('/ip/dhcp-server/lease').get()
        metrics['dhcp_leases'] = len([l for l in leases if not l.get('disabled')])

        # Active hotspot users
        try:
            hotspot = self.api.get_resource('/ip/hotspot/active').get()
            metrics['hotspot_users'] = len(hotspot)
        except:
            metrics['hotspot_users'] = 0

        # Wireless clients (if applicable)
        try:
            registration = self.api.get_resource('/interface/wireless/registration-table').get()
            metrics['wireless_clients'] = len(registration)
        except:
            metrics['wireless_clients'] = 0

        self.metrics = metrics
        return metrics

    def check_alerts(self):
        """Check thresholds and generate alerts"""
        alerts = []

        # CPU threshold
        if self.metrics.get('cpu_load', 0) > 80:
            alerts.append({
                'level': 'warning',
                'type': 'high_cpu',
                'value': self.metrics['cpu_load'],
                'message': f"CPU load is {self.metrics['cpu_load']}%"
            })

        # Memory threshold
        if self.metrics.get('memory_usage', 0) > 85:
            alerts.append({
                'level': 'critical',
                'type': 'high_memory',
                'value': self.metrics['memory_usage'],
                'message': f"Memory usage is {self.metrics['memory_usage']:.1f}%"
            })

        # Interface errors
        for name, stats in self.metrics.get('interfaces', {}).items():
            if stats['rx_error'] > 100 or stats['tx_error'] > 100:
                alerts.append({
                    'level': 'warning',
                    'type': 'interface_errors',
                    'interface': name,
                    'rx_error': stats['rx_error'],
                    'tx_error': stats['tx_error'],
                    'message': f"High errors on {name}"
                })

        self.alerts = alerts
        return alerts

    def save_to_database(self):
        """Save metrics to SQLite database"""
        conn = sqlite3.connect('router_metrics.db')
        c = conn.cursor()

        c.execute('''CREATE TABLE IF NOT EXISTS metrics
                     (timestamp TEXT, cpu_load REAL, memory_usage REAL,
                      connections INTEGER, dhcp_leases INTEGER)''')

        c.execute('INSERT INTO metrics VALUES (?, ?, ?, ?, ?)',
                 (datetime.now().isoformat(),
                  self.metrics.get('cpu_load'),
                  self.metrics.get('memory_usage'),
                  self.metrics.get('connections'),
                  self.metrics.get('dhcp_leases')))

        conn.commit()
        conn.close()

    def send_alert(self, alert):
        """Send alert via email/notification"""
        # Email alert
        msg = MIMEText(f"""
Alert: {alert['message']}
Time: {datetime.now()}
Type: {alert['type']}
Level: {alert['level']}
""")
        msg['Subject'] = f"MikroTik Alert: {alert['type']}"
        msg['From'] = 'monitor@example.com'
        msg['To'] = 'admin@example.com'

        # Send email (configure your SMTP)
        # smtp = smtplib.SMTP('localhost')
        # smtp.send_message(msg)

        # Webhook alert
        requests.post('https://alerts.example.com/webhook',
                     json=alert,
                     timeout=5)

    def generate_report(self):
        """Generate HTML report"""
        html = f"""
        <html>
        <head><title>MikroTik Monitoring Report</title></head>
        <body>
        <h1>Router Status Report - {datetime.now()}</h1>

        <h2>System Resources</h2>
        <ul>
            <li>CPU Load: {self.metrics.get('cpu_load', 0)}%</li>
            <li>Memory Usage: {self.metrics.get('memory_usage', 0):.1f}%</li>
            <li>Uptime: {self.metrics.get('uptime', 'N/A')}</li>
            <li>Active Connections: {self.metrics.get('connections', 0)}</li>
            <li>DHCP Leases: {self.metrics.get('dhcp_leases', 0)}</li>
            <li>Wireless Clients: {self.metrics.get('wireless_clients', 0)}</li>
            <li>Hotspot Users: {self.metrics.get('hotspot_users', 0)}</li>
        </ul>

        <h2>Interface Statistics</h2>
        <table border="1">
        <tr>
            <th>Interface</th>
            <th>RX Bytes</th>
            <th>TX Bytes</th>
            <th>RX Errors</th>
            <th>TX Errors</th>
        </tr>
        """

        for name, stats in self.metrics.get('interfaces', {}).items():
            html += f"""
            <tr>
                <td>{name}</td>
                <td>{stats['rx_byte']}</td>
                <td>{stats['tx_byte']}</td>
                <td>{stats['rx_error']}</td>
                <td>{stats['tx_error']}</td>
            </tr>
            """

        html += """
        </table>

        <h2>Active Alerts</h2>
        <ul>
        """

        for alert in self.alerts:
            html += f"<li>{alert['message']}</li>"

        html += """
        </ul>
        </body>
        </html>
        """

        with open('report.html', 'w') as f:
            f.write(html)

        return html

# Usage
monitor = MikroTikMonitor(api)

while True:
    monitor.collect_metrics()
    alerts = monitor.check_alerts()

    for alert in alerts:
        monitor.send_alert(alert)

    monitor.save_to_database()

    if datetime.now().hour == 0:  # Daily report at midnight
        monitor.generate_report()

    time.sleep(60)  # Monitor every minute`}
                />
              </section>

              {/* Automation */}
              <section id="automation" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Network Automation</h2>

                <CodeBlock
                  title="Automation Framework"
                  language="python"
                  code={`import yaml
import schedule
import time
from typing import Dict, Any

class NetworkAutomation:
    def __init__(self, config_file='network_config.yaml'):
        with open(config_file, 'r') as f:
            self.config = yaml.safe_load(f)
        self.routers = {}

    def connect_routers(self):
        """Connect to all routers in config"""
        for name, router_config in self.config['routers'].items():
            client = MikroTikAPIClient(
                host=router_config['host'],
                username=router_config['username'],
                password=router_config['password']
            )
            client.connect()
            self.routers[name] = client

    def apply_configuration(self, router_name: str, config: Dict[str, Any]):
        """Apply configuration to specific router"""
        router = self.routers.get(router_name)
        if not router:
            raise Exception(f"Router {router_name} not connected")

        # Apply interface configs
        if 'interfaces' in config:
            self._configure_interfaces(router, config['interfaces'])

        # Apply IP configs
        if 'ip' in config:
            self._configure_ip(router, config['ip'])

        # Apply firewall rules
        if 'firewall' in config:
            self._configure_firewall(router, config['firewall'])

        # Apply DHCP
        if 'dhcp' in config:
            self._configure_dhcp(router, config['dhcp'])

        # Apply queues
        if 'queues' in config:
            self._configure_queues(router, config['queues'])

    def _configure_interfaces(self, router, interfaces):
        """Configure interfaces"""
        for iface in interfaces:
            router.api.get_resource('/interface').set(
                numbers=iface['name'],
                comment=iface.get('comment', ''),
                disabled=iface.get('disabled', False)
            )

            if 'vlan' in iface:
                vlan = router.api.get_resource('/interface/vlan')
                vlan.add(
                    name=f"vlan{iface['vlan']}",
                    vlan_id=iface['vlan'],
                    interface=iface['name']
                )

    def _configure_ip(self, router, ip_config):
        """Configure IP addresses"""
        for addr in ip_config['addresses']:
            router.api.get_resource('/ip/address').add(
                address=addr['address'],
                interface=addr['interface'],
                comment=addr.get('comment', '')
            )

        for route in ip_config['routes']:
            router.api.get_resource('/ip/route').add(
                dst_address=route['dst'],
                gateway=route['gateway'],
                comment=route.get('comment', '')
            )

    def _configure_firewall(self, router, firewall_rules):
        """Configure firewall"""
        filter_rules = firewall_rules.get('filter', [])
        for rule in filter_rules:
            router.api.get_resource('/ip/firewall/filter').add(
                chain=rule['chain'],
                action=rule['action'],
                protocol=rule.get('protocol'),
                dst_port=rule.get('dst_port'),
                src_address=rule.get('src_address'),
                comment=rule.get('comment', '')
            )

    def _configure_dhcp(self, router, dhcp_config):
        """Configure DHCP"""
        # Add pools
        for pool in dhcp_config.get('pools', []):
            router.api.get_resource('/ip/pool').add(
                name=pool['name'],
                ranges=pool['ranges']
            )

        # Configure networks
        for network in dhcp_config.get('networks', []):
            router.api.get_resource('/ip/dhcp-server/network').add(
                address=network['subnet'],
                gateway=network['gateway'],
                dns_server=network.get('dns', '')
            )

        # Create DHCP servers
        for server in dhcp_config.get('servers', []):
            router.api.get_resource('/ip/dhcp-server').add(
                name=server['name'],
                interface=server['interface'],
                address_pool=server['pool'],
                lease_time=server.get('lease_time', '10m')
            )

    def _configure_queues(self, router, queues):
        """Configure queues"""
        for queue in queues:
            router.api.get_resource('/queue/simple').add(
                name=queue['name'],
                target=queue['target'],
                max_limit=queue['max_limit'],
                priority=queue.get('priority', '8'),
                comment=queue.get('comment', '')
            )

    def backup_all(self, backup_dir='./backups'):
        """Backup all router configurations"""
        import os
        import datetime

        os.makedirs(backup_dir, exist_ok=True)

        for name, router in self.routers.items():
            timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
            backup_name = f"{backup_dir}/{name}_{timestamp}.backup"

            # Generate backup
            router.api.get_resource('/system/backup').save(
                name=backup_name
            )

            # Export configuration
            export = router.api.get_resource('/export').call()
            with open(f"{backup_name}.rsc", 'w') as f:
                f.write(export)

            print(f"Backed up {name}")

    def check_compliance(self) -> Dict[str, Any]:
        """Check if routers comply with configuration"""
        compliance_report = {}

        for name, router in self.routers.items():
            issues = []

            # Check system identity
            identity = router.api.get_resource('/system/identity').get()[0]
            expected = self.config['routers'][name].get('identity')
            if expected and identity['name'] != expected:
                issues.append(f"Identity mismatch: {identity['name']} != {expected}")

            # Check DNS settings
            dns = router.api.get_resource('/ip/dns').get()[0]
            expected_dns = self.config['dns'].get('servers', [])
            if set(dns.get('servers', '').split(',')) != set(expected_dns):
                issues.append(f"DNS mismatch")

            # Check NTP
            ntp = router.api.get_resource('/system/ntp/client').get()[0]
            expected_ntp = self.config['ntp'].get('servers', [])
            if ntp.get('server-dns-names') != ','.join(expected_ntp):
                issues.append(f"NTP servers mismatch")

            compliance_report[name] = {
                'compliant': len(issues) == 0,
                'issues': issues
            }

        return compliance_report

# Configuration file (network_config.yaml)
config_yaml = '''
routers:
  main_router:
    host: 192.168.1.1
    username: admin
    password: secure_password
    identity: Main-Gateway

  branch_router:
    host: 10.0.0.1
    username: admin
    password: secure_password
    identity: Branch-Office

dns:
  servers: [8.8.8.8, 8.8.4.4]

ntp:
  servers: [pool.ntp.org, time.google.com]

default_config:
  interfaces:
    - name: ether1
      comment: WAN Interface
    - name: ether2
      comment: LAN Interface
      vlan: 10

  ip:
    addresses:
      - address: 192.168.1.1/24
        interface: ether2
        comment: LAN Network

    routes:
      - dst: 0.0.0.0/0
        gateway: 192.168.1.254
        comment: Default Route

  firewall:
    filter:
      - chain: input
        action: accept
        protocol: tcp
        dst_port: 22
        src_address: 192.168.1.0/24
        comment: Allow SSH

      - chain: input
        action: drop
        comment: Default Drop

  dhcp:
    pools:
      - name: lan-pool
        ranges: 192.168.1.100-192.168.1.200

    networks:
      - subnet: 192.168.1.0/24
        gateway: 192.168.1.1
        dns: 8.8.8.8

    servers:
      - name: lan-dhcp
        interface: ether2
        pool: lan-pool

  queues:
    - name: guest-limit
      target: 192.168.2.0/24
      max_limit: 5M/5M
      comment: Guest Network
'''

# Run automation
automation = NetworkAutomation()
automation.connect_routers()

# Apply configuration
for router_name in automation.config['routers']:
    automation.apply_configuration(
        router_name,
        automation.config['default_config']
    )

# Schedule tasks
schedule.every().day.at("00:00").do(automation.backup_all)
schedule.every().hour.do(lambda: automation.check_compliance())

while True:
    schedule.run_pending()
    time.sleep(60)`}
                />
              </section>

              {/* Backup & Restore */}
              <section id="backup" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Backup & Restore System</h2>

                <CodeBlock
                  title="Enterprise Backup System"
                  language="python"
                  code={`import os
import json
import hashlib
import gzip
import boto3
from datetime import datetime
from cryptography.fernet import Fernet

class BackupManager:
    def __init__(self, router_client, backup_dir='/var/backups/router'):
        self.client = router_client
        self.backup_dir = backup_dir
        self.encryption_key = self.load_or_create_key()
        self.cipher = Fernet(self.encryption_key)

    def load_or_create_key(self):
        """Load or create encryption key"""
        key_file = '/etc/backup.key'
        if os.path.exists(key_file):
            with open(key_file, 'rb') as f:
                return f.read()
        else:
            key = Fernet.generate_key()
            with open(key_file, 'wb') as f:
                f.write(key)
            return key

    def create_backup(self, backup_name=None):
        """Create encrypted backup"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        name = backup_name or f"backup_{timestamp}"

        # Create backup directory
        backup_path = f"{self.backup_dir}/{name}"
        os.makedirs(backup_path, exist_ok=True)

        # Get configuration export
        export = self.client.api.get_resource('/export').call()

        # Get binary backup
        self.client.api.get_resource('/system/backup').save(
            name=f"{backup_path}/{name}"
        )

        # Collect all configuration
        config = {
            'system': self.get_system_config(),
            'interfaces': self.get_interface_config(),
            'ip': self.get_ip_config(),
            'firewall': self.get_firewall_config(),
            'routing': self.get_routing_config(),
            'dhcp': self.get_dhcp_config(),
            'queues': self.get_queue_config(),
            'timestamp': timestamp
        }

        # Save JSON config
        with open(f"{backup_path}/config.json", 'w') as f:
            json.dump(config, f, indent=2)

        # Save export
        with open(f"{backup_path}/export.rsc", 'w') as f:
            f.write(export)

        # Create manifest
        manifest = self.create_manifest(backup_path, name, timestamp)

        # Encrypt sensitive files
        self.encrypt_backup(backup_path)

        # Compress backup
        self.compress_backup(backup_path)

        return {
            'name': name,
            'path': f"{backup_path}.tar.gz",
            'timestamp': timestamp,
            'manifest': manifest
        }

    def get_system_config(self):
        """Get system configuration"""
        return {
            'identity': self.client.api.get_resource('/system/identity').get()[0],
            'clock': self.client.api.get_resource('/system/clock').get()[0],
            'resources': self.client.api.get_resource('/system/resource').get()[0],
            'note': self.client.api.get_resource('/system/note').get()[0],
            'logging': self.client.api.get_resource('/system/logging').get(),
            'scripts': self.client.api.get_resource('/system/script').get(),
            'scheduler': self.client.api.get_resource('/system/scheduler').get(),
            'users': self.client.api.get_resource('/user').get()
        }

    def get_interface_config(self):
        """Get interface configuration"""
        return {
            'interfaces': self.client.api.get_resource('/interface').get(),
            'ethernet': self.client.api.get_resource('/interface/ethernet').get(),
            'bridge': self.client.api.get_resource('/interface/bridge').get(),
            'vlan': self.client.api.get_resource('/interface/vlan').get(),
            'wireless': self.client.api.get_resource('/interface/wireless').get(),
            'pppoe': self.client.api.get_resource('/interface/pppoe-client').get()
        }

    def get_ip_config(self):
        """Get IP configuration"""
        return {
            'addresses': self.client.api.get_resource('/ip/address').get(),
            'routes': self.client.api.get_resource('/ip/route').get(),
            'dns': self.client.api.get_resource('/ip/dns').get()[0],
            'dns_static': self.client.api.get_resource('/ip/dns/static').get(),
            'pools': self.client.api.get_resource('/ip/pool').get()
        }

    def get_firewall_config(self):
        """Get firewall configuration"""
        return {
            'filter': self.client.api.get_resource('/ip/firewall/filter').get(),
            'nat': self.client.api.get_resource('/ip/firewall/nat').get(),
            'mangle': self.client.api.get_resource('/ip/firewall/mangle').get(),
            'address_lists': self.client.api.get_resource('/ip/firewall/address-list').get(),
            'layer7': self.client.api.get_resource('/ip/firewall/layer7-protocol').get(),
            'connections': len(self.client.api.get_resource('/ip/firewall/connection').get())
        }

    def get_routing_config(self):
        """Get routing configuration"""
        return {
            'routes': self.client.api.get_resource('/ip/route').get(),
            'ospf': self.client.api.get_resource('/routing/ospf').get() if hasattr(self.client.api, '/routing/ospf') else [],
            'bgp': self.client.api.get_resource('/routing/bgp').get() if hasattr(self.client.api, '/routing/bgp') else []
        }

    def get_dhcp_config(self):
        """Get DHCP configuration"""
        return {
            'servers': self.client.api.get_resource('/ip/dhcp-server').get(),
            'networks': self.client.api.get_resource('/ip/dhcp-server/network').get(),
            'leases': self.client.api.get_resource('/ip/dhcp-server/lease').get(),
            'relay': self.client.api.get_resource('/ip/dhcp-relay').get() if hasattr(self.client.api, '/ip/dhcp-relay') else []
        }

    def get_queue_config(self):
        """Get queue configuration"""
        return {
            'simple': self.client.api.get_resource('/queue/simple').get(),
            'tree': self.client.api.get_resource('/queue/tree').get() if hasattr(self.client.api, '/queue/tree') else [],
            'types': self.client.api.get_resource('/queue/type').get() if hasattr(self.client.api, '/queue/type') else []
        }

    def create_manifest(self, backup_path, name, timestamp):
        """Create backup manifest"""
        manifest = {
            'backup_name': name,
            'timestamp': timestamp,
            'files': [],
            'checksums': {},
            'version': '1.0'
        }

        for root, dirs, files in os.walk(backup_path):
            for file in files:
                file_path = os.path.join(root, file)
                with open(file_path, 'rb') as f:
                    file_hash = hashlib.sha256(f.read()).hexdigest()

                manifest['files'].append(file)
                manifest['checksums'][file] = file_hash

        with open(f"{backup_path}/manifest.json", 'w') as f:
            json.dump(manifest, f, indent=2)

        return manifest

    def encrypt_backup(self, backup_path):
        """Encrypt sensitive backup files"""
        sensitive_files = ['users.json', 'config.json', 'export.rsc']

        for file in sensitive_files:
            file_path = f"{backup_path}/{file}"
            if os.path.exists(file_path):
                with open(file_path, 'rb') as f:
                    encrypted = self.cipher.encrypt(f.read())

                with open(f"{file_path}.encrypted", 'wb') as f:
                    f.write(encrypted)

                os.remove(file_path)

    def compress_backup(self, backup_path):
        """Compress backup directory"""
        import tarfile

        with tarfile.open(f"{backup_path}.tar.gz", "w:gz") as tar:
            tar.add(backup_path, arcname=os.path.basename(backup_path))

        import shutil
        shutil.rmtree(backup_path)

    def upload_to_s3(self, backup_file, bucket='router-backups'):
        """Upload backup to S3"""
        s3 = boto3.client('s3')

        key = f"backups/{os.path.basename(backup_file)}"
        s3.upload_file(backup_file, bucket, key)

        return f"s3://{bucket}/{key}"

    def list_backups(self):
        """List all available backups"""
        backups = []
        for file in os.listdir(self.backup_dir):
            if file.endswith('.tar.gz'):
                backup_path = os.path.join(self.backup_dir, file)
                backups.append({
                    'name': file,
                    'size': os.path.getsize(backup_path),
                    'modified': datetime.fromtimestamp(
                        os.path.getmtime(backup_path)
                    ).isoformat()
                })
        return sorted(backups, key=lambda x: x['modified'], reverse=True)

    def restore_backup(self, backup_name, restore_config=None):
        """Restore from backup"""
        backup_path = f"{self.backup_dir}/{backup_name}"

        # Extract backup
        import tarfile
        with tarfile.open(backup_path, "r:gz") as tar:
            tar.extractall('/tmp/restore')

        restore_dir = f"/tmp/restore/{backup_name.replace('.tar.gz', '')}"

        # Decrypt files
        for file in os.listdir(restore_dir):
            if file.endswith('.encrypted'):
                with open(f"{restore_dir}/{file}", 'rb') as f:
                    decrypted = self.cipher.decrypt(f.read())

                original_name = file.replace('.encrypted', '')
                with open(f"{restore_dir}/{original_name}", 'wb') as f:
                    f.write(decrypted)

        # Load configuration
        with open(f"{restore_dir}/config.json", 'r') as f:
            config = json.load(f)

        # Apply selected parts of configuration
        if not restore_config or 'system' in restore_config:
            self.restore_system(config['system'])

        if not restore_config or 'interfaces' in restore_config:
            self.restore_interfaces(config['interfaces'])

        if not restore_config or 'ip' in restore_config:
            self.restore_ip(config['ip'])

        if not restore_config or 'firewall' in restore_config:
            self.restore_firewall(config['firewall'])

        # Clean up
        import shutil
        shutil.rmtree('/tmp/restore')

        return {'status': 'success', 'restored': restore_config or 'all'}

    def restore_system(self, system_config):
        """Restore system configuration"""
        # Restore identity
        self.client.api.get_resource('/system/identity').set(
            name=system_config['identity']['name']
        )

        # Restore users
        current_users = self.client.api.get_resource('/user').get()
        for user in current_users:
            if user['name'] != 'admin':
                self.client.api.get_resource('/user').remove(id=user['.id'])

        for user in system_config['users']:
            if user['name'] != 'admin':
                self.client.api.get_resource('/user').add(
                    name=user['name'],
                    group=user['group'],
                    comment=user.get('comment', '')
                )

    def restore_interfaces(self, interface_config):
        """Restore interface configuration"""
        # Implementation for interface restore
        pass

    def restore_ip(self, ip_config):
        """Restore IP configuration"""
        # Implementation for IP restore
        pass

    def restore_firewall(self, firewall_config):
        """Restore firewall configuration"""
        # Implementation for firewall restore
        pass

# Usage
backup_mgr = BackupManager(api_client)

# Create backup
backup = backup_mgr.create_backup()
print(f"Backup created: {backup['name']}")

# Upload to cloud
s3_url = backup_mgr.upload_to_s3(f"{backup['path']}")
print(f"Uploaded to: {s3_url}")

# List backups
for b in backup_mgr.list_backups():
    print(f"{b['name']} - {b['size']} bytes - {b['modified']}")

# Restore only system and firewall
backup_mgr.restore_backup(
    'backup_20240306_120000.tar.gz',
    restore_config=['system', 'firewall']
)`}
                />
              </section>

              {/* High Availability */}
              <section id="high-availability" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">High Availability Setup</h2>

                <CodeBlock
                  title="VRRP Configuration for HA"
                  language="python"
                  code={`# Configure VRRP on primary router
vrrp = api.get_resource('/interface/vrrp')
vrrp.add(
    name="vrrp1",
    interface="ether1",
    vrid=1,
    priority=200,
    address="192.168.1.254/24",
    comment="Primary Gateway"
)

# Configure VRRP on secondary router
vrrp_secondary = secondary_api.get_resource('/interface/vrrp')
vrrp_secondary.add(
    name="vrrp1",
    interface="ether1",
    vrid=1,
    priority=100,
    address="192.168.1.254/24",
    comment="Backup Gateway"
)

# Monitor VRRP state
vrrp_monitor = api.get_resource('/interface/vrrp/monitor')
vrrp_monitor.call(numbers="vrrp1", once="")

# Failover script
script = api.get_resource('/system/script')
script.add(
    name="vrrp-failover",
    source='''
:local vrrpState [/interface vrrp get vrrp1 state]
:if ($vrrpState = "master") do={
    /log info "VRRP: This router is now master"
    /ip route set [find comment="default"] gateway=192.168.1.254
} else={
    /log info "VRRP: This router is backup"
}
'''
)

# Schedule monitoring
scheduler = api.get_resource('/system/scheduler')
scheduler.add(
    name="vrrp-check",
    interval="10s",
    on_event="vrrp-failover",
    start_time="startup"
)`}
                />
              </section>

              {/* Load Balancing */}
              <section id="load-balancing" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Load Balancing</h2>

                <CodeBlock
                  title="PCC Load Balancing"
                  language="python"
                  code={`# Configure PCC load balancing for multiple WAN links

# Mark connections
mangle = api.get_resource('/ip/firewall/mangle')

# Mark incoming connections from LAN
mangle.add(
    chain="prerouting",
    in_interface="bridge-lan",
    connection_mark="no-mark",
    action="mark-connection",
    new_connection_mark="wan1-conn",
    per_connection_classifier="src-address:2/0",
    comment="PCC WAN1"
)

mangle.add(
    chain="prerouting",
    in_interface="bridge-lan",
    connection_mark="no-mark",
    action="mark-connection",
    new_connection_mark="wan2-conn",
    per_connection_classifier="src-address:2/1",
    comment="PCC WAN2"
)

# Mark routing marks based on connections
mangle.add(
    chain="prerouting",
    in_interface="bridge-lan",
    connection_mark="wan1-conn",
    action="mark-routing",
    new_routing_mark="to-wan1",
    comment="Route WAN1"
)

mangle.add(
    chain="prerouting",
    in_interface="bridge-lan",
    connection_mark="wan2-conn",
    action="mark-routing",
    new_routing_mark="to-wan2",
    comment="Route WAN2"
)

# Configure routing tables
route = api.get_resource('/ip/route')

# Add routes for each WAN
route.add(
    dst_address="0.0.0.0/0",
    gateway="1.1.1.1",
    routing_mark="to-wan1",
    distance=1,
    comment="WAN1 Default"
)

route.add(
    dst_address="0.0.0.0/0",
    gateway="2.2.2.2",
    routing_mark="to-wan2",
    distance=1,
    comment="WAN2 Default"
)

# Main default route with failover
route.add(
    dst_address="0.0.0.0/0",
    gateway="1.1.1.1",
    distance=1,
    comment="Primary Default"
)

route.add(
    dst_address="0.0.0.0/0",
    gateway="2.2.2.2",
    distance=2,
    comment="Backup Default"
)

# Configure NAT for both WANs
nat = api.get_resource('/ip/firewall/nat')

nat.add(
    chain="srcnat",
    out_interface="wan1",
    action="masquerade",
    comment="WAN1 NAT"
)

nat.add(
    chain="srcnat",
    out_interface="wan2",
    action="masquerade",
    comment="WAN2 NAT"
)

# Monitor link health
health_check = api.get_resource('/tool/netwatch')
health_check.add(
    host="8.8.8.8",
    interval="10s",
    comment="WAN Health Check"
)`}
                />
              </section>

              {/* Error Codes */}
              <section id="error-codes" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Common Error Codes</h2>

                <Table
                  headers={["Error Code", "Description", "Solution"]}
                  rows={[
                    ["0", "Success", "Operation completed successfully"],
                    ["1", "General error", "Check syntax and parameters"],
                    ["2", "Invalid value", "Verify parameter values"],
                    ["3", "Not found", "Resource doesn't exist"],
                    ["4", "Already exists", "Resource already exists"],
                    ["5", "Permission denied", "Check user permissions"],
                    ["6", "Connection failed", "Verify network connectivity"],
                    ["7", "Authentication failed", "Check username/password"],
                    ["8", "SSL/TLS error", "Check certificate configuration"],
                    ["9", "Timeout", "Increase timeout, check network"],
                    ["10", "Rate limited", "Reduce request frequency"],
                    ["11", "Invalid command", "Check command syntax"],
                    ["12", "Missing parameter", "Add required parameter"],
                    ["13", "Busy", "Resource is busy, retry later"],
                    ["14", "No memory", "Router out of memory"],
                    ["15", "Not implemented", "Feature not available in this version"]
                  ]}
                />

                <Callout type="tip" title="Debug Mode">
                  Enable debug logging to see detailed error information:

                  <CodeBlock
                    language="bash"
                    code={`# Enable debug logging
/system logging add topics=api,debug action=memory

# View logs
/log print where topics~"api"

# Monitor in real-time
/log print follow`}
                  />
                </Callout>
              </section>

              {/* Debugging */}
              <section id="debugging" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Debugging Techniques</h2>

                <CodeBlock
                  title="Debug Script"
                  language="python"
                  code={`import logging
import time
from functools import wraps

# Configure detailed logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('api_debug.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def debug_api_call(func):
    """Decorator to debug API calls"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        logger.debug(f"Calling {func.__name__}")
        logger.debug(f"Args: {args}")
        logger.debug(f"Kwargs: {kwargs}")

        start_time = time.time()
        try:
            result = func(*args, **kwargs)
            elapsed = time.time() - start_time
            logger.debug(f"Completed in {elapsed:.3f}s")
            logger.debug(f"Result: {result}")
            return result
        except Exception as e:
            logger.error(f"Error in {func.__name__}: {e}", exc_info=True)
            raise

    return wrapper

class DebuggableAPIClient:
    def __init__(self, host, username, password):
        self.host = host
        self.username = username
        self.password = password
        self.connection = None
        self.stats = {
            'calls': 0,
            'errors': 0,
            'total_time': 0
        }

    def connect(self):
        """Connect with detailed logging"""
        logger.info(f"Connecting to {self.host}")
        try:
            # Connection logic here
            logger.info("Connected successfully")
            return True
        except Exception as e:
            logger.error(f"Connection failed: {e}")
            self.stats['errors'] += 1
            return False

    @debug_api_call
    def get_resource(self, path):
        """Get resource with debugging"""
        self.stats['calls'] += 1
        # API call logic here
        pass

    @debug_api_call
    def execute_command(self, command, params=None):
        """Execute command with debugging"""
        self.stats['calls'] += 1
        logger.info(f"Executing: {command}")
        if params:
            logger.debug(f"Params: {params}")

        try:
            # Command execution
            result = None  # Replace with actual API call
            logger.info(f"Command successful")
            return result
        except Exception as e:
            self.stats['errors'] += 1
            logger.error(f"Command failed: {e}")
            raise

    def print_stats(self):
        """Print debug statistics"""
        logger.info("=" * 50)
        logger.info("API Call Statistics")
        logger.info("=" * 50)
        logger.info(f"Total calls: {self.stats['calls']}")
        logger.info(f"Errors: {self.stats['errors']}")
        logger.info(f"Success rate: {(self.stats['calls'] - self.stats['errors'])/self.stats['calls']*100:.1f}%")
        logger.info(f"Average time: {self.stats['total_time']/self.stats['calls']:.3f}s")
        logger.info("=" * 50)`}
                />
              </section>

              {/* Security Checklist */}
              <section id="security-checklist" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Security Checklist</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card title="Authentication" icon={Lock}>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Use strong passwords (min 12 chars)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Enable password expiration (90 days)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Use certificate-based authentication</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Implement 2FA where possible</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Rotate API tokens regularly</span>
                      </li>
                    </ul>
                  </Card>

                  <Card title="Network Security" icon={Shield}>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Restrict API access by IP</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Use VPN for remote access</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Enable firewall rules for API port</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Disable unused services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Implement rate limiting</span>
                      </li>
                    </ul>
                  </Card>

                  <Card title="Application Security" icon={Code2}>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Validate all inputs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Handle errors gracefully</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Log all API activities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Implement connection pooling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Use retry logic with backoff</span>
                      </li>
                    </ul>
                  </Card>

                  <Card title="Monitoring & Auditing" icon={Eye}>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Enable detailed logging</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Monitor failed login attempts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Set up alerting for anomalies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Regular security audits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Review access logs weekly</span>
                      </li>
                    </ul>
                  </Card>
                </div>
              </section>

              {/* Monitoring Setup */}
              <section id="monitoring-setup" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Production Monitoring Setup</h2>

                <CodeBlock
                  title="Comprehensive Monitoring Configuration"
                  language="python"
                  code={`import time
import json
import psutil
from datetime import datetime, timedelta
from collections import deque
import threading
import statistics

class ProductionMonitor:
    def __init__(self, api_client, config):
        self.api = api_client
        self.config = config
        self.metrics_history = deque(maxlen=config.get('history_size', 1000))
        self.alerts = []
        self.monitoring_thread = None
        self.running = False

        # Alert thresholds
        self.thresholds = {
            'cpu': config.get('cpu_threshold', 80),
            'memory': config.get('memory_threshold', 85),
            'disk': config.get('disk_threshold', 90),
            'connections': config.get('connections_threshold', 10000),
            'interface_errors': config.get('error_threshold', 100),
            'temperature': config.get('temp_threshold', 70)
        }

    def start_monitoring(self, interval=60):
        """Start continuous monitoring"""
        self.running = True
        self.monitoring_thread = threading.Thread(
            target=self._monitoring_loop,
            args=(interval,)
        )
        self.monitoring_thread.start()
        print(f"Monitoring started with {interval}s interval")

    def stop_monitoring(self):
        """Stop monitoring"""
        self.running = False
        if self.monitoring_thread:
            self.monitoring_thread.join()
        print("Monitoring stopped")

    def _monitoring_loop(self, interval):
        """Main monitoring loop"""
        while self.running:
            try:
                metrics = self.collect_metrics()
                self.metrics_history.append({
                    'timestamp': datetime.now().isoformat(),
                    'metrics': metrics
                })

                alerts = self.check_thresholds(metrics)
                for alert in alerts:
                    self.handle_alert(alert)

                if self.config.get('store_metrics', False):
                    self.store_metrics(metrics)

                if self.config.get('push_to_graphite', False):
                    self.push_to_graphite(metrics)

                time.sleep(interval)

            except Exception as e:
                print(f"Monitoring error: {e}")
                time.sleep(interval * 2)

    def collect_metrics(self):
        """Collect comprehensive metrics"""
        metrics = {}

        try:
            # System resources
            resources = self.api.get_resource('/system/resource').get()[0]
            metrics['cpu'] = {
                'load': float(resources.get('cpu-load', 0)),
                'frequency': resources.get('cpu-frequency', 'N/A'),
                'core_count': resources.get('cpu-count', 1)
            }

            # Memory
            total_mem = int(resources.get('total-memory', 0))
            free_mem = int(resources.get('free-memory', 0))
            metrics['memory'] = {
                'total': total_mem,
                'free': free_mem,
                'used': total_mem - free_mem,
                'usage_percent': ((total_mem - free_mem) / total_mem * 100) if total_mem > 0 else 0
            }

            # Disk
            total_disk = int(resources.get('total-hdd-space', 0))
            free_disk = int(resources.get('free-hdd-space', 0))
            metrics['disk'] = {
                'total': total_disk,
                'free': free_disk,
                'used': total_disk - free_disk,
                'usage_percent': ((total_disk - free_disk) / total_disk * 100) if total_disk > 0 else 0
            }

            # Uptime
            metrics['uptime'] = resources.get('uptime', 'N/A')

            # Temperature (if available)
            try:
                health = self.api.get_resource('/system/health').get()[0]
                metrics['temperature'] = float(health.get('temperature', 0))
            except:
                metrics['temperature'] = None

            # Interface statistics
            interfaces = self.api.get_resource('/interface').get()
            metrics['interfaces'] = {}
            metrics['total_traffic'] = {'rx': 0, 'tx': 0}

            for iface in interfaces:
                name = iface['name']
                rx_bytes = int(iface.get('rx-byte', 0))
                tx_bytes = int(iface.get('tx-byte', 0))

                metrics['interfaces'][name] = {
                    'rx_bytes': rx_bytes,
                    'tx_bytes': tx_bytes,
                    'rx_packets': int(iface.get('rx-packet', 0)),
                    'tx_packets': int(iface.get('tx-packet', 0)),
                    'rx_errors': int(iface.get('rx-error', 0)),
                    'tx_errors': int(iface.get('tx-error', 0)),
                    'rx_drops': int(iface.get('rx-drop', 0)),
                    'tx_drops': int(iface.get('tx-drop', 0)),
                    'status': 'up' if not iface.get('disabled') and iface.get('running') else 'down'
                }

                metrics['total_traffic']['rx'] += rx_bytes
                metrics['total_traffic']['tx'] += tx_bytes

            # Connection tracking
            connections = self.api.get_resource('/ip/firewall/connection').get()
            metrics['connections'] = {
                'total': len(connections),
                'tcp': len([c for c in connections if c.get('protocol') == 'tcp']),
                'udp': len([c for c in connections if c.get('protocol') == 'udp']),
                'icmp': len([c for c in connections if c.get('protocol') == 'icmp'])
            }

            # DHCP leases
            leases = self.api.get_resource('/ip/dhcp-server/lease').get()
            metrics['dhcp'] = {
                'total': len(leases),
                'active': len([l for l in leases if l.get('status') == 'bound']),
                'static': len([l for l in leases if 'mac-address' in l and not l.get('dynamic')])
            }

            # Active users/sessions
            try:
                hotspot = self.api.get_resource('/ip/hotspot/active').get()
                metrics['hotspot_users'] = len(hotspot)
            except:
                metrics['hotspot_users'] = 0

            try:
                ppp = self.api.get_resource('/interface/pppoe-server/active').get()
                metrics['pppoe_sessions'] = len(ppp)
            except:
                metrics['pppoe_sessions'] = 0

            # Queue statistics
            queues = self.api.get_resource('/queue/simple').get()
            metrics['queues'] = {
                'total': len(queues),
                'rate_limited': len([q for q in queues if 'max-limit' in q])
            }

            # Calculate rates (if history exists)
            if self.metrics_history:
                last = self.metrics_history[-1]['metrics']
                time_diff = self._get_time_diff(last, metrics)

                if time_diff > 0:
                    # Traffic rates
                    for name, iface in metrics['interfaces'].items():
                        if name in last.get('interfaces', {}):
                            rx_rate = (iface['rx_bytes'] - last['interfaces'][name]['rx_bytes']) / time_diff
                            tx_rate = (iface['tx_bytes'] - last['interfaces'][name]['tx_bytes']) / time_diff
                            iface['rx_rate'] = rx_rate
                            iface['tx_rate'] = tx_rate

                    metrics['total_traffic']['rx_rate'] = (
                        metrics['total_traffic']['rx'] - last['total_traffic']['rx']
                    ) / time_diff
                    metrics['total_traffic']['tx_rate'] = (
                        metrics['total_traffic']['tx'] - last['total_traffic']['tx']
                    ) / time_diff

        except Exception as e:
            print(f"Error collecting metrics: {e}")
            metrics['error'] = str(e)

        return metrics

    def _get_time_diff(self, last_metrics, current_metrics):
        """Calculate time difference between metric collections"""
        try:
            last_time = datetime.fromisoformat(last_metrics['timestamp'])
            current_time = datetime.fromisoformat(current_metrics['timestamp'])
            return (current_time - last_time).total_seconds()
        except:
            return 60  # Default to interval

    def check_thresholds(self, metrics):
        """Check metrics against thresholds"""
        alerts = []

        # CPU threshold
        if metrics.get('cpu', {}).get('load', 0) > self.thresholds['cpu']:
            alerts.append({
                'severity': 'warning',
                'type': 'high_cpu',
                'value': metrics['cpu']['load'],
                'threshold': self.thresholds['cpu'],
                'message': f"CPU load is {metrics['cpu']['load']}% (threshold: {self.thresholds['cpu']}%)"
            })

        # Memory threshold
        if metrics.get('memory', {}).get('usage_percent', 0) > self.thresholds['memory']:
            alerts.append({
                'severity': 'critical',
                'type': 'high_memory',
                'value': metrics['memory']['usage_percent'],
                'threshold': self.thresholds['memory'],
                'message': f"Memory usage is {metrics['memory']['usage_percent']:.1f}%"
            })

        # Disk threshold
        if metrics.get('disk', {}).get('usage_percent', 0) > self.thresholds['disk']:
            alerts.append({
                'severity': 'warning',
                'type': 'high_disk',
                'value': metrics['disk']['usage_percent'],
                'threshold': self.thresholds['disk'],
                'message': f"Disk usage is {metrics['disk']['usage_percent']:.1f}%"
            })

        # Connection threshold
        if metrics.get('connections', {}).get('total', 0) > self.thresholds['connections']:
            alerts.append({
                'severity': 'warning',
                'type': 'high_connections',
                'value': metrics['connections']['total'],
                'threshold': self.thresholds['connections'],
                'message': f"High connection count: {metrics['connections']['total']}"
            })

        # Temperature threshold
        temp = metrics.get('temperature')
        if temp and temp > self.thresholds['temperature']:
            alerts.append({
                'severity': 'critical',
                'type': 'high_temperature',
                'value': temp,
                'threshold': self.thresholds['temperature'],
                'message': f"High temperature: {temp}°C"
            })

        # Interface errors
        for name, iface in metrics.get('interfaces', {}).items():
            if iface.get('rx_errors', 0) > self.thresholds['interface_errors']:
                alerts.append({
                    'severity': 'warning',
                    'type': 'interface_errors',
                    'interface': name,
                    'value': iface['rx_errors'],
                    'threshold': self.thresholds['interface_errors'],
                    'message': f"High RX errors on {name}: {iface['rx_errors']}"
                })

            if iface.get('tx_errors', 0) > self.thresholds['interface_errors']:
                alerts.append({
                    'severity': 'warning',
                    'type': 'interface_errors',
                    'interface': name,
                    'value': iface['tx_errors'],
                    'threshold': self.thresholds['interface_errors'],
                    'message': f"High TX errors on {name}: {iface['tx_errors']}"
                })

            if iface.get('status') == 'down' and name not in ['lo', 'bridge']:
                alerts.append({
                    'severity': 'critical',
                    'type': 'interface_down',
                    'interface': name,
                    'message': f"Interface {name} is down"
                })

        return alerts

    def handle_alert(self, alert):
        """Handle generated alerts"""
        # Log alert
        print(f"ALERT [{alert['severity'].upper()}]: {alert['message']}")

        # Store alert
        self.alerts.append({
            'timestamp': datetime.now().isoformat(),
            **alert
        })

        # Send notifications based on severity
        if alert['severity'] == 'critical':
            self.send_critical_alert(alert)
        elif alert['severity'] == 'warning':
            self.send_warning_alert(alert)

        # Execute automated response if configured
        if self.config.get('auto_remediate', False):
            self.auto_remediate(alert)

    def send_critical_alert(self, alert):
        """Send critical alert via multiple channels"""
        # Email
        self.send_email(
            subject=f"CRITICAL: {alert['type']}",
            body=alert['message']
        )

        # SMS (if configured)
        if self.config.get('sms_enabled'):
            self.send_sms(alert['message'])

        # Slack/Discord webhook
        if self.config.get('webhook_url'):
            self.send_webhook({
                'severity': 'critical',
                'type': alert['type'],
                'message': alert['message'],
                'timestamp': datetime.now().isoformat()
            })

        # Push notification
        if self.config.get('pushover_enabled'):
            self.send_push_notification(alert)

    def send_warning_alert(self, alert):
        """Send warning alert"""
        # Log only for warnings
        self.log_to_file(alert)

        # Send email if configured
        if self.config.get('email_warnings', False):
            self.send_email(
                subject=f"WARNING: {alert['type']}",
                body=alert['message']
            )

    def auto_remediate(self, alert):
        """Attempt automatic remediation"""
        if alert['type'] == 'high_cpu':
            # Check for resource-intensive processes
            self.check_processes()
        elif alert['type'] == 'high_memory':
            # Clear cache if needed
            self.clear_cache()
        elif alert['type'] == 'interface_errors':
            # Reset interface if error rate too high
            self.reset_interface(alert['interface'])
        elif alert['type'] == 'interface_down':
            # Attempt to bring interface up
            self.enable_interface(alert['interface'])

    def generate_report(self, start_time=None, end_time=None):
        """Generate performance report"""
        if not start_time:
            start_time = datetime.now() - timedelta(days=1)
        if not end_time:
            end_time = datetime.now()

        # Filter metrics within time range
        relevant_metrics = [
            m for m in self.metrics_history
            if start_time <= datetime.fromisoformat(m['timestamp']) <= end_time
        ]

        if not relevant_metrics:
            return "No data available for the specified period"

        # Calculate statistics
        cpu_values = [m['metrics'].get('cpu', {}).get('load', 0) for m in relevant_metrics]
        memory_values = [m['metrics'].get('memory', {}).get('usage_percent', 0) for m in relevant_metrics]

        report = {
            'period': {
                'start': start_time.isoformat(),
                'end': end_time.isoformat(),
                'duration': str(end_time - start_time)
            },
            'system': {
                'cpu': {
                    'avg': statistics.mean(cpu_values),
                    'max': max(cpu_values),
                    'min': min(cpu_values),
                    'p95': sorted(cpu_values)[int(len(cpu_values) * 0.95)]
                },
                'memory': {
                    'avg': statistics.mean(memory_values),
                    'max': max(memory_values),
                    'min': min(memory_values)
                }
            },
            'traffic': {
                'total_rx': sum(m['metrics'].get('total_traffic', {}).get('rx', 0) for m in relevant_metrics),
                'total_tx': sum(m['metrics'].get('total_traffic', {}).get('tx', 0) for m in relevant_metrics),
                'avg_rx_rate': statistics.mean([
                    m['metrics'].get('total_traffic', {}).get('rx_rate', 0)
                    for m in relevant_metrics if 'rx_rate' in m['metrics'].get('total_traffic', {})
                ]),
                'avg_tx_rate': statistics.mean([
                    m['metrics'].get('total_traffic', {}).get('tx_rate', 0)
                    for m in relevant_metrics if 'tx_rate' in m['metrics'].get('total_traffic', {})
                ])
            },
            'alerts': {
                'total': len([a for a in self.alerts if start_time <= datetime.fromisoformat(a['timestamp']) <= end_time]),
                'critical': len([a for a in self.alerts if a.get('severity') == 'critical' and start_time <= datetime.fromisoformat(a['timestamp']) <= end_time]),
                'warning': len([a for a in self.alerts if a.get('severity') == 'warning' and start_time <= datetime.fromisoformat(a['timestamp']) <= end_time])
            },
            'availability': self.calculate_availability(relevant_metrics)
        }

        return report

    def calculate_availability(self, metrics):
        """Calculate system availability"""
        if not metrics:
            return 0

        # Check for critical failures in metrics
        failures = sum(1 for m in metrics if 'error' in m['metrics'])
        total = len(metrics)

        return ((total - failures) / total) * 100 if total > 0 else 100

# Usage
monitor = ProductionMonitor(api_client, {
    'cpu_threshold': 80,
    'memory_threshold': 85,
    'disk_threshold': 90,
    'error_threshold': 100,
    'temp_threshold': 70,
    'email_warnings': True,
    'auto_remediate': True,
    'webhook_url': 'https://hooks.slack.com/services/xxx/yyy/zzz'
})

# Start monitoring
monitor.start_monitoring(interval=30)

# Generate daily report
report = monitor.generate_report(
    start_time=datetime.now() - timedelta(days=1),
    end_time=datetime.now()
)
print(json.dumps(report, indent=2))`}
                />
              </section>

              {/* Bandwidth Monitor Example */}
              <section id="bandwidth-monitor" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Bandwidth Monitoring Dashboard</h2>

                <CodeBlock
                  title="Real-time Bandwidth Monitor"
                  language="python"
                  code={`import matplotlib.pyplot as plt
import numpy as np
from datetime import datetime
import pandas as pd

class BandwidthMonitor:
    def __init__(self, api_client):
        self.api = api_client
        self.data = pd.DataFrame(columns=['timestamp', 'interface', 'rx_rate', 'tx_rate'])

    def collect_traffic_data(self, duration=3600, interval=5):
        """Collect traffic data for specified duration"""
        end_time = datetime.now()
        start_time = end_time - timedelta(seconds=duration)

        # Get initial byte counters
        interfaces = self.api.get_resource('/interface').get()
        last_counters = {}

        for iface in interfaces:
            name = iface['name']
            last_counters[name] = {
                'rx_bytes': int(iface.get('rx-byte', 0)),
                'tx_bytes': int(iface.get('tx-byte', 0)),
                'time': datetime.now()
            }

        # Collect data points
        data_points = []
        while datetime.now() < end_time:
            time.sleep(interval)

            current = self.api.get_resource('/interface').get()
            now = datetime.now()

            for iface in current:
                name = iface['name']
                if name in last_counters:
                    rx_bytes = int(iface.get('rx-byte', 0))
                    tx_bytes = int(iface.get('tx-byte', 0))

                    time_diff = (now - last_counters[name]['time']).total_seconds()

                    rx_rate = (rx_bytes - last_counters[name]['rx_bytes']) / time_diff
                    tx_rate = (tx_bytes - last_counters[name]['tx_bytes']) / time_diff

                    data_points.append({
                        'timestamp': now,
                        'interface': name,
                        'rx_rate': rx_rate,
                        'tx_rate': tx_rate
                    })

                    last_counters[name] = {
                        'rx_bytes': rx_bytes,
                        'tx_bytes': tx_bytes,
                        'time': now
                    }

        self.data = pd.DataFrame(data_points)
        return self.data

    def plot_bandwidth(self, interface='ether1'):
        """Plot bandwidth usage for specific interface"""
        iface_data = self.data[self.data['interface'] == interface]

        fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 8))

        # RX Plot
        ax1.plot(iface_data['timestamp'], iface_data['rx_rate'] / 1000000, 'b-', label='RX')
        ax1.set_ylabel('RX Rate (Mbps)')
        ax1.set_title(f'Bandwidth Usage - {interface}')
        ax1.grid(True)
        ax1.legend()

        # TX Plot
        ax2.plot(iface_data['timestamp'], iface_data['tx_rate'] / 1000000, 'r-', label='TX')
        ax2.set_ylabel('TX Rate (Mbps)')
        ax2.set_xlabel('Time')
        ax2.grid(True)
        ax2.legend()

        plt.tight_layout()
        plt.savefig(f'bandwidth_{interface}_{datetime.now().strftime("%Y%m%d_%H%M%S")}.png')
        plt.show()

        # Statistics
        print(f"\nStatistics for {interface}:")
        print(f"Average RX Rate: {iface_data['rx_rate'].mean() / 1000000:.2f} Mbps")
        print(f"Peak RX Rate: {iface_data['rx_rate'].max() / 1000000:.2f} Mbps")
        print(f"Average TX Rate: {iface_data['tx_rate'].mean() / 1000000:.2f} Mbps")
        print(f"Peak TX Rate: {iface_data['tx_rate'].max() / 1000000:.2f} Mbps")

        # Total data transferred
        total_rx = (iface_data['rx_rate'] * interval).sum() / (8 * 1024**3)  # GB
        total_tx = (iface_data['tx_rate'] * interval).sum() / (8 * 1024**3)  # GB

        print(f"Total Downloaded: {total_rx:.2f} GB")
        print(f"Total Uploaded: {total_tx:.2f} GB")

    def top_talkers(self, top_n=10):
        """Identify top bandwidth users"""
        # Group by interface and sum traffic
        totals = self.data.groupby('interface').agg({
            'rx_rate': 'sum',
            'tx_rate': 'sum'
        }).reset_index()

        totals['total_rate'] = totals['rx_rate'] + totals['tx_rate']
        totals = totals.sort_values('total_rate', ascending=False).head(top_n)

        print(f"\nTop {top_n} Bandwidth Users:")
        print("-" * 60)
        print(f"{'Interface':<20} {'RX Rate (Mbps)':<15} {'TX Rate (Mbps)':<15} {'Total (Mbps)':<15}")
        print("-" * 60)

        for _, row in totals.iterrows():
            print(f"{row['interface']:<20} {row['rx_rate']/1000000:<15.2f} {row['tx_rate']/1000000:<15.2f} {row['total_rate']/1000000:<15.2f}")

    def detect_anomalies(self, threshold=3):
        """Detect bandwidth anomalies using statistical methods"""
        anomalies = []

        for interface in self.data['interface'].unique():
            iface_data = self.data[self.data['interface'] == interface]

            rx_mean = iface_data['rx_rate'].mean()
            rx_std = iface_data['rx_rate'].std()

            tx_mean = iface_data['tx_rate'].mean()
            tx_std = iface_data['tx_rate'].std()

            # Find points beyond threshold standard deviations
            rx_anomalies = iface_data[
                np.abs(iface_data['rx_rate'] - rx_mean) > threshold * rx_std
            ]

            tx_anomalies = iface_data[
                np.abs(iface_data['tx_rate'] - tx_mean) > threshold * tx_std
            ]

            for _, row in rx_anomalies.iterrows():
                anomalies.append({
                    'timestamp': row['timestamp'],
                    'interface': interface,
                    'direction': 'RX',
                    'rate': row['rx_rate'] / 1000000,
                    'expected': rx_mean / 1000000
                })

            for _, row in tx_anomalies.iterrows():
                anomalies.append({
                    'timestamp': row['timestamp'],
                    'interface': interface,
                    'direction': 'TX',
                    'rate': row['tx_rate'] / 1000000,
                    'expected': tx_mean / 1000000
                })

        return anomalies

# Usage
monitor = BandwidthMonitor(api_client)

# Collect data for 1 hour
data = monitor.collect_traffic_data(duration=3600, interval=10)

# Plot bandwidth for main interface
monitor.plot_bandwidth('ether1')

# Show top bandwidth users
monitor.top_talkers(top_n=5)

# Detect anomalies
anomalies = monitor.detect_anomalies(threshold=3)
for anomaly in anomalies:
    print(f"Anomaly detected: {anomaly['interface']} {anomaly['direction']} "
          f"rate {anomaly['rate']:.2f} Mbps (expected {anomaly['expected']:.2f} Mbps)")`}
                />
              </section>

              {/* Additional Resources */}
              <section id="resources" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Additional Resources</h2>

                <Grid>
                  <Card title="Official Documentation" icon={BookOpen}>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          MikroTik RouterOS Manual
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          API Documentation
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          REST API Guide (v7+)
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          CHR Download
                        </a>
                      </li>
                    </ul>
                  </Card>

                  <Card title="Community" icon={Users}>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          MikroTik Forum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Reddit r/mikrotik
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Stack Overflow
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Discord / Telegram
                        </a>
                      </li>
                    </ul>
                  </Card>

                  <Card title="Tools" icon={Terminal}>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          WinBox
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          The Dude
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          RouterOS CHR
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          API Client Libraries
                        </a>
                      </li>
                    </ul>
                  </Card>

                  <Card title="Books & Training" icon={GraduationCap}>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          RouterOS by Example
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          MTCNA Certification Guide
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Advanced Routing with RouterOS
                        </a>
                      </li>
                    </ul>
                  </Card>
                </Grid>
              </section>

              {/* Conclusion */}
              <section id="conclusion" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Conclusion</h2>

                <div className="bg-gray-800/50 border border-gray-800 rounded-lg p-8">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    The MikroTik RouterOS API provides a powerful and flexible interface for network automation,
                    monitoring, and integration. By following this guide, you've learned how to:
                  </p>

                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Securely enable and configure API services</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Implement proper authentication and authorization</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Build robust API clients in multiple languages</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Monitor network performance in real-time</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Automate configuration management and backups</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Integrate with external systems and cloud services</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Set up high availability and load balancing</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Practice security hardening and monitoring</span>
                    </li>
                  </ul>

                  <p className="text-gray-300 leading-relaxed mb-4">
                    Remember to always follow security best practices, implement proper error handling,
                    and test thoroughly in a lab environment before deploying to production.
                  </p>

                  <p className="text-gray-300 leading-relaxed mb-6">
                    With the power of RouterOS API, you can build sophisticated network automation solutions
                    that scale from small home offices to large enterprise networks. The virtual lab setup
                    using CHR allows you to experiment and learn without physical hardware investment.
                  </p>

                  <div className="flex flex-wrap gap-4 mt-6">
                    <Link
                      href="/resources/mikrotik/cheat-sheet"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 hover:bg-green-500/20 transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      <span>View API Cheat Sheet</span>
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-lg text-gray-300 hover:text-green-500 hover:border-green-500/20 transition-colors"
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span>Need Help?</span>
                    </Link>

                    <a
                      href="https://mikrotik.com/download"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-lg text-gray-300 hover:text-green-500 hover:border-green-500/20 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download CHR</span>
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </article>

          {/* Right Sidebar - Highlights */}
          {showHighlights && (
            <aside className="w-80 hidden xl:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
              <div className="pl-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-green-500" />
                    <span>Highlights & Tips</span>
                  </h3>
                  <button
                    onClick={() => setShowHighlights(false)}
                    className="p-1 hover:bg-green-500/10 rounded transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                    <input
                      type="text"
                      placeholder="Filter highlights..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-green-500/50"
                    />
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategories(prev =>
                      prev.includes('tip') ? prev.filter(c => c !== 'tip') : [...prev, 'tip']
                    )}
                    className={`px-2 py-1 rounded-full text-xs font-mono transition-colors ${selectedCategories.includes('tip')
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'bg-gray-900 text-gray-400 border border-gray-800'
                      }`}
                  >
                    💡 Tips
                  </button>
                  <button
                    onClick={() => setSelectedCategories(prev =>
                      prev.includes('warning') ? prev.filter(c => c !== 'warning') : [...prev, 'warning']
                    )}
                    className={`px-2 py-1 rounded-full text-xs font-mono transition-colors ${selectedCategories.includes('warning')
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-gray-900 text-gray-400 border border-gray-800'
                      }`}
                  >
                    ⚠️ Warnings
                  </button>
                  <button
                    onClick={() => setSelectedCategories(prev =>
                      prev.includes('note') ? prev.filter(c => c !== 'note') : [...prev, 'note']
                    )}
                    className={`px-2 py-1 rounded-full text-xs font-mono transition-colors ${selectedCategories.includes('note')
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-gray-900 text-gray-400 border border-gray-800'
                      }`}
                  >
                    📝 Notes
                  </button>
                  <button
                    onClick={() => setSelectedCategories(prev =>
                      prev.includes('best-practice') ? prev.filter(c => c !== 'best-practice') : [...prev, 'best-practice']
                    )}
                    className={`px-2 py-1 rounded-full text-xs font-mono transition-colors ${selectedCategories.includes('best-practice')
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-gray-900 text-gray-400 border border-gray-800'
                      }`}
                  >
                    ✅ Best Practices
                  </button>
                </div>

                <div className="space-y-3">
                  {filteredHighlights.map((highlight) => (
                    <HighlightCard key={highlight.id} highlight={highlight} />
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-gradient-to-br from-green-500/5 to-blue-500/5 border border-green-500/10">
                  <h4 className="font-mono text-sm font-semibold text-green-500 mb-2 flex items-center gap-2">
                    <Rocket className="h-4 w-4" />
                    Quick Stats
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li className="flex justify-between">
                      <span>API Ports:</span>
                      <span className="font-mono text-green-500">8728 (TCP), 8729 (SSL)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Max Connections:</span>
                      <span className="font-mono text-green-500">100 default</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Idle Timeout:</span>
                      <span className="font-mono text-green-500">30s</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Auth Methods:</span>
                      <span className="font-mono text-green-500">6</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Code Examples:</span>
                      <span className="font-mono text-green-500">15+</span>
                    </li>
                    <li className="flex justify-between">
                      <span>CHR Download:</span>
                      <span className="font-mono text-green-500">Free</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Last updated: March 2024
                    <br />
                    RouterOS v7 compatible
                  </p>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
