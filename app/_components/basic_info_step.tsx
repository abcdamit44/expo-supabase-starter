import React from "react";
import { Pressable, View } from "react-native";

import { Button } from "@/components/ui/button";
import { FormField, FormInput } from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import { H1, H2, Muted } from "@/components/ui/typography";
import { useColorScheme } from "@/lib/useColorScheme";
import { useForm } from "react-hook-form";

import type { FitnessGoal, Gender, UnitSystem, UserProfile } from "@/types/user";

interface BasicInfoStepProps {
  data: Partial<UserProfile>;
  updateData: (data: Partial<UserProfile>) => void;
}

const genderOptions: { value: Gender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

const fitnessGoalOptions: {
  value: FitnessGoal;
  label: string;
  icon: string;
}[] = [
  { value: "lose-weight", label: "Lose Weight", icon: "🔥" },
  { value: "build-muscle", label: "Build Muscle", icon: "💪" },
  { value: "stay-fit", label: "Stay Fit", icon: "🏃" },
  { value: "just-exploring", label: "Just Exploring", icon: "🌟" },
];

export default function BasicInfoStep({ data, updateData }: BasicInfoStepProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#ffffff" : "#000000";

  const form = useForm({
    defaultValues: {
      height: data.height?.toString() || "",
      weight: data.weight?.toString() || "",
      date_of_birth: data.date_of_birth || "",
    },
  });

  const handleGenderSelect = (gender: Gender) => {
    updateData({ gender });
  };

  const handleGoalSelect = (goal: FitnessGoal) => {
    updateData({ fitness_goal: goal });
  };

  const handleUnitToggle = () => {
    const newUnit: UnitSystem = data.unit_system === "metric" ? "imperial" : "metric";
    updateData({ unit_system: newUnit });
  };

  const handleHeightChange = (height: string) => {
    updateData({ height: height ? Number.parseFloat(height) : undefined });
  };

  const handleWeightChange = (weight: string) => {
    updateData({ weight: weight ? Number.parseFloat(weight) : undefined });
  };

  const handleDateChange = (date: string) => {
    updateData({ date_of_birth: date });
  };

  return (
    <View className="flex-1 py-8">
      <View className="mb-8">
        <H1 className="mb-2">Basic Information</H1>
        <Muted>Help us understand your profile better</Muted>
      </View>

      <View className="gap-8">
        {/* Gender Selection */}
        <View>
          <H2 className="mb-4 flex-row items-center">
            <Text>Gender</Text>
          </H2>
          <View className="gap-2">
            {genderOptions.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => handleGenderSelect(option.value)}
                className={`p-4 rounded-lg border-2 ${
                  data.gender === option.value
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background"
                }`}
              >
                <Text className={data.gender === option.value ? "text-primary font-medium" : ""}>
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Date of Birth */}
        <View>
          <H2 className="mb-4">Date of Birth</H2>
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormInput
                label="Date of Birth"
                placeholder="YYYY-MM-DD"
                {...field}
                onChangeText={(text) => {
                  field.onChange(text);
                  handleDateChange(text);
                }}
              />
            )}
          />
        </View>

        {/* Height & Weight */}
        <View>
          <View className="flex-row items-center justify-between mb-4">
            <H2>Physical Stats</H2>
            <Button variant="outline" size="sm" onPress={handleUnitToggle}>
              <Text>{data.unit_system === "metric" ? "Metric" : "Imperial"}</Text>
            </Button>
          </View>

          <View className="gap-4">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormInput
                  label={`Height (${data.unit_system === "metric" ? "cm" : "ft-in"})`}
                  placeholder={data.unit_system === "metric" ? "170" : "5'8\""}
                  keyboardType="numeric"
                  {...field}
                  onChangeText={(text) => {
                    field.onChange(text);
                    handleHeightChange(text);
                  }}
                />
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormInput
                  label={`Weight (${data.unit_system === "metric" ? "kg" : "lbs"})`}
                  placeholder={data.unit_system === "metric" ? "70" : "154"}
                  keyboardType="numeric"
                  {...field}
                  onChangeText={(text) => {
                    field.onChange(text);
                    handleWeightChange(text);
                  }}
                />
              )}
            />
          </View>
        </View>

        {/* Fitness Goal */}
        <View>
          <H2 className="mb-4">What's your main fitness goal?</H2>
          <View className="gap-3">
            {fitnessGoalOptions.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => handleGoalSelect(option.value)}
                className={`p-4 rounded-lg border-2 ${
                  data.fitness_goal === option.value
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background"
                }`}
              >
                <View className="flex-row items-center">
                  <Text className="text-2xl mr-3">{option.icon}</Text>
                  <Text
                    className={data.fitness_goal === option.value ? "text-primary font-medium" : ""}
                  >
                    {option.label}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
