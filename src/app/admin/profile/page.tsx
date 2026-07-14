"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User, Mail, Shield, Key, Lock, CheckCircle,
  AlertCircle, Eye, EyeOff, Save, RefreshCw,
  Calendar, Activity, Fingerprint, Smartphone,
  ArrowLeft, Crown, BadgeCheck
} from "lucide-react";
import { supabase } from '../../../../lib/supabase/client';
import { useToast } from '../../../hooks/useToast';

interface ProfileData {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  last_login: string;
  phone: string;
  avatar_url: string;
}

export default function AdminProfile() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    id: "",
    email: "",
    full_name: "Admin User",
    role: "Administrator",
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
    phone: "",
    avatar_url: ""
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Load user data from localStorage or session
  useEffect(() => {
    const userStr = localStorage.getItem("admin_user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setProfile(prev => ({
          ...prev,
          id: user.id || "",
          email: user.email || "",
          full_name: user.full_name || user.email?.split("@")[0] || "Admin",
          role: user.role || "Administrator",
          phone: user.phone || ""
        }));
      } catch (error) {
        console.error("Error parsing user:", error);
      }
    }
  }, []);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (passwordErrors[name as keyof typeof passwordErrors]) {
      setPasswordErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validatePassword = () => {
    let valid = true;
    const errors = { currentPassword: "", newPassword: "", confirmPassword: "" };

    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required";
      valid = false;
    }

    if (!passwordData.newPassword) {
      errors.newPassword = "New password is required";
      valid = false;
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
      valid = false;
    }

    if (!passwordData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setPasswordErrors(errors);
    return valid;
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    setIsChangingPassword(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // First, re-authenticate with current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: profile.email,
        password: passwordData.currentPassword
      });

      if (signInError) {
        setErrorMessage("Current password is incorrect");
        showToast("Current password is incorrect", "error");
        setIsChangingPassword(false);
        return;
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (updateError) {
        setErrorMessage(updateError.message || "Failed to update password");
        showToast("Failed to update password", "error");
        setIsChangingPassword(false);
        return;
      }

      setSuccessMessage("Password changed successfully!");
      showToast("Password changed successfully!", "success");

      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);

    } catch (error: any) {
      console.error("Error changing password:", error);
      setErrorMessage(error.message || "An unexpected error occurred");
      showToast("Failed to change password", "error");
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Get user initials for avatar
  const getInitials = () => {
    return profile.full_name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "A";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg border border-gold/20 text-text-dim hover:text-gold hover:border-gold/40 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="font-montserrat text-2xl font-bold text-gold">Profile Settings</h1>
          <p className="text-text-dim text-sm mt-1">Manage your account and security settings</p>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-gold to-gold-light flex items-center justify-center shadow-xl shadow-gold/20">
              <span className="text-3xl font-bold text-bg-dark">{getInitials()}</span>
            </div>
            <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border-2 border-bg-dark">
              <BadgeCheck className="h-4 w-4 text-white" />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-text-light">{profile.full_name}</h2>
            <p className="text-text-dim">{profile.email}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium">
                <Crown className="h-3 w-3" />
                {profile.role}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">
                <Activity className="h-3 w-3" />
                Active
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 text-text-dim">
              <Calendar className="h-4 w-4 text-gold" />
              <span>Joined: {new Date(profile.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-text-dim">
              <Smartphone className="h-4 w-4 text-gold" />
              <span>{profile.phone || "No phone set"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="bg-bg-card/50 rounded-xl border border-gold/20 overflow-hidden">
        <div className="p-6 border-b border-gold/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold/10">
              <Key className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h3 className="font-montserrat text-lg font-bold text-text-light">Change Password</h3>
              <p className="text-text-dim text-sm">Update your password to keep your account secure</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="p-6 space-y-4">
          {/* Success/Error Messages */}
          {successMessage && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/30 animate-fade-in">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <p className="text-sm text-green-400">{successMessage}</p>
            </div>
          )}
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 animate-fade-in">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <p className="text-sm text-red-400">{errorMessage}</p>
            </div>
          )}

          {/* Current Password */}
          <div>
            <label className="block text-xs font-semibold text-gold mb-1.5">
              Current Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-dim" />
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter your current password"
                className={`w-full pl-10 pr-12 py-2.5 rounded-lg border-2 bg-bg-dark/50 text-text-light placeholder:text-text-dim/50 focus:outline-none transition-colors ${passwordErrors.currentPassword
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-gold/20 focus:border-gold"
                  }`}
                disabled={isChangingPassword}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-gold transition-colors"
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {passwordErrors.currentPassword && (
              <p className="text-xs text-red-400 mt-1">{passwordErrors.currentPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-semibold text-gold mb-1.5">
              New Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-dim" />
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password (min. 8 characters)"
                className={`w-full pl-10 pr-12 py-2.5 rounded-lg border-2 bg-bg-dark/50 text-text-light placeholder:text-text-dim/50 focus:outline-none transition-colors ${passwordErrors.newPassword
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-gold/20 focus:border-gold"
                  }`}
                disabled={isChangingPassword}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-gold transition-colors"
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {passwordErrors.newPassword && (
              <p className="text-xs text-red-400 mt-1">{passwordErrors.newPassword}</p>
            )}
            <p className="text-[10px] text-text-dim mt-1">
              Password must be at least 8 characters long
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-gold mb-1.5">
              Confirm New Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-dim" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm your new password"
                className={`w-full pl-10 pr-12 py-2.5 rounded-lg border-2 bg-bg-dark/50 text-text-light placeholder:text-text-dim/50 focus:outline-none transition-colors ${passwordErrors.confirmPassword
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-gold/20 focus:border-gold"
                  }`}
                disabled={isChangingPassword}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-gold transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {passwordErrors.confirmPassword && (
              <p className="text-xs text-red-400 mt-1">{passwordErrors.confirmPassword}</p>
            )}
          </div>

          {/* Password Strength Indicator */}
          {passwordData.newPassword && !passwordErrors.newPassword && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-text-dim">
                <span>Password strength</span>
                <span>
                  {passwordData.newPassword.length < 6 && "Weak"}
                  {passwordData.newPassword.length >= 6 && passwordData.newPassword.length < 10 && "Fair"}
                  {passwordData.newPassword.length >= 10 && "Strong"}
                </span>
              </div>
              <div className="h-1.5 bg-bg-dark rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${passwordData.newPassword.length < 6
                      ? "bg-red-500"
                      : passwordData.newPassword.length < 10
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  style={{ width: `${Math.min((passwordData.newPassword.length / 12) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isChangingPassword}
              className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-gold to-gold-light text-bg-dark font-semibold hover:shadow-lg hover:shadow-gold/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isChangingPassword ? (
                <>
                  <div className="h-4 w-4 border-2 border-bg-dark border-t-transparent rounded-full animate-spin" />
                  Changing Password...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Change Password
                </>
              )}
            </button>
          </div>

          <p className="text-center text-[10px] text-text-dim">
            🔒 Your password is encrypted and secure. We recommend using a strong, unique password.
          </p>
        </form>
      </div>

      {/* Security Tips */}
      <div className="bg-gold/5 rounded-xl border border-gold/20 p-6">
        <h4 className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Security Tips
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs text-gold">1</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-light">Use a strong password</p>
              <p className="text-xs text-text-dim">At least 8 characters with mix of letters, numbers, and symbols</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs text-gold">2</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-light">Enable two-factor authentication</p>
              <p className="text-xs text-text-dim">Add an extra layer of security to your account</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs text-gold">3</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-light">Keep your session secure</p>
              <p className="text-xs text-text-dim">Always log out when using shared devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
