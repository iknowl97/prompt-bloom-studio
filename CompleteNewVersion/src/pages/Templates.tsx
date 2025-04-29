import * as React from "react"
import { useLocation } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Star } from "lucide-react"

interface Template {
  id: string
  name: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "expert"
  rating: number
  usageCount: number
  author: {
    name: string
    avatar: string
  }
}

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Story Writing Assistant",
    description: "A template for creative writing prompts that help generate engaging stories.",
    category: "Creative",
    difficulty: "beginner",
    rating: 4.5,
    usageCount: 1234,
    author: {
      name: "Alice Writer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    },
  },
  {
    id: "2",
    name: "Code Documentation",
    description: "Generate comprehensive documentation for your code with this template.",
    category: "Technical",
    difficulty: "intermediate",
    rating: 4.8,
    usageCount: 987,
    author: {
      name: "Bob Coder",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    },
  },
  {
    id: "3",
    name: "Marketing Copy",
    description: "Create compelling marketing copy for various platforms and audiences.",
    category: "Marketing",
    difficulty: "intermediate",
    rating: 4.2,
    usageCount: 2345,
    author: {
      name: "Carol Marketer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
    },
  },
]

export function Templates() {
  const location = useLocation()
  const [search, setSearch] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<Template["difficulty"] | null>(null)

  const isPersonal = location.pathname === "/templates/personal"

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(search.toLowerCase()) ||
      template.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !selectedCategory || template.category === selectedCategory
    const matchesDifficulty = !selectedDifficulty || template.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-text-primary">
          {isPersonal ? "My Templates" : "Community Templates"}
        </h1>
        <Button>Create Template</Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <Input
            className="pl-10"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <p className="mt-1 text-sm text-text-secondary">
                    by {template.author.name}
                  </p>
                </div>
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{template.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <p className="mb-4 flex-1 text-sm text-text-secondary">
                {template.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-400">
                    {template.category}
                  </span>
                  <span className="rounded-full bg-secondary-50 px-2 py-1 text-xs font-medium text-secondary-900">
                    {template.difficulty}
                  </span>
                </div>
                <span className="text-xs text-text-secondary">
                  {template.usageCount} uses
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 