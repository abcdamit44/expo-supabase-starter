import {
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
  P,
  Small,
  StatLabel,
  Timer,
  WorkoutTitle,
} from "@/components/ui/typography";
import { View } from "react-native";

export function FontShowcase() {
  return (
    <View className="p-6 space-y-8">
      {/* Headlines Section - Sora Font */}
      <View className="space-y-4">
        <Small className="text-accent font-semibold uppercase tracking-wider">
          Headlines • Sora Font
        </Small>
        <H1>FitnessPro</H1>
        <H2>Your Fitness Journey</H2>
        <H3>Today's Workout</H3>
        <H4>Exercise Details</H4>
        <WorkoutTitle>Upper Body Strength</WorkoutTitle>
      </View>

      {/* Body Text Section - DM Sans */}
      <View className="space-y-4">
        <Small className="text-accent font-semibold uppercase tracking-wider">
          Body Text • DM Sans
        </Small>
        <Lead>Transform your body and mind with our comprehensive fitness tracking app.</Lead>
        <P>
          Track your workouts, monitor your progress, and achieve your fitness goals with precision
          and style.
        </P>
        <Large>Ready to start your transformation?</Large>
        <ExerciseName>Bench Press</ExerciseName>
        <Small>Last workout: 2 days ago</Small>
      </View>

      {/* Metrics Section - Space Grotesk */}
      <View className="space-y-4">
        <Small className="text-accent font-semibold uppercase tracking-wider">
          Metrics • Space Grotesk
        </Small>
        <View className="flex-row items-end space-x-4">
          <View className="items-center">
            <StatLabel>Current Weight</StatLabel>
            <MetricLarge>185</MetricLarge>
            <Small>lbs</Small>
          </View>
          <View className="items-center">
            <StatLabel>Reps</StatLabel>
            <MetricMedium>12</MetricMedium>
          </View>
          <View className="items-center">
            <StatLabel>Sets</StatLabel>
            <MetricSmall>3</MetricSmall>
          </View>
        </View>

        <View className="items-center mt-6">
          <StatLabel>Rest Timer</StatLabel>
          <Timer>02:30</Timer>
        </View>

        <View className="flex-row justify-between items-center mt-4">
          <View className="items-center">
            <StatLabel>Calories</StatLabel>
            <Counter>247</Counter>
          </View>
          <View className="items-center">
            <StatLabel>Duration</StatLabel>
            <Counter>45:32</Counter>
          </View>
          <View className="items-center">
            <StatLabel>Exercises</StatLabel>
            <Counter>8</Counter>
          </View>
        </View>
      </View>

      {/* Usage Examples */}
      <View className="space-y-4 bg-card p-4 rounded-lg">
        <Small className="text-accent font-semibold uppercase tracking-wider">
          Real-world Examples
        </Small>

        {/* Workout Card Example */}
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

        {/* Stats Card Example */}
        <View className="bg-background p-4 rounded-lg space-y-2">
          <StatLabel>This Week's Progress</StatLabel>
          <View className="flex-row justify-between">
            <View className="items-center">
              <MetricMedium>4</MetricMedium>
              <Small>Workouts</Small>
            </View>
            <View className="items-center">
              <MetricMedium>185</MetricMedium>
              <Small>Minutes</Small>
            </View>
            <View className="items-center">
              <MetricMedium>1,247</MetricMedium>
              <Small>Calories</Small>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
