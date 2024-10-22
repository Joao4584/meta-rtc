import * as React from "react"
import { cn } from "@/lib/utils"

const Divider = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("w-full border-t border-border", className)}
    {...props}
  />
)
Divider.displayName = "Divider"

export { Divider }
