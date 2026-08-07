import { useState } from "react"
import { SiteHeader } from "@/components/landing/site-header"
import { Hero } from "@/components/landing/hero"
import { KnowledgeBase } from "@/components/landing/knowledge-base"
import { AgenticAi } from "@/components/landing/agentic-ai"
import { Roles } from "@/components/landing/roles"
import { FeatureGrid } from "@/components/landing/feature-grid"
import { AnalyticsSection } from "@/components/landing/analytics-section"
import { CtaFooter } from "@/components/landing/cta-footer"
import { AuthModal } from "@/components/auth/auth-modal"

export default function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false)

  const openLogin = () => setShowLoginModal(true)
  const closeLogin = () => setShowLoginModal(false)

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader onOpenLogin={openLogin} />
      <main>
        <Hero onOpenLogin={openLogin} />
        <KnowledgeBase />
        <AgenticAi />
        <Roles />
        <FeatureGrid />
        <AnalyticsSection />
        <CtaFooter />
      </main>

      {/* Account Creation / Login Popup Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-md animate-in fade-in duration-200">
          {/* Backdrop Overlay Click */}
          <div
            className="absolute inset-0"
            onClick={closeLogin}
            aria-label="Close modal backdrop"
          />
          {/* Centered Floating Card */}
          <div className="relative z-10 my-auto w-full flex justify-center">
            <AuthModal onClose={closeLogin} />
          </div>
        </div>
      )}
    </div>
  )
}
