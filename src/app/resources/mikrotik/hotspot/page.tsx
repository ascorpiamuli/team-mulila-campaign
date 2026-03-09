"use client";
// src/app/resources/mikrotik/hotspot-setup/page.tsx
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
  Menu as MenuIcon,
  SwitchCamera,
  Share2,
  Split,
  Combine,
  GitMerge,
  GitBranch as GitBranchIcon,
  Workflow,
  Waypoints,
  EthernetPort,
  Smartphone,
  Tablet,
  Laptop,
  QrCode,
  CreditCard,
  Ticket,
  Percent,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  Wallet,
  ShoppingCart,
  Store,
  Users2,
  UserPlus,
  UserCheck,
  UserX,
  UserCog,
  Fingerprint as FingerprintIcon2,
  KeyRound,
  LockKeyhole,
  UnlockKeyhole,
  LogIn,
  LogOut,
  Wifi as WifiIcon,
  WifiHigh as WifiHighIcon,
  WifiLow as WifiLowIcon,
  WifiZero as WifiZeroIcon,
  Signal as SignalIcon,
  SignalHigh as SignalHighIcon,
  SignalLow as SignalLowIcon,
  SignalMedium as SignalMediumIcon,
  SignalZero as SignalZeroIcon,
  Timer,
  Mail,
  Hotel,
  TreeDeciduous
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
    title: "Introduction to HotSpot",
    icon: Wifi,
    subsections: [
      { id: "what-is-hotspot", title: "What is HotSpot?" },
      { id: "features", title: "HotSpot Features" },
      { id: "use-cases", title: "Use Cases" },
      { id: "how-it-works", title: "How It Works" }
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
    id: "basic-setup",
    title: "Basic HotSpot Setup",
    icon: Power,
    subsections: [
      { id: "wizard-setup", title: "Using Setup Wizard" },
      { id: "manual-setup", title: "Manual Configuration" },
      { id: "verify-setup", title: "Verifying HotSpot" },
      { id: "first-login", title: "First User Login" }
    ]
  },
  {
    id: "authentication",
    title: "Authentication Methods",
    icon: Key,
    subsections: [
      { id: "http-chap", title: "HTTP CHAP" },
      { id: "http-pap", title: "HTTP PAP" },
      { id: "https", title: "HTTPS" },
      { id: "mac-auth", title: "MAC Authentication" },
      { id: "cookie-auth", title: "Cookie Authentication" },
      { id: "trial-auth", title: "Trial Authentication" }
    ]
  },
  {
    id: "user-management",
    title: "User Management",
    icon: Users,
    subsections: [
      { id: "local-users", title: "Local Users" },
      { id: "user-profiles", title: "User Profiles" },
      { id: "limitations", title: "Setting Limitations" },
      { id: "vouchers", title: "Voucher System" },
      { id: "user-monitoring", title: "Monitoring Users" }
    ]
  },
  {
    id: "radius-integration",
    title: "RADIUS Integration",
    icon: Database,
    subsections: [
      { id: "radius-setup", title: "RADIUS Server Setup" },
      { id: "radius-profile", title: "HotSpot Profile with RADIUS" },
      { id: "radius-accounting", title: "RADIUS Accounting" },
      { id: "radius-attributes", title: "RADIUS Attributes" }
    ]
  },
  {
    id: "user-manager",
    title: "User Manager",
    icon: UserCog,
    subsections: [
      { id: "install-um", title: "Installing User Manager" },
      { id: "um-config", title: "Basic Configuration" },
      { id: "um-profiles", title: "Profiles & Limitations" },
      { id: "um-users", title: "Creating Users" },
      { id: "um-vouchers", title: "Voucher Management" },
      { id: "um-backup", title: "Backup & Restore" }
    ]
  },
  {
    id: "customization",
    title: "Customizing HotSpot Pages",
    icon: Brush,
    subsections: [
      { id: "html-pages", title: "HotSpot HTML Pages" },
      { id: "login-page", title: "Custom Login Page" },
      { id: "status-page", title: "Status Page" },
      { id: "logout-page", title: "Logout Page" },
      { id: "css-styling", title: "CSS Styling" },
      { id: "mobile-responsive", title: "Mobile Responsive Design" }
    ]
  },
  {
    id: "walled-garden",
    title: "Walled Garden",
    icon: Lock,
    subsections: [
      { id: "what-is-walled-garden", title: "What is Walled Garden?" },
      { id: "configuring-wg", title: "Configuring Walled Garden" },
      { id: "bypass-hosts", title: "Bypassing for Specific Hosts" },
      { id: "advertising", title: "Advertising with Walled Garden" }
    ]
  },
  {
    id: "ip-binding",
    title: "IP Binding",
    icon: EthernetPort,
    subsections: [
      { id: "binding-types", title: "Binding Types" },
      { id: "regular-bind", title: "Regular (NAT)" },
      { id: "bypassed-bind", title: "Bypassed" },
      { id: "blocked-bind", title: "Blocked" },
      { id: "use-cases-bind", title: "Use Cases" }
    ]
  },
  {
    id: "bandwidth-management",
    title: "Bandwidth Management",
    icon: Gauge,
    subsections: [
      { id: "rate-limiting", title: "Rate Limiting" },
      { id: "queue-setup", title: "Queue Configuration" },
      { id: "pcq-hotspot", title: "PCQ for HotSpot" },
      { id: "bursting", title: "Burst Configuration" }
    ]
  },
  {
    id: "advanced-topics",
    title: "Advanced Topics",
    icon: Rocket,
    subsections: [
      { id: "hotspot-ssl", title: "SSL/HTTPS Setup" },
      { id: "hotspot-ipv6", title: "IPv6 Considerations" },
      { id: "load-balancing", title: "Load Balancing Issues" },
      { id: "hotspot-bridge", title: "HotSpot on Bridge" },
      { id: "multiple-servers", title: "Multiple HotSpot Servers" }
    ]
  },
  {
    id: "monitoring",
    title: "Monitoring & Troubleshooting",
    icon: Activity,
    subsections: [
      { id: "active-users", title: "Active Users" },
      { id: "host-table", title: "Host Table" },
      { id: "logs", title: "Logs & Debugging" },
      { id: "common-issues", title: "Common Issues & Solutions" },
      { id: "performance", title: "Performance Optimization" }
    ]
  },
  {
    id: "automation",
    title: "HotSpot Automation",
    icon: Code2,
    subsections: [
      { id: "api-hotspot", title: "HotSpot via API" },
      { id: "scripts", title: "RouterOS Scripts" },
      { id: "scheduler", title: "Scheduled Tasks" },
      { id: "email-notifications", title: "Email Notifications" },
      { id: "sms-integration", title: "SMS Integration" }
    ]
  },
  {
    id: "examples",
    title: "Real-World Examples",
    icon: GitBranch,
    subsections: [
      { id: "cafe-wifi", title: "Café WiFi Setup" },
      { id: "hotel-guest", title: "Hotel Guest Network" },
      { id: "university", title: "University Campus" },
      { id: "public-park", title: "Public Park HotSpot" },
      { id: "events", title: "Event/Temporary HotSpot" }
    ]
  },
  {
    id: "resources",
    title: "Resources",
    icon: Database,
    subsections: [
      { id: "official-docs", title: "Official Documentation" },
      { id: "community", title: "Community Resources" },
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
    id: "hotspot-wizard",
    title: "⚡ Use HotSpot Wizard First",
    description: "Always start with the setup wizard for error-free initial configuration, then customize manually.",
    category: "tip",
    icon: Rocket
  },
  {
    id: "ssl-certificate",
    title: "🔐 Enable HTTPS Login",
    description: "Use SSL certificates to encrypt login credentials and prevent password sniffing.",
    category: "best-practice",
    icon: Lock
  },
  {
    id: "routing-limitation",
    title: "⚠️ PCC Not Compatible",
    description: "HotSpot uses web-proxy and only works with default routing table - PCC load balancing not supported.",
    category: "warning",
    icon: AlertTriangle
  },
  {
    id: "cookie-auth",
    title: "🍪 Cookie Authentication",
    description: "Enable cookies for returning users to auto-login without re-entering credentials.",
    category: "tip",
    icon: Key
  },
  {
    id: "walled-garden",
    title: "🏡 Walled Garden Benefits",
    description: "Use walled garden to allow free access to specific sites (support, social media) before login.",
    category: "best-practice",
    icon: Lock
  },
  {
    id: "user-manager",
    title: "📊 User Manager for Vouchers",
    description: "Install User Manager package for professional voucher-based hotspot systems.",
    category: "tip",
    icon: Ticket
  },
  {
    id: "mac-auth",
    title: "📱 MAC Authentication",
    description: "Great for IoT devices or trusted users - automatically authenticates known MAC addresses.",
    category: "tip",
    icon: Fingerprint
  },
  {
    id: "login-page-not-showing",
    title: "❌ Login Page Not Showing?",
    description: "Check DNS settings, clear browser cache, or try another browser - common issue with cached pages.",
    category: "note",
    icon: HelpCircle
  },
  {
    id: "radius-backup",
    title: "🔄 Always Backup RADIUS",
    description: "Configure at least two RADIUS servers for redundancy in production environments.",
    category: "best-practice",
    icon: Database
  },
  {
    id: "trial-users",
    title: "⏱️ Trial Access Strategy",
    description: "Offer 30-minute trial to let users test speed before purchasing vouchers.",
    category: "tip",
    icon: Clock
  },
  {
    id: "html-customization",
    title: "🎨 Customize Login Page",
    description: "Edit HTML files in the hotspot directory via FTP to match your brand identity.",
    category: "tip",
    icon: Brush
  },
  {
    id: "idle-timeout",
    title: "⏰ Set Idle Timeout",
    description: "Configure idle-timeout to free up resources when users disconnect without logging out.",
    category: "best-practice",
    icon: Timer
  },
  {
    id: "rate-limiting",
    title: "🚦 Rate Limit Fairness",
    description: "Use PCQ or simple queues to ensure fair bandwidth distribution among users.",
    category: "best-practice",
    icon: Gauge
  },
  {
    id: "device-mode",
    title: "📱 Check Device Mode",
    description: "HotSpot may be blocked by device-mode - verify it's enabled in system/device-mode.",
    category: "note",
    icon: Settings
  },
  {
    id: "smtp-redirect",
    title: "📧 SMTP Redirect",
    description: "Redirect SMTP traffic to your server to prevent spam from infected client devices.",
    category: "tip",
    icon: Mail
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
        <h3 className="font-mono text-lg font-semibold text-green-500 mb-2">Test HotSpot in Virtual Lab 🧪</h3>
        <p className="text-gray-300 mb-4">
          Use MikroTik CHR in VirtualBox to test HotSpot configurations before deploying to production:
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-300">Multiple SSIDs</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-300">RADIUS Testing</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-300">User Manager</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-300">Custom Pages</span>
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
            Download CHR
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

const Diagram = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="my-6 p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
    <h4 className="text-sm font-mono text-green-500 mb-3">{title}</h4>
    <div className="font-mono text-xs text-gray-300 whitespace-pre">
      {children}
    </div>
  </div>
);

export default function MikroTikHotspotPage() {
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
              <span className="text-green-500 truncate">HotSpot Setup</span>
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
                    <span>Default Port: 80 (HTTP), 443 (HTTPS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Auth Methods: CHAP, PAP, HTTPS, MAC, Cookie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Idle Timeout: 5 minutes (default)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>HTML Directory: /hotspot</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>RADIUS Ports: 1812 (Auth), 1813 (Acct)</span>
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
                  <Wifi className="h-5 w-5" />
                  Introduction to HotSpot
                </h2>

                <section id="what-is-hotspot" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">What is HotSpot?</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    The MikroTik HotSpot Gateway provides authentication for clients before granting access to public networks [citation:1].
                    It's a captive portal system that intercepts HTTP requests from clients and redirects them to a login page where they must authenticate before accessing the internet [citation:5].
                  </p>

                  <Diagram title="HotSpot Flow Diagram">
                    {`┌─────────┐      ┌─────────┐      ┌─────────┐      ┌─────────┐
│ Client  │─────▶│ HotSpot │─────▶│  Login  │─────▶│Internet │
│Connects │      │Captures │      │  Page   │      │ Access  │
└─────────┘      └─────────┘      └─────────┘      └─────────┘
    │                 │                 │                 │
    │                 │                 │                 │
    ▼                 ▼                 ▼                 ▼
No Internet    Redirect to      User enters     Access
              Login Page       Credentials      Granted`}
                  </Diagram>
                </section>

                <section id="features" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">HotSpot Gateway Features</h3>

                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">Different authentication methods</span> - Local user database or remote RADIUS server [citation:1]</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">User accounting</span> - Track usage in local database or on RADIUS [citation:1]</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">Walled garden</span> - Allow access to specific web pages without authorization [citation:1]</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">Customizable login pages</span> - Modify HTML/CSS to match your brand [citation:1]</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">IP address translation</span> - Automatically change client IP to valid address [citation:1]</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">RFC7710 support</span> - Inform DHCP clients they're behind a captive portal [citation:1]</span>
                    </li>
                  </ul>

                  <Callout type="warning" title="IPv4 Only">
                    HotSpot relies on Firewall NAT rules which currently are not supported for IPv6. It can work reliably only when IPv4 is used [citation:1].
                  </Callout>
                </section>

                <section id="use-cases" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Common Use Cases</h3>

                  <Grid>
                    <Card title="Cafés & Restaurants" icon={Coffee}>
                      <p className="text-sm">Provide free WiFi with login page, collect customer emails, and offer time-based access.</p>
                    </Card>

                    <Card title="Hotels" icon={Hotel}>
                      <p className="text-sm">Guest WiFi with voucher system, bandwidth limits per room, and RADIUS integration.</p>
                    </Card>

                    <Card title="Universities" icon={GraduationCap}>
                      <p className="text-sm">Student and staff access with different profiles, time limits, and usage tracking.</p>
                    </Card>

                    <Card title="Public Parks" icon={TreeDeciduous}>
                      <p className="text-sm">Free public WiFi with acceptable use policy and session time limits.</p>
                    </Card>

                    <Card title="Events & Conferences" icon={Calendar}>
                      <p className="text-sm">Temporary hotspots with day passes and sponsor pages in walled garden.</p>
                    </Card>

                    <Card title="Airports" icon={Plane}>
                      <p className="text-sm">Paid WiFi with credit card integration, time-based packages, and multi-language support.</p>
                    </Card>
                  </Grid>
                </section>
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
                      <li>• MikroTik router with at least 2 Ethernet ports</li>
                      <li>• Wireless interface (for WiFi hotspots)</li>
                      <li>• Minimum 64MB RAM (128MB+ recommended) [citation:6]</li>
                      <li>• Sufficient storage for logs and User Manager</li>
                    </ul>
                  </Card>

                  <Card title="Software" icon={Terminal}>
                    <ul className="space-y-1 text-sm">
                      <li>• RouterOS v6.0+ (v7.11.2+ recommended) [citation:6]</li>
                      <li>• User Manager package (for voucher systems)</li>
                      <li>• WinBox for GUI configuration</li>
                      <li>• FTP client for uploading custom pages</li>
                    </ul>
                  </Card>

                  <Card title="Knowledge" icon={GraduationCap}>
                    <ul className="space-y-1 text-sm">
                      <li>• Basic networking concepts</li>
                      <li>• IP addressing and DHCP</li>
                      <li>• RouterOS CLI familiarity</li>
                      <li>• HTML/CSS basics (for customization)</li>
                    </ul>
                  </Card>
                </Grid>

                <VirtualLabCard />

                <Callout type="info" title="Device Mode Check">
                  HotSpot functionality could be blocked by the device-mode. Prior to configuring HotSpot make sure that it is enabled in <code className="text-green-500">/system/device-mode</code> [citation:5].
                </Callout>
              </section>

              {/* Virtual Lab Setup */}
              <section id="virtual-lab-setup" className="mb-12 scroll-mt-20">
                <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Setting Up HotSpot Lab in CHR</h3>

                <Step number={1} title="Install CHR in VirtualBox">
                  <CodeBlock
                    title="Create Virtual Machine with Multiple Interfaces"
                    language="bash"
                    code={`# Create VM
VBoxManage createvm --name "MikroTik-HotSpot-Lab" --ostype "Linux_64" --register

# Configure VM with 3 network adapters
VBoxManage modifyvm "MikroTik-HotSpot-Lab" --memory 512 --cpus 2
VBoxManage modifyvm "MikroTik-HotSpot-Lab" --nic1 nat          # WAN (internet)
VBoxManage modifyvm "MikroTik-HotSpot-Lab" --nic2 intnet       # HotSpot LAN
VBoxManage modifyvm "MikroTik-HotSpot-Lab" --nic3 intnet       # Management

# Create internal networks
VBoxManage modifyvm "MikroTik-HotSpot-Lab" --intnet2 "hotspot-lan"
VBoxManage modifyvm "MikroTik-HotSpot-Lab" --intnet3 "mgmt-lan"`}
                  />
                </Step>

                <Step number={2} title="Basic CHR Configuration">
                  <CodeBlock
                    language="bash"
                    code={`# Set interface names for clarity
/interface set ether1 name=wan
/interface set ether2 name=hotspot-lan
/interface set ether3 name=mgmt

# Configure WAN (assuming NAT network)
/ip dhcp-client add interface=wan disabled=no

# Verify internet connectivity
/ping 8.8.8.8

# Set router identity
/system identity set name=HotSpot-Router`}
                  />
                </Step>
              </section>

              {/* Basic HotSpot Setup */}
              <section id="basic-setup" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Basic HotSpot Setup</h2>

                <section id="wizard-setup" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Using the Setup Wizard</h3>

                  <p className="text-gray-300 mb-4">
                    The easiest way to set up HotSpot is using the built-in setup wizard. This automatically configures DHCP, NAT, and creates the necessary firewall rules [citation:1].
                  </p>

                  <CodeBlock
                    title="HotSpot Setup Wizard"
                    language="bash"
                    code={`[admin@MikroTik] /ip hotspot> setup
Select interface to run HotSpot on
hotspot interface: hotspot-lan

Set HotSpot address for interface
local address of network: 10.5.50.1/24
masquerade network: yes

Set pool for HotSpot addresses
address pool of network: 10.5.50.2-10.5.50.254

Select hotspot SSL certificate
select certificate: none

Select SMTP server
ip address of smtp server: 0.0.0.0

Setup DNS configuration
dns servers: 8.8.8.8,8.8.4.4

DNS name of local hotspot server
dns name: hotspot.local

Create local hotspot user
name of local hotspot user: admin
password for the user: ********

[admin@MikroTik] /ip hotspot>`}
                  />
                </section>

                <section id="verify-setup" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Verifying the Setup</h3>

                  <p className="text-gray-300 mb-4">
                    After running the wizard, verify that all components are configured correctly [citation:1]:
                  </p>

                  <CodeBlock
                    title="Check HotSpot Configuration"
                    language="bash"
                    code={`# Check HotSpot server
/ip hotspot print
Flags: X - disabled, I - invalid, S - HTTPS
 #   NAME       INTERFACE   ADDRESS-POOL   PROFILE   IDLE-TIMEOUT
 0   hotspot1   hotspot-lan hs-pool-1       hsprof1   5m

# Check IP pool
/ip pool print
 #   NAME       RANGES
 0   hs-pool-1  10.5.50.2-10.5.50.254

# Check DHCP server
/ip dhcp-server print
Flags: X - disabled, I - invalid
 #   NAME       INTERFACE   RELAY   ADDRESS-POOL   LEASE-TIME
 0   dhcp1      hotspot-lan         hs-pool-1      1h

# Check NAT rules
/ip firewall nat print
Flags: X - disabled, I - invalid, D - dynamic
 0   ;;; masquerade hotspot network
     chain=srcnat action=masquerade src-address=10.5.50.0/24`}
                  />
                </section>

                <section id="first-login" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Testing First User Login</h3>

                  <p className="text-gray-300 mb-4">
                    Connect a client device to the hotspot network (via WiFi or wired). Open a browser - you should be redirected to the login page.
                  </p>

                  <CodeBlock
                    title="Create Additional Test Users"
                    language="bash"
                    code={`# Add test users
/ip hotspot user
add name=guest1 password=guest123 profile=default
add name=guest2 password=guest123 profile=default
add name=testuser password=test123 profile=default

# View all hotspot users
/ip hotspot user print
Flags: X - disabled, I - inactive, R - radius, D - dynamic
 #   NAME       PROFILE    UPTIME   BYTES-IN   BYTES-OUT   PKTS-IN   PKTS-OUT
 0   guest1     default
 1   guest2     default
 2   testuser   default`}
                  />
                </section>

                <section id="manual-setup" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Manual Configuration</h3>

                  <p className="text-gray-300 mb-4">
                    For advanced setups or to understand the components, you can configure HotSpot manually [citation:9]:
                  </p>

                  <CodeBlock
                    title="Manual HotSpot Configuration"
                    language="bash"
                    code={`# 1. Create IP pool
/ip pool add name=hotspot-pool ranges=192.168.100.2-192.168.100.254

# 2. Create HotSpot profile
/ip hotspot profile add name=hs-profile1 hotspot-address=192.168.100.1

# 3. Create HotSpot server
/ip hotspot add name=hotspot1 interface=hotspot-lan \
    address-pool=hotspot-pool profile=hs-profile1

# 4. Configure DHCP server
/ip dhcp-server add name=dhcp-hotspot interface=hotspot-lan \
    address-pool=hotspot-pool lease-time=1h

# 5. Add NAT masquerade
/ip firewall nat add chain=srcnat src-address=192.168.100.0/24 \
    action=masquerade

# 6. Add HotSpot users
/ip hotspot user add name=customer1 password=pass123
/ip hotspot user add name=customer2 password=pass456`}
                  />
                </section>
              </section>

              {/* Authentication Methods */}
              <section id="authentication" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Authentication Methods</h2>

                <p className="text-gray-300 mb-4">
                  HotSpot supports multiple authentication methods that can be enabled in the server profile [citation:10]:
                </p>

                <Table
                  headers={["Method", "Description", "Security", "Use Case"]}
                  rows={[
                    ["HTTP CHAP", "Challenge-Handshake with MD5 hashing", "Medium", "Default, good balance of security"],
                    ["HTTP PAP", "Plain text password transmission", "Low", "Legacy systems, testing"],
                    ["HTTPS", "Encrypted SSL/TLS tunnel", "High", "Production, sensitive credentials"],
                    ["MAC", "Auto-auth by MAC address", "Medium", "Trusted devices, IoT"],
                    ["Cookie", "Auto-login using browser cookie", "Medium", "Returning users"],
                    ["Trial", "Time-limited free access", "Low", "Guest trials, promotions"]
                  ]}
                />

                <CodeBlock
                  title="Configure Authentication Methods"
                  language="bash"
                  code={`# Edit hotspot profile
/ip hotspot profile set [find] \
    login-by=http-chap,cookie,https,mac \
    http-cookie-lifetime=3d \
    trial-uptime=30m/1d

# View profile settings
/ip hotspot profile print detail

# Enable MAC authentication with password
/ip hotspot profile set [find] mac-auth-password=hotspot123`}
                />

                <Callout type="info" title="Cookie Authentication">
                  HTTP cookie is generated when user authenticates for the first time. User is not asked for login/password on subsequent visits until cookie-lifetime expires (default 3 days) [citation:10].
                </Callout>
              </section>

              {/* User Management */}
              <section id="user-management" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">User Management</h2>

                <section id="local-users" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Local Users</h3>

                  <CodeBlock
                    title="Managing Local HotSpot Users"
                    language="bash"
                    code={`# Add users with different profiles
/ip hotspot user
add name=john password=123456 profile=default
add name=jane password=654321 profile=vip
add name=guest password=guest profile=limited

# Add user with expiration
add name=temporary password=temp123 profile=default \
    limit-uptime=2h comment="2-hour trial"

# Add user with data limits
add name=limited-user password=pass123 profile=default \
    limit-bytes-total=500M comment="500MB total"

# List users
/ip hotspot user print

# Remove user
/ip hotspot user remove [find name=john]`}
                  />
                </section>

                <section id="user-profiles" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">User Profiles</h3>

                  <p className="text-gray-300 mb-4">
                    User profiles define limitations and settings applied to users [citation:10]:
                  </p>

                  <CodeBlock
                    title="Create User Profiles"
                    language="bash"
                    code={`# Create different user profiles
/ip hotspot user profile
add name=basic \
    idle-timeout=15m \
    keepalive-timeout=2m \
    shared-users=1 \
    status-autorefresh=1m

add name=premium \
    idle-timeout=30m \
    keepalive-timeout=10m \
    shared-users=3 \
    status-autorefresh=30s \
    rate-limit="2M/1M"

add name=unlimited \
    idle-timeout=none \
    keepalive-timeout=none \
    shared-users=5 \
    rate-limit="0/0"

# Apply profile to users
/ip hotspot user set [find name=guest] profile=basic
/ip hotspot user set [find name=jane] profile=premium`}
                  />
                </section>

                <section id="limitations" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Setting User Limitations</h3>

                  <Table
                    headers={["Parameter", "Description", "Example"]}
                    rows={[
                      ["limit-uptime", "Maximum session time", "2h (2 hours)"],
                      ["limit-bytes-total", "Total data limit", "1G (1 gigabyte)"],
                      ["limit-bytes-in", "Download limit", "500M"],
                      ["limit-bytes-out", "Upload limit", "100M"],
                      ["idle-timeout", "Inactivity timeout", "15m"],
                      ["shared-users", "Simultaneous logins", "2"],
                      ["rate-limit", "Bandwidth limit", "2M/1M (down/up)"]
                    ]}
                  />

                  <CodeBlock
                    title="Apply Multiple Limitations"
                    language="bash"
                    code={`# Create user with multiple limits
/ip hotspot user add \
    name=vip-customer \
    password=secure123 \
    profile=premium \
    limit-uptime=24h \
    limit-bytes-total=2G \
    comment="24h with 2GB total"

# Add time-based user (expires)
/ip hotspot user add \
    name=week-pass \
    password=week123 \
    profile=default \
    limit-uptime=7d \
    comment="7 day pass"`}
                  />
                </section>
              </section>

              {/* RADIUS Integration */}
              <section id="radius-integration" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">RADIUS Integration</h2>

                <section id="radius-setup" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">RADIUS Server Configuration</h3>

                  <p className="text-gray-300 mb-4">
                    RADIUS enables centralized authentication, authorization, and accounting [citation:4][citation:6]:
                  </p>

                  <CodeBlock
                    title="Configure RADIUS Client"
                    language="bash"
                    code={`# Add RADIUS server for HotSpot
/radius add \
    service=hotspot \
    address=192.168.1.10 \
    secret=RadiusSecret123 \
    authentication-port=1812 \
    accounting-port=1813 \
    timeout=3s

# Add backup RADIUS server (redundancy)
/radius add \
    service=hotspot \
    address=192.168.1.11 \
    secret=RadiusSecret123 \
    authentication-port=1812 \
    accounting-port=1813 \
    timeout=3s

# Enable RADIUS incoming
/radius incoming set accept=yes

# Verify RADIUS configuration
/radius print
Flags: X - disabled
 #   SERVICE   CALLED-ID   DOMAIN   ADDRESS     SECRET              AUTH-PORT   ACCT-PORT
               ADDRESS     SECRET              AUTH-PORT   ACCT-PORT
 0   hotspot               192.168.1.10 RadiusSecret123    1812        1813
 1   hotspot               192.168.1.11 RadiusSecret123    1812        1813

# Test RADIUS connectivity
/tool radius monitor 0`}
                  /><CodeBlock
                    title="Configure RADIUS Client"
                    language="bash"
                    code={`# Add RADIUS server for HotSpot
/radius add \\
    service=hotspot \\
    address=192.168.1.10 \\
    secret=RadiusSecret123 \\
    authentication-port=1812 \\
    accounting-port=1813 \\
    timeout=3s

# Add backup RADIUS server (redundancy)
/radius add \\
    service=hotspot \\
    address=192.168.1.11 \\
    secret=RadiusSecret123 \\
    authentication-port=1812 \\
    accounting-port=1813 \\
    timeout=3s

# Enable RADIUS incoming
/radius incoming set accept=yes

# Verify RADIUS configuration
/radius print
Flags: X - disabled
 #   SERVICE   CALLED-ID   DOMAIN   ADDRESS        SECRET             AUTH-PORT   ACCT-PORT
 0   hotspot               192.168.1.10  RadiusSecret123   1812        1813
 1   hotspot               192.168.1.11  RadiusSecret123   1812        1813

# Test RADIUS connectivity
/tool radius monitor 0`}
                  />
                </section>

                <section id="radius-profile" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">HotSpot Profile with RADIUS</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Create HotSpot profile with RADIUS
/ip hotspot profile add name=radius-profile \
    use-radius=yes \
    login-by=http-chap,cookie \
    radius-default-domain="hotspot"

# Apply profile to HotSpot server
/ip hotspot set [find] profile=radius-profile

# Configure RADIUS for HotSpot
/radius set [find service=hotspot] called-id="hotspot"

# Test RADIUS authentication
/ip hotspot active print`}
                  />
                </section>

                <section id="radius-accounting" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">RADIUS Accounting</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Enable detailed RADIUS accounting
/ip hotspot profile set radius-profile \
    radius-accounting=yes \
    radius-interim-update=30s

# Configure RADIUS accounting parameters
/radius set [find] \
    src-address=0.0.0.0 \
    realm="" \
    domain=""

# View accounting statistics
/radius accounting print

# Monitor RADIUS traffic
/tool sniffer quick ip-protocol=udp port=1812,1813`}
                  />
                </section>

                <section id="radius-attributes" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">RADIUS Attributes</h3>

                  <Table
                    headers={["Attribute", "ID", "Description", "Example"]}
                    rows={[
                      ["User-Name", "1", "Username", "john@hotspot"],
                      ["User-Password", "2", "Password (PAP)", "secret123"],
                      ["CHAP-Password", "3", "CHAP password", "[encrypted]"],
                      ["NAS-IP-Address", "4", "Router IP", "192.168.1.1"],
                      ["NAS-Port", "5", "Physical port", "2"],
                      ["Service-Type", "6", "Type of service", "Login-User"],
                      ["Framed-Protocol", "7", "Protocol", "PPP"],
                      ["Framed-IP-Address", "8", "Assigned IP", "10.5.50.100"],
                      ["Framed-IP-Netmask", "9", "Subnet mask", "255.255.255.0"],
                      ["Session-Timeout", "27", "Max session time", "3600"],
                      ["Idle-Timeout", "28", "Inactivity timeout", "600"],
                      ["Acct-Input-Octets", "42", "Downloaded bytes", "1024000"],
                      ["Acct-Output-Octets", "43", "Uploaded bytes", "512000"],
                      ["Acct-Session-Time", "46", "Session duration", "1800"]
                    ]}
                  />

                  <Callout type="tip" title="RADIUS Attributes">
                    MikroTik supports vendor-specific attributes (VSA) with ID 26. Common VSAs include:
                    <ul className="list-disc pl-5 mt-2">
                      <li>MikroTik-Rate-Limit (8) - Bandwidth limiting</li>
                      <li>MikroTik-Group (9) - User group assignment</li>
                      <li>MikroTik-Wireless-VLANID (11) - VLAN assignment</li>
                    </ul>
                  </Callout>
                </section>
              </section>

              {/* User Manager */}
              <section id="user-manager" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">User Manager</h2>

                <section id="install-um" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Installing User Manager</h3>

                  <CodeBlock
                    title="Install User Manager Package"
                    language="bash"
                    code={`# Check available packages
/system package print

# Enable User Manager repository (if using v7)
/ip hotspot profile set [find] use-radius=yes

# Install User Manager package (v6)
/system package enable user-manager

# Install User Manager package (v7)
/user-manager database config set enabled=yes

# Verify installation
/user-manager customer print
/user-manager user print`}
                  />
                </section>

                <section id="um-config" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Basic User Manager Configuration</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Create customer (organization)
/user-manager customer add name="MyHotspot" \
    login=admin password=SecurePass123 \
    permissions=full

# Create router entry
/user-manager router add \
    customer=MyHotspot \
    name=HSPOT-ROUTER \
    ip-address=192.168.1.1 \
    shared-secret=RadiusSecret123

# Enable User Manager RADIUS server
/user-manager database config set \
    enabled=yes \
    port=2000 \
    https-port=2001

# Configure router to use User Manager
/radius add service=hotspot \
    address=127.0.0.1 \
    secret=RadiusSecret123 \
    authentication-port=2000 \
    accounting-port=2000

/radius incoming set accept=yes`}
                  />
                </section>

                <section id="um-profiles" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">User Manager Profiles</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Create time-based profiles
/user-manager profile add \
    customer=MyHotspot \
    name="1-Hour" \
    price=100 \
    validity=1h \
    ads="Standard 1-hour access"

/user-manager profile add \
    customer=MyHotspot \
    name="1-Day" \
    price=500 \
    validity=1d \
    ads="24-hour unlimited access"

/user-manager profile add \
    customer=MyHotspot \
    name="Weekly" \
    price=2000 \
    validity=7d \
    ads="7 days premium access"

# Create data-limited profiles
/user-manager profile add \
    customer=MyHotspot \
    name="500MB" \
    price=200 \
    ads="500MB data" \
    transfers=500M/500M

/user-manager profile add \
    customer=MyHotspot \
    name="1GB" \
    price=350 \
    ads="1GB data" \
    transfers=1G/1G

# Create bandwidth-limited profiles
/user-manager profile add \
    customer=MyHotspot \
    name="2Mbps" \
    price=150 \
    ads="2Mbps speed" \
    rate-limit-rx=2M \
    rate-limit-tx=2M`}
                  />
                </section>

                <section id="um-users" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Creating Users in User Manager</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Create individual users
/user-manager user add \
    customer=MyHotspot \
    username=john \
    password=john123 \
    profile=1-Day \
    first-name=John \
    last-name=Doe \
    email=john@example.com \
    phone=+1234567890

/user-manager user add \
    customer=MyHotspot \
    username=jane \
    password=jane123 \
    profile=500MB \
    first-name=Jane \
    last-name=Smith

# List users
/user-manager user print where customer=MyHotspot

# Activate/deactivate users
/user-manager user enable [find username=john]
/user-manager user disable [find username=jane]

# Extend user validity
/user-manager user set [find username=john] \
    validity=7d

# Remove expired users
/user-manager user remove-expired`}
                  />
                </section>

                <section id="um-vouchers" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Voucher Management</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Create voucher batch
/user-manager voucher-batch add \
    customer=MyHotspot \
    name="March-2024-Vouchers" \
    profile=1-Hour \
    count=100 \
    validity=1M \
    comment="March promotion"

# Generate specific voucher
/user-manager voucher add \
    customer=MyHotspot \
    username=VIP-GUEST \
    password=WELCOME2024 \
    profile=1-Day \
    expires=2024-04-01

# List vouchers
/user-manager voucher print where customer=MyHotspot

# Export vouchers to file
/user-manager voucher export-csv \
    where customer=MyHotspot \
    file=vouchers.csv

# Check voucher usage
/user-manager user print where from-voucher=yes`}
                  />
                </section>

                <section id="um-backup" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">User Manager Backup</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Export User Manager database
/user-manager database export file=um-backup

# Import User Manager database
/user-manager database import file=um-backup

# Backup to external server
/system backup save name=um-full-backup

# Schedule automatic backups
/system scheduler add \
    name=um-backup \
    interval=1d \
    start-time=02:00 \
    on-event="/user-manager database export file=um-backup-[\$[/system clock get date]]"`}
                  />
                </section>
              </section>

              {/* Customizing HotSpot Pages */}
              <section id="customization" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Customizing HotSpot Pages</h2>

                <section id="html-pages" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">HotSpot HTML Pages</h3>

                  <p className="text-gray-300 mb-4">
                    HotSpot pages are stored in the router's flash memory. You can access them via FTP:
                  </p>

                  <CodeBlock
                    title="Access HotSpot Files via FTP"
                    language="bash"
                    code={`# Connect via FTP (use any FTP client)
ftp 192.168.1.1
Username: admin
Password: your-password

# Navigate to hotspot directory
cd hotspot

# List hotspot files
ls
  alogin.html      - After-login page
  error.html       - Error page
  login.html       - Main login page
  logout.html      - Logout page
  redirect.html    - Redirect page
  status.html      - Status page
  rlogin.html      - RADIUS login page
  md5.js           - JavaScript for CHAP
  hotspot.css      - Stylesheet

# Download files for editing
get login.html
get hotspot.css

# Upload modified files
put custom-login.html login.html`}
                  />
                </section>

                <section id="login-page" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Custom Login Page</h3>

                  <p className="text-gray-300 mb-4">
                    Here's an example of a custom login.html page with modern design:
                  </p>

                  <CodeBlock
                    title="Custom Login Page HTML"
                    language="html"
                    code={`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WiFi HotSpot Login</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .login-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            width: 100%;
            max-width: 400px;
            padding: 40px;
        }
        .logo {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo img {
            max-width: 150px;
        }
        .logo h2 {
            color: #333;
            margin-top: 10px;
            font-size: 24px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #555;
            font-size: 14px;
            font-weight: 600;
        }
        .form-group input {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        .form-group input:focus {
            outline: none;
            border-color: #667eea;
        }
        .btn-login {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .btn-login:hover {
            transform: translateY(-2px);
        }
        .btn-login:active {
            transform: translateY(0);
        }
        .links {
            text-align: center;
            margin-top: 20px;
        }
        .links a {
            color: #667eea;
            text-decoration: none;
            font-size: 14px;
            margin: 0 10px;
        }
        .links a:hover {
            text-decoration: underline;
        }
        .error {
            background: #fee;
            color: #c00;
            padding: 10px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="logo">
            <img src="logo.png" alt="Logo">
            <h2>Welcome to Our WiFi</h2>
            <p>Please login to access the internet</p>
        </div>

        $(if error)
        <div class="error">$(error)</div>
        $(endif)

        <form method="post" action="$(link-login-only)">
            <input type="hidden" name="dst" value="$(link-orig)">
            <input type="hidden" name="popup" value="true">

            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" placeholder="Enter username" required>
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="Enter password" required>
            </div>

            <button type="submit" class="btn-login">Login</button>
        </form>

        <div class="links">
            $(if trial == 'yes')
            <a href="$(link-login-only)?dst=$(link-orig)&amp;username=T-$(mac-esc)">Try Free Trial</a>
            $(endif)
            <a href="status">Check Status</a>
        </div>
    </div>

    <script>
        // Auto-focus username field
        document.querySelector('input[name="username"]').focus();

        // Handle form submission
        document.querySelector('form').addEventListener('submit', function(e) {
            var username = document.querySelector('input[name="username"]').value;
            var password = document.querySelector('input[name="password"]').value;

            if (!username || !password) {
                e.preventDefault();
                alert('Please enter both username and password');
            }
        });
    </script>
</body>
</html>`}
                  />
                </section>

                <section id="status-page" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Custom Status Page</h3>

                  <CodeBlock
                    title="status.html"
                    language="html"
                    code={`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connection Status</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            font-family: 'Segoe UI', sans-serif;
        }
        .status-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 500px;
            padding: 40px;
        }
        .status-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .status-header h2 {
            color: #333;
            font-size: 28px;
        }
        .status-icon {
            text-align: center;
            margin-bottom: 20px;
        }
        .status-icon .connected {
            color: #4CAF50;
            font-size: 64px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin: 20px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
        }
        .info-item {
            text-align: center;
        }
        .info-label {
            color: #666;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 5px;
        }
        .info-value {
            color: #333;
            font-size: 16px;
            font-weight: 600;
        }
        .progress-bar {
            background: #e0e0e0;
            height: 20px;
            border-radius: 10px;
            overflow: hidden;
            margin: 10px 0;
        }
        .progress-fill {
            background: linear-gradient(90deg, #4CAF50, #8BC34A);
            height: 100%;
            transition: width 0.3s ease;
        }
        .btn-logout {
            display: block;
            width: 100%;
            padding: 14px;
            background: #f44336;
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            text-align: center;
            margin-top: 20px;
        }
        .btn-logout:hover {
            background: #d32f2f;
        }
        .btn-refresh {
            display: inline-block;
            padding: 8px 16px;
            background: #2196F3;
            color: white;
            border-radius: 5px;
            text-decoration: none;
            font-size: 14px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="status-container">
        <div class="status-header">
            <div class="status-icon">
                <div class="connected">✓</div>
            </div>
            <h2>Connected to WiFi</h2>
            <p>You have internet access</p>
        </div>

        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">IP Address</div>
                <div class="info-value">$(ip)</div>
            </div>
            <div class="info-item">
                <div class="info-label">MAC Address</div>
                <div class="info-value">$(mac)</div>
            </div>
            <div class="info-item">
                <div class="info-label">Username</div>
                <div class="info-value">$(username)</div>
            </div>
            <div class="info-item">
                <div class="info-label">Session Time</div>
                <div class="info-value">$(uptime)</div>
            </div>
        </div>

        <div class="info-item">
            <div class="info-label">Downloaded</div>
            <div class="info-value">$(bytes-in-nice)</div>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: $(bytes-in-percent)%"></div>
        </div>

        <div class="info-item">
            <div class="info-label">Uploaded</div>
            <div class="info-value">$(bytes-out-nice)</div>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: $(bytes-out-percent)%"></div>
        </div>

        $(if remain-bytes-total)
        <div class="info-item">
            <div class="info-label">Remaining Data</div>
            <div class="info-value">$(remain-bytes-total-nice)</div>
        </div>
        $(endif)

        $(if remain-uptime)
        <div class="info-item">
            <div class="info-label">Remaining Time</div>
            <div class="info-value">$(remain-uptime)</div>
        </div>
        $(endif)

        <div style="text-align: center; margin-top: 20px;">
            <a href="$(link-logout)" class="btn-logout">Logout</a>
        </div>
        <div style="text-align: center; margin-top: 10px;">
            <a href="status" class="btn-refresh">↻ Refresh Status</a>
        </div>
    </div>

    <script>
        // Auto-refresh every 30 seconds
        setTimeout(function() {
            window.location.reload();
        }, 30000);
    </script>
</body>
</html>`}
                  />
                </section>
              </section>

              {/* Walled Garden */}
              <section id="walled-garden" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Walled Garden</h2>

                <section id="what-is-walled-garden" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">What is Walled Garden?</h3>

                  <p className="text-gray-300 mb-4">
                    Walled garden allows specific websites to be accessible without HotSpot authentication.
                    This is useful for allowing access to login pages, support sites, or promotional content.
                  </p>
                </section>

                <section id="configuring-wg" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Configuring Walled Garden</h3>

                  <CodeBlock
                    title="Add Walled Garden Entries"
                    language="bash"
                    code={`# Allow specific domains
/ip hotspot walled-garden
add comment="Google Services" \
    dst-host=*.google.com \
    dst-port=80,443

add comment="Facebook" \
    dst-host=*.facebook.com \
    dst-port=80,443

add comment="YouTube" \
    dst-host=*.youtube.com \
    dst-port=80,443

add comment="Payment Gateway" \
    dst-host=*.stripe.com \
    dst-port=443

# Allow IP ranges
add comment="Local Network" \
    dst-address=192.168.1.0/24

# Allow specific URLs
add comment="Support Page" \
    dst-host=support.example.com \
    path=/help/*

# View walled garden entries
/ip hotspot walled-garden print`}
                  />
                </section>

                <section id="advertising" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Advertising with Walled Garden</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Redirect to advertisement page
/ip hotspot walled-garden
add action=redirect \
    redirect-url=http://ads.example.com \
    dst-host=* \
    dst-port=80 \
    comment="Redirect all HTTP to ads"

# Allow access to ads server
add dst-host=ads.example.com

# Multiple language support
add comment="English" dst-host=en.example.com
add comment="Spanish" dst-host=es.example.com`}
                  />
                </section>
              </section>

              {/* IP Binding */}
              <section id="ip-binding" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">IP Binding</h2>

                <section id="binding-types" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">IP Binding Types</h3>

                  <Table
                    headers={["Type", "Description", "Use Case"]}
                    rows={[
                      ["regular", "Client authenticated normally", "Regular users"],
                      ["bypassed", "Client bypasses HotSpot", "Trusted devices, servers"],
                      ["blocked", "Client completely blocked", "Blacklisted devices"],
                      ["radius", "Use RADIUS for binding", "Enterprise environments"]
                    ]}
                  />
                </section>

                <section id="regular-bind" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Regular Binding (NAT)</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Bind IP to user
/ip hotspot ip-binding add \
    mac-address=00:11:22:33:44:55 \
    ip-address=192.168.100.100 \
    type=regular \
    comment="John's PC"

# Bind with to-address
/ip hotspot ip-binding add \
    mac-address=AA:BB:CC:DD:EE:FF \
    to-address=192.168.100.200 \
    comment="Static assignment"`}
                  />
                </section>

                <section id="bypassed-bind" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Bypassed Binding</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Bypass HotSpot for trusted devices
/ip hotspot ip-binding add \
    mac-address=00:22:44:66:88:AA \
    type=bypassed \
    comment="Printer - no login required"

# Bypass for IP range
/ip hotspot ip-binding add \
    ip-address=192.168.100.10-192.168.100.20 \
    type=bypassed \
    comment="Security cameras"

# Bypass for specific IP
/ip hotspot ip-binding add \
    ip-address=192.168.100.254 \
    type=bypassed \
    comment="Network printer"`}
                  />
                </section>

                <section id="blocked-bind" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Blocked Binding</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Block specific MAC address
/ip hotspot ip-binding add \
    mac-address=11:22:33:44:55:66 \
    type=blocked \
    comment="Blocked device - stolen"

# Block IP range
/ip hotspot ip-binding add \
    ip-address=192.168.100.200-192.168.100.210 \
    type=blocked \
    comment="Suspicious range"`}
                  />
                </section>
              </section>

              {/* Bandwidth Management */}
              <section id="bandwidth-management" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Bandwidth Management</h2>

                <section id="rate-limiting" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Rate Limiting in User Profiles</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Create rate-limited profiles
/ip hotspot user profile
add name="512k" rate-limit="512k/512k" \
    comment="512kbps symmetric"

add name="1M" rate-limit="1M/1M" \
    comment="1Mbps symmetric"

add name="2M-1M" rate-limit="2M/1M" \
    comment="2Mbps down, 1Mbps up"

add name="burst" \
    rate-limit="1M/1M 2M/2M 2M/2M 10/10" \
    comment="With burst"

# Apply to users
/ip hotspot user set [find name=guest] profile=512k
/ip hotspot user set [find name=premium] profile=2M-1M`}
                  />
                </section>

                <section id="pcq-hotspot" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">PCQ for HotSpot</h3>

                  <p className="text-gray-300 mb-4">
                    PCQ (Per Connection Queue) ensures fair bandwidth distribution among users:
                  </p>

                  <CodeBlock
                    language="bash"
                    code={`# Create PCQ queue types
/queue type
add name=pcq-download kind=pcq pcq-classifier=dst-address
add name=pcq-upload kind=pcq pcq-classifier=src-address

# Apply PCQ to HotSpot network
/queue simple add \
    name=hotspot-pcq \
    dst=192.168.100.0/24 \
    queue=pcq-download/pcq-upload \
    max-limit=100M/50M \
    comment="PCQ for HotSpot users"

# Per-user PCQ with parent
/queue tree add name=global-hotspot parent=global \
    packet-mark=hotspot-mark
/queue tree add name=pcq-download parent=global-hotspot \
    queue=pcq-download
/queue tree add name=pcq-upload parent=global-hotspot \
    queue=pcq-upload`}
                  />
                </section>

                <section id="bursting" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Burst Configuration</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Configure burst for better user experience
/ip hotspot user profile add \
    name="burst-profile" \
    rate-limit="512k/512k 1M/1M 1M/1M 60/60" \
    comment="Burst 1Mbps for 60 seconds"

# Burst parameters explained:
# rate-limit = rx-rate/tx-rate rx-burst-rate/tx-burst-rate \
#              rx-burst-threshold/tx-burst-threshold rx-burst-time/tx-burst-time

# Example: Gaming profile with high initial burst
/ip hotspot user profile add \
    name="gaming" \
    rate-limit="2M/2M 10M/10M 8M/8M 30/30"`}
                  />
                </section>
              </section>

              {/* Advanced Topics */}
              <section id="advanced-topics" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Advanced Topics</h2>

                <section id="hotspot-ssl" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">SSL/HTTPS Setup</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Generate SSL certificate
/certificate add name=hotspot-cert common-name=hotspot.example.com \
    days=365 key-size=2048

/certificate sign hotspot-cert ca-on-smart-card=no

# Create HTTPS HotSpot profile
/ip hotspot profile add name=ssl-profile \
    use-https=yes \
    ssl-certificate=hotspot-cert \
    login-by=https

# Apply to server
/ip hotspot set [find] profile=ssl-profile

# Test HTTPS login
https://hotspot.example.com/`}
                  />
                </section>

                <section id="hotspot-ipv6" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">IPv6 Considerations</h3>

                  <Callout type="warning" title="IPv4 Only">
                    HotSpot works only with IPv4. For IPv6 networks, you need to provide IPv4 connectivity
                    to clients (dual-stack) and ensure IPv6 traffic is handled appropriately .
                  </Callout>
                </section>

                <section id="hotspot-bridge" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">HotSpot on Bridge</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Create bridge
/interface bridge add name=hotspot-bridge

# Add interfaces to bridge
/interface bridge port add bridge=hotspot-bridge interface=ether2
/interface bridge port add bridge=hotspot-bridge interface=wlan1

# Configure HotSpot on bridge
/ip hotspot add name=hotspot1 interface=hotspot-bridge \
    address-pool=hotspot-pool profile=hsprof1

# Add bridge IP
/ip address add address=10.5.50.1/24 interface=hotspot-bridge`}
                  />
                </section>

                <section id="multiple-servers" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Multiple HotSpot Servers</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Create multiple HotSpot servers on different interfaces
/ip hotspot
add name=hotspot-wifi interface=wlan1 address-pool=pool-wifi
add name=hotspot-guest interface=ether3 address-pool=pool-guest

# Different profiles per server
/ip hotspot profile
add name=wifi-profile hotspot-address=10.10.10.1
add name=guest-profile hotspot-address=10.20.20.1

# Assign profiles
/ip hotspot set [find name=hotspot-wifi] profile=wifi-profile
/ip hotspot set [find name=hotspot-guest] profile=guest-profile

# Separate IP pools
/ip pool add name=pool-wifi ranges=10.10.10.2-10.10.10.254
/ip pool add name=pool-guest ranges=10.20.20.2-10.20.20.254`}
                  />
                </section>
              </section>

              {/* Monitoring & Troubleshooting */}
              <section id="monitoring" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Monitoring & Troubleshooting</h2>

                <section id="active-users" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Monitoring Active Users</h3>

                  <CodeBlock
                    language="bash"
                    code={`# View active HotSpot users
/ip hotspot active print
Flags: X - disabled, R - radius, D - dynamic
 #   SERVER    USER       ADDRESS       MAC-ADDRESS       UPTIME   IDLE-TIME
 0   hotspot1  john       10.5.50.100  00:11:22:33:44:55  10m      2s
 1   hotspot1  jane       10.5.50.101  AA:BB:CC:DD:EE:FF  5m       30s

# Remove specific user
/ip hotspot active remove [find user=john]

# Monitor traffic per user
/ip hotspot active monitor-traffic [find user=jane]

# Show user statistics
/ip hotspot user print stats where active=yes`}
                  />
                </section>

                <section id="host-table" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Host Table</h3>

                  <CodeBlock
                    language="bash"
                    code={`# View all hosts
/ip hotspot host print
Flags: A - authorized, B - bypassed, D - dhcp, R - radius, U - uptime
 #   MAC-ADDRESS       ADDRESS       TO-ADDRESS   SERVER      UPTIME   IDLE-TIME
 0  00:11:22:33:44:55 10.5.50.100                hotspot1    15m      5s
 1  AA:BB:CC:DD:EE:FF 10.5.50.101                hotspot1    8m       1m

# Remove expired hosts
/ip hotspot host remove [find where authorized=no uptime>1h]

# Clear all hosts
/ip hotspot host remove [find]`}
                  />
                </section>

                <section id="logs" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Logs & Debugging</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Enable HotSpot logging
/system logging add topics=hotspot,account,debug action=memory

# View HotSpot logs
/log print where topics~"hotspot"

# Monitor in real-time
/log print follow where topics~"hotspot"

# Debug authentication issues
/system logging add topics=hotspot,auth,error action=echo

# Check HotSpot counters
/ip hotspot print stats

# Test connectivity
/tool traceroute 8.8.8.8

# Packet capture on hotspot interface
/tool sniffer quick interface=hotspot-lan port=80,443,2000`}
                  />
                </section>

                <section id="common-issues" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Common Issues & Solutions</h3>

                  <Table
                    headers={["Issue", "Symptoms", "Solution"]}
                    rows={[
                      ["Login page not showing", "Direct access to internet works", "Clear browser cache, check DNS settings"],
                      ["Authentication fails", "Invalid username/password error", "Verify credentials, check RADIUS connectivity"],
                      ["No internet after login", "Connected but no access", "Check NAT rules, verify routing"],
                      ["Slow speeds", "Low throughput", "Check queues, enable PCQ, verify bandwidth limits"],
                      ["Users disconnect frequently", "Session drops", "Check idle-timeout, keepalive settings"],
                      ["Walled garden not working", "Sites blocked before login", "Verify walled-garden entries, check domain matching"],
                      ["RADIUS not working", "Users not authenticated", "Test RADIUS connectivity, check secrets"],
                      ["HTTPS not working", "Certificate errors", "Install valid certificate, check date/time"]
                    ]}
                  />
                </section>

                <section id="performance" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Performance Optimization</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Optimize HotSpot performance
/ip hotspot profile set [find] \
    idle-timeout=5m \
    keepalive-timeout=2m \
    status-autorefresh=30s

# Enable caching for login pages
/ip proxy set enabled=yes cache-hit-dscp=4
/ip proxy access add dst-host=hotspot.local action=allow

# Tune system resources
/system resource print
/system logging disable topics=debug

# Monitor resource usage
/tool profile

# Optimize firewall rules
/ip firewall filter print stats
/ip firewall filter remove [find where bytes=0]`}
                  />
                </section>
              </section>

              {/* Automation */}
              <section id="automation" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">HotSpot Automation</h2>

                <section id="api-hotspot" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">HotSpot via API</h3>

                  <CodeBlock
                    title="Python Script for HotSpot Management"
                    language="python"
                    code={`import routeros_api
import csv
from datetime import datetime

class HotSpotManager:
    def __init__(self, host, username, password):
        self.connection = routeros_api.RouterOsApiPool(
            host=host,
            username=username,
            password=password,
            plaintext_login=True
        )
        self.api = self.connection.get_api()

    def create_user(self, username, password, profile='default', **kwargs):
        """Create new HotSpot user"""
        hotspot_user = self.api.get_resource('/ip/hotspot/user')
        user_data = {
            'name': username,
            'password': password,
            'profile': profile
        }
        user_data.update(kwargs)
        result = hotspot_user.add(**user_data)
        print(f"Created user: {username}")
        return result

    def create_batch_users(self, count, prefix='user', profile='default'):
        """Create multiple users"""
        users = []
        for i in range(1, count + 1):
            username = f"{prefix}{i:03d}"
            password = f"pass{i:03d}"
            self.create_user(username, password, profile)
            users.append({'username': username, 'password': password})
        return users

    def get_active_users(self):
        """Get list of active users"""
        active = self.api.get_resource('/ip/hotspot/active').get()
        return active

    def get_user_stats(self, username):
        """Get statistics for specific user"""
        users = self.api.get_resource('/ip/hotspot/user').get()
        for user in users:
            if user['name'] == username:
                return user
        return None

    def disable_expired_users(self):
        """Disable users with expired limits"""
        users = self.api.get_resource('/ip/hotspot/user').get()
        for user in users:
            if 'limit-uptime' in user:
                # Check if expired
                if self.is_expired(user):
                    self.api.get_resource('/ip/hotspot/user').set(
                        id=user['.id'],
                        disabled='yes'
                    )
                    print(f"Disabled expired user: {user['name']}")

    def export_users_to_csv(self, filename='hotspot_users.csv'):
        """Export users to CSV"""
        users = self.api.get_resource('/ip/hotspot/user').get()

        with open(filename, 'w', newline='') as csvfile:
            fieldnames = ['name', 'profile', 'limit-uptime', 'limit-bytes-total', 'comment']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

            writer.writeheader()
            for user in users:
                row = {k: user.get(k, '') for k in fieldnames}
                writer.writerow(row)

        print(f"Exported {len(users)} users to {filename}")

    def import_users_from_csv(self, filename='hotspot_users.csv'):
        """Import users from CSV"""
        with open(filename, 'r') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                self.create_user(**row)

    def close(self):
        self.connection.disconnect()

# Usage example
if __name__ == "__main__":
    hs = HotSpotManager("192.168.1.1", "admin", "password")

    # Create users
    hs.create_user("guest1", "pass123", "basic")
    hs.create_user("premium1", "secure456", "premium",
                   limit_uptime="24h", limit_bytes_total="1G")

    # Batch create 50 users
    users = hs.create_batch_users(50, "event", "1-hour")

    # Export to CSV
    hs.export_users_to_csv("hotspot_users.csv")

    # Monitor active users
    active = hs.get_active_users()
    print(f"Active users: {len(active)}")

    hs.close()`}
                  />
                </section>

                <section id="scripts" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">RouterOS Scripts</h3>

                  <CodeBlock
                    title="Daily Report Script"
                    language="bash"
                    code={`# Script: hotspot-daily-report
/system script add name=hotspot-report source={
:local date [/system clock get date]
:local time [/system clock get time]
:local activeUsers [/ip hotspot active print count-only]
:local totalUsers [/ip hotspot user print count-only]

:log info ("HotSpot Report - $date $time")
:log info ("Active Users: $activeUsers")
:log info ("Total Users: $totalUsers")

# Export to file
/file print file=hotspot-report-$date

# Send via email
/tool e-mail send to="admin@example.com" \
    subject="HotSpot Daily Report" \
    body="Active: $activeUsers, Total: $totalUsers"
}

# Schedule daily report
/system scheduler add name=daily-report \
    interval=1d \
    start-time=00:00 \
    on-event=hotspot-report`}
                  />
                </section>

                <section id="email-notifications" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Email Notifications</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Configure email settings
/tool e-mail set \
    address=smtp.gmail.com \
    port=587 \
    start-tls=yes \
    from=hotspot@example.com \
    user=hotspot@example.com \
    password=emailpassword

# Script for new user notification
/system script add name=new-user-notify source={
:local userName $"user"
:local userPass $"pass"
:local userEmail $"email"

/tool e-mail send to=$userEmail \
    subject="Welcome to HotSpot WiFi" \
    body="Your account is ready!\nUsername: $userName\nPassword: $userPass\n\nEnjoy our service!"
}

# Trigger on user creation
/ip hotspot user add name=john password=pass \
    comment="john@email.com" \
    on-login="/system script run new-user-notify user=john pass=pass email=john@email.com"`}
                  />
                </section>

                <section id="sms-integration" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">SMS Integration</h3>

                  <CodeBlock
                    language="bash"
                    code={`# SMS gateway configuration
/tool sms set \
    port=usb1 \
    channel=1 \
    keepalive-timeout=60

# Send voucher via SMS
/system script add name=sms-voucher source={
:local phone $"phone"
:local voucher $"voucher"

/tool sms send $phone "Your WiFi voucher: $voucher"
}

# Generate and send voucher
:local voucherCode [:pick "ABCDEFGHJKLMNPQRSTUVWXYZ23456789" [:rand 16]]
/ip hotspot user add name=$voucherCode password=$voucherCode profile=1-hour
/system script run sms-voucher phone="+1234567890" voucher=$voucherCode`}
                  />
                </section>
              </section>

              {/* Real-World Examples */}
              <section id="examples" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Real-World Examples</h2>

                <section id="cafe-wifi" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Café WiFi Setup</h3>

                  <CodeBlock
                    title="Complete Café HotSpot Configuration"
                    language="bash"
                    code={`# Interface setup
/interface set ether1 name=wan
/interface set ether2 name=cafe-lan
/interface wireless set wlan1 name=cafe-wifi

# Bridge for LAN and WiFi
/interface bridge add name=cafe-bridge
/interface bridge port add bridge=cafe-bridge interface=cafe-lan
/interface bridge port add bridge=cafe-bridge interface=cafe-wifi

# IP configuration
/ip address add address=10.100.0.1/24 interface=cafe-bridge
/ip dhcp-client add interface=wan

# HotSpot profiles
/ip hotspot user profile
add name=30min rate-limit="512k/512k" idle-timeout=5m
add name=1hour rate-limit="1M/1M" idle-timeout=10m
add name=4hour rate-limit="2M/1M" idle-timeout=15m

# HotSpot setup
/ip hotspot add interface=cafe-bridge name=cafe-hotspot \
    address-pool=hotspot-pool profile=hsprof1

/ip hotspot profile set hsprof1 \
    login-by=http-chap,cookie \
    trial-uptime=15m \
    html-directory=hotspot-cafe

# User creation
/ip hotspot user
add name=staff1 password=cafe123 profile=4hour
add name=staff2 password=cafe123 profile=4hour

# Walled garden (free access to cafe website)
/ip hotspot walled-garden
add dst-host=mycafe.com
add dst-host=*.mycafe.com

# Bandwidth limits per user
/queue simple add name=cafe-limit target=10.100.0.0/24 \
    max-limit=20M/10M queue=pcq-download-default/pcq-upload-default

# Daily backup
/system scheduler add name=backup interval=1d start-time=03:00 \
    on-event="/system backup save name=cafe-\$[/system clock get date]"`}
                  />
                </section>

                <section id="hotel-guest" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Hotel Guest Network</h3>

                  <CodeBlock
                    language="bash"
                    code={`# VLAN separation for rooms
/interface vlan
add name=vlan-rooms vlan-id=100 interface=ether2
add name=vlan-lobby vlan-id=200 interface=ether2

# HotSpot on each VLAN
/ip hotspot
add name=hotspot-rooms interface=vlan-rooms \
    address-pool=rooms-pool profile=rooms-profile
add name=hotspot-lobby interface=vlan-lobby \
    address-pool=lobby-pool profile=lobby-profile

# Room profiles (per room)
/ip hotspot user profile
add name=room-basic rate-limit="2M/1M" shared-users=5
add name=room-premium rate-limit="10M/5M" shared-users=10

# MAC binding for room devices
/ip hotspot ip-binding add mac-address=00:11:22:33:44:55 \
    to-address=10.100.10.5 type=regular comment="Room 101"

# Multiple vouchers per room
/ip hotspot user add name=101-1 password=101-1 profile=room-basic
/ip hotspot user add name=101-2 password=101-2 profile=room-basic

# Reception override (bypass for staff)
/ip hotspot ip-binding add mac-address=AA:BB:CC:DD:EE:FF \
    type=bypassed comment="Reception PC"

# Daily cleanup
/system script add name=clean-expired source={
/ip hotspot user remove [find where disabled=yes uptime>24h]
}`}
                  />
                </section>
              </section>

              {/* Resources */}
              <section id="resources" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Resources</h2>

                <Grid>
                  <Card title="Official Documentation" icon={BookOpen}>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          HotSpot Manual
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          User Manager Guide
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          RADIUS Configuration
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          HotSpot HTML Customization
                        </a>
                      </li>
                    </ul>
                  </Card>

                  <Card title="Community" icon={Users}>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          MikroTik HotSpot Forum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Captive Portal Templates
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          RADIUS FreeRADIUS Guide
                        </a>
                      </li>
                    </ul>
                  </Card>

                  <Card title="Tools" icon={Terminal}>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          HotSpot Template Generator
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          RADIUS Test Client
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Voucher Generator
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
                    MikroTik HotSpot is a powerful captive portal solution that provides authentication,
                    accounting, and bandwidth management for public WiFi networks. By following this guide,
                    you've learned how to:
                  </p>

                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Set up basic HotSpot using wizard and manual configuration</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Implement various authentication methods (CHAP, PAP, HTTPS, MAC, Cookie)</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Manage users, profiles, and limitations effectively</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Integrate RADIUS for centralized authentication and accounting</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Configure User Manager for professional voucher systems</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Customize login pages with HTML/CSS for brand identity</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Implement walled garden for free access to specific sites</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Manage bandwidth with rate limiting and PCQ</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Monitor users, troubleshoot issues, and optimize performance</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Automate HotSpot management with scripts and API</span>
                    </li>
                  </ul>

                  <p className="text-gray-300 leading-relaxed mb-4">
                    Remember to always test configurations in a lab environment first, secure your HotSpot
                    with HTTPS, and implement proper monitoring for production deployments. The MikroTik CHR
                    virtual appliance is an excellent tool for experimenting with HotSpot features without
                    affecting production networks.
                  </p>

                  <div className="flex flex-wrap gap-4 mt-6">
                    <Link
                      href="/resources/mikrotik/api-setup"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 hover:bg-green-500/20 transition-colors"
                    >
                      <Code2 className="h-4 w-4" />
                      <span>MikroTik API Guide</span>
                    </Link>

                    <Link
                      href="/resources/mikrotik/vlan-management"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-lg text-gray-300 hover:text-green-500 hover:border-green-500/20 transition-colors"
                    >
                      <Layers className="h-4 w-4" />
                      <span>VLAN Management</span>
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
                    HotSpot Quick Stats
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li className="flex justify-between">
                      <span>Default Port:</span>
                      <span className="font-mono text-green-500">80 (HTTP), 443 (HTTPS)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Auth Methods:</span>
                      <span className="font-mono text-green-500">6</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Max Users:</span>
                      <span className="font-mono text-green-500">Unlimited</span>
                    </li>
                    <li className="flex justify-between">
                      <span>RADIUS Ports:</span>
                      <span className="font-mono text-green-500">1812/1813</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Cookie Lifetime:</span>
                      <span className="font-mono text-green-500">3 days</span>
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
