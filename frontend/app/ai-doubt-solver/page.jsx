import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export const metadata = {
  title: "AI Doubt Solver · CampusHub AI",
  description: "Ask doubts on your uploaded notes and get cited, confidence-scored answers.",
}

export default function AIDoubtSolverPage() {
  return <DashboardShell initialTab="AI Doubt Solver" />
}
