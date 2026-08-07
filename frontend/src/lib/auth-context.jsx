import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "./router-compat"

const defaultUser = {
  name: "Aarav Sharma",
  email: "aarav.sharma@student.univ.edu",
  role: "student",
  studentId: "STU-2026-0842",
  detail: "B.Tech CSE · Semester 5",
  initials: "AS",
}

const AuthContext = createContext({
  user: null,
  role: "student",
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  switchRole: () => {},
})

export function AuthProvider({ children }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [role, setRoleState] = useState("student")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem("campushub_auth")
      if (storedAuth) {
        const parsed = JSON.parse(storedAuth)
        setUser(parsed.user)
        setRoleState(parsed.user?.role || "student")
        setIsAuthenticated(true)
      } else {
        // Default initialized state for smooth UX
        setUser(defaultUser)
        setRoleState(defaultUser.role)
        setIsAuthenticated(true)
      }
    } catch {
      setUser(defaultUser)
      setRoleState("student")
      setIsAuthenticated(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const saveState = (userData) => {
    setUser(userData)
    setRoleState(userData.role || "student")
    setIsAuthenticated(true)
    try {
      localStorage.setItem("campushub_auth", JSON.stringify({ user: userData }))
    } catch (e) {
      console.error("Failed to save auth to localStorage", e)
    }
  }

  const login = async (identifier, password) => {
    const newUser = {
      ...defaultUser,
      email: identifier.includes("@") ? identifier : defaultUser.email,
      studentId: !identifier.includes("@") ? identifier : defaultUser.studentId,
      name: identifier.split("@")[0] || "User",
      initials: (identifier[0] || "U").toUpperCase(),
      role: role || "student",
    }
    saveState(newUser)
    router.push("/dashboard")
  }

  const register = async (userData) => {
    const registeredUser = {
      name: userData.fullName || userData.name || "New User",
      email: userData.email || "user@campushub.ai",
      role: userData.role || "student",
      studentId: userData.studentId || `STU-${Math.floor(1000 + Math.random() * 9000)}`,
      detail: userData.department || userData.detail || "CampusHub Member",
      initials: (userData.fullName || userData.name || "NU")
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
    }
    saveState(registeredUser)
    router.push("/dashboard")
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    try {
      localStorage.removeItem("campushub_auth")
    } catch (e) {
      console.error("Failed to clear auth from localStorage", e)
    }
    router.push("/")
  }


  const switchRole = (newRole) => {
    setRoleState(newRole)
    if (user) {
      const updated = { ...user, role: newRole }
      setUser(updated)
      try {
        localStorage.setItem("campushub_auth", JSON.stringify({ user: updated }))
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
