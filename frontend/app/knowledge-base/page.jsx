import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export const metadata = {
  title: "Knowledge Base · CampusHub AI",
  description: "Browse indexed academic notes, textbook chapters, and course materials.",
}

export default function KnowledgeBasePage() {
  return <DashboardShell initialTab="Knowledge Base" />
}
