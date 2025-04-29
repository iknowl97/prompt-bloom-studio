import * as React from "react"
import { useLocation } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  GraduationCap,
  Code2,
  Star,
  CheckCircle,
  ChevronRight,
} from "lucide-react"

interface Module {
  id: string
  title: string
  description: string
  duration: string
  level: "beginner" | "intermediate" | "advanced"
  completed: boolean
  icon: React.ElementType
  sections: {
    id: string
    title: string
    completed: boolean
  }[]
}

const modules: Module[] = [
  {
    id: "basics",
    title: "Prompt Engineering Basics",
    description: "Learn the fundamentals of crafting effective prompts for AI models.",
    duration: "45 mins",
    level: "beginner",
    completed: false,
    icon: BookOpen,
    sections: [
      { id: "intro", title: "Introduction to Prompts", completed: true },
      { id: "structure", title: "Prompt Structure", completed: false },
      { id: "variables", title: "Using Variables", completed: false },
    ],
  },
  {
    id: "advanced",
    title: "Advanced Techniques",
    description: "Master advanced prompt engineering patterns and strategies.",
    duration: "1.5 hours",
    level: "intermediate",
    completed: false,
    icon: GraduationCap,
    sections: [
      { id: "patterns", title: "Common Patterns", completed: false },
      { id: "optimization", title: "Prompt Optimization", completed: false },
      { id: "chaining", title: "Prompt Chaining", completed: false },
    ],
  },
  {
    id: "examples",
    title: "Real-world Examples",
    description: "Explore practical examples and case studies of prompt engineering.",
    duration: "2 hours",
    level: "advanced",
    completed: false,
    icon: Code2,
    sections: [
      { id: "creative", title: "Creative Writing", completed: false },
      { id: "coding", title: "Code Generation", completed: false },
      { id: "analysis", title: "Data Analysis", completed: false },
    ],
  },
]

export function Learn() {
  const location = useLocation()
  const [activeModule, setActiveModule] = React.useState<string | null>(null)

  React.useEffect(() => {
    const path = location.pathname.split("/")[2]
    if (path) {
      setActiveModule(path)
    }
  }, [location])

  const getLevelColor = (level: Module["level"]) => {
    switch (level) {
      case "beginner":
        return "text-green-500"
      case "intermediate":
        return "text-blue-500"
      case "advanced":
        return "text-purple-500"
      default:
        return "text-text-secondary"
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Learning Center</h1>
        <p className="mt-2 text-text-secondary">
          Master the art of prompt engineering with our comprehensive tutorials and
          guides.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <Card
            key={module.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              activeModule === module.id ? "ring-2 ring-primary-400" : ""
            }`}
            onClick={() => setActiveModule(module.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary-50 p-2">
                    <module.icon className="h-5 w-5 text-primary-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <p className="mt-1 text-sm text-text-secondary">
                      {module.duration}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm font-medium ${getLevelColor(module.level)}`}
                >
                  {module.level}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-text-secondary">
                {module.description}
              </p>
              <div className="space-y-2">
                {module.sections.map((section) => (
                  <div
                    key={section.id}
                    className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      {section.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-text-secondary" />
                      )}
                      {section.title}
                    </div>
                    <ChevronRight className="h-4 w-4 text-text-secondary" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary-100 text-xs font-medium text-primary-400"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div>
                <p className="font-medium text-text-primary">
                  3 Modules Remaining
                </p>
                <p className="text-sm text-text-secondary">Keep going!</p>
              </div>
            </div>
            <Button>Continue Learning</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 