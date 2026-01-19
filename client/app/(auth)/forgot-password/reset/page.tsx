"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthCard } from "@/components/auth-card"
import { Button } from "@/components/button"
import { PasswordInput } from "@/components/password-input"
import { userAuthMethods } from "@/services/methods/userMethods"
import { showSuccessToast, showErrorToast } from "@/utils/toast"
import { validatePassword } from "@/lib/validation/auth.validation"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" })

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("forgotPasswordEmail")
    if (!storedEmail) {
      router.push("/forgot-password")
    } else {
      setEmail(storedEmail)
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    let hasError = false
    const newErrors = { password: "", confirmPassword: "" }

    const passwordError = validatePassword(password)
    if (passwordError) {
      newErrors.password = passwordError
      hasError = true
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      hasError = true
    }

    setErrors(newErrors)
    if (hasError) {
      showErrorToast("Please fix the errors in the form")
      return
    }

    setIsLoading(true)

    try {
      const res = await userAuthMethods.resetPassword({ email, newPassword: password })
      if (res && res.ok) {
        showSuccessToast("Password reset successfully. Please login with your new password.")
        sessionStorage.removeItem("forgotPasswordEmail")
        router.push("/login")
      } else {
        showErrorToast(res?.msg || "Failed to reset password")
      }
    } catch (err) {
      showErrorToast("Reset failed")
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = !validatePassword(password) && password === confirmPassword && !isLoading

  return (
    <AuthCard title="Reset Password" description="Please choose a strong password.">
      <form onSubmit={handleSubmit} className="space-y-6">
        <PasswordInput
          label="New Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setErrors(prev => ({ ...prev, password: "" }))
          }}
          placeholder="••••••••"
          error={errors.password}
          name="password"
        />

        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            setErrors(prev => ({ ...prev, confirmPassword: "" }))
          }}
          placeholder="••••••••"
          error={errors.confirmPassword}
          name="confirmPassword"
        />

        <Button type="submit" className="w-full" isLoading={isLoading} disabled={!isFormValid}>
          Reset Password
        </Button>
      </form>
    </AuthCard>
  )
}
