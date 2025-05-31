import { cn } from "@/lib/utils";
import * as Slot from "@rn-primitives/slot";
import type { SlottableTextProps, TextRef } from "@rn-primitives/types";
import * as React from "react";
import { Text as RNText } from "react-native";

// Headline Components - Sora Font (Impactful & Stylish)
const H1 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        role="heading"
        aria-level="1"
        className={cn(
          "web:scroll-m-20 font-sora text-4xl text-foreground font-extrabold tracking-tight lg:text-5xl web:select-text",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
H1.displayName = "H1";

const H2 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        role="heading"
        aria-level="2"
        className={cn(
          "web:scroll-m-20 font-sora text-3xl text-foreground font-bold tracking-tight web:select-text",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
H2.displayName = "H2";

const H3 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        role="heading"
        aria-level="3"
        className={cn(
          "web:scroll-m-20 font-sora text-2xl text-foreground font-semibold tracking-tight web:select-text",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
H3.displayName = "H3";

const H4 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        role="heading"
        aria-level="4"
        className={cn(
          "web:scroll-m-20 font-sora text-xl text-foreground font-semibold tracking-tight web:select-text",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
H4.displayName = "H4";

// Body Text Components - DM Sans (Clean & Friendly)
const P = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          "font-dm-sans text-base text-foreground leading-7 web:select-text [&:not(:first-child)]:mt-6",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
P.displayName = "P";

const Lead = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          "font-dm-sans text-xl text-muted-foreground font-medium leading-7 web:select-text",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Lead.displayName = "Lead";

const Large = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          "font-dm-sans text-lg text-foreground font-semibold leading-7 web:select-text",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Large.displayName = "Large";

const Small = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          "font-dm-sans text-sm text-muted-foreground font-medium leading-none web:select-text",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Small.displayName = "Small";

const Muted = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn("font-dm-sans text-sm text-muted-foreground web:select-text", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Muted.displayName = "Muted";

// Metrics Components - Space Grotesk (Strong Visual Presence)
const MetricLarge = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          "font-space-grotesk text-6xl text-primary font-bold leading-none web:select-text",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
MetricLarge.displayName = "MetricLarge";

const MetricMedium = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          "font-space-grotesk text-4xl text-primary font-semibold leading-tight web:select-text",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
MetricMedium.displayName = "MetricMedium";

const MetricSmall = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          "font-space-grotesk text-2xl text-primary font-medium leading-snug web:select-text",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
MetricSmall.displayName = "MetricSmall";

const Counter = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          "font-space-grotesk text-xl text-foreground font-semibold leading-snug web:select-text",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Counter.displayName = "Counter";

// Special Components for Fitness Context
const WorkoutTitle = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          "font-sora text-2xl text-foreground font-bold tracking-tight web:select-text",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
WorkoutTitle.displayName = "WorkoutTitle";

const ExerciseName = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          "font-dm-sans text-lg text-foreground font-semibold leading-snug web:select-text",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
ExerciseName.displayName = "ExerciseName";

const StatLabel = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          "font-dm-sans text-sm text-muted-foreground font-medium uppercase tracking-wider web:select-text",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
StatLabel.displayName = "StatLabel";

const Timer = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          "font-space-grotesk text-5xl text-accent font-bold leading-none web:select-text",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Timer.displayName = "Timer";

export {
  Counter,
  ExerciseName,
  H1,
  H2,
  H3,
  H4,
  Large,
  Lead,
  MetricLarge,
  MetricMedium,
  MetricSmall,
  Muted,
  P,
  Small,
  StatLabel,
  Timer,
  WorkoutTitle,
};
