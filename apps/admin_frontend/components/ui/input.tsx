"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

interface InputPasswordProps extends InputProps {
  Icon?: React.ComponentType<{ className?: string }>
}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(({ className, Icon, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input type={showPassword ? "text" : "password"} className={cn("pr-10", className)} ref={ref} {...props} />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Eye className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
    </div>
  )
})
InputPassword.displayName = "InputPassword"

export { Input, InputPassword }
