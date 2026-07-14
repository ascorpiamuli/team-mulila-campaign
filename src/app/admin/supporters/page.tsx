"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search, Download, CheckCircle, Clock, User, Mail, Phone, MapPin,
  Calendar, Shield, Fingerprint, Eye, ChevronDown, Filter, X,
  Check, AlertTriangle, FileSpreadsheet, Users, Globe, TrendingUp,
  Activity, Smartphone, Monitor, Mouse, Keyboard, Clock as ClockIcon,
  Award, Star, Loader2, RefreshCw, Wifi, Lock
} from "lucide-react";
import { supabase } from '../../../../lib/supabase/client';
import { useToast } from '../../../hooks/useToast';

interface Supporter {
  id: string;
  full_name: string;
  email: string | null;
  phone: string;
  id_number: string | null;
  county: string;
  constituency: string;
  ward: string;
  registered_at: string;
  is_verified: boolean;
  bot_score: number;
  is_human: boolean;
  mouse_movements: number;
  clicks: number;
  key_presses: number;
  time_spent: number;
  ip_address: string;
  user_agent: string;
  device_fingerprint: string;
  phone_verified: boolean;
  phone_verified_at: string | null;
  security_report: any;
}

interface VerificationStats {
  total: number;
  verified: number;
  pending: number;
  phoneVerified: number;
  humanVerified: number;
}

export default function AdminSupporters() {
  const { showToast } = useToast();
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [filteredSupporters, setFilteredSupporters] = useState<Supporter[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConstituency, setSelectedConstituency] = useState<string>("all");
  const [selectedWard, setSelectedWard] = useState<string>("all");
  const [selectedVerification, setSelectedVerification] = useState<string>("all");
  const [isVerifying, setIsVerifying] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>("registered_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  useEffect(() => {
    fetchSupporters();
  }, []);

  const fetchSupporters = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("campaign_supporters")
        .select("*")
        .order("registered_at", { ascending: false });

      if (error) throw error;
      setSupporters(data || []);
      setFilteredSupporters(data || []);
    } catch (error) {
      console.error("Error:", error);
      showToast("Failed to load supporters", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique constituencies and wards for filters
  const { constituencies, wards } = useMemo(() => {
    const uniqueConstituencies = new Set(supporters.map(s => s.constituency).filter(Boolean));
    const uniqueWards = new Set(supporters.map(s => s.ward).filter(Boolean));
    return {
      constituencies: Array.from(uniqueConstituencies).sort(),
      wards: Array.from(uniqueWards).sort()
    };
  }, [supporters]);

  // Get wards filtered by selected constituency
  const filteredWards = useMemo(() => {
    if (selectedConstituency === "all") return wards;
    const uniqueWards = new Set(
      supporters
        .filter(s => s.constituency === selectedConstituency)
        .map(s => s.ward)
        .filter(Boolean)
    );
    return Array.from(uniqueWards).sort();
  }, [supporters, selectedConstituency, wards]);

  // Calculate verification stats
  const stats: VerificationStats = useMemo(() => {
    const total = supporters.length;
    const verified = supporters.filter(s => s.is_verified).length;
    const pending = total - verified;
    const phoneVerified = supporters.filter(s => s.phone_verified).length;
    const humanVerified = supporters.filter(s => s.is_human).length;
    return { total, verified, pending, phoneVerified, humanVerified };
  }, [supporters]);

  // Handle verification
  const handleVerify = async (supporterId: string) => {
    setIsVerifying(supporterId);
    try {
      const { error } = await supabase
        .from("campaign_supporters")
        .update({
          is_verified: true,
          verified_at: new Date().toISOString()
        })
        .eq('id', supporterId);

      if (error) throw error;

      showToast("Supporter verified successfully!", "success");
      await fetchSupporters();
    } catch (error) {
      console.error("Verification error:", error);
      showToast("Failed to verify supporter", "error");
    } finally {
      setIsVerifying(null);
    }
  };

  // Handle unverify
  const handleUnverify = async (supporterId: string) => {
    if (!confirm("Are you sure you want to unverify this supporter?")) return;

    setIsVerifying(supporterId);
    try {
      const { error } = await supabase
        .from("campaign_supporters")
        .update({
          is_verified: false,
          verified_at: null
        })
        .eq('id', supporterId);

      if (error) throw error;

      showToast("Supporter unverified", "info");
      await fetchSupporters();
    } catch (error) {
      console.error("Unverify error:", error);
      showToast("Failed to unverify supporter", "error");
    } finally {
      setIsVerifying(null);
    }
  };

  // Search and filter
  useEffect(() => {
    let filtered = supporters;

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(s =>
        s.full_name?.toLowerCase().includes(term) ||
        s.email?.toLowerCase().includes(term) ||
        s.phone?.includes(term) ||
        s.constituency?.toLowerCase().includes(term) ||
        s.ward?.toLowerCase().includes(term) ||
        s.ip_address?.includes(term)
      );
    }

    // Filter by constituency
    if (selectedConstituency !== "all") {
      filtered = filtered.filter(s => s.constituency === selectedConstituency);
    }

    // Filter by ward
    if (selectedWard !== "all") {
      filtered = filtered.filter(s => s.ward === selectedWard);
    }

    // Filter by verification status
    if (selectedVerification === "verified") {
      filtered = filtered.filter(s => s.is_verified);
    } else if (selectedVerification === "pending") {
      filtered = filtered.filter(s => !s.is_verified);
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField as keyof Supporter];
      let bVal = b[sortField as keyof Supporter];

      if (typeof aVal === 'string') {
        return sortDirection === 'asc'
          ? (aVal || '').localeCompare(bVal || '')
          : (bVal || '').localeCompare(aVal || '');
      }
      if (typeof aVal === 'number') {
        return sortDirection === 'asc' ? (aVal || 0) - (bVal || 0) : (bVal || 0) - (aVal || 0);
      }
      return 0;
    });

    setFilteredSupporters(filtered);
  }, [supporters, searchTerm, selectedConstituency, selectedWard, selectedVerification, sortField, sortDirection]);

  // Export CSV - downloads filtered data
  const exportToCSV = () => {
    if (filteredSupporters.length === 0) {
      showToast("No data to export", "warning");
      return;
    }

    const headers = [
      'Full Name', 'Email', 'Phone', 'Constituency', 'Ward',
      'Registered Date', 'Status', 'Phone Verified', 'Human Verified',
      'Bot Score', 'IP Address', 'Device Fingerprint'
    ];

    const rows = filteredSupporters.map(s => [
      s.full_name || '',
      s.email || '',
      s.phone || '',
      s.constituency || '',
      s.ward || '',
      new Date(s.registered_at).toLocaleDateString(),
      s.is_verified ? 'Verified' : 'Pending',
      s.phone_verified ? 'Yes' : 'No',
      s.is_human ? 'Yes' : 'No',
      s.bot_score?.toString() || '0',
      s.ip_address || 'unknown',
      s.device_fingerprint ? s.device_fingerprint.slice(0, 16) + '...' : 'N/A'
    ]);

    const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `supporters_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    showToast(`Exported ${filteredSupporters.length} supporters`, "success");
  };

  // Toggle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedConstituency("all");
    setSelectedWard("all");
    setSelectedVerification("all");
  };

  // Toggle row expansion
  const toggleRowExpand = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent mx-auto" />
          <p className="text-text-dim">Loading supporters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
        <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-4">
          <div className="flex items-center justify-between">
            <Users className="h-5 w-5 text-gold" />
            <span className="text-2xl font-bold text-text-light">{stats.total}</span>
          </div>
          <p className="text-xs text-text-dim mt-1">Total Supporters</p>
        </div>
        <div className="bg-bg-card/50 rounded-xl border border-green-500/20 p-4">
          <div className="flex items-center justify-between">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span className="text-2xl font-bold text-green-400">{stats.verified}</span>
          </div>
          <p className="text-xs text-text-dim mt-1">Verified</p>
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
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-dim" />
            <input
              type="text"
              placeholder="Search by name, email, phone, IP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light placeholder:text-text-dim focus:border-gold focus:outline-none"
            />
          </div>

          <select
            value={selectedConstituency}
            onChange={(e) => {
              setSelectedConstituency(e.target.value);
              setSelectedWard("all");
            }}
            className="px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none min-w-[150px]"
          >
            <option value="all">All Constituencies</option>
            {constituencies.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none min-w-[150px]"
            disabled={selectedConstituency === "all" && filteredWards.length === 0}
          >
            <option value="all">All Wards</option>
            {filteredWards.map(w => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>

          <select
            value={selectedVerification}
            onChange={(e) => setSelectedVerification(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none min-w-[130px]"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
          </select>

          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-lg border border-gold/20 text-text-dim hover:text-gold transition-colors flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/20 text-gold hover:bg-gold/30 transition-all"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export CSV ({filteredSupporters.length})
          </button>
          <button
            onClick={fetchSupporters}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-dark/50 border border-gold/20 text-text-dim hover:text-gold transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <span className="text-xs text-text-dim self-center ml-2">
            {filteredSupporters.length} of {supporters.length} supporters shown
          </span>
        </div>
      </div>

      {/* Supporters Table */}
      <div className="bg-bg-card/50 rounded-xl border border-gold/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gold/10 border-b border-gold/20 sticky top-0 z-10">
              <tr>
                <th className="p-3 text-left text-xs font-semibold text-gold cursor-pointer hover:text-gold/80" onClick={() => handleSort('full_name')}>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Name
                    {sortField === 'full_name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </div>
                </th>
                <th className="p-3 text-left text-xs font-semibold text-gold cursor-pointer hover:text-gold/80" onClick={() => handleSort('email')}>
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email
                    {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </div>
                </th>
                <th className="p-3 text-left text-xs font-semibold text-gold cursor-pointer hover:text-gold/80" onClick={() => handleSort('phone')}>
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    Phone
                    {sortField === 'phone' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </div>
                </th>
                <th className="p-3 text-left text-xs font-semibold text-gold cursor-pointer hover:text-gold/80" onClick={() => handleSort('constituency')}>
                  <div className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    Constituency
                    {sortField === 'constituency' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </div>
                </th>
                <th className="p-3 text-left text-xs font-semibold text-gold cursor-pointer hover:text-gold/80" onClick={() => handleSort('ward')}>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Ward
                    {sortField === 'ward' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </div>
                </th>
                <th className="p-3 text-left text-xs font-semibold text-gold cursor-pointer hover:text-gold/80" onClick={() => handleSort('registered_at')}>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Registered
                    {sortField === 'registered_at' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </div>
                </th>
                <th className="p-3 text-left text-xs font-semibold text-gold">Security</th>
                <th className="p-3 text-left text-xs font-semibold text-gold">Status</th>
                <th className="p-3 text-left text-xs font-semibold text-gold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSupporters.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center p-8 text-text-dim">
                    {searchTerm || selectedConstituency !== "all" || selectedWard !== "all" || selectedVerification !== "all"
                      ? "No supporters match your filters"
                      : "No supporters registered yet"}
                  </td>
                </tr>
              ) : (
                filteredSupporters.map((s) => (
                  <React.Fragment key={s.id}>
                    <tr className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                      <td className="p-3 text-text-light font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleRowExpand(s.id)}
                            className="text-text-dim hover:text-gold transition-colors"
                          >
                            <ChevronDown className={`h-4 w-4 transition-transform ${expandedRow === s.id ? 'rotate-180' : ''}`} />
                          </button>
                          <span>{s.full_name}</span>
                          {s.is_human && (
                            <span className="text-[10px] text-green-400" aria-label="Human verified">✓</span>
                          )}
                        </div>
                        <div className="text-[10px] text-text-dim/50 ml-6">{s.id.slice(0, 8)}...</div>
                      </td>
                      <td className="p-3 text-text-dim">{s.email || '—'}</td>
                      <td className="p-3 text-text-dim font-mono text-xs">
                        {s.phone}
                        {s.phone_verified && (
                          <span className="ml-1 text-[10px] text-blue-400" aria-label="Phone verified">📱</span>
                        )}
                      </td>
                      <td className="p-3 text-text-dim">{s.constituency}</td>
                      <td className="p-3 text-text-dim">{s.ward}</td>
                      <td className="p-3 text-text-dim text-xs">
                        {new Date(s.registered_at).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${s.is_human ? 'bg-green-400' : 'bg-red-400'}`} />
                          <span className="text-[10px] text-text-dim">{s.bot_score}%</span>
                          {s.ip_address && (
                            <span className="inline-block ml-1" title={`IP: ${s.ip_address}`}>
                              <Wifi className="h-3 w-3 text-text-dim/30" />
                            </span>
                          )}
                          {s.device_fingerprint && (
                            <span className="inline-block" title="Device fingerprint">
                              <Fingerprint className="h-3 w-3 text-text-dim/30" />
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        {s.is_verified ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-xs border border-green-500/20">
                            <CheckCircle className="h-3 w-3" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs border border-yellow-500/20">
                            <Clock className="h-3 w-3" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        {s.is_verified ? (
                          <button
                            onClick={() => handleUnverify(s.id)}
                            disabled={isVerifying === s.id}
                            className="px-3 py-1 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-xs flex items-center gap-1"
                          >
                            {isVerifying === s.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <X className="h-3 w-3" />
                            )}
                            Unverify
                          </button>
                        ) : (
                          <button
                            onClick={() => handleVerify(s.id)}
                            disabled={isVerifying === s.id}
                            className="px-3 py-1 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors text-xs flex items-center gap-1"
                          >
                            {isVerifying === s.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Check className="h-3 w-3" />
                            )}
                            Verify
                          </button>
                        )}
                      </td>
                    </tr>
                    {/* Expanded Row - Security Details */}
                    {expandedRow === s.id && (
                      <tr className="bg-gold/5">
                        <td colSpan={9} className="p-4 border-b border-gold/10">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                            <div className="bg-bg-dark/50 p-3 rounded-lg border border-gold/10">
                              <p className="text-text-dim mb-1">IP Address</p>
                              <p className="text-text-light font-mono">{s.ip_address || 'N/A'}</p>
                            </div>
                            <div className="bg-bg-dark/50 p-3 rounded-lg border border-gold/10">
                              <p className="text-text-dim mb-1">Device Fingerprint</p>
                              <p className="text-text-light font-mono text-[10px] break-all">{s.device_fingerprint || 'N/A'}</p>
                            </div>
                            <div className="bg-bg-dark/50 p-3 rounded-lg border border-gold/10">
                              <p className="text-text-dim mb-1">Bot Score</p>
                              <p className="text-text-light">{s.bot_score}%</p>
                              <div className="w-full h-1.5 bg-bg-dark rounded-full mt-1 overflow-hidden">
                                <div className={`h-full rounded-full ${s.bot_score >= 70 ? 'bg-green-400' : s.bot_score >= 40 ? 'bg-yellow-400' : 'bg-red-400'}`} style={{ width: `${s.bot_score}%` }} />
                              </div>
                            </div>
                            <div className="bg-bg-dark/50 p-3 rounded-lg border border-gold/10 col-span-2">
                              <p className="text-text-dim mb-1">User Agent</p>
                              <p className="text-text-light text-[10px] break-all">{s.user_agent || 'N/A'}</p>
                            </div>

                            <div className="bg-bg-dark/50 p-3 rounded-lg border border-gold/10">
                              <p className="text-text-dim mb-1">Human Verified</p>
                              <p className={`font-semibold ${s.is_human ? 'text-green-400' : 'text-red-400'}`}>
                                {s.is_human ? '✓ Yes' : '✗ No'}
                              </p>
                            </div>
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

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-text-dim">
        <div>
          Showing <span className="text-text-light font-semibold">{filteredSupporters.length}</span> of{' '}
          <span className="text-text-light font-semibold">{supporters.length}</span> supporters
        </div>
      </div>
    </div>
  );
}
