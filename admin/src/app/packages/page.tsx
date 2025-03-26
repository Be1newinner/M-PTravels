import { SidebarTrigger } from "@/components/ui/sidebar"

export default function PackagesPage() {
  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
        <SidebarTrigger />
        <h1 className="font-semibold text-lg">Packages</h1>
      </header>
      <div className="flex-1 p-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Packages Management</h2>
          <p className="text-muted-foreground">This is the packages management page.</p>
        </div>
      </div>
    </div>
  )
}

