import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode; // Permite pasar un JSX en lugar de un componente
  error?: boolean; // Indica si hay un error
  helperText?: string; // Texto de ayuda o error
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon,error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
      <div className="relative w-full">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </span>
        )}
        <input
          type={type}
          className={cn(
            "flex h-16 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            icon ? "pl-10" : "", // Agrega padding si hay icono
            error ? "border-red-500 focus-visible:ring-red-500" : "border-input",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
      {helperText && (
          <p className={cn("mt-1 text-sm", error ? "text-red-500" : "text-gray-500")}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
