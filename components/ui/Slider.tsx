import React from "react";

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  valueDisplay?: string | number;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className = "", label, valueDisplay, min = 0, max = 100, step = 1, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5 sm:space-y-2 w-full">
        {(label || valueDisplay !== undefined) && (
          <div className="flex justify-between items-center">
            {label && (
              <label className="text-xs sm:text-sm font-medium text-zinc-300 select-none">
                {label}
              </label>
            )}
            {valueDisplay !== undefined && (
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700/50 text-zinc-200">
                {valueDisplay}
              </span>
            )}
          </div>
        )}
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          className={`w-full accent-violet-600 bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer transition-all duration-200 focus:outline-none ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Slider.displayName = "Slider";
