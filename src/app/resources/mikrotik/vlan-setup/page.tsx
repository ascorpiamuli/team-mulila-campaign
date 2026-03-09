"use client";
// src/app/resources/mikrotik/vlan-management/page.tsx
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
  EthernetPort
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
    title: "Introduction to VLANs",
    icon: BookOpen,
    subsections: [
      { id: "what-are-vlans", title: "What are VLANs?" },
      { id: "why-vlans", title: "Why Use VLANs?" },
      { id: "vlan-concepts", title: "VLAN Concepts" },
      { id: "vlan-types", title: "VLAN Types in RouterOS" }
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
    id: "vlan-fundamentals",
    title: "VLAN Fundamentals",
    icon: Layers,
    subsections: [
      { id: "8021q", title: "802.1Q Tagging" },
      { id: "access-trunk", title: "Access vs Trunk Ports" },
      { id: "vlan-membership", title: "VLAN Membership" },
      { id: "vlan-ranges", title: "VLAN ID Ranges" }
    ]
  },
  {
    id: "bridge-config",
    title: "Bridge Configuration",
    icon: GitMerge,
    subsections: [
      { id: "create-bridge", title: "Creating Bridges" },
      { id: "bridge-settings", title: "Bridge Settings" },
      { id: "vlan-filtering", title: "VLAN Filtering" },
      { id: "bridge-vlan-table", title: "Bridge VLAN Table" }
    ]
  },
  {
    id: "vlan-interfaces",
    title: "VLAN Interfaces",
    icon: EthernetPort,
    subsections: [
      { id: "create-vlan", title: "Creating VLAN Interfaces" },
      { id: "vlan-settings", title: "VLAN Interface Settings" },
      { id: "vlan-on-bridge", title: "VLAN on Bridge" },
      { id: "vlan-on-physical", title: "VLAN on Physical Interface" }
    ]
  },
  {
    id: "vlan-routing",
    title: "VLAN Routing",
    icon: GitBranch,
    subsections: [
      { id: "inter-vlan-routing", title: "Inter-VLAN Routing" },
      { id: "router-on-stick", title: "Router-on-a-Stick" },
      { id: "layer3-switching", title: "Layer 3 Switching" },
      { id: "vlan-interfaces-ip", title: "IP Configuration" }
    ]
  },
  {
    id: "vlan-security",
    title: "VLAN Security",
    icon: Shield,
    subsections: [
      { id: "vlan-isolation", title: "VLAN Isolation" },
      { id: "private-vlans", title: "Private VLANs" },
      { id: "vlan-firewall", title: "Firewall Rules for VLANs" },
      { id: "vlan-access-control", title: "Access Control Lists" }
    ]
  },
  {
    id: "vlan-trunking",
    title: "VLAN Trunking",
    icon: Share2,
    subsections: [
      { id: "trunk-ports", title: "Configuring Trunk Ports" },
      { id: "native-vlan", title: "Native VLAN" },
      { id: "allowed-vlans", title: "Allowed VLANs" },
      { id: "vlan-tagging", title: "Tagging Strategies" }
    ]
  },
  {
    id: "dhcp-vlans",
    title: "DHCP for VLANs",
    icon: RadioTower,
    subsections: [
      { id: "dhcp-server-per-vlan", title: "DHCP Server per VLAN" },
      { id: "dhcp-relay", title: "DHCP Relay" },
      { id: "dhcp-options", title: "DHCP Options" },
      { id: "dhcp-snooping", title: "DHCP Snooping" }
    ]
  },
  {
    id: "advanced-vlans",
    title: "Advanced VLAN Configurations",
    icon: Workflow,
    subsections: [
      { id: "qinq", title: "Q-in-Q (VLAN Stacking)" },
      { id: "vlan-mapping", title: "VLAN Mapping" },
      { id: "vlan-translation", title: "VLAN Translation" },
      { id: "vlan-bonding", title: "VLAN Bonding" }
    ]
  },
  {
    id: "vlan-management",
    title: "VLAN Management",
    icon: Settings,
    subsections: [
      { id: "vlan-monitoring", title: "Monitoring VLANs" },
      { id: "vlan-troubleshooting", title: "Troubleshooting" },
      { id: "vlan-backup", title: "Backup & Restore" },
      { id: "vlan-best-practices", title: "Best Practices" }
    ]
  },
  {
    id: "examples",
    title: "Real-World Examples",
    icon: GitBranch,
    subsections: [
      { id: "small-office", title: "Small Office Setup" },
      { id: "enterprise", title: "Enterprise Network" },
      { id: "isp-config", title: "ISP Configuration" },
      { id: "guest-network", title: "Guest Network with VLANs" },
      { id: "voip-vlan", title: "VoIP VLAN Setup" }
    ]
  },
  {
    id: "automation",
    title: "VLAN Automation",
    icon: Code2,
    subsections: [
      { id: "api-vlan", title: "VLANs via API" },
      { id: "ansible", title: "Ansible for VLANs" },
      { id: "python-vlan", title: "Python Scripts" },
      { id: "bash-vlan", title: "Bash Scripts" }
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
    id: "virtual-lab",
    title: "💻 Practice in Virtual Lab",
    description: "Use CHR in VirtualBox to practice VLAN configurations without physical hardware.",
    category: "tip",
    icon: Server
  },
  {
    id: "vlan-limits",
    title: "📊 VLAN ID Limits",
    description: "RouterOS supports 4094 VLANs (1-4094). IDs 0 and 4095 are reserved.",
    category: "note",
    icon: Database
  },
  {
    id: "bridge-vlan-filter",
    title: "🔧 Bridge VLAN Filtering",
    description: "Enable VLAN filtering on bridges for proper VLAN isolation and tagging.",
    category: "best-practice",
    icon: GitMerge
  },
  {
    id: "native-vlan-risk",
    title: "⚠️ Native VLAN Security",
    description: "Change native VLAN from default 1 to prevent VLAN hopping attacks.",
    category: "warning",
    icon: ShieldAlert
  },
  {
    id: "vlan-planning",
    title: "📝 Plan Before Implementation",
    description: "Create a VLAN matrix before configuring to avoid conflicts.",
    category: "best-practice",
    icon: BookOpen
  },
  {
    id: "vlan-interfaces",
    title: "🎯 VLAN Interfaces",
    description: "VLAN interfaces appear as separate network interfaces in RouterOS.",
    category: "tip",
    icon: EthernetPort
  },
  {
    id: "mtu-consideration",
    title: "📦 MTU Considerations",
    description: "VLAN tagging adds 4 bytes. Set MTU to 1500 or 1504 accordingly.",
    category: "note",
    icon: HardDrive
  },
  {
    id: "vlan-trunk-security",
    title: "🔒 Trunk Port Security",
    description: "Limit allowed VLANs on trunk ports to only necessary ones.",
    category: "best-practice",
    icon: Lock
  },
  {
    id: "inter-vlan-routing",
    title: "🌐 Inter-VLAN Routing",
    description: "Use firewall rules to control traffic between VLANs.",
    category: "tip",
    icon: GitBranch
  },
  {
    id: "vlan-monitoring",
    title: "📊 Monitor VLAN Traffic",
    description: "Use /interface vlan monitor-traffic to watch VLAN usage.",
    category: "tip",
    icon: Activity
  },
  {
    id: "vlan-hopping",
    title: "⚠️ VLAN Hopping Prevention",
    description: "Disable auto-negotiation on trunk ports and use dedicated VLANs.",
    category: "warning",
    icon: ShieldBan
  },
  {
    id: "vlan-stp",
    title: "🌲 STP with VLANs",
    description: "Enable RSTP/MSTP per VLAN for better loop protection.",
    category: "best-practice",
    icon: Workflow
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
        <h3 className="font-mono text-lg font-semibold text-green-500 mb-2">Practice VLANs in Virtual Lab 🎯</h3>
        <p className="text-gray-300 mb-4">
          Use MikroTik CHR in VirtualBox to create complex VLAN setups without physical hardware:
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-300">Multiple VLANs</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-300">Trunk Ports</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-300">Inter-VLAN Routing</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-300">VLAN Hopping Tests</span>
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

export default function MikroTikVlanManagementPage() {
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
              <span className="text-green-500 truncate">VLAN Management</span>
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
                    <span>VLAN Range: 1-4094 (0 & 4095 reserved)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Default VLAN: 1 (native)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>MTU: 1500 (1504 with tagging)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Max VLANs: 4094</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Protocol: IEEE 802.1Q</span>
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
                  Introduction to VLANs
                </h2>

                <section id="what-are-vlans" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">What are VLANs?</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Virtual Local Area Networks (VLANs) are a logical segmentation of a physical network. They allow you to
                    partition a single physical network into multiple broadcast domains, improving security, performance,
                    and manageability. In MikroTik RouterOS, VLANs are implemented using IEEE 802.1Q tagging.
                  </p>

                  <Diagram title="VLAN Concept Diagram">
                    {`┌─────────────────────────────────────────────────────────────┐
│                         Router                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   VLAN 10    │  │   VLAN 20    │  │   VLAN 30    │  │
│  │  Marketing   │  │  Engineering │  │     Guest    │  │
│  │ 192.168.10.0 │  │ 192.168.20.0 │  │ 192.168.30.0 │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                 │                  │          │
│         └─────────────────┼──────────────────┘          │
│                           │                             │
│                    ┌──────┴──────┐                      │
│                    │   Trunk     │                      │
│                    │   Port      │                      │
│                    └──────┬──────┘                      │
└───────────────────────────┼─────────────────────────────┘
                            │
                    ┌───────┴───────┐
                    │    Switch     │
        ┌───────────┼───────────────┼───────────┐
        │           │               │           │
   ┌────┴────┐ ┌────┴────┐     ┌────┴────┐ ┌────┴────┐
   │ Access  │ │ Access  │     │ Access  │ │ Access  │
   │ VLAN 10 │ │ VLAN 20 │     │ VLAN 30 │ │ VLAN 10 │
   │  Port   │ │  Port   │     │  Port   │ │  Port   │
   └─────────┘ └─────────┘     └─────────┘ └─────────┘`}
                  </Diagram>
                </section>

                <section id="why-vlans" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Why Use VLANs?</h3>
                  <Grid>
                    <Card title="Security" icon={Shield}>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Isolate sensitive traffic</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Separate guest networks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Prevent unauthorized access</span>
                        </li>
                      </ul>
                    </Card>

                    <Card title="Performance" icon={Gauge}>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Reduce broadcast domains</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Optimize traffic flow</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Better bandwidth management</span>
                        </li>
                      </ul>
                    </Card>

                    <Card title="Management" icon={Settings}>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Simplified network changes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Logical grouping of users</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Easier troubleshooting</span>
                        </li>
                      </ul>
                    </Card>
                  </Grid>
                </section>

                <section id="vlan-concepts" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">VLAN Concepts</h3>

                  <Table
                    headers={["Concept", "Description", "MikroTik Implementation"]}
                    rows={[
                      ["802.1Q Tagging", "Adds 4-byte tag to Ethernet frames", "VLAN interfaces with vlan-id"],
                      ["Access Port", "Port assigned to single VLAN", "Bridge port with pvid"],
                      ["Trunk Port", "Port carrying multiple VLANs", "Bridge port with vlan-mode=tagged"],
                      ["Native VLAN", "Untagged VLAN on trunk", "Bridge port with vlan-mode=untagged"],
                      ["PVID", "Port VLAN ID for untagged traffic", "Bridge port pvid setting"],
                      ["VLAN ID", "12-bit identifier (1-4094)", "vlan-id parameter"]
                    ]}
                  />

                  <Callout type="info" title="VLAN ID Ranges">
                    <p>VLAN IDs are divided into ranges:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li><span className="text-green-500">1-1005</span> - Normal range (standard VLANs)</li>
                      <li><span className="text-green-500">1006-4094</span> - Extended range (for special purposes)</li>
                      <li><span className="text-yellow-500">0</span> - Reserved (priority tagging only)</li>
                      <li><span className="text-yellow-500">4095</span> - Reserved (implementation use)</li>
                    </ul>
                  </Callout>
                </section>

                <section id="vlan-types" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">VLAN Types in RouterOS</h3>

                  <Grid>
                    <Card title="Port-Based VLAN" icon={EthernetPort}>
                      <p className="text-sm">VLAN assignment based on physical port</p>
                      <ul className="mt-2 text-xs space-y-1">
                        <li>• Simple to configure</li>
                        <li>• Static assignment</li>
                        <li>• Most common in small networks</li>
                      </ul>
                    </Card>

                    <Card title="Tagged VLAN" icon={Tag}>
                      <p className="text-sm">VLAN ID in frame header</p>
                      <ul className="mt-2 text-xs space-y-1">
                        <li>• Uses 802.1Q tagging</li>
                        <li>• Multiple VLANs per port</li>
                        <li>• Trunk ports use tagging</li>
                      </ul>
                    </Card>

                    <Card title="Protocol-Based VLAN" icon={RadioTower}>
                      <p className="text-sm">VLAN based on protocol type</p>
                      <ul className="mt-2 text-xs space-y-1">
                        <li>• IP, IPX, AppleTalk</li>
                        <li>• Advanced configuration</li>
                        <li>• Less common in RouterOS</li>
                      </ul>
                    </Card>
                  </Grid>
                </section>

                <Callout type="tip" title="Virtual Lab Practice">
                  All examples in this guide can be tested using MikroTik CHR in VirtualBox.
                  Download the CHR image and follow the virtual lab setup instructions.
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
                      <li>• MikroTik router with at least 3 Ethernet ports</li>
                      <li>• Managed switch (for advanced configurations)</li>
                      <li>• VLAN-capable network cards</li>
                      <li>• Sufficient RAM for VLAN table (min 64MB)</li>
                    </ul>
                  </Card>

                  <Card title="Software" icon={Terminal}>
                    <ul className="space-y-1 text-sm">
                      <li>• RouterOS v6.0+ (v7 recommended for bridge VLAN filtering)</li>
                      <li>• WinBox for GUI configuration</li>
                      <li>• SSH client for CLI access</li>
                      <li>• CHR for virtual lab (if no hardware)</li>
                    </ul>
                  </Card>

                  <Card title="Knowledge" icon={GraduationCap}>
                    <ul className="space-y-1 text-sm">
                      <li>• Basic networking concepts</li>
                      <li>• IP addressing and subnetting</li>
                      <li>• RouterOS CLI familiarity</li>
                      <li>• Bridge concepts in RouterOS</li>
                    </ul>
                  </Card>
                </Grid>

                <VirtualLabCard />
              </section>

              {/* Virtual Lab Setup */}
              <section id="virtual-lab-setup" className="mb-12 scroll-mt-20">
                <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Setting Up VLAN Lab in CHR</h3>

                <Step number={1} title="Install CHR in VirtualBox">
                  <CodeBlock
                    title="Create Virtual Machine"
                    language="bash"
                    code={`# Create VM with multiple network adapters
VBoxManage createvm --name "MikroTik-VLAN-Lab" --ostype "Linux_64" --register

# Configure VM
VBoxManage modifyvm "MikroTik-VLAN-Lab" --memory 512 --cpus 2
VBoxManage modifyvm "MikroTik-VLAN-Lab" --nic1 intnet
VBoxManage modifyvm "MikroTik-VLAN-Lab" --nic2 intnet
VBoxManage modifyvm "MikroTik-VLAN-Lab" --nic3 intnet
VBoxManage modifyvm "MikroTik-VLAN-Lab" --nic4 intnet

# Create internal networks for VLAN testing
VBoxManage modifyvm "MikroTik-VLAN-Lab" --intnet1 "vlan-lab"
VBoxManage modifyvm "MikroTik-VLAN-Lab" --intnet2 "vlan-trunk"
VBoxManage modifyvm "MikroTik-VLAN-Lab" --intnet3 "vlan-access1"
VBoxManage modifyvm "MikroTik-VLAN-Lab" --intnet4 "vlan-access2"`}
                  />
                </Step>

                <Step number={2} title="Basic CHR Configuration">
                  <CodeBlock
                    language="bash"
                    code={`# Login and set password
[admin@MikroTik] > /password
old-password:
new-password: your-secure-password

# Check interfaces
[admin@MikroTik] > /interface print
Flags: D - dynamic, X - disabled, R - running, S - slave
 #     NAME        TYPE       ACTUAL-MTU L2MTU  MAC-ADDRESS
 0  R  ether1      ether          1500  1598   08:00:27:xx:xx:xx
 1  R  ether2      ether          1500  1598   08:00:27:xx:xx:xx
 2  R  ether3      ether          1500  1598   08:00:27:xx:xx:xx
 3  R  ether4      ether          1500  1598   08:00:27:xx:xx:xx`}
                  />
                </Step>
              </section>

              {/* VLAN Fundamentals */}
              <section id="vlan-fundamentals" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">VLAN Fundamentals</h2>

                <section id="8021q" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">802.1Q Tagging</h3>

                  <p className="text-gray-300 mb-4">
                    IEEE 802.1Q adds a 4-byte tag to the Ethernet frame to identify VLAN membership:
                  </p>

                  <Diagram title="802.1Q Frame Structure">
                    {`Standard Ethernet Frame:
┌─────────┬─────────┬──────────┬──────────┬──────────┐
│ Dest MAC│ Src MAC │   Type   │  Payload │   FCS    │
│  (6B)   │  (6B)   │   (2B)   │  (46-1500B)│  (4B)   │
└─────────┴─────────┴──────────┴──────────┴──────────┘

802.1Q Tagged Frame:
┌─────────┬─────────┬──────┬──────────┬──────────┬──────────┐
│ Dest MAC│ Src MAC │Tag[4]│   Type   │  Payload │   FCS    │
│  (6B)   │  (6B)   │ 802.1Q│   (2B)   │(42-1496B)│  (4B)   │
└─────────┴─────────┴──────┴──────────┴──────────┴──────────┘

802.1Q Tag Details:
┌──────────────┬─────────────┬──────────────┬─────────────┐
│ TPID (16 bits)│ Priority(3) │ CFI(1)       │ VID (12 bits)│
│ 0x8100        │ 0-7         │ 0/1          │ 1-4094      │
└──────────────┴─────────────┴──────────────┴─────────────┘`}
                  </Diagram>

                  <CodeBlock
                    title="View VLAN Tags with Torch Tool"
                    language="bash"
                    code={`# Use torch tool to see VLAN tags
/tool torch interface=ether1 port=any

# Output will show:
# VLAN-ID: 10, 20, 30
# Priority: 0
# Protocol: 802.1Q`}
                  />
                </section>

                <section id="access-trunk" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Access vs Trunk Ports</h3>

                  <Table
                    headers={["Port Type", "Description", "VLAN Handling", "MikroTik Configuration"]}
                    rows={[
                      ["Access Port", "Single VLAN, untagged traffic", "Assigns PVID, strips tags on egress", "bridge port with pvid set"],
                      ["Trunk Port", "Multiple VLANs, tagged traffic", "Preserves VLAN tags", "bridge port with vlan-mode=tagged"],
                      ["Hybrid Port", "Mix of tagged/untagged", "Specific VLANs tagged, native untagged", "bridge port with multiple vlan-mode"]
                    ]}
                  />

                  <CodeBlock
                    title="Access Port Configuration"
                    language="bash"
                    code={`# Configure ether2 as access port for VLAN 10
/interface bridge port
add bridge=bridge1 interface=ether2 pvid=10

# Configure ether3 as access port for VLAN 20
add bridge=bridge1 interface=ether3 pvid=20

# Configure ether4 as trunk port
add bridge=bridge1 interface=ether4`}
                  />
                </section>
              </section>

              {/* Bridge Configuration */}
              <section id="bridge-config" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Bridge Configuration</h2>

                <section id="create-bridge" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Creating Bridges</h3>

                  <CodeBlock
                    title="Create Bridge with VLAN Filtering"
                    language="bash"
                    code={`# Create bridge with VLAN filtering enabled
/interface bridge
add name=bridge1 vlan-filtering=yes protocol-mode=rstp

# Add ports to bridge
/interface bridge port
add bridge=bridge1 interface=ether1
add bridge=bridge1 interface=ether2
add bridge=bridge1 interface=ether3
add bridge=bridge1 interface=ether4

# Verify bridge configuration
/interface bridge print
/interface bridge port print`}
                  />
                </section>

                <section id="bridge-settings" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Bridge Settings</h3>

                  <Table
                    headers={["Setting", "Description", "Recommended Value"]}
                    rows={[
                      ["vlan-filtering", "Enable VLAN filtering on bridge", "yes for VLANs"],
                      ["protocol-mode", "STP protocol", "rstp or mstp"],
                      ["priority", "Bridge priority (0-65535)", "0x8000 (32768)"],
                      ["ageing-time", "MAC address aging", "5m"],
                      ["forward-delay", "STP forward delay", "15s"],
                      ["hello-time", "STP hello time", "2s"],
                      ["max-message-age", "STP max message age", "20s"]
                    ]}
                  />

                  <CodeBlock
                    title="Advanced Bridge Settings"
                    language="bash"
                    code={`# Configure bridge with optimal VLAN settings
/interface bridge set bridge1
  vlan-filtering=yes
  protocol-mode=rstp
  priority=0x8000
  ageing-time=5m
  forward-delay=15s
  hello-time=2s
  max-message-age=20s

# Enable IGMP snooping for multicast optimization
/interface bridge set bridge1 igmp-snooping=yes`}
                  />
                </section>

                <section id="vlan-filtering" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">VLAN Filtering</h3>

                  <Callout type="warning" title="VLAN Filtering Must Be Enabled">
                    VLAN filtering must be enabled on the bridge for VLANs to work properly.
                    Without vlan-filtering=yes, all VLAN traffic will pass through all ports.
                  </Callout>

                  <CodeBlock
                    title="Enable VLAN Filtering"
                    language="bash"
                    code={`# Check current VLAN filtering status
/interface bridge print where name=bridge1

# Enable VLAN filtering (this will temporarily disrupt traffic)
/interface bridge set bridge1 vlan-filtering=yes

# Verify VLAN filtering is enabled
/interface bridge print detail where name=bridge1
  name="bridge1"
  vlan-filtering=yes
  protocol-mode=rstp`}
                  />
                </section>

                <section id="bridge-vlan-table" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Bridge VLAN Table</h3>

                  <p className="text-gray-300 mb-4">
                    The bridge VLAN table defines which VLANs are allowed on which ports:
                  </p>

                  <CodeBlock
                    title="Configure Bridge VLAN Table"
                    language="bash"
                    code={`# Create VLAN 10 on bridge
/interface bridge vlan
add bridge=bridge1 vlan-ids=10 tagged=bridge1,ether4 untagged=ether2

# Create VLAN 20 on bridge
add bridge=bridge1 vlan-ids=20 tagged=bridge1,ether4 untagged=ether3

# Create VLAN 30 (guest network)
add bridge=bridge1 vlan-ids=30 tagged=bridge1,ether4

# View VLAN table
/interface bridge vlan print
Flags: X - disabled, D - dynamic
 #   BRIDGE  VLAN-IDS  TAGGED        UNTAGGED
 0   bridge1 10        bridge1,ether4 ether2
 1   bridge1 20        bridge1,ether4 ether3
 2   bridge1 30        bridge1,ether4`}
                  />

                  <Diagram title="VLAN Assignment Diagram">
                    {`                    ┌─────────────────┐
                    │    bridge1      │
                    │  VLAN Filtering │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
    ┌────┴────┐         ┌────┴────┐         ┌────┴────┐
    │  ether2 │         │  ether3 │         │  ether4 │
    │ Access  │         │ Access  │         │  Trunk  │
    │ VLAN 10 │         │ VLAN 20 │         │ VLAN 10,│
    │ Untagged│         │ Untagged│         │ 20, 30  │
    └─────────┘         └─────────┘         └─────────┘`}
                  </Diagram>
                </section>
              </section>

              {/* VLAN Interfaces */}
              <section id="vlan-interfaces" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">VLAN Interfaces</h2>

                <section id="create-vlan" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Creating VLAN Interfaces</h3>

                  <CodeBlock
                    title="Create VLAN Interfaces"
                    language="bash"
                    code={`# Create VLAN 10 interface on bridge
/interface vlan
add name=vlan10 vlan-id=10 interface=bridge1

# Create VLAN 20 interface
add name=vlan20 vlan-id=20 interface=bridge1

# Create VLAN 30 interface
add name=vlan30 vlan-id=30 interface=bridge1

# Verify VLAN interfaces
/interface vlan print
Flags: X - disabled, R - running
 #   NAME      VLAN-ID INTERFACE  MTU
 0 R vlan10    10      bridge1    1500
 1 R vlan20    20      bridge1    1500
 2 R vlan30    30      bridge1    1500`}
                  />
                </section>

                <section id="vlan-settings" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">VLAN Interface Settings</h3>

                  <Table
                    headers={["Setting", "Description", "Example"]}
                    rows={[
                      ["name", "Interface name", "vlan10"],
                      ["vlan-id", "VLAN identifier (1-4094)", "10"],
                      ["interface", "Parent interface", "bridge1 or ether1"],
                      ["mtu", "Maximum Transmission Unit", "1500 (or 1504)"],
                      ["use-service-tag", "Use service tag (Q-in-Q)", "no"],
                      ["loop-protect", "Protect against loops", "default"]
                    ]}
                  />

                  <Callout type="tip" title="MTU Consideration">
                    VLAN tagging adds 4 bytes to the frame. If your network uses jumbo frames,
                    set MTU to 1504 or higher to accommodate the VLAN tag.
                  </Callout>
                </section>

                <section id="vlan-on-bridge" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">VLAN on Bridge vs Physical Interface</h3>

                  <Tabs>
                    <Tab label="On Bridge (Recommended)">
                      <CodeBlock
                        language="bash"
                        code={`# VLAN on bridge - best for most setups
/interface bridge add name=bridge1
/interface bridge port add bridge=bridge1 interface=ether1
/interface bridge port add bridge=bridge1 interface=ether2

/interface vlan add name=vlan10 vlan-id=10 interface=bridge1
/interface vlan add name=vlan20 vlan-id=20 interface=bridge1

# IP addresses on VLAN interfaces
/ip address add address=192.168.10.1/24 interface=vlan10
/ip address add address=192.168.20.1/24 interface=vlan20`}
                      />
                    </Tab>
                    <Tab label="On Physical Interface">
                      <CodeBlock
                        language="bash"
                        code={`# VLAN directly on physical interface
/interface vlan add name=vlan10 vlan-id=10 interface=ether1
/interface vlan add name=vlan20 vlan-id=20 interface=ether1

# Note: This doesn't allow multiple access ports per VLAN
# Only use for simple router-on-a-stick setups`}
                      />
                    </Tab>
                  </Tabs>
                </section>
              </section>

              {/* VLAN Routing */}
              <section id="vlan-routing" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">VLAN Routing</h2>

                <section id="inter-vlan-routing" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Inter-VLAN Routing</h3>

                  <p className="text-gray-300 mb-4">
                    By default, VLANs can route between each other. Use firewall rules to control traffic:
                  </p>

                  <CodeBlock
                    title="Configure IP Addresses for VLANs"
                    language="bash"
                    code={`# Assign IP addresses to VLAN interfaces
/ip address
add address=192.168.10.1/24 interface=vlan10 comment="Marketing VLAN"
add address=192.168.20.1/24 interface=vlan20 comment="Engineering VLAN"
add address=192.168.30.1/24 interface=vlan30 comment="Guest VLAN"

# Add default route
/ip route add gateway=192.168.1.1

# View routing table
/ip route print`}
                  />
                </section>

                <section id="router-on-stick" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Router-on-a-Stick</h3>

                  <Diagram title="Router-on-a-Stick Topology">
                    {`                    ┌─────────────┐
                    │   Router    │
                    │   (CHR)     │
                    └──────┬──────┘
                           │
                    ┌──────┴──────┐
                    │   Trunk     │
                    │   ether1    │
                    └──────┬──────┘
                           │
                    ┌──────┴──────┐
                    │   Switch    │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────┴────┐        ┌────┴────┐        ┌────┴────┐
   │ Access  │        │ Access  │        │ Access  │
   │ VLAN 10 │        │ VLAN 20 │        │ VLAN 30 │
   └─────────┘        └─────────┘        └─────────┘`}
                  </Diagram>

                  <CodeBlock
                    title="Router-on-a-Stick Configuration"
                    language="bash"
                    code={`# Single physical interface with multiple VLANs
/interface vlan
add name=vlan10 vlan-id=10 interface=ether1
add name=vlan20 vlan-id=20 interface=ether1
add name=vlan30 vlan-id=30 interface=ether1

# IP addresses
/ip address
add address=192.168.10.1/24 interface=vlan10
add address=192.168.20.1/24 interface=vlan20
add address=192.168.30.1/24 interface=vlan30

# DHCP servers for each VLAN
/ip pool
add name=pool10 ranges=192.168.10.100-192.168.10.200
add name=pool20 ranges=192.168.20.100-192.168.20.200
add name=pool30 ranges=192.168.30.100-192.168.30.200

/ip dhcp-server
add address-pool=pool10 interface=vlan10 name=dhcp10
add address-pool=pool20 interface=vlan20 name=dhcp20
add address-pool=pool30 interface=vlan30 name=dhcp30`}
                  />
                </section>

                <section id="layer3-switching" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Layer 3 Switching</h3>

                  <p className="text-gray-300 mb-4">
                    For hardware-accelerated routing between VLANs on supported devices:
                  </p>

                  <CodeBlock
                    title="Enable Hardware Offloading"
                    language="bash"
                    code={`# Check if your device supports hardware offloading
/interface bridge print

# Enable hardware offloading on bridge ports
/interface bridge port set [find] hw=yes

# For CRS3xx series switches, use L3 HW offloading
/interface bridge set bridge1 l3-hw-offloading=yes

# Verify offloading status
/interface bridge port print detail where hw=yes`}
                  />
                </section>
              </section>

              {/* VLAN Security */}
              <section id="vlan-security" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">VLAN Security</h2>

                <section id="vlan-isolation" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">VLAN Isolation</h3>

                  <CodeBlock
                    title="Isolate VLANs with Firewall"
                    language="bash"
                    code={`# Block inter-VLAN routing between specific VLANs
/ip firewall filter

# Allow established connections
add chain=forward connection-state=established,related action=accept

# Allow VLAN 10 to access VLAN 20 (if needed)
add chain=forward in-interface=vlan10 out-interface=vlan20 \
    action=accept comment="Allow VLAN10 to VLAN20"

# Block VLAN 30 (guest) from accessing other VLANs
add chain=forward in-interface=vlan30 out-interface=bridge1 \
    action=drop comment="Block Guest from internal networks"

# Allow VLAN 30 internet access only
add chain=forward in-interface=vlan30 out-interface=ether1 \
    action=accept comment="Guest internet access"

# Drop everything else
add chain=forward action=drop comment="Default deny"`}
                  />
                </section>

                <section id="private-vlans" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Private VLANs</h3>

                  <p className="text-gray-300 mb-4">
                    Private VLANs prevent communication between ports within the same VLAN:
                  </p>

                  <CodeBlock
                    language="bash"
                    code={`# Create separate bridges for isolation
/interface bridge
add name=bridge-isolated vlan-filtering=yes

# Add ports to isolated bridge
/interface bridge port
add bridge=bridge-isolated interface=ether2 pvid=10
add bridge=bridge-isolated interface=ether3 pvid=10

# Prevent communication between isolated ports
/interface bridge vlan
add bridge=bridge-isolated vlan-ids=10 tagged=bridge-isolated

# Traffic between ether2 and ether3 will be blocked
# Both can still reach the router via bridge interface`}
                  />
                </section>

                <section id="vlan-firewall" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Firewall Rules for VLANs</h3>

                  <CodeBlock
                    title="Comprehensive VLAN Firewall Rules"
                    language="bash"
                    code={`# Reset firewall to defaults
/ip firewall filter reset-counters

# Define VLAN interfaces
:local vlans "vlan10,vlan20,vlan30"

# Allow ICMP for troubleshooting
add chain=forward protocol=icmp action=accept

# Allow established/related
add chain=forward connection-state=established,related action=accept

# Allow management access to router
add chain=input in-interface=bridge1 protocol=tcp dst-port=22 \
    src-address=192.168.10.0/24 action=accept

# Allow VLAN 10 to access internet
add chain=forward in-interface=vlan10 out-interface=ether1 \
    action=accept

# Allow VLAN 20 to access internet
add chain=forward in-interface=vlan20 out-interface=ether1 \
    action=accept

# Block guest VLAN from internal networks
add chain=forward in-interface=vlan30 out-interface=bridge1 \
    dst-address=192.168.0.0/16 action=drop

# Allow guest VLAN internet
add chain=forward in-interface=vlan30 out-interface=ether1 \
    action=accept

# Drop invalid packets
add chain=forward connection-state=invalid action=drop

# Default drop
add chain=forward action=drop`}
                  />
                </section>
              </section>

              {/* VLAN Trunking */}
              <section id="vlan-trunking" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">VLAN Trunking</h2>

                <section id="trunk-ports" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Configuring Trunk Ports</h3>

                  <CodeBlock
                    title="Configure Trunk Port"
                    language="bash"
                    code={`# Configure ether4 as trunk port with tagged VLANs
/interface bridge port
add bridge=bridge1 interface=ether4

# Define which VLANs are allowed on trunk
/interface bridge vlan
add bridge=bridge1 vlan-ids=10,20,30,40,50 tagged=ether4,bridge1

# For older RouterOS versions, set vlan-mode
/interface bridge port set [find interface=ether4] vlan-mode=tagged`}
                  />
                </section>

                <section id="native-vlan" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Native VLAN Configuration</h3>

                  <Callout type="warning" title="Native VLAN Security">
                    Never use default VLAN 1 as native VLAN. Change it to an unused VLAN ID
                    to prevent VLAN hopping attacks.
                  </Callout>

                  <CodeBlock
                    language="bash"
                    code={`# Change native VLAN to 999 (unused)
/interface bridge port
set [find interface=ether4] pvid=999

# Configure trunk with native VLAN
/interface bridge vlan
add bridge=bridge1 vlan-ids=999 tagged=bridge1 untagged=ether4

# Or set specific port to accept untagged traffic on native VLAN
/interface bridge port set ether4 vlan-mode=default-native
/interface bridge port set ether4 default-vlan-id=999`}
                  />
                </section>

                <section id="allowed-vlans" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Allowed VLANs on Trunk</h3>

                  <CodeBlock
                    language="bash"
                    code={`# View currently allowed VLANs
/interface bridge vlan print where tagged~"ether4"

# Add multiple VLANs to trunk
/interface bridge vlan
add bridge=bridge1 vlan-ids=10,20,30 tagged=ether4,bridge1
add bridge=bridge1 vlan-ids=40,50 tagged=ether4,bridge1

# Remove VLAN from trunk
/interface bridge vlan remove [find where vlan-ids=40]

# Verify trunk configuration
/interface bridge vlan print where tagged~"ether4"
Flags: X - disabled, D - dynamic
 #   BRIDGE  VLAN-IDS  TAGGED           UNTAGGED
 0   bridge1 10,20,30  bridge1,ether4
 1   bridge1 50        bridge1,ether4`}
                  />
                </section>
              </section>

              {/* DHCP for VLANs */}
              <section id="dhcp-vlans" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">DHCP for VLANs</h2>

                <section id="dhcp-server-per-vlan" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">DHCP Server per VLAN</h3>

                  <CodeBlock
                    title="Configure DHCP for Multiple VLANs"
                    language="bash"
                    code={`# Create IP pools for each VLAN
/ip pool
add name=pool-vlan10 ranges=192.168.10.100-192.168.10.200
add name=pool-vlan20 ranges=192.168.20.100-192.168.20.200
add name=pool-vlan30 ranges=192.168.30.100-192.168.30.200

# Create DHCP networks
/ip dhcp-server network
add address=192.168.10.0/24 gateway=192.168.10.1 dns-server=8.8.8.8
add address=192.168.20.0/24 gateway=192.168.20.1 dns-server=8.8.8.8
add address=192.168.30.0/24 gateway=192.168.30.1 dns-server=8.8.8.8

# Create DHCP servers
/ip dhcp-server
add name=dhcp-vlan10 interface=vlan10 address-pool=pool-vlan10
add name=dhcp-vlan20 interface=vlan20 address-pool=pool-vlan20
add name=dhcp-vlan30 interface=vlan30 address-pool=pool-vlan30

# Enable DHCP servers
/ip dhcp-server enable [find]`}
                  />
                </section>

                <section id="dhcp-relay" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">DHCP Relay for VLANs</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Configure DHCP relay for multiple VLANs
/ip dhcp-relay
add name=relay-vlan10 interface=vlan10 dhcp-server=192.168.1.10
add name=relay-vlan20 interface=vlan20 dhcp-server=192.168.1.10
add name=relay-vlan30 interface=vlan30 dhcp-server=192.168.1.10

# Enable DHCP relay
/ip dhcp-relay enable [find]

# Verify relay configuration
/ip dhcp-relay print
Flags: X - disabled, I - invalid
 #   NAME         INTERFACE DHCP-SERVER
 0   relay-vlan10 vlan10    192.168.1.10
 1   relay-vlan20 vlan20    192.168.1.10
 2   relay-vlan30 vlan30    192.168.1.10`}
                  />
                </section>
              </section>

              {/* Advanced VLAN Configurations */}
              <section id="advanced-vlans" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Advanced VLAN Configurations</h2>

                <section id="qinq" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Q-in-Q (VLAN Stacking)</h3>

                  <p className="text-gray-300 mb-4">
                    Q-in-Q allows double tagging for service provider networks:
                  </p>

                  <CodeBlock
                    title="Configure Q-in-Q"
                    language="bash"
                    code={`# Create service VLAN (outer tag)
/interface vlan
add name=svlan100 vlan-id=100 interface=ether1

# Create customer VLAN (inner tag) on service VLAN
/interface vlan
add name=cvlan10 vlan-id=10 interface=svlan100
add name=cvlan20 vlan-id=20 interface=svlan100

# Configure IP on customer VLANs
/ip address
add address=10.10.10.1/24 interface=cvlan10
add address=10.10.20.1/24 interface=cvlan20

# Enable service tag (for compatibility)
/interface vlan set svlan100 use-service-tag=yes`}
                  />

                  <Diagram title="Q-in-Q Frame">
                    {`┌─────────┬─────────┬─────────┬─────────┬─────────┐
│ Dest MAC│ Src MAC │ Service │Customer │Payload │
│         │         │  VLAN   │  VLAN   │        │
│         │         │ (outer) │ (inner) │        │
└─────────┴─────────┴─────────┴─────────┴─────────┘
                      │         │
                    TPID=0x88A8 TPID=0x8100
                    (802.1ad)   (802.1Q)`}
                  </Diagram>
                </section>

                <section id="vlan-mapping" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">VLAN Mapping</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Map customer VLAN 100 to service VLAN 1000
/interface bridge vlan
add bridge=bridge1 vlan-ids=100 tagged=ether1

/interface vlan
add name=customer-vlan100 vlan-id=100 interface=bridge1

# Create mapping through routing
/ip route
add dst-address=192.168.100.0/24 gateway=10.10.10.2 routing-mark=to-customer

# Use NAT for VLAN translation if needed
/ip firewall nat
add chain=dstnat in-interface=svlan100 dst-port=80 protocol=tcp \
    action=dst-nat to-addresses=192.168.100.10 to-ports=80`}
                  />
                </section>
              </section>

              {/* VLAN Management */}
              <section id="vlan-management" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">VLAN Management</h2>

                <section id="vlan-monitoring" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Monitoring VLANs</h3>

                  <CodeBlock
                    title="VLAN Monitoring Commands"
                    language="bash"
                    code={`# Show all VLAN interfaces
/interface vlan print

# Show bridge VLAN table
/interface bridge vlan print

# Monitor traffic on specific VLAN
/interface monitor-traffic vlan10 once

# Show VLAN statistics
/interface vlan monitor-traffic vlan10

# View MAC addresses per VLAN
/interface bridge host print where bridge=bridge1

# Show DHCP leases per VLAN
/ip dhcp-server lease print where server=dhcp-vlan10

# View ARP table for VLAN
/ip arp print where interface=vlan10`}
                  />
                </section>

                <section id="vlan-troubleshooting" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Troubleshooting VLANs</h3>

                  <Table
                    headers={["Problem", "Symptoms", "Solution"]}
                    rows={[
                      ["VLAN not working", "No connectivity, no DHCP", "Check vlan-filtering=yes on bridge"],
                      ["Intermittent connectivity", "Packet loss, timeouts", "Verify MTU settings (use 1504)"],
                      ["VLAN hopping", "Security breach", "Change native VLAN, disable DTP"],
                      ["DHCP not working", "No IP address", "Check DHCP server config and relay"],
                      ["Inter-VLAN routing issues", "Can't ping between VLANs", "Check firewall rules and routing"],
                      ["Trunk port issues", "Missing VLANs", "Verify VLAN table and tagged ports"]
                    ]}
                  />

                  <CodeBlock
                    title="Debug VLAN Issues"
                    language="bash"
                    code={`# Check VLAN filtering status
/interface bridge print where name=bridge1

# Verify VLAN table
/interface bridge vlan print detail

# Test connectivity with specific VLAN tagging
/ping 192.168.10.1 interface=vlan10

# Use torch to see tagged traffic
/tool torch interface=ether1 vlan=10

# Enable debug logging
/system logging add topics=bridge,vlan action=memory

# View logs
/log print where topics~"vlan"

# Check bridge MAC table
/interface bridge host print where bridge=bridge1`}
                  />
                </section>

                <section id="vlan-backup" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Backup & Restore VLAN Config</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Export VLAN configuration
/export file=vlan-config

# Export only bridge and VLAN config
/export file=vlan-bridge where \
    [/interface bridge find] or \
    [/interface vlan find] or \
    [/interface bridge vlan find]

# Backup specific VLAN settings
/interface vlan export file=vlan-interfaces
/interface bridge vlan export file=bridge-vlan

# Restore configuration
/import file=vlan-config.rsc

# Create backup with timestamp
/system backup save name=vlan-backup-2024-03-06`}
                  />
                </section>
              </section>

              {/* Real-World Examples */}
              <section id="examples" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Real-World Examples</h2>

                <section id="small-office" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Small Office Setup</h3>

                  <Diagram title="Small Office VLAN Design">
                    {`                    ┌─────────────────┐
                    │   MikroTik     │
                    │    Router      │
                    └───────┬─────────┘
                            │
                    ┌───────┴─────────┐
                    │   Switch        │
                    └───────┬─────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   ┌────┴────┐         ┌────┴────┐         ┌────┴────┐
   │  VLAN10 │         │  VLAN20 │         │  VLAN30 │
   │Management│        │   Staff │         │  Guest  │
   │10.0.10.0/24│      │10.0.20.0/24│      │10.0.30.0/24│
   └─────────┘         └─────────┘         └─────────┘`}
                  </Diagram>

                  <CodeBlock
                    title="Complete Small Office Configuration"
                    language="bash"
                    code={`# Create bridge with VLAN filtering
/interface bridge add name=bridge1 vlan-filtering=yes

# Add ports to bridge
/interface bridge port
add bridge=bridge1 interface=ether1
add bridge=bridge1 interface=ether2
add bridge=bridge1 interface=ether3
add bridge=bridge1 interface=ether4

# Create VLAN interfaces
/interface vlan
add name=vlan10 vlan-id=10 interface=bridge1
add name=vlan20 vlan-id=20 interface=bridge1
add name=vlan30 vlan-id=30 interface=bridge1

# Configure VLAN table
/interface bridge vlan
add bridge=bridge1 vlan-ids=10 tagged=bridge1 untagged=ether2
add bridge=bridge1 vlan-ids=20 tagged=bridge1 untagged=ether3
add bridge=bridge1 vlan-ids=30 tagged=bridge1 untagged=ether4

# IP addresses
/ip address
add address=10.0.10.1/24 interface=vlan10 comment="Management"
add address=10.0.20.1/24 interface=vlan20 comment="Staff"
add address=10.0.30.1/24 interface=vlan30 comment="Guest"

# DHCP pools
/ip pool
add name=pool10 ranges=10.0.10.100-10.0.10.200
add name=pool20 ranges=10.0.20.100-10.0.20.200
add name=pool30 ranges=10.0.30.100-10.0.30.200

# DHCP networks
/ip dhcp-server network
add address=10.0.10.0/24 gateway=10.0.10.1 dns-server=8.8.8.8
add address=10.0.20.0/24 gateway=10.0.20.1 dns-server=8.8.8.8
add address=10.0.30.0/24 gateway=10.0.30.1 dns-server=8.8.8.8

# DHCP servers
/ip dhcp-server
add name=dhcp10 interface=vlan10 address-pool=pool10
add name=dhcp20 interface=vlan20 address-pool=pool20
add name=dhcp30 interface=vlan30 address-pool=pool30

# Firewall rules
/ip firewall filter
add chain=forward in-interface=vlan30 out-interface=bridge1 \
    action=drop comment="Block guest access"
add chain=forward in-interface=vlan30 out-interface=ether1 \
    action=accept comment="Guest internet"
add chain=forward action=accept connection-state=established,related
add chain=forward action=drop`}
                  />
                </section>

                <section id="guest-network" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Guest Network with VLANs</h3>

                  <CodeBlock
                    title="Secure Guest Network"
                    language="bash"
                    code={`# Create guest VLAN 100
/interface vlan add name=vlan-guest vlan-id=100 interface=bridge1

# Configure guest network
/ip address add address=192.168.100.1/24 interface=vlan-guest

# Guest DHCP
/ip pool add name=guest-pool ranges=192.168.100.100-192.168.100.200
/ip dhcp-server network add address=192.168.100.0/24 \
    gateway=192.168.100.1 dns-server=8.8.8.8
/ip dhcp-server add name=dhcp-guest interface=vlan-guest \
    address-pool=guest-pool

# Limit guest bandwidth
/queue simple
add name=guest-limit target=192.168.100.0/24 max-limit=2M/2M

# Firewall rules for guests
/ip firewall filter
add chain=forward in-interface=vlan-guest out-interface=bridge1 \
    action=drop comment="Block guest access to internal"
add chain=forward in-interface=vlan-guest out-interface=ether1 \
    action=accept comment="Allow guest internet"

# Block peer-to-peer for guests
/ip firewall filter
add chain=forward in-interface=vlan-guest protocol=tcp \
    dst-port=6881-6889 action=drop
add chain=forward in-interface=vlan-guest protocol=udp \
    dst-port=6881-6889 action=drop`}
                  />
                </section>

                <section id="voip-vlan" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">VoIP VLAN Setup</h3>

                  <CodeBlock
                    language="bash"
                    code={`# Create VoIP VLAN 50
/interface vlan add name=vlan-voip vlan-id=50 interface=bridge1

# VoIP network
/ip address add address=10.50.50.1/24 interface=vlan-voip

# DHCP with VoIP options
/ip dhcp-server network
add address=10.50.50.0/24 gateway=10.50.50.1 \
    dhcp-option=voip-options

# VoIP specific options
/ip dhcp-server option
add name=voip-tftp code=66 value="'10.50.50.10'"
add name=voip-server code=150 value="'10.50.50.10'"

# QoS for VoIP (high priority)
/queue tree
add name=voip-parent packet-mark=no-mark parent=global \
    queue=default
add name=voip-queue packet-mark=voip-mark parent=voip-parent \
    priority=1 max-limit=1M

# Mark VoIP traffic
/ip firewall mangle
add chain=prerouting in-interface=vlan-voip \
    action=mark-packet new-packet-mark=voip-mark

# Allow VoIP traffic
/ip firewall filter
add chain=forward in-interface=vlan-voip protocol=udp \
    dst-port=5060,10000-20000 action=accept`}
                  />
                </section>
              </section>

              {/* VLAN Automation */}
              <section id="automation" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">VLAN Automation</h2>

                <section id="api-vlan" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">VLANs via API</h3>

                  <CodeBlock
                    title="Python Script for VLAN Management"
                    language="python"
                    code={`import routeros_api
import sys

class VLANManager:
    def __init__(self, host, username, password):
        self.connection = routeros_api.RouterOsApiPool(
            host=host,
            username=username,
            password=password,
            plaintext_login=True
        )
        self.api = self.connection.get_api()

    def create_vlan(self, vlan_id, name, interface='bridge1'):
        """Create a new VLAN interface"""
        vlan = self.api.get_resource('/interface/vlan')
        vlan.add(
            name=name,
            vlan_id=vlan_id,
            interface=interface
        )
        print(f"Created VLAN {vlan_id}: {name}")

    def assign_ip_to_vlan(self, vlan_name, ip_address):
        """Assign IP address to VLAN interface"""
        ip = self.api.get_resource('/ip/address')
        ip.add(
            address=ip_address,
            interface=vlan_name
        )
        print(f"Assigned {ip_address} to {vlan_name}")

    def configure_bridge_vlan(self, bridge, vlan_id, tagged_ports, untagged_ports):
        """Configure bridge VLAN table"""
        bridge_vlan = self.api.get_resource('/interface/bridge/vlan')
        bridge_vlan.add(
            bridge=bridge,
            vlan_ids=vlan_id,
            tagged=",".join(tagged_ports),
            untagged=",".join(untagged_ports)
        )
        print(f"Configured VLAN {vlan_id} on bridge")

    def get_vlan_list(self):
        """List all VLANs"""
        vlans = self.api.get_resource('/interface/vlan').get()
        return vlans

    def delete_vlan(self, vlan_name):
        """Delete VLAN interface"""
        vlan = self.api.get_resource('/interface/vlan')
        vlan.delete(name=vlan_name)
        print(f"Deleted VLAN {vlan_name}")

    def close(self):
        self.connection.disconnect()

# Usage example
if __name__ == "__main__":
    manager = VLANManager("192.168.1.1", "admin", "password")

    # Create VLANs
    manager.create_vlan(10, "vlan10")
    manager.create_vlan(20, "vlan20")
    manager.create_vlan(30, "vlan30")

    # Assign IPs
    manager.assign_ip_to_vlan("vlan10", "192.168.10.1/24")
    manager.assign_ip_to_vlan("vlan20", "192.168.20.1/24")
    manager.assign_ip_to_vlan("vlan30", "192.168.30.1/24")

    # Configure bridge VLAN table
    manager.configure_bridge_vlan(
        "bridge1",
        10,
        ["bridge1", "ether4"],
        ["ether2"]
    )

    # List VLANs
    vlans = manager.get_vlan_list()
    for vlan in vlans:
        print(f"VLAN: {vlan['name']}, ID: {vlan['vlan-id']}")

    manager.close()`}
                  />
                </section>

                <section id="ansible" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Ansible for VLANs</h3>

                  <CodeBlock
                    title="Ansible Playbook for VLAN Configuration"
                    language="yaml"
                    code={`---
- name: Configure VLANs on MikroTik
  hosts: mikrotik
  gather_facts: no
  vars:
    vlans:
      - id: 10
        name: management
        subnet: 192.168.10.0/24
        gateway: 192.168.10.1
        untagged_ports: [ether2]
      - id: 20
        name: staff
        subnet: 192.168.20.0/24
        gateway: 192.168.20.1
        untagged_ports: [ether3]
      - id: 30
        name: guest
        subnet: 192.168.30.0/24
        gateway: 192.168.30.1
        untagged_ports: [ether4]

  tasks:
    - name: Ensure bridge exists with VLAN filtering
      community.routeros.api:
        path: /interface bridge
        cmd: add
        args:
          name: bridge1
          vlan-filtering: "yes"
      register: bridge_result
      failed_when: false

    - name: Add ports to bridge
      community.routeros.api:
        path: /interface bridge port
        cmd: add
        args:
          bridge: bridge1
          interface: "{{ item }}"
      loop:
        - ether1
        - ether2
        - ether3
        - ether4

    - name: Create VLAN interfaces
      community.routeros.api:
        path: /interface vlan
        cmd: add
        args:
          name: "vlan{{ item.id }}"
          vlan-id: "{{ item.id }}"
          interface: bridge1
      loop: "{{ vlans }}"

    - name: Configure bridge VLAN table
      community.routeros.api:
        path: /interface bridge vlan
        cmd: add
        args:
          bridge: bridge1
          vlan-ids: "{{ item.id }}"
          tagged: "bridge1,ether4"
          untagged: "{{ item.untagged_ports | join(',') }}"
      loop: "{{ vlans }}"

    - name: Assign IP addresses to VLANs
      community.routeros.api:
        path: /ip address
        cmd: add
        args:
          address: "{{ item.gateway }}"
          interface: "vlan{{ item.id }}"
          comment: "{{ item.name }}"
      loop: "{{ vlans }}"

    - name: Create DHCP pools
      community.routeros.api:
        path: /ip pool
        cmd: add
        args:
          name: "pool-vlan{{ item.id }}"
          ranges: "{{ item.subnet | ipaddr('network') | ipmath(100) }}-{{ item.subnet | ipaddr('network') | ipmath(200) }}"
      loop: "{{ vlans }}"

    - name: Configure DHCP networks
      community.routeros.api:
        path: /ip dhcp-server network
        cmd: add
        args:
          address: "{{ item.subnet }}"
          gateway: "{{ item.gateway }}"
          dns-server: 8.8.8.8
      loop: "{{ vlans }}"

    - name: Create DHCP servers
      community.routeros.api:
        path: /ip dhcp-server
        cmd: add
        args:
          name: "dhcp-vlan{{ item.id }}"
          interface: "vlan{{ item.id }}"
          address-pool: "pool-vlan{{ item.id }}"
      loop: "{{ vlans }}"`}
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
                          Bridge VLAN Table
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          VLAN Interfaces Manual
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Bridge VLAN Filtering
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Q-in-Q Configuration
                        </a>
                      </li>
                    </ul>
                  </Card>

                  <Card title="Community" icon={Users}>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          MikroTik VLAN Forum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Reddit r/mikrotik VLAN
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          VLAN Design Best Practices
                        </a>
                      </li>
                    </ul>
                  </Card>

                  <Card title="Tools" icon={Terminal}>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          VLAN Calculator
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Subnet Calculator
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Network Diagram Tools
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
                    VLANs are essential for modern network segmentation, security, and management.
                    MikroTik RouterOS provides powerful and flexible VLAN capabilities through bridge
                    VLAN filtering and VLAN interfaces. By following this guide, you've learned how to:
                  </p>

                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Understand VLAN fundamentals and 802.1Q tagging</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Configure bridges with VLAN filtering</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Create and manage VLAN interfaces</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Set up inter-VLAN routing and firewall rules</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Configure trunk ports with native VLAN security</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Implement DHCP for multiple VLANs</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Apply advanced VLAN features like Q-in-Q</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Automate VLAN management with scripts and API</span>
                    </li>
                  </ul>

                  <p className="text-gray-300 leading-relaxed mb-4">
                    Remember to always plan your VLAN design before implementation, follow security best practices,
                    and test configurations in a lab environment first. The MikroTik CHR virtual appliance is an
                    excellent tool for experimenting with VLANs without physical hardware.
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
                      href="/resources/mikrotik/cheat-sheet"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-lg text-gray-300 hover:text-green-500 hover:border-green-500/20 transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      <span>VLAN Cheat Sheet</span>
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
                    VLAN Quick Stats
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li className="flex justify-between">
                      <span>Max VLANs:</span>
                      <span className="font-mono text-green-500">4094</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Default VLAN:</span>
                      <span className="font-mono text-green-500">1</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Tag Overhead:</span>
                      <span className="font-mono text-green-500">4 bytes</span>
                    </li>
                    <li className="flex justify-between">
                      <span>MTU with Tag:</span>
                      <span className="font-mono text-green-500">1504</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Protocol:</span>
                      <span className="font-mono text-green-500">802.1Q</span>
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
