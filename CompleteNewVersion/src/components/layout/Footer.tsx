import * as React from "react"
import { Link } from "react-router-dom"
import { Github, Twitter, Linkedin } from "lucide-react"

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Documentation", href: "/docs" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
  social: [
    {
      name: "GitHub",
      href: "https://github.com/promptbloom/studio",
      icon: Github,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/promptbloom",
      icon: Twitter,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/promptbloom",
      icon: Linkedin,
    },
  ],
}

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link
                to={item.href}
                className="text-sm leading-6 text-text-secondary hover:text-primary-400"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.name}
                href={item.href}
                className="text-text-secondary hover:text-primary-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{item.name}</span>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </a>
            )
          })}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-text-secondary">
          &copy; {new Date().getFullYear()} Prompt Bloom Studio. All rights
          reserved.
        </p>
      </div>
    </footer>
  )
} 