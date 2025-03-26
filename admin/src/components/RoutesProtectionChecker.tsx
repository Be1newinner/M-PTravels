"use client";

import { usePathname } from 'next/navigation';
import React from 'react'
import { AppSidebar } from './app-sidebar';
import { SidebarProvider } from './ui/sidebar';

export default function RoutesProtectionChecker({ children }: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const unprotectedRoutes = ["/login"]

    if (!unprotectedRoutes.includes(pathname)) {
        return (<SidebarProvider>
            <div className="flex h-screen w-full">
                <AppSidebar />
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </SidebarProvider>)
    }

    return <main className="flex-1 overflow-auto">{children}</main>
}
