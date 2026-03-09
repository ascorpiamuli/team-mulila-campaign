"use client";
// src/app/resources/networking/subnetting/page.tsx
import { Metadata } from "next";
import Link from 'next/link';
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
  Hand,
  Fingerprint as FingerprintIcon,
  Key as KeyIcon,
  Lock as LockIcon,
  Unlock,
  Shield as ShieldIcon,
  ShieldCheck as ShieldCheckIcon,
  ShieldAlert as ShieldAlertIcon,
  ShieldBan,
  ShieldX,
  ShieldPlus,
  ShieldHalf,
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
  Cable,
  WifiIcon as WifiIcon2,
  Satellite as SatelliteIcon,
  Radio as RadioIcon2,
  Antenna as AntennaIcon,
  EthernetPort as EthernetPortIcon,
  Server as ServerIcon,
  Cloud as CloudIcon2,
  Database as DatabaseIcon2,
  Link as LinkIcon,  // Renamed from Link to LinkIcon
  Link2,
  Link2Off,
  WifiOff as WifiOffIcon,
  Calculator,
  Sigma,
  Binary,
  Grid3x3,
  PieChart as PieChartIcon,
  BarChart3 as BarChart3Icon,
  TrendingUp as TrendingUpIcon,
  Hash,
  Divide,
  PlusCircle,
  MinusCircle,
  Calculator as CalculatorIcon
} from "lucide-react";
import React, { useState } from 'react';

// Define SwitchIcon separately since it's not directly exported
const SwitchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
    <line x1="8" y1="2" x2="8" y2="22"></line>
    <line x1="16" y1="2" x2="16" y2="22"></line>
    <line x1="2" y1="8" x2="22" y2="8"></line>
    <line x1="2" y1="16" x2="22" y2="16"></line>
  </svg>
);

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
    title: "Introduction to Subnetting",
    icon: BookOpen,
    subsections: [
      { id: "what-is-subnetting", title: "What is Subnetting?" },
      { id: "why-subnet", title: "Why Subnet?" },
      { id: "benefits", title: "Benefits of Subnetting" },
      { id: "terminology", title: "Key Terminology" }
    ]
  },
  {
    id: "ip-address-review",
    title: "IP Address Review",
    icon: Globe,
    subsections: [
      { id: "ipv4-structure", title: "IPv4 Address Structure" },
      { id: "address-classes", title: "Address Classes" },
      { id: "public-private", title: "Public vs Private IPs" },
      { id: "special-addresses", title: "Special Addresses" }
    ]
  },
  {
    id: "subnet-masks",
    title: "Subnet Masks",
    icon: Binary,
    subsections: [
      { id: "what-is-subnet-mask", title: "What is a Subnet Mask?" },
      { id: "cidr-notation", title: "CIDR Notation" },
      { id: "default-masks", title: "Default Subnet Masks" },
      { id: "custom-masks", title: "Custom Subnet Masks" }
    ]
  },
  {
    id: "binary-math",
    title: "Binary Math for Subnetting",
    icon: Sigma,
    subsections: [
      { id: "binary-basics", title: "Binary Basics" },
      { id: "bit-borrowing", title: "Bit Borrowing" },
      { id: "powers-of-2", title: "Powers of 2" },
      { id: "binary-to-decimal", title: "Binary to Decimal Conversion" }
    ]
  },
  {
    id: "subnet-calculation",
    title: "Subnet Calculation",
    icon: Calculator,
    subsections: [
      { id: "network-address", title: "Finding Network Address" },
      { id: "broadcast-address", title: "Finding Broadcast Address" },
      { id: "first-last-host", title: "First & Last Usable Host" },
      { id: "total-hosts", title: "Total Hosts per Subnet" },
      { id: "next-subnet", title: "Finding Next Subnet" }
    ]
  },
  {
    id: "subnetting-classful",
    title: "Classful Subnetting",
    icon: Grid3x3,
    subsections: [
      { id: "class-a", title: "Class A Subnetting" },
      { id: "class-b", title: "Class B Subnetting" },
      { id: "class-c", title: "Class C Subnetting" },
      { id: "examples-classful", title: "Classful Examples" }
    ]
  },
  {
    id: "vlsm",
    title: "VLSM - Variable Length Subnet Masks",
    icon: GitBranch,
    subsections: [
      { id: "what-is-vlsm", title: "What is VLSM?" },
      { id: "vlsm-benefits", title: "Benefits of VLSM" },
      { id: "vlsm-calculation", title: "VLSM Calculation" },
      { id: "vlsm-examples", title: "VLSM Examples" }
    ]
  },
  {
    id: "cidr",
    title: "CIDR - Classless Inter-Domain Routing",
    icon: Workflow,
    subsections: [
      { id: "what-is-cidr", title: "What is CIDR?" },
      { id: "cidr-notation", title: "CIDR Notation" },
      { id: "route-aggregation", title: "Route Aggregation" },
      { id: "cidr-examples", title: "CIDR Examples" }
    ]
  },
  {
    id: "subnetting-tables",
    title: "Subnetting Tables & Cheat Sheets",
    icon: Grid3x3, // Changed from Table to Grid3x3
    subsections: [
      { id: "cidr-table", title: "CIDR Subnet Table" },
      { id: "wildcard-masks", title: "Wildcard Masks" },
      { id: "quick-reference", title: "Quick Reference" },
      { id: "magic-number", title: "The Magic Number Method" }
    ]
  },
  {
    id: "subnet-design",
    title: "Subnet Design & Planning",
    icon: Settings,
    subsections: [
      { id: "requirements", title: "Gathering Requirements" },
      { id: "planning-strategy", title: "Planning Strategy" },
      { id: "documentation", title: "Documentation" },
      { id: "future-growth", title: "Planning for Growth" }
    ]
  },
  {
    id: "ipv6-subnetting",
    title: "IPv6 Subnetting",
    icon: Satellite,
    subsections: [
      { id: "ipv6-address", title: "IPv6 Address Structure" },
      { id: "ipv6-subnetting", title: "IPv6 Subnetting Concepts" },
      { id: "ipv6-prefixes", title: "IPv6 Prefixes" },
      { id: "ipv6-examples", title: "IPv6 Subnetting Examples" }
    ]
  },
  {
    id: "practice-exercises",
    title: "Practice Exercises",
    icon: Brain,
    subsections: [
      { id: "beginner", title: "Beginner Exercises" },
      { id: "intermediate", title: "Intermediate Exercises" },
      { id: "advanced", title: "Advanced Exercises" },
      { id: "real-world", title: "Real-World Scenarios" }
    ]
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: Wrench,
    subsections: [
      { id: "common-mistakes", title: "Common Mistakes" },
      { id: "verification", title: "Verification Tools" },
      { id: "conflicts", title: "IP Conflicts" },
      { id: "overlapping", title: "Overlapping Subnets" }
    ]
  },
  {
    id: "resources",
    title: "Resources",
    icon: Database,
    subsections: [
      { id: "calculators", title: "Online Calculators" },
      { id: "practice-tools", title: "Practice Tools" },
      { id: "books", title: "Recommended Books" },
      { id: "videos", title: "Video Tutorials" }
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
    id: "magic-number",
    title: "✨ The Magic Number Method",
    description: "256 - subnet mask = magic number. Use it to find network boundaries quickly!",
    category: "tip",
    icon: Zap
  },
  {
    id: "powers-of-2",
    title: "🔢 Powers of 2 Are Your Friend",
    description: "2^7=128, 2^6=64, 2^5=32, 2^4=16, 2^3=8, 2^2=4, 2^1=2, 2^0=1 - memorize these!",
    category: "tip",
    icon: Sigma
  },
  {
    id: "cidr-notation",
    title: "📝 CIDR Notation",
    description: "IP/subnet bits: 192.168.1.0/24 means 24 network bits, 8 host bits",
    category: "note",
    icon: Hash
  },
  {
    id: "hosts-calculation",
    title: "🧮 Hosts Calculation",
    description: "Usable hosts = 2^(32-CIDR) - 2 (subtract network and broadcast)",
    category: "tip",
    icon: Calculator
  },
  {
    id: "vlsm-importance",
    title: "📊 VLSM Saves Addresses",
    description: "Use VLSM to assign exactly the right size subnet to each network segment",
    category: "best-practice",
    icon: GitBranch
  },
  {
    id: "subnet-zero",
    title: "⚠️ Subnet Zero",
    description: "First subnet (subnet zero) is usable on modern networks, but some older exams may forbid it",
    category: "note",
    icon: AlertCircle
  },
  {
    id: "wildcard-masks",
    title: "🎭 Wildcard Masks",
    description: "Wildcard = inverse of subnet mask (255.255.255.0 → 0.0.0.255) - used in ACLs",
    category: "tip",
    icon: Filter
  },
  {
    id: "private-ranges",
    title: "🏠 Private IP Ranges",
    description: "10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 - never route on internet",
    category: "note",
    icon: Lock
  },
  {
    id: "broadcast-address",
    title: "📢 Broadcast Address",
    description: "Last IP in subnet - all host bits set to 1. Used to reach all devices",
    category: "tip",
    icon: Radio
  },
  {
    id: "network-address",
    title: "🌐 Network Address",
    description: "First IP in subnet - all host bits set to 0. Cannot assign to hosts",
    category: "tip",
    icon: Network
  },
  {
    id: "ipv6-subnetting",
    title: "🚀 IPv6 Subnetting",
    description: "IPv6 subnetting is easier - focus on the first 48-64 bits, rest are hosts",
    category: "tip",
    icon: Satellite
  },
  {
    id: "documentation",
    title: "📋 Document Everything",
    description: "Always document your IP scheme - future you will thank you!",
    category: "best-practice",
    icon: FileText
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

const Table = ({ headers, rows, className }: { headers: string[]; rows: string[][]; className?: string }) => (
  <div className={`overflow-x-auto my-6 ${className || ''}`}>
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

  const IconComponent = highlight.icon;

  if (!IconComponent) {
    return null;
  }

  return (
    <div className={`p-4 rounded-lg border ${categoryColors[highlight.category]}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <IconComponent className="h-4 w-4 text-green-500" />
        </div>
        <div>
          <h4 className="font-mono text-sm font-semibold text-gray-200 mb-1">{highlight.title}</h4>
          <p className="text-xs text-gray-400">{highlight.description}</p>
        </div>
      </div>
    </div>
  );
};

const Diagram = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="my-6 p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
    <h4 className="text-sm font-mono text-green-500 mb-3">{title}</h4>
    <div className="font-mono text-xs text-gray-300 whitespace-pre overflow-x-auto">
      {children}
    </div>
  </div>
);

export default function NetworkSubnettingPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [expandedSections, setExpandedSections] = useState<string[]>(['introduction', 'subnet-masks', 'subnet-calculation']);
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
              <Link href="/resources/networking" className="text-gray-400 hover:text-green-500 hidden sm:block">
                Networking
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-600 hidden sm:block" />
              <span className="text-green-500 truncate">Subnetting</span>
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
                <h4 className="font-mono text-sm font-semibold text-green-500 mb-2">📚 Subnetting Quick Reference</h4>
                <ul className="space-y-2 text-xs text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Network = First IP, Broadcast = Last IP</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Usable Hosts = 2^(32-CIDR) - 2</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Magic Number = 256 - Subnet Mask</span>
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
                  Introduction to Subnetting
                </h2>

                <section id="what-is-subnetting" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">What is Subnetting?</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Subnetting is the practice of dividing a network into smaller, more manageable subnetworks (subnets).
                    It involves borrowing bits from the host portion of an IP address to create additional network addresses.
                    This technique helps optimize network performance, improve security, and conserve IP addresses.
                  </p>

                  <Diagram title="Network Division Concept">
                    {`
                    ┌─────────────────────────────────────┐
                    │        Original Network             │
                    │       192.168.1.0/24                │
                    │      256 IP Addresses                │
                    └─────────────────────────────────────┘
                                    │
            ┌───────────────────────┼───────────────────────┐
            │                       │                       │
            ▼                       ▼                       ▼
    ┌───────────────┐       ┌───────────────┐       ┌───────────────┐
    │  Subnet A     │       │  Subnet B     │       │  Subnet C     │
    │ 192.168.1.0/26│       │192.168.1.64/26│       │192.168.1.128/26│
    │ 62 usable IPs │       │ 62 usable IPs │       │ 62 usable IPs │
    └───────────────┘       └───────────────┘       └───────────────┘
                    `}
                  </Diagram>
                </section>

                <section id="why-subnet" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Why Do We Need Subnetting?</h3>

                  <Grid>
                    <Card title="IP Address Conservation" icon={Save}>
                      <p className="text-sm">Prevents waste by allocating only the needed number of IP addresses to each network segment.</p>
                    </Card>
                    <Card title="Reduced Network Traffic" icon={Activity}>
                      <p className="text-sm">Smaller broadcast domains mean less unnecessary traffic and better performance.</p>
                    </Card>
                    <Card title="Improved Security" icon={Shield}>
                      <p className="text-sm">Isolate sensitive departments or functions, control traffic with firewalls.</p>
                    </Card>
                    <Card title="Easier Management" icon={Settings}>
                      <p className="text-sm">Organize networks logically by department, location, or function.</p>
                    </Card>
                  </Grid>
                </section>

                <section id="benefits" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Benefits of Subnetting</h3>

                  <Table
                    headers={["Benefit", "Description", "Impact"]}
                    rows={[
                      ["Broadcast Control", "Limits broadcast traffic to subnet boundaries", "Reduced network congestion"],
                      ["Simplified Management", "Logical grouping of devices", "Easier troubleshooting"],
                      ["Enhanced Security", "Network segmentation", "Better access control"],
                      ["Geographic Distribution", "Optimize traffic for remote sites", "Improved WAN performance"],
                      ["Growth Management", "Room for expansion", "Scalable design"]
                    ]}
                  />
                </section>

                <section id="terminology" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Key Terminology</h3>

                  <Table
                    headers={["Term", "Definition", "Example"]}
                    rows={[
                      ["Network Address", "First IP in subnet, identifies the network", "192.168.1.0"],
                      ["Broadcast Address", "Last IP in subnet, reaches all hosts", "192.168.1.255"],
                      ["Subnet Mask", "Defines network and host portions", "255.255.255.0"],
                      ["CIDR Notation", "Shorthand for subnet mask", "/24"],
                      ["Host", "Any device with an IP address", "192.168.1.10"],
                      ["Octet", "8-bit segment of an IP address", "192, 168, 1, 0"],
                      ["Default Gateway", "Router IP for leaving subnet", "192.168.1.1"]
                    ]}
                  />
                </section>
              </section>

              {/* IP Address Review */}
              <section id="ip-address-review" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  IP Address Review
                </h2>

                <section id="ipv4-structure" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">IPv4 Address Structure</h3>

                  <p className="text-gray-300 mb-4">
                    An IPv4 address is a 32-bit number typically written in dotted-decimal notation: four 8-bit octets separated by dots.
                  </p>

                  <Diagram title="IPv4 Address Structure">
                    {`
                    32 bits total
    ┌─────────────────────────────────────────────────────┐
    │   Octet 1   │   Octet 2   │   Octet 3   │   Octet 4  │
    │   8 bits    │   8 bits    │   8 bits    │   8 bits   │
    ├─────────────┼─────────────┼─────────────┼─────────────┤
    │   192       │    168      │     1       │    10       │
    │ 11000000    │  10101000   │  00000001   │  00001010   │
    └─────────────┴─────────────┴─────────────┴─────────────┘
                    `}
                  </Diagram>

                  <CodeBlock
                    title="IP Address Binary Conversion"
                    language="text"
                    code={`192.168.1.10 in binary:

192 = 11000000
168 = 10101000
1   = 00000001
10  = 00001010

Complete: 11000000.10101000.00000001.00001010`}
                  />
                </section>

                <section id="address-classes" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Address Classes</h3>

                  <Table
                    headers={["Class", "First Octet", "Default Mask", "Network Bits", "Host Bits", "Networks", "Hosts/Network"]}
                    rows={[
                      ["A", "1-127", "/8 (255.0.0.0)", "8", "24", "126", "16,777,214"],
                      ["B", "128-191", "/16 (255.255.0.0)", "16", "16", "16,384", "65,534"],
                      ["C", "192-223", "/24 (255.255.255.0)", "24", "8", "2,097,152", "254"],
                      ["D", "224-239", "Multicast", "-", "-", "-", "-"],
                      ["E", "240-255", "Experimental", "-", "-", "-", "-"]
                    ]}
                  />

                  <Callout type="tip" title="Remembering Address Classes">
                    <ul className="list-disc pl-5">
                      <li><span className="text-green-500">Class A:</span> 1-127 (Very large networks)</li>
                      <li><span className="text-green-500">Class B:</span> 128-191 (Medium networks)</li>
                      <li><span className="text-green-500">Class C:</span> 192-223 (Small networks)</li>
                      <li><span className="text-green-500">Class D:</span> 224-239 (Multicast)</li>
                      <li><span className="text-green-500">Class E:</span> 240-255 (Research)</li>
                    </ul>
                  </Callout>
                </section>

                <section id="public-private" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Public vs Private IP Addresses</h3>

                  <p className="text-gray-300 mb-4">
                    Private IP addresses are reserved for internal networks and are not routable on the public internet:
                  </p>

                  <Table
                    headers={["RFC 1918 Range", "CIDR", "Number of Addresses"]}
                    rows={[
                      ["10.0.0.0 - 10.255.255.255", "10.0.0.0/8", "16,777,216"],
                      ["172.16.0.0 - 172.31.255.255", "172.16.0.0/12", "1,048,576"],
                      ["192.168.0.0 - 192.168.255.255", "192.168.0.0/16", "65,536"]
                    ]}
                  />

                  <Callout type="warning" title="Private IPs Are Not Routable">
                    Private IP addresses must be translated to public IPs via NAT (Network Address Translation)
                    to access the internet. This is why your home router uses 192.168.x.x internally but has a
                    different public IP assigned by your ISP.
                  </Callout>
                </section>

                <section id="special-addresses" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Special IPv4 Addresses</h3>

                  <Table
                    headers={["Address", "Purpose", "Description"]}
                    rows={[
                      ["0.0.0.0/8", "This network", "Used for DHCP and routing"],
                      ["127.0.0.0/8", "Loopback", "Localhost - tests local stack"],
                      ["169.254.0.0/16", "APIPA", "Self-assigned when DHCP fails"],
                      ["224.0.0.0/4", "Multicast", "One-to-many communication"],
                      ["240.0.0.0/4", "Reserved", "Future use"],
                      ["255.255.255.255", "Limited Broadcast", "Broadcast to local network"]
                    ]}
                  />
                </section>
              </section>

              {/* Subnet Masks */}
              <section id="subnet-masks" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Binary className="h-5 w-5" />
                  Subnet Masks
                </h2>

                <section id="what-is-subnet-mask" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">What is a Subnet Mask?</h3>

                  <p className="text-gray-300 mb-4">
                    A subnet mask is a 32-bit number that divides an IP address into network and host portions.
                    Bits set to 1 represent the network portion, while bits set to 0 represent the host portion.
                  </p>

                  <Diagram title="Subnet Mask Function">
                    {`
IP Address:     192.168.1.10     11000000.10101000.00000001.00001010
Subnet Mask:    255.255.255.0     11111111.11111111.11111111.00000000
                └───────┬───────┘ └───────────┬───────────┘
                    Network Bits          Host Bits
                        (24)                  (8)

Network Portion: 192.168.1.0 (all host bits = 0)
Host Portion:    0.0.0.10 (host bits only)
                    `}
                  </Diagram>
                </section>

                <section id="cidr-notation" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">CIDR Notation</h3>

                  <p className="text-gray-300 mb-4">
                    CIDR (Classless Inter-Domain Routing) notation specifies the number of network bits with a slash:
                  </p>

                  <Table
                    headers={["CIDR", "Subnet Mask", "Binary Mask", "Networks", "Hosts"]}
                    rows={[
                      ["/24", "255.255.255.0", "11111111.11111111.11111111.00000000", "1", "254"],
                      ["/25", "255.255.255.128", "11111111.11111111.11111111.10000000", "2", "126"],
                      ["/26", "255.255.255.192", "11111111.11111111.11111111.11000000", "4", "62"],
                      ["/27", "255.255.255.224", "11111111.11111111.11111111.11100000", "8", "30"],
                      ["/28", "255.255.255.240", "11111111.11111111.11111111.11110000", "16", "14"],
                      ["/29", "255.255.255.248", "11111111.11111111.11111111.11111000", "32", "6"],
                      ["/30", "255.255.255.252", "11111111.11111111.11111111.11111100", "64", "2"]
                    ]}
                  />
                </section>

                <section id="default-masks" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Default Subnet Masks</h3>

                  <Table
                    headers={["Class", "Default Mask", "CIDR", "Binary"]}
                    rows={[
                      ["A", "255.0.0.0", "/8", "11111111.00000000.00000000.00000000"],
                      ["B", "255.255.0.0", "/16", "11111111.11111111.00000000.00000000"],
                      ["C", "255.255.255.0", "/24", "11111111.11111111.11111111.00000000"]
                    ]}
                  />
                </section>

                <section id="custom-masks" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Custom Subnet Masks</h3>

                  <p className="text-gray-300 mb-4">
                    Custom masks borrow bits from the host portion to create more networks:
                  </p>

                  <Table
                    headers={["CIDR", "Mask", "Binary", "Subnets", "Hosts/Subnet"]}
                    rows={[
                      ["/24", "255.255.255.0", "11111111.11111111.11111111.00000000", "1", "254"],
                      ["/25", "255.255.255.128", "11111111.11111111.11111111.10000000", "2", "126"],
                      ["/26", "255.255.255.192", "11111111.11111111.11111111.11000000", "4", "62"],
                      ["/27", "255.255.255.224", "11111111.11111111.11111111.11100000", "8", "30"],
                      ["/28", "255.255.255.240", "11111111.11111111.11111111.11110000", "16", "14"],
                      ["/29", "255.255.255.248", "11111111.11111111.11111111.11111000", "32", "6"],
                      ["/30", "255.255.255.252", "11111111.11111111.11111111.11111100", "64", "2"]
                    ]}
                  />
                </section>
              </section>

              {/* Binary Math */}
              <section id="binary-math" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Sigma className="h-5 w-5" />
                  Binary Math for Subnetting
                </h2>

                <section id="binary-basics" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Binary Basics</h3>

                  <p className="text-gray-300 mb-4">
                    Computers use binary (base-2) with only two digits: 0 and 1. Each position represents a power of 2:
                  </p>

                  <Table
                    headers={["Bit Position", "Value (2^n)", "Binary Place Value"]}
                    rows={[
                      ["Bit 7 (leftmost)", "2^7 = 128", "128"],
                      ["Bit 6", "2^6 = 64", "64"],
                      ["Bit 5", "2^5 = 32", "32"],
                      ["Bit 4", "2^4 = 16", "16"],
                      ["Bit 3", "2^3 = 8", "8"],
                      ["Bit 2", "2^2 = 4", "4"],
                      ["Bit 1", "2^1 = 2", "2"],
                      ["Bit 0 (rightmost)", "2^0 = 1", "1"]
                    ]}
                  />

                  <CodeBlock
                    title="Binary to Decimal Example"
                    language="text"
                    code={`Binary: 1 1 0 0 0 0 0 0
Value:  128 + 64 + 0 + 0 + 0 + 0 + 0 + 0 = 192

Binary: 1 0 1 0 1 0 0 0
Value:  128 + 0 + 32 + 0 + 8 + 0 + 0 + 0 = 168

Binary: 0 0 0 0 1 0 1 0
Value:  0 + 0 + 0 + 0 + 8 + 0 + 2 + 0 = 10`}
                  />
                </section>

                <section id="powers-of-2" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Powers of 2 (Must Memorize!)</h3>

                  <Table
                    headers={["Exponent", "Value", "Exponent", "Value"]}
                    rows={[
                      ["2^0", "1", "2^8", "256"],
                      ["2^1", "2", "2^9", "512"],
                      ["2^2", "4", "2^10", "1,024"],
                      ["2^3", "8", "2^11", "2,048"],
                      ["2^4", "16", "2^12", "4,096"],
                      ["2^5", "32", "2^13", "8,192"],
                      ["2^6", "64", "2^14", "16,384"],
                      ["2^7", "128", "2^15", "32,768"]
                    ]}
                  />

                  <Callout type="tip" title="Subnetting Formula">
                    <ul className="list-disc pl-5">
                      <li><span className="text-green-500">Number of subnets:</span> 2^(borrowed bits)</li>
                      <li><span className="text-green-500">Number of hosts per subnet:</span> 2^(remaining host bits) - 2</li>
                      <li><span className="text-green-500">Magic number:</span> 256 - subnet mask value</li>
                    </ul>
                  </Callout>
                </section>

                <section id="binary-to-decimal" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Binary to Decimal Conversion Practice</h3>

                  <CodeBlock
                    title="Practice Problems"
                    language="text"
                    code={`Convert these binary numbers to decimal:

1. 11000000 = ?
   (128 + 64 = 192)

2. 11110000 = ?
   (128 + 64 + 32 + 16 = 240)

3. 10101000 = ?
   (128 + 0 + 32 + 0 + 8 + 0 + 0 + 0 = 168)

4. 11111111 = ?
   (128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255)

5. 00001111 = ?
   (0 + 0 + 0 + 0 + 8 + 4 + 2 + 1 = 15)`}
                  />
                </section>
              </section>

              {/* Subnet Calculation */}
              <section id="subnet-calculation" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Subnet Calculation
                </h2>

                <section id="network-address" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Finding the Network Address</h3>

                  <p className="text-gray-300 mb-4">
                    The network address is found by performing a bitwise AND between the IP address and subnet mask:
                  </p>

                  <CodeBlock
                    title="Network Address Calculation"
                    language="text"
                    code={`IP:         192.168.1.130   11000000.10101000.00000001.10000010
Mask:       255.255.255.192 11111111.11111111.11111111.11000000
AND Result: 192.168.1.128   11000000.10101000.00000001.10000000

Network Address: 192.168.1.128/26`}
                  />

                  <p className="text-gray-300 mt-4">
                    <span className="text-green-500">Magic Number Method:</span> 256 - 192 = 64.
                    Network boundaries occur at multiples of 64: 0, 64, 128, 192. 130 falls between 128 and 192, so network is 128.
                  </p>
                </section>

                <section id="broadcast-address" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Finding the Broadcast Address</h3>

                  <p className="text-gray-300 mb-4">
                    The broadcast address is the last IP in the subnet. It's the network address with all host bits set to 1:
                  </p>

                  <CodeBlock
                    title="Broadcast Address Calculation"
                    language="text"
                    code={`Network:    192.168.1.128   11000000.10101000.00000001.10000000
Host bits all 1s:                  .00111111 (host bits only)
Add to network:                    10000000 + 00111111 = 10111111

Broadcast:  192.168.1.191   11000000.10101000.00000001.10111111

Magic Number Method: Next network = 192, so broadcast = 192 - 1 = 191`}
                  />
                </section>

                <section id="first-last-host" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">First and Last Usable Host</h3>

                  <p className="text-gray-300 mb-4">
                    The first usable host is network + 1, the last usable host is broadcast - 1:
                  </p>

                  <Table
                    headers={["Item", "Address", "Binary"]}
                    rows={[
                      ["Network", "192.168.1.128", "11000000.10101000.00000001.10000000"],
                      ["First Host", "192.168.1.129", "11000000.10101000.00000001.10000001"],
                      ["Last Host", "192.168.1.190", "11000000.10101000.00000001.10111110"],
                      ["Broadcast", "192.168.1.191", "11000000.10101000.00000001.10111111"]
                    ]}
                  />
                </section>

                <section id="total-hosts" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Total Hosts per Subnet</h3>

                  <p className="text-gray-300 mb-4">
                    Formula: <span className="text-green-500 font-mono">2^(32-CIDR) - 2</span>
                  </p>

                  <Table
                    headers={["CIDR", "Mask", "Total Addresses", "Usable Hosts"]}
                    rows={[
                      ["/24", "255.255.255.0", "256", "254"],
                      ["/25", "255.255.255.128", "128", "126"],
                      ["/26", "255.255.255.192", "64", "62"],
                      ["/27", "255.255.255.224", "32", "30"],
                      ["/28", "255.255.255.240", "16", "14"],
                      ["/29", "255.255.255.248", "8", "6"],
                      ["/30", "255.255.255.252", "4", "2"]
                    ]}
                  />

                  <Callout type="tip" title="Why subtract 2?">
                    The network address (all host bits 0) and broadcast address (all host bits 1) cannot be assigned to hosts.
                  </Callout>
                </section>
              </section>

              {/* Classful Subnetting */}
              <section id="subnetting-classful" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Grid3x3 className="h-5 w-5" />
                  Classful Subnetting Examples
                </h2>

                <section id="class-c" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Class C Subnetting (/24)</h3>

                  <p className="text-gray-300 mb-4">
                    Class C networks have 8 host bits. Let's subnet 192.168.1.0/24 with /26 mask:
                  </p>

                  <Table
                    headers={["Subnet", "Network", "First Host", "Last Host", "Broadcast"]}
                    rows={[
                      ["1", "192.168.1.0/26", "192.168.1.1", "192.168.1.62", "192.168.1.63"],
                      ["2", "192.168.1.64/26", "192.168.1.65", "192.168.1.126", "192.168.1.127"],
                      ["3", "192.168.1.128/26", "192.168.1.129", "192.168.1.190", "192.168.1.191"],
                      ["4", "192.168.1.192/26", "192.168.1.193", "192.168.1.254", "192.168.1.255"]
                    ]}
                  />

                  <CodeBlock
                    title="Class C Subnetting Formula"
                    language="text"
                    code={`Network: 192.168.1.0/24
Need 4 subnets → borrow 2 bits (2^2 = 4)
New mask: /26 (255.255.255.192)
Magic number: 256 - 192 = 64

Subnet ranges:
0-63   → 192.168.1.0 - 192.168.1.63
64-127 → 192.168.1.64 - 192.168.1.127
128-191→ 192.168.1.128 - 192.168.1.191
192-255→ 192.168.1.192 - 192.168.1.255`}
                  />
                </section>

                <section id="class-b" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Class B Subnetting (/16)</h3>

                  <p className="text-gray-300 mb-4">
                    Class B networks have 16 host bits. Subnetting 172.16.0.0/16 with /20 mask:
                  </p>

                  <Table
                    headers={["Subnet", "Network", "Host Range", "Broadcast"]}
                    rows={[
                      ["1", "172.16.0.0/20", "172.16.0.1 - 172.16.15.254", "172.16.15.255"],
                      ["2", "172.16.16.0/20", "172.16.16.1 - 172.16.31.254", "172.16.31.255"],
                      ["3", "172.16.32.0/20", "172.16.32.1 - 172.16.47.254", "172.16.47.255"],
                      ["4", "172.16.48.0/20", "172.16.48.1 - 172.16.63.254", "172.16.63.255"]
                    ]}
                  />
                </section>
              </section>

              {/* VLSM */}
              <section id="vlsm" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  VLSM - Variable Length Subnet Masks
                </h2>

                <section id="what-is-vlsm" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">What is VLSM?</h3>

                  <p className="text-gray-300 mb-4">
                    VLSM allows using different subnet masks within the same major network, optimizing IP address usage
                    by assigning exactly the right size subnet to each network segment.
                  </p>

                  <Diagram title="VLSM Example">
                    {`
                    ┌─────────────────────────────────────┐
                    │    172.16.0.0/16 (Major Network)   │
                    └─────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────┐           ┌───────────────┐           ┌───────────────┐
│   HQ Network  │           │ Branch Office │           │  Remote Site  │
│   /24         │           │   /26         │           │   /29         │
│   254 hosts   │           │   62 hosts    │           │   6 hosts     │
└───────────────┘           └───────────────┘           └───────────────┘
172.16.1.0/24              172.16.2.0/26               172.16.2.64/29
                    `}
                  </Diagram>
                </section>

                <section id="vlsm-calculation" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">VLSM Calculation Steps</h3>

                  <Step number={1} title="List Network Requirements">
                    <p>Identify how many hosts each subnet needs, sorted from largest to smallest.</p>
                  </Step>

                  <Step number={2} title="Assign Largest Subnet First">
                    <p>Start with the network requiring the most hosts, allocate the smallest subnet that fits.</p>
                  </Step>

                  <Step number={3} title="Move to Next Largest">
                    <p>Continue with the next largest requirement, allocating from remaining address space.</p>
                  </Step>

                  <Step number={4} title="Document">
                    <p>Keep careful track of allocated ranges to avoid overlap.</p>
                  </Step>
                </section>

                <section id="vlsm-examples" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">VLSM Example Problem</h3>

                  <CodeBlock
                    title="VLSM Network Design"
                    language="text"
                    code={`Network: 192.168.1.0/24
Requirements:
- LAN A: 60 hosts
- LAN B: 30 hosts
- LAN C: 10 hosts
- WAN Link 1: 2 hosts
- WAN Link 2: 2 hosts

Solution (largest to smallest):

1. LAN A (60 hosts) needs /26 (62 hosts)
   192.168.1.0/26 (1-62)

2. LAN B (30 hosts) needs /27 (30 hosts)
   192.168.1.64/27 (65-94)

3. LAN C (10 hosts) needs /28 (14 hosts)
   192.168.1.96/28 (97-110)

4. WAN Link 1 (2 hosts) needs /30 (2 hosts)
   192.168.1.112/30 (113-114)

5. WAN Link 2 (2 hosts) needs /30 (2 hosts)
   192.168.1.116/30 (117-118)

Remaining: 192.168.1.120-192.168.1.255 (for future growth)`}
                  />
                </section>
              </section>

              {/* CIDR */}
              <section id="cidr" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Workflow className="h-5 w-5" />
                  CIDR - Classless Inter-Domain Routing
                </h2>

                <section id="what-is-cidr" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">What is CIDR?</h3>

                  <p className="text-gray-300 mb-4">
                    CIDR replaced classful addressing, allowing arbitrary network boundaries. It's the foundation of modern
                    routing and enables route aggregation (supernetting) to reduce routing table size.
                  </p>
                </section>

                <section id="route-aggregation" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Route Aggregation (Supernetting)</h3>

                  <CodeBlock
                    title="Route Aggregation Example"
                    language="text"
                    code={`Networks to aggregate:
192.168.1.0/24
192.168.2.0/24
192.168.3.0/24
192.168.4.0/24

Find common bits:
192.168.1.0 = 11000000.10101000.00000001.00000000
192.168.2.0 = 11000000.10101000.00000010.00000000
192.168.3.0 = 11000000.10101000.00000011.00000000
192.168.4.0 = 11000000.10101000.00000100.00000000

Common prefix: 11000000.10101000.00000 (22 bits)
Aggregated route: 192.168.0.0/22

Covers 192.168.0.0 to 192.168.3.255`}
                  />
                </section>
              </section>

              {/* Subnetting Tables */}
              <section id="subnetting-tables" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Grid3x3 className="h-5 w-5" />
                  Subnetting Tables & Cheat Sheets
                </h2>

                <section id="cidr-table" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Complete CIDR Subnet Table</h3>

                  <Table
                    headers={["CIDR", "Mask", "Networks (/24)", "Hosts", "Wildcard"]}
                    rows={[
                      ["/30", "255.255.255.252", "64", "2", "0.0.0.3"],
                      ["/29", "255.255.255.248", "32", "6", "0.0.0.7"],
                      ["/28", "255.255.255.240", "16", "14", "0.0.0.15"],
                      ["/27", "255.255.255.224", "8", "30", "0.0.0.31"],
                      ["/26", "255.255.255.192", "4", "62", "0.0.0.63"],
                      ["/25", "255.255.255.128", "2", "126", "0.0.0.127"],
                      ["/24", "255.255.255.0", "1", "254", "0.0.0.255"],
                      ["/23", "255.255.254.0", "2 (combined)", "510", "0.0.1.255"],
                      ["/22", "255.255.252.0", "4 (combined)", "1022", "0.0.3.255"],
                      ["/21", "255.255.248.0", "8 (combined)", "2046", "0.0.7.255"],
                      ["/20", "255.255.240.0", "16 (combined)", "4094", "0.0.15.255"]
                    ]}
                  />
                </section>

                <section id="magic-number" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">The Magic Number Method</h3>

                  <p className="text-gray-300 mb-4">
                    The magic number is 256 minus the interesting octet's subnet mask value:
                  </p>

                  <CodeBlock
                    title="Magic Number Examples"
                    language="text"
                    code={`Mask: 255.255.255.192 → Magic number = 256 - 192 = 64
Network boundaries: 0, 64, 128, 192

Mask: 255.255.255.224 → Magic number = 256 - 224 = 32
Network boundaries: 0, 32, 64, 96, 128, 160, 192, 224

Mask: 255.255.255.240 → Magic number = 256 - 240 = 16
Network boundaries: 0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240

Mask: 255.255.255.248 → Magic number = 256 - 248 = 8
Network boundaries: 0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176, 184, 192, 200, 208, 216, 224, 232, 240, 248`}
                  />
                </section>
              </section>

              {/* IPv6 Subnetting */}
              <section id="ipv6-subnetting" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Satellite className="h-5 w-5" />
                  IPv6 Subnetting
                </h2>

                <section id="ipv6-address" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">IPv6 Address Structure</h3>

                  <p className="text-gray-300 mb-4">
                    IPv6 uses 128-bit addresses written in hexadecimal. Subnetting is much simpler due to the abundance of addresses:
                  </p>

                  <CodeBlock
                    title="IPv6 Address Format"
                    language="text"
                    code={`2001:0db8:85a3:0000:0000:8a2e:0370:7334
│    │    │    │    │    │    │    └─ Interface ID (64 bits)
│    │    │    │    │    │    └─────── Interface ID (continued)
│    │    │    │    │    └──────────── Interface ID (continued)
│    │    │    │    └───────────────── Subnet ID (16 bits)
│    │    │    └────────────────────── Subnet ID (continued)
│    │    └─────────────────────────── Global Routing Prefix (48 bits)
│    └──────────────────────────────── Global Routing Prefix (continued)
└───────────────────────────────────── Global Routing Prefix (continued)`}
                  />
                </section>

                <section id="ipv6-subnetting" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">IPv6 Subnetting Concepts</h3>

                  <p className="text-gray-300 mb-4">
                    With 2^64 possible subnets, we can assign /64 subnets to every network segment without worry:
                  </p>

                  <Table
                    headers={["Prefix", "Subnets", "Use Case"]}
                    rows={[
                      ["/48", "65,536 /64 subnets", "Site allocation"],
                      ["/56", "256 /64 subnets", "Small site"],
                      ["/64", "18,446,744,073,709,551,616 addresses", "Standard subnet"],
                      ["/127", "2 addresses", "Point-to-point links"]
                    ]}
                  />
                </section>
              </section>

              {/* Practice Exercises */}
              <section id="practice-exercises" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Practice Exercises
                </h2>

                <section id="beginner" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Beginner Exercises</h3>

                  <CodeBlock
                    title="Basic Subnetting Questions"
                    language="text"
                    code={`1. What is the network address of 192.168.1.37/28?
   Magic number: 256-240=16 → 32 is multiple of 16 below 37
   Answer: 192.168.1.32

2. How many usable hosts in a /27 network?
   2^(32-27) = 2^5 = 32 total addresses
   32 - 2 = 30 usable hosts

3. What is the broadcast of 10.0.0.64/26?
   Magic number: 64, next network: 128, broadcast = 127
   Answer: 10.0.0.127

4. Is 172.16.5.129/25 a valid host?
   Network: 172.16.5.128/25
   Host range: 129-254 → Yes, it's valid

5. What subnet mask is /23?
   11111111.11111111.11111110.00000000
   Answer: 255.255.254.0`}
                  />
                </section>

                <section id="intermediate" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Intermediate Exercises</h3>

                  <CodeBlock
                    title="VLSM Practice"
                    language="text"
                    code={`Design subnets for 192.168.5.0/24 with requirements:
- Sales: 50 hosts
- HR: 25 hosts
- IT: 12 hosts
- Management: 6 hosts
- Guest: 2 hosts

Solution (largest to smallest):

1. Sales (50 hosts): /26 (62 hosts)
   192.168.5.0/26 (1-62)

2. HR (25 hosts): /27 (30 hosts)
   192.168.5.64/27 (65-94)

3. IT (12 hosts): /28 (14 hosts)
   192.168.5.96/28 (97-110)

4. Management (6 hosts): /29 (6 hosts)
   192.168.5.112/29 (113-118)

5. Guest (2 hosts): /30 (2 hosts)
   192.168.5.120/30 (121-122)

Remaining: 192.168.5.124-255 for future`}
                  />
                </section>
              </section>

              {/* Troubleshooting */}
              <section id="troubleshooting" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Troubleshooting
                </h2>

                <section id="common-mistakes" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Common Subnetting Mistakes</h3>

                  <Table
                    headers={["Mistake", "Description", "Solution"]}
                    rows={[
                      ["Forgetting to subtract 2", "Counting network and broadcast as usable", "Always subtract 2 from total hosts"],
                      ["Wrong magic number", "Using wrong interesting octet", "Focus on octet where mask ≠ 255"],
                      ["Overlapping subnets", "Address ranges conflict", "Document carefully, check calculations"],
                      ["Wrong CIDR notation", "/24 vs /24 mask confusion", "Practice conversion between formats"],
                      ["Subnet zero confusion", "Whether to use first subnet", "Modern networks allow it"]
                    ]}
                  />
                </section>

                <section id="verification" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Verification Tools</h3>

                  <CodeBlock
                    title="Command Line Verification"
                    language="bash"
                    code={`# Linux/Unix verification
ip addr show
ifconfig
route -n

# Windows verification
ipconfig /all
route print
ping -t

# Ping to verify connectivity
ping 192.168.1.1

# Traceroute to verify path
tracert 8.8.8.8
traceroute 8.8.8.8

# Check ARP cache
arp -a

# Online calculators (always double-check!)
- subnet-calculator.com
- subnet.ninja
- ipcalc (command line)`}
                  />
                </section>
              </section>

              {/* Resources */}
              <section id="resources" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Resources</h2>

                <Grid>
                  <Card title="Online Calculators" icon={Calculator}>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Subnet Calculator
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          IP Address Calculator
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          VLSM Calculator
                        </a>
                      </li>
                    </ul>
                  </Card>

                  <Card title="Practice Tools" icon={Brain}>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Subnetting Practice
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Cisco Subnetting Game
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Packet Tracer Labs
                        </a>
                      </li>
                    </ul>
                  </Card>

                  <Card title="Books" icon={BookOpen}>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          CCNA Official Guide
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          TCP/IP Illustrated
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Subnetting for Beginners
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
                    Subnetting is a fundamental networking skill that every IT professional must master.
                    By understanding how to divide networks efficiently, you can design scalable, secure,
                    and well-organized IP schemes for any size organization.
                  </p>

                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><span className="text-green-500">Subnet masks</span> define network/host boundaries</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><span className="text-green-500">CIDR notation</span> simplifies mask representation</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><span className="text-green-500">VLSM</span> optimizes address usage</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><span className="text-green-500">Magic number method</span> enables quick calculations</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><span className="text-green-500">IPv6</span> makes subnetting much simpler</span>
                    </li>
                  </ul>

                  <p className="text-gray-300 leading-relaxed mb-4">
                    Remember: subnetting is like pizza - you can slice it many ways, but you always lose the crust
                    (network and broadcast addresses)! Practice regularly with online tools and real-world scenarios
                    to build speed and confidence.
                  </p>

                  <div className="flex flex-wrap gap-4 mt-6">
                    <Link
                      href="/resources/networking/osi-model"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 hover:bg-green-500/20 transition-colors"
                    >
                      <Layers className="h-4 w-4" />
                      <span>OSI Model</span>
                    </Link>

                    <Link
                      href="/resources/mikrotik"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-lg text-gray-300 hover:text-green-500 hover:border-green-500/20 transition-colors"
                    >
                      <Router className="h-4 w-4" />
                      <span>MikroTik Guides</span>
                    </Link>

                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-lg text-gray-300 hover:text-green-500 hover:border-green-500/20 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Practice Subnetting</span>
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
                    Subnetting Quick Facts
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li className="flex justify-between">
                      <span>Network bits + Host bits:</span>
                      <span className="font-mono text-green-500">32</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Usable hosts formula:</span>
                      <span className="font-mono text-green-500">2^h - 2</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Magic number:</span>
                      <span className="font-mono text-green-500">256 - mask</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Private ranges:</span>
                      <span className="font-mono text-green-500">3</span>
                    </li>
                    <li className="flex justify-between">
                      <span>IPv6 subnet size:</span>
                      <span className="font-mono text-green-500">/64</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Last updated: March 2024
                    <br />
                    Master subnetting with practice
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
