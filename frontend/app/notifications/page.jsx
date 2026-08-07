import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export const metadata = {
  title: "Notifications · CampusHub AI",
  description: "View system alerts, doubt solver indexing updates, and session reminders.",
}

export default function NotificationsPage() {
  return <DashboardShell initialTab="Notifications" />
}
