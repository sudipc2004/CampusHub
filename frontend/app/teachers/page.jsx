import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export const metadata = {
  title: "Teachers & Mentors · CampusHub AI",
  description: "Connect with faculty professors and book office hours.",
}

export default function TeachersPage() {
  return <DashboardShell initialTab="Teachers" />
}
