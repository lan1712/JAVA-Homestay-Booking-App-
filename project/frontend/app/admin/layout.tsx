"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Home, CalendarDays, Users, Star, Settings, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in and is an admin
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/auth/login")
      return
    }

    try {
      const user = JSON.parse(userData)
      if (user.role !== "ADMIN") {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin area.",
          variant: "destructive",
        })
        router.push("/")
        return
      }
      setIsAdmin(true)
    } catch (error) {
      console.error("Failed to parse user data", error)
      router.push("/auth/login")
    } finally {
      setIsLoading(false)
    }
  }, [router, toast])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/auth/login")
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Homestays", href: "/admin/homestays", icon: <Home className="h-5 w-5" /> },
    { name: "Bookings", href: "/admin/bookings", icon: <CalendarDays className="h-5 w-5" /> },
    { name: "Users", href: "/admin/users", icon: <Users className="h-5 w-5" /> },
    { name: "Reviews", href: "/admin/reviews", icon: <Star className="h-5 w-5" /> },
    { name: "Settings", href: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
  ]

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 md:hidden">
        <Link href="/admin/dashboard" className="flex items-center">
          <span className="text-xl font-bold text-teal-600">Good Place Travel</span>
          <span className="ml-2 rounded-md bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800">Admin</span>
        </Link>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <span className="h-8 w-8 rounded-full bg-teal-100 text-center text-sm font-medium leading-8 text-teal-800">
                  A
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <div className="border-b p-4">
                <Link href="/admin/dashboard" className="flex items-center">
                  <span className="text-xl font-bold text-teal-600">Good Place Travel</span>
                  <span className="ml-2 rounded-md bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800">Admin</span>
                </Link>
              </div>
              <ScrollArea className="h-[calc(100vh-65px)]">
                <div className="p-4">
                  <nav className="flex flex-col space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                          pathname === item.href
                            ? "bg-teal-100 text-teal-900"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        {item.icon}
                        <span className="ml-3">{item.name}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Desktop Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-shrink-0 border-r bg-white md:block">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/admin/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-teal-600">Good Place Travel</span>
            </Link>
          </div>
          <div className="flex h-[calc(100vh-64px)] flex-col justify-between">
            <ScrollArea className="flex-1 py-4">
              <nav className="px-4">
                <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Main</div>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`mb-1 flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                      pathname === item.href
                        ? "bg-teal-100 text-teal-900"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </ScrollArea>
            <div className="border-t p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-teal-100 text-center text-sm font-medium leading-8 text-teal-800">
                    A
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-gray-500">admin@goodplacetravel.com</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50 pb-8">
          <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
