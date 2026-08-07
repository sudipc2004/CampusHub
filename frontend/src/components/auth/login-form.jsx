import { useState } from "react"
import Link from "next/link"
import { useRouter } from "@/lib/router-compat"
import { Eye, EyeOff, Lock, Mail, Loader2, X, Check, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"

export function LoginForm({ onClose }) {
  const router = useRouter()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: true,
  })
  const [error, setError] = useState("")

  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      router.push("/")
    }
  }

  // Handle Email / Password Login
  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.identifier || !formData.password) {
      setError("Please enter your email or student ID and password.")
      return
    }

    setIsLoading(true)
    try {
      await login(formData.identifier, formData.password)
    } catch {
      setError("Failed to login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Google OAuth Login
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    try {
      await login("google.user@campushub.ai", "googlepass")
    } catch {
      setError("Failed to login with Google.")
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="relative w-full max-w-[450px] sm:max-w-[480px] bg-white dark:bg-slate-900 rounded-[32px] p-6 sm:p-9 shadow-2xl shadow-indigo-950/40 border border-white/20 text-slate-900 dark:text-white backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
      {/* Top Right Close (X) Button */}
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        title="Close & return home"
      >
        <X className="size-5" />
      </button>

      {/* Brand Logo Header */}
      <div className="flex justify-center mb-3">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#5E46E8] text-white shadow-md shadow-indigo-500/20 transition-transform group-hover:scale-105">
            <GraduationCap className="size-5" />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Campus<span className="text-[#5E46E8]">Hub</span>
          </span>
        </Link>
      </div>

      {/* Main Headline */}
      <h2 className="text-center font-display text-xl sm:text-[22px] font-extrabold text-slate-900 dark:text-slate-100 leading-snug tracking-tight">
        Unlock True Potential through <br className="hidden sm:inline" />
        <span className="text-[#FF5722] dark:text-[#FF7043] font-black">
          Highest Personal Attention
        </span>
      </h2>

      {/* Error Alert */}
      {error && (
        <div className="mt-4 rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive font-medium text-center animate-in fade-in duration-200">
          {error}
        </div>
      )}

      {/* Email / Password Login Form */}
      <div className="mt-6 space-y-4">
        <div className="text-center">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Student ID
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Please enter your Student ID & Password
          </p>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-3.5">
          {/* Student ID Input */}
          <div className="space-y-1">
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 size-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Enter your Student ID"
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                className="pl-10 h-11 rounded-2xl text-sm border-slate-300 dark:border-slate-700 focus-visible:ring-[#5E46E8]"
                required
                autoFocus
              />
            </div>
          </div>


          {/* Password Input */}
          <div className="space-y-1">
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 size-4 text-slate-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 pr-10 h-11 rounded-2xl text-sm border-slate-300 dark:border-slate-700 focus-visible:ring-[#5E46E8]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs px-1">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="size-4 rounded border-slate-300 text-[#5E46E8] focus:ring-[#5E46E8] accent-[#5E46E8]"
              />
              <span className="font-medium text-slate-600 dark:text-slate-300">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="font-bold text-[#5E46E8] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 text-sm font-bold rounded-2xl bg-[#5E46E8] hover:bg-[#4E36D8] text-white shadow-md shadow-indigo-500/20 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </div>

      {/* OR Divider */}
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <div className="relative flex justify-center text-[10px]">
          <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 font-bold uppercase tracking-widest">
            OR
          </span>
        </div>
      </div>

      {/* Google Login Button */}
      <div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="w-full flex items-center justify-center gap-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 py-3 px-4 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
        >
          {isGoogleLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <svg className="size-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>Continue with Google</span>
        </button>
      </div>

      {/* Trust Badge at Bottom */}
      <div className="mt-6 flex items-center justify-center gap-1.5 text-center">
        <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#FF5722] text-white shadow-sm">
          <Check className="size-2.5 stroke-[3]" />
        </div>
        <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
          100% SAFE & SECURE,
        </span>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          We never post without your permission
        </span>
      </div>
    </div>
  )
}
