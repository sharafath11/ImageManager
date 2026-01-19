"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AuthCard } from "@/components/auth-card"
import { Button } from "@/components/button"
import { OTPInput } from "@/components/otp-input"
import { userAuthMethods } from "@/services/methods/userMethods"
import { showSuccessToast, showErrorToast } from "@/utils/toast"
import { validateOtp } from "@/lib/validation/auth.validation"

export default function VerifyForgotOtpPage() {
  const router = useRouter()
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("forgotPasswordEmail")
    if (!storedEmail) {
      router.push("/forgot-password")
    } else {
      setEmail(storedEmail)
    }
  }, [router])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const otpError = validateOtp(otp)
    if (otpError) {
      setError(otpError)
      showErrorToast(otpError)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const res = await userAuthMethods.verifyForgotOtp({ email, otp: otp.trim() })
      if (res && res.ok) {
        showSuccessToast("OTP verified successfully")
        router.push("/forgot-password/reset")
      } else {
        setError(res?.msg || "Invalid OTP")
        showErrorToast(res?.msg || "Invalid OTP")
      }
    } catch (err) {
      showErrorToast("Verification failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard title="Verify OTP" description={`We've sent a 6-digit code to ${email}`}>
      <form onSubmit={handleVerify} className="space-y-6">
        <OTPInput length={6} onChange={(val) => {
          setOtp(val)
          setError("")
        }} error={error} />

        <Button type="submit" className="w-full" isLoading={isLoading} disabled={otp.length !== 6 || isLoading}>
          Verify OTP
        </Button>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Didn't receive the code? </span>
          <button
            type="button"
            onClick={async () => {
              showSuccessToast("Sending a new OTP...")
              await userAuthMethods.forgotPassword({ email })
            }}
            className="font-medium text-foreground hover:underline"
          >
            Resend
          </button>
        </div>

        <div className="text-center">
          <Link href="/forgot-password" title="Change Email" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Change email
          </Link>
        </div>
      </form>
    </AuthCard>
  )
}
