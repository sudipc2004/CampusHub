import Link from "next/link"
import { usePathname } from "@/lib/router-compat"
import { GraduationCap } from "lucide-react"

export default function AuthLayoutWrapper({ children }) {
  const pathname = usePathname()

  // Determine top navigation links based on current path
  const isRegisterPath = pathname?.includes("/register")

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#110E33] text-foreground">
      {/* Full-Page Background Image & Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-105 transform blur-[1px] transition-transform duration-1000"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1920&q=80')" }}
      />
      {/* Dark Purple Gradient & Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1648]/95 via-[#25225E]/90 to-[#120F35]/95 pointer-events-none" />
      <div className="absolute -left-32 -top-32 size-[500px] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 size-[500px] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <span className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-inner transition-transform group-hover:scale-105">
            <GraduationCap className="size-6 text-white" />
          </span>
          <span className="font-display text-2xl font-bold tracking-tight text-white">
            Campus<span className="text-[#A5B4FC]">Hub</span>
          </span>
        </Link>
      </header>


      {/* Centered Modal / Content Container */}
      <main className="relative z-20 my-auto flex w-full items-center justify-center px-4 py-8 sm:px-6">
        {children}
      </main>

      {/* Page Footer */}
      <footer className="relative z-20 py-4 text-center text-xs text-indigo-200/60">
        © {new Date().getFullYear()} CampusHub Inc. All rights reserved.
      </footer>
    </div>
  )
}

