import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  Code2,
  Folder,
  Home,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

interface SidebarItemProps {
  icon: React.ReactNode
  title: string
  href: string
  isActive?: boolean
  isCollapsible?: boolean
  isOpen?: boolean
  onToggle?: () => void
  children?: React.ReactNode
}

const SidebarItem = ({
  icon,
  title,
  href,
  isActive,
  isCollapsible,
  isOpen,
  onToggle,
  children,
}: SidebarItemProps) => {
  const content = (
    <>
      <div className="flex items-center">
        <span className="mr-3">{icon}</span>
        <span>{title}</span>
      </div>
      {isCollapsible && (
        <span className="ml-auto">
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </span>
      )}
    </>
  )

  return (
    <div>
      {isCollapsible ? (
        <button
          onClick={onToggle}
          className={cn(
            "flex w-full items-center justify-between px-4 py-2 text-sm font-medium",
            isActive
              ? "bg-primary-50 text-primary-400"
              : "text-text-primary hover:bg-primary-50 hover:text-primary-400"
          )}
        >
          {content}
        </button>
      ) : (
        <Link
          to={href}
          className={cn(
            "flex w-full items-center px-4 py-2 text-sm font-medium",
            isActive
              ? "bg-primary-50 text-primary-400"
              : "text-text-primary hover:bg-primary-50 hover:text-primary-400"
          )}
        >
          {content}
        </Link>
      )}
      {isCollapsible && isOpen && (
        <div className="ml-4 border-l border-primary-100 pl-4">{children}</div>
      )}
    </div>
  )
}

export function Sidebar() {
  const location = useLocation()
  const [openSections, setOpenSections] = React.useState<string[]>([])

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    )
  }

  return (
    <div className="flex h-full w-64 flex-col border-r border-primary-100 bg-white">
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1">
          <SidebarItem
            icon={<Home className="h-5 w-5" />}
            title="Home"
            href="/"
            isActive={location.pathname === "/"}
          />
          <SidebarItem
            icon={<Code2 className="h-5 w-5" />}
            title="Prompt Builder"
            href="/prompt-builder"
            isActive={location.pathname === "/prompt-builder"}
          />
          <SidebarItem
            icon={<Folder className="h-5 w-5" />}
            title="Templates"
            isCollapsible
            isOpen={openSections.includes("templates")}
            onToggle={() => toggleSection("templates")}
            href="/templates"
          >
            <Link
              to="/templates/community"
              className="block py-2 pl-2 text-sm text-text-secondary hover:text-primary-400"
            >
              Community Templates
            </Link>
            <Link
              to="/templates/personal"
              className="block py-2 pl-2 text-sm text-text-secondary hover:text-primary-400"
            >
              My Templates
            </Link>
          </SidebarItem>
          <SidebarItem
            icon={<BookOpen className="h-5 w-5" />}
            title="Learn"
            isCollapsible
            isOpen={openSections.includes("learn")}
            onToggle={() => toggleSection("learn")}
            href="/learn"
          >
            <Link
              to="/learn/basics"
              className="block py-2 pl-2 text-sm text-text-secondary hover:text-primary-400"
            >
              Basics
            </Link>
            <Link
              to="/learn/advanced"
              className="block py-2 pl-2 text-sm text-text-secondary hover:text-primary-400"
            >
              Advanced Techniques
            </Link>
            <Link
              to="/learn/examples"
              className="block py-2 pl-2 text-sm text-text-secondary hover:text-primary-400"
            >
              Examples
            </Link>
          </SidebarItem>
        </nav>
      </div>
      <div className="border-t border-primary-100 p-4">
        <SidebarItem
          icon={<Settings className="h-5 w-5" />}
          title="Settings"
          href="/settings"
          isActive={location.pathname === "/settings"}
        />
      </div>
    </div>
  )
} 