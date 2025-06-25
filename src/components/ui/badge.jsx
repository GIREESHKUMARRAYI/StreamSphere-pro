import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import './badge.css';

const badgeVariants = cva(
  "badge-base",
  {
    variants: {
      variant: {
        default: "badge-variant-default",
        secondary: "badge-variant-secondary",
        destructive: "badge-variant-destructive",
        outline: "badge-variant-outline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants }; 