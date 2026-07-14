"use client";

import { useState, useEffect } from "react";
import { X, Phone, AlertCircle, Key, Clock, Shield, CheckCircle } from "lucide-react";
import { supabase } from "../../lib/supabase/client";
import { PhoneValidator } from "@/lib/phone-validator";

interface OTPVerificationModalProps {
  isOpen: boolean;
  phoneNumber: string;
  email: string;
  deviceFingerprint: string;
  onClose: () => void;
  onVerified: () => void;
}

export default function OTPVerificationModal({
  isOpen,
  phoneNumber,
  email,
  deviceFingerprint,
  onClose,
  onVerified
}: OTPVerificationModalProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [autoVerified, setAutoVerified] = useState(false);
  // Use any to bypass TypeScript issues
  const [verificationStatus, setVerificationStatus] = useState<any>("idle");

  const phoneValidator = PhoneValidator.getInstance();

  // Send OTP when modal opens
  useEffect(() => {
    if (isOpen && !isInitialized) {
      setIsInitialized(true);
      setOtp(["", "", "", "", "", ""]);
      setError("");
      sendOTP();
    }
  }, [isOpen, isInitialized]);

  const sendOTP = async () => {
    const phoneCheck = phoneValidator.trackPhoneAttempt(phoneNumber);
    if (!phoneCheck.allowed) {
      setError(`Too many attempts with this phone number. Please try again in ${phoneCheck.waitTime} minutes.`);
      setIsLocked(true);
      setLockoutTime(phoneCheck.waitTime * 60000);
      return;
    }

    setIsLoading(true);
    setError("");
    setVerificationStatus("verifying");

    try {
      console.log("📤 Sending OTP request...");

      const response = await supabase.functions.invoke('send-otp', {
        body: JSON.stringify({
          phone: phoneNumber,
          email: email || null,
          deviceFingerprint: deviceFingerprint || "unknown"
        })
      });

      console.log("📨 Send OTP Response:", response);

      if (response.error) {
        console.error("Function error:", response.error);
        setError(response.error.message || "Failed to send verification code. Please try again.");
        setIsLoading(false);
        setVerificationStatus("error");
        return;
      }

      if (response.data && response.data.success) {
        // Check if this was auto-verified
        if (response.data.autoVerified) {
          console.log("✅ Auto-verified!");
          setAutoVerified(true);
          setVerificationStatus("auto");
          setCanResend(false);

          // Auto-verify success - proceed
          setTimeout(() => {
            onVerified();
            onClose();
          }, 1500);
          return;
        }

        // Normal OTP flow
        setCanResend(false);
        setTimeLeft(60);
        setRemainingAttempts(response.data.remainingAttempts || 3);
        setVerificationStatus("idle");

        const timer = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              setCanResend(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else if (response.data && response.data.error) {
        const errorMessage = response.data.message || response.data.error;
        setError(errorMessage || "Failed to send verification code. Please try again.");
        setVerificationStatus("error");
      } else {
        setError("Failed to send verification code. Please try again.");
        setVerificationStatus("error");
      }

    } catch (err) {
      console.error("Send OTP error:", err);
      setError("Network error. Please check your connection and try again.");
      setVerificationStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    const enteredOTP = otp.join("");

    if (enteredOTP.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");
    setVerificationStatus("verifying");

    try {
      console.log("🔐 Verifying OTP...");

      const response = await supabase.functions.invoke('verify-otp', {
        body: JSON.stringify({
          phone: phoneNumber,
          email: email || null,
          otp: enteredOTP,
          deviceFingerprint: deviceFingerprint || "unknown"
        })
      });

      console.log("📨 Verify OTP Response:", response);

      if (response.error) {
        console.error("Function error:", response.error);
        setError("Verification failed. Please try again.");
        setIsLoading(false);
        setVerificationStatus("error");
        return;
      }

      if (response.data && response.data.success) {
        // Check if this was auto-verified
        if (response.data.autoVerified) {
          setAutoVerified(true);
          setVerificationStatus("auto");
        } else {
          setVerificationStatus("success");
        }

        // Reset phone attempts on successful verification
        phoneValidator.resetPhoneAttempts(phoneNumber);

        // Show success briefly then proceed
        setTimeout(() => {
          onVerified();
          onClose();
        }, 1000);

      } else if (response.data && response.data.error) {
        const remaining = response.data.remainingAttempts;
        setRemainingAttempts(remaining !== undefined ? remaining : 1);
        setError(response.data.message || response.data.error);
        setVerificationStatus("error");

        if (remaining === 0) {
          setIsLocked(true);
          setLockoutTime(3600000);
        }
      } else {
        setError("Verification failed. Please try again.");
        setVerificationStatus("error");
      }

    } catch (err) {
      console.error("Verify OTP error:", err);
      setError("Network error. Please check your connection and try again.");
      setVerificationStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  useEffect(() => {
    if (isLocked && lockoutTime > 0) {
      const timer = setInterval(() => {
        setLockoutTime(prev => {
          if (prev <= 1000) {
            setIsLocked(false);
            setRemainingAttempts(3);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isLocked, lockoutTime]);

  // Reset initialization when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsInitialized(false);
      setAutoVerified(false);
      setVerificationStatus("idle");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Auto-verified state - show success
  if (autoVerified || verificationStatus === "auto") {
    return (
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
        <div className="relative w-full max-w-md bg-gradient-to-br from-bg-dark to-bg-card rounded-2xl border border-green-500/30 shadow-2xl animate-scale-in">
          <div className="text-center p-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-4">
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>
            <h3 className="font-montserrat text-2xl font-bold text-green-400">Phone Verified!</h3>
            <p className="mt-2 text-sm text-text-dim">
              Your phone number has been verified successfully.
              <br />
              <span className="text-gold">{phoneNumber}</span>
            </p>
            <div className="mt-4">
              <div className="animate-pulse text-xs text-text-dim">
                Continuing...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-br from-bg-dark to-bg-card rounded-2xl border border-gold/30 shadow-2xl animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 rounded-full bg-black/50 p-1.5 text-text-dim hover:text-gold transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center p-6 border-b border-gold/20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-4">
            <Phone className="h-8 w-8 text-gold" />
          </div>
          <h3 className="font-montserrat text-xl font-bold text-gold">Verify Your Phone Number</h3>
          <p className="mt-2 text-sm text-text-dim">
            We've sent a 6-digit verification code to
            <br />
            <span className="font-semibold text-gold">{phoneNumber}</span>
          </p>
          {email && (
            <p className="mt-1 text-xs text-text-dim">
              For account: <span className="text-gold">{email}</span>
            </p>
          )}
          {verificationStatus === "auto" && (
            <p className="mt-2 text-xs text-green-400">
              ✓ Auto-verified! Continuing...
            </p>
          )}
        </div>

        <div className="p-6 space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isLocked || verificationStatus === "auto" || verificationStatus === "success"}
                className="h-12 w-12 text-center text-2xl font-bold rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none transition-colors disabled:opacity-50"
                autoFocus={index === 0 && !isLocked && verificationStatus !== "auto" && verificationStatus !== "success"}
              />
            ))}
          </div>

          {!isLocked && remainingAttempts < 3 && (
            <div className="text-center text-xs text-text-dim">
              Remaining attempts: <span className="text-gold">{remainingAttempts}</span>
            </div>
          )}

          {isLocked && (
            <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <Clock className="h-4 w-4 text-red-400 animate-pulse" />
              <p className="text-xs text-red-400">
                Too many attempts. Try again in {Math.ceil(lockoutTime / 60000)} minutes.
              </p>
            </div>
          )}

          {error && !isLocked && verificationStatus !== "auto" && verificationStatus !== "success" && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          {verificationStatus === "success" && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <p className="text-xs text-green-400">Phone verified successfully!</p>
            </div>
          )}

          {!isLocked && verificationStatus !== "auto" && verificationStatus !== "success" && (
            <div className="text-center">
              {canResend ? (
                <button
                  onClick={sendOTP}
                  disabled={isLoading}
                  className="text-sm text-gold hover:underline disabled:opacity-50"
                >
                  Resend Code
                </button>
              ) : (
                <p className="text-sm text-text-dim">
                  Resend code in <span className="text-gold">{timeLeft}s</span>
                </p>
              )}
            </div>
          )}

          <button
            onClick={verifyOTP}
            disabled={isLoading || otp.some(digit => !digit) || isLocked || verificationStatus === "auto" || verificationStatus === "success"}
            className="w-full py-3 rounded-full bg-gradient-to-r from-gold to-gold-light text-bg-dark font-semibold transition-all hover:shadow-lg hover:shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-bg-dark border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </>
              ) : verificationStatus === "auto" || verificationStatus === "success" ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Verified!
                </>
              ) : (
                <>
                  <Key className="h-4 w-4" />
                  Verify & Continue
                </>
              )}
            </span>
          </button>

          <div className="flex items-center justify-center gap-2 text-center text-[10px] text-text-dim">
            <Shield className="h-3 w-3" />
            <span>Your phone number will be verified and linked to this account</span>
          </div>
        </div>
      </div>
    </div>
  );
}
