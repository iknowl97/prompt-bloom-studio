import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Wand2, Plus, Save, Copy } from "lucide-react"

interface BlockSettings {
  placeholder?: string
  defaultValue?: string
  options?: string[]
}

interface PromptBlock {
  id: string
  type: "text" | "variable" | "condition" | "loop"
  content: string
  settings?: BlockSettings
}

export function PromptBuilder() {
  const [blocks, setBlocks] = React.useState<PromptBlock[]>([])
  const [preview, setPreview] = React.useState("")

  const addBlock = (type: PromptBlock["type"]) => {
    const newBlock: PromptBlock = {
      id: Math.random().toString(36).substring(7),
      type,
      content: "",
    }
    setBlocks((prev) => [...prev, newBlock])
  }

  const updateBlock = (id: string, content: string) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, content } : block
      )
    )
  }

  const removeBlock = (id: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id))
  }

  const generatePreview = () => {
    const previewText = blocks
      .map((block) => {
        switch (block.type) {
          case "text":
            return block.content
          case "variable":
            return `{${block.content}}`
          case "condition":
            return `[IF ${block.content}]`
          case "loop":
            return `[FOR ${block.content}]`
          default:
            return block.content
        }
      })
      .join(" ")
    setPreview(previewText)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-text-primary">Prompt Builder</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => {}}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button onClick={() => {}}>
            <Wand2 className="mr-2 h-4 w-4" />
            Generate
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Builder Section */}
        <Card>
          <CardHeader>
            <CardTitle>Build Your Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addBlock("text")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Text
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addBlock("variable")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Variable
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addBlock("condition")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Condition
                </Button>
              </div>

              <div className="space-y-4">
                {blocks.map((block) => (
                  <div
                    key={block.id}
                    className="flex items-center gap-2 rounded-md border border-primary-100 p-2"
                  >
                    <div className="flex-1">
                      <Input
                        value={block.content}
                        onChange={(e) =>
                          updateBlock(block.id, e.target.value)
                        }
                        placeholder={`Enter ${block.type}...`}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBlock(block.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={generatePreview}
              >
                Generate Preview
              </Button>
              <div className="min-h-[200px] rounded-md border border-primary-100 p-4">
                <p className="whitespace-pre-wrap text-text-primary">
                  {preview || "Your prompt preview will appear here..."}
                </p>
              </div>
              {preview && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigator.clipboard.writeText(preview)}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 