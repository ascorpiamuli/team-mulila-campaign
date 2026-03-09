"use client";
// src/app/resources/networking/routing/page.tsx
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
  Database as DatabaseIcon,
  Link as LinkIcon,
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
  Calculator as CalculatorIcon,
  Map,
  Route,
  MapPin as MapPinIcon,
  Navigation as NavigationIcon,
  Compass as CompassIcon,
  GitFork,
  Split as SplitIcon,
  Combine as CombineIcon,
  Workflow as WorkflowIcon,
  Waypoints as WaypointsIcon,
  Timer,
  Watch,
  Gauge as GaugeIcon,
  Activity as ActivityIcon,
  BarChart,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon2,
  TrendingUp as TrendingUpIcon2,
  Zap as ZapIcon,
  Shield as ShieldIcon2,
  Lock as LockIcon2,
  Globe as GlobeIcon,
  Network as NetworkIcon,
  Server as ServerIcon2,
  Database as DatabaseIcon2,
  Cloud as CloudIcon3,
  Wifi as WifiIcon3
} from "lucide-react";
import React, { useState, ReactNode } from 'react';

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
    title: "Introduction to Routing",
    icon: BookOpen,
    subsections: [
      { id: "what-is-routing", title: "What is Routing?" },
      { id: "how-routing-works", title: "How Routing Works" },
      { id: "routing-vs-switching", title: "Routing vs Switching" },
      { id: "benefits", title: "Benefits of Routing" }
    ]
  },
  {
    id: "routing-basics",
    title: "Routing Basics",
    icon: Router,
    subsections: [
      { id: "routers", title: "Routers" },
      { id: "interfaces", title: "Router Interfaces" },
      { id: "routing-tables", title: "Routing Tables" },
      { id: "metrics", title: "Routing Metrics" },
      { id: "administrative-distance", title: "Administrative Distance" }
    ]
  },
  {
    id: "static-routing",
    title: "Static Routing",
    icon: Map,
    subsections: [
      { id: "what-is-static", title: "What is Static Routing?" },
      { id: "configuring-static", title: "Configuring Static Routes" },
      { id: "default-routes", title: "Default Routes" },
      { id: "floating-static", title: "Floating Static Routes" },
      { id: "static-advantages", title: "Advantages & Disadvantages" }
    ]
  },
  {
    id: "dynamic-routing",
    title: "Dynamic Routing",
    icon: GitBranch,
    subsections: [
      { id: "what-is-dynamic", title: "What is Dynamic Routing?" },
      { id: "igp-egp", title: "IGP vs EGP" },
      { id: "distance-vector", title: "Distance Vector Protocols" },
      { id: "link-state", title: "Link State Protocols" },
      { id: "hybrid", title: "Hybrid Protocols" }
    ]
  },
  {
    id: "routing-protocols",
    title: "Routing Protocols",
    icon: Workflow,
    subsections: [
      { id: "rip", title: "RIP (Routing Information Protocol)" },
      { id: "ospf", title: "OSPF (Open Shortest Path First)" },
      { id: "eigrp", title: "EIGRP (Enhanced Interior Gateway Routing Protocol)" },
      { id: "bgp", title: "BGP (Border Gateway Protocol)" },
      { id: "isis", title: "IS-IS (Intermediate System to Intermediate System)" }
    ]
  },
  {
    id: "rip",
    title: "RIP - Routing Information Protocol",
    icon: Radio,
    subsections: [
      { id: "rip-overview", title: "RIP Overview" },
      { id: "rip-versions", title: "RIPv1 vs RIPv2" },
      { id: "ripng", title: "RIPng (IPv6)" },
      { id: "rip-metrics", title: "Hop Count Metric" },
      { id: "rip-timers", title: "RIP Timers" },
      { id: "rip-config", title: "Configuring RIP" }
    ]
  },
  {
    id: "ospf",
    title: "OSPF - Open Shortest Path First",
    icon: GitFork,
    subsections: [
      { id: "ospf-overview", title: "OSPF Overview" },
      { id: "ospf-terminology", title: "OSPF Terminology" },
      { id: "lsa-types", title: "LSA Types" },
      { id: "ospf-areas", title: "OSPF Areas" },
      { id: "dr-bdr", title: "DR and BDR" },
      { id: "ospf-config", title: "Configuring OSPF" }
    ]
  },
  {
    id: "eigrp",
    title: "EIGRP - Enhanced IGRP",
    icon: Combine,
    subsections: [
      { id: "eigrp-overview", title: "EIGRP Overview" },
      { id: "eigrp-features", title: "EIGRP Features" },
      { id: "dual-algorithm", title: "DUAL Algorithm" },
      { id: "successor-fs", title: "Successor & Feasible Successor" },
      { id: "eigrp-metrics", title: "EIGRP Metrics" },
      { id: "eigrp-config", title: "Configuring EIGRP" }
    ]
  },
  {
    id: "bgp",
    title: "BGP - Border Gateway Protocol",
    icon: Globe,
    subsections: [
      { id: "bgp-overview", title: "BGP Overview" },
      { id: "ebgp-ibgp", title: "eBGP vs iBGP" },
      { id: "bgp-attributes", title: "BGP Attributes" },
      { id: "bgp-path-selection", title: "Path Selection" },
      { id: "bgp-config", title: "Configuring BGP" }
    ]
  },
  {
    id: "route-selection",
    title: "Route Selection",
    icon: Navigation,
    subsections: [
      { id: "longest-match", title: "Longest Prefix Match" },
      { id: "admin-distance", title: "Administrative Distance" },
      { id: "metrics-comparison", title: "Metric Comparison" },
      { id: "load-balancing", title: "Load Balancing" },
      { id: "policy-routing", title: "Policy-Based Routing" }
    ]
  },
  {
    id: "redistribution",
    title: "Route Redistribution",
    icon: Split,
    subsections: [
      { id: "what-is-redistribution", title: "What is Redistribution?" },
      { id: "redistribution-metrics", title: "Seed Metrics" },
      { id: "redistribution-filtering", title: "Filtering Redistributed Routes" },
      { id: "redistribution-examples", title: "Configuration Examples" }
    ]
  },
  {
    id: "ipv6-routing",
    title: "IPv6 Routing",
    icon: Satellite,
    subsections: [
      { id: "ipv6-routing-overview", title: "IPv6 Routing Overview" },
      { id: "ripng", title: "RIPng" },
      { id: "ospfv3", title: "OSPFv3" },
      { id: "eigrpv6", title: "EIGRP for IPv6" },
      { id: "bgp4", title: "BGP-4" }
    ]
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: Wrench,
    subsections: [
      { id: "common-issues", title: "Common Routing Issues" },
      { id: "verification-commands", title: "Verification Commands" },
      { id: "debugging", title: "Debugging Routing Protocols" },
      { id: "routing-loops", title: "Routing Loops" },
      { id: "black-holes", title: "Black Holes" }
    ]
  },
  {
    id: "advanced-topics",
    title: "Advanced Topics",
    icon: Rocket,
    subsections: [
      { id: "mpls", title: "MPLS" },
      { id: "vrf", title: "VRF" },
      { id: "segment-routing", title: "Segment Routing" },
      { id: "sdn", title: "SDN and Routing" },
      { id: "virtual-routers", title: "Virtual Routers" }
    ]
  },
  {
    id: "resources",
    title: "Resources",
    icon: Database,
    subsections: [
      { id: "books", title: "Recommended Books" },
      { id: "videos", title: "Video Tutorials" },
      { id: "labs", title: "Practice Labs" },
      { id: "certification", title: "Certification Paths" }
    ]
  }
];

// Highlights for right panel
const highlights: Highlight[] = [
  {
    id: "admin-distance",
    title: "📏 Administrative Distance",
    description: "Lower AD = More trusted. Connected: 0, Static: 1, EIGRP: 90, OSPF: 110, RIP: 120, External EIGRP: 170, Unknown: 255",
    category: "tip",
    icon: Gauge
  },
  {
    id: "ospf-cost",
    title: "💰 OSPF Cost Formula",
    description: "Cost = Reference Bandwidth / Interface Bandwidth. Default reference is 100 Mbps",
    category: "tip",
    icon: Calculator
  },
  {
    id: "eigrp-metric",
    title: "🧮 EIGRP Metric Formula",
    description: "Metric = 256*((K1*Bw) + (K2*Bw)/(256-Load) + K3*Delay) * (K5/(Reliability + K4))",
    category: "note",
    icon: Sigma
  },
  {
    id: "bgp-attributes",
    title: "🎯 BGP Path Selection",
    description: "1. Highest Weight, 2. Highest Local Pref, 3. Originate, 4. Shortest AS Path, 5. Lowest Origin, 6. Lowest MED",
    category: "tip",
    icon: TrendingUp
  },
  {
    id: "routing-loops",
    title: "⚠️ Routing Loops",
    description: "Packets circulate endlessly. Prevent with split horizon, route poisoning, and hold-down timers",
    category: "warning",
    icon: AlertTriangle
  },
  {
    id: "default-route",
    title: "🌐 Default Route",
    description: "0.0.0.0/0 - The route of last resort. Used when no specific match is found",
    category: "tip",
    icon: Globe
  },
  {
    id: "floating-static",
    title: "⚖️ Floating Static Routes",
    description: "Static routes with higher AD than dynamic routes. Used for backup connections",
    category: "best-practice",
    icon: RefreshCw
  },
  {
    id: "ospf-areas",
    title: "🗺️ OSPF Areas",
    description: "Area 0 is backbone. All other areas must connect to Area 0. Stub areas reduce LSDB size",
    category: "note",
    icon: Map
  },
  {
    id: "split-horizon",
    title: "🔄 Split Horizon",
    description: "Never advertise a route back out the interface you learned it from. Prevents routing loops",
    category: "tip",
    icon: Split
  },
  {
    id: "route-summarization",
    title: "📊 Route Summarization",
    description: "Combine multiple routes into one. Reduces routing table size and improves stability",
    category: "best-practice",
    icon: Combine
  },
  {
    id: "passive-interface",
    title: "🔒 Passive Interface",
    description: "Interface that participates in routing but doesn't send routing updates. Good for security",
    category: "best-practice",
    icon: Shield
  },
  {
    id: "bgp-communities",
    title: "🏷️ BGP Communities",
    description: "Tags that control routing policy. NO_EXPORT, NO_ADVERTISE, LOCAL_AS are well-known",
    category: "tip",
    icon: Tag
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

const Callout = ({ type, title, children }: { type: 'info' | 'warning' | 'success' | 'error' | 'tip' | 'best-practice'; title?: string; children: React.ReactNode }) => {
  const styles = {
    info: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: Info, text: 'text-blue-400' },
    warning: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: AlertTriangle, text: 'text-yellow-400' },
    success: { bg: 'bg-green-500/10', border: 'border-green-500/20', icon: CheckCircle, text: 'text-green-400' },
    error: { bg: 'bg-red-500/10', border: 'border-red-500/20', icon: XCircle, text: 'text-red-400' },
    tip: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: Lightbulb, text: 'text-purple-400' },
    'best-practice': { bg: 'bg-green-500/10', border: 'border-green-500/20', icon: CheckCircle, text: 'text-green-400' },
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

interface TabProps {
  label: string;
  children: React.ReactNode;
}

const Tab = ({ label, children }: TabProps) => (
  <div>{children}</div>
);

const Tabs = ({ children }: { children: React.ReactElement<TabProps>[] }) => {
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

export default function RoutingPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [expandedSections, setExpandedSections] = useState<string[]>(['introduction', 'routing-basics', 'routing-protocols']);
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
              <span className="text-green-500 truncate">Routing</span>
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
                <h4 className="font-mono text-sm font-semibold text-green-500 mb-2">📚 Routing Quick Reference</h4>
                <ul className="space-y-2 text-xs text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>AD: Connected 0, Static 1, EIGRP 90, OSPF 110, RIP 120</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Longest match wins in routing table</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Default route: 0.0.0.0/0</span>
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
                  Introduction to Routing
                </h2>

                <section id="what-is-routing" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">What is Routing?</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Routing is the process of selecting paths in a network along which to send network traffic.
                    Routers perform routing by forwarding packets from one network to another based on routing tables
                    and routing protocols. Routing directs packet forwarding, the transit of logically addressed packets
                    from their source toward their ultimate destination through intermediate nodes.
                  </p>

                  <Diagram title="Basic Routing Concept">
                    {`
    ┌─────────┐         ┌─────────┐         ┌─────────┐
    │  Host A │────────▶│ Router  │────────▶│  Host B │
    │ 10.0.0.2│         │10.0.0.1 │         │ 20.0.0.2│
    └─────────┘         │20.0.0.1 │         └─────────┘
                        └─────────┘

    Packet Path: Host A → Router → Host B
    Routing Table: 20.0.0.0/24 via interface to Host B
`}
                  </Diagram>
                </section>

                <section id="how-routing-works" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">How Routing Works</h3>

                  <Grid>
                    <Card title="Packet Forwarding" icon={Share2}>
                      <p className="text-sm">Routers examine destination IP, consult routing table, and forward to next hop.</p>
                    </Card>
                    <Card title="Routing Tables" icon={Database}>
                      <p className="text-sm">Store known networks, next hops, and metrics for path selection.</p>
                    </Card>
                    <Card title="Path Determination" icon={Map}>
                      <p className="text-sm">Algorithms calculate best paths based on metrics and policies.</p>
                    </Card>
                    <Card title="Route Propagation" icon={RefreshCw}>
                      <p className="text-sm">Dynamic protocols share routing information between routers.</p>
                    </Card>
                  </Grid>

                  <Step number={1} title="Packet Arrives">
                    <p>Router receives packet on an interface, extracts destination IP address.</p>
                  </Step>

                  <Step number={2} title="Route Lookup">
                    <p>Router searches routing table for longest prefix match to destination.</p>
                  </Step>

                  <Step number={3} title="Next Hop Selection">
                    <p>Identifies next hop IP and outgoing interface from matched route.</p>
                  </Step>

                  <Step number={4} title="Packet Forwarding">
                    <p>Rewrites layer 2 headers and forwards packet to next hop.</p>
                  </Step>
                </section>

                <section id="routing-vs-switching" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Routing vs Switching</h3>

                  <Table
                    headers={["Characteristic", "Routing", "Switching"]}
                    rows={[
                      ["Layer", "Layer 3 (Network)", "Layer 2 (Data Link)"],
                      ["Device", "Router", "Switch"],
                      ["Addressing", "IP Addresses", "MAC Addresses"],
                      ["Decision Basis", "Routing tables, protocols", "MAC address table"],
                      ["Broadcast Domain", "Separates broadcast domains", "Single broadcast domain"],
                      ["Default Gateway", "Required for inter-network", "Not required"],
                      ["Protocols", "OSPF, EIGRP, BGP, RIP", "STP, VLANs, trunking"],
                      ["Scope", "Between networks", "Within network segment"]
                    ]}
                  />

                  <Callout type="info" title="Key Distinction">
                    Switches connect devices within the same network, while routers connect different networks
                    and provide the path to the internet.
                  </Callout>
                </section>

                <section id="benefits" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Benefits of Routing</h3>

                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li><span className="text-green-500">Network Segmentation:</span> Divide large networks into smaller, manageable segments</li>
                    <li><span className="text-green-500">Broadcast Control:</span> Routers don't forward broadcasts, reducing unnecessary traffic</li>
                    <li><span className="text-green-500">Path Optimization:</span> Choose best paths based on metrics like bandwidth, delay</li>
                    <li><span className="text-green-500">Redundancy:</span> Multiple paths provide failover capabilities</li>
                    <li><span className="text-green-500">Security:</span> ACLs and firewall capabilities at network boundaries</li>
                    <li><span className="text-green-500">Scalability:</span> Hierarchical routing enables large networks like the Internet</li>
                    <li><span className="text-green-500">Traffic Management:</span> QoS, load balancing, and policy-based routing</li>
                  </ul>
                </section>
              </section>

              {/* Routing Basics */}
              <section id="routing-basics" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Router className="h-5 w-5" />
                  Routing Basics
                </h2>

                <section id="routers" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Routers</h3>
                  <p className="text-gray-300 mb-4">
                    A router is a networking device that forwards data packets between computer networks.
                    Routers perform the traffic directing functions on the Internet. Data sent through the internet,
                    such as a web page or email, is in the form of data packets.
                  </p>

                  <Diagram title="Router Internal Components">
                    {`
                    ┌─────────────────────────────────────┐
                    │              Router                  │
                    ├─────────────────────────────────────┤
                    │  ┌─────────────┐  ┌─────────────┐  │
                    │  │    CPU      │  │   Memory    │  │
                    │  │ Processing  │  │   RAM/ROM   │  │
                    │  └─────────────┘  └─────────────┘  │
                    │  ┌─────────────┐  ┌─────────────┐  │
                    │  │   Flash     │  │     NVRAM   │  │
                    │  │   Storage   │  │  Config     │  │
                    │  └─────────────┘  └─────────────┘  │
                    ├─────────────────────────────────────┤
                    │  Interface 1    Interface 2         │
                    │  ┌───────┐      ┌───────┐          │
                    │  │  Fa0/0│      │  Fa0/1│          │
                    │  └───────┘      └───────┘          │
                    └─────────────────────────────────────┘
`}
                  </Diagram>

                  <Table
                    headers={["Component", "Function", "Storage"]}
                    rows={[
                      ["CPU", "Processes routing protocols, makes forwarding decisions", "Processing"],
                      ["RAM", "Stores routing table, ARP cache, packet buffers", "Volatile"],
                      ["ROM", "Bootstrap program, power-on diagnostics", "Permanent"],
                      ["Flash", "Stores IOS (operating system)", "Permanent"],
                      ["NVRAM", "Stores startup configuration", "Non-volatile"],
                      ["Interfaces", "Connect to networks (Ethernet, Serial, etc.)", "I/O"]
                    ]}
                  />
                </section>

                <section id="interfaces" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Router Interfaces</h3>

                  <p className="text-gray-300 mb-4">
                    Router interfaces are the physical or logical connections that allow routers to connect to different networks.
                  </p>

                  <Table
                    headers={["Interface Type", "Description", "Common Uses"]}
                    rows={[
                      ["GigabitEthernet", "High-speed Ethernet (10/100/1000 Mbps)", "LAN connections, campus networks"],
                      ["FastEthernet", "Standard Ethernet (10/100 Mbps)", "Legacy LAN connections"],
                      ["Serial", "WAN connections (T1/E1, T3/E3)", "WAN links, ISP connections"],
                      ["Loopback", "Virtual interface, always up", "Router ID, management, testing"],
                      ["VLAN", "Virtual LAN interface", "Inter-VLAN routing"],
                      ["Tunnel", "Encapsulation interface", "VPNs, IPv6 over IPv4"],
                      ["Console", "Management port", "Direct router access"],
                      ["AUX", "Auxiliary port", "Modem backup connection"]
                    ]}
                  />

                  <CodeBlock
                    title="View Router Interfaces"
                    language="bash"
                    code={`# Cisco IOS
show ip interface brief
show interfaces
show running-config | include interface

# Linux
ip link show
ifconfig -a

# Show interface statistics
show interfaces statistics
show interfaces description`}
                  />
                </section>

                <section id="routing-tables" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Routing Tables</h3>

                  <p className="text-gray-300 mb-4">
                    A routing table is a data file stored in a router that lists the routes to particular network destinations.
                    It contains information about the topology of the network immediately around it.
                  </p>

                  <Diagram title="Routing Table Structure">
                    {`
┌─────────────────────────────────────────────────────────────┐
│                    ROUTING TABLE                             │
├──────────────┬───────────┬────────────┬──────────┬──────────┤
│ Destination  │  Subnet   │   Next     │Interface │ Metric/  │
│  Network     │   Mask    │    Hop     │          │   AD     │
├──────────────┼───────────┼────────────┼──────────┼──────────┤
│ 0.0.0.0      │ 0.0.0.0   │ 192.168.1.1│   Fa0/0  │   1/0    │
│ 192.168.1.0  │255.255.255.0│Connected  │   Fa0/0  │   0/0    │
│ 10.0.0.0     │255.0.0.0  │ 10.1.1.2   │   Se0/0  │ 110/20   │
│ 172.16.0.0   │255.255.0.0│ 172.16.1.2 │   Fa0/1  │  90/256  │
└──────────────┴───────────┴────────────┴──────────┴──────────┘
`}
                  </Diagram>

                  <Table
                    headers={["Field", "Description", "Example"]}
                    rows={[
                      ["Destination Network", "Target network address", "192.168.1.0"],
                      ["Subnet Mask", "Defines network size", "255.255.255.0"],
                      ["Next Hop", "IP address of next router", "10.0.0.2"],
                      ["Interface", "Outgoing interface", "GigabitEthernet0/0"],
                      ["Metric", "Cost of the route", "20 (OSPF cost)"],
                      ["Administrative Distance", "Trustworthiness of route source", "110 (OSPF)"],
                      ["Route Source", "How route was learned", "Connected, Static, OSPF"]
                    ]}
                  />

                  <CodeBlock
                    title="View Routing Tables"
                    language="bash"
                    code={`# Cisco IOS
show ip route
show ip route connected
show ip route static
show ip route ospf

# Linux
route -n
ip route show
netstat -rn

# Windows
route print
netstat -r

# Example routing table output
Codes: C - connected, S - static, O - OSPF, D - EIGRP

C    192.168.1.0/24 is directly connected, GigabitEthernet0/0
S    10.0.0.0/8 [1/0] via 192.168.1.2
O    172.16.0.0/16 [110/20] via 10.0.0.2, 00:12:34, Serial0/0`}
                  />
                </section>

                <section id="metrics" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Routing Metrics</h3>

                  <p className="text-gray-300 mb-4">
                    Metrics are values used by routing protocols to determine the best path to a destination.
                    Lower metrics are preferred.
                  </p>

                  <Table
                    headers={["Protocol", "Metric Type", "Description"]}
                    rows={[
                      ["RIP", "Hop Count", "Number of routers to pass through (max 15)"],
                      ["OSPF", "Cost", "Based on bandwidth (Cost = 10^8 / Bandwidth)"],
                      ["EIGRP", "Composite", "Bandwidth, Delay, Load, Reliability"],
                      ["BGP", "Path Attributes", "AS Path, Local Pref, MED, etc."],
                      ["IS-IS", "Cost", "Default cost 10, can be manually configured"]
                    ]}
                  />

                  <Callout type="tip" title="OSPF Cost Calculation">
                    Cost = Reference Bandwidth (100 Mbps) / Interface Bandwidth (Mbps)

                    • 10 Mbps Ethernet: Cost = 100/10 = 10
                    • 100 Mbps FastEthernet: Cost = 100/100 = 1
                    • 1000 Mbps GigabitEthernet: Cost = 100/1000 = 1 (can be tuned)

                    You can change the reference bandwidth with: auto-cost reference-bandwidth
                  </Callout>

                  <CodeBlock
                    title="EIGRP Metric Calculation"
                    language="text"
                    code={`EIGRP Metric Formula (with default K values):
Metric = 256 * (Bandwidth + Delay)

Bandwidth = (10^7 / Minimum Bandwidth) * 256
Delay = Sum of delays (in 10s of microseconds) * 256

Example:
Path with 100 Mbps link and 1000 µs delay
Bandwidth = (10,000,000 / 100,000) * 256 = 25,600
Delay = (1000/10) * 256 = 25,600
Total Metric = 256 * (25,600 + 25,600) = 13,107,200`}
                  />
                </section>

                <section id="administrative-distance" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Administrative Distance</h3>

                  <p className="text-gray-300 mb-4">
                    Administrative Distance (AD) is the trustworthiness of a route source. Lower AD values are preferred
                    when multiple routing protocols provide routes to the same destination.
                  </p>

                  <Table
                    headers={["Route Source", "Administrative Distance"]}
                    rows={[
                      ["Connected Interface", "0"],
                      ["Static Route", "1"],
                      ["EIGRP Summary Route", "5"],
                      ["External BGP (eBGP)", "20"],
                      ["Internal EIGRP", "90"],
                      ["IGRP", "100"],
                      ["OSPF", "110"],
                      ["IS-IS", "115"],
                      ["RIP", "120"],
                      ["EGP", "140"],
                      ["ODR (On-Demand Routing)", "160"],
                      ["External EIGRP", "170"],
                      ["Internal BGP (iBGP)", "200"],
                      ["Unknown", "255 (unreachable)"]
                    ]}
                  />

                  <Callout type="info" title="AD in Route Selection">
                    When a router learns about the same network from multiple routing protocols, it uses the
                    route with the lowest Administrative Distance. For example, if a router learns 10.0.0.0/8 from
                    OSPF (AD 110) and static route (AD 1), it will use the static route.
                  </Callout>

                  <CodeBlock
                    title="Modifying Administrative Distance"
                    language="bash"
                    code={`# Cisco IOS - Change AD for static route
ip route 10.0.0.0 255.0.0.0 192.168.1.2 150

# Change AD for specific OSPF routes
router ospf 1
 distance 150 10.0.0.0 0.255.255.255

# Floating static route (backup with higher AD)
ip route 0.0.0.0 0.0.0.0 192.168.1.1 1     # Primary
ip route 0.0.0.0 0.0.0.0 192.168.2.1 254   # Backup`}
                  />
                </section>
              </section>

              {/* Static Routing */}
              <section id="static-routing" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Map className="h-5 w-5" />
                  Static Routing
                </h2>

                <section id="what-is-static" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">What is Static Routing?</h3>
                  <p className="text-gray-300 mb-4">
                    Static routing is a type of network routing technique where routes are manually configured by a network administrator.
                    These routes are fixed and do not change unless manually updated.
                  </p>

                  <Grid>
                    <Card title="Simple to Configure" icon={Settings}>
                      <p className="text-sm">Easy to set up in small networks with simple, predictable traffic patterns.</p>
                    </Card>
                    <Card title="No Overhead" icon={Zap}>
                      <p className="text-sm">No routing protocol updates consume bandwidth or CPU resources.</p>
                    </Card>
                    <Card title="Predictable" icon={Lock}>
                      <p className="text-sm">Routes are fixed and won't change unexpectedly.</p>
                    </Card>
                    <Card title="Secure" icon={Shield}>
                      <p className="text-sm">No routing information is advertised to other networks.</p>
                    </Card>
                  </Grid>
                </section>

                <section id="configuring-static" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Configuring Static Routes</h3>

                  <Diagram title="Static Route Topology">
                    {`
    ┌─────────┐                     ┌─────────┐
    │  RouterA│   172.16.1.0/30     │  RouterB│
    │   Fa0/0 ├─────────────────────┤   Fa0/0 │
    │10.0.0.1 │   10.0.0.0/24       │10.0.0.2 │
    └─────────┘                     └─────────┘
         │                                │
         │ 192.168.1.0/24                 │ 192.168.2.0/24
         │                                │
    ┌─────────┐                     ┌─────────┐
    │  LAN A  │                     │  LAN B  │
    │192.168.1.0/24                 │192.168.2.0/24
    └─────────┘                     └─────────┘
`}
                  </Diagram>

                  <CodeBlock
                    title="Static Route Configuration (Cisco IOS)"
                    language="bash"
                    code={`# RouterA Configuration
interface FastEthernet0/0
 ip address 10.0.0.1 255.255.255.252
 no shutdown

interface FastEthernet0/1
 ip address 192.168.1.1 255.255.255.0
 no shutdown

# Static route to reach LAN B via RouterB
ip route 192.168.2.0 255.255.255.0 10.0.0.2

# RouterB Configuration
interface FastEthernet0/0
 ip address 10.0.0.2 255.255.255.252
 no shutdown

interface FastEthernet0/1
 ip address 192.168.2.1 255.255.255.0
 no shutdown

# Static route to reach LAN A via RouterA
ip route 192.168.1.0 255.255.255.0 10.0.0.1

# Verify
show ip route static
ping 192.168.2.1 source 192.168.1.1`}
                  />

                  <CodeBlock
                    title="Static Route Syntax"
                    language="text"
                    code={`Cisco IOS:
ip route [destination_network] [mask] [next_hop_ip | exit_interface]

Linux:
ip route add [destination] via [gateway] dev [interface]
route add -net [network] netmask [mask] gw [gateway]

Examples:
ip route 10.0.0.0 255.0.0.0 192.168.1.1
ip route 172.16.0.0 255.255.0.0 FastEthernet0/0
ip route 0.0.0.0 0.0.0.0 192.168.1.1`}
                  />
                </section>

                <section id="default-routes" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Default Routes</h3>

                  <p className="text-gray-300 mb-4">
                    A default route (0.0.0.0/0) is a catch-all route used when no specific route matches the destination.
                    It's often used to route traffic to the internet or to a central router.
                  </p>

                  <CodeBlock
                    title="Default Route Configuration"
                    language="bash"
                    code={`# Cisco IOS - Default route to ISP
ip route 0.0.0.0 0.0.0.0 203.0.113.1

# Linux - Default gateway
ip route add default via 192.168.1.1
route add default gw 192.168.1.1

# Default route with exit interface
ip route 0.0.0.0 0.0.0.0 FastEthernet0/0

# Multiple default routes for redundancy
ip route 0.0.0.0 0.0.0.0 203.0.113.1
ip route 0.0.0.0 0.0.0.0 203.0.113.5 10

# Verify default route
show ip route | include 0.0.0.0
Gateway of last resort is 203.0.113.1 to network 0.0.0.0`}
                  />

                  <Callout type="tip" title="Gateway of Last Resort">
                    The default route is often called the "gateway of last resort." When a router has a default route configured,
                    it will show "Gateway of last resort is [IP]" in the routing table.
                  </Callout>
                </section>

                <section id="floating-static" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Floating Static Routes</h3>

                  <p className="text-gray-300 mb-4">
                    Floating static routes are static routes with higher administrative distances than dynamic routes.
                    They serve as backup routes that only become active when the primary dynamic route fails.
                  </p>

                  <Diagram title="Floating Static Route Backup">
                    {`
                    ┌─────────────────┐
                    │    Primary      │
                    │    OSPF Path    │
                    │   Metric: 20    │
              ┌─────┴─────┐     ┌─────┴─────┐
              │  Router1  │─────│  Router2  │
              └─────┬─────┘     └─────┬─────┘
                    │                  │
                    │   ┌──────────┐   │
                    └───│  Backup  │───┘
                        │  Static  │
                        │ AD: 150  │
                        └──────────┘
`}
                  </Diagram>

                  <CodeBlock
                    title="Floating Static Route Configuration"
                    language="bash"
                    code={`# Primary route learned via OSPF (AD 110)
# Backup static route with higher AD
ip route 10.0.0.0 255.0.0.0 192.168.2.1 150

# Floating default route for dual-homed connection
router ospf 1
 network 0.0.0.0 255.255.255.255 area 0

# Primary default via OSPF (will have AD 110)
# Backup default via static with AD 254
ip route 0.0.0.0 0.0.0.0 203.0.113.1 254

# Check which route is active
show ip route 0.0.0.0

Routing entry for 0.0.0.0/0
  Known via "ospf 1", distance 110, metric 20
  Last update from 10.0.0.2 on FastEthernet0/0
  * 10.0.0.2, from 10.0.0.2, via FastEthernet0/0

# If primary fails, backup takes over:
Routing entry for 0.0.0.0/0
  Known via "static", distance 254, metric 0
  * 203.0.113.1`}
                  />
                </section>

                <section id="static-advantages" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Advantages & Disadvantages</h3>

                  <Table
                    headers={["Advantages", "Disadvantages"]}
                    rows={[
                      ["Simple to configure and understand", "Doesn't adapt to network changes"],
                      ["No protocol overhead (bandwidth/CPU)", "Manual configuration errors possible"],
                      ["More secure (no advertisements)", "Not scalable for large networks"],
                      ["Predictable path selection", "No automatic failover (without floating static)"],
                      ["Works in any network", "Administrative burden for changes"],
                      ["Good for stub networks", "Can't load balance effectively"],
                      ["No convergence time", "Requires redesign for growth"]
                    ]}
                  />

                  <Callout type="best-practice" title="When to Use Static Routing">
                    <ul className="list-disc pl-5">
                      <li>Small networks with 1-3 routers</li>
                      <li>Hub-and-spoke topologies</li>
                      <li>Default routes to the internet</li>
                      <li>For security (no routing updates)</li>
                      <li>As backup to dynamic routing</li>
                      <li>Stub networks with single connection</li>
                    </ul>
                  </Callout>
                </section>
              </section>

              {/* Dynamic Routing */}
              <section id="dynamic-routing" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  Dynamic Routing
                </h2>

                <section id="what-is-dynamic" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">What is Dynamic Routing?</h3>
                  <p className="text-gray-300 mb-4">
                    Dynamic routing is a technique where routers automatically learn and adjust routes using routing protocols.
                    They exchange routing information with neighbors, build routing tables, and adapt to network changes without manual intervention.
                  </p>

                  <Table
                    headers={["Feature", "Static Routing", "Dynamic Routing"]}
                    rows={[
                      ["Configuration", "Manual", "Automatic"],
                      ["Adaptation to Changes", "None", "Automatic"],
                      ["Scalability", "Poor", "Excellent"],
                      ["Overhead", "None", "Bandwidth/CPU for updates"],
                      ["Security", "High", "Moderate (with authentication)"],
                      ["Convergence", "Immediate (manual)", "Protocol-dependent"],
                      ["Best For", "Small, stable networks", "Large, complex networks"]
                    ]}
                  />
                </section>

                <section id="igp-egp" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">IGP vs EGP</h3>

                  <Grid>
                    <Card title="IGP - Interior Gateway Protocols" icon={Home}>
                      <p className="text-sm mb-2">Used within a single autonomous system (AS).</p>
                      <ul className="text-xs list-disc pl-4 space-y-1">
                        <li>RIP (Routing Information Protocol)</li>
                        <li>OSPF (Open Shortest Path First)</li>
                        <li>EIGRP (Enhanced Interior Gateway Routing Protocol)</li>
                        <li>IS-IS (Intermediate System to Intermediate System)</li>
                      </ul>
                    </Card>

                    <Card title="EGP - Exterior Gateway Protocols" icon={Globe}>
                      <p className="text-sm mb-2">Used between different autonomous systems.</p>
                      <ul className="text-xs list-disc pl-4 space-y-1">
                        <li>BGP (Border Gateway Protocol) - The only EGP in use today</li>
                        <li>Used for Internet routing</li>
                        <li>Policy-based routing</li>
                        <li>Handles millions of routes</li>
                      </ul>
                    </Card>
                  </Grid>

                  <Diagram title="IGP vs EGP">
                    {`
                    ┌─────────────────────────────────────┐
                    │          Autonomous System 100      │
                    │  ┌─────┐    ┌─────┐    ┌─────┐     │
                    │  │ R1  │────│ R2  │────│ R3  │     │
                    │  └─────┘    └─────┘    └─────┘     │
                    │     IGP (OSPF/EIGRP/RIP)            │
                    └───────────────┬─────────────────────┘
                                    │
                              EGP (BGP)
                                    │
                    ┌───────────────┴─────────────────────┐
                    │          Autonomous System 200       │
                    │  ┌─────┐    ┌─────┐    ┌─────┐      │
                    │  │ R4  │────│ R5  │────│ R6  │      │
                    │  └─────┘    └─────┘    └─────┘      │
                    │     IGP (OSPF/EIGRP/RIP)             │
                    └──────────────────────────────────────┘
`}
                  </Diagram>
                </section>

                <section id="distance-vector" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Distance Vector Protocols</h3>

                  <p className="text-gray-300 mb-4">
                    Distance vector protocols operate on the principle of "routing by rumor." Routers periodically send their entire
                    routing table to directly connected neighbors, who then update their own tables based on this information.
                  </p>

                  <Table
                    headers={["Protocol", "Metric", "Features", "Convergence"]}
                    rows={[
                      ["RIPv1", "Hop Count", "Classful, no VLSM", "Slow"],
                      ["RIPv2", "Hop Count", "Classless, VLSM, multicast", "Slow"],
                      ["RIPng", "Hop Count", "IPv6 version", "Slow"],
                      ["IGRP", "Composite (BW/Delay)", "Cisco proprietary", "Moderate"],
                      ["EIGRP", "Composite", "Advanced distance vector", "Fast"]
                    ]}
                  />

                  <Callout type="info" title="Distance Vector Algorithm">
                    <p className="mb-2">Bellman-Ford algorithm:</p>
                    <ol className="list-decimal pl-5 text-sm">
                      <li>Each router maintains a table of best known distances</li>
                      <li>Periodically send table to neighbors</li>
                      <li>Neighbors update tables with better routes</li>
                      <li>RIP updates every 30 seconds</li>
                    </ol>
                  </Callout>

                  <Diagram title="Distance Vector Operation">
                    {`
    Router A Table:              Router B Table:
    Network 10: 0 (connected)    Network 10: 1 via A
    Network 20: 1 via B          Network 20: 0 (connected)
    Network 30: 2 via B          Network 30: 1 via C

    Router C Table:
    Network 10: 2 via B
    Network 20: 1 via B
    Network 30: 0 (connected)

    A sends to B: "I know 10 (0), 20 (1), 30 (2)"
    B updates: "I can reach 10 via A (1), 30 via C (1)"
    C learns: "I can reach 10 via B (2), 20 via B (1)"
`}
                  </Diagram>
                </section>

                <section id="link-state" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Link State Protocols</h3>

                  <p className="text-gray-300 mb-4">
                    Link state protocols use a more sophisticated approach. Each router builds a complete map (topology) of the network
                    by exchanging Link State Advertisements (LSAs) with all other routers in the area.
                  </p>

                  <Table
                    headers={["Protocol", "Metric", "Algorithm", "Convergence"]}
                    rows={[
                      ["OSPF", "Cost (bandwidth)", "Dijkstra SPF", "Fast"],
                      ["IS-IS", "Cost", "Dijkstra SPF", "Fast"],
                      ["OSPFv3", "Cost", "Dijkstra SPF", "Fast (IPv6)"]
                    ]}
                  />

                  <Grid>
                    <Card title="Advantages" icon={CheckCircle}>
                      <ul className="text-xs list-disc pl-4 space-y-1">
                        <li>Fast convergence</li>
                        <li>Loop-free by design</li>
                        <li>More scalable than distance vector</li>
                        <li>Precise metric calculation</li>
                        <li>Supports hierarchical design</li>
                      </ul>
                    </Card>

                    <Card title="Disadvantages" icon={AlertCircle}>
                      <ul className="text-xs list-disc pl-4 space-y-1">
                        <li>Higher CPU/memory requirements</li>
                        <li>More complex configuration</li>
                        <li>Initial flooding overhead</li>
                        <li>More protocol complexity</li>
                      </ul>
                    </Card>
                  </Grid>

                  <Diagram title="Link State Operation">
                    {`
    Step 1: Each router discovers neighbors (Hello protocol)
    Step 2: Build Link State Packets (LSPs) about connected links
    Step 3: Flood LSPs to all routers (reliable flooding)
    Step 4: Each router builds complete topology database
    Step 5: Run SPF algorithm to calculate shortest paths
    Step 6: Build forwarding table from SPF results

    ┌─────────┐    LSA    ┌─────────┐    LSA    ┌─────────┐
    │  R1     │◄─────────►│  R2     │◄─────────►│  R3     │
    │Database │           │Database │           │Database │
    │R1: 10.1 │           │R1: 10.1 │           │R1: 10.1 │
    │R2: 10.2 │           │R2: 10.2 │           │R2: 10.2 │
    │R3: 10.3 │           │R3: 10.3 │           │R3: 10.3 │
    └─────────┘           └─────────┘           └─────────┘
`}
                  </Diagram>
                </section>

                <section id="hybrid" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Hybrid Protocols</h3>

                  <p className="text-gray-300 mb-4">
                    Hybrid protocols combine features of both distance vector and link state protocols.
                    EIGRP is the primary example, using distance vector logic with link state features.
                  </p>

                  <Table
                    headers={["Protocol", "Type", "Features"]}
                    rows={[
                      ["EIGRP", "Advanced Distance Vector", "DUAL algorithm, partial updates, fast convergence"],
                      ["BGP", "Path Vector", "Combines aspects of both, policy-based"]
                    ]}
                  />

                  <Callout type="tip" title="EIGRP - Cisco's Hybrid Protocol">
                    <p>EIGRP (Enhanced Interior Gateway Routing Protocol) offers:</p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>Rapid convergence (DUAL algorithm pre-computes backup paths)</li>
                      <li>Partial, bounded updates (only send changes, not full tables)</li>
                      <li>Multiple network layer protocols (IP, IPX, AppleTalk)</li>
                      <li>Classless routing with VLSM support</li>
                      <li>Load balancing across unequal cost paths</li>
                    </ul>
                  </Callout>
                </section>
              </section>

              {/* RIP Section */}
              <section id="rip" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Radio className="h-5 w-5" />
                  RIP - Routing Information Protocol
                </h2>

                <section id="rip-overview" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">RIP Overview</h3>
                  <p className="text-gray-300 mb-4">
                    RIP is one of the oldest distance vector routing protocols. It uses hop count as its metric, with a maximum of 15 hops
                    (16 is considered unreachable). It's simple to configure but has limitations in larger networks.
                  </p>

                  <Table
                    headers={["Feature", "RIPv1", "RIPv2", "RIPng"]}
                    rows={[
                      ["Metric", "Hop Count (max 15)", "Hop Count (max 15)", "Hop Count (max 15)"],
                      ["Update Frequency", "30 seconds", "30 seconds", "30 seconds"],
                      ["Classful/Classless", "Classful only", "Classless (VLSM)", "Classless (IPv6)"],
                      ["Authentication", "No", "Yes (MD5)", "Yes (IPsec)"],
                      ["Multicast Updates", "No (broadcast)", "Yes (224.0.0.9)", "Yes (FF02::9)"],
                      ["Route Tag", "No", "Yes", "Yes"],
                      ["Next Hop", "No", "Yes", "Yes"],
                      ["Protocol", "UDP 520", "UDP 520", "UDP 521"]
                    ]}
                  />
                </section>

                <section id="rip-versions" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">RIPv1 vs RIPv2</h3>

                  <Diagram title="RIPv1 vs RIPv2 Packet Format">
                    {`
RIPv1:
┌─────────┬─────────┬─────────┬─────────┐
│Command(1)│Version(1)│  Unused (2)    │
├─────────┼─────────┼─────────┼─────────┤
│      Address Family (2)                │
├─────────┼─────────┼─────────┼─────────┤
│          IP Address (4)                 │
├─────────┼─────────┼─────────┼─────────┤
│           Unused (4)                     │
├─────────┼─────────┼─────────┼─────────┤
│           Unused (4)                     │
├─────────┼─────────┼─────────┼─────────┤
│            Metric (4)                    │
└─────────┴─────────┴─────────┴─────────┘

RIPv2:
┌─────────┬─────────┬─────────┬─────────┐
│Command(1)│Version(1)│  Unused (2)    │
├─────────┼─────────┼─────────┼─────────┤
│      Address Family (2)   │ Route Tag(2)│
├─────────┼─────────┼─────────┼─────────┤
│          IP Address (4)                 │
├─────────┼─────────┼─────────┼─────────┤
│           Subnet Mask (4)               │
├─────────┼─────────┼─────────┼─────────┤
│          Next Hop (4)                    │
├─────────┼─────────┼─────────┼─────────┤
│            Metric (4)                    │
└─────────┴─────────┴─────────┴─────────┘
`}
                  </Diagram>

                  <CodeBlock
                    title="RIPv2 Configuration"
                    language="bash"
                    code={`# Enable RIP routing
router rip
 version 2

# Specify networks to advertise (classful networks)
 network 192.168.1.0
 network 10.0.0.0

# Disable auto-summary (important for VLSM)
 no auto-summary

# Optional: Enable authentication on interface
interface FastEthernet0/0
 ip rip authentication key-chain RIPKEY
 ip rip authentication mode md5

key chain RIPKEY
 key 1
  key-string MySecretKey

# Verify RIP configuration
show ip protocols
show ip route rip
debug ip rip`}
                  />
                </section>

                <section id="rip-timers" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">RIP Timers</h3>

                  <Table
                    headers={["Timer", "Default Value", "Description"]}
                    rows={[
                      ["Update Timer", "30 seconds", "How often routing updates are sent"],
                      ["Invalid Timer", "180 seconds", "Time before route marked invalid (6 updates)"],
                      ["Hold-down Timer", "180 seconds", "Time to ignore new info about invalid route"],
                      ["Flush Timer", "240 seconds", "Time before route removed from table"]
                    ]}
                  />

                  <Diagram title="RIP Timer Operation">
                    {`
    Route learned → Update received every 30s
         │
         ├─► 0-179s: Route valid and usable
         │
         ├─► 180s (6 missed updates): Route marked invalid
         │    Hold-down starts (ignore updates for 180s)
         │
         ├─► 181-239s: Route in hold-down
         │    (still in table but not usable)
         │
         └─► 240s: Route removed from table

    If better route learned during hold-down:
    - If metric better than original: Accept immediately
    - If metric worse: Wait until hold-down expires
`}
                  </Diagram>

                  <CodeBlock
                    title="Modify RIP Timers"
                    language="bash"
                    code={`# Change RIP timers (not recommended in production)
router rip
 timers basic 30 90 90 120

# Format: timers basic update invalid holddown flush
# update: 30 seconds
# invalid: 90 seconds (3 missed updates)
# holddown: 90 seconds
# flush: 120 seconds`}
                  />
                </section>

                <section id="rip-config" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">RIP Configuration Examples</h3>

                  <Diagram title="RIP Network Topology">
                    {`
    ┌─────────┐     .1      .2     ┌─────────┐
    │  R1     ├────────────────────┤  R2     │
    │  .1     │   10.0.0.0/30      │  .2     │
    └────┬────┘                     └────┬────┘
         │ 192.168.1.0/24                │ 192.168.2.0/24
         │                                │
    ┌────┴────┐                     ┌────┴────┐
    │  LAN A  │                     │  LAN B  │
    │  .0/24  │                     │  .0/24  │
    └─────────┘                     └─────────┘
`}
                  </Diagram>

                  <Tabs>
                    <Tab label="R1 Configuration">
                      <CodeBlock
                        language="bash"
                        code={`interface FastEthernet0/0
 ip address 10.0.0.1 255.255.255.252
 no shutdown

interface FastEthernet0/1
 ip address 192.168.1.1 255.255.255.0
 no shutdown

router rip
 version 2
 network 10.0.0.0
 network 192.168.1.0
 no auto-summary
 passive-interface FastEthernet0/1

# passive-interface prevents RIP updates on LAN
# (reduces unnecessary traffic)`}
                      />
                    </Tab>
                    <Tab label="R2 Configuration">
                      <CodeBlock
                        language="bash"
                        code={`interface FastEthernet0/0
 ip address 10.0.0.2 255.255.255.252
 no shutdown

interface FastEthernet0/1
 ip address 192.168.2.1 255.255.255.0
 no shutdown

router rip
 version 2
 network 10.0.0.0
 network 192.168.2.0
 no auto-summary
 passive-interface FastEthernet0/1`}
                      />
                    </Tab>
                    <Tab label="Verification">
                      <CodeBlock
                        language="bash"
                        code={`# On R1 - Check routing table
show ip route
Codes: R - RIP

R    192.168.2.0/24 [120/1] via 10.0.0.2, 00:00:17, FastEthernet0/0
C    192.168.1.0/24 is directly connected, FastEthernet0/1
C    10.0.0.0/30 is directly connected, FastEthernet0/0

# Check RIP protocols
show ip protocols
Routing Protocol is "rip"
  Outgoing update filter list for all interfaces is not set
  Incoming update filter list for all interfaces is not set
  Sending updates every 30 seconds, next due in 18 seconds
  Invalid after 180 seconds, hold down 180, flushed after 240

# Debug RIP updates
debug ip rip
RIP: received v2 update from 10.0.0.2 on FastEthernet0/0
      192.168.2.0/24 via 0.0.0.0 in 1 hops

# Test connectivity
ping 192.168.2.1 source 192.168.1.1
Success rate is 100 percent (5/5)`}
                      />
                    </Tab>
                  </Tabs>

                  <Callout type="warning" title="RIP Limitations">
                    <ul className="list-disc pl-5">
                      <li>Maximum network diameter of 15 hops</li>
                      <li>Slow convergence (minutes for large changes)</li>
                      <li>Classful updates by default (auto-summary issues)</li>
                      <li>High bandwidth usage (full table every 30 seconds)</li>
                      <li>No support for multiple paths based on bandwidth</li>
                      <li>Prone to routing loops without loop prevention mechanisms</li>
                    </ul>
                  </Callout>
                </section>
              </section>

              {/* OSPF Section */}
              <section id="ospf" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <GitFork className="h-5 w-5" />
                  OSPF - Open Shortest Path First
                </h2>

                <section id="ospf-overview" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">OSPF Overview</h3>
                  <p className="text-gray-300 mb-4">
                    OSPF is a link-state routing protocol that uses the Dijkstra Shortest Path First (SPF) algorithm.
                    It calculates the shortest path to each network based on link cost (typically bandwidth). OSPF
                    supports hierarchical routing through areas, which improves scalability.
                  </p>

                  <Table
                    headers={["Feature", "OSPFv2", "OSPFv3"]}
                    rows={[
                      ["IP Version", "IPv4", "IPv6"],
                      ["Protocol", "IP Protocol 89", "IP Protocol 89"],
                      ["Authentication", "Plain text, MD5", "IPsec"],
                      ["Router ID", "IPv4 address", "32-bit number"],
                      ["Multicast Addresses", "224.0.0.5 (all SPF routers), 224.0.0.6 (all DR routers)", "FF02::5, FF02::6"]
                    ]}
                  />

                  <Grid>
                    <Card title="Key Features" icon={Zap}>
                      <ul className="text-xs list-disc pl-4 space-y-1">
                        <li>Fast convergence</li>
                        <li>Classless (VLSM/CIDR support)</li>
                        <li>Hierarchical design with areas</li>
                        <li>Load balancing (equal cost paths)</li>
                        <li>Authentication support</li>
                        <li>Route summarization</li>
                      </ul>
                    </Card>
                    <Card title="OSPF Terminology" icon={BookOpen}>
                      <ul className="text-xs list-disc pl-4 space-y-1">
                        <li><span className="text-green-500">Area:</span> Logical grouping of routers</li>
                        <li><span className="text-green-500">LSDB:</span> Link State Database</li>
                        <li><span className="text-green-500">LSA:</span> Link State Advertisement</li>
                        <li><span className="text-green-500">DR/BDR:</span> Designated/Backup Router</li>
                        <li><span className="text-green-500">ABR:</span> Area Border Router</li>
                        <li><span className="text-green-500">ASBR:</span> Autonomous System Boundary Router</li>
                      </ul>
                    </Card>
                  </Grid>
                </section>

                <section id="ospf-terminology" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">OSPF Terminology and Operation</h3>

                  <Diagram title="OSPF Network Hierarchy">
                    {`
                         Area 0 (Backbone)
                    ┌──────────────────────┐
                    │   ┌─────┐    ┌─────┐ │
                    │   │ ABR │────│ ABR │ │
                    │   └─────┘    └─────┘ │
                    └────────┬─────────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
       ┌────┴────┐      ┌────┴────┐     ┌────┴────┐
       │ Area 1  │      │ Area 2  │     │ Area 3  │
       │(Normal) │      │(Stub)   │     │(NSSA)   │
       └─────────┘      └─────────┘     └─────────┘
`}
                  </Diagram>

                  <Table
                    headers={["OSPF State", "Description"]}
                    rows={[
                      ["Down", "No Hellos received, initial state"],
                      ["Attempt", "For NBMA networks only"],
                      ["Init", "Hello received but not bidirectional"],
                      ["2-Way", "Bidirectional communication established"],
                      ["ExStart", "Master/slave election for DD exchange"],
                      ["Exchange", "Database Description packets sent"],
                      ["Loading", "LSR/LSU exchange for missing LSAs"],
                      ["Full", "Fully adjacent - databases synchronized"]
                    ]}
                  />

                  <Step number={1} title="Neighbor Discovery">
                    <p>Routers send Hello packets to multicast address 224.0.0.5 every 10 seconds (default).</p>
                    <CodeBlock
                      language="bash"
                      code={`Hello packet contains:
- Router ID
- Hello/Dead intervals
- Area ID
- Router priority
- DR/BDR IP addresses
- Authentication data
- Neighbor list`}
                    />
                  </Step>

                  <Step number={2} title="Database Synchronization">
                    <p>After 2-Way state, routers exchange Database Description (DD) packets to compare LSDBs.</p>
                  </Step>

                  <Step number={3} title="SPF Calculation">
                    <p>Each router runs Dijkstra algorithm to compute shortest paths to all networks.</p>
                  </Step>

                  <Step number={4} title="Routing Table Update">
                    <p>Best paths are installed in the routing table based on cost.</p>
                  </Step>
                </section>

                <section id="lsa-types" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">LSA Types</h3>

                  <Table
                    headers={["Type", "Name", "Description", "Propagation"]}
                    rows={[
                      ["Type 1", "Router LSA", "Describes router's links to neighbors", "Within area only"],
                      ["Type 2", "Network LSA", "Generated by DR for multi-access networks", "Within area only"],
                      ["Type 3", "Summary LSA", "Network summaries from ABR to other areas", "Between areas"],
                      ["Type 4", "ASBR Summary LSA", "Information about ASBR location", "Between areas"],
                      ["Type 5", "External LSA", "External routes from ASBR", "Entire AS (except stub)"],
                      ["Type 6", "Group Membership LSA", "MOSPF (multicast)", "Rarely used"],
                      ["Type 7", "NSSA LSA", "External routes in NSSA", "Converted to Type 5 at ABR"]
                    ]}
                  />

                  <Diagram title="LSA Flooding">
                    {`
                    ┌─────────┐
                    │  ASBR   │
                    └────┬────┘
                         │ Type 5 (External)
                    ┌────┴────┐
                    │   ABR   │
                    └────┬────┘
            ┌───────────┼───────────┐
            │           │           │
       Type3/4     Type3/4     Type3/4
            │           │           │
       ┌────┴────┐ ┌────┴────┐ ┌────┴────┐
       │ Area 1  │ │ Area 2  │ │ Area 3  │
       │ Type1/2 │ │ Type1/2 │ │ Type1/2 │
       └─────────┘ └─────────┘ └─────────┘
`}
                  </Diagram>
                </section>

                <section id="ospf-areas" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">OSPF Areas</h3>

                  <Table
                    headers={["Area Type", "Description", "LSAs Allowed"]}
                    rows={[
                      ["Backbone (Area 0)", "Core area that connects all other areas", "All types"],
                      ["Standard Area", "Normal area connected to Area 0", "All types"],
                      ["Stub Area", "No external routes, uses default route", "Types 1-3 (no Type 5)"],
                      ["Totally Stubby", "No external or summary routes, only default", "Types 1-2 only"],
                      ["NSSA (Not-So-Stubby)", "Stub area that can import external routes", "Types 1-3, 7"],
                      ["Totally NSSA", "NSSA with no Type 3 summaries", "Types 1-2, 7"]
                    ]}
                  />

                  <Callout type="tip" title="Area Design Guidelines">
                    <ul className="list-disc pl-5">
                      <li>All areas must connect to Area 0 (backbone)</li>
                      <li>Use stub areas to reduce LSDB size on smaller routers</li>
                      <li>Place summarization at ABRs to reduce routing table size</li>
                      <li>Keep area design simple - avoid too many areas in small networks</li>
                      <li>Use NSSA when you need to import external routes but want stub benefits</li>
                    </ul>
                  </Callout>

                  <CodeBlock
                    title="Configuring OSPF Areas"
                    language="bash"
                    code={`# Router as ABR (Area 0 and Area 1)
router ospf 1
 router-id 1.1.1.1
 network 10.0.0.0 0.255.255.255 area 0
 network 192.168.1.0 0.0.0.255 area 1

# Configure Area 1 as stub
area 1 stub

# Configure Area 2 as totally stubby
area 2 stub no-summary

# Configure NSSA
area 3 nssa

# Summarize routes at ABR
area 1 range 192.168.0.0 255.255.252.0

# Verify areas
show ip ospf
show ip ospf interface
show ip ospf database`}
                  />
                </section>

                <section id="dr-bdr" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">DR and BDR</h3>

                  <p className="text-gray-300 mb-4">
                    On multi-access networks (like Ethernet), OSPF elects a Designated Router (DR) and Backup Designated Router (BDR)
                    to reduce adjacencies and LSA flooding.
                  </p>

                  <Diagram title="DR/BDR Operation">
                    {`
    Without DR (n² adjacencies):         With DR (n adjacencies):

        R1────R2                            R1    R2
         ╲  ╱  ╲                             ╲  ╱  ╲
          ╳    R3                              DR─R3
         ╱  ╲  ╱                              ╱  ╲
        R4────R5                            R4    R5
                                            (BDR)

    6 adjacencies total                   4 adjacencies to DR
                                            + adjacencies to BDR
`}
                  </Diagram>

                  <Table
                    headers={["Role", "Description", "Election Criteria"]}
                    rows={[
                      ["DR (Designated Router)", "Central point for LSA exchanges", "Highest priority (0-255), highest RID"],
                      ["BDR (Backup DR)", "Takes over if DR fails", "Second highest priority/RID"],
                      ["DROTHER", "Non-DR/BDR routers", "Form adjacencies only with DR/BDR"]
                    ]}
                  />

                  <CodeBlock
                    title="DR/BDR Configuration"
                    language="bash"
                    code={`# Set interface priority (0-255)
interface FastEthernet0/0
 ip ospf priority 100

# Priority 0 means router will never be DR/BDR
interface FastEthernet0/1
 ip ospf priority 0

# Verify DR/BDR
show ip ospf interface FastEthernet0/0

FastEthernet0/0 is up, line protocol is up
  Internet Address 10.0.0.1/24, Area 0
  Process ID 1, Router ID 1.1.1.1, Network Type BROADCAST, Cost: 1
  Transmit Delay is 1 sec, State DR, Priority 100
  Designated Router (ID) 1.1.1.1, Interface address 10.0.0.1
  Backup Designated router (ID) 2.2.2.2, Interface address 10.0.0.2`}
                  />
                </section>

                <section id="ospf-config" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">OSPF Configuration Examples</h3>

                  <Diagram title="Multi-Area OSPF Topology">
                    {`
                    Area 0 (Backbone)
    ┌─────────┐    10.0.0.0/30    ┌─────────┐
    │  R1-ABR │───────────────────│  R2-ABR │
    │1.1.1.1  │                   │2.2.2.2  │
    └────┬────┘                   └────┬────┘
         │ 192.168.1.0/24              │ 192.168.2.0/24
    ┌────┴────┐                   ┌────┴────┐
    │ Area 1  │                   │ Area 2  │
    │(Stub)   │                   │(Normal) │
    └─────────┘                   └─────────┘
`}
                  </Diagram>

                  <Tabs>
                    <Tab label="R1 (ABR) Configuration">
                      <CodeBlock
                        language="bash"
                        code={`! Configure router ID and OSPF process
router ospf 1
 router-id 1.1.1.1
 log-adjacency-changes

! Network statements
 network 10.0.0.0 0.0.0.3 area 0
 network 192.168.1.0 0.0.0.255 area 1

! Configure Area 1 as stub
 area 1 stub

! Summarize routes from Area 1 to Area 0
 area 1 range 192.168.0.0 255.255.254.0

! Interface configurations
interface FastEthernet0/0
 ip address 10.0.0.1 255.255.255.252
 ip ospf cost 10
 no shutdown

interface FastEthernet0/1
 ip address 192.168.1.1 255.255.255.0
 ip ospf priority 0  ! Won't become DR/BDR
 no shutdown

! Authentication (optional)
interface FastEthernet0/0
 ip ospf authentication message-digest
 ip ospf message-digest-key 1 md5 MySecretKey`}
                      />
                    </Tab>
                    <Tab label="R2 (ABR) Configuration">
                      <CodeBlock
                        language="bash"
                        code={`router ospf 1
 router-id 2.2.2.2
 network 10.0.0.0 0.0.0.3 area 0
 network 192.168.2.0 0.0.0.255 area 2

! Redistribute static routes (as ASBR)
 redistribute static subnets

! Default route information
 default-information originate always

interface FastEthernet0/0
 ip address 10.0.0.2 255.255.255.252
 no shutdown

interface FastEthernet0/1
 ip address 192.168.2.1 255.255.255.0
 no shutdown

! Static routes to redistribute
ip route 10.10.0.0 255.255.0.0 192.168.2.254`}
                      />
                    </Tab>
                    <Tab label="Verification Commands">
                      <CodeBlock
                        language="bash"
                        code={`# Check OSPF neighbors
show ip ospf neighbor

Neighbor ID     Pri   State           Dead Time   Address         Interface
2.2.2.2          1   FULL/DR         00:00:39    10.0.0.2        FastEthernet0/0

# View OSPF database
show ip ospf database

       OSPF Router with ID (1.1.1.1) (Process ID 1)

                Router Link States (Area 0)

Link ID         ADV Router      Age         Seq#       Checksum Link count
1.1.1.1         1.1.1.1         27          0x80000002 0x00B7E4 1
2.2.2.2         2.2.2.2         28          0x80000001 0x005F3B 1

# Check routing table
show ip route ospf

O IA 192.168.2.0/24 [110/20] via 10.0.0.2, 00:12:34, FastEthernet0/0

# Verify OSPF interface
show ip ospf interface brief

Interface    PID   Area            IP Address/Mask    Cost  State Nbrs F/C
Fa0/0        1     0               10.0.0.1/30        10    DR    1/1
Fa0/1        1     1               192.168.1.1/24     1     DR    0/0

# Debug OSPF (use with caution)
debug ip ospf events
debug ip ospf adj`}
                      />
                    </Tab>
                  </Tabs>

                  <Callout type="tip" title="OSPF Optimization Tips">
                    <ul className="list-disc pl-5">
                      <li><span className="text-green-500">Use passive-interface</span> on LAN interfaces to prevent unnecessary adjacencies</li>
                      <li><span className="text-green-500">Adjust reference bandwidth</span> for networks &gt;100 Mbps: `auto-cost reference-bandwidth 1000`</li>
                      <li><span className="text-green-500">Summarize at ABRs</span> to reduce routing table size</li>
                      <li><span className="text-green-500">Use stub areas</span> for leaf networks to reduce LSDB</li>
                      <li><span className="text-green-500">Tune SPF timers</span> for faster convergence: `timers throttle spf 10 100 5000`</li>
                    </ul>
                  </Callout>
                </section>
              </section>

              {/* EIGRP Section */}
              <section id="eigrp" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Combine className="h-5 w-5" />
                  EIGRP - Enhanced Interior Gateway Routing Protocol
                </h2>

                <section id="eigrp-overview" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">EIGRP Overview</h3>
                  <p className="text-gray-300 mb-4">
                    EIGRP is Cisco's proprietary advanced distance-vector routing protocol. It combines the advantages of
                    link-state protocols (fast convergence) with distance-vector simplicity. EIGRP uses the Diffusing Update
                    Algorithm (DUAL) to ensure loop-free paths and fast convergence.
                  </p>

                  <Table
                    headers={["Feature", "EIGRP for IPv4", "EIGRP for IPv6"]}
                    rows={[
                      ["Protocol", "IP Protocol 88", "IP Protocol 88"],
                      ["Metric", "Composite (Bandwidth, Delay, Load, Reliability)", "Same"],
                      ["Multicast Address", "224.0.0.10", "FF02::A"],
                      ["Authentication", "MD5", "MD5 or IPsec"],
                      ["VLSM Support", "Yes", "Yes"],
                      ["Manual Summarization", "Yes", "Yes"],
                      ["Auto-Summarization", "Yes (can disable)", "No"]
                    ]}
                  />

                  <Grid>
                    <Card title="Key Advantages" icon={CheckCircle}>
                      <ul className="text-xs list-disc pl-4 space-y-1">
                        <li>Fast convergence (DUAL pre-computes backup paths)</li>
                        <li>Low bandwidth usage (partial updates only)</li>
                        <li>Supports multiple network protocols</li>
                        <li>Unequal cost load balancing</li>
                        <li>Easy to configure</li>
                        <li>Route summarization on any router</li>
                      </ul>
                    </Card>
                    <Card title="EIGRP Terminology" icon={BookOpen}>
                      <ul className="text-xs list-disc pl-4 space-y-1">
                        <li><span className="text-green-500">Successor:</span> Primary route (lowest metric)</li>
                        <li><span className="text-green-500">Feasible Successor (FS):</span> Backup route</li>
                        <li><span className="text-green-500">Feasible Distance (FD):</span> Metric to destination</li>
                        <li><span className="text-green-500">Reported Distance (RD):</span> Neighbor's metric</li>
                        <li><span className="text-green-500">Feasibility Condition:</span> RD must be less than FD</li>
                        <li><span className="text-green-500">Active/Passive state:</span> Route query states</li>
                      </ul>
                    </Card>
                  </Grid>
                </section>

                <section id="eigrp-features" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">EIGRP Features</h3>

                  <Diagram title="EIGRP Protocol Components">
                    {`
                    ┌─────────────────────────────────────┐
                    │           EIGRP                      │
                    ├─────────────────────────────────────┤
                    │  ┌─────────────┐  ┌─────────────┐  │
                    │  │    DUAL     │  │  Reliable   │  │
                    │  │  Algorithm  │  │  Transport  │  │
                    │  └─────────────┘  │   Protocol  │  │
                    │                   │   (RTP)     │  │
                    │  ┌─────────────┐  └─────────────┘  │
                    │  │  Neighbor   │  ┌─────────────┐  │
                    │  │  Discovery  │  │  Protocol-  │  │
                    │  │   (Hello)   │  │  Dependent  │  │
                    │  └─────────────┘  │   Modules   │  │
                    │                   │  (PDMs)     │  │
                    │  ┌─────────────┐  └─────────────┘  │
                    │  │  Finite     │                    │
                    │  │   State     │                    │
                    │  │   Machine   │                    │
                    │  └─────────────┘                    │
                    └─────────────────────────────────────┘
`}
                  </Diagram>

                  <Table
                    headers={["EIGRP Packet Type", "Purpose", "Reliability"]}
                    rows={[
                      ["Hello", "Neighbor discovery and maintenance", "Unreliable (multicast)"],
                      ["Update", "Route information exchange", "Reliable (unicast/multicast)"],
                      ["Query", "Ask neighbors for route information", "Reliable (multicast)"],
                      ["Reply", "Response to queries", "Reliable (unicast)"],
                      ["ACK", "Acknowledgment for reliable packets", "Unreliable (unicast)"]
                    ]}
                  />

                  <CodeBlock
                    title="EIGRP Packet Details"
                    language="text"
                    code={`EIGRP Packet Header:
┌─────────┬─────────┬─────────┬─────────┐
│ Version │ OpCode  │  Checksum           │
├─────────┼─────────┼─────────┼─────────┤
│        Flags                          │
├─────────┼─────────┼─────────┼─────────┤
│        Sequence Number                 │
├─────────┼─────────┼─────────┼─────────┤
│        ACK Number                      │
├─────────┼─────────┼─────────┼─────────┤
│        Autonomous System Number        │
├─────────┼─────────┼─────────┼─────────┤
│        Parameters (TLVs)                │
└─────────┴─────────┴─────────┴─────────┘

Hello Interval:
- LAN: 5 seconds (Hold time 15 seconds)
- WAN (low-speed): 60 seconds (Hold time 180 seconds)`}
                  />
                </section>

                <section id="dual-algorithm" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">DUAL Algorithm</h3>

                  <p className="text-gray-300 mb-4">
                    DUAL (Diffusing Update Algorithm) ensures loop-free paths throughout the route computation.
                    It pre-computes backup routes (Feasible Successors) for fast failover.
                  </p>

                  <Diagram title="DUAL Route Computation">
                    {`
                    ┌─────────┐
                    │   R1    │──10──┐
                    │   FD=20 │      │
                    └─────────┘      │
                         │           │
                        20           │10
                         │           │
                    ┌────┴────┐     ┌┴─────────┐
                    │   R2    │     │   R3     │
                    │   RD=30 │     │   RD=20  │
                    └─────────┘     └──────────┘
                         │               │
                        30               │
                         │              20
                    ┌────┴────┐         │
                    │   R4    │◄────────┘
                    │Network  │
                    │10.0.0.0 │
                    └─────────┘

R1's perspective:
- Successor: R3 (FD=20+10=30)
- Feasible Successor: R2 (RD=30, FD=20+20=40)
- Feasibility Condition: RD of FS (30) < FD of successor (30)? No!
  So R2 is NOT a feasible successor!`}
                  </Diagram>

                  <Step number={1} title="Feasibility Condition">
                    <p>For a route to be a feasible successor, neighbor's Reported Distance must be less than current Feasible Distance.</p>
                    <CodeBlock
                      language="text"
                      code={`Condition: RD < FD
- RD: Distance reported by neighbor
- FD: Current best metric to destination

If condition met: Route is loop-free and can be backup
If not met: Route may be loop or suboptimal`}
                    />
                  </Step>

                  <Step number={2} title="DUAL States">
                    <Table
                      headers={["State", "Description"]}
                      rows={[
                        ["Passive", "Normal operation, route is stable"],
                        ["Active", "Router lost route and is querying neighbors"],
                        ["Active/Stuck-in-Active", "Query process timed out (serious problem)"]
                      ]}
                    />
                  </Step>

                  <Step number={3} title="DUAL Finite State Machine">
                    <CodeBlock
                      language="text"
                      code={`Route lost or metric change:
    │
    ▼
┌───────────┐
│   Look    │
│   for FS  │
└───────────┘
    │
    ├──► FS exists → Switch to FS (Fast convergence)
    │
    └──► No FS → Enter Active state
            │
            ▼
    ┌───────────────┐
    │ Send Queries  │────┐
    │ to neighbors  │    │
    └───────────────┘    │
            │            │
            ▼             │
    ┌───────────────┐    │
    │ Wait for all  │    │
    │   Replies     │    │
    └───────────────┘    │
            │            │
            ▼             │
    ┌───────────────┐    │
    │ Calculate new │    │
    │    path       │    │
    └───────────────┘    │
            │            │
            ▼             │
    ┌───────────────┐    │
    │ Return to     │    │
    │  Passive      │◄───┘
    └───────────────┘`}
                    />
                  </Step>
                </section>

                <section id="successor-fs" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Successor and Feasible Successor</h3>

                  <Diagram title="EIGRP Topology Table">
                    {`
                    Network 10.1.1.0/24
                    ┌─────────────────┐
                    │  Topology Table │
                    ├─────────────────┤
                    │ P - Passive     │
                    │ A - Active      │
                    │ U - Update      │
                    │ Q - Query       │
                    │ R - Reply       │
                    ├─────────────────┤
                    │Successor (FD=20)│
                    │  via 192.168.1.2│
                    │  (10.0.0.0/30)  │
                    ├─────────────────┤
                    │Feasible Successor│
                    │  via 192.168.2.2│
                    │  (10.0.0.4/30)  │
                    │  FD=30, RD=15   │
                    └─────────────────┘
`}
                  </Diagram>

                  <CodeBlock
                    title="Viewing EIGRP Topology"
                    language="bash"
                    code={`# Show EIGRP neighbors
show ip eigrp neighbors

H   Address         Interface  Hold  Uptime   SRTT   RTO   Q   Seq
                                (sec)         (ms)   (ms)  Cnt Num
0   10.0.0.2        Fa0/0       13    00:12:34 1     200   0   45
1   10.0.0.6        Fa0/1       14    00:10:22 2     200   0   23

# Show EIGRP topology
show ip eigrp topology

P 10.1.1.0/24, 1 successors, FD is 28160
        via 10.0.0.2 (28160/28160), FastEthernet0/0
        via 10.0.0.6 (30720/28160), FastEthernet0/1

# Show all possible routes
show ip eigrp topology all-links

P 10.1.1.0/24, 1 successors, FD is 28160, serno 5
        via 10.0.0.2 (28160/28160), FastEthernet0/0
        via 10.0.0.6 (30720/28160), FastEthernet0/1
        via 10.0.0.10 (33280/30720), Serial0/0`}
                  />
                </section>

                <section id="eigrp-metrics" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">EIGRP Metrics</h3>

                  <p className="text-gray-300 mb-4">
                    EIGRP uses a composite metric based on bandwidth, delay, load, and reliability. By default, only bandwidth and delay are used.
                  </p>

                  <Table
                    headers={["K Value", "Metric Component", "Default", "Description"]}
                    rows={[
                      ["K1", "Bandwidth", "1", "Minimum bandwidth along path"],
                      ["K2", "Load", "0", "Interface load (optional)"],
                      ["K3", "Delay", "1", "Sum of interface delays"],
                      ["K4", "Reliability", "0", "Interface reliability (optional)"],
                      ["K5", "MTU", "0", "MTU (rarely used)"]
                    ]}
                  />

                  <Callout type="info" title="EIGRP Metric Formula">
                    <p className="font-mono text-sm mb-2">
                      Metric = 256 * [ (K1 * Bandwidth) + (K2 * Bandwidth)/(256 - Load) + (K3 * Delay) ] * [K5/(Reliability + K4)]
                    </p>
                    <p className="text-sm">With default K values (K1=1, K3=1, others=0):</p>
                    <p className="font-mono text-sm">Metric = 256 * (Bandwidth + Delay)</p>
                    <p className="text-sm mt-2">Where:</p>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Bandwidth = (10^7 / Minimum Interface Bandwidth) * 256</li>
                      <li>Delay = (Sum of Interface Delays / 10) * 256</li>
                    </ul>
                  </Callout>

                  <CodeBlock
                    title="Metric Calculation Example"
                    language="text"
                    code={`Path: 100 Mbps FastEthernet link with 100 µs delay

Bandwidth = (10,000,000 / 100,000) * 256
          = 100 * 256 = 25,600

Delay = (100 µs / 10) * 256
      = 10 * 256 = 2,560

Metric = 25,600 + 2,560 = 28,160

Show interface values:
interface FastEthernet0/0
 bandwidth 100000
 delay 100
 loading 1/255
 reliability 255/255`}
                  />
                </section>

                <section id="eigrp-config" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">EIGRP Configuration Examples</h3>

                  <Diagram title="EIGRP Network Topology">
                    {`
                    ┌─────────┐
                    │   R1    │
                    │  AS 100 │
                    └────┬────┘
                         │10.0.0.0/30
                    ┌────┴────┐
                    │   R2    │
                    │  AS 100 │
                    └────┬────┘
                         │10.0.0.4/30
                    ┌────┴────┐
                    │   R3    │
                    │  AS 100 │
                    └────┬────┘
                         │
                  ┌──────┴──────┐
                  │  LAN 1      │  │  LAN 2
                  │172.16.1.0/24│  │172.16.2.0/24
`}
                  </Diagram>

                  <Tabs>
                    <Tab label="Basic EIGRP Configuration">
                      <CodeBlock
                        language="bash"
                        code={`! Enable EIGRP with AS 100
router eigrp 100
 ! Router ID (optional, defaults to highest IP)
 eigrp router-id 1.1.1.1

 ! Network statements (wildcard mask)
 network 10.0.0.0 0.0.0.3
 network 172.16.1.0 0.0.0.255

 ! Disable auto-summary (important for VLSM)
 no auto-summary

 ! Passive interface on LAN
 passive-interface FastEthernet0/1

 ! Adjust bandwidth for serial links
interface Serial0/0
 bandwidth 1544  ! T1 speed
 ip address 10.0.0.1 255.255.255.252
 no shutdown

interface FastEthernet0/1
 ip address 172.16.1.1 255.255.255.0
 no shutdown`}
                      />
                    </Tab>
                    <Tab label="Advanced EIGRP Features">
                      <CodeBlock
                        language="bash"
                        code={`! Unequal cost load balancing
router eigrp 100
 variance 2  ! Allows paths up to 2x best metric
 traffic-share balanced

! Manual route summarization
interface FastEthernet0/0
 ip summary-address eigrp 100 172.16.0.0 255.255.252.0

! Authentication
key chain EIGRP-KEY
 key 1
  key-string MySecretKey

interface FastEthernet0/0
 ip authentication mode eigrp 100 md5
 ip authentication key-chain eigrp 100 EIGRP-KEY

! Adjust hello/hold timers
interface FastEthernet0/0
 ip hello-interval eigrp 100 10
 ip hold-time eigrp 100 30

! Stub router (for spoke sites)
router eigrp 100
 eigrp stub connected summary

! Route filtering
access-list 10 deny 172.16.0.0 0.0.255.255
access-list 10 permit any
router eigrp 100
 distribute-list 10 in FastEthernet0/0`}
                      />
                    </Tab>
                    <Tab label="Verification Commands">
                      <CodeBlock
                        language="bash"
                        code={`# Show EIGRP neighbors
show ip eigrp neighbors
EIGRP-IPv4 Neighbors for AS(100)
H   Address         Interface  Hold  Uptime   SRTT   RTO   Q   Seq
                                (sec)         (ms)   (ms)  Cnt Num
0   10.0.0.2        Se0/0      13    00:12:34 1     200   0   45

# Show EIGRP topology
show ip eigrp topology
P 172.16.2.0/24, 1 successors, FD is 30720
        via 10.0.0.2 (30720/28160), Serial0/0
        via 10.0.0.6 (33280/30720), Serial0/1

# Show EIGRP interfaces
show ip eigrp interfaces
EIGRP-IPv4 Interfaces for AS(100)
                    Xmit Queue   Mean   Pacing Time   Multicast    Pending
Interface   Peers   Un/Reliable  SRTT   Un/Reliable   Flow Timer   Routes
Se0/0       1       0/0           1     0/15          50           0
Se0/1       1       0/0           2     0/15          52           0

# Show EIGRP traffic
show ip eigrp traffic
EIGRP-IPv4 Traffic Statistics for AS(100)
  Hellos sent/received: 1234/1230
  Updates sent/received: 45/44
  Queries sent/received: 2/2
  Replies sent/received: 2/2
  Acks sent/received: 44/45

# Debug EIGRP (use with caution)
debug eigrp packets
debug eigrp neighbors
debug eigrp fsm`}
                      />
                    </Tab>
                  </Tabs>

                  <Callout type="tip" title="EIGRP Stub Configuration">
                    <p>EIGRP stub routers are ideal for hub-and-spoke topologies. They help prevent query storms:</p>
                    <CodeBlock
                      language="bash"
                      code={`router eigrp 100
 eigrp stub connected summary
 ! Options:
 !   connected - advertise connected routes
 !   static - advertise static routes
 !   summary - advertise summary routes
 !   receive-only - don't send any routes
 !   redistributed - advertise redistributed routes`}
                    />
                  </Callout>
                </section>
              </section>

              {/* BGP Section */}
              <section id="bgp" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  BGP - Border Gateway Protocol
                </h2>

                <section id="bgp-overview" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">BGP Overview</h3>
                  <p className="text-gray-300 mb-4">
                    BGP is the protocol that makes the Internet work. It's a path-vector protocol used to exchange routing information
                    between autonomous systems (AS). Unlike IGPs that focus on finding the shortest path, BGP focuses on applying
                    routing policies based on business relationships.
                  </p>

                  <Table
                    headers={["Feature", "Description"]}
                    rows={[
                      ["Protocol", "TCP port 179 (reliable transport)"],
                      ["Type", "Path Vector (EGP)"],
                      ["Metric", "Path attributes (not simple metrics)"],
                      ["Update Method", "Incremental updates (full refresh periodically)"],
                      ["Loop Prevention", "AS_PATH attribute"],
                      ["Scalability", "Hundreds of thousands of routes"],
                      ["Convergence", "Slow (policy-based)"],
                      ["Versions", "BGP-4 (current), BGP-4 for IPv6 (MP-BGP)"]
                    ]}
                  />

                  <Grid>
                    <Card title="eBGP (External BGP)" icon={Globe}>
                      <p className="text-sm mb-2">Between different autonomous systems:</p>
                      <ul className="text-xs list-disc pl-4 space-y-1">
                        <li>TTL = 1 by default (direct connection)</li>
                        <li>Adds AS number to AS_PATH</li>
                        <li>Typically used at Internet exchange points</li>
                        <li>Carries full Internet routing table</li>
                      </ul>
                    </Card>
                    <Card title="iBGP (Internal BGP)" icon={Home}>
                      <p className="text-sm mb-2">Within the same autonomous system:</p>
                      <ul className="text-xs list-disc pl-4 space-y-1">
                        <li>TTL = 255 (can be multiple hops)</li>
                        <li>Does NOT modify AS_PATH</li>
                        <li>Requires full mesh or route reflectors</li>
                        <li>Next-hop usually unchanged</li>
                      </ul>
                    </Card>
                  </Grid>

                  <Diagram title="BGP Autonomous Systems">
                    {`
                    AS 100                   AS 200
    ┌─────────────────────┐      ┌─────────────────────┐
    │  ┌─────┐    ┌─────┐ │      │ ┌─────┐    ┌─────┐ │
    │  │ R1  │────│ R2  │ │ eBGP │ │ R4  │────│ R5  │ │
    │  └─────┘    └──┬──┘ ├──────┤ └──┬──┘    └─────┘ │
    │       iBGP      │   │      │     │               │
    │                 │   │      │ ┌───┴───┐           │
    │  ┌─────┐    ┌──┴──┐ │      │ │  R6   │           │
    │  │ R3  │────│ iBGP│ │      │ └───────┘           │
    │  └─────┘    └─────┘ │      │      iBGP           │
    └─────────────────────┘      └─────────────────────┘
`}
                  </Diagram>
                </section>

                <section id="ebgp-ibgp" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">eBGP vs iBGP</h3>

                  <Table
                    headers={["Characteristic", "eBGP", "iBGP"]}
                    rows={[
                      ["AS Number", "Different", "Same"],
                      ["TTL", "1 (default)", "255"],
                      ["Next-Hop", "Changes to eBGP peer IP", "Usually unchanged"],
                      ["AS_PATH", "Prepends own AS", "Doesn't modify"],
                      ["Loop Prevention", "AS_PATH", "Split horizon (iBGP routes not advertised to iBGP)"],
                      ["Full Mesh", "Not required", "Required (or route reflectors/confederations)"],
                      ["Multihop", "Possible with ebgp-multihop", "Normal operation"],
                      ["AD Value", "20", "200"]
                    ]}
                  />

                  <Callout type="warning" title="iBGP Full Mesh Rule">
                    <p>iBGP routers must be fully meshed because:</p>
                    <ul className="list-disc pl-5">
                      <li>iBGP-learned routes are not advertised to other iBGP neighbors (split horizon)</li>
                      <li>Every router must peer with every other router in the AS</li>
                      <li>For n routers, you need n(n-1)/2 peerings</li>
                    </ul>
                    <p className="mt-2">Solution: Use Route Reflectors or Confederations for scalability.</p>
                  </Callout>

                  <Diagram title="iBGP Full Mesh vs Route Reflector">
                    {`
    Full Mesh (n² peerings):      Route Reflector (n peerings):

        R1──R2                          R1   R2
        │╲  ╱│                            ╲ │ ╱
        │ ╳  │                             ╳
        │╱  ╲│                            ╱ │ ╲
        R3──R4                          R3   R4
                                          │
                                        Client
`}
                  </Diagram>
                </section>

                <section id="bgp-attributes" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">BGP Attributes</h3>

                  <p className="text-gray-300 mb-4">
                    BGP uses path attributes to make routing decisions and implement policies. Attributes can be well-known or optional, mandatory or discretionary.
                  </p>

                  <Table
                    headers={["Attribute", "Type", "Description"]}
                    rows={[
                      ["AS_PATH", "Well-known mandatory", "List of AS numbers the route has traversed"],
                      ["NEXT_HOP", "Well-known mandatory", "IP address of next-hop router"],
                      ["ORIGIN", "Well-known mandatory", "How route entered BGP (IGP, EGP, incomplete)"],
                      ["LOCAL_PREF", "Well-known discretionary", "Used for outbound traffic (higher preferred)"],
                      ["MED", "Optional non-transitive", "Multi-Exit Discriminator (lower preferred)"],
                      ["Weight", "Cisco proprietary", "Local to router (higher preferred)"],
                      ["Community", "Optional transitive", "Tag for policy application"]
                    ]}
                  />

                  <Diagram title="BGP Path Selection Process">
                    {`
                    Route Received
                          │
                          ▼
                ┌─────────────────┐
                │  Highest Weight  │──► Cisco only
                └─────────────────┘
                          │
                          ▼
                ┌─────────────────┐
                │Highest Local Pref│
                └─────────────────┘
                          │
                          ▼
                ┌─────────────────┐
                │  Originated via  │
                │  network/aggregate│
                └─────────────────┘
                          │
                          ▼
                ┌─────────────────┐
                │  Shortest AS_PATH│
                └─────────────────┘
                          │
                          ▼
                ┌─────────────────┐
                │   Lowest ORIGIN  │
                │ IGP < EGP < Incomplete│
                └─────────────────┘
                          │
                          ▼
                ┌─────────────────┐
                │   Lowest MED     │
                └─────────────────┘
                          │
                          ▼
                ┌─────────────────┐
                │  eBGP > iBGP     │
                └─────────────────┘
                          │
                          ▼
                ┌─────────────────┐
                │   Lowest IGP     │
                │   metric to next-hop│
                └─────────────────┘
                          │
                          ▼
                ┌─────────────────┐
                │   Load balance   │
                │   (if multiple)  │
                └─────────────────┘
`}
                  </Diagram>
                </section>

                <section id="bgp-path-selection" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">BGP Path Selection in Detail</h3>

                  <CodeBlock
                    title="BGP Path Selection Algorithm"
                    language="text"
                    code={`BGP selects only ONE best path using these criteria in order:

1. Prefer highest weight (Cisco proprietary, local to router)
   ip prefix-list CUSTOMER permit 10.0.0.0/8
   route-map SET-WEIGHT permit 10
    match ip address prefix-list CUSTOMER
    set weight 200

2. Prefer highest LOCAL_PREF (global within AS)
   route-map SET-LOCAL-PREF permit 10
    set local-preference 200

3. Prefer locally originated routes (network/aggregate)
   - Routes from network command
   - Routes from redistribute command
   - Aggregates

4. Prefer shortest AS_PATH
   - Can be manipulated with AS_PATH prepending
   route-map PREPEND permit 10
    set as-path prepend 100 100 100

5. Prefer lowest ORIGIN code
   - IGP (i) < EGP (e) < Incomplete (?)

6. Prefer lowest MED (Multi-Exit Discriminator)
   - Usually compared only from same AS
   route-map SET-MED permit 10
    set metric 50

7. Prefer eBGP over iBGP

8. Prefer lowest IGP metric to NEXT_HOP

9. If multiple paths, can load-balance (maximum-paths)

10. Prefer oldest route for eBGP paths

11. Prefer lowest Router ID

12. Prefer shortest Cluster List

13. Prefer lowest Neighbor Address`}
                  />

                  <Callout type="tip" title="Influencing BGP Path Selection">
                    <ul className="list-disc pl-5">
                      <li><span className="text-green-500">Inbound traffic:</span> Use AS_PATH prepending, MED</li>
                      <li><span className="text-green-500">Outbound traffic:</span> Use LOCAL_PREF, Weight</li>
                      <li><span className="text-green-500">Business relationships:</span> Customer &gt; Peer &gt; Provider</li>
                      <li><span className="text-green-500">Communities:</span> Standardized way to signal policies</li>
                    </ul>
                  </Callout>
                </section>

                <section id="bgp-config" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">BGP Configuration Examples</h3>

                  <Diagram title="BGP Multi-Homed Network">
                    {`
                    ┌─────────────────────────────────┐
                    │          AS 65001               │
                    │       Customer Network          │
                    │   ┌─────────┐                    │
                    │   │   R1    │                    │
                    │   │ iBGP    │                    │
                    │   └────┬────┘                    │
                    │        │                          │
                    │   ┌────┴────┐                    │
                    │   │   R2    │                    │
                    │   │ iBGP    │                    │
                    │   └────┬────┘                    │
                    └────────┼─────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              │ eBGP         │ eBGP         │ eBGP
         ┌────┴────┐    ┌────┴────┐    ┌────┴────┐
         │  AS 100 │    │  AS 200 │    │  AS 300 │
         │ ISP A   │    │ ISP B   │    │  Peer   │
         │Provider │    │Provider │    │         │
         └─────────┘    └─────────┘    └─────────┘
`}
                  </Diagram>

                  <Tabs>
                    <Tab label="Basic eBGP Configuration">
                      <CodeBlock
                        language="bash"
                        code={`! R1 - Customer router (AS 65001)
router bgp 65001
 ! Router ID (required for BGP)
 bgp router-id 1.1.1.1

 ! eBGP neighbor (ISP A)
 neighbor 203.0.113.2 remote-as 100
 neighbor 203.0.113.2 description ISP-A-Connection
 neighbor 203.0.113.2 password MyBGPSecret

 ! eBGP neighbor (ISP B)
 neighbor 198.51.100.2 remote-as 200
 neighbor 198.51.100.2 description ISP-B-Connection
 neighbor 198.51.100.2 password MyBGPSecret

 ! eBGP multihop if not directly connected
 neighbor 203.0.113.2 ebgp-multihop 2

 ! Advertise local networks
 network 192.168.0.0 mask 255.255.252.0
 network 10.0.0.0 mask 255.0.0.0

 ! iBGP neighbor (R2)
 neighbor 10.0.0.2 remote-as 65001
 neighbor 10.0.0.2 update-source Loopback0
 neighbor 10.0.0.2 next-hop-self

interface Loopback0
 ip address 1.1.1.1 255.255.255.255

interface FastEthernet0/0
 ip address 203.0.113.1 255.255.255.252
 no shutdown

interface FastEthernet0/1
 ip address 198.51.100.1 255.255.255.252
 no shutdown`}
                      />
                    </Tab>
                    <Tab label="Advanced BGP Policy">
                      <CodeBlock
                        language="bash"
                        code={`! R1 - Advanced BGP Configuration
router bgp 65001
 ! Default originate
 neighbor 203.0.113.2 default-originate

 ! Route filtering
 neighbor 203.0.113.2 prefix-list CUSTOMER out
 neighbor 203.0.113.2 route-map FROM-ISP in
 neighbor 203.0.113.2 route-map TO-ISP out

 ! Load balancing (4 paths maximum)
 maximum-paths 4

 ! Route reflection (if R1 is RR)
 bgp cluster-id 1

! Prefix lists for filtering
ip prefix-list CUSTOMER seq 5 permit 192.168.0.0/22
ip prefix-list CUSTOMER seq 10 permit 10.0.0.0/8

! Route maps for policy
route-map FROM-ISP permit 10
 match ip address prefix-list FROM-CUSTOMERS
 set local-preference 200

route-map FROM-ISP permit 20
 set local-preference 100

route-map TO-ISP permit 10
 match ip address prefix-list CUSTOMER
 set community 65001:100

! Community setting
ip community-list 1 permit 100:100
route-map SET-COMM permit 10
 match community 1
 set local-preference 50

! AS_PATH prepending (for inbound traffic engineering)
route-map PREPEND-ISP-A permit 10
 set as-path prepend 65001 65001 65001

! Apply to specific neighbor
neighbor 203.0.113.2 route-map PREPEND-ISP-A out`}
                      />
                    </Tab>
                    <Tab label="Verification Commands">
                      <CodeBlock
                        language="bash"
                        code={`# Show BGP summary
show ip bgp summary

BGP router identifier 1.1.1.1, local AS number 65001
Neighbor        V    AS MsgRcvd MsgSent   TblVer  InQ OutQ Up/Down  State/PfxRcd
203.0.113.2     4   100   12345   12346       50    0    0 2d18h          500000
198.51.100.2    4   200   1234    1235        50    0    0 1d12h          250000
10.0.0.2        4 65001   123     124         50    0    0 2d18h          5

# Show BGP routes
show ip bgp
BGP table version is 50, local router ID is 1.1.1.1
Status codes: s suppressed, d damped, h history, * valid, > best, i - internal
Origin codes: i - IGP, e - EGP, ? - incomplete

   Network          Next Hop        Metric LocPrf Weight Path
*> 0.0.0.0          203.0.113.2          0   100      0 100 i
*  0.0.0.0          198.51.100.2         0   100      0 200 i
*> 10.0.0.0/8       0.0.0.0              0         32768 i
*> 192.168.0.0/22   0.0.0.0              0         32768 i

# Show specific prefix
show ip bgp 8.8.8.0/24
BGP routing table entry for 8.8.8.0/24, version 123
Paths: (2 available, best #2)
  Not advertised to any peer
  Refresh Epoch 1
  100 15169
    203.0.113.2 from 203.0.113.2 (203.0.113.2)
      Origin IGP, metric 0, localpref 100, valid, external
  Refresh Epoch 1
  200 15169
    198.51.100.2 from 198.51.100.2 (198.51.100.2)
      Origin IGP, metric 0, localpref 200, valid, external, best

# Show BGP neighbors
show ip bgp neighbors 203.0.113.2
BGP neighbor is 203.0.113.2, remote AS 100, external link
  BGP version 4, remote router ID 203.0.113.2
  BGP state = Established, up for 2d18h
  Last read 00:00:28, last write 00:00:29
  Hold time is 90, keepalive interval is 30 seconds
  Configured hold time is 90, keepalive interval is 30

# Debug BGP (use with extreme caution!)
debug ip bgp updates
debug ip bgp keepalives
debug ip bgp events`}
                      />
                    </Tab>
                  </Tabs>

                  <Callout type="warning" title="BGP Best Practices">
                    <ul className="list-disc pl-5">
                      <li>Always use MD5 passwords for BGP sessions</li>
                      <li>Implement prefix filtering (both inbound and outbound)</li>
                      <li>Use TTL security (GTSM) on eBGP sessions</li>
                      <li>Never accept your own AS in AS_PATH</li>
                      <li>Limit number of prefixes from neighbors</li>
                      <li>Use route dampening for unstable routes</li>
                      <li>Document and label all BGP policies</li>
                    </ul>
                  </Callout>

                  <CodeBlock
                    title="BGP Security Configuration"
                    language="bash"
                    code={`! TTL Security (GTSM)
neighbor 203.0.113.2 ttl-security hops 1

! Maximum prefix limit
neighbor 203.0.113.2 maximum-prefix 500000 90 restart 30

! AS_PATH filter
ip as-path access-list 1 deny _65001_
ip as-path access-list 1 permit .*
neighbor 203.0.113.2 filter-list 1 in

! Route flap dampening
bgp dampening 15 750 2000 60

! Log neighbor changes
bgp log-neighbor-changes`}
                  />
                </section>
              </section>

              {/* Route Selection */}
              <section id="route-selection" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Navigation className="h-5 w-5" />
                  Route Selection
                </h2>

                <section id="longest-match" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Longest Prefix Match</h3>

                  <p className="text-gray-300 mb-4">
                    When a router has multiple routes to the same destination, it uses the longest prefix match rule:
                    the route with the most specific (longest) subnet mask is preferred.
                  </p>

                  <Diagram title="Longest Match Example">
                    {`
                    Destination: 192.168.1.100

    Routing Table:
    ┌───────────────────────────────┐
    │ 192.168.0.0/16   (less specific)│
    │ 192.168.1.0/24   (more specific)│
    │ 192.168.1.64/26  (most specific)│
    └───────────────────────────────┘

    Match Check:
    192.168.1.100 in 192.168.0.0/16?  ✓ (16 bits match)
    192.168.1.100 in 192.168.1.0/24?  ✓ (24 bits match)
    192.168.1.100 in 192.168.1.64/26? ✓ (26 bits match)

    Result: Choose 192.168.1.64/26 (longest match)
`}
                  </Diagram>

                  <Table
                    headers={["Route", "Mask", "Match Bits", "Priority"]}
                    rows={[
                      ["192.168.0.0/16", "255.255.0.0", "16", "3"],
                      ["192.168.1.0/24", "255.255.255.0", "24", "2"],
                      ["192.168.1.64/26", "255.255.255.192", "26", "1 (Best)"],
                      ["Default 0.0.0.0/0", "0.0.0.0", "0", "4 (Last resort)"]
                    ]}
                  />

                  <Callout type="tip" title="Longest Match Algorithm">
                    The router performs a bitwise AND between the destination IP and each route's mask,
                    then compares the result to the route's network address. The route with the most matching
                    bits (largest mask) wins.
                  </Callout>
                </section>

                <section id="admin-distance" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Administrative Distance</h3>

                  <p className="text-gray-300 mb-4">
                    When routes to the same network are learned from different routing protocols, the router uses
                    Administrative Distance (AD) to determine which route is more trustworthy. Lower AD wins.
                  </p>

                  <Table
                    headers={["Route Source", "AD", "Description"]}
                    rows={[
                      ["Connected", "0", "Directly connected networks"],
                      ["Static", "1", "Manually configured routes"],
                      ["EIGRP Summary", "5", "EIGRP summary routes"],
                      ["External BGP", "20", "eBGP-learned routes"],
                      ["Internal EIGRP", "90", "EIGRP internal routes"],
                      ["IGRP", "100", "Interior Gateway Routing Protocol"],
                      ["OSPF", "110", "OSPF internal routes"],
                      ["IS-IS", "115", "Intermediate System to Intermediate System"],
                      ["RIP", "120", "Routing Information Protocol"],
                      ["EGP", "140", "Exterior Gateway Protocol"],
                      ["ODR", "160", "On-Demand Routing"],
                      ["External EIGRP", "170", "EIGRP external routes"],
                      ["Internal BGP", "200", "iBGP-learned routes"],
                      ["Unknown", "255", "Unreachable/untrusted"]
                    ]}
                  />

                  <CodeBlock
                    title="Changing Administrative Distance"
                    language="bash"
                    code={`# Change AD for a static route
ip route 10.0.0.0 255.0.0.0 192.168.1.1 150

# Change AD for OSPF external routes
router ospf 1
 distance ospf external 150

# Change AD for all routes from a protocol
router eigrp 100
 distance 95

# Change AD for specific neighbor
router bgp 65001
 neighbor 192.168.1.1 distance 150`}
                  />
                </section>

                <section id="metrics-comparison" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Metric Comparison</h3>

                  <p className="text-gray-300 mb-4">
                    If multiple routes from the same protocol exist, the router uses metrics to choose the best path.
                    Each protocol uses different metrics:
                  </p>

                  <Table
                    headers={["Protocol", "Metric Type", "Range", "Lower is Better?"]}
                    rows={[
                      ["RIP", "Hop Count", "1-15", "Yes"],
                      ["OSPF", "Cost (bandwidth-based)", "1-65535", "Yes"],
                      ["EIGRP", "Composite (BW/Delay/etc.)", "1-4294967295", "Yes"],
                      ["BGP", "Path Attributes (MED)", "0-4294967295", "Yes (for MED)"],
                      ["IS-IS", "Cost (default 10)", "1-63", "Yes"],
                      ["Static", "0 (unless set)", "0-255", "N/A"]
                    ]}
                  />

                  <Grid>
                    <Card title="Equal Cost Multi-Path (ECMP)" icon={Split}>
                      <p className="text-sm">When multiple paths have equal metrics, routers can load balance:</p>
                      <ul className="text-xs list-disc pl-4 mt-2">
                        <li>Per-packet (round-robin)</li>
                        <li>Per-destination (hash-based)</li>
                        <li>Per-flow (preserves session integrity)</li>
                      </ul>
                    </Card>
                    <Card title="Unequal Cost Load Balancing" icon={GitBranch}>
                      <p className="text-sm">EIGRP can load balance across unequal cost paths using the <span className="font-mono">variance</span> command.</p>
                      <CodeBlock
                        language="bash"
                        code={`router eigrp 100
 variance 2  ! Use paths up to 2x best metric
 traffic-share balanced`}
                      />
                    </Card>
                  </Grid>
                </section>

                <section id="load-balancing" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Load Balancing Methods</h3>

                  <Table
                    headers={["Method", "Description", "Pros/Cons"]}
                    rows={[
                      ["Per-Packet", "Round-robin across paths", "+ Even distribution, - Packet reordering"],
                      ["Per-Destination", "Hash on destination IP", "+ No reordering, - Uneven distribution"],
                      ["Per-Flow", "Hash on 5-tuple (src/dst IP, ports, protocol)", "+ Best for TCP, preserves flows"],
                      ["Per-Prefix", "Hash on destination network", "+ Simple, - May overload one path"]
                    ]}
                  />

                  <CodeBlock
                    title="Configuring Load Balancing"
                    language="bash"
                    code={`# OSPF - enable ECMP
router ospf 1
 maximum-paths 4

# EIGRP - enable ECMP and unequal cost
router eigrp 100
 maximum-paths 6
 variance 2

# BGP - enable multipath
router bgp 65001
 maximum-paths 4
 maximum-paths ibgp 2  # for iBGP paths

# Cisco Express Forwarding (CEF) load balancing
ip cef
interface FastEthernet0/0
 load-interval 30
!
! Per-packet load balancing (not recommended)
interface FastEthernet0/0
 no ip route-cache cef
 ip route-cache

! Verify load balancing
show ip route 10.0.0.0
show ip cef 10.0.0.0 internal`}
                  />
                </section>

                <section id="policy-routing" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Policy-Based Routing (PBR)</h3>

                  <p className="text-gray-300 mb-4">
                    PBR bypasses the normal routing table and makes forwarding decisions based on configured policies
                    (source IP, packet size, protocol, etc.). It provides granular control over traffic flow.
                  </p>

                  <Diagram title="Policy-Based Routing">
                    {`
                    Traffic from 10.0.0.0/24 → ISP A
                    Traffic from 192.168.0.0/24 → ISP B
                    VoIP traffic → Low-latency path

                    ┌─────────┐
                    │  VoIP   │───┐
                    └─────────┘   │
                                 ▼
                    ┌─────────────────────┐
                    │      Router         │
                    │  ┌─────────────────┐│
                    │  │   Route Map     ││
                    │  │   (PBR Policy)  ││
                    │  └─────────────────┘│
                    └──────────┬──────────┘
                      ┌─────────┴─────────┐
                      ▼                    ▼
                ┌─────────┐          ┌─────────┐
                │  ISP A  │          │  ISP B  │
                │ Low-cost│          │ Low-lat │
                └─────────┘          └─────────┘
`}
                  </Diagram>

                  <CodeBlock
                    title="Policy-Based Routing Configuration"
                    language="bash"
                    code={`! Define interesting traffic
access-list 101 permit ip 10.0.0.0 0.255.255.255 any
access-list 102 permit ip 192.168.0.0 0.0.255.255 any
access-list 103 permit udp any any range 16384 32767  ! VoIP

! Create route map
route-map PBR permit 10
 match ip address 101
 set ip next-hop 203.0.113.2
 set ip next-hop verify-availability  ! Track next-hop

route-map PBR permit 20
 match ip address 102
 set ip next-hop 198.51.100.2

route-map PBR permit 30
 match ip address 103
 set ip next-hop 10.0.0.2
 set ip tos 184  ! EF for VoIP

! Apply to interface
interface FastEthernet0/0
 ip policy route-map PBR

! Verify PBR
show ip policy
show route-map
debug ip policy

! Track next-hop availability
track 1 ip sla 1 reachability
ip sla 1
 icmp-echo 203.0.113.2
 frequency 5
ip sla schedule 1 life forever start-time now`}
                  />
                </section>
              </section>

              {/* Route Redistribution */}
              <section id="redistribution" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Split className="h-5 w-5" />
                  Route Redistribution
                </h2>

                <section id="what-is-redistribution" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">What is Redistribution?</h3>
                  <p className="text-gray-300 mb-4">
                    Route redistribution is the process of injecting routes learned from one routing protocol into another.
                    This is necessary when multiple routing protocols coexist in a network (e.g., OSPF and EIGRP, or BGP and OSPF).
                  </p>

                  <Diagram title="Route Redistribution">
                    {`
                    ┌─────────────────────────────────┐
                    │         Autonomous System        │
                    │                                   │
                    │   ┌─────────┐    ┌─────────┐    │
                    │   │  OSPF   │────│  EIGRP  │    │
                    │   │  Area 0 │    │  AS 100 │    │
                    │   └─────────┘    └─────────┘    │
                    │        │              │          │
                    │        └──────┬───────┘          │
                    │               │                   │
                    │          ┌────┴────┐             │
                    │          │  ASBR   │             │
                    │          │(Router) │             │
                    │          └─────────┘             │
                    │          Redistribution           │
                    │      OSPF ←→ EIGRP ←→ BGP        │
                    └─────────────────────────────────┘
`}
                  </Diagram>

                  <Callout type="warning" title="Redistribution Risks">
                    <ul className="list-disc pl-5">
                      <li><span className="text-yellow-500">Routing loops:</span> Can occur without proper filtering</li>
                      <li><span className="text-yellow-500">Suboptimal routing:</span> May cause traffic to take longer paths</li>
                      <li><span className="text-yellow-500">Metric issues:</span> Different protocols need metric translation</li>
                      <li><span className="text-yellow-500">Convergence problems:</span> Can slow down network recovery</li>
                    </ul>
                  </Callout>
                </section>

                <section id="redistribution-metrics" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Seed Metrics</h3>

                  <p className="text-gray-300 mb-4">
                    When redistributing routes, you must provide a seed metric - the initial cost assigned to redistributed routes.
                    Each protocol expects specific metric values.
                  </p>

                  <Table
                    headers={["Destination Protocol", "Default Seed Metric", "Recommended Value"]}
                    rows={[
                      ["RIP", "Infinity (16) - must be set", "1-15 (e.g., 3)"],
                      ["OSPF", "20 for external (Type 2)", "20-200 (or Type 1 with metric)"],
                      ["EIGRP", "Infinity - must be set", "Bandwidth/Delay combination"],
                      ["BGP", "0 (MED)", "0-4294967295"],
                      ["IS-IS", "0", "10-63"]
                    ]}
                  />

                  <CodeBlock
                    title="Setting Seed Metrics"
                    language="bash"
                    code={`# OSPF redistribution with metric
router ospf 1
 redistribute eigrp 100 subnets metric 30 metric-type 1
 redistribute static subnets metric 50

# EIGRP redistribution with metric components
router eigrp 100
 redistribute ospf 1 metric 100000 10 255 1 1500
 ! Format: bandwidth (Kbps), delay (10s µs), reliability, load, MTU

# RIP redistribution
router rip
 redistribute static metric 3

# Default metric for all redistributions
router eigrp 100
 default-metric 10000 100 255 1 1500

# BGP redistribution
router bgp 65001
 redistribute ospf 1 metric 50`}
                  />
                </section>

                <section id="redistribution-filtering" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Filtering Redistributed Routes</h3>

                  <p className="text-gray-300 mb-4">
                    Always filter redistributed routes to prevent routing loops and maintain network stability.
                  </p>

                  <Grid>
                    <Card title="Route Maps" icon={Map}>
                      <p className="text-sm mb-2">Most flexible filtering method:</p>
                      <CodeBlock
                        language="bash"
                        code={`route-map REDIST-OSPF permit 10
 match ip address prefix-list INTERNAL
 set metric 30
 set metric-type type-1

route-map REDIST-OSPF deny 20
 match ip address prefix-list RFC1918

router ospf 1
 redistribute eigrp 100 subnets route-map REDIST-OSPF`}
                      />
                    </Card>
                    <Card title="Distribute Lists" icon={List}>
                      <p className="text-sm mb-2">Simple prefix filtering:</p>
                      <CodeBlock
                        language="bash"
                        code={`ip prefix-list INTERNAL seq 5 permit 10.0.0.0/8 le 24
ip prefix-list INTERNAL seq 10 permit 172.16.0.0/12 le 24

router eigrp 100
 distribute-list prefix INTERNAL in FastEthernet0/0
 distribute-list prefix INTERNAL out ospf 1`}
                      />
                    </Card>
                  </Grid>

                  <Diagram title="Redistribution Filtering Strategy">
                    {`
                    ┌─────────────────────────────────┐
                    │          Route Flow              │
                    ├─────────────────────────────────┤
                    │ OSPF ──┐                         │
                    │ EIGRP ─┼──► Filtering ──► BGP   │
                    │ Static─┘                         │
                    └─────────────────────────────────┘
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
            ┌─────────────────┐  ┌─────────────────┐
            │  Inbound Filter │  │ Outbound Filter │
            │  - Prevent loops│  │ - Policy control│
            │  - Security     │  │ - Traffic eng.  │
            │  - Stability    │  │ - Business rules│
            └─────────────────┘  └─────────────────┘
`}
                  </Diagram>
                </section>

                <section id="redistribution-examples" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Redistribution Examples</h3>

                  <Diagram title="Multi-Protocol Redistribution Topology">
                    {`
                    ┌─────────────────────────────────────┐
                    │              AS 65001                │
                    │                                       │
                    │  ┌─────────┐     ┌─────────┐       │
                    │  │   R1    │     │   R2    │       │
                    │  │  OSPF   │─────│  EIGRP  │       │
                    │  │ Area 0  │     │  AS 100 │       │
                    │  └─────────┘     └─────────┘       │
                    │       │               │            │
                    │       │   ┌─────┐     │            │
                    │       └───│ ASBR │────┘            │
                    │           │  R3  │                  │
                    │           └───────┘                  │
                    │        Redistribution Point          │
                    └─────────────────────────────────────┘
`}
                  </Diagram>

                  <Tabs>
                    <Tab label="OSPF to EIGRP Redistribution">
                      <CodeBlock
                        language="bash"
                        code={`! R3 Configuration - Redistributing OSPF into EIGRP
router eigrp 100
 ! Redistribute OSPF with metric components
 redistribute ospf 1 metric 10000 100 255 1 1500
 ! Default metric format: bandwidth (Kbps), delay (10s µs), reliability, load, MTU

 ! Optional: Filter redistributed routes
 distribute-list prefix OSPF-ROUTES out ospf 1

! Define which OSPF routes to redistribute
ip prefix-list OSPF-ROUTES seq 5 permit 10.0.0.0/8 le 24
ip prefix-list OSPF-ROUTES seq 10 permit 172.16.0.0/12 le 24
ip prefix-list OSPF-ROUTES seq 15 deny 0.0.0.0/0 le 32

! Verify redistributed routes
show ip route eigrp
show ip eigrp topology`}
                      />
                    </Tab>
                    <Tab label="EIGRP to OSPF Redistribution">
                      <CodeBlock
                        language="bash"
                        code={`! R3 Configuration - Redistributing EIGRP into OSPF
router ospf 1
 ! Redistribute EIGRP as external routes
 redistribute eigrp 100 subnets metric 30 metric-type 1
 ! metric-type 1 = internal + external cost
 ! metric-type 2 = external cost only (default)

 ! Redistribute connected networks
 redistribute connected subnets metric 20

 ! Set default metric for all redistributions
 default-metric 50

 ! Filter redistributed routes with route-map
 redistribute eigrp 100 subnets route-map EIGRP-TO-OSPF

! Route-map for filtering
route-map EIGRP-TO-OSPF permit 10
 match ip address prefix-list INTERNAL
 set metric 25
 set metric-type type-1

route-map EIGRP-TO-OSPF deny 20
 match ip address prefix-list RFC1918

! Prefix lists
ip prefix-list INTERNAL seq 5 permit 10.0.0.0/8 ge 16 le 24
ip prefix-list RFC1918 seq 5 permit 10.0.0.0/8
ip prefix-list RFC1918 seq 10 permit 172.16.0.0/12
ip prefix-list RFC1918 seq 15 permit 192.168.0.0/16

! Verify OSPF external routes
show ip route ospf
show ip ospf database external`}
                      />
                    </Tab>
                    <Tab label="Mutual Redistribution">
                      <CodeBlock
                        language="bash"
                        code={`! R3 Configuration - Mutual Redistribution with Loop Prevention
router ospf 1
 router-id 3.3.3.3
 redistribute eigrp 100 subnets route-map EIGRP-TO-OSPF
!
router eigrp 100
 redistribute ospf 1 metric 10000 100 255 1 1500 route-map OSPF-TO-EIGRP

! Route-maps to prevent redistribution loops
route-map EIGRP-TO-OSPF permit 10
 ! Tag routes coming from EIGRP
 set tag 100
 match ip address prefix-list INTERNAL

route-map OSPF-TO-EIGRP permit 10
 ! Only redistribute OSPF routes that don't have our tag
 match tag 0
 match ip address prefix-list INTERNAL
 set tag 1

! Prefix lists for internal networks
ip prefix-list INTERNAL seq 5 permit 10.1.0.0/16
ip prefix-list INTERNAL seq 10 permit 10.2.0.0/16
ip prefix-list INTERNAL seq 15 permit 172.16.1.0/24

! Verify tags
show ip route 10.1.0.0
Routing entry for 10.1.0.0/16
  Known via "ospf 1", distance 110, metric 20, tag 100
  Redistributing via eigrp 100`}
                      />
                    </Tab>
                  </Tabs>

                  <Callout type="tip" title="Redistribution Best Practices">
                    <ul className="list-disc pl-5">
                      <li><span className="text-green-500">Use route-maps</span> for granular control over redistributed routes</li>
                      <li><span className="text-green-500">Set administrative tags</span> to identify route sources and prevent loops</li>
                      <li><span className="text-green-500">Filter carefully</span> - only redistribute necessary routes</li>
                      <li><span className="text-green-500">Consider metric types</span> - Type 1 vs Type 2 external routes in OSPF</li>
                      <li><span className="text-green-500">Document redistribution points</span> - they're critical network junctions</li>
                      <li><span className="text-green-500">Test before production</span> - redistribution can cause unexpected behavior</li>
                    </ul>
                  </Callout>
                </section>
              </section>

              {/* IPv6 Routing */}
              <section id="ipv6-routing" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Satellite className="h-5 w-5" />
                  IPv6 Routing
                </h2>

                <section id="ipv6-routing-overview" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">IPv6 Routing Overview</h3>
                  <p className="text-gray-300 mb-4">
                    IPv6 routing shares many concepts with IPv4 but has important differences. The larger address space
                    simplifies subnetting, and protocols have been updated to support 128-bit addresses.
                  </p>

                  <Table
                    headers={["Aspect", "IPv4", "IPv6"]}
                    rows={[
                      ["Address Length", "32 bits", "128 bits"],
                      ["Address Representation", "Dotted decimal", "Hexadecimal (:: notation)"],
                      ["ARP", "ARP (broadcast)", "NDP (Neighbor Discovery Protocol)"],
                      ["Broadcast", "Yes", "No (uses multicast)"],
                      ["Fragment", "Routers can fragment", "Only hosts fragment (Path MTU Discovery)"],
                      ["Header", "Variable length with options", "Fixed length (40 bytes) with extension headers"],
                      ["Multicast", "IGMP", "MLD (Multicast Listener Discovery)"],
                      ["Auto-configuration", "DHCP", "SLAAC + DHCPv6"]
                    ]}
                  />

                  <Grid>
                    <Card title="IPv6 Address Types" icon={Network}>
                      <ul className="text-xs list-disc pl-4 space-y-1">
                        <li><span className="text-green-500">Unicast:</span> One-to-one communication</li>
                        <li><span className="text-green-500">Multicast:</span> One-to-many (replaces broadcast)</li>
                        <li><span className="text-green-500">Anycast:</span> One-to-nearest</li>
                        <li><span className="text-green-500">Link-Local:</span> fe80::/10 (required for operation)</li>
                        <li><span className="text-green-500">Unique Local:</span> fc00::/7 (private, like RFC1918)</li>
                        <li><span className="text-green-500">Global Unicast:</span> 2000::/3 (internet routable)</li>
                      </ul>
                    </Card>
                    <Card title="IPv6 Routing Protocols" icon={GitBranch}>
                      <ul className="text-xs list-disc pl-4 space-y-1">
                        <li><span className="text-green-500">RIPng:</span> Updated RIP for IPv6</li>
                        <li><span className="text-green-500">OSPFv3:</span> OSPF for IPv6</li>
                        <li><span className="text-green-500">EIGRPv6:</span> EIGRP for IPv6</li>
                        <li><span className="text-green-500">MP-BGP:</span> BGP with IPv6 support</li>
                        <li><span className="text-green-500">IS-IS:</span> Native IPv6 support</li>
                      </ul>
                    </Card>
                  </Grid>

                  <Diagram title="IPv6 Address Structure">
                    {`
    Global Unicast Address (2001:db8:1234:5678:90ab:cdef:1234:5678)
    ┌──────────────┬──────────┬──────────┬─────────────────────┐
    │   Global     │  Subnet  │  Interface ID (64 bits)       │
    │  Routing     │    ID    │  (Modified EUI-64 or random)  │
    │  Prefix      │  (16 bits)│                               │
    │  (48 bits)   │          │                               │
    └──────────────┴──────────┴───────────────────────────────┘

    Link-Local Address (fe80::1)
    ┌──────────────┬───────────────────────────────────────┐
    │   fe80::/10  │  Interface ID (usually EUI-64)        │
    │  (10 bits)   │  (remaining 118 bits)                 │
    └──────────────┴───────────────────────────────────────┘
`}
                  </Diagram>
                </section>

                <section id="ripng" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">RIPng (RIP Next Generation)</h3>

                  <p className="text-gray-300 mb-4">
                    RIPng is based on RIPv2 but updated for IPv6. It still uses hop count (max 15) and sends updates to multicast address FF02::9.
                  </p>

                  <CodeBlock
                    title="RIPng Configuration"
                    language="bash"
                    code={`! Enable IPv6 routing
ipv6 unicast-routing

! Configure interfaces
interface GigabitEthernet0/0
 ipv6 address 2001:db8:1::1/64
 ipv6 rip RIPNG enable
 no shutdown

interface GigabitEthernet0/1
 ipv6 address 2001:db8:2::1/64
 ipv6 rip RIPNG enable
 ipv6 rip RIPNG passive-interface  ! Don't send updates on LAN
 no shutdown

! Configure RIPng process
ipv6 router rip RIPNG
 ! Redistribute connected routes
 redistribute connected metric 2
 ! Set default metric for redistributed routes
 default-metric 3
 ! Distribute list filtering
 distribute-list prefix-list INTERNAL in

! Prefix list for filtering
ipv6 prefix-list INTERNAL seq 5 permit 2001:db8::/32

! Verification commands
show ipv6 route rip
show ipv6 rip database
show ipv6 protocols
debug ipv6 rip`}
                  />
                </section>

                <section id="ospfv3" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">OSPFv3</h3>

                  <p className="text-gray-300 mb-4">
                    OSPFv3 modifies OSPFv2 to support IPv6 while maintaining the same basic mechanisms. It runs per-link instead of per-subnet.
                  </p>

                  <Table
                    headers={["Feature", "OSPFv2", "OSPFv3"]}
                    rows={[
                      ["Address Family", "IPv4 only", "IPv6 only (can support IPv4 with extensions)"],
                      ["Router ID", "IPv4 address", "32-bit number (not an IPv6 address)"],
                      ["LSAs", "Include IPv4 addresses", "IPv6 addresses in payload"],
                      ["Authentication", "Simple or MD5", "IPsec"],
                      ["Multiple Instances", "No", "Yes (on single link)"],
                      ["Per-link", "No (per-subnet)", "Yes"]
                    ]}
                  />

                  <CodeBlock
                    title="OSPFv3 Configuration"
                    language="bash"
                    code={`! Enable IPv6 routing
ipv6 unicast-routing

! OSPFv3 process
ipv6 router ospf 1
 router-id 1.1.1.1
 ! Log adjacency changes
 log-adjacency-changes
 ! Auto-cost reference bandwidth (in Mbps)
 auto-cost reference-bandwidth 1000
 ! Graceful restart
 graceful-restart

! Interface configuration
interface GigabitEthernet0/0
 ipv6 address 2001:db8:1::1/64
 ipv6 ospf 1 area 0
 ipv6 ospf cost 10
 ipv6 ospf priority 100
 ipv6 ospf hello-interval 10
 ipv6 ospf dead-interval 40
 no shutdown

interface GigabitEthernet0/1
 ipv6 address 2001:db8:2::1/64
 ipv6 ospf 1 area 1
 ipv6 ospf network point-to-point
 ipv6 ospf authentication ipsec spi 256 md5 MySecretKey
 no shutdown

! Area configuration
ipv6 router ospf 1
 area 1 stub
 area 1 range 2001:db8:2::/64

! Redistribution
ipv6 router ospf 1
 redistribute static metric 20 metric-type 1
 redistribute rip RIPNG metric 30

! Verification
show ipv6 ospf neighbor
show ipv6 ospf database
show ipv6 route ospf
show ipv6 protocols`}
                  />
                </section>

                <section id="eigrpv6" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">EIGRP for IPv6</h3>

                  <p className="text-gray-300 mb-4">
                    EIGRP for IPv6 works similarly to EIGRP for IPv4 but with IPv6 addresses. It requires a router ID and runs on link-local addresses.
                  </p>

                  <CodeBlock
                    title="EIGRPv6 Configuration"
                    language="bash"
                    code={`! Enable IPv6 routing
ipv6 unicast-routing

! EIGRPv6 configuration
ipv6 router eigrp 100
 router-id 1.1.1.1
 ! No auto-summary (auto-summary not supported in IPv6)
 eigrp router-id 1.1.1.1
 ! Passive interfaces by default
 passive-interface default
 no passive-interface GigabitEthernet0/0
 ! Stub configuration for hub-and-spoke
 eigrp stub connected summary

! Interface configuration
interface GigabitEthernet0/0
 ipv6 address 2001:db8:1::1/64
 ipv6 eigrp 100
 ipv6 hello-interval eigrp 100 5
 ipv6 hold-time eigrp 100 15
 no shutdown

interface GigabitEthernet0/1
 ipv6 address 2001:db8:2::1/64
 ipv6 eigrp 100
 ipv6 summary-address eigrp 100 2001:db8:2::/64
 no shutdown

! Redistribution
ipv6 router eigrp 100
 redistribute static metric 10000 100 255 1 1500
 redistribute ospf 1 metric 10000 100 255 1 1500

! Verification
show ipv6 eigrp neighbors
show ipv6 eigrp topology
show ipv6 route eigrp
show ipv6 protocols`}
                  />
                </section>

                <section id="bgp4" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">MP-BGP for IPv6</h3>

                  <p className="text-gray-300 mb-4">
                    Multiprotocol BGP (MP-BGP) extends BGP-4 to support multiple address families, including IPv6. It's essential for IPv6 Internet connectivity.
                  </p>

                  <CodeBlock
                    title="MP-BGP for IPv6 Configuration"
                    language="bash"
                    code={`! Basic BGP configuration for IPv6
router bgp 65001
 bgp router-id 1.1.1.1
 ! Enable IPv6 unicast address family
 address-family ipv6
  ! eBGP neighbor using link-local address
  neighbor FE80::2%GigabitEthernet0/0 remote-as 100
  neighbor FE80::2%GigabitEthernet0/0 activate
  neighbor FE80::2%GigabitEthernet0/0 route-map FROM-ISP in

  ! iBGP neighbor using global address
  neighbor 2001:db8:3::2 remote-as 65001
  neighbor 2001:db8:3::2 activate
  neighbor 2001:db8:3::2 next-hop-self

  ! Network advertisements
  network 2001:db8:1::/64
  network 2001:db8:2::/64

  ! Aggregate address
  aggregate-address 2001:db8::/32 summary-only

  ! Default route injection
  default-information originate

  ! Route filtering
  neighbor FE80::2%GigabitEthernet0/0 prefix-list IPV6-IN in
  neighbor FE80::2%GigabitEthernet0/0 prefix-list IPV6-OUT out

! IPv4 unicast address family (separate)
 address-family ipv4
  neighbor 192.168.1.2 remote-as 200
  neighbor 192.168.1.2 activate

! Route-maps for policy
route-map FROM-ISP permit 10
 match ipv6 address prefix-list ISP-PREFIXES
 set local-preference 200

route-map FROM-ISP permit 20
 set local-preference 100

! IPv6 prefix lists
ipv6 prefix-list ISP-PREFIXES seq 5 permit 2001:db8:1000::/40
ipv6 prefix-list IPV6-IN seq 5 permit 2001:db8::/32 le 48
ipv6 prefix-list IPV6-OUT seq 5 permit 2001:db8::/32

! Verification
show bgp ipv6 unicast summary
show bgp ipv6 unicast 2001:db8:1::/64
show bgp ipv6 unicast neighbors
debug bgp ipv6 updates`}
                  />

                  <Callout type="tip" title="IPv6 BGP Considerations">
                    <ul className="list-disc pl-5">
                      <li>Use link-local addresses for eBGP peerings when possible</li>
                      <li>Consider using IPv6 prefix lists instead of access-lists</li>
                      <li>Remember to activate IPv6 address family separately</li>
                      <li>MP-BGP can carry both IPv4 and IPv6 in separate address families</li>
                    </ul>
                  </Callout>
                </section>
              </section>

              {/* Troubleshooting */}
              <section id="troubleshooting" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Troubleshooting
                </h2>

                <section id="common-issues" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Common Routing Issues</h3>

                  <Table
                    headers={["Issue", "Symptoms", "Common Causes", "Resolution"]}
                    rows={[
                      ["Routing Loop", "TTL expired in transit, high latency, CPU spikes", "Redistribution without filtering, missing route filters, network flapping", "Implement route tagging, split horizon, route poisoning"],
                      ["Black Hole", "Traffic disappears, no ICMP unreachable", "Missing route on some routers, static route pointing to null0, next-hop unreachable", "Verify routing tables, check next-hop reachability"],
                      ["Suboptimal Routing", "Higher latency than expected, traffic takes longer path", "Metric misconfiguration, missing summary routes, wrong redistribution", "Review metrics, implement summarization, check path selection"],
                      ["Route Flapping", "Routing table constantly changing, high CPU", "Unstable link, interface flapping, neighbor flapping", "Check physical layer, implement route dampening, stabilize interfaces"],
                      ["Convergence Delay", "Slow network recovery after failure", "Timer misconfiguration, large routing tables, slow SPF", "Tune timers, implement summarization, upgrade hardware"],
                      ["Asymmetric Routing", "Traffic takes different path each direction", "Policy routing, different IGP metrics, BGP path selection", "Verify policies, ensure consistent metrics, check stateful devices"]
                    ]}
                  />

                  <Diagram title="Routing Loop Example">
                    {`
                    ┌─────────┐         ┌─────────┐
                    │   R1    │◄────────│   R2    │
                    │10.0.0.1 │         │10.0.0.2 │
                    └────┬────┘         └────┬────┘
                         │                   │
                         │     ┌─────────┐   │
                         └────►│   R3    │◄──┘
                               │10.0.0.3 │
                               └─────────┘

Packet to 192.168.1.1:
R1: "I know 192.168.1.0/24 via R2"
R2: "I know 192.168.1.0/24 via R3"
R3: "I know 192.168.1.0/24 via R1"
→ Loop! (Packet circulates until TTL expires)`}
                  </Diagram>
                </section>

                <section id="verification-commands" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Essential Verification Commands</h3>

                  <Tabs>
                    <Tab label="Cisco IOS">
                      <CodeBlock
                        language="bash"
                        code={`# General verification
show ip interface brief
show ip route
show ip protocols
show running-config | section router

# Interface verification
show interfaces
show interfaces description
show interfaces status
show ip interface

# Neighbor verification
show ip ospf neighbor
show ip eigrp neighbors
show ip bgp summary
show ip rip database

# Route verification
show ip route connected
show ip route static
show ip route ospf
show ip route eigrp
show ip route bgp

# Protocol-specific
show ip ospf database
show ip eigrp topology
show ip bgp
show ip bgp neighbors 192.168.1.1 advertised-routes
show ip bgp neighbors 192.168.1.1 received-routes

# Troubleshooting
ping 192.168.1.1 source 10.0.0.1
traceroute 192.168.1.1
show logging
debug ip packet 100 (use with extreme caution!)`}
                      />
                    </Tab>
                    <Tab label="Linux">
                      <CodeBlock
                        language="bash"
                        code={`# General verification
ip addr show
ip route show
ss -tuln
netstat -rn

# Interface verification
ip link show
ethtool eth0
ifconfig eth0

# Neighbor discovery
ip neigh show
arp -n

# Route verification
ip route get 8.8.8.8
route -n
traceroute 8.8.8.8
mtr 8.8.8.8

# Protocol-specific (Quagga/FRR)
vtysh
 show ip route
 show ip ospf neighbor
 show ip bgp summary

# Troubleshooting
ping -c 4 192.168.1.1
tcpdump -i eth0 -n host 192.168.1.1
ss -tln
iptables -L -n -v

# System logs
journalctl -u networking.service
dmesg | tail -20
tail -f /var/log/syslog`}
                      />
                    </Tab>
                    <Tab label="Windows">
                      <CodeBlock
                        language="bash"
                        code={`# General verification
ipconfig /all
route print
netstat -rn

# Interface verification
netsh interface ip show config
netsh interface ip show interfaces
get-netadapter

# Neighbor discovery
arp -a
netsh int ipv6 show neighbors

# Route verification
tracert 8.8.8.8
pathping 8.8.8.8
netsh int ipv4 show route
netsh int ipv6 show route

# Connectivity testing
ping 8.8.8.8 -t
ping -n 100 192.168.1.1
Test-NetConnection 8.8.8.8 -port 80

# DNS verification
nslookup google.com
nslookup google.com 8.8.8.8

# Advanced troubleshooting
Get-NetRoute
Get-NetNeighbor
Get-NetAdapterStatistics
netsh trace start capture=yes
netsh trace stop`}
                      />
                    </Tab>
                  </Tabs>
                </section>

                <section id="debugging" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Debugging Routing Protocols</h3>

                  <Callout type="warning" title="Debug with Caution">
                    Debug commands can generate massive output and consume CPU. Use conditionally and only in maintenance windows.
                  </Callout>

                  <CodeBlock
                    title="Cisco IOS Debug Commands"
                    language="bash"
                    code={`# Limit debug output
debug condition interface FastEthernet0/0
debug condition ip 192.168.1.1

# OSPF debugging
debug ip ospf events
debug ip ospf adj
debug ip ospf packet
debug ip ospf lsa-generation
debug ip ospf spf

# EIGRP debugging
debug eigrp packets
debug eigrp neighbors
debug eigrp fsm
debug ip eigrp
debug ip eigrp notifications

# BGP debugging
debug ip bgp updates
debug ip bgp keepalives
debug ip bgp events
debug ip bgp dampening

# RIP debugging
debug ip rip
debug ip rip events
debug ip rip database

# General IP debugging
debug ip packet 100
debug ip icmp
debug arp

# Access-list for conditional debugging
access-list 100 permit icmp host 10.0.0.1 host 192.168.1.1
access-list 100 permit tcp host 10.0.0.1 host 192.168.1.1 eq 80

# Show debug state
show debug
undebug all  ! Turn off all debugging`}
                  />
                </section>

                <section id="routing-loops" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Routing Loops</h3>

                  <p className="text-gray-300 mb-4">
                    Routing loops occur when packets continuously circulate between routers. Several mechanisms prevent them:
                  </p>

                  <Table
                    headers={["Mechanism", "Description", "Protocols"]}
                    rows={[
                      ["Split Horizon", "Don't advertise routes back out the interface learned from", "RIP, EIGRP"],
                      ["Route Poisoning", "Advertise failed routes with infinite metric", "RIP, EIGRP"],
                      ["Hold-down Timers", "Ignore new route info for a period after failure", "RIP, IGRP"],
                      ["AS_PATH", "Track autonomous systems traversed", "BGP"],
                      ["DUAL", "Feasibility condition ensures loop-free paths", "EIGRP"],
                      ["SPF Algorithm", "Complete topology knowledge prevents loops", "OSPF, IS-IS"]
                    ]}
                  />

                  <Diagram title="Split Horizon Example">
                    {`
                    Without Split Horizon:
    R1 --- R2 --- R3
     |      |      |
     └──────┴──────┘

    R2 learns 10.0.0.0/24 from R1
    R2 advertises 10.0.0.0/24 back to R1 (loop risk)

    With Split Horizon:
    R2 learns 10.0.0.0/24 from R1
    R2 does NOT advertise 10.0.0.0/24 back to R1
    (No loop)
`}
                  </Diagram>

                  <CodeBlock
                    title="Route Poisoning Example (RIP)"
                    language="bash"
                    code={`Normal operation:
R2: "I can reach 10.0.0.0/24 with metric 1"
R3: "I can reach 10.0.0.0/24 with metric 2"

Link failure:
R2 detects 10.0.0.0/24 is down
R2 sends triggered update: "10.0.0.0/24 is metric 16 (unreachable)"

Neighbors update:
R3 marks route as possibly down and starts hold-down timer
R3 stops using route through R2
Prevents routing loop`}
                  />
                </section>

                <section id="black-holes" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Black Holes</h3>

                  <p className="text-gray-300 mb-4">
                    Black holes occur when packets are silently discarded without notification. Common causes include:
                  </p>

                  <Grid>
                    <Card title="Missing Routes" icon={XCircle}>
                      <p className="text-sm">Some routers don't have complete routing information.</p>
                      <CodeBlock
                        language="bash"
                        code={`# Check for missing routes
show ip route 10.0.0.0
% Network not in table

# Solution: Add static route or ensure IGP coverage
ip route 10.0.0.0 255.0.0.0 192.168.1.1`}
                      />
                    </Card>
                    <Card title="Next-Hop Unreachable" icon={AlertTriangle}>
                      <p className="text-sm">Route exists but next-hop is down.</p>
                      <CodeBlock
                        language="bash"
                        code={`# Verify next-hop
show ip route 10.0.0.0
Routing entry for 10.0.0.0/8
  Known via "static", distance 1
  * 192.168.1.1 (inaccessible)

# Check interface status
show ip interface brief`}
                      />
                    </Card>
                    <Card title="Null Routes" icon={Trash2}>
                      <p className="text-sm">Routes pointing to null0 for filtering or summarization.</p>
                      <CodeBlock
                        language="bash"
                        code={`# Intentional black hole for traffic to 10.0.0.0/8
ip route 10.0.0.0 255.0.0.0 null0

# Verify
show ip route 10.0.0.0
Routing entry for 10.0.0.0/8
  Known via "static", distance 1
  * directly connected to null0`}
                      />
                    </Card>
                    <Card title="ACL/Firewall" icon={Shield}>
                      <p className="text-sm">Packets dropped by security policies.</p>
                      <CodeBlock
                        language="bash"
                        code={`# Check ACL hits
show access-lists 100
show ip interface FastEthernet0/0
show firewall statistics`}
                      />
                    </Card>
                  </Grid>
                </section>
              </section>

              {/* Advanced Topics */}
              <section id="advanced-topics" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  Advanced Routing Topics
                </h2>

                <section id="mpls" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">MPLS (Multiprotocol Label Switching)</h3>

                  <p className="text-gray-300 mb-4">
                    MPLS uses labels instead of IP addresses for forwarding decisions, enabling traffic engineering, VPNs, and faster switching.
                  </p>

                  <Diagram title="MPLS Label Switching">
                    {`
                    IP Packet with MPLS Label
    ┌─────────────────────────────────────────────┐
    │  Layer 2  │  MPLS Label  │  IP Packet       │
    │  Header   │   (4 bytes)  │  (Original)      │
    └───────────┴──────────────┴──────────────────┘

    Label Structure:
    ┌──────────────┬─────┬─────┬─────────────┐
    │ Label (20b)  │ Exp │ BOS │   TTL (8b)  │
    │              │ (3b)│ (1b)│             │
    └──────────────┴─────┴─────┴─────────────┘

    MPLS Network:
    CE1 ── PE1 ──── P1 ──── P2 ──── PE2 ── CE2
          │        │       │       │
          Push     Swap    Swap    Pop
          Label    Label   Label   Label
`}
                  </Diagram>

                  <CodeBlock
                    title="Basic MPLS Configuration"
                    language="bash"
                    code={`! Enable MPLS on interfaces
interface FastEthernet0/0
 mpls ip
 mpls label protocol ldp
 no shutdown

! Configure LDP (Label Distribution Protocol)
mpls ldp router-id Loopback0 force
mpls ldp discovery hello interval 5
mpls ldp discovery targeted-hello accept

! MPLS LDP configuration
interface FastEthernet0/0
 mpls ldp discovery transport-address interface

! Verify MPLS
show mpls ldp neighbor
show mpls forwarding-table
show mpls interface
show mpls ldp discovery

! MPLS ping/traceroute
ping mpls ipv4 10.0.0.0/24
traceroute mpls ipv4 10.0.0.0/24`}
                  />
                </section>

                <section id="vrf" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">VRF (Virtual Routing and Forwarding)</h3>

                  <p className="text-gray-300 mb-4">
                    VRF allows multiple routing tables to coexist on the same router, providing network segmentation and supporting MPLS VPNs.
                  </p>

                  <CodeBlock
                    title="VRF Configuration"
                    language="bash"
                    code={`! Create VRFs
vrf definition CUSTOMER-A
 rd 65001:100
 route-target export 65001:100
 route-target import 65001:100
 !
 address-family ipv4
  export map EXPORT-CUSTOMER-A
  import map IMPORT-CUSTOMER-A

vrf definition CUSTOMER-B
 rd 65001:200
 route-target export 65001:200
 route-target import 65001:200
 !
 address-family ipv4

! Assign interfaces to VRFs
interface FastEthernet0/0.100
 encapsulation dot1q 100
 vrf forwarding CUSTOMER-A
 ip address 192.168.1.1 255.255.255.0

interface FastEthernet0/0.200
 encapsulation dot1q 200
 vrf forwarding CUSTOMER-B
 ip address 192.168.2.1 255.255.255.0

! Routing per VRF
router ospf 100 vrf CUSTOMER-A
 router-id 1.1.1.1
 network 192.168.1.0 0.0.0.255 area 0

router ospf 200 vrf CUSTOMER-B
 router-id 2.2.2.2
 network 192.168.2.0 0.0.0.255 area 0

! BGP with VRF
router bgp 65001
 address-family ipv4 vrf CUSTOMER-A
  neighbor 10.0.0.2 remote-as 65002
  neighbor 10.0.0.2 activate
  network 192.168.1.0 mask 255.255.255.0

! Verification
show ip route vrf CUSTOMER-A
show ip vrf interfaces
show ip protocols vrf CUSTOMER-A
show bgp vpnv4 unicast all`}
                  />
                </section>

                <section id="segment-routing" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Segment Routing</h3>

                  <p className="text-gray-300 mb-4">
                    Segment Routing (SR) combines source routing and MPLS, encoding paths as sequences of segments (labels) in the packet header.
                  </p>

                  <CodeBlock
                    title="Segment Routing Configuration"
                    language="bash"
                    code={`! Enable segment routing
segment-routing mpls
 !
 global-block 16000 23999
 !
 connected-prefix-sid-map
  address-family ipv4
   10.0.0.0/24 index 100 range 1

! Interface configuration
interface Loopback0
 ip address 10.0.0.1 255.255.255.255
 segment-routing mpls
  sid 101

! IGP with segment routing
router isis 1
 is-type level-2-only
 net 49.0001.0100.0000.0001.00
 segment-routing mpls
 metric-style wide
 !
 address-family ipv4
  segment-routing mpls
   prefix-sid-map advertise-local

! OSPF with segment routing
router ospf 1
 segment-routing mpls
 segment-routing forwarding mpls
 !
 area 0
  prefix-sid-map advertise-local

! Verification
show segment-routing mpls connected-prefix-sid-map
show segment-routing mpls forwarding
show isis segment-routing mpls prefix-sid
show ip route segment-routing`}
                  />
                </section>

                <section id="sdn" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">SDN and Routing</h3>

                  <p className="text-gray-300 mb-4">
                    Software-Defined Networking (SDN) separates the control plane from the data plane, enabling centralized routing decisions.
                  </p>

                  <Diagram title="SDN Architecture">
                    {`
                    ┌─────────────────────────────┐
                    │   SDN Controller (Central)  │
                    │   (OpenFlow, ODL, ONOS)    │
                    └──────────────┬──────────────┘
                         │          │          │
                    ┌────┴────┐┌────┴────┐┌────┴────┐
                    │ Switch 1││ Switch 2││ Switch 3│
                    │ (OpenFlow)│ (OpenFlow)│ (OpenFlow)│
                    └─────────┘└─────────┘└─────────┘

    Southbound APIs (OpenFlow, NETCONF, OVSDB)
    Northbound APIs (REST, RESTCONF, gRPC)`}
                  </Diagram>

                  <CodeBlock
                    title="OpenFlow Configuration Example"
                    language="bash"
                    code={`! Open vSwitch configuration
# Create bridge
ovs-vsctl add-br br0

# Add ports
ovs-vsctl add-port br0 eth0
ovs-vsctl add-port br0 eth1

# Set OpenFlow version
ovs-vsctl set bridge br0 protocols=OpenFlow13

# Connect to SDN controller
ovs-vsctl set-controller br0 tcp:192.168.1.100:6633

# View OpenFlow status
ovs-ofctl show br0
ovs-ofctl dump-flows br0

# Add static flow (like static route)
ovs-ofctl add-flow br0 "priority=100,ip,nw_dst=10.0.0.0/24,actions=output:1"

# FRRouting with SDN integration
vtysh
 configure terminal
  router ospf
   sdn
   segment-routing`}
                  />
                </section>

                <section id="virtual-routers" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Virtual Routers</h3>

                  <p className="text-gray-300 mb-4">
                    Virtual routers run as software on standard servers, providing routing functionality in virtualized and cloud environments.
                  </p>

                  <Table
                    headers={["Virtual Router", "Type", "Use Case"]}
                    rows={[
                      ["FRRouting (FRR)", "Open Source", "Linux routing suite (OSPF, BGP, etc.)"],
                      ["VyOS", "Open Source", "Complete router OS"],
                      ["Cisco CSR 1000v", "Commercial", "Cloud and virtualization"],
                      ["Juniper vMX", "Commercial", "Virtual MX router"],
                      ["pfSense/OPNsense", "Open Source", "Firewall and routing"],
                      ["Bird", "Open Source", "Unix routing daemon"]
                    ]}
                  />

                  <CodeBlock
                    title="FRRouting Configuration"
                    language="bash"
                    code={`# Install FRR
apt-get install frr frr-pythontools

# Enable routing protocols
sed -i 's/ospfd=no/ospfd=yes/' /etc/frr/daemons
sed -i 's/bgpd=no/bgpd=yes/' /etc/frr/daemons
systemctl restart frr

# Configure FRR (vtysh)
vtysh

! Enter configuration mode
configure terminal
 hostname Virtual-Router
 username admin privilege 15 password secret

! Configure interfaces
interface eth0
 ip address 192.168.1.1/24
 no shutdown

interface eth1
 ip address 10.0.0.1/24
 no shutdown

! OSPF configuration
router ospf
 router-id 1.1.1.1
 network 192.168.1.0/24 area 0
 network 10.0.0.0/24 area 0
 passive-interface eth0

! BGP configuration
router bgp 65001
 bgp router-id 1.1.1.1
 neighbor 10.0.0.2 remote-as 65002
 neighbor 10.0.0.2 description ISP-Connection
 !
 address-family ipv4
  neighbor 10.0.0.2 activate
  network 192.168.1.0/24

! Static route
ip route 0.0.0.0/0 10.0.0.254

! Verification
show ip route
show ip ospf neighbor
show ip bgp summary
show running-config

! Save configuration
write memory`}
                  />
                </section>
              </section>

              {/* Resources */}
              <section id="resources" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Resources</h2>

                <section id="books" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Recommended Books</h3>

                  <Grid>
                    <Card title="CCNA Official Cert Guide" icon={BookOpen}>
                      <p className="text-sm">Odom, Wendell - Comprehensive CCNA coverage including routing fundamentals.</p>
                    </Card>
                    <Card title="Routing TCP/IP (Vol 1 & 2)" icon={BookText}>
                      <p className="text-sm">Doyle, Jeff & Carroll, Jennifer - The definitive routing reference.</p>
                    </Card>
                    <Card title="Internet Routing Architectures" icon={Globe}>
                      <p className="text-sm">Halabi, Sam - BGP and Internet routing deep dive.</p>
                    </Card>
                    <Card title="OSPF and IS-IS" icon={GitFork}>
                      <p className="text-sm">Moy, John - From the creator of OSPF.</p>
                    </Card>
                    <Card title="BGP Design and Implementation" icon={Workflow}>
                      <p className="text-sm">Zhang, Randy - Practical BGP deployment.</p>
                    </Card>
                    <Card title="MPLS Fundamentals" icon={Layers}>
                      <p className="text-sm">De Ghein, Luc - Complete MPLS coverage.</p>
                    </Card>
                  </Grid>
                </section>

                <section id="videos" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Video Tutorials</h3>

                  <Table
                    headers={["Course", "Platform", "Focus"]}
                    rows={[
                      ["CBT Nuggets - CCNA Routing & Switching", "CBT Nuggets", "Complete CCNA curriculum"],
                      ["INE - Routing & Switching", "INE", "Advanced routing concepts"],
                      ["David Bombal - GNS3 Courses", "Udemy", "Practical routing labs"],
                      ["Pluralsight - Network Routing", "Pluralsight", "Routing fundamentals"],
                      ["YouTube - Keith Barker", "YouTube", "Free routing tutorials"],
                      ["YouTube - NetworkChuck", "YouTube", "Beginner-friendly networking"]
                    ]}
                  />
                </section>

                <section id="labs" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Practice Labs</h3>

                  <Grid>
                    <Card title="GNS3" icon={Network}>
                      <p className="text-sm">Graphical Network Simulator - Run real router images.</p>
                      <a href="#" className="text-green-500 text-xs hover:underline">gns3.com</a>
                    </Card>
                    <Card title="EVE-NG" icon={Cloud}>
                      <p className="text-sm">Emulated Virtual Environment - Professional lab platform.</p>
                      <a href="#" className="text-green-500 text-xs hover:underline">eve-ng.net</a>
                    </Card>
                    <Card title="Packet Tracer" icon={Router}>
                      <p className="text-sm">Cisco's official simulator - Great for beginners.</p>
                      <a href="#" className="text-green-500 text-xs hover:underline">netacad.com</a>
                    </Card>
                    <Card title="VIRL" icon={Server}>
                      <p className="text-sm">Cisco Virtual Internet Routing Lab - Official Cisco.</p>
                      <a href="#" className="text-green-500 text-xs hover:underline">virl.cisco.com</a>
                    </Card>
                    <Card title="FRRouting" icon={Code2}>
                      <p className="text-sm">Free routing suite for Linux - Real-world practice.</p>
                      <a href="#" className="text-green-500 text-xs hover:underline">frrouting.org</a>
                    </Card>
                    <Card title="Bird" icon={GitBranch}>
                      <p className="text-sm">BIRD Internet Routing Daemon - Lightweight practice.</p>
                      <a href="#" className="text-green-500 text-xs hover:underline">bird.network.cz</a>
                    </Card>
                  </Grid>
                </section>

                <section id="certification" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Certification Paths</h3>

                  <Table
                    headers={["Certification", "Provider", "Routing Focus"]}
                    rows={[
                      ["CCNA (200-301)", "Cisco", "RIP, OSPF, EIGRP, BGP basics"],
                      ["CCNP Enterprise (350-401 ENCOR)", "Cisco", "Advanced OSPF, EIGRP, BGP"],
                      ["CCIE Enterprise Infrastructure", "Cisco", "Expert-level routing"],
                      ["JNCIA-Junos", "Juniper", "Junos routing basics"],
                      ["JNCIP-SP", "Juniper", "Advanced service provider routing"],
                      ["JNCIE-SP", "Juniper", "Expert SP routing"],
                      ["Network+", "CompTIA", "Routing fundamentals"],
                      ["HP ASE", "HP", "HP/Aruba routing"],
                      ["CMMC", "Various", "Network security integration"]
                    ]}
                  />

                  <Callout type="tip" title="Learning Path">
                    <ol className="list-decimal pl-5">
                      <li>Start with Network+ or CCNA basics</li>
                      <li>Practice with Packet Tracer or GNS3</li>
                      <li>Master static and default routing</li>
                      <li>Learn one IGP thoroughly (OSPF recommended)</li>
                      <li>Understand redistribution</li>
                      <li>Study BGP for internet routing</li>
                      <li>Explore advanced topics (MPLS, SDN)</li>
                      <li>Pursue certification aligned with your goals</li>
                    </ol>
                  </Callout>
                </section>
              </section>

              {/* Conclusion */}
              <section id="conclusion" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Conclusion</h2>

                <div className="bg-gray-800/50 border border-gray-800 rounded-lg p-8">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Routing is the backbone of modern networking, enabling communication across local networks and the global Internet.
                    From simple static routes to complex BGP policies, understanding routing protocols and concepts is essential for any
                    network professional.
                  </p>

                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><span className="text-green-500">Static routing</span> is simple and secure for small networks</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><span className="text-green-500">Dynamic protocols</span> (OSPF, EIGRP) enable scalability and automation</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><span className="text-green-500">BGP</span> powers the Internet with policy-based routing</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><span className="text-green-500">IPv6</span> brings larger address space and simpler subnetting</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><span className="text-green-500">Advanced technologies</span> like MPLS and SDN continue to evolve routing</span>
                    </li>
                  </ul>

                  <p className="text-gray-300 leading-relaxed mb-4">
                    Remember: routing is about more than just moving packets—it's about implementing business policies,
                    ensuring security, optimizing performance, and building resilient networks. Practice with lab environments,
                    stay current with evolving technologies, and never stop learning.
                  </p>

                  <div className="flex flex-wrap gap-4 mt-6">
                    <Link
                      href="/resources/networking/subnetting"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 hover:bg-green-500/20 transition-colors"
                    >
                      <Binary className="h-4 w-4" />
                      <span>Subnetting Guide</span>
                    </Link>

                    <Link
                      href="/resources/networking/osi-model"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-lg text-gray-300 hover:text-green-500 hover:border-green-500/20 transition-colors"
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
                      <span>Practice Routing</span>
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
                    <span>Routing Tips</span>
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
                      placeholder="Filter tips..."
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
                    Routing Quick Reference
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li className="flex justify-between">
                      <span>Longest match always wins</span>
                      <span className="font-mono text-green-500">✓</span>
                    </li>
                    <li className="flex justify-between">
                      <span>AD: OSPF 110, EIGRP 90</span>
                      <span className="font-mono text-green-500">✓</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Default route: 0.0.0.0/0</span>
                      <span className="font-mono text-green-500">✓</span>
                    </li>
                    <li className="flex justify-between">
                      <span>BGP uses TCP port 179</span>
                      <span className="font-mono text-green-500">✓</span>
                    </li>
                    <li className="flex justify-between">
                      <span>OSPF area 0 = backbone</span>
                      <span className="font-mono text-green-500">✓</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Last updated: March 2024
                    <br />
                    Master routing with practice labs
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
