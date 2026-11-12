import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline";

export const chunkyClasses = (variant: Variant = "primary", className?: string) =>
  cn(
    "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-base font-extrabold tracking-tight transition-all active:translate-y-1 active:shadow-none disabled:pointer-events-none disabled:opacity-45",
    variant === "primary" && "bg-primary text-primary-foreground shadow-pop",
    variant === "accent" && "bg-accent text-accent-foreground shadow-pop-accent",
    variant === "outline" && "border-2 bg-card text-foreground shadow-pop-border",
    className,
  );

export const ChunkyButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
>(({ variant, className, ...props }, ref) => (
  <button ref={ref} className={chunkyClasses(variant, className)} {...props} />
));
ChunkyButton.displayName = "ChunkyButton";
