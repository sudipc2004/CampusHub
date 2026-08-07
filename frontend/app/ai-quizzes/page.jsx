import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export const metadata = {
  title: "AI Quizzes · CampusHub AI",
  description: "Take adaptive practice quizzes generated automatically from your course syllabus.",
}

export default function AIQuizzesPage() {
  return <DashboardShell initialTab="AI Quizzes" />
}
