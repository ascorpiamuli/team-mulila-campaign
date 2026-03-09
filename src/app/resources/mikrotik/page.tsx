"use client";
// src/app/resources/mikrotik/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import {
  Wifi,
  Shield,
  Settings,
  BookOpen,
  ChevronRight,
  Home,
  Router,
  Code2,
  Layers,
  Key,
  Users,
  Database,
  GitBranch,
  Terminal,
  Clock,
  GraduationCap,
  Download,
  ExternalLink,
  Menu as MenuIcon,
  X
} from "lucide-react";
import React, { useState } from 'react';


interface GuideCard {
  title: string;
  description: string;
  icon: any;
  href: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  tags: string[];
}

const guides: GuideCard[] = [
  {
    title: "API Complete Setup",
    description: "Master MikroTik RouterOS API from basics to advanced automation. Learn secure configuration, authentication, and integration.",
    icon: Code2,
    href: "/resources/mikrotik/api-setup",
    difficulty: "Advanced",
    time: "45 min",
    tags: ["API", "Automation", "Security"]
  },
  {
    title: "VLAN Management",
    description: "Complete guide to VLAN configuration including bridge VLAN filtering, inter-VLAN routing, trunk ports, and security best practices.",
    icon: Layers,
    href: "/resources/mikrotik/vlan-setup",
    difficulty: "Intermediate",
    time: "35 min",
    tags: ["VLAN", "Networking", "Security"]
  },
  {
    title: "HotSpot Setup",
    description: "Set up a professional captive portal with authentication, user management, RADIUS integration, and customizable login pages.",
    icon: Wifi,
    href: "/resources/mikrotik/hotspot",
    difficulty: "Intermediate",
    time: "40 min",
    tags: ["HotSpot", "WiFi", "Authentication"]
  }
];

const DifficultyBadge = ({ level }: { level: string }) => {
  const colors = {
    Beginner: "bg-green-500/10 text-green-400 border-green-500/20",
    Intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Advanced: "bg-red-500/10 text-red-400 border-red-500/20"
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full border ${colors[level as keyof typeof colors]}`}>
      {level}
    </span>
  );
};

export default function MikroTikPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty = selectedDifficulty ? guide.difficulty === selectedDifficulty : true;

    return matchesSearch && matchesDifficulty;
  });

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      {/* Simple Header */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-400 hover:text-green-500 flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-600" />
            <Link href="/resources" className="text-gray-400 hover:text-green-500">
              Resources
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-600" />
            <span className="text-green-500">MikroTik</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-green-500/10 rounded-xl">
            <Router className="h-8 w-8 text-green-500" />
          </div>
          <div>
            <h1 className="text-3xl font-mono font-bold text-green-500">MikroTik Resources</h1>
            <p className="text-gray-400 mt-1">Comprehensive guides for RouterOS configuration and automation</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-900 border border-gray-800 rounded-lg text-gray-200 focus:outline-none focus:border-green-500/50"
            />
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex gap-2">
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedDifficulty(selectedDifficulty === level ? null : level)}
                className={`px-3 py-2 rounded-lg text-sm font-mono transition-colors ${selectedDifficulty === level
                    ? 'bg-green-500/20 text-green-500 border border-green-500/30'
                    : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-green-500/30'
                  }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group block"
            >
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-green-500/30 transition-all hover:shadow-lg hover:shadow-green-500/5">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                    <guide.icon className="h-6 w-6 text-green-500" />
                  </div>
                  <DifficultyBadge level={guide.difficulty} />
                </div>

                <h2 className="text-xl font-mono font-semibold text-green-500 mb-2 group-hover:text-green-400 transition-colors">
                  {guide.title}
                </h2>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {guide.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {guide.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-3 w-3" />
                    {guide.difficulty}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {guide.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No guides found matching your criteria.</p>
          </div>
        )}

        {/* Additional Resources */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h2 className="text-xl font-mono font-semibold text-green-500 mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="https://mikrotik.com/download"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-green-500/30 transition-colors group"
            >
              <Download className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <h3 className="text-sm font-mono font-semibold text-gray-200 group-hover:text-green-500">Download CHR</h3>
                <p className="text-xs text-gray-500">Virtual router for testing</p>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-600" />
            </a>

            <a
              href="https://wiki.mikrotik.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-green-500/30 transition-colors group"
            >
              <BookOpen className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <h3 className="text-sm font-mono font-semibold text-gray-200 group-hover:text-green-500">Official Wiki</h3>
                <p className="text-xs text-gray-500">RouterOS documentation</p>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-600" />
            </a>

            <a
              href="https://mikrotik.com/test"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-green-500/30 transition-colors group"
            >
              <Terminal className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <h3 className="text-sm font-mono font-semibold text-gray-200 group-hover:text-green-500">Try Online</h3>
                <p className="text-xs text-gray-500">Test RouterOS in browser</p>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-600" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
