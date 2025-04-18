"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Users, Bus, Package, FileText, LogOut, Menu, User, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/lib/store/auth-store"
import { useLogout } from "@/lib/api/auth-api"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const { user, isAuthenticated } = useAuthStore()
  const logout = useLogout()

  useEffect(() => {
    setIsMounted(true)

    // Check if user is logged in
    if (!isAuthenticated && pathname !== "/login") {
      router.push("/login")
    }
  }, [pathname, router, isAuthenticated])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Leads", href: "/leads", icon: Users },
    { name: "Bus Details", href: "/bus/edit", icon: Bus },
    { name: "Trip Packages", href: "/packages", icon: Package },
    { name: "Create Package", href: "/packages/new", icon: Plus },
    { name: "Blog", href: "/blog", icon: FileText },
  ]

  if (!isMounted) return null

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow border-r border-border bg-card">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-border">
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <div className="flex-grow flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                  )}
                >
                  <item.icon
                    className={cn(
                      pathname === item.href ? "text-primary" : "text-muted-foreground",
                      "mr-3 flex-shrink-0 h-5 w-5",
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-border p-4">
            <div className="flex items-center w-full">
              <div className="flex-shrink-0">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="Admin" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">{user?.name || "Admin User"}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground flex items-center mt-1 px-0"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-1 h-3 w-3" />
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden flex items-center h-16 px-4 border-b border-border bg-card">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[280px] p-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-border">
                <h1 className="text-xl font-bold">Admin Panel</h1>
              </div>
              <div className="flex-grow flex flex-col pt-5 pb-4 overflow-y-auto">
                <nav className="mt-5 flex-1 px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      )}
                    >
                      <item.icon
                        className={cn(
                          pathname === item.href ? "text-primary" : "text-muted-foreground",
                          "mr-3 flex-shrink-0 h-5 w-5",
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-border p-4">
                <div className="flex items-center w-full">
                  <div className="flex-shrink-0">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" alt="Admin" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium">{user?.name || "Admin User"}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground flex items-center mt-1 px-0"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-1 h-3 w-3" />
                      Sign out
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-bold">Admin Panel</h1>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto bg-muted/30 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

