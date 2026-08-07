import { useState } from "react"
import Link from "next/link"
import { GraduationCap, X, ArrowLeft } from "lucide-react"
import { RoleSelector } from "./role-selector"
import { StudentRegisterForm } from "./student-register-form"
import { TeacherRegisterForm } from "./teacher-register-form"
import { AdminRegisterForm } from "./admin-register-form"
import { LoginForm } from "./login-form"

export function AuthModal({ onClose }) {
  // view: "role_selection" | "student_register" | "teacher_register" | "admin_register" | "direct_login"
  const [view, setView] = useState("role_selection")

  const getTitle = () => {
    if (view === "role_selection") return "Create Account"
    if (view === "student_register") return "Student Registration"
    if (view === "teacher_register") return "Teacher Registration"
    if (view === "admin_register") return "Admin Registration"
    return "Login to CampusHub"
  }

  const getDescription = () => {
    if (view === "role_selection") return "Choose your account type to get started"
    if (view === "student_register") return "Create your student account"
    if (view === "teacher_register") return "Create your teacher account"
    if (view === "admin_register") return "Create your admin account"
    return ""
  }

  const handleSelectRole = (roleId) => {
    if (roleId === "student") setView("student_register")
    else if (roleId === "teacher") setView("teacher_register")
    else if (roleId === "admin") setView("admin_register")
  }

  // If user wants direct login view (Vedantu login style), render LoginForm component directly
  if (view === "direct_login") {
    return <LoginForm onClose={onClose} />
  }

  return (
    <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[32px] p-6 sm:p-9 shadow-2xl shadow-indigo-950/40 border border-white/20 text-slate-900 dark:text-white backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
      {/* Top Right Close Button (X) */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        title="Close"
      >
        <X className="size-5" />
      </button>

      {/* Top Logo Header */}
      <div className="flex justify-center mb-2">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#5E46E8] text-white shadow-md shadow-indigo-500/20">
            <GraduationCap className="size-5" />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Campus<span className="text-[#5E46E8]">Hub</span>
          </span>
        </Link>
      </div>

      {/* Header Titles */}
      <div className="text-center space-y-1 pb-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {getTitle()}
        </h2>
        {getDescription() && (
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {getDescription()}
          </p>
        )}
      </div>

      {/* Back button when inside role form */}
      {view !== "role_selection" && (
        <button
          type="button"
          onClick={() => setView("role_selection")}
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#5E46E8] hover:underline cursor-pointer"
        >
          <ArrowLeft className="size-3.5" />
          Change account type
        </button>
      )}

      {/* Dynamic Content Views */}
      {view === "role_selection" && (
        <>
          <RoleSelector onSelectRole={handleSelectRole} />
          
          {/* Bottom Already Have Account Link */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setView("direct_login")}
              className="font-bold text-[#5E46E8] hover:underline cursor-pointer ml-1"
            >
              Login
            </button>
          </div>
        </>
      )}

      {view === "student_register" && (
        <div className="max-w-md mx-auto">
          <StudentRegisterForm onSwitchToLogin={() => setView("direct_login")} />
        </div>
      )}

      {view === "teacher_register" && (
        <div className="max-w-md mx-auto">
          <TeacherRegisterForm />
        </div>
      )}

      {view === "admin_register" && (
        <div className="max-w-md mx-auto">
          <AdminRegisterForm />
        </div>
      )}
    </div>
  )
}
