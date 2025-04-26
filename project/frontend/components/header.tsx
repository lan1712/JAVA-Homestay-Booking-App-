"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)

    // Check if user is logged in
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      setIsLoggedIn(true)
      try {
        const user = JSON.parse(userData)
        setIsAdmin(user.role === "ADMIN")
      } catch (error) {
        console.error("Failed to parse user data", error)
      }
    }

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setIsAdmin(false)
    window.location.href = "/"
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Homestays", href: "/homestays" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled || pathname !== "/" ? "bg-white shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-teal-600">Good Place Travel</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-teal-600",
                pathname === item.href ? "text-teal-600" : "text-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center space-x-4 md:flex">
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <Link href="/admin/dashboard">
                  <Button variant="outline" size="sm">
                    Admin Dashboard
                  </Button>
                </Link>
              )}
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  My Profile
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-teal-600 hover:bg-teal-700" size="sm">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-6 pt-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-teal-600",
                    pathname === item.href ? "text-teal-600" : "text-foreground",
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-6">
                {isLoggedIn ? (
                  <div className="flex flex-col space-y-4">
                    {isAdmin && (
                      <Link href="/admin/dashboard">
                        <Button variant="outline" className="w-full">
                          Admin Dashboard
                        </Button>
                      </Link>
                    )}
                    <Link href="/profile">
                      <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                        <User className="h-4 w-4" />
                        My Profile
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <Link href="/auth/login">
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button className="w-full bg-teal-600 hover:bg-teal-700">Register</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
