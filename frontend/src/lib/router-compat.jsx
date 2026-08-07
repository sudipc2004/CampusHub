import React from "react"
import { Link as RouterLink, useNavigate, useLocation, useSearchParams as useRRSearchParams } from "react-router-dom"

/**
 * Next.js Link drop-in replacement for React Router DOM
 */
export const Link = React.forwardRef(({ href, to, children, ...props }, ref) => {
  const targetPath = href || to || "#"
  return (
    <RouterLink ref={ref} to={targetPath} {...props}>
      {children}
    </RouterLink>
  )
})
Link.displayName = "NextLinkCompat"

export default Link

/**
 * Next.js useRouter hook drop-in replacement
 */
export function useRouter() {
  const navigate = useNavigate()

  return {
    push: (path, options) => navigate(path, options),
    replace: (path, options) => navigate(path, { replace: true, ...options }),
    back: () => navigate(-1),
    forward: () => navigate(1),
    refresh: () => window.location.reload(),
    prefetch: () => {},
  }
}

/**
 * Next.js usePathname hook drop-in replacement
 */
export function usePathname() {
  const location = useLocation()
  return location.pathname
}

/**
 * Next.js useSearchParams hook drop-in replacement
 */
export function useSearchParams() {
  return useRRSearchParams()
}
