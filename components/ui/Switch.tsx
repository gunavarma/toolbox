import React from "react";

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className = "", label, description, checked, onChange, ...props }, ref) => {
    return (
      <div className="flex items-start justify-between space-x-2 sm:space-x-3 select-none">
        {(label || description) && (
          <div className="flex flex-col">
            {label && <span className="text-xs sm:text-sm font-medium text-zinc-300">{label}</span>}
            {description && <span className="text-[10px] sm:text-xs text-zinc-500">{description}</span>}
          </div>
        )}
        <label className="relative inline-flex items-center cursor-pointer mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="sr-only peer"
            {...props}
          />
          <div className="w-8 sm:w-9 h-4 sm:h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-3 sm:after:h-4 after:w-3 sm:after:w-4 after:transition-all peer-checked:bg-violet-600 peer-checked:after:bg-zinc-50 peer-checked:after:border-violet-600 transition-colors duration-200"></div>
        </label>
      </div>
    );
  }
);

Switch.displayName = "Switch";
