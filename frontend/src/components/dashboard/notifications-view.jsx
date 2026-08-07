import { useState } from "react"
import {
  Bell,
  Sparkles,
  CalendarClock,
  Trophy,
  CheckCheck,
  Trash2,
  ArrowRight,
  Filter,
  CheckCircle2,
  BookOpen,
  UserCheck,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "AI Knowledge Base Updated",
    message: "DP_Patterns.pdf has been vector-indexed. You can now ask questions directly from page 1-12.",
    time: "10 minutes ago",
    category: "ai",
    read: false,
    icon: Sparkles,
    badgeText: "RAG Engine",
    actionTab: "AI Doubt Solver",
    actionLabel: "Open Doubt Solver",
  },
  {
    id: "notif-2",
    title: "Session Request Accepted",
    message: "Dr. Meera Iyer confirmed your 1-on-1 session request for today at 4:00 PM on DP recursion trees.",
    time: "1 hour ago",
    category: "sessions",
    read: false,
    icon: CalendarClock,
    badgeText: "Session Confirmed",
    actionTab: "Teachers",
    actionLabel: "View Session",
  },
  {
    id: "notif-3",
    title: "Weak Topic Agent Warning",
    message: "Your mastery in Dynamic Programming dropped to 42%. A custom 20-min revision plan has been generated.",
    time: "3 hours ago",
    category: "ai",
    read: false,
    icon: BookOpen,
    badgeText: "Weak Topic",
    actionTab: "Dashboard",
    actionLabel: "View Revision Plan",
  },
  {
    id: "notif-4",
    title: "14-Day Study Streak Unlocked! 🔥",
    message: "Congratulations! You've logged in and completed daily practice for 14 days straight (+150 XP bonus).",
    time: "Yesterday",
    category: "system",
    read: false,
    icon: Trophy,
    badgeText: "Achievement",
    actionTab: "Achievements",
    actionLabel: "View Trophy Room",
  },
  {
    id: "notif-5",
    title: "New AI Practice Quiz Available",
    message: "Quiz Agent generated 10 medium-difficulty questions for DBMS Normalization (3NF/BCNF).",
    time: "Yesterday",
    category: "ai",
    read: false,
    icon: Sparkles,
    badgeText: "AI Quiz",
    actionTab: "AI Quizzes",
    actionLabel: "Start Quiz",
  },
  {
    id: "notif-6",
    title: "Study Group Invitation",
    message: "Priya Nair invited you to join the 'CSE Semester 5 Algorithms Prep' study room.",
    time: "2 days ago",
    category: "sessions",
    read: true,
    icon: UserCheck,
    badgeText: "Study Group",
    actionTab: "Study Groups",
    actionLabel: "Join Group",
  },
]

export function NotificationsView({ onNavigate }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [filter, setFilter] = useState("all") // 'all' | 'unread' | 'ai' | 'sessions'

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read
    if (filter === "ai") return n.category === "ai"
    if (filter === "sessions") return n.category === "sessions"
    return true
  })

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1d63ed] text-white shadow-sm">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Notifications</h1>
                {unreadCount > 0 && (
                  <Badge className="bg-[#1d63ed] text-white font-bold px-2.5 py-0.5 rounded-full text-xs">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Stay updated with AI recommendations, session requests, and learning milestones.
              </p>
            </div>
          </div>
        </div>

        {unreadCount > 0 && (
          <Button
            onClick={markAllAsRead}
            variant="outline"
            size="sm"
            className="gap-2 self-start cursor-pointer hover:bg-secondary sm:self-auto"
          >
            <CheckCheck className="h-4 w-4 text-primary" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
        <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground mr-2">
          <Filter className="h-3.5 w-3.5" /> Filter:
        </span>
        {[
          { id: "all", label: "All", count: notifications.length },
          { id: "unread", label: "Unread", count: unreadCount },
          { id: "ai", label: "AI & RAG", count: notifications.filter((n) => n.category === "ai").length },
          { id: "sessions", label: "Sessions", count: notifications.filter((n) => n.category === "sessions").length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`flex items-center gap-1.5 rounded-2xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              filter === tab.id
                ? "bg-[#1d63ed] text-white shadow-xs"
                : "bg-secondary/70 text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {tab.label}
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                filter === tab.id ? "bg-white/25 text-white" : "bg-background text-muted-foreground"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card className="flex flex-col items-center justify-center p-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-muted-foreground">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-semibold text-base text-foreground">No notifications found</h3>
            <p className="mt-1 text-xs text-muted-foreground">You are all caught up for this filter section.</p>
          </Card>
        ) : (
          filteredNotifications.map((n) => {
            const Icon = n.icon
            return (
              <Card
                key={n.id}
                className={`relative overflow-hidden transition-all hover:border-primary/40 ${
                  !n.read ? "bg-secondary/40 border-primary/20 shadow-xs" : "bg-card"
                }`}
              >
                {!n.read && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#1d63ed]" />
                )}
                <div className="flex items-start gap-4 p-4 sm:p-5">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                      !n.read ? "bg-[#1d63ed]/15 text-[#1d63ed]" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h2 className={`text-sm font-bold ${!n.read ? "text-foreground" : "text-foreground/90"}`}>
                          {n.title}
                        </h2>
                        <Badge
                          variant="outline"
                          className="text-[10px] font-semibold border-primary/20 bg-primary/5 text-primary"
                        >
                          {n.badgeText}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{n.time}</span>
                    </div>

                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{n.message}</p>

                    {/* Actions */}
                    <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-3">
                      {n.actionTab && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            markAsRead(n.id)
                            onNavigate?.(n.actionTab)
                          }}
                          className="h-8 gap-1.5 text-xs font-semibold text-[#1d63ed] hover:bg-[#1d63ed]/10 p-0 hover:px-2 transition-all cursor-pointer"
                        >
                          {n.actionLabel} <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      )}

                      <div className="ml-auto flex items-center gap-2">
                        {!n.read && (
                          <button
                            onClick={() => markAsRead(n.id)}
                            className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                          >
                            Mark read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(n.id)}
                          className="p-1 text-muted-foreground hover:text-destructive cursor-pointer transition-colors"
                          title="Delete notification"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
