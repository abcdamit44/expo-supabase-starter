# Perfect Font Stack for Modern Fitness App

This document outlines the typography system implemented in our fitness app, featuring three carefully selected Google Fonts that create a modern, energetic, and professional appearance.

## Font Stack Overview

### 🔹 Headlines (Impactful & Stylish)
**Sora**
- **Style**: Sharp, futuristic, bold
- **Use Cases**: App name, headers, feature titles, workout titles
- **Tailwind Classes**: `font-sora`
- **CSS**: `font-family: 'Sora', sans-serif;`

### 🔹 Body Text (Clean & Friendly)
**DM Sans**
- **Style**: Smooth, readable, professional
- **Use Cases**: Descriptions, stats, menus, exercise names
- **Tailwind Classes**: `font-dm-sans`
- **CSS**: `font-family: 'DM Sans', sans-serif;`

### 🔹 Numbers & Metrics (Strong Visual Presence)
**Space Grotesk**
- **Style**: Technical yet elegant
- **Use Cases**: Timers, reps, weight counters, statistics
- **Tailwind Classes**: `font-space-grotesk`
- **CSS**: `font-family: 'Space Grotesk', sans-serif;`

## Typography Components

### Headline Components (Sora Font)
```tsx
import { H1, H2, H3, H4, WorkoutTitle } from "@/components/ui/typography";

<H1>FitnessPro</H1>              // App title, main headers
<H2>Your Fitness Journey</H2>     // Section headers
<H3>Today's Workout</H3>          // Subsection headers
<H4>Exercise Details</H4>         // Minor headers
<WorkoutTitle>Push Day</WorkoutTitle> // Workout specific titles
```

### Body Text Components (DM Sans)
```tsx
import { P, Lead, Large, Small, ExerciseName, StatLabel } from "@/components/ui/typography";

<Lead>Transform your body and mind...</Lead>     // Intro text
<P>Track your workouts, monitor...</P>           // Regular paragraphs
<Large>Ready to start?</Large>                  // Emphasized text
<ExerciseName>Bench Press</ExerciseName>         // Exercise names
<StatLabel>Current Weight</StatLabel>            // Stat labels
<Small>Last workout: 2 days ago</Small>          // Secondary info
```

### Metrics Components (Space Grotesk)
```tsx
import { MetricLarge, MetricMedium, MetricSmall, Counter, Timer } from "@/components/ui/typography";

<MetricLarge>185</MetricLarge>        // Primary metrics (weight, calories)
<MetricMedium>12</MetricMedium>       // Secondary metrics (reps, sets)
<MetricSmall>3</MetricSmall>          // Tertiary metrics
<Counter>247</Counter>                // General counters
<Timer>02:30</Timer>                  // Timer displays
```

## Custom Font Utility Classes

### Headlines (Sora)
- `.font-headline` - Regular headline styling (600 weight)
- `.font-headline-bold` - Bold headlines (700 weight)
- `.font-headline-extra-bold` - Extra bold headlines (800 weight)

### Body Text (DM Sans)
- `.font-body` - Regular body text (400 weight)
- `.font-body-medium` - Medium body text (500 weight)
- `.font-body-semibold` - Semibold body text (600 weight)

### Metrics (Space Grotesk)
- `.font-metric` - Regular metrics (500 weight)
- `.font-metric-bold` - Bold metrics (600 weight)
- `.font-metric-extra-bold` - Extra bold metrics (700 weight)

## Implementation Details

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100;0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;1,9..40,100;1,9..40,200;1,9..40,300;1,9..40,400;1,9..40,500;1,9..40,600;1,9..40,700;1,9..40,800;1,9..40,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
```

### Tailwind Configuration
```javascript
// tailwind.config.js
fontFamily: {
  'sora': ['Sora', 'sans-serif'],
  'dm-sans': ['DM Sans', 'sans-serif'],
  'space-grotesk': ['Space Grotesk', 'sans-serif'],
}
```

## Usage Examples

### Workout Card
```tsx
<View className="space-y-2">
  <WorkoutTitle>Push Day</WorkoutTitle>
  <P className="text-muted-foreground">Chest, Shoulders, and Triceps</P>
  <View className="flex-row justify-between items-center">
    <View>
      <ExerciseName>Push-ups</ExerciseName>
      <Small>3 sets × 15 reps</Small>
    </View>
    <Counter>45</Counter>
  </View>
</View>
```

### Stats Dashboard
```tsx
<View className="flex-row justify-between">
  <View className="items-center">
    <StatLabel>Workouts</StatLabel>
    <MetricMedium>4</MetricMedium>
  </View>
  <View className="items-center">
    <StatLabel>Minutes</StatLabel>
    <MetricMedium>185</MetricMedium>
  </View>
  <View className="items-center">
    <StatLabel>Calories</StatLabel>
    <MetricMedium>1,247</MetricMedium>
  </View>
</View>
```

### Timer Component
```tsx
<View className="items-center">
  <StatLabel>Rest Timer</StatLabel>
  <Timer>02:30</Timer>
</View>
```

## Best Practices

1. **Consistency**: Always use the designated font for its intended purpose
2. **Hierarchy**: Use font sizes and weights to create clear visual hierarchy
3. **Readability**: Ensure sufficient contrast and appropriate line spacing
4. **Performance**: Fonts are loaded with `display=swap` for optimal performance
5. **Accessibility**: All components maintain proper semantic structure

## Performance Considerations

- Fonts are loaded with `display=swap` to prevent layout shift
- Only necessary font weights are loaded to minimize bundle size
- Fallback fonts (`sans-serif`) ensure text remains readable during font loading
- Font files are cached by Google's CDN for optimal performance

## Color Integration

The typography system works seamlessly with your existing color palette:
- **Primary text**: Uses `text-foreground` (Charcoal Gray)
- **Secondary text**: Uses `text-muted-foreground`
- **Metrics**: Uses `text-primary` (Sage Green) for emphasis
- **Timers**: Uses `text-accent` (Soft Coral) for attention

This typography system creates a cohesive, modern, and fitness-focused user experience that aligns perfectly with your app's aesthetic goals.
