import { Dumbbell, Home } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

import { FormField, FormInput } from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import { H1, H2, Muted } from "@/components/ui/typography";
import { useColorScheme } from "@/lib/useColorScheme";
import { useForm } from "react-hook-form";

import type { ActivityLevel, GymExperience, UserProfile, WorkoutTime } from "@/types/user";

interface LifestyleStepProps {
  data: Partial<UserProfile>;
  updateData: (data: Partial<UserProfile>) => void;
}

const activityLevels: {
  value: ActivityLevel;
  label: string;
  description: string;
}[] = [
  {
    value: "sedentary",
    label: "Sedentary",
    description: "Desk job, little to no exercise",
  },
  {
    value: "light",
    label: "Light Activity",
    description: "Light exercise 1-3 days/week",
  },
  {
    value: "moderate",
    label: "Moderate Activity",
    description: "Moderate exercise 3-5 days/week",
  },
  {
    value: "very-active",
    label: "Very Active",
    description: "Heavy exercise 6-7 days/week",
  },
];

const gymExperienceOptions: { value: GymExperience; label: string }[] = [
  { value: "less-than-1-month", label: "Less than 1 month" },
  { value: "1-3-months", label: "1-3 months" },
  { value: "3-6-months", label: "3-6 months" },
  { value: "6-plus-months", label: "6+ months" },
];

const workoutTimeOptions: {
  value: WorkoutTime;
  label: string;
  icon: string;
}[] = [
  { value: "morning", label: "Morning", icon: "🌅" },
  { value: "afternoon", label: "Afternoon", icon: "☀️" },
  { value: "evening", label: "Evening", icon: "🌙" },
  { value: "varies", label: "Varies", icon: "🔄" },
];

export default function LifestyleStep({ data, updateData }: LifestyleStepProps) {
  const { colorScheme } = useColorScheme();

  const form = useForm({
    defaultValues: {
      workout_days_per_week: data.workout_days_per_week?.toString() || "",
      home_outdoor_exercise: data.home_outdoor_exercise || "",
    },
  });

  const handleGymToggle = (goesToGym: boolean) => {
    updateData({ goes_to_gym: goesToGym });
    if (!goesToGym) {
      // Clear gym-related fields if user doesn't go to gym
      updateData({
        gym_experience: undefined,
        workout_time: undefined,
        workout_days_per_week: undefined,
      });
    }
  };

  const handleActivityLevelSelect = (level: ActivityLevel) => {
    updateData({ activity_level: level });
  };

  const handleGymExperienceSelect = (experience: GymExperience) => {
    updateData({ gym_experience: experience });
  };

  const handleWorkoutTimeSelect = (time: WorkoutTime) => {
    updateData({ workout_time: time });
  };

  const handleWorkoutDaysChange = (days: string) => {
    const daysNum = days ? Number.parseInt(days, 10) : undefined;
    if (daysNum && daysNum >= 1 && daysNum <= 7) {
      updateData({ workout_days_per_week: daysNum });
    }
  };

  const handleHomeExerciseChange = (exercise: string) => {
    updateData({ home_outdoor_exercise: exercise });
  };

  return (
    <View className="flex-1 py-8">
      <View className="mb-8">
        <H1 className="mb-2">Lifestyle & Activity</H1>
        <Muted>Tell us about your current activity level and preferences</Muted>
      </View>

      <View className="gap-8">
        {/* Gym Question */}
        <View>
          <H2 className="mb-4">Do you go to the gym?</H2>
          <View className="flex-row gap-4">
            <Pressable
              onPress={() => handleGymToggle(true)}
              className={`flex-1 p-4 rounded-lg border-2 ${
                data.goes_to_gym === true
                  ? "border-primary bg-primary/10"
                  : "border-border bg-background"
              }`}
            >
              <View className="items-center">
                <Dumbbell size={32} color={data.goes_to_gym === true ? "#3b82f6" : "#6b7280"} />
                <Text
                  className={`mt-2 ${data.goes_to_gym === true ? "text-primary font-medium" : ""}`}
                >
                  Yes
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => handleGymToggle(false)}
              className={`flex-1 p-4 rounded-lg border-2 ${
                data.goes_to_gym === false
                  ? "border-primary bg-primary/10"
                  : "border-border bg-background"
              }`}
            >
              <View className="items-center">
                <Home size={32} color={data.goes_to_gym === false ? "#3b82f6" : "#6b7280"} />
                <Text
                  className={`mt-2 ${data.goes_to_gym === false ? "text-primary font-medium" : ""}`}
                >
                  No
                </Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Gym-specific questions */}
        {data.goes_to_gym === true && (
          <>
            <View>
              <H2 className="mb-4">How long have you been going to the gym?</H2>
              <View className="gap-2">
                {gymExperienceOptions.map((option) => (
                  <Pressable
                    key={option.value}
                    onPress={() => handleGymExperienceSelect(option.value)}
                    className={`p-4 rounded-lg border-2 ${
                      data.gym_experience === option.value
                        ? "border-primary bg-primary/10"
                        : "border-border bg-background"
                    }`}
                  >
                    <Text
                      className={
                        data.gym_experience === option.value ? "text-primary font-medium" : ""
                      }
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View>
              <H2 className="mb-4">When do you prefer to work out?</H2>
              <View className="gap-3">
                {workoutTimeOptions.map((option) => (
                  <Pressable
                    key={option.value}
                    onPress={() => handleWorkoutTimeSelect(option.value)}
                    className={`p-4 rounded-lg border-2 ${
                      data.workout_time === option.value
                        ? "border-primary bg-primary/10"
                        : "border-border bg-background"
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Text className="text-2xl mr-3">{option.icon}</Text>
                      <Text
                        className={
                          data.workout_time === option.value ? "text-primary font-medium" : ""
                        }
                      >
                        {option.label}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>

            <View>
              <H2 className="mb-4">How many days per week do you work out?</H2>
              <FormField
                control={form.control}
                name="workout_days_per_week"
                render={({ field }) => (
                  <FormInput
                    label="Days per week (1-7)"
                    placeholder="e.g., 3"
                    keyboardType="numeric"
                    {...field}
                    onChangeText={(text) => {
                      field.onChange(text);
                      handleWorkoutDaysChange(text);
                    }}
                  />
                )}
              />
            </View>
          </>
        )}

        {/* Non-gym exercise */}
        {data.goes_to_gym === false && (
          <View>
            <H2 className="mb-4">Do you do any home or outdoor exercise? (Optional)</H2>
            <FormField
              control={form.control}
              name="home_outdoor_exercise"
              render={({ field }) => (
                <FormInput
                  label="Type of exercise"
                  placeholder="e.g., Walking, Running, Yoga, etc."
                  {...field}
                  onChangeText={(text) => {
                    field.onChange(text);
                    handleHomeExerciseChange(text);
                  }}
                />
              )}
            />
          </View>
        )}

        {/* Activity Level */}
        <View>
          <H2 className="mb-4">What's your daily activity level?</H2>
          <View className="gap-3">
            {activityLevels.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => handleActivityLevelSelect(option.value)}
                className={`p-4 rounded-lg border-2 ${
                  data.activity_level === option.value
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background"
                }`}
              >
                <Text
                  className={`font-medium ${data.activity_level === option.value ? "text-primary" : ""}`}
                >
                  {option.label}
                </Text>
                <Text className="text-sm text-muted-foreground mt-1">{option.description}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
