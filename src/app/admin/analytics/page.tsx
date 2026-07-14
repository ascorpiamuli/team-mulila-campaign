"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart3, Users, Smartphone, Fingerprint, AlertTriangle,
  TrendingUp, Calendar, Clock, MapPin, Globe, Shield,
  CheckCircle, XCircle, Activity, PieChart, ArrowUp,
  ArrowDown, Filter, Download, RefreshCw, Eye,
  ChevronDown, Loader2, UserX, UserCheck, Wifi,
  CalendarDays, TrendingDown, Award, Target
} from "lucide-react";
import { supabase } from '../../../../lib/supabase/client';
import { useToast } from '../../../hooks/useToast';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart as RePieChart, Pie, Cell,
  LineChart, Line, AreaChart, Area, ComposedChart,
  RadialBarChart, RadialBar, ScatterChart, Scatter
} from 'recharts';

interface Supporter {
  id: string;
  full_name: string;
  email: string | null;
  phone: string;
  constituency: string;
  ward: string;
  registered_at: string;
  is_verified: boolean;
  bot_score: number;
  is_human: boolean;
  device_fingerprint: string;
  ip_address: string;
  phone_verified: boolean;
  time_spent: number;
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

interface DeviceGroup {
  fingerprint: string;
  count: number;
  supporters: Supporter[];
  ip_addresses: string[];
  first_seen: string;
  last_seen: string;
}

interface ConstituencyStats {
  name: string;
  count: number;
  verified: number;
  pending: number;
}

interface DailyStats {
  date: string;
  count: number;
  verified: number;
  pending: number;
}

const COLORS = ['#C17B2B', '#E6A856', '#F5C842', '#D4A02B', '#B8860B', '#8B6914', '#6B4F10', '#4A3508'];

export default function AdminAnalytics() {
  const { showToast } = useToast();
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");
  const [viewMode, setViewMode] = useState<"overview" | "devices" | "duplicates" | "events">("overview");
  const [expandedDevice, setExpandedDevice] = useState<string | null>(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
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
    } catch (error) {
      console.error("Error fetching data:", error);
      showToast("Failed to load analytics data", "error");
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

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredSupporters.length;
    const verified = filteredSupporters.filter(s => s.is_verified).length;
    const pending = total - verified;
    const phoneVerified = filteredSupporters.filter(s => s.phone_verified).length;
    const humanVerified = filteredSupporters.filter(s => s.is_human).length;
    const avgBotScore = total > 0 ? filteredSupporters.reduce((sum, s) => sum + s.bot_score, 0) / total : 0;
    const avgTimeSpent = total > 0 ? filteredSupporters.reduce((sum, s) => sum + s.time_spent, 0) / total : 0;

    return {
      total,
      verified,
      pending,
      phoneVerified,
      humanVerified,
      avgBotScore,
      avgTimeSpent,
      verificationRate: total > 0 ? (verified / total) * 100 : 0,
      humanRate: total > 0 ? (humanVerified / total) * 100 : 0
    };
  }, [filteredSupporters]);

  // Group by device fingerprint
  const deviceGroups = useMemo(() => {
    const groups: Record<string, DeviceGroup> = {};

    filteredSupporters.forEach(s => {
      if (!s.device_fingerprint) return;

      if (!groups[s.device_fingerprint]) {
        groups[s.device_fingerprint] = {
          fingerprint: s.device_fingerprint,
          count: 0,
          supporters: [],
          ip_addresses: [],
          first_seen: s.registered_at,
          last_seen: s.registered_at
        };
      }

      groups[s.device_fingerprint].count++;
      groups[s.device_fingerprint].supporters.push(s);
      if (s.ip_address && !groups[s.device_fingerprint].ip_addresses.includes(s.ip_address)) {
        groups[s.device_fingerprint].ip_addresses.push(s.ip_address);
      }

      if (new Date(s.registered_at) < new Date(groups[s.device_fingerprint].first_seen)) {
        groups[s.device_fingerprint].first_seen = s.registered_at;
      }
      if (new Date(s.registered_at) > new Date(groups[s.device_fingerprint].last_seen)) {
        groups[s.device_fingerprint].last_seen = s.registered_at;
      }
    });

    return Object.values(groups).sort((a, b) => b.count - a.count);
  }, [filteredSupporters]);

  // Duplicate devices
  const duplicateDevices = useMemo(() => {
    return deviceGroups.filter(g => g.count > 1);
  }, [deviceGroups]);

  // Constituency breakdown
  const constituencyStats = useMemo(() => {
    const stats: Record<string, ConstituencyStats> = {};

    filteredSupporters.forEach(s => {
      if (!s.constituency) return;
      if (!stats[s.constituency]) {
        stats[s.constituency] = { name: s.constituency, count: 0, verified: 0, pending: 0 };
      }
      stats[s.constituency].count++;
      if (s.is_verified) {
        stats[s.constituency].verified++;
      } else {
        stats[s.constituency].pending++;
      }
    });

    return Object.values(stats).sort((a, b) => b.count - a.count);
  }, [filteredSupporters]);

  // Daily registration stats
  const dailyStats = useMemo(() => {
    const stats: Record<string, DailyStats> = {};
    const now = new Date();
    const days = timeRange === "24h" ? 1 : timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split('T')[0];
      stats[key] = { date: key, count: 0, verified: 0, pending: 0 };
    }

    filteredSupporters.forEach(s => {
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
  }, [filteredSupporters, timeRange]);

  // Event statistics
  const eventStats = useMemo(() => {
    return events.map(event => {
      const registrations = eventRegistrations.filter(r => r.event_id === event.id);
      return {
        ...event,
        registrations: registrations.length,
        registrationRate: event.expected_attendees > 0 ? (registrations.length / event.expected_attendees) * 100 : 0,
        registrants: registrations
      };
    });
  }, [events, eventRegistrations]);

  // Export analytics
  const exportAnalytics = () => {
    const headers = [
      "Date", "Total Registrations", "Verified", "Pending",
      "Phone Verified", "Human Verified", "Avg Bot Score", "Avg Time Spent"
    ];

    const rows = dailyStats.map(day => [
      day.date,
      day.count,
      day.verified,
      day.pending,
      stats.phoneVerified,
      stats.humanVerified,
      stats.avgBotScore.toFixed(1),
      stats.avgTimeSpent.toFixed(0)
    ]);

    const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Analytics exported successfully!", "success");
  };

  // Custom tooltip for charts
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

  // Custom label for pie charts
  const renderPieLabel = ({ name, percent }: any) => {
    return `${name}: ${(percent * 100).toFixed(0)}%`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent mx-auto" />
          <p className="text-text-dim">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-montserrat text-2xl font-bold text-gold">Analytics Dashboard</h1>
          <p className="text-text-dim text-sm mt-1">Comprehensive analytics with graphical insights</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-1 bg-bg-dark/50 rounded-lg border border-gold/20 p-1">
            {["overview", "events", "devices", "duplicates"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === mode
                    ? "bg-gold text-bg-dark"
                    : "text-text-dim hover:text-gold"
                  }`}
              >
                {mode === "overview" && "Overview"}
                {mode === "events" && "Events"}
                {mode === "devices" && "Devices"}
                {mode === "duplicates" && "Duplicates"}
              </button>
            ))}
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
          <button
            onClick={exportAnalytics}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/20 text-gold hover:bg-gold/30 transition-all"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          <button
            onClick={fetchAllData}
            className="p-2 rounded-lg border border-gold/20 text-text-dim hover:text-gold hover:bg-gold/10 transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {viewMode === "overview" && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-4">
              <div className="flex items-center justify-between">
                <Users className="h-5 w-5 text-gold" />
                <span className="text-2xl font-bold text-text-light">{stats.total}</span>
              </div>
              <p className="text-xs text-text-dim mt-1">Total Registrations</p>
              <div className="mt-2 h-1 w-full bg-bg-dark rounded-full overflow-hidden">
                <div className="h-full bg-gold rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="bg-bg-card/50 rounded-xl border border-green-500/20 p-4">
              <div className="flex items-center justify-between">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-2xl font-bold text-green-400">{stats.verified}</span>
              </div>
              <p className="text-xs text-text-dim mt-1">Verified</p>
              <div className="mt-2 h-1 w-full bg-bg-dark rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${stats.verificationRate}%` }} />
              </div>
            </div>
            <div className="bg-bg-card/50 rounded-xl border border-yellow-500/20 p-4">
              <div className="flex items-center justify-between">
                <Clock className="h-5 w-5 text-yellow-400" />
                <span className="text-2xl font-bold text-yellow-400">{stats.pending}</span>
              </div>
              <p className="text-xs text-text-dim mt-1">Pending</p>
            </div>
            <div className="bg-bg-card/50 rounded-xl border border-blue-500/20 p-4">
              <div className="flex items-center justify-between">
                <Smartphone className="h-5 w-5 text-blue-400" />
                <span className="text-2xl font-bold text-blue-400">{stats.phoneVerified}</span>
              </div>
              <p className="text-xs text-text-dim mt-1">Phone Verified</p>
            </div>
            <div className="bg-bg-card/50 rounded-xl border border-purple-500/20 p-4">
              <div className="flex items-center justify-between">
                <Shield className="h-5 w-5 text-purple-400" />
                <span className="text-2xl font-bold text-purple-400">{stats.humanVerified}</span>
              </div>
              <p className="text-xs text-text-dim mt-1">Human Verified</p>
            </div>
            <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-4">
              <div className="flex items-center justify-between">
                <Target className="h-5 w-5 text-gold" />
                <span className="text-2xl font-bold text-text-light">{stats.verificationRate.toFixed(0)}%</span>
              </div>
              <p className="text-xs text-text-dim mt-1">Verification Rate</p>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Registrations - Area Chart */}
            <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-6">
              <h3 className="font-montserrat text-lg font-bold text-text-light mb-4">Daily Registrations</h3>
              <div className="h-72">
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
                    <XAxis dataKey="date" tick={{ fill: '#888888', fontSize: 10 }} />
                    <YAxis tick={{ fill: '#888888', fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area type="monotone" dataKey="count" stroke="#C17B2B" fill="url(#totalGradient)" name="Total" />
                    <Area type="monotone" dataKey="verified" stroke="#4ADE80" fill="url(#verifiedGradient)" name="Verified" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Constituency Pie Chart */}
            <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-6">
              <h3 className="font-montserrat text-lg font-bold text-text-light mb-4">Registrations by Constituency</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={constituencyStats}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={renderPieLabel}
                      labelLine={false}
                    >
                      {constituencyStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Human vs Bot - Pie Chart */}
            <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-6">
              <h3 className="font-montserrat text-lg font-bold text-text-light mb-4">Human vs Bot Detection</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={[
                        { name: 'Human', value: stats.humanVerified },
                        { name: 'Bot', value: stats.total - stats.humanVerified }
                      ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      label={renderPieLabel}
                    >
                      <Cell fill="#4ADE80" />
                      <Cell fill="#F87171" />
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Phone Verification - Donut Chart */}
            <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-6">
              <h3 className="font-montserrat text-lg font-bold text-text-light mb-4">Phone Verification</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={[
                        { name: 'Verified', value: stats.phoneVerified },
                        { name: 'Not Verified', value: stats.total - stats.phoneVerified }
                      ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      label={renderPieLabel}
                    >
                      <Cell fill="#60A5FA" />
                      <Cell fill="#FBBF24" />
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Bot Score Distribution */}
          <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-6">
            <h3 className="font-montserrat text-lg font-bold text-text-light mb-4">Bot Score Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { range: '0-20%', count: filteredSupporters.filter(s => s.bot_score < 20).length },
                  { range: '20-40%', count: filteredSupporters.filter(s => s.bot_score >= 20 && s.bot_score < 40).length },
                  { range: '40-60%', count: filteredSupporters.filter(s => s.bot_score >= 40 && s.bot_score < 60).length },
                  { range: '60-80%', count: filteredSupporters.filter(s => s.bot_score >= 60 && s.bot_score < 80).length },
                  { range: '80-100%', count: filteredSupporters.filter(s => s.bot_score >= 80).length }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="range" tick={{ fill: '#888888', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#888888', fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill="#C17B2B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {viewMode === "events" && (
        <div className="space-y-6">
          {/* Event Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-4">
              <div className="flex items-center justify-between">
                <Calendar className="h-5 w-5 text-gold" />
                <span className="text-2xl font-bold text-text-light">{events.length}</span>
              </div>
              <p className="text-xs text-text-dim mt-1">Total Events</p>
            </div>
            <div className="bg-bg-card/50 rounded-xl border border-blue-500/20 p-4">
              <div className="flex items-center justify-between">
                <Users className="h-5 w-5 text-blue-400" />
                <span className="text-2xl font-bold text-blue-400">{eventRegistrations.length}</span>
              </div>
              <p className="text-xs text-text-dim mt-1">Total Registrations</p>
            </div>
            <div className="bg-bg-card/50 rounded-xl border border-green-500/20 p-4">
              <div className="flex items-center justify-between">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-2xl font-bold text-green-400">
                  {events.length > 0 ? (eventRegistrations.length / events.length).toFixed(1) : 0}
                </span>
              </div>
              <p className="text-xs text-text-dim mt-1">Avg per Event</p>
            </div>
            <div className="bg-bg-card/50 rounded-xl border border-purple-500/20 p-4">
              <div className="flex items-center justify-between">
                <Award className="h-5 w-5 text-purple-400" />
                <span className="text-2xl font-bold text-purple-400">
                  {eventStats.length > 0 ? Math.max(...eventStats.map(e => e.registrations)) : 0}
                </span>
              </div>
              <p className="text-xs text-text-dim mt-1">Most Popular Event</p>
            </div>
          </div>

          {/* Event Performance Chart */}
          <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-6">
            <h3 className="font-montserrat text-lg font-bold text-text-light mb-4">Event Performance</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={eventStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="title" tick={{ fill: '#888888', fontSize: 10 }} interval={0} angle={-15} textAnchor="end" />
                  <YAxis yAxisId="left" tick={{ fill: '#888888', fontSize: 10 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: '#888888', fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="registrations" fill="#C17B2B" name="Registrations" />
                  <Line yAxisId="right" type="monotone" dataKey="registrationRate" stroke="#4ADE80" name="Registration Rate %" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Event Details Table */}
          <div className="bg-bg-card/50 rounded-xl border border-gold/20 overflow-hidden">
            <div className="p-4 border-b border-gold/20">
              <h3 className="font-montserrat text-lg font-bold text-text-light">Event Details</h3>
              <p className="text-text-dim text-sm">Registration breakdown by event</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gold/10">
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold text-gold">Event</th>
                    <th className="p-4 text-left text-sm font-semibold text-gold">Type</th>
                    <th className="p-4 text-left text-sm font-semibold text-gold">Date</th>
                    <th className="p-4 text-left text-sm font-semibold text-gold">Expected</th>
                    <th className="p-4 text-left text-sm font-semibold text-gold">Registered</th>
                    <th className="p-4 text-left text-sm font-semibold text-gold">Rate</th>
                    <th className="p-4 text-left text-sm font-semibold text-gold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {eventStats.map((event) => (
                    <tr key={event.id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                      <td className="p-4 text-text-light font-medium">{event.title}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-gold/10 text-gold">
                          {event.type}
                        </span>
                      </td>
                      <td className="p-4 text-text-dim text-sm">{new Date(event.date).toLocaleDateString()}</td>
                      <td className="p-4 text-text-dim">{event.expected_attendees?.toLocaleString() || 'N/A'}</td>
                      <td className="p-4 text-text-light font-bold">{event.registrations}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-bg-dark rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gold rounded-full"
                              style={{ width: `${Math.min(event.registrationRate, 100)}%` }}
                            />
                          </div>
                          <span className="text-text-dim text-xs">{event.registrationRate.toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${event.registrationRate >= 50 ? 'bg-green-500/10 text-green-400' :
                            event.registrationRate >= 25 ? 'bg-yellow-500/10 text-yellow-400' :
                              'bg-red-500/10 text-red-400'
                          }`}>
                          {event.registrationRate >= 50 ? '✅ High' :
                            event.registrationRate >= 25 ? '📊 Medium' : '📉 Low'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {viewMode === "devices" && (
        <div className="bg-bg-card/50 rounded-xl border border-gold/20 overflow-hidden">
          <div className="p-4 border-b border-gold/20">
            <h3 className="font-montserrat text-lg font-bold text-text-light">Device Fingerprint Analysis</h3>
            <p className="text-text-dim text-sm">All devices used for registration</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gold/10">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-gold">Device ID</th>
                  <th className="p-4 text-left text-sm font-semibold text-gold">Registrations</th>
                  <th className="p-4 text-left text-sm font-semibold text-gold">IP Addresses</th>
                  <th className="p-4 text-left text-sm font-semibold text-gold">First Seen</th>
                  <th className="p-4 text-left text-sm font-semibold text-gold">Last Seen</th>
                  <th className="p-4 text-left text-sm font-semibold text-gold">Status</th>
                  <th className="p-4 text-left text-sm font-semibold text-gold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deviceGroups.map((device) => (
                  <React.Fragment key={device.fingerprint}>
                    <tr className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                      <td className="p-4 text-text-light font-mono text-xs">
                        {device.fingerprint.slice(0, 16)}...
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${device.count > 1 ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                          {device.count}
                        </span>
                      </td>
                      <td className="p-4 text-text-dim">{device.ip_addresses.length} unique</td>
                      <td className="p-4 text-text-dim text-sm">{new Date(device.first_seen).toLocaleDateString()}</td>
                      <td className="p-4 text-text-dim text-sm">{new Date(device.last_seen).toLocaleDateString()}</td>
                      <td className="p-4">
                        {device.count > 1 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs">
                            <AlertTriangle className="h-3 w-3" />
                            Potential Duplicate
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
                            <CheckCircle className="h-3 w-3" />
                            Unique
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setExpandedDevice(expandedDevice === device.fingerprint ? null : device.fingerprint)}
                          className="text-gold hover:text-gold-light transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                    {expandedDevice === device.fingerprint && (
                      <tr>
                        <td colSpan={7} className="p-4 bg-gold/5 border-b border-gold/10">
                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-gold mb-2">Registrations from this device:</p>
                            {device.supporters.map((s, idx) => (
                              <div key={idx} className="flex items-center gap-4 text-sm bg-bg-dark/30 p-2 rounded">
                                <span className="text-text-light">{s.full_name}</span>
                                <span className="text-text-dim">{s.email || 'No email'}</span>
                                <span className="text-text-dim">{s.phone}</span>
                                <span className="text-text-dim">{s.constituency}</span>
                                <span className="text-text-dim text-xs">
                                  {new Date(s.registered_at).toLocaleString()}
                                </span>
                              </div>
                            ))}
                            <p className="text-xs text-text-dim mt-2">
                              <span className="font-semibold">IP Addresses:</span> {device.ip_addresses.join(', ')}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewMode === "duplicates" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-bg-card/50 rounded-xl border border-red-500/20 p-4">
              <div className="flex items-center justify-between">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <span className="text-2xl font-bold text-red-400">{duplicateDevices.length}</span>
              </div>
              <p className="text-xs text-text-dim mt-1">Devices with Duplicate Registrations</p>
            </div>
            <div className="bg-bg-card/50 rounded-xl border border-red-500/20 p-4">
              <div className="flex items-center justify-between">
                <Users className="h-5 w-5 text-red-400" />
                <span className="text-2xl font-bold text-red-400">
                  {duplicateDevices.reduce((sum, d) => sum + d.count, 0)}
                </span>
              </div>
              <p className="text-xs text-text-dim mt-1">Total Duplicate Registrations</p>
            </div>
            <div className="bg-bg-card/50 rounded-xl border border-red-500/20 p-4">
              <div className="flex items-center justify-between">
                <UserX className="h-5 w-5 text-red-400" />
                <span className="text-2xl font-bold text-red-400">
                  {duplicateDevices.reduce((sum, d) => sum + d.count - 1, 0)}
                </span>
              </div>
              <p className="text-xs text-text-dim mt-1">Extra Registrations</p>
            </div>
          </div>

          <div className="bg-bg-card/50 rounded-xl border border-gold/20 overflow-hidden">
            <div className="p-4 border-b border-gold/20">
              <h3 className="font-montserrat text-lg font-bold text-text-light">Duplicate Registrations Detected</h3>
              <p className="text-text-dim text-sm">Devices with multiple registrations - possible duplicate submissions</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gold/10">
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold text-gold">Device</th>
                    <th className="p-4 text-left text-sm font-semibold text-gold">Registrations</th>
                    <th className="p-4 text-left text-sm font-semibold text-gold">Unique IPs</th>
                    <th className="p-4 text-left text-sm font-semibold text-gold">First - Last</th>
                    <th className="p-4 text-left text-sm font-semibold text-gold">Supporters</th>
                    <th className="p-4 text-left text-sm font-semibold text-gold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {duplicateDevices.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center p-8 text-green-400">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                        No duplicate registrations detected! All devices are unique.
                      </td>
                    </tr>
                  ) : (
                    duplicateDevices.map((device) => (
                      <React.Fragment key={device.fingerprint}>
                        <tr className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                          <td className="p-4 text-text-light font-mono text-xs">
                            {device.fingerprint.slice(0, 20)}...
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
                              {device.count}
                            </span>
                          </td>
                          <td className="p-4 text-text-dim">{device.ip_addresses.length}</td>
                          <td className="p-4 text-text-dim text-sm">
                            {new Date(device.first_seen).toLocaleDateString()} - {new Date(device.last_seen).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-text-dim">
                            {device.supporters.map(s => s.full_name).join(', ')}
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => setExpandedDevice(expandedDevice === device.fingerprint ? null : device.fingerprint)}
                              className="text-gold hover:text-gold-light transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                        {expandedDevice === device.fingerprint && (
                          <tr>
                            <td colSpan={6} className="p-4 bg-red-500/5 border-b border-gold/10">
                              <div className="space-y-2">
                                <p className="text-xs font-semibold text-red-400 mb-2">⚠️ All registrations from this device:</p>
                                {device.supporters.map((s, idx) => (
                                  <div key={idx} className="flex items-center gap-4 text-sm bg-bg-dark/30 p-2 rounded">
                                    <span className="text-text-light">{s.full_name}</span>
                                    <span className="text-text-dim">{s.email || 'No email'}</span>
                                    <span className="text-text-dim">{s.phone}</span>
                                    <span className="text-text-dim">{s.constituency}</span>
                                    <span className="text-text-dim text-xs">
                                      {new Date(s.registered_at).toLocaleString()}
                                    </span>
                                    <span className={`text-xs ${s.is_verified ? 'text-green-400' : 'text-yellow-400'}`}>
                                      {s.is_verified ? '✅ Verified' : '⏳ Pending'}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
