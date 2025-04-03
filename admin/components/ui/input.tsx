import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

interface InputWithIconProps extends React.ComponentProps<"input"> {
  Icon?: React.ElementType;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputWithIconProps>(({ Icon, className, type, ...props }, ref) => {
  return (
    <div className="flex h-10 w-full rounded-md border border-input bg-background text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm gap-4 items-center">
      <input
        type={type}
        ref={ref}
        {...props}
        className="w-full px-3 py-2 outline-none"
      />
      {Icon && <Icon className="text-primary mr-3 flex-shrink-0 h-5 w-5" aria-hidden="true" />}
    </div>
  )
})

Input.displayName = "Input"

export { Input, InputPassword }
