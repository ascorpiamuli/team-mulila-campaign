"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield, Settings, User, LogOut,
  Menu, X, Sun, Moon, ChevronDown,
  LayoutDashboard, Users, Calendar,
  TrendingUp, Activity, MessageSquare,
  Bell, Search, HelpCircle, ChevronLeft
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const checkAuth = () => {
    setIsLoading(true);

    const isLoginPage = pathname === "/admin/login";

    const token = localStorage.getItem("admin_token");
    const userStr = localStorage.getItem("admin_user");

    if (isLoginPage && token && userStr) {
      router.push("/admin/dashboard");
      setIsLoading(false);
      return;
    }

    if (!isLoginPage && (!token || !userStr)) {
      router.push("/admin/login");
      setIsLoading(false);
      return;
    }

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setAdminUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user:", error);
        router.push("/admin/login");
      }
    }

    setIsLoading(false);
  };

  const handleLogout = async () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_email");
    localStorage.removeItem("admin_authenticated");
    localStorage.removeItem("admin_role");

    router.push("/admin/login");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0F1F38] to-[#0A1628] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-text-dim">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <div className="min-h-screen">{children}</div>;
  }

  if (!isAuthenticated && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0F1F38] to-[#0A1628] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-text-dim">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard, color: "text-gold" },
    { name: "Supporters", path: "/admin/supporters", icon: Users, color: "text-blue-400" },
    { name: "Events", path: "/admin/events", icon: Calendar, color: "text-green-400" },
    { name: "Volunteers", path: "/admin/volunteers", icon: Activity, color: "text-purple-400" },
    { name: "Messages", path: "/admin/messages", icon: MessageSquare, color: "text-yellow-400" },
    { name: "Analytics", path: "/admin/analytics", icon: TrendingUp, color: "text-orange-400" },
  ];

  const currentPage = navItems.find((item) => item.path === pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0F1F38] to-[#0A1628]">
      {/* Mobile Menu Button - z-index 50 */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-bg-card/80 backdrop-blur-xl border border-gold/20 text-gold"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar - z-index 40 */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 w-64 bg-bg-card/95 backdrop-blur-xl border-r border-gold/20`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center p-5 border-b border-gold/20">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-gold to-gold-light flex items-center justify-center shadow-lg shadow-gold/20">
                <Shield className="h-6 w-6 text-bg-dark" />
              </div>
              <div>
                <h1 className="font-montserrat font-bold text-gold text-lg tracking-tight">Team Mulila</h1>
                <p className="text-[10px] text-text-dim/70 tracking-wider">ADMIN DASHBOARD</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 overflow-y-auto px-3">
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300 group ${isActive
                        ? "bg-gold/15 text-gold border-l-2 border-gold"
                        : "text-text-dim hover:bg-gold/5 hover:text-gold"
                      }`}
                  >
                    <item.icon className={`h-5 w-5 ${isActive ? "text-gold" : item.color} transition-colors`} />
                    <span className="text-sm font-medium">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto h-2 w-2 rounded-full bg-gold animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Bottom Decoration */}
          <div className="p-4 border-t border-gold/20">
            <div className="bg-gold/5 rounded-lg p-3 border border-gold/10">
              <p className="text-[10px] text-text-dim/50 text-center">
                © 2026 Team Mulila<br />
                <span className="text-[8px]">Working Today, Building Tomorrow</span>
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "ml-0"}`}>
        {/* Header - z-index 35 (higher than map's default) */}
        <header className="sticky top-0 z-[35] bg-bg-card/80 backdrop-blur-xl border-b border-gold/20">
          <div className="flex items-center justify-between px-4 py-3 lg:px-8">
            {/* Left - Page Title */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-3">
                <div>
                  <h1 className="font-montserrat text-xl font-bold text-gold">
                    {currentPage?.name || "Dashboard"}
                  </h1>
                  <p className="text-[10px] text-text-dim/70 hidden sm:block">
                    {currentPage?.name === "Dashboard" && "Overview of campaign performance"}
                    {currentPage?.name === "Supporters" && "Manage campaign supporters"}
                    {currentPage?.name === "Events" && "Create and manage events"}
                    {currentPage?.name === "Volunteers" && "Manage volunteer applications"}
                    {currentPage?.name === "Messages" && "Send bulk messages"}
                    {currentPage?.name === "Analytics" && "View campaign analytics"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right - User Actions */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg text-text-dim hover:text-gold hover:bg-gold/10 transition-colors"
                title="Toggle theme"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gold/5 transition-colors border border-gold/10 hover:border-gold/30"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gold to-gold-light flex items-center justify-center shadow-lg shadow-gold/20">
                    <span className="text-bg-dark text-sm font-bold">
                      {adminUser?.email?.charAt(0).toUpperCase() || "A"}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-semibold text-text-light">
                      {adminUser?.email?.split("@")[0] || "Admin"}
                    </p>
                    <p className="text-[9px] text-text-dim/70">Administrator</p>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-text-dim transition-transform duration-300 ${showUserMenu ? "rotate-180" : ""}`} />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-bg-card rounded-xl border border-gold/20 shadow-2xl py-2 z-[45]">
                    <div className="px-4 py-2 border-b border-gold/10">
                      <p className="text-sm font-semibold text-text-light">
                        {adminUser?.email?.split("@")[0] || "Admin"}
                      </p>
                      <p className="text-xs text-text-dim">{adminUser?.email || "admin@example.com"}</p>
                    </div>
                    <button
                      onClick={() => router.push("/admin/profile")}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-dim hover:text-gold hover:bg-gold/10 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </button>
                    <div className="border-t border-gold/10 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">{children}</main>
      </div>

      {/* Backdrop for mobile - z-index 30 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
