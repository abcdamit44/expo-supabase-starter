import { Text } from "@/components/ui/text";
import type { UserProfile } from "@/types/user";
import React from "react";
import { ScrollView, View } from "react-native";

interface SummaryStepProps {
  data: Partial<UserProfile>;
  updateData: (data: Partial<UserProfile>) => void;
}

export default function SummaryStep({ data }: SummaryStepProps) {
  return (
    <ScrollView className="flex-1">
      <View className="p-6 space-y-6">
        {/* Header */}{" "}
        <View className="space-y-2">
          <Text className="text-3xl font-bold text-center">You&apos;re All Set! 🎉</Text>
          <Text className="text-lg text-muted-foreground text-center">
            Here&apos;s a summary of your personalized health profile
          </Text>
        </View>
        {/* Summary Cards */}
        <View className="space-y-4">
          {/* Basic Info Summary */}
          <View className="bg-card p-4 rounded-lg border">
            <Text className="text-lg font-semibold mb-3">Basic Information</Text>
            <View className="space-y-2">
              {data.height && (
                <View className="flex-row justify-between">
                  <Text className="text-muted-foreground">Height:</Text>
                  <Text className="font-medium">{data.height} cm</Text>
                </View>
              )}
              {data.weight && (
                <View className="flex-row justify-between">
                  <Text className="text-muted-foreground">Weight:</Text>
                  <Text className="font-medium">{data.weight} kg</Text>
                </View>
              )}
              {data.gender && (
                <View className="flex-row justify-between">
                  <Text className="text-muted-foreground">Gender:</Text>
                  <Text className="font-medium capitalize">{data.gender}</Text>
                </View>
              )}
              {data.fitness_goal && (
                <View className="flex-row justify-between">
                  <Text className="text-muted-foreground">Goal:</Text>
                  <Text className="font-medium">{data.fitness_goal.replace("_", " ")}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Lifestyle Summary */}
          <View className="bg-card p-4 rounded-lg border">
            <Text className="text-lg font-semibold mb-3">Lifestyle</Text>
            <View className="space-y-2">
              {data.activity_level && (
                <View className="flex-row justify-between">
                  <Text className="text-muted-foreground">Activity Level:</Text>
                  <Text className="font-medium">{data.activity_level.replace("_", " ")}</Text>
                </View>
              )}
              {data.unit_system && (
                <View className="flex-row justify-between">
                  <Text className="text-muted-foreground">Units:</Text>
                  <Text className="font-medium">{data.unit_system}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Health Goals Summary */}
          <View className="bg-card p-4 rounded-lg border">
            <Text className="text-lg font-semibold mb-3">Health Goals</Text>
            <View className="space-y-2">
              {data.fitness_goal && (
                <View className="flex-row justify-between">
                  <Text className="text-muted-foreground">Primary Goal:</Text>
                  <Text className="font-medium">{data.fitness_goal.replace("_", " ")}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Profile Summary */}
          <View className="bg-card p-4 rounded-lg border">
            <Text className="text-lg font-semibold mb-3">Profile</Text>
            <View className="space-y-2">
              {data.full_name && (
                <View className="flex-row justify-between">
                  <Text className="text-muted-foreground">Name:</Text>
                  <Text className="font-medium">{data.full_name}</Text>
                </View>
              )}
              {data.date_of_birth && (
                <View className="flex-row justify-between">
                  <Text className="text-muted-foreground">Date of Birth:</Text>
                  <Text className="font-medium">
                    {new Date(data.date_of_birth).toLocaleDateString()}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        {/* Motivation Message */}
        <View className="bg-primary/10 p-4 rounded-lg">
          <Text className="text-center text-primary font-medium">
            🚀 Your personalized health journey starts now!
          </Text>{" "}
          <Text className="text-center text-muted-foreground mt-2">
            Based on your profile, we&apos;ll create custom workouts, meal plans, and coaching to
            help you achieve your goals.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
