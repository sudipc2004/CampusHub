import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export const metadata = {
  title: "Analytics · CampusHub AI",
  description: "Track your learning progress, weak topic distribution, and study stats.",
}

export default function AnalyticsPage() {
  return <DashboardShell initialTab="Analytics" />
}
