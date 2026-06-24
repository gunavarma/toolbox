import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, description, error, leftIcon, rightIcon, type = "text", ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-text-main/90 select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-text-muted/60 pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={`w-full bg-bg-secondary border border-border-primary rounded-xl h-10.5 px-3.5 text-sm text-text-main placeholder-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${
              leftIcon ? "pl-10" : ""
            } ${rightIcon ? "pr-10" : ""} ${
              error ? "border-error focus:border-error focus:ring-error/40" : ""
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-text-muted/60 pointer-events-none flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {description && !error && (
          <p className="text-xs text-text-muted/70">{description}</p>
        )}
        {error && <p className="text-xs text-error font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
