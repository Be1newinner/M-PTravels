"use client"

import { forwardRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onBlur?: () => void
}

const MarkdownEditor = forwardRef<HTMLTextAreaElement, MarkdownEditorProps>(
  ({ value, onChange, placeholder = "Write your content here using Markdown...", onBlur }, ref) => {
    return (
      <Tabs defaultValue="write" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="write" className="mt-0">
          <Textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
            className="min-h-[500px] font-mono resize-none border-t-0 rounded-t-none"
          />
        </TabsContent>
        <TabsContent value="preview" className="mt-0">
          <div className="min-h-[500px] p-4 border border-t-0 rounded-b-md prose prose-sm max-w-none overflow-auto">
            {/* Simple markdown rendering for preview */}
            <div dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, "<br />") }} />
          </div>
        </TabsContent>
      </Tabs>
    )
  },
)

MarkdownEditor.displayName = "MarkdownEditor"

export default MarkdownEditor

