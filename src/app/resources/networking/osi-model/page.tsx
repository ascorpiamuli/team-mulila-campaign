"use client";
// src/app/resources/networking/osi-model/page.tsx
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

  Link2,
  Link2Off,
  WifiOff as WifiOffIcon,
  LinkIcon
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
    title: "Introduction to OSI Model",
    icon: BookOpen,
    subsections: [
      { id: "what-is-osi", title: "What is the OSI Model?" },
      { id: "why-osi", title: "Why Learn the OSI Model?" },
      { id: "history", title: "History & Development" },
      { id: "overview", title: "7 Layers Overview" }
    ]
  },
  {
    id: "layer7",
    title: "Layer 7 - Application",
    icon: Globe,
    subsections: [
      { id: "app-overview", title: "Overview" },
      { id: "protocols", title: "Common Protocols" },
      { id: "functions", title: "Functions" },
      { id: "examples", title: "Real-World Examples" }
    ]
  },
  {
    id: "layer6",
    title: "Layer 6 - Presentation",
    icon: Brush,
    subsections: [
      { id: "pres-overview", title: "Overview" },
      { id: "encryption", title: "Encryption & Decryption" },
      { id: "compression", title: "Compression" },
      { id: "translation", title: "Data Translation" }
    ]
  },
  {
    id: "layer5",
    title: "Layer 5 - Session",
    icon: Users,
    subsections: [
      { id: "session-overview", title: "Overview" },
      { id: "session-mgmt", title: "Session Management" },
      { id: "dialog-control", title: "Dialog Control" },
      { id: "synchronization", title: "Synchronization" }
    ]
  },
  {
    id: "layer4",
    title: "Layer 4 - Transport",
    icon: GitBranch,
    subsections: [
      { id: "transport-overview", title: "Overview" },
      { id: "tcp", title: "TCP - Transmission Control Protocol" },
      { id: "udp", title: "UDP - User Datagram Protocol" },
      { id: "flow-control", title: "Flow Control" },
      { id: "error-checking", title: "Error Checking" }
    ]
  },
  {
    id: "layer3",
    title: "Layer 3 - Network",
    icon: Network,
    subsections: [
      { id: "network-overview", title: "Overview" },
      { id: "ip", title: "IP Addressing" },
      { id: "routing", title: "Routing" },
      { id: "packet-forwarding", title: "Packet Forwarding" },
      { id: "icmp", title: "ICMP" }
    ]
  },
  {
    id: "layer2",
    title: "Layer 2 - Data Link",
    icon: EthernetPort,
    subsections: [
      { id: "datalink-overview", title: "Overview" },
      { id: "mac", title: "MAC Addresses" },
      { id: "switching", title: "Switching" },
      { id: "vlan", title: "VLANs" },
      { id: "arp", title: "ARP" }
    ]
  },
  {
    id: "layer1",
    title: "Layer 1 - Physical",
    icon: Cable,
    subsections: [
      { id: "physical-overview", title: "Overview" },
      { id: "cabling", title: "Cabling Types" },
      { id: "wireless", title: "Wireless Technologies" },
      { id: "signaling", title: "Signaling" },
      { id: "hardware", title: "Hardware Devices" }
    ]
  },
  {
    id: "encapsulation",
    title: "Data Encapsulation",
    icon: Layers,
    subsections: [
      { id: "encap-process", title: "Encapsulation Process" },
      { id: "pdu", title: "Protocol Data Units" },
      { id: "de-encapsulation", title: "De-encapsulation" },
      { id: "example-flow", title: "Example Data Flow" }
    ]
  },
  {
    id: "comparison",
    title: "OSI vs TCP/IP",
    icon: SwitchCamera,
    subsections: [
      { id: "tcpip-overview", title: "TCP/IP Model Overview" },
      { id: "similarities", title: "Similarities" },
      { id: "differences", title: "Key Differences" },
      { id: "mapping", title: "Layer Mapping" }
    ]
  },
  {
    id: "protocols",
    title: "Protocols by Layer",
    icon: RadioTower,
    subsections: [
      { id: "app-protocols", title: "Application Layer" },
      { id: "transport-protocols", title: "Transport Layer" },
      { id: "network-protocols", title: "Network Layer" },
      { id: "datalink-protocols", title: "Data Link Layer" },
      { id: "protocol-table", title: "Complete Protocol Table" }
    ]
  },
  {
    id: "devices",
    title: "Network Devices by Layer",
    icon: Router,
    subsections: [
      { id: "layer1-devices", title: "Physical Layer Devices" },
      { id: "layer2-devices", title: "Data Link Layer Devices" },
      { id: "layer3-devices", title: "Network Layer Devices" },
      { id: "higher-layer", title: "Higher Layer Devices" }
    ]
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting with OSI",
    icon: Wrench,
    subsections: [
      { id: "approach", title: "Layered Approach" },
      { id: "common-issues", title: "Common Issues by Layer" },
      { id: "tools", title: "Troubleshooting Tools" },
      { id: "methodology", title: "Methodology" }
    ]
  },
  {
    id: "resources",
    title: "Resources",
    icon: Database,
    subsections: [
      { id: "official-docs", title: "Official Documentation" },
      { id: "community", title: "Community Resources" },
      { id: "tools", title: "Learning Tools" },
      { id: "books", title: "Recommended Books" }
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
    id: "osi-mnemonic",
    title: "🧠 Remember the 7 Layers",
    description: "Please Do Not Throw Sausage Pizza Away (Physical, Data Link, Network, Transport, Session, Presentation, Application)",
    category: "tip",
    icon: Lightbulb
  },
  {
    id: "encapsulation",
    title: "📦 Data Encapsulation",
    description: "Each layer adds its own header - data grows as it moves down the stack!",
    category: "note",
    icon: Layers
  },
  {
    id: "tcpip-comparison",
    title: "🔄 OSI vs TCP/IP",
    description: "OSI is conceptual (7 layers), TCP/IP is practical (4-5 layers). Both are important to understand.",
    category: "note",
    icon: SwitchCamera
  },
  {
    id: "layer-2-vs-3",
    title: "🔍 Layer 2 vs Layer 3",
    description: "Layer 2 = MAC addresses (local delivery), Layer 3 = IP addresses (end-to-end delivery)",
    category: "tip",
    icon: Network
  },
  {
    id: "tcp-vs-udp",
    title: "📊 TCP vs UDP",
    description: "TCP = Reliable, ordered, heavy (web, email). UDP = Fast, lightweight (streaming, gaming)",
    category: "best-practice",
    icon: GitBranch
  },
  {
    id: "well-known-ports",
    title: "🔌 Well-Known Ports",
    description: "HTTP=80, HTTPS=443, FTP=21, SSH=22, DNS=53, DHCP=67/68",
    category: "tip",
    icon: Key
  },
  {
    id: "osi-troubleshooting",
    title: "🔧 Troubleshooting by Layer",
    description: "Start at Layer 1 (physical) and work your way up - most issues are at lower layers!",
    category: "best-practice",
    icon: Wrench
  },
  {
    id: "pdu-names",
    title: "📦 PDU Names by Layer",
    description: "Layer 4: Segments, Layer 3: Packets, Layer 2: Frames, Layer 1: Bits",
    category: "note",
    icon: Layers
  },
  {
    id: "protocol-encapsulation",
    title: "🔄 Protocol Encapsulation",
    description: "HTTP → TCP → IP → Ethernet → Physical - each layer wraps the previous!",
    category: "tip",
    icon: GitMerge
  },
  {
    id: "mac-vs-ip",
    title: "🏷️ MAC vs IP",
    description: "MAC = physical address (burned into NIC), IP = logical address (assigned by admin/DHCP)",
    category: "tip",
    icon: Fingerprint
  },
  {
    id: "arp-importance",
    title: "🔍 ARP Protocol",
    description: "ARP maps IP addresses to MAC addresses - critical for local network communication!",
    category: "note",
    icon: LinkIcon
  },
  {
    id: "wireless-layers",
    title: "📡 Wireless Networking",
    description: "WiFi operates at Layer 1 (physical) and Layer 2 (data link) - same OSI principles apply!",
    category: "tip",
    icon: Wifi
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

  const IconComponent = highlight.icon;

  return (
    <div className={`p-4 rounded-lg border ${categoryColors[highlight.category]}`}>
      <div className="flex items-start gap-3">
        <IconComponent className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
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

export default function NetworkingOSIModelPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [expandedSections, setExpandedSections] = useState<string[]>(['introduction', 'layer7', 'layer4', 'layer3']);
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
              <span className="text-green-500 truncate">OSI Model</span>
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
                <h4 className="font-mono text-sm font-semibold text-green-500 mb-2">📚 OSI Quick Reference</h4>
                <ul className="space-y-2 text-xs text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>7 Layers: Application, Presentation, Session, Transport, Network, Data Link, Physical</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>PDUs: Data, Segment, Packet, Frame, Bit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Key Protocols: TCP, UDP, IP, Ethernet, ARP</span>
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
                  Introduction to the OSI Model
                </h2>

                <section id="what-is-osi" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">What is the OSI Model?</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    The Open Systems Interconnection (OSI) model is a conceptual framework that standardizes the functions
                    of a communication system into seven distinct layers. It was developed by the International Organization
                    for Standardization (ISO) in 1984 to help vendors create interoperable network devices and software.
                  </p>

                  <Diagram title="The 7 Layers of the OSI Model">
                    {`
                    ┌─────────────────────────────────────┐
                    │    7. Application Layer              │  ↑
                    ├─────────────────────────────────────┤  │
                    │    6. Presentation Layer             │  │
                    ├─────────────────────────────────────┤  │
                    │    5. Session Layer                  │  │ Higher Layers
                    ├─────────────────────────────────────┤  │ (Software)
                    │    4. Transport Layer                │  │
                    ├─────────────────────────────────────┤  │
                    │    3. Network Layer                  │  ↓
                    ├─────────────────────────────────────┤
                    │    2. Data Link Layer                │  ↑
                    ├─────────────────────────────────────┤  │ Lower Layers
                    │    1. Physical Layer                 │  │ (Hardware)
                    └─────────────────────────────────────┘  ↓
                    `}
                  </Diagram>
                </section>

                <section id="why-osi" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Why Learn the OSI Model?</h3>

                  <Grid>
                    <Card title="Troubleshooting" icon={Wrench}>
                      <p className="text-sm">Helps isolate network problems by working through each layer systematically.</p>
                    </Card>
                    <Card title="Understanding" icon={Brain}>
                      <p className="text-sm">Provides a common language for network professionals to discuss protocols and technologies.</p>
                    </Card>
                    <Card title="Design" icon={Settings}>
                      <p className="text-sm">Guides network design and protocol development with clear layer separation.</p>
                    </Card>
                    <Card title="Compatibility" icon={GitMerge}>
                      <p className="text-sm">Ensures different vendors' equipment can work together through standardized interfaces.</p>
                    </Card>
                  </Grid>
                </section>

                <section id="history" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">History & Development</h3>

                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-mono text-sm">1977:</span>
                      <span>ISO begins work on OSI model to address networking incompatibility issues</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-mono text-sm">1984:</span>
                      <span>OSI model is published as ISO 7498 standard</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-mono text-sm">1990s:</span>
                      <span>TCP/IP becomes dominant, but OSI remains crucial for education and conceptual understanding</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-mono text-sm">Today:</span>
                      <span>OSI model is fundamental to networking certifications (CompTIA Network+, CCNA, etc.)</span>
                    </li>
                  </ul>
                </section>
              </section>

              {/* Layer 7 - Application */}
              <section id="layer7" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Layer 7 - Application Layer
                </h2>

                <section id="app-overview" className="mb-6">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    The Application layer is the closest to the end user. It provides network services directly to applications
                    and handles user authentication, data formatting, and protocol negotiation.
                  </p>

                  <Callout type="info" title="Important Note">
                    Don't confuse "Application Layer" with the actual software applications you use. The Application Layer
                    provides protocols that applications use to communicate over the network.
                  </Callout>
                </section>

                <section id="protocols" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Common Protocols</h3>

                  <Table
                    headers={["Protocol", "Port", "Description", "Use Case"]}
                    rows={[
                      ["HTTP", "80", "Hypertext Transfer Protocol", "Web browsing"],
                      ["HTTPS", "443", "HTTP Secure", "Secure web browsing"],
                      ["FTP", "20/21", "File Transfer Protocol", "File transfers"],
                      ["SFTP", "22", "SSH File Transfer Protocol", "Secure file transfers"],
                      ["SMTP", "25", "Simple Mail Transfer Protocol", "Email sending"],
                      ["POP3", "110", "Post Office Protocol v3", "Email receiving"],
                      ["IMAP", "143", "Internet Message Access Protocol", "Email receiving"],
                      ["DNS", "53", "Domain Name System", "Domain resolution"],
                      ["DHCP", "67/68", "Dynamic Host Configuration Protocol", "IP assignment"],
                      ["SNMP", "161", "Simple Network Management Protocol", "Network management"],
                      ["Telnet", "23", "Remote terminal", "Unsecured remote access"],
                      ["SSH", "22", "Secure Shell", "Secure remote access"]
                    ]}
                  />
                </section>
              </section>

              {/* Layer 6 - Presentation */}
              <section id="layer6" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Brush className="h-5 w-5" />
                  Layer 6 - Presentation Layer
                </h2>

                <section id="pres-overview" className="mb-6">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    The Presentation layer acts as a translator, ensuring that data sent from one system can be read by another.
                    It handles data formatting, encryption, compression, and character encoding conversion.
                  </p>
                </section>

                <section id="encryption" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Encryption & Decryption</h3>

                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">SSL/TLS:</span> Secure Sockets Layer / Transport Layer Security</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">SSH:</span> Secure Shell encryption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">IPsec:</span> IP Security protocol suite</span>
                    </li>
                  </ul>
                </section>

                <section id="compression" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Data Compression</h3>

                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">gzip:</span> File compression</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">JPEG:</span> Image compression</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">MPEG:</span> Video compression</span>
                    </li>
                  </ul>
                </section>
              </section>

              {/* Layer 5 - Session */}
              <section id="layer5" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Layer 5 - Session Layer
                </h2>

                <section id="session-overview" className="mb-6">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    The Session layer manages the establishment, maintenance, and termination of communication sessions
                    between applications. It handles authentication, reconnection, and checkpointing.
                  </p>
                </section>

                <section id="session-mgmt" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Session Management</h3>

                  <Table
                    headers={["Function", "Description", "Example"]}
                    rows={[
                      ["Establishment", "Create session connection", "Login to email server"],
                      ["Maintenance", "Keep session alive", "Keep-alive messages"],
                      ["Synchronization", "Add checkpoints", "Large file transfer resume"],
                      ["Termination", "End session", "Logout"],
                      ["Dialog Control", "Manage conversation flow", "Who talks when"]
                    ]}
                  />
                </section>
              </section>

              {/* Layer 4 - Transport */}
              <section id="layer4" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  Layer 4 - Transport Layer
                </h2>

                <section id="transport-overview" className="mb-6">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    The Transport layer ensures reliable data delivery between end systems. It handles segmentation,
                    flow control, error checking, and reassembly of data.
                  </p>
                </section>

                <section id="tcp" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">TCP - Transmission Control Protocol</h3>

                  <ul className="space-y-2 text-gray-300 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">Connection-oriented:</span> Establishes connection before sending data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">Reliable:</span> Acknowledges received data, retransmits if needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">Ordered:</span> Data arrives in the same order it was sent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">Flow control:</span> Prevents sender from overwhelming receiver</span>
                    </li>
                  </ul>

                  <CodeBlock
                    title="TCP 3-Way Handshake"
                    language="text"
                    code={`Client                      Server
  |                           |
  |---- SYN (Seq=x) -------->|
  |                           |
  |<--- SYN-ACK (Seq=y, Ack=x+1) --|
  |                           |
  |---- ACK (Ack=y+1) ------>|
  |                           |
  |<==== Connection Established ====>|`}
                  />
                </section>

                <section id="udp" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">UDP - User Datagram Protocol</h3>

                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">Connectionless:</span> No connection establishment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">Unreliable:</span> No guarantees of delivery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">Low overhead:</span> Minimal header (8 bytes vs TCP's 20)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">Fast:</span> Ideal for real-time applications</span>
                    </li>
                  </ul>
                </section>

                <section id="flow-control" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Flow Control Mechanisms</h3>

                  <Table
                    headers={["Mechanism", "Description", "Purpose"]}
                    rows={[
                      ["Sliding Window", "Dynamic window size adjustment", "Optimize throughput"],
                      ["ACK/NACK", "Positive/Negative acknowledgments", "Confirm receipt"],
                      ["Retransmission", "Resend lost packets", "Reliability"],
                      ["Congestion Control", "Slow start, congestion avoidance", "Network stability"]
                    ]}
                  />
                </section>
              </section>

              {/* Layer 3 - Network */}
              <section id="layer3" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  Layer 3 - Network Layer
                </h2>

                <section id="network-overview" className="mb-6">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    The Network layer handles routing and forwarding of data packets across networks. It determines the best
                    path for data transmission and manages logical addressing (IP addresses).
                  </p>
                </section>

                <section id="ip" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">IP Addressing</h3>

                  <Table
                    headers={["Version", "Address Size", "Format", "Example", "Features"]}
                    rows={[
                      ["IPv4", "32-bit", "Dotted decimal", "192.168.1.1", "32-bit, NAT, Classes"],
                      ["IPv6", "128-bit", "Hexadecimal", "2001:db8::1", "Larger address space, built-in security"]
                    ]}
                  />

                  <CodeBlock
                    title="IP Address Classes (IPv4)"
                    language="text"
                    code={`Class A: 0.0.0.0 - 127.255.255.255  (Large networks)
Class B: 128.0.0.0 - 191.255.255.255 (Medium networks)
Class C: 192.0.0.0 - 223.255.255.255 (Small networks)
Class D: 224.0.0.0 - 239.255.255.255 (Multicast)
Class E: 240.0.0.0 - 255.255.255.255 (Experimental)`}
                  />
                </section>

                <section id="routing" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Routing Protocols</h3>

                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">OSPF:</span> Open Shortest Path First (link-state)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">BGP:</span> Border Gateway Protocol (path-vector)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">RIP:</span> Routing Information Protocol (distance-vector)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">EIGRP:</span> Enhanced Interior Gateway Routing Protocol</span>
                    </li>
                  </ul>
                </section>

                <section id="icmp" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">ICMP - Internet Control Message Protocol</h3>

                  <p className="text-gray-300 mb-3">
                    ICMP is used for diagnostic and error reporting purposes:
                  </p>

                  <Table
                    headers={["ICMP Type", "Name", "Use"]}
                    rows={[
                      ["0", "Echo Reply", "Ping response"],
                      ["3", "Destination Unreachable", "Route/host not found"],
                      ["8", "Echo Request", "Ping request"],
                      ["11", "Time Exceeded", "TTL expired (traceroute)"]
                    ]}
                  />
                </section>
              </section>

              {/* Layer 2 - Data Link */}
              <section id="layer2" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <EthernetPort className="h-5 w-5" />
                  Layer 2 - Data Link Layer
                </h2>

                <section id="datalink-overview" className="mb-6">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    The Data Link layer provides node-to-node data transfer and handles error detection/correction from the Physical layer.
                    It packages data into frames and manages access to the physical medium.
                  </p>
                </section>

                <section id="mac" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">MAC Addresses</h3>

                  <p className="text-gray-300 mb-3">
                    MAC (Media Access Control) addresses are unique 48-bit identifiers burned into network interfaces:
                  </p>

                  <CodeBlock
                    title="MAC Address Format"
                    language="text"
                    code={`Format: 6 groups of 2 hexadecimal digits
Example: 00:1A:2B:3C:4D:5E

First 24 bits: Organizationally Unique Identifier (OUI)
- Identifies the manufacturer (e.g., 00:1A:2B = Intel)

Last 24 bits: Network Interface Controller (NIC) specific
- Unique to each device

Special addresses:
- FF:FF:FF:FF:FF:FF = Broadcast
- 01:80:C2:00:00:00 = Spanning Tree Protocol`}
                  />
                </section>

                <section id="switching" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Switching</h3>

                  <Table
                    headers={["Switch Type", "Operation", "Latency", "Use Case"]}
                    rows={[
                      ["Cut-through", "Forward as soon as dest MAC read", "Low", "High-speed, low error networks"],
                      ["Store-and-forward", "Receive entire frame, check CRC", "High", "Error-prone environments"],
                      ["Fragment-free", "Check first 64 bytes", "Medium", "Balance of speed and reliability"]
                    ]}
                  />
                </section>

                <section id="vlan" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">VLANs - Virtual Local Area Networks</h3>

                  <p className="text-gray-300 mb-3">
                    VLANs segment a physical network into multiple logical networks at Layer 2:
                  </p>

                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">802.1Q:</span> VLAN tagging standard (adds 4-byte tag)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">Trunk ports:</span> Carry multiple VLANs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><span className="text-green-500">Access ports:</span> Single VLAN, untagged</span>
                    </li>
                  </ul>
                </section>

                <section id="arp" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">ARP - Address Resolution Protocol</h3>

                  <p className="text-gray-300 mb-3">
                    ARP maps IP addresses to MAC addresses on a local network:
                  </p>

                  <CodeBlock
                    title="ARP Process"
                    language="text"
                    code={`Host A (192.168.1.10) wants to send to Host B (192.168.1.20):

1. Host A checks ARP cache for 192.168.1.20
2. If not found, Host A broadcasts ARP request:
   "Who has 192.168.1.20? Tell 192.168.1.10"

3. Host B sees the request and responds with its MAC:
   "192.168.1.20 is at 00:1A:2B:3C:4D:5E"

4. Host A caches the mapping and sends data

View ARP cache:
$ arp -a
? (192.168.1.1) at 00:11:22:33:44:55 on en0
? (192.168.1.20) at 00:1A:2B:3C:4D:5E on en0`}
                  />

                  <Callout type="warning" title="ARP Spoofing">
                    ARP is vulnerable to spoofing attacks. Use ARP inspection or static ARP entries in secure environments.
                  </Callout>
                </section>
              </section>

              {/* Layer 1 - Physical */}
              <section id="layer1" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Cable className="h-5 w-5" />
                  Layer 1 - Physical Layer
                </h2>

                <section id="physical-overview" className="mb-6">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    The Physical layer defines the hardware specifications for transmitting raw bits over a physical medium.
                    It includes cables, connectors, voltage levels, and data rates.
                  </p>
                </section>

                <section id="cabling" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Cabling Types</h3>

                  <Table
                    headers={["Cable Type", "Max Speed", "Max Distance", "Connector", "Use Case"]}
                    rows={[
                      ["Cat5e", "1 Gbps", "100m", "RJ45", "Ethernet, standard networks"],
                      ["Cat6", "10 Gbps", "55m", "RJ45", "High-speed networks"],
                      ["Cat6a", "10 Gbps", "100m", "RJ45", "Data centers, enterprises"],
                      ["Cat7", "10 Gbps", "100m", "GG45", "High-performance networks"],
                      ["Cat8", "25-40 Gbps", "30m", "RJ45", "Data centers"],
                      ["Fiber (MM)", "10-100 Gbps", "550m", "LC/SC", "Long distances, high speed"],
                      ["Fiber (SM)", "100+ Gbps", "100km+", "LC/SC", "WAN, ISPs"]
                    ]}
                  />
                </section>

                <section id="wireless" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Wireless Technologies</h3>

                  <Table
                    headers={["Standard", "Frequency", "Max Speed", "Range"]}
                    rows={[
                      ["802.11a", "5 GHz", "54 Mbps", "~35m"],
                      ["802.11b", "2.4 GHz", "11 Mbps", "~40m"],
                      ["802.11g", "2.4 GHz", "54 Mbps", "~40m"],
                      ["802.11n", "2.4/5 GHz", "600 Mbps", "~70m"],
                      ["802.11ac", "5 GHz", "1.3 Gbps", "~70m"],
                      ["802.11ax (WiFi 6)", "2.4/5/6 GHz", "9.6 Gbps", "~80m"]
                    ]}
                  />
                </section>

                <section id="hardware" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Physical Layer Hardware</h3>

                  <Grid>
                    <Card title="Hubs" icon={Radio}>
                      <p className="text-sm">Broadcast all data to all ports - creates collisions, rarely used today.</p>
                    </Card>
                    <Card title="Repeaters" icon={Zap}>
                      <p className="text-sm">Regenerate signals to extend network distance.</p>
                    </Card>
                    <Card title="Transceivers" icon={Satellite}>
                      <p className="text-sm">Convert between different media types (e.g., copper to fiber).</p>
                    </Card>
                    <Card title="NICs" icon={EthernetPort}>
                      <p className="text-sm">Network Interface Cards provide physical connectivity.</p>
                    </Card>
                  </Grid>
                </section>
              </section>

              {/* Data Encapsulation */}
              <section id="encapsulation" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Data Encapsulation
                </h2>

                <section id="encap-process" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">The Encapsulation Process</h3>

                  <Diagram title="Data Encapsulation Flow">
                    {`
Application Layer    [ Data                                      ]
                           │ Add Layer 7 header
                           ▼
Presentation Layer   [ H6 | Data                                ]
                           │ Add Layer 6 header
                           ▼
Session Layer        [ H5 | H6 | Data                          ]
                           │ Add Layer 5 header
                           ▼
Transport Layer      [ H4 | H5 | H6 | Data                     ]  Segment
                           │ Add Layer 3 header
                           ▼
Network Layer        [ H3 | H4 | H5 | H6 | Data                ]  Packet
                           │ Add Layer 2 header + trailer
                           ▼
Data Link Layer      [ H2 | H3 | H4 | H5 | H6 | Data | T2      ]  Frame
                           │ Convert to bits
                           ▼
Physical Layer       [ 1010101010101010101010101010101010101010 ]  Bits`}
                  </Diagram>
                </section>

                <section id="pdu" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Protocol Data Units (PDUs)</h3>

                  <Table
                    headers={["Layer", "PDU Name", "Description"]}
                    rows={[
                      ["Application (L7)", "Data", "Raw user data"],
                      ["Presentation (L6)", "Data", "Formatted data"],
                      ["Session (L5)", "Data", "Session-managed data"],
                      ["Transport (L4)", "Segment", "Segmented data with port numbers"],
                      ["Network (L3)", "Packet", "Segments with IP addresses"],
                      ["Data Link (L2)", "Frame", "Packets with MAC addresses"],
                      ["Physical (L1)", "Bits", "Raw binary transmission"]
                    ]}
                  />
                </section>
              </section>

              {/* OSI vs TCP/IP */}
              <section id="comparison" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <SwitchCamera className="h-5 w-5" />
                  OSI Model vs TCP/IP Model
                </h2>

                <section id="tcpip-overview" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">TCP/IP Model Overview</h3>

                  <Diagram title="OSI vs TCP/IP Layer Comparison">
                    {`
OSI Model            TCP/IP Model
───────────          ───────────
7. Application  ┐
6. Presentation ├── Application Layer
5. Session      ┘
4. Transport    ────── Transport Layer
3. Network      ────── Internet Layer
2. Data Link    ┐
1. Physical     └──── Network Access Layer
                    `}
                  </Diagram>
                </section>

                <section id="differences" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Key Differences</h3>

                  <Table
                    headers={["Aspect", "OSI Model", "TCP/IP Model"]}
                    rows={[
                      ["Layers", "7 layers", "4-5 layers"],
                      ["Development", "Conceptual model", "Protocol-based"],
                      ["Approach", "Vertical (layer-by-layer)", "Horizontal (protocol suite)"],
                      ["Protocols", "Generic", "Specific (TCP, IP, etc.)"],
                      ["Use", "Teaching, reference", "Implementation, internet"]
                    ]}
                  />
                </section>

                <section id="mapping" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Protocol Mapping</h3>

                  <Table
                    headers={["OSI Layer", "TCP/IP Layer", "Example Protocols"]}
                    rows={[
                      ["5-7 (Session/Presentation/Application)", "Application", "HTTP, FTP, SMTP, DNS, SSH"],
                      ["4 (Transport)", "Transport", "TCP, UDP"],
                      ["3 (Network)", "Internet", "IP, ICMP, ARP"],
                      ["1-2 (Physical/Data Link)", "Network Access", "Ethernet, WiFi, PPP"]
                    ]}
                  />
                </section>
              </section>

              {/* Devices by Layer */}
              <section id="devices" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Router className="h-5 w-5" />
                  Network Devices by Layer
                </h2>

                <section id="layer1-devices" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Physical Layer Devices (L1)</h3>

                  <Grid>
                    <Card title="Hub" icon={Radio}>
                      <p className="text-sm">Repeats signals to all ports - no intelligence, creates collisions.</p>
                    </Card>
                    <Card title="Repeater" icon={Zap}>
                      <p className="text-sm">Regenerates signals to extend cable length.</p>
                    </Card>
                    <Card title="Transceiver" icon={Satellite}>
                      <p className="text-sm">Converts between different media types.</p>
                    </Card>
                    <Card title="Modem" icon={Wifi}>
                      <p className="text-sm">Modulates/demodulates analog/digital signals.</p>
                    </Card>
                  </Grid>
                </section>

                <section id="layer2-devices" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Data Link Layer Devices (L2)</h3>

                  <Grid>
                    <Card title="Switch" icon={SwitchIcon}>
                      <p className="text-sm">Forwards frames based on MAC addresses, creates collision domains.</p>
                    </Card>
                    <Card title="Bridge" icon={GitMerge}>
                      <p className="text-sm">Connects network segments, filters by MAC address.</p>
                    </Card>
                    <Card title="Wireless AP" icon={WifiIcon2}>
                      <p className="text-sm">Connects wireless clients to wired network.</p>
                    </Card>
                  </Grid>
                </section>

                <section id="layer3-devices" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Network Layer Devices (L3)</h3>

                  <Grid>
                    <Card title="Router" icon={Router}>
                      <p className="text-sm">Forwards packets based on IP addresses, connects different networks.</p>
                    </Card>
                    <Card title="Layer 3 Switch" icon={SwitchIcon}>
                      <p className="text-sm">Combines switching with routing capabilities.</p>
                    </Card>
                    <Card title="Firewall" icon={Shield}>
                      <p className="text-sm">Filters traffic based on IP addresses and ports.</p>
                    </Card>
                  </Grid>
                </section>
              </section>

              {/* Troubleshooting with OSI */}
              <section id="troubleshooting" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Troubleshooting with the OSI Model
                </h2>

                <section id="approach" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Layered Approach to Troubleshooting</h3>

                  <Callout type="tip" title="Bottom-Up Approach">
                    Start at Layer 1 (Physical) and work your way up. Most network problems are at the lower layers!
                  </Callout>

                  <CodeBlock
                    title="Troubleshooting Flow"
                    language="text"
                    code={`Start here ──► Layer 1 (Physical)
                      │
                      ├── Check cables, connections, power
                      ├── Verify link lights
                      ├── Test with cable tester
                      │
                      ▼
                    Layer 2 (Data Link)
                      │
                      ├── Check MAC addresses
                      ├── Verify VLAN configuration
                      ├── Check switch ports
                      │
                      ▼
                    Layer 3 (Network)
                      │
                      ├── Ping default gateway
                      ├── Check IP configuration
                      ├── Verify routing tables
                      │
                      ▼
                    Layer 4 (Transport)
                      │
                      ├── Test specific ports (telnet/nc)
                      ├── Check firewall rules
                      ├── Verify services listening
                      │
                      ▼
                    Layers 5-7 (Session/Application)
                      │
                      ├── Check application logs
                      ├── Verify credentials
                      ├── Test with different client
                      │
                      Done`}
                  />
                </section>

                <section id="common-issues" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Common Issues by Layer</h3>

                  <Table
                    headers={["Layer", "Common Issues", "Symptoms", "Tools"]}
                    rows={[
                      ["Physical", "Cable faults, power issues", "No link, intermittent connectivity", "Cable tester, multimeter"],
                      ["Data Link", "MAC conflicts, VLAN mismatch", "Can't reach local devices", "ARP, switch logs"],
                      ["Network", "Wrong IP, routing errors", "Can't ping remote networks", "Ping, traceroute, ipconfig"],
                      ["Transport", "Firewall blocks, port conflicts", "Specific apps fail", "netstat, telnet, nmap"],
                      ["Application", "Wrong credentials, app errors", "Application errors", "App logs, browser console"]
                    ]}
                  />
                </section>

                <section id="tools" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Troubleshooting Tools by Layer</h3>

                  <Table
                    headers={["Tool", "Layer", "Purpose", "Example"]}
                    rows={[
                      ["ping", "L3", "Test connectivity", "ping 8.8.8.8"],
                      ["traceroute", "L3", "Trace route", "traceroute google.com"],
                      ["ipconfig/ifconfig", "L3", "IP configuration", "ipconfig /all"],
                      ["arp", "L2", "View ARP cache", "arp -a"],
                      ["netstat", "L4", "Connection status", "netstat -an"],
                      ["nmap", "L4", "Port scanning", "nmap -p 80 target"],
                      ["tcpdump", "L2-4", "Packet capture", "tcpdump -i eth0"],
                      ["wireshark", "L2-7", "Deep packet inspection", "wireshark"],
                      ["telnet/nc", "L4", "Test ports", "telnet host port"]
                    ]}
                  />
                </section>
              </section>

              {/* Protocols Table */}
              <section id="protocols" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <RadioTower className="h-5 w-5" />
                  Complete Protocol Reference
                </h2>

                <section id="protocol-table" className="mb-6">
                  <h3 className="font-mono text-xl font-semibold text-green-500 mb-3">Protocols by Layer</h3>

                  <Table
                    headers={["Layer", "Protocols", "Port/ID", "Description"]}
                    rows={[
                      ["Application (L7)", "HTTP", "80", "Web browsing"],
                      ["Application (L7)", "HTTPS", "443", "Secure web"],
                      ["Application (L7)", "FTP", "20/21", "File transfer"],
                      ["Application (L7)", "SFTP", "22", "Secure file transfer"],
                      ["Application (L7)", "SSH", "22", "Secure shell"],
                      ["Application (L7)", "Telnet", "23", "Remote terminal"],
                      ["Application (L7)", "SMTP", "25", "Email sending"],
                      ["Application (L7)", "POP3", "110", "Email receiving"],
                      ["Application (L7)", "IMAP", "143", "Email receiving"],
                      ["Application (L7)", "DNS", "53", "Name resolution"],
                      ["Application (L7)", "DHCP", "67/68", "IP assignment"],
                      ["Application (L7)", "SNMP", "161", "Network management"],
                      ["Application (L7)", "NTP", "123", "Time sync"],
                      ["Application (L7)", "LDAP", "389", "Directory services"],
                      ["Application (L7)", "RDP", "3389", "Remote desktop"],
                      ["Application (L7)", "SMB", "445", "File sharing"],
                      ["Transport (L4)", "TCP", "-", "Reliable transport"],
                      ["Transport (L4)", "UDP", "-", "Fast transport"],
                      ["Network (L3)", "IP", "-", "Internet Protocol"],
                      ["Network (L3)", "ICMP", "-", "Control messages"],
                      ["Network (L3)", "IGMP", "-", "Multicast management"],
                      ["Data Link (L2)", "ARP", "-", "Address resolution"],
                      ["Data Link (L2)", "Ethernet", "-", "LAN standard"],
                      ["Data Link (L2)", "PPP", "-", "Point-to-point"],
                      ["Data Link (L2)", "VLAN (802.1Q)", "-", "Virtual LANs"],
                      ["Data Link (L2)", "STP", "-", "Spanning Tree"]
                    ]}
                  />
                </section>
              </section>

              {/* Resources */}
              <section id="resources" className="mb-12 scroll-mt-20">
                <h2 className="font-mono text-2xl font-bold text-green-500 mb-4">Resources</h2>

                <Grid>
                  <Card title="Official Standards" icon={BookOpen}>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          ISO/IEC 7498-1 (OSI Model)
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          IEEE 802 Standards
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          IETF RFC Documents
                        </a>
                      </li>
                    </ul>
                  </Card>

                  <Card title="Learning Resources" icon={GraduationCap}>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          CompTIA Network+ Guide
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Cisco CCNA Study Materials
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Packet Tracer Labs
                        </a>
                      </li>
                    </ul>
                  </Card>

                  <Card title="Practice Tools" icon={Terminal}>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Wireshark
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          Cisco Packet Tracer
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-green-500 hover:underline">
                          GNS3
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
                    The OSI model remains the foundational framework for understanding computer networking.
                    Whether you're troubleshooting network issues, designing new systems, or studying for certifications,
                    understanding these seven layers provides the vocabulary and conceptual framework needed to succeed.
                  </p>

                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><span className="text-green-500">Physical (L1):</span> Bits, cables, connectors, signaling</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><span className="text-green-500">Data Link (L2):</span> Frames, MAC addresses, switching</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><span className="text-green-500">Network (L3):</span> Packets, IP addresses, routing</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><span className="text-green-500">Transport (L4):</span> Segments, TCP/UDP, ports</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><span className="text-green-500">Session (L5):</span> Session management, dialog control</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><span className="text-green-500">Presentation (L6):</span> Encryption, compression, translation</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><span className="text-green-500">Application (L7):</span> Protocols, user applications</span>
                    </li>
                  </ul>

                  <p className="text-gray-300 leading-relaxed mb-4">
                    Remember the mnemonic: <span className="text-green-500 font-mono">"Please Do Not Throw Sausage Pizza Away"</span>
                  </p>

                  <div className="flex flex-wrap gap-4 mt-6">
                    <Link
                      href="/resources/networking/tcpip"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 hover:bg-green-500/20 transition-colors"
                    >
                      <Network className="h-4 w-4" />
                      <span>TCP/IP Model</span>
                    </Link>

                    <Link
                      href="/resources/mikrotik"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-lg text-gray-300 hover:text-green-500 hover:border-green-500/20 transition-colors"
                    >
                      <Router className="h-4 w-4" />
                      <span>MikroTik Guides</span>
                    </Link>

                    <a
                      href="https://www.iso.org/standard/20269.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-lg text-gray-300 hover:text-green-500 hover:border-green-500/20 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>ISO Standard</span>
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
                    OSI Quick Facts
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li className="flex justify-between">
                      <span>Layers:</span>
                      <span className="font-mono text-green-500">7</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Year Created:</span>
                      <span className="font-mono text-green-500">1984</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Standard:</span>
                      <span className="font-mono text-green-500">ISO 7498</span>
                    </li>
                    <li className="flex justify-between">
                      <span>PDU Types:</span>
                      <span className="font-mono text-green-500">5</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Mnemonic:</span>
                      <span className="font-mono text-green-500">"Please Do..."</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Last updated: March 2024
                    <br />
                    ISO/IEC 7498-1 compliant
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
