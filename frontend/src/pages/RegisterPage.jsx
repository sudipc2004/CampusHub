import { useState } from "react"
import AuthLayoutWrapper from "./AuthLayoutWrapper"
import { AuthCardShell } from "@/components/auth/auth-card-shell"
import { RoleSelector } from "@/components/auth/role-selector"
import { StudentRegisterForm } from "@/components/auth/student-register-form"
import { TeacherRegisterForm } from "@/components/auth/teacher-register-form"
import { AdminRegisterForm } from "@/components/auth/admin-register-form"
import { ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState(null)

  const getTitle = () => {
    if (!selectedRole) return "Create Account"
    if (selectedRole === "student") return "Student Registration"
    if (selectedRole === "teacher") return "Teacher Registration"
    if (selectedRole === "admin") return "Admin Registration"
    return "Create Account"
  }

  const getDescription = () => {
    if (!selectedRole) return "Choose your account type to get started"
    if (selectedRole === "student") return "Create your student account"
    if (selectedRole === "teacher") return "Create your teacher account"
    if (selectedRole === "admin") return "Create your admin account"
    return ""
  }

  return (
    <AuthLayoutWrapper>
      <div className={!selectedRole ? "-mx-4 sm:mx-0 sm:max-w-2xl sm:w-full" : "w-full"}>
        <AuthCardShell
          title={getTitle()}
          description={getDescription()}
        >
          {selectedRole && (
            <button
              type="button"
              onClick={() => setSelectedRole(null)}
              className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#5E46E8] hover:underline cursor-pointer"
            >
              <ArrowLeft className="size-3.5" />
              Change account type
            </button>
          )}

          {!selectedRole ? (
            <RoleSelector onSelectRole={setSelectedRole} />
          ) : (
            <div className="space-y-4">
              {selectedRole === "student" && <StudentRegisterForm />}
              {selectedRole === "teacher" && <TeacherRegisterForm />}
              {selectedRole === "admin" && <AdminRegisterForm />}
            </div>
          )}
        </AuthCardShell>
      </div>
    </AuthLayoutWrapper>
  )
}
