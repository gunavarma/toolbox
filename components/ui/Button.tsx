import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "glass";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      primary: "bg-violet-600 text-zinc-50 hover:bg-violet-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]",
      secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 hover:text-zinc-50 border border-zinc-700/50",
      outline: "bg-transparent border border-zinc-700/80 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100",
      ghost: "bg-transparent text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-100",
      danger: "bg-red-600/90 text-zinc-50 hover:bg-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]",
      glass: "glass text-zinc-100 hover:bg-zinc-900/80 hover:border-violet-500/40 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          leftIcon
        )}
        {!isLoading && children}
        {rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
