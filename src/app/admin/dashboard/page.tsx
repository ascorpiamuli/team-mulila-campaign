"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Users, Calendar, TrendingUp, CheckCircle, Clock, Award, Shield,
  AlertCircle, RefreshCw, UserCheck, Fingerprint, Activity,
  Zap, Eye, Lock, Server, Database, Cpu, AlertTriangle,
  BarChart3, PieChart, Target, Star, Crown, Flag, Heart,
  Smartphone, Laptop, Tablet, MapPin, Mail, PhoneCall,
  ThumbsUp, ThumbsDown, Percent, ArrowUp, ArrowDown,
  Monitor, DollarSign, Globe, Send, UserPlus, CalendarDays,
  Layers, Building2, BarChartHorizontal, Map,
  X, ChevronDown, ChevronUp
} from "lucide-react";
import { supabase } from '../../../../lib/supabase/client';
import { useToast } from '../../../hooks/useToast';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart as RePieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, ScatterChart, Scatter, RadialBarChart,
  RadialBar
} from 'recharts';
import KituiMap from '@/components/KituiMap';

interface Supporter {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  constituency: string;
  ward?: string;
  is_verified: boolean;
  registered_at: string;
  bot_score?: number;
  is_human?: boolean;
  mouse_movements?: number;
  clicks?: number;
  key_presses?: number;
  time_spent?: number;
  ip_address?: string;
  device_fingerprint?: string;
  security_report?: any;
  phone_verified?: boolean;
  user_agent?: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  type: string;
  expected_attendees: number;
}

interface EventRegistration {
  id: string;
  event_id: string;
  full_name: string;
  email: string;
  registered_at: string;
}

interface DashboardStats {
  total: number;
  verified: number;
  pending: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  humanVerificationRate: number;
  averageBotScore: number;
  averageTimeSpent: number;
  uniqueDevices: number;
  highRiskUsers: number;
  mediumRiskUsers: number;
  lowRiskUsers: number;
  phoneVerified: number;
  eventsCount: number;
  eventRegistrations: number;
  constituencies: number;
  wards: number;
}

const COLORS = ['#C17B2B', '#E6A856', '#F5C842', '#D4A02B', '#B8860B', '#8B6914', '#6B4F10', '#4A3508'];
const DEVICE_COLORS = ['#60A5FA', '#34D399', '#F472B6', '#9CA3AF'];
const RISK_COLORS = ['#F87171', '#FBBF24', '#4ADE80'];

export default function AdminDashboard() {
  const router = useRouter();
  const { showToast } = useToast();
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    verified: 0,
    pending: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    humanVerificationRate: 0,
    averageBotScore: 0,
    averageTimeSpent: 0,
    uniqueDevices: 0,
    highRiskUsers: 0,
    mediumRiskUsers: 0,
    lowRiskUsers: 0,
    phoneVerified: 0,
    eventsCount: 0,
    eventRegistrations: 0,
    constituencies: 0,
    wards: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("30d");
  const [locationView, setLocationView] = useState<"constituency" | "ward">("constituency");
  const [selectedConstituency, setSelectedConstituency] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showMap, setShowMap] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      setIsMobile(width < 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [supportersRes, eventsRes, registrationsRes] = await Promise.all([
        supabase.from("campaign_supporters").select("*").order("registered_at", { ascending: false }),
        supabase.from("campaign_events").select("*").order("date", { ascending: true }),
        supabase.from("event_registrations").select("*").order("registered_at", { ascending: false })
      ]);

      if (supportersRes.error) throw supportersRes.error;
      if (eventsRes.error) throw eventsRes.error;
      if (registrationsRes.error) throw registrationsRes.error;

      setSupporters(supportersRes.data || []);
      setEvents(eventsRes.data || []);
      setEventRegistrations(registrationsRes.data || []);

      // Calculate statistics
      const data = supportersRes.data || [];
      const total = data.length;
      const verified = data.filter(s => s.is_verified === true).length;
      const pending = total - verified;
      const phoneVerified = data.filter(s => s.phone_verified === true).length;

      const humanVerified = data.filter(s => s.is_human === true).length;
      const humanVerificationRate = total > 0 ? (humanVerified / total) * 100 : 0;
      const averageBotScore = total > 0 ? data.reduce((acc, s) => acc + (s.bot_score || 0), 0) / total : 0;
      const averageTimeSpent = total > 0 ? data.reduce((acc, s) => acc + (s.time_spent || 0), 0) / total : 0;

      const highRiskUsers = data.filter(s => (s.bot_score || 0) < 40).length || 0;
      const mediumRiskUsers = data.filter(s => (s.bot_score || 0) >= 40 && (s.bot_score || 0) < 70).length || 0;
      const lowRiskUsers = data.filter(s => (s.bot_score || 0) >= 70).length || 0;

      const uniqueDevices = new Set(data.map(s => s.device_fingerprint).filter(Boolean)).size;

      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const todayCount = data.filter(s => s.registered_at?.startsWith(today)).length || 0;
      const thisWeekCount = data.filter(s => new Date(s.registered_at) >= weekAgo).length || 0;
      const thisMonthCount = data.filter(s => new Date(s.registered_at) >= monthAgo).length || 0;

      // Unique constituencies and wards
      const constituencies = new Set(data.map(s => s.constituency).filter(Boolean));
      const wards = new Set(data.map(s => s.ward).filter(Boolean));

      setStats({
        total,
        verified,
        pending,
        today: todayCount,
        thisWeek: thisWeekCount,
        thisMonth: thisMonthCount,
        humanVerificationRate,
        averageBotScore,
        averageTimeSpent,
        uniqueDevices,
        highRiskUsers,
        mediumRiskUsers,
        lowRiskUsers,
        phoneVerified,
        eventsCount: eventsRes.data?.length || 0,
        eventRegistrations: registrationsRes.data?.length || 0,
        constituencies: constituencies.size,
        wards: wards.size
      });

    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load statistics");
      showToast("Failed to load dashboard data", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter supporters by time range
  const filteredSupporters = useMemo(() => {
    const now = new Date();
    let cutoff = new Date();

    switch (timeRange) {
      case "24h":
        cutoff.setHours(now.getHours() - 24);
        break;
      case "7d":
        cutoff.setDate(now.getDate() - 7);
        break;
      case "30d":
        cutoff.setDate(now.getDate() - 30);
        break;
      case "90d":
        cutoff.setDate(now.getDate() - 90);
        break;
      default:
        cutoff = new Date(0);
    }

    return supporters.filter(s => new Date(s.registered_at) >= cutoff);
  }, [supporters, timeRange]);

  // Filter by selected constituency (from map click)
  const displaySupporters = useMemo(() => {
    if (selectedConstituency) {
      return filteredSupporters.filter(s => s.constituency === selectedConstituency);
    }
    return filteredSupporters;
  }, [filteredSupporters, selectedConstituency]);

  // Daily registration stats
  const dailyStats = useMemo(() => {
    const stats: Record<string, any> = {};
    const now = new Date();
    const days = timeRange === "24h" ? 1 : timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split('T')[0];
      stats[key] = { date: key, count: 0, verified: 0, pending: 0 };
    }

    displaySupporters.forEach(s => {
      const key = new Date(s.registered_at).toISOString().split('T')[0];
      if (stats[key]) {
        stats[key].count++;
        if (s.is_verified) {
          stats[key].verified++;
        } else {
          stats[key].pending++;
        }
      }
    });

    return Object.values(stats);
  }, [displaySupporters, timeRange]);

  // Constituency data - Pie chart friendly (8 items)
  const constituencyData = useMemo(() => {
    const stats: Record<string, number> = {};
    displaySupporters.forEach(s => {
      if (s.constituency) {
        stats[s.constituency] = (stats[s.constituency] || 0) + 1;
      }
    });
    return Object.entries(stats).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [displaySupporters]);

  // Ward data
  const wardData = useMemo(() => {
    const stats: Record<string, number> = {};
    displaySupporters.forEach(s => {
      if (s.ward) {
        stats[s.ward] = (stats[s.ward] || 0) + 1;
      }
    });
    return Object.entries(stats).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [displaySupporters]);

  // Top wards for display
  const topWardsData = useMemo(() => {
    if (wardData.length <= 15) return wardData;
    const top = wardData.slice(0, 15);
    const others = wardData.slice(15).reduce((sum, item) => sum + item.value, 0);
    if (others > 0) {
      top.push({ name: 'Others', value: others });
    }
    return top;
  }, [wardData]);

  // Map data
  const mapData = useMemo(() => {
    const total = displaySupporters.length;
    if (total === 0) return [];

    const constituencyCounts: Record<string, number> = {};
    displaySupporters.forEach(s => {
      if (s.constituency) {
        constituencyCounts[s.constituency] = (constituencyCounts[s.constituency] || 0) + 1;
      }
    });

    return Object.entries(constituencyCounts).map(([name, count]) => ({
      constituency: name,
      count,
      percentage: (count / total) * 100
    }));
  }, [displaySupporters]);

  // Device type distribution
  const deviceData = useMemo(() => {
    const devices = { Mobile: 0, Desktop: 0, Tablet: 0, Unknown: 0 };
    displaySupporters.forEach(s => {
      const userAgent = s.user_agent || '';
      if (userAgent) {
        if (userAgent.includes("Mobile")) devices.Mobile++;
        else if (userAgent.includes("Tablet")) devices.Tablet++;
        else if (userAgent.includes("Windows") || userAgent.includes("Mac") || userAgent.includes("Linux")) devices.Desktop++;
        else devices.Unknown++;
      } else {
        devices.Unknown++;
      }
    });
    return Object.entries(devices).map(([name, value]) => ({ name, value }));
  }, [displaySupporters]);

  // Risk distribution
  const riskData = useMemo(() => {
    const high = displaySupporters.filter(s => (s.bot_score || 0) < 40).length;
    const medium = displaySupporters.filter(s => (s.bot_score || 0) >= 40 && (s.bot_score || 0) < 70).length;
    const low = displaySupporters.filter(s => (s.bot_score || 0) >= 70).length;
    return [
      { name: 'High Risk', value: high },
      { name: 'Medium Risk', value: medium },
      { name: 'Low Risk', value: low }
    ];
  }, [displaySupporters]);

  // Event performance data
  const eventData = useMemo(() => {
    return events.map(event => {
      const registrations = eventRegistrations.filter(r => r.event_id === event.id);
      return {
        name: event.title.length > 20 ? event.title.substring(0, 20) + '...' : event.title,
        fullName: event.title,
        registrations: registrations.length,
        expected: event.expected_attendees || 0,
        rate: event.expected_attendees > 0 ? (registrations.length / event.expected_attendees) * 100 : 0
      };
    });
  }, [events, eventRegistrations]);

  // Verification status
  const verificationData = useMemo(() => {
    const verified = displaySupporters.filter(s => s.is_verified).length;
    const pending = displaySupporters.length - verified;
    return [
      { name: 'Verified', value: verified },
      { name: 'Pending', value: pending }
    ];
  }, [displaySupporters]);

  // Bot score distribution
  const botScoreData = useMemo(() => {
    const ranges = [
      { range: '0-20%', count: displaySupporters.filter(s => (s.bot_score || 0) < 20).length },
      { range: '20-40%', count: displaySupporters.filter(s => (s.bot_score || 0) >= 20 && (s.bot_score || 0) < 40).length },
      { range: '40-60%', count: displaySupporters.filter(s => (s.bot_score || 0) >= 40 && (s.bot_score || 0) < 60).length },
      { range: '60-80%', count: displaySupporters.filter(s => (s.bot_score || 0) >= 60 && (s.bot_score || 0) < 80).length },
      { range: '80-100%', count: displaySupporters.filter(s => (s.bot_score || 0) >= 80).length }
    ];
    return ranges;
  }, [displaySupporters]);

  // Update stats based on filtered data
  const filteredStats = useMemo(() => {
    const total = displaySupporters.length;
    const verified = displaySupporters.filter(s => s.is_verified).length;
    const pending = total - verified;
    const phoneVerified = displaySupporters.filter(s => s.phone_verified).length;
    const humanVerified = displaySupporters.filter(s => s.is_human).length;
    const avgBotScore = total > 0 ? displaySupporters.reduce((acc, s) => acc + (s.bot_score || 0), 0) / total : 0;
    const avgTimeSpent = total > 0 ? displaySupporters.reduce((acc, s) => acc + (s.time_spent || 0), 0) / total : 0;
    const humanVerificationRate = total > 0 ? (humanVerified / total) * 100 : 0;

    return { total, verified, pending, phoneVerified, avgBotScore, avgTimeSpent, humanVerificationRate };
  }, [displaySupporters]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-bg-dark/95 backdrop-blur-sm border border-gold/20 rounded-lg p-3 shadow-xl">
          <p className="text-text-light font-semibold">{label}</p>
          {payload.map((p: any, idx: number) => (
            <p key={idx} className="text-sm" style={{ color: p.color }}>
              {p.name}: {p.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderPieLabel = ({ name, percent }: any) => {
    const percentage = ((percent || 0) * 100).toFixed(0);
    if (parseInt(percentage) < 5) return '';
    return `${name}: ${percentage}%`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-text-dim">Loading campaign data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="flex items-center justify-center gap-2 text-red-400 mb-4">
          <AlertCircle className="h-8 w-8" />
          <p className="text-lg">{error}</p>
        </div>
        <button onClick={fetchAllData} className="flex items-center gap-2 mx-auto px-4 py-2 rounded-lg bg-gold text-bg-dark font-semibold hover:bg-gold-light transition-all">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Time Range Selector & Location View Toggle - Responsive */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-3 md:gap-4">
        <div className="flex flex-wrap gap-2 bg-bg-dark/50 rounded-lg border border-gold/20 p-1 w-full sm:w-auto">
          <button
            onClick={() => setLocationView("constituency")}
            className={`flex-1 sm:flex-none px-3 md:px-4 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all ${locationView === "constituency"
              ? "bg-gold text-bg-dark"
              : "text-text-dim hover:text-gold"
              }`}
          >
            <div className="flex items-center justify-center gap-1 md:gap-2">
              <Globe className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden xs:inline">Constituencies</span>
              <span className="xs:hidden">Const.</span>
              <span className="text-[10px] opacity-70">({stats.constituencies})</span>
            </div>
          </button>
          <button
            onClick={() => setLocationView("ward")}
            className={`flex-1 sm:flex-none px-3 md:px-4 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all ${locationView === "ward"
              ? "bg-gold text-bg-dark"
              : "text-text-dim hover:text-gold"
              }`}
          >
            <div className="flex items-center justify-center gap-1 md:gap-2">
              <Layers className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden xs:inline">Wards</span>
              <span className="xs:hidden">Wards</span>
              <span className="text-[10px] opacity-70">({stats.wards})</span>
            </div>
          </button>
          <button
            onClick={() => setShowMap(!showMap)}
            className={`flex-1 sm:flex-none px-3 md:px-4 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all ${showMap
              ? "bg-gold/20 text-gold"
              : "text-text-dim hover:text-gold"
              }`}
          >
            <div className="flex items-center justify-center gap-1 md:gap-2">
              <Map className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden xs:inline">Map</span>
              {showMap ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </div>
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {selectedConstituency && (
            <button
              onClick={() => setSelectedConstituency(null)}
              className="px-2 md:px-4 py-1.5 md:py-2 rounded-lg border border-gold/20 text-gold hover:bg-gold/10 transition-colors flex items-center gap-1 md:gap-2 text-xs md:text-sm"
            >
              <X className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden xs:inline">Clear: {selectedConstituency}</span>
              <span className="xs:hidden">Clear</span>
            </button>
          )}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="flex-1 sm:flex-none px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none text-xs md:text-sm"
          >
            <option value="24h">24h</option>
            <option value="7d">7d</option>
            <option value="30d">30d</option>
            <option value="90d">90d</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
        <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-2 md:p-4">
          <div className="flex items-center justify-between">
            <Users className="h-4 w-4 md:h-5 md:w-5 text-gold" />
            <span className="text-lg md:text-2xl font-bold text-text-light">{filteredStats.total.toLocaleString()}</span>
          </div>
          <p className="text-[10px] md:text-xs text-text-dim mt-0.5 md:mt-1">Total</p>
          <div className="mt-1 md:mt-2 h-1 w-full bg-bg-dark rounded-full overflow-hidden">
            <div className="h-full bg-gold rounded-full" style={{ width: '100%' }} />
          </div>
        </div>
        <div className="bg-bg-card/50 rounded-xl border border-green-500/20 p-2 md:p-4">
          <div className="flex items-center justify-between">
            <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-400" />
            <span className="text-lg md:text-2xl font-bold text-green-400">{filteredStats.verified.toLocaleString()}</span>
          </div>
          <p className="text-[10px] md:text-xs text-text-dim mt-0.5 md:mt-1">Verified</p>
          <div className="mt-1 md:mt-2 h-1 w-full bg-bg-dark rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: `${(filteredStats.verified / filteredStats.total) * 100}%` }} />
          </div>
        </div>
        <div className="bg-bg-card/50 rounded-xl border border-yellow-500/20 p-2 md:p-4">
          <div className="flex items-center justify-between">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" />
            <span className="text-lg md:text-2xl font-bold text-yellow-400">{filteredStats.pending.toLocaleString()}</span>
          </div>
          <p className="text-[10px] md:text-xs text-text-dim mt-0.5 md:mt-1">Pending</p>
        </div>
        <div className="bg-bg-card/50 rounded-xl border border-blue-500/20 p-2 md:p-4">
          <div className="flex items-center justify-between">
            <Smartphone className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
            <span className="text-lg md:text-2xl font-bold text-blue-400">{filteredStats.phoneVerified.toLocaleString()}</span>
          </div>
          <p className="text-[10px] md:text-xs text-text-dim mt-0.5 md:mt-1">Phone Verified</p>
        </div>
        <div className="bg-bg-card/50 rounded-xl border border-purple-500/20 p-2 md:p-4">
          <div className="flex items-center justify-between">
            <Shield className="h-4 w-4 md:h-5 md:w-5 text-purple-400" />
            <span className="text-lg md:text-2xl font-bold text-purple-400">{Math.round(filteredStats.humanVerificationRate)}%</span>
          </div>
          <p className="text-[10px] md:text-xs text-text-dim mt-0.5 md:mt-1">Human Verified</p>
        </div>
        <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-2 md:p-4">
          <div className="flex items-center justify-between">
            <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-gold" />
            <span className="text-lg md:text-2xl font-bold text-text-light">+{stats.thisWeek}</span>
          </div>
          <p className="text-[10px] md:text-xs text-text-dim mt-0.5 md:mt-1">This Week</p>
        </div>
      </div>

      {/* Map Section - Always visible, responsive */}
      <div className="relative z-0 bg-bg-card/50 rounded-xl border border-gold/20 p-3 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 md:mb-4">
          <div>
            <h3 className="font-montserrat text-base md:text-lg font-bold text-text-light flex items-center gap-2">
              <Map className="h-4 w-4 md:h-5 md:w-5 text-gold" />
              Kitui County Map
            </h3>
            <p className="text-text-dim text-[10px] md:text-sm">
              {selectedConstituency
                ? `Showing supporters in ${selectedConstituency}`
                : 'Click any constituency to filter supporters'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] md:text-xs text-text-dim">
            <span className="inline-flex items-center gap-1">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-sm bg-[#1a1a2e]" />
              <span className="hidden xs:inline">0%</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-sm bg-[#C17B2B]" />
              <span className="hidden xs:inline">100%</span>
            </span>
          </div>
        </div>
        <div className={`relative z-0 transition-all duration-500 ${showMap ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[16/10]">
            <KituiMap
              data={mapData}
              onConstituencyClick={(constituency) => {
                setSelectedConstituency(constituency === selectedConstituency ? null : constituency);
              }}
            />
          </div>
        </div>
        {!showMap && (
          <div className="text-center py-4 text-text-dim text-sm">
            <button onClick={() => setShowMap(true)} className="text-gold hover:underline">
              Tap to show map
            </button>
          </div>
        )}
      </div>

      {/* Charts Row 1 - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-4 md:p-6">
          <h3 className="font-montserrat text-base md:text-lg font-bold text-text-light mb-3 md:mb-4">Daily Registrations</h3>
          <div className="h-52 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyStats}>
                <defs>
                  <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C17B2B" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#C17B2B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="verifiedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="date" tick={{ fill: '#888888', fontSize: isMobile ? 8 : 10 }} tickMargin={5} />
                <YAxis tick={{ fill: '#888888', fontSize: isMobile ? 8 : 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: isMobile ? '8px' : '12px' }} />
                <Area type="monotone" dataKey="count" stroke="#C17B2B" fill="url(#totalGradient)" name="Total" />
                <Area type="monotone" dataKey="verified" stroke="#4ADE80" fill="url(#verifiedGradient)" name="Verified" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 md:mb-4">
            <h3 className="font-montserrat text-base md:text-lg font-bold text-text-light">
              {locationView === "constituency" ? "Constituency" : "Ward"} Distribution
            </h3>
            <div className="flex items-center gap-2 text-[10px] md:text-xs text-text-dim">
              <Building2 className="h-3 w-3 md:h-4 md:w-4 text-gold" />
              <span>{locationView === "constituency" ? `${stats.constituencies} constituencies` : `${stats.wards} wards`}</span>
            </div>
          </div>

          {locationView === "constituency" ? (
            <div className="h-52 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={constituencyData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={isMobile ? 60 : 80}
                    label={renderPieLabel}
                    labelLine={false}
                  >
                    {constituencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: isMobile ? '8px' : '12px' }} />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-52 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topWardsData}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: isMobile ? 40 : 60, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" horizontal={false} />
                  <XAxis type="number" tick={{ fill: '#888888', fontSize: isMobile ? 8 : 10 }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: '#888888', fontSize: isMobile ? 6 : 10 }}
                    width={isMobile ? 40 : 60}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#C17B2B" />
                </BarChart>
              </ResponsiveContainer>
              {wardData.length > 15 && (
                <div className="text-center text-[8px] md:text-[10px] text-text-dim mt-1 md:mt-2">
                  Showing top 15 wards of {wardData.length} total
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Charts Row 2 - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-4 md:p-6">
          <h3 className="font-montserrat text-sm md:text-lg font-bold text-text-light mb-3 md:mb-4">Risk Assessment</h3>
          <div className="h-44 md:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={riskData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 25 : 40}
                  outerRadius={isMobile ? 45 : 70}
                  label={renderPieLabel}
                >
                  <Cell fill={RISK_COLORS[0]} />
                  <Cell fill={RISK_COLORS[1]} />
                  <Cell fill={RISK_COLORS[2]} />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: isMobile ? '8px' : '12px' }} />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-4 md:p-6">
          <h3 className="font-montserrat text-sm md:text-lg font-bold text-text-light mb-3 md:mb-4">Verification Status</h3>
          <div className="h-44 md:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={verificationData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 25 : 40}
                  outerRadius={isMobile ? 45 : 70}
                  label={renderPieLabel}
                >
                  <Cell fill="#4ADE80" />
                  <Cell fill="#FBBF24" />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: isMobile ? '8px' : '12px' }} />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-4 md:p-6">
          <h3 className="font-montserrat text-sm md:text-lg font-bold text-text-light mb-3 md:mb-4">Device Distribution</h3>
          <div className="h-44 md:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={deviceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 25 : 40}
                  outerRadius={isMobile ? 45 : 70}
                  label={renderPieLabel}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: isMobile ? '8px' : '12px' }} />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 3 - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-4 md:p-6">
          <h3 className="font-montserrat text-base md:text-lg font-bold text-text-light mb-3 md:mb-4">Bot Score Distribution</h3>
          <div className="h-52 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={botScoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="range" tick={{ fill: '#888888', fontSize: isMobile ? 8 : 10 }} tickMargin={5} />
                <YAxis tick={{ fill: '#888888', fontSize: isMobile ? 8 : 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#C17B2B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-4 md:p-6">
          <h3 className="font-montserrat text-base md:text-lg font-bold text-text-light mb-3 md:mb-4">Event Performance</h3>
          <div className="h-52 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#888888', fontSize: isMobile ? 6 : 10 }}
                  interval={0}
                  angle={isMobile ? -30 : -15}
                  textAnchor="end"
                  height={isMobile ? 40 : 60}
                />
                <YAxis tick={{ fill: '#888888', fontSize: isMobile ? 8 : 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: isMobile ? '8px' : '12px' }} />
                <Bar dataKey="registrations" fill="#C17B2B" name="Registrations" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Metrics - Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
        <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-2 md:p-4">
          <div className="flex items-center gap-1 md:gap-2 text-text-dim">
            <Globe className="h-3 w-3 md:h-4 md:w-4 text-gold" />
            <span className="text-[10px] md:text-xs">Constituencies</span>
          </div>
          <p className="text-lg md:text-2xl font-bold text-text-light mt-0.5 md:mt-1">{stats.constituencies}</p>
        </div>
        <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-2 md:p-4">
          <div className="flex items-center gap-1 md:gap-2 text-text-dim">
            <Layers className="h-3 w-3 md:h-4 md:w-4 text-gold" />
            <span className="text-[10px] md:text-xs">Wards</span>
          </div>
          <p className="text-lg md:text-2xl font-bold text-text-light mt-0.5 md:mt-1">{stats.wards}</p>
        </div>
        <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-2 md:p-4">
          <div className="flex items-center gap-1 md:gap-2 text-text-dim">
            <Calendar className="h-3 w-3 md:h-4 md:w-4 text-gold" />
            <span className="text-[10px] md:text-xs">Events</span>
          </div>
          <p className="text-lg md:text-2xl font-bold text-text-light mt-0.5 md:mt-1">{stats.eventsCount}</p>
        </div>
        <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-2 md:p-4">
          <div className="flex items-center gap-1 md:gap-2 text-text-dim">
            <Users className="h-3 w-3 md:h-4 md:w-4 text-gold" />
            <span className="text-[10px] md:text-xs">Event Regs</span>
          </div>
          <p className="text-lg md:text-2xl font-bold text-text-light mt-0.5 md:mt-1">{stats.eventRegistrations}</p>
        </div>
      </div>

      {/* Recent Supporters Table - Responsive */}
      <div className="bg-bg-card/50 rounded-xl border border-gold/20 overflow-hidden">
        <div className="p-3 md:p-4 border-b border-gold/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="font-montserrat text-base md:text-lg font-bold text-text-light">Recent Supporters</h3>
            <p className="text-text-dim text-[10px] md:text-sm">
              Latest registrations with security insights
              {selectedConstituency && ` - Filtered by ${selectedConstituency}`}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] md:text-xs text-text-dim">{displaySupporters.length} supporters</span>
            {selectedConstituency && (
              <button
                onClick={() => setSelectedConstituency(null)}
                className="text-[10px] md:text-xs text-gold hover:underline"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm">
            <thead className="bg-gold/10">
              <tr>
                <th className="p-2 md:p-3 text-left font-semibold text-gold">Name</th>
                <th className="p-2 md:p-3 text-left font-semibold text-gold hidden sm:table-cell">Contact</th>
                <th className="p-2 md:p-3 text-left font-semibold text-gold hidden md:table-cell">Location</th>
                <th className="p-2 md:p-3 text-left font-semibold text-gold hidden lg:table-cell">Bot Score</th>
                <th className="p-2 md:p-3 text-left font-semibold text-gold">Risk</th>
                <th className="p-2 md:p-3 text-left font-semibold text-gold hidden xl:table-cell">Time</th>
                <th className="p-2 md:p-3 text-left font-semibold text-gold hidden sm:table-cell">Status</th>
                <th className="p-2 md:p-3 text-left font-semibold text-gold hidden lg:table-cell">Registered</th>
              </tr>
            </thead>
            <tbody>
              {displaySupporters.slice(0, 10).map((supporter) => {
                const risk = (supporter.bot_score || 0) < 40 ? 'High Risk' : (supporter.bot_score || 0) < 70 ? 'Medium Risk' : 'Low Risk';
                const color = risk === 'High Risk' ? 'text-red-400' : risk === 'Medium Risk' ? 'text-yellow-400' : 'text-green-400';
                const bg = risk === 'High Risk' ? 'bg-red-500/10' : risk === 'Medium Risk' ? 'bg-yellow-500/10' : 'bg-green-500/10';
                return (
                  <tr key={supporter.id} className="border-t border-gold/10 hover:bg-gold/5 transition-colors">
                    <td className="p-2 md:p-3 text-text-light font-medium max-w-[80px] truncate">{supporter.full_name}</td>
                    <td className="p-2 md:p-3 hidden sm:table-cell">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-text-dim text-[10px]">
                          <Mail className="h-2.5 w-2.5" />
                          <span className="truncate max-w-[100px]">{supporter.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-text-dim text-[10px]">
                          <PhoneCall className="h-2.5 w-2.5" />
                          <span>{supporter.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 md:p-3 text-text-dim text-[10px] md:text-xs hidden md:table-cell">
                      {supporter.constituency}
                      {supporter.ward && (
                        <span className="block text-[8px] text-text-dim/50">{supporter.ward}</span>
                      )}
                    </td>
                    <td className="p-2 md:p-3 hidden lg:table-cell">
                      <div className="flex items-center gap-1 md:gap-2">
                        <div className="w-8 md:w-12 h-1 bg-gold/20 rounded-full overflow-hidden">
                          <div className="h-full bg-gold rounded-full" style={{ width: `${supporter.bot_score || 0}%` }} />
                        </div>
                        <span className="text-text-light text-[10px] md:text-xs">{supporter.bot_score || 0}%</span>
                      </div>
                    </td>
                    <td className="p-2 md:p-3">
                      <span className={`inline-flex items-center gap-0.5 md:gap-1 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-[8px] md:text-xs ${bg} ${color}`}>
                        {risk === 'High Risk' ? <AlertTriangle className="h-2 w-2 md:h-3 md:w-3" /> :
                          risk === 'Medium Risk' ? <Clock className="h-2 w-2 md:h-3 md:w-3" /> :
                            <Shield className="h-2 w-2 md:h-3 md:w-3" />}
                        <span className="hidden xs:inline">{risk}</span>
                        <span className="xs:hidden">{risk.charAt(0)}</span>
                      </span>
                    </td>
                    <td className="p-2 md:p-3 text-text-dim text-[10px] md:text-xs hidden xl:table-cell">{supporter.time_spent || 0}s</td>
                    <td className="p-2 md:p-3 hidden sm:table-cell">
                      {supporter.is_verified ? (
                        <span className="inline-flex items-center gap-0.5 md:gap-1 text-green-400 text-[10px] md:text-xs">
                          <CheckCircle className="h-2 w-2 md:h-3 md:w-3" /> ✓
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 md:gap-1 text-yellow-400 text-[10px] md:text-xs">
                          <Clock className="h-2 w-2 md:h-3 md:w-3" /> ⏳
                        </span>
                      )}
                    </td>
                    <td className="p-2 md:p-3 text-text-dim text-[10px] md:text-xs hidden lg:table-cell">
                      {new Date(supporter.registered_at).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {displaySupporters.length > 10 && (
          <div className="p-2 md:p-4 border-t border-gold/20 text-center">
            <button className="text-gold text-[10px] md:text-sm hover:underline">View All {displaySupporters.length} Supporters</button>
          </div>
        )}
      </div>
    </div>
  );
}
