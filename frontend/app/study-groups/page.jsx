import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export const metadata = {
  title: "Study Groups · CampusHub AI",
  description: "Join peer study circles, discuss course topics, and request mentorship sessions.",
}

export default function StudyGroupsPage() {
  return <DashboardShell initialTab="Study Groups" />
}
