"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, GraduationCap, LogOut, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Agentic AI", href: "#agents" },
  { label: "For Everyone", href: "#roles" },
  { label: "Analytics", href: "#analytics" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="size-5" aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            CampusHub <span className="text-primary">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Button render={<Link href="/dashboard" />} variant="outline" size="sm" className="gap-2">
                <LayoutDashboard className="size-4" />
                Dashboard ({user?.name?.split(" ")[0] || "User"})
              </Button>
              <Button onClick={logout} variant="ghost" size="sm" className="gap-1.5 text-destructive hover:text-destructive">
                <LogOut className="size-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button render={<Link href="/login" />} variant="ghost" size="sm">
                Sign in
              </Button>
              <Button render={<Link href="/register" />} size="sm">
                Get started free
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Button render={<Link href="/dashboard" />} variant="outline" className="w-full gap-2">
                    <LayoutDashboard className="size-4" />
                    Go to Dashboard
                  </Button>
                  <Button onClick={logout} variant="destructive" className="w-full gap-1.5">
                    <LogOut className="size-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button render={<Link href="/login" />} variant="outline" className="w-full">
                    Sign in
                  </Button>
                  <Button render={<Link href="/register" />} className="w-full">
                    Get started free
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
