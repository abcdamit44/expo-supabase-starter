import { Bell, Heart } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { H1, H2, Muted } from "@/components/ui/typography";
import { useColorScheme } from "@/lib/useColorScheme";

import type { UserProfile } from "@/types/user";

interface PersonalizationStepProps {
  data: Partial<UserProfile>;
  updateData: (data: Partial<UserProfile>) => void;
}

const challengeOptions = [
  {
    value: "consistency",
    label: "Consistency",
    icon: "📅",
    description: "Sticking to my routine",
  },
  {
    value: "eating-right",
    label: "Eating Right",
    icon: "🥗",
    description: "Making healthy food choices",
  },
  {
    value: "time",
    label: "Time",
    icon: "⏰",
    description: "Finding time to exercise",
  },
  {
    value: "motivation",
    label: "Motivation",
    icon: "💪",
    description: "Staying motivated",
  },
  { value: "other", label: "Other", icon: "❓", description: "Something else" },
];

export default function PersonalizationStep({ data, updateData }: PersonalizationStepProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#ffffff" : "#000000";

  const handleMotivationChange = (level: number) => {
    updateData({ motivation_level: level });
  };

  const handleChallengeSelect = (challenge: string) => {
    updateData({ biggest_challenge: challenge });
  };

  const handleRemindersToggle = (wantsReminders: boolean) => {
    updateData({ wants_reminders: wantsReminders });
  };

  const motivationLevels = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <View className="flex-1 py-8">
      <View className="mb-8">
        <H1 className="mb-2">Final Personalization</H1>
        <Muted>Help us customize your experience for maximum success</Muted>
      </View>

      <View className="gap-8">
        {/* Motivation Level */}
        <View>
          <H2 className="mb-4">How motivated are you to reach your health goals?</H2>
          <Text className="text-sm text-muted-foreground mb-4">
            Rate from 1 (just starting) to 10 (extremely motivated)
          </Text>

          <View className="flex-row flex-wrap gap-2">
            {motivationLevels.map((level) => (
              <Pressable
                key={level}
                onPress={() => handleMotivationChange(level)}
                className={`w-12 h-12 rounded-full border-2 items-center justify-center ${
                  data.motivation_level === level
                    ? "border-primary bg-primary"
                    : "border-border bg-background"
                }`}
              >
                <Text
                  className={`font-bold ${
                    data.motivation_level === level ? "text-white" : "text-foreground"
                  }`}
                >
                  {level}
                </Text>
              </Pressable>
            ))}
          </View>

          {data.motivation_level && (
            <View className="mt-4 p-4 bg-primary/5 rounded-lg">
              <Text className="text-primary font-medium">
                {data.motivation_level >= 8
                  ? "🔥 Amazing motivation! You're ready to crush your goals!"
                  : data.motivation_level >= 6
                    ? "💪 Great motivation! You're on the right track!"
                    : data.motivation_level >= 4
                      ? "👍 Good motivation! We'll help you build momentum!"
                      : "🌱 That's okay! Everyone starts somewhere. We'll help you grow!"}
              </Text>
            </View>
          )}
        </View>

        {/* Biggest Challenge */}
        <View>
          <H2 className="mb-4">What's your biggest health challenge?</H2>
          <View className="gap-3">
            {challengeOptions.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => handleChallengeSelect(option.value)}
                className={`p-4 rounded-lg border-2 ${
                  data.biggest_challenge === option.value
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background"
                }`}
              >
                <View className="flex-row items-center">
                  <Text className="text-2xl mr-3">{option.icon}</Text>
                  <View className="flex-1">
                    <Text
                      className={`font-medium ${data.biggest_challenge === option.value ? "text-primary" : ""}`}
                    >
                      {option.label}
                    </Text>
                    <Text className="text-sm text-muted-foreground mt-1">{option.description}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Daily Reminders */}
        <View>
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-1">
              <H2>Daily Reminders & Tips</H2>
              <Text className="text-sm text-muted-foreground mt-1">
                Get personalized reminders and motivational tips
              </Text>
            </View>
            <Switch
              checked={data.wants_reminders || false}
              onCheckedChange={handleRemindersToggle}
            />
          </View>

          {data.wants_reminders && (
            <View className="bg-primary/5 p-4 rounded-lg">
              <View className="flex-row items-start">
                <Bell size={20} color="#3b82f6" className="mt-0.5" />
                <View className="ml-3 flex-1">
                  <Text className="text-primary font-medium mb-2">
                    You'll receive helpful reminders for:
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    • Meal times and water intake{"\n"}• Workout sessions{"\n"}• Progress check-ins
                    {"\n"}• Motivational tips
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Encouragement */}
        <View className="bg-gradient-to-r from-primary/10 to-purple-500/10 p-6 rounded-lg">
          <View className="items-center">
            <Heart size={32} color="#3b82f6" />
            <Text className="text-center font-medium mt-3 text-lg">
              You're almost ready to start your health journey!
            </Text>
            <Text className="text-center text-muted-foreground mt-2 leading-6">
              Your AI coach will use all this information to provide personalized guidance,
              motivation, and support tailored just for you.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
