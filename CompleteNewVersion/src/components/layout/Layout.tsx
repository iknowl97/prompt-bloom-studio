import * as React from "react"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { Footer } from "./Footer"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-background p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  )
} 