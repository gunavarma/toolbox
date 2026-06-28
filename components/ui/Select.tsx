import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", label, options, error, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1 sm:space-y-1.5 w-full">
        {label && (
          <label className="text-xs sm:text-sm font-medium text-text-main/90 select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            ref={ref}
            className={`w-full bg-bg-secondary border border-border-primary rounded-lg sm:rounded-xl h-9 sm:h-10.5 px-2.5 sm:px-3.5 pr-8 sm:pr-10 text-xs sm:text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 appearance-none ${
              error ? "border-error focus:border-error focus:ring-error/40" : ""
            } ${className}`}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} className="bg-bg-primary text-text-main">
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-2.5 sm:right-3.5 pointer-events-none text-text-muted/70">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && <p className="text-[10px] sm:text-xs text-error font-medium">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
