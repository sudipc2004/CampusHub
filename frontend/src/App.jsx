import { Routes, Route, Navigate } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import VerifyOtpPage from "./pages/VerifyOtpPage"
import { DashboardShell } from "./components/dashboard/dashboard-shell"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route path="/dashboard" element={<DashboardShell initialTab="Dashboard" />} />
      <Route path="/ai-doubt-solver" element={<DashboardShell initialTab="AI Doubt Solver" />} />
      <Route path="/knowledge-base" element={<DashboardShell initialTab="Knowledge Base" />} />
      <Route path="/ai-quizzes" element={<DashboardShell initialTab="AI Quizzes" />} />
      <Route path="/teachers" element={<DashboardShell initialTab="Teachers" />} />
      <Route path="/study-groups" element={<DashboardShell initialTab="Study Groups" />} />
      <Route path="/analytics" element={<DashboardShell initialTab="Analytics" />} />
      <Route path="/achievements" element={<DashboardShell initialTab="Achievements" />} />
      <Route path="/notifications" element={<DashboardShell initialTab="Notifications" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
