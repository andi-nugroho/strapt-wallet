import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg"
  text?: string
  center?: boolean
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, size = "default", text, center = true, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-4 w-4",
      default: "h-6 w-6",
      lg: "h-8 w-8",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center gap-3",
          center && "justify-center min-h-[100px]",
          className
        )}
        {...props}
      >
        <div className="relative">
          <Loader2 
            className={cn(
              "animate-spin",
              sizeClasses[size],
              "text-primary/30"
            )} 
          />
          <div className={cn(
            "absolute top-0 left-0",
            "animate-spin-reverse [animation-delay:-0.2s]"
          )}>
            <Loader2 
              className={cn(
                sizeClasses[size],
                "gradient-text"
              )} 
            />
          </div>
        </div>
        {text && (
          <span className="text-sm font-medium gradient-text animate-pulse">
            {text}
          </span>
        )}
      </div>
    )
  }
)

Loading.displayName = "Loading"

export { Loading }