"use client"

import { useEffect, useState, useRef } from "react"
import { IUser } from "@/types/user/userTypes"
import { userMethods, userAuthMethods } from "@/services/methods/userMethods"
import { showInfoToast } from "@/utils/toast"
import { useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"

export default function Header() {
  const [user, setUser] = useState<IUser | null>(null)
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const fetchUser = async () => {
    const res = await userMethods.me()
    if (!res.ok) {
      showInfoToast(res.msg)
      return
    }
    setUser(res.data)
  }

  const logout = async () => {
    await userAuthMethods.logout()
    router.replace("/login")
  }

  useEffect(() => {
    fetchUser()
  }, [])
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <header className="w-full border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        {}
        <h2 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
          Image Manager
        </h2>

        {}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg px-3 py-2"
          >
            <span className="truncate max-w-[120px] sm:max-w-[160px]">
              {user?.name || "User"}
            </span>
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 sm:w-56 rounded-lg border bg-background shadow-lg shadow-black/5 animate-in fade-in-0 zoom-in-95">
              <button
                onClick={() => {
                  router.push("/forgot-password")
                  setOpen(false)
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-accent transition-colors border-b"
              >
                Forgot Password
              </button>

              <button
                onClick={logout}
                className="w-full px-4 py-3 text-left text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}