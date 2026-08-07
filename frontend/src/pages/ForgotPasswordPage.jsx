import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "@/lib/router-compat"
import { Mail, Lock, Eye, EyeOff, Loader2, CheckCircle2, RotateCw, X, Check, GraduationCap } from "lucide-react"
import AuthLayoutWrapper from "./AuthLayoutWrapper"
import { OtpInput } from "@/components/auth/otp-input"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ForgotPasswordPage() {
  const router = useRouter()
  // Steps: "email" | "otp_sent" | "reset_success"
  const [step, setStep] = useState("email")
  
  const [email, setEmail] = useState("")
  const [otpCode, setOtpCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(45)
  const [canResend, setCanResend] = useState(false)
  const [notification, setNotification] = useState("")
  const [error, setError] = useState("")

  // Timer for OTP Resend Countdown
  useEffect(() => {
    let timer
    if (step === "otp_sent" && resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1)
      }, 1000)
    } else if (resendCountdown === 0) {
      setCanResend(true)
    }
    return () => clearInterval(timer)
  }, [step, resendCountdown])

  // Step 1: Send OTP to Email
  const handleSendOtp = (e) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Please enter your email address.")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep("otp_sent")
      setResendCountdown(45)
      setCanResend(false)
      setNotification(`A 6-digit OTP code has been sent to ${email}`)
    }, 700)
  }

  // Resend OTP Code
  const handleResendOtp = () => {
    if (!canResend) return
    setCanResend(false)
    setResendCountdown(45)
    setNotification(`A new 6-digit OTP code has been sent to ${email}`)
    setTimeout(() => setNotification(""), 3500)
  }

  // Step 2: Verify OTP & Reset Password Submit
  const handleResetPassword = (e) => {
    e.preventDefault()
    setError("")

    if (otpCode.length < 6) {
      setError("Please enter the complete 6-digit OTP code.")
      return
    }

    if (!newPassword || !confirmPassword) {
      setError("Please enter and confirm your new password.")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep("reset_success")
    }, 900)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0")
    const secs = (seconds % 60).toString().padStart(2, "0")
    return `(${mins}:${secs})`
  }

  return (
    <AuthLayoutWrapper>
      {/* Floating Centered Compact Card - Identical Size to Login Modal */}
      <div className="relative w-full max-w-[420px] sm:max-w-[440px] bg-white dark:bg-slate-900 rounded-[28px] p-5 sm:p-7 shadow-2xl shadow-indigo-950/40 border border-white/20 text-slate-900 dark:text-white backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
        {/* Top Right Close Button (X) */}
        <Link
          href="/"
          className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="Close & return home"
        >
          <X className="size-4" />
        </Link>

        {/* Brand Logo Header */}
        <div className="flex justify-center mb-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <span className="flex size-8 items-center justify-center rounded-xl bg-[#5E46E8] text-white shadow-md shadow-indigo-500/20 transition-transform group-hover:scale-105">
              <GraduationCap className="size-4.5" />
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              Campus<span className="text-[#5E46E8]">Hub</span>
            </span>
          </Link>
        </div>

        {/* Headline */}
        <h2 className="text-center font-display text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 leading-snug tracking-tight">
          {step === "reset_success" ? (
            "Password Reset Complete!"
          ) : (
            <>
              Unlock True Potential through <br className="hidden sm:inline" />
              <span className="text-[#FF5722] dark:text-[#FF7043] font-black">
                Highest Personal Attention
              </span>
            </>
          )}
        </h2>

        {/* Section Subtitle */}
        <div className="text-center mt-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            {step === "email" ? "Forgot Password?" : step === "otp_sent" ? "Verify OTP & Reset Password" : "Success"}
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {step === "email"
              ? "Enter your email address to receive a 6-digit OTP code."
              : step === "otp_sent"
              ? "Enter the 6-digit OTP code sent to your email & your new password."
              : "Your password has been updated successfully."}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mt-3 rounded-xl bg-destructive/10 border border-destructive/20 p-2.5 text-xs text-destructive font-medium text-center animate-in fade-in duration-200">
            {error}
          </div>
        )}

        {/* STEP 1: Enter Email & Send OTP */}
        {step === "email" && (
          <form onSubmit={handleSendOtp} className="mt-4 space-y-3.5">
            <div className="space-y-1">
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 size-4 text-slate-400" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-10 rounded-xl text-xs sm:text-sm border-slate-300 dark:border-slate-700 focus-visible:ring-[#5E46E8]"
                  required
                  autoFocus
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-10 text-xs font-bold rounded-xl bg-[#5E46E8] hover:bg-[#4E36D8] text-white shadow-md shadow-indigo-500/20 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </Button>
          </form>
        )}

        {/* STEP 2: OTP Input + New Password + Confirm Password */}
        {step === "otp_sent" && (
          <form onSubmit={handleResetPassword} className="mt-3.5 space-y-3 animate-in fade-in duration-300">
            {notification && (
              <div className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium text-center">
                <CheckCircle2 className="size-3.5 shrink-0" />
                <span>{notification}</span>
              </div>
            )}

            {/* Email Display */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between text-[11px] px-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Email</label>
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="font-bold text-[#5E46E8] hover:underline cursor-pointer"
                >
                  Change
                </button>
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 size-3.5 text-slate-400" />
                <Input
                  type="email"
                  value={email}
                  disabled
                  className="pl-9 h-9 rounded-xl text-xs border-slate-200 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                />
              </div>
            </div>

            {/* 6-Digit OTP Box */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-1">
                <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">6-Digit OTP Code</label>
                <button
                  type="button"
                  onClick={() => setOtpCode("248619")}
                  className="text-[10px] font-bold text-[#5E46E8] hover:underline cursor-pointer"
                >
                  Fill OTP (248619)
                </button>
              </div>
              <OtpInput length={6} value={otpCode} onChange={setOtpCode} />
            </div>

            {/* New Password Input */}
            <div className="space-y-0.5">
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 px-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 size-3.5 text-slate-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-9 pr-9 h-9 rounded-xl text-xs border-slate-300 dark:border-slate-700 focus-visible:ring-[#5E46E8]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-0.5">
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 px-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 size-3.5 text-slate-400" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-9 pr-9 h-9 rounded-xl text-xs border-slate-300 dark:border-slate-700 focus-visible:ring-[#5E46E8]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                </button>
              </div>
            </div>

            {/* Resend OTP Link */}
            <div className="text-center text-[11px] text-slate-500 pt-0.5">
              Didn&apos;t receive code?{" "}
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="inline-flex items-center gap-1 font-bold text-[#5E46E8] hover:underline cursor-pointer"
                >
                  <RotateCw className="size-3" />
                  Resend OTP
                </button>
              ) : (
                <span className="font-semibold text-[#5E46E8]">
                  Resend OTP {formatTime(resendCountdown)}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-10 text-xs font-bold rounded-xl bg-[#5E46E8] hover:bg-[#4E36D8] text-white shadow-md shadow-indigo-500/20 cursor-pointer mt-1"
              disabled={isLoading || otpCode.length < 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-3.5 animate-spin" />
                  Resetting Password...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        )}

        {/* STEP 3: Password Reset Success */}
        {step === "reset_success" && (
          <div className="mt-5 space-y-4 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 border border-emerald-200 dark:border-emerald-800 shadow-md">
                <CheckCircle2 className="size-8 stroke-[2]" />
              </div>
            </div>

            <Button
              onClick={() => router.push("/login")}
              className="w-full h-10 text-xs font-bold rounded-xl bg-[#5E46E8] hover:bg-[#4E36D8] text-white shadow-md shadow-indigo-500/20 cursor-pointer"
            >
              Go to Login
            </Button>
          </div>
        )}

        {/* Trust Badge at Bottom */}
        <div className="mt-5 flex items-center justify-center gap-1.5 text-center">
          <div className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-[#FF5722] text-white shadow-sm">
            <Check className="size-2 stroke-[3]" />
          </div>
          <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">
            100% SAFE & SECURE,
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            We never post without your permission
          </span>
        </div>
      </div>
    </AuthLayoutWrapper>
  )
}
