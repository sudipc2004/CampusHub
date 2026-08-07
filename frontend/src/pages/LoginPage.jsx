import AuthLayoutWrapper from "./AuthLayoutWrapper"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <AuthLayoutWrapper>
      <LoginForm />
    </AuthLayoutWrapper>
  )
}
