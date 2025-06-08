"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

interface SimpleMarkdownEditorProps {
  initialContent?: string
  onChange: (value: string) => void
}

export default function SimpleMarkdownEditor({ initialContent = "", onChange }: SimpleMarkdownEditorProps) {
  const [markdown, setMarkdown] = useState(initialContent)
  const [html, setHtml] = useState("")

  useEffect(() => {
    if (initialContent !== markdown) {
      setMarkdown(initialContent)
    }
  }, [initialContent])

  useEffect(() => {
    const convertMarkdownToHtml = async () => {
      try {
        const { unified } = await import("unified")
        const { default: remarkParse } = await import("remark-parse")
        const { default: remarkRehype } = await import("remark-rehype")
        const { default: rehypeStringify } = await import("rehype-stringify")

        const result = await unified().use(remarkParse).use(remarkRehype).use(rehypeStringify).process(markdown)

        setHtml(String(result))
      } catch (error) {
        console.error("Error converting markdown to HTML:", error)
        setHtml(markdown.replace(/\n/g, "<br />"))
      }
    }

    convertMarkdownToHtml()
  }, [markdown])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setMarkdown(value)
    onChange(value)
  }

  return (
    <Tabs defaultValue="write" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="write">Write</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="write" className="mt-0">
        <Textarea
          value={markdown}
          onChange={handleChange}
          placeholder="Write your content here using Markdown..."
          className="min-h-[500px] font-mono resize-none border rounded-md p-4"
        />
        <p className="text-sm text-muted-foreground mt-2">
          Use Markdown syntax: # for headings, * for lists, &gt; for quotes, `code` for inline code, etc.
        </p>
      </TabsContent>
      <TabsContent value="preview" className="mt-0">
        <div
          className="prose prose-sm max-w-none p-4 min-h-[500px] border rounded-md overflow-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </TabsContent>
    </Tabs>
  )
}
