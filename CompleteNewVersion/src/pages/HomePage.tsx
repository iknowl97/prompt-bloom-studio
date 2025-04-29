import * as React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2, Sparkles, BookOpen, Users } from "lucide-react"

const features = [
  {
    name: "Visual Prompt Builder",
    description:
      "Create powerful prompts with our intuitive drag-and-drop interface.",
    icon: Wand2,
  },
  {
    name: "Smart Suggestions",
    description:
      "Get AI-powered recommendations to optimize your prompts for better results.",
    icon: Sparkles,
  },
  {
    name: "Learning Resources",
    description:
      "Access comprehensive guides and tutorials to master prompt engineering.",
    icon: BookOpen,
  },
  {
    name: "Community Templates",
    description:
      "Explore and share prompt templates with our growing community.",
    icon: Users,
  },
]

export function HomePage() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-6xl">
          Master the Art of{" "}
          <span className="bg-gradient-to-r from-primary-400 to-secondary-300 bg-clip-text text-transparent">
            Prompt Engineering
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
          Create, optimize, and manage AI prompts with our powerful visual tools.
          Perfect for both beginners and experts.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg">
            <Link to="/prompt-builder">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/learn">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="mb-8 text-center text-3xl font-bold text-text-primary">
          Everything you need to create perfect prompts
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.name}>
                <CardHeader>
                  <Icon className="h-8 w-8 text-primary-400" />
                  <CardTitle className="mt-4">{feature.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl bg-primary-50 px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
          Ready to start creating better prompts?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
          Join our community of prompt engineers and start creating more effective
          AI interactions today.
        </p>
        <Button className="mt-8" size="lg" asChild>
          <Link to="/prompt-builder">Start Building</Link>
        </Button>
      </section>
    </div>
  )
} 