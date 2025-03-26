import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import RoutesProtectionChecker from "@/components/RoutesProtectionChecker"

export const metadata = {
  title: "Dashboard",
  description: "Dashboard application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <RoutesProtectionChecker>
            {children}
          </RoutesProtectionChecker>
        </ThemeProvider>
      </body>
    </html>
  )
}

