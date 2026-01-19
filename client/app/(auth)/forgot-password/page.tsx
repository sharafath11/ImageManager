"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AuthCard } from "@/components/auth-card"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { userAuthMethods } from "@/services/methods/userMethods"
import { showSuccessToast, showErrorToast } from "@/utils/toast"
import { validateEmail } from "@/lib/validation/auth.validation"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const emailError = validateEmail(email)
    if (emailError) {
      setError(emailError)
      showErrorToast(emailError)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const res = await userAuthMethods.forgotPassword({ email: email.trim() })
      if (res && res.ok) {
        showSuccessToast("If an account exists with this email, you will receive an OTP.")
        sessionStorage.setItem("forgotPasswordEmail", email.trim())
        router.push("/forgot-password/verify")
      } else {
        showErrorToast(res?.msg || "Something went wrong")
      }
    } catch (err) {
      showErrorToast("Failed to send OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const isEmailValid = !validateEmail(email)

  return (
    <AuthCard title="Forgot password?" description="No worries, we'll send you reset instructions.">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError("")
          }}
          error={error}
        />

        <Button type="submit" className="w-full" isLoading={isLoading} disabled={!isEmailValid || isLoading}>
          Send OTP
        </Button>

        <div className="text-center">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Back to login
            </Link>
        </div>
      </form>
    </AuthCard>
  )
}
