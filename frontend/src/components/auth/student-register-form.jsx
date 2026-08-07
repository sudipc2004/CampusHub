import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, User, Mail, Lock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"

export function StudentRegisterForm({ onSwitchToLogin }) {
  const { register } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setIsLoading(true)
    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        role: "student",
        detail: "B.Tech Student",
      })
    } catch {
      setError("Failed to create student account.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {error && (
        <div className="rounded-xl bg-destructive/15 border border-destructive/30 p-3 text-xs text-destructive font-medium text-center">
          {error}
        </div>
      )}

      {/* Name */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground">Name</label>
        <div className="relative">
          <User className="absolute left-3.5 top-3 size-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="pl-10 h-10 rounded-xl text-sm border-slate-200 focus-visible:ring-[#5E46E8]"
            required
            autoFocus
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground">Email</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-3 size-4 text-slate-400" />
          <Input
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="pl-10 h-10 rounded-xl text-sm border-slate-200 focus-visible:ring-[#5E46E8]"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground">Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-3 size-4 text-slate-400" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="pl-10 pr-10 h-10 rounded-xl text-sm border-slate-200 focus-visible:ring-[#5E46E8]"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-3 size-4 text-slate-400" />
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="pl-10 pr-10 h-10 rounded-xl text-sm border-slate-200 focus-visible:ring-[#5E46E8]"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 transition-colors"
            tabIndex={-1}
          >
            {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-11 text-sm font-semibold rounded-xl bg-[#5E46E8] hover:bg-[#4E36D8] text-white shadow-md shadow-indigo-500/20 mt-2 cursor-pointer"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Register"
        )}
      </Button>

      {/* Footer Link */}
      <div className="pt-2 text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        {onSwitchToLogin ? (
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-bold text-[#5E46E8] hover:underline cursor-pointer"
          >
            Login
          </button>
        ) : (
          <Link href="/login" className="font-bold text-[#5E46E8] hover:underline">
            Login
          </Link>
        )}
      </div>
    </form>
  )
}
