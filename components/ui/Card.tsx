import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", hoverEffect = false, glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`glass-card ${glow ? "glow-border" : ""} ${
          hoverEffect ? "glass-hover" : ""
        } overflow-hidden ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex flex-col space-y-1.5 p-6 border-b border-zinc-900/60 ${className}`} {...props} />
);
CardHeader.displayName = "CardHeader";

export const CardTitle = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={`text-lg font-semibold leading-none tracking-tight text-zinc-50 ${className}`}
    {...props}
  />
);
CardTitle.displayName = "CardTitle";

export const CardDescription = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`text-sm text-zinc-400 ${className}`} {...props} />
);
CardDescription.displayName = "CardDescription";

export const CardContent = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 ${className}`} {...props} />
);
CardContent.displayName = "CardContent";

export const CardFooter = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex items-center p-6 pt-0 border-t border-zinc-900/60 ${className}`} {...props} />
);
CardFooter.displayName = "CardFooter";
